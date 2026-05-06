<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SetupRestApi extends Command
{
    protected $signature = 'econobis:setup-rest-api
        {--force : Maak opnieuw aan ook als er al een client bestaat (revoked oude en maak nieuwe)}
        {--write-secrets : Schrijf secrets weg naar storage/app/rest-api-oauth-secrets.json (veilig behandelen!)}
        {--redirect= : Override redirect URL voor Auth Code client (anders config rest-api-oauth.redirect_url)}';

    protected $description = 'Setup Passport OAuth clients for Econobis REST API (Client Credentials + Auth Code).';

    public function handle(): int
    {
        $appName = (string) config('app.name', 'Econobis');
        $names = (array) config('rest-api-oauth.client_names', []);

        $ccName = "{$appName} " . ($names['client_credentials'] ?? 'Rest-API ClientCredentials Grant Client');
        $acName = "{$appName} " . ($names['auth_code'] ?? 'Rest-API AuthCode Client');

        $redirect = $this->option('redirect')
            ?: (string) config('rest-api-oauth.redirect_url');

        if (!$redirect) {
            $this->error('Geen redirect URL gevonden. Zet rest-api-oauth.redirect_url of gebruik --redirect=');
            return self::FAILURE;
        }

        $this->info("App: {$appName}");
        $this->line("Auth Code redirect: {$redirect}");
        $this->newLine();

        // DB sanity
        if (!DB::getSchemaBuilder()->hasTable('oauth_clients')) {
            $this->error('oauth_clients tabel ontbreekt. Is Passport gemigreerd? (php artisan migrate)');
            return self::FAILURE;
        }

        $force = (bool) $this->option('force');

        $secretsOut = [
            'generated_at' => now()->toIso8601String(),
            'app' => $appName,
            'clients' => [],
        ];

        // 1) Client Credentials client
        $cc = $this->upsertClientCredentialsClient($ccName, $force);
        if ($cc['created']) {
            $this->info("✅ Client Credentials client aangemaakt: {$ccName}");
            $this->warn("⚠️ Client ID: {$cc['id']}");
            $this->warn("⚠️ Client SECRET (sla veilig op!): {$cc['plain_secret']}");
            $secretsOut['clients']['client_credentials'] = [
                'id' => $cc['id'],
                'secret' => $cc['plain_secret'],
                'name' => $ccName,
            ];
        } else {
            $this->line("ℹ️ Client Credentials client bestaat al: {$ccName} (id: {$cc['id']})");
        }

        $this->newLine();

        // 2) Auth Code client
        $ac = $this->upsertAuthCodeClient($acName, $redirect, $force);
        if ($ac['created']) {
            $this->info("✅ Auth Code client aangemaakt: {$acName}");
            $this->warn("⚠️ Client ID: {$ac['id']}");
            $this->warn("⚠️ Client SECRET (sla veilig op!): {$ac['plain_secret']}");
            $this->line("Redirect: {$redirect}");
            $secretsOut['clients']['auth_code'] = [
                'id' => $ac['id'],
                'secret' => $ac['plain_secret'],
                'name' => $acName,
                'redirect' => $redirect,
            ];
        } else {
            $this->line("ℹ️ Auth Code client bestaat al: {$acName} (id: {$ac['id']})");
            // Als redirect veranderd is, kun je kiezen: updaten of niet.
            // Ik update hier wél redirect zodat config leidend blijft.
            if (!empty($ac['updated_redirect'])) {
                $this->info("✅ Redirect bijgewerkt naar: {$redirect}");
            }
        }

        // Optioneel: secrets wegschrijven
        if ($this->option('write-secrets') && !empty($secretsOut['clients'])) {
            $path = 'rest-api-oauth-secrets.json';
            Storage::disk('local')->put($path, json_encode($secretsOut, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            $this->warn("⚠️ Secrets opgeslagen in storage/app/{$path}. Behandel dit bestand als geheim!");
        }

        $this->newLine();
        $this->info('Klaar.');

        return self::SUCCESS;
    }

    private function upsertClientCredentialsClient(string $name, bool $force): array
    {
        // We gebruiken oauth_clients zoals Passport dat doet.
        // Voor client credentials is het voldoende dat het geen password/personal_access client is.
        $existing = DB::table('oauth_clients')
            ->where('name', $name)
            ->where('revoked', false)
            ->first();

        if ($existing && !$force) {
            return ['created' => false, 'id' => $existing->id];
        }

        if ($existing && $force) {
            DB::table('oauth_clients')->where('id', $existing->id)->update(['revoked' => true, 'updated_at' => now()]);
        }

        $plain = Str::random(40);

        $id = DB::table('oauth_clients')->insertGetId([
            'user_id' => null,
            'name' => $name,
            'secret' => $plain,
            'provider' => 'users',
            'redirect' => '',
            'personal_access_client' => false,
            'password_client' => false,
            'revoked' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return ['created' => true, 'id' => $id, 'plain_secret' => $plain];
    }

    private function upsertAuthCodeClient(string $name, string $redirect, bool $force): array
    {
        $existing = DB::table('oauth_clients')
            ->where('name', $name)
            ->where('revoked', false)
            ->first();

        if ($existing && !$force) {
            $updatedRedirect = false;
            if (($existing->redirect ?? '') !== $redirect) {
                DB::table('oauth_clients')->where('id', $existing->id)->update([
                    'redirect' => $redirect,
                    'updated_at' => now(),
                ]);
                $updatedRedirect = true;
            }

            return ['created' => false, 'id' => $existing->id, 'updated_redirect' => $updatedRedirect];
        }

        if ($existing && $force) {
            DB::table('oauth_clients')->where('id', $existing->id)->update(['revoked' => true, 'updated_at' => now()]);
        }

        $plain = Str::random(40);

        $id = DB::table('oauth_clients')->insertGetId([
            'user_id' => null,
            'name' => $name,
            'secret' => $plain,
            'provider' => 'users',
            'redirect' => $redirect,
            'personal_access_client' => false,
            'password_client' => false,
            'revoked' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return ['created' => true, 'id' => $id, 'plain_secret' => $plain];
    }
}
