<?php

namespace App\Console\Commands\Install;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class CreatePortalOauthClient extends Command
{
    protected $signature = 'install:create-portal-oauth-client
        {--path= : Absolute path to the .env file (defaults to base_path(.env))}
        {--marker-file= : If set and exists, command will skip. If set and not exists, it will be created after success}
        {--name=Econobis Portal App Password Grant Client : OAuth client name}
        {--dry-run : Do not write, only show changes}';

    protected $description = 'Create Portal App password grant OAuth client and write OAUTH_PORTAL_CLIENT_ID / OAUTH_PORTAL_CLIENT_SECRET to .env';

    public function handle(): int
    {
        $envPath = $this->option('path') ?: base_path('.env');
        $markerFile = $this->option('marker-file');
        $dryRun = (bool) $this->option('dry-run');
        $clientName = (string) $this->option('name');

        if ($markerFile && File::exists($markerFile)) {
            $this->info("Marker exists, skipping: {$markerFile}");
            return self::SUCCESS;
        }

        if (!File::exists($envPath)) {
            $this->error("Env file not found: {$envPath}");
            return self::FAILURE;
        }

        if (!DB::getSchemaBuilder()->hasTable('oauth_clients')) {
            $this->error('oauth_clients table not found. Did Passport migrations run?');
            return self::FAILURE;
        }

        $originalEnv = File::get($envPath);
        $existingVars = $this->parseEnvFileToAssoc($originalEnv);

        $existingClient = DB::table('oauth_clients')
            ->where('name', $clientName)
            ->where('provider', 'portal')
            ->where('password_client', true)
            ->where('revoked', false)
            ->first();

        $createdClient = false;

        if ($existingClient) {
            $clientId = (string) $existingClient->id;
            $clientSecret = (string) $existingClient->secret;

            if ($clientSecret === '') {
                $this->error("Existing portal oauth client {$clientId} has empty secret.");
                return self::FAILURE;
            }

            if ($this->looksHashed($clientSecret)) {
                $this->error("Existing portal oauth client {$clientId} secret already looks hashed.");
                $this->line('Plaintext secret can no longer be recovered from DB.');
                $this->line('Set OAUTH_PORTAL_CLIENT_SECRET manually or create a new portal password grant client.');
                return self::FAILURE;
            }

            $this->info("Existing portal OAuth client found: id {$clientId}");
        } else {
            $clientSecret = Str::random(40);

            if ($dryRun) {
                $clientId = '(new id after insert)';
                $createdClient = true;
            } else {
                $clientId = (string) DB::table('oauth_clients')->insertGetId([
                    'user_id' => null,
                    'name' => $clientName,
                    'secret' => $clientSecret,
                    'provider' => 'portal',
                    'redirect' => '',
                    'personal_access_client' => false,
                    'password_client' => true,
                    'revoked' => false,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $createdClient = true;
                $this->info("Created portal OAuth client: id {$clientId}");
            }
        }

        $wantedVars = [
            'OAUTH_PORTAL_CLIENT_ID' => $clientId,
            'OAUTH_PORTAL_CLIENT_SECRET' => $clientSecret,
        ];

        $newEnv = $this->updateEnvContent($originalEnv, $existingVars, $wantedVars, $touched);
        $changedEnv = ($newEnv !== $originalEnv);

        $this->line("Env path: {$envPath}");
        $this->line("Client name: {$clientName}");
        $this->line("Client id: {$clientId}");
        $this->line('---');

        if ($createdClient) {
            $this->info('OAuth client: created');
        } else {
            $this->info('OAuth client: already existed');
        }

        if (!empty($touched)) {
            $this->info('Set/updated env keys:');
            foreach ($touched as $key => $diff) {
                $this->line(
                    " - {$key}: "
                    . $this->maskIfSecret($key, $diff['from'])
                    . ' -> '
                    . $this->maskIfSecret($key, $diff['to'])
                );
            }
        } else {
            $this->info('Set/updated env keys: none');
        }

        if ($dryRun) {
            $this->warn('Dry-run enabled: no DB/env/marker changes written.');
            return self::SUCCESS;
        }

        if ($changedEnv) {
            $backupPath = $envPath . '.bak.' . now()->format('YmdHis');
            File::put($backupPath, $originalEnv);
            $this->info("Backup created: {$backupPath}");

            File::put($envPath, $newEnv);
            $this->info("Updated env written: {$envPath}");
        } else {
            $this->info('No env changes needed.');
        }

        if ($markerFile) {
            $this->ensureDir(dirname($markerFile));
            File::put($markerFile, 'portal oauth client created ' . now()->toDateTimeString() . PHP_EOL);
            $this->info("Marker written: {$markerFile}");
        }

        return self::SUCCESS;
    }

    private function updateEnvContent(string $original, array $existingVars, array $wantedVars, ?array &$touched): string
    {
        $touched = [];
        $lines = preg_split("/\r\n|\n|\r/", $original);
        $newLines = [];

        foreach ($lines as $line) {
            $trimmed = ltrim($line);

            if ($line === '' || str_starts_with($trimmed, '#')) {
                $newLines[] = $line;
                continue;
            }

            [$key, $value] = $this->splitEnvLine($line);

            if ($key === null) {
                $newLines[] = $line;
                continue;
            }

            if (array_key_exists($key, $wantedVars)) {
                $newValue = $wantedVars[$key];

                // Niet onnodig overschrijven als waarde al gelijk is.
                if ($this->unquoteEnvValue($value) === $newValue) {
                    $newLines[] = $line;
                    continue;
                }

                $newLines[] = $this->formatEnvLine($key, $newValue);
                $touched[$key] = ['from' => $value, 'to' => $newValue];
                continue;
            }

            $newLines[] = $line;
        }

        $appendLines = [];

        foreach ($wantedVars as $key => $wantedValue) {
            $hasKey = array_key_exists($key, $existingVars) || $this->envLinesContainKey($newLines, $key);

            if ($hasKey) {
                continue;
            }

            $appendLines[] = $this->formatEnvLine($key, $wantedValue);
            $touched[$key] = ['from' => null, 'to' => $wantedValue];
        }

        if (!empty($appendLines)) {
            $newLines[] = '';
            $newLines[] = '# OAuth portal client bridge';

            foreach ($appendLines as $appendLine) {
                $newLines[] = $appendLine;
            }
        }

        return implode(PHP_EOL, $newLines);
    }

    private function parseEnvFileToAssoc(string $content): array
    {
        $vars = [];
        $lines = preg_split("/\r\n|\n|\r/", $content);

        foreach ($lines as $line) {
            $line = trim($line);

            if ($line === '' || str_starts_with($line, '#')) {
                continue;
            }

            [$key, $value] = $this->splitEnvLine($line);

            if ($key === null) {
                continue;
            }

            $vars[$key] = $this->unquoteEnvValue($value);
        }

        return $vars;
    }

    private function splitEnvLine(string $line): array
    {
        $line = preg_replace('/^\s*export\s+/', '', $line);

        $pos = strpos($line, '=');

        if ($pos === false) {
            return [null, null];
        }

        $key = trim(substr($line, 0, $pos));
        $value = substr($line, $pos + 1);

        if ($key === '' || preg_match('/\s/', $key)) {
            return [null, null];
        }

        return [$key, $value];
    }

    private function envLinesContainKey(array $lines, string $key): bool
    {
        foreach ($lines as $line) {
            if ($line === '' || str_starts_with(ltrim($line), '#')) {
                continue;
            }

            [$currentKey, $_] = $this->splitEnvLine($line);

            if ($currentKey === $key) {
                return true;
            }
        }

        return false;
    }

    private function formatEnvLine(string $key, string $value): string
    {
        $needsQuotes = strpbrk($value, " #\t\r\n\"'") !== false;

        if ($needsQuotes) {
            $escaped = str_replace('"', '\"', $value);
            return $key . '="' . $escaped . '"';
        }

        return $key . '=' . $value;
    }

    private function unquoteEnvValue(?string $value): string
    {
        if ($value === null) {
            return '';
        }

        $value = trim($value);

        if (
            strlen($value) >= 2
            && (
                ($value[0] === '"' && substr($value, -1) === '"')
                || ($value[0] === "'" && substr($value, -1) === "'")
            )
        ) {
            return substr($value, 1, -1);
        }

        return $value;
    }

    private function maskIfSecret(string $key, ?string $value): string
    {
        if ($value === null) {
            return '(null)';
        }

        $plainValue = $this->unquoteEnvValue($value);

        if (str_contains($key, 'SECRET')) {
            $len = strlen($plainValue);

            if ($len <= 8) {
                return '***';
            }

            return substr($plainValue, 0, 5) . '***' . substr($plainValue, -4);
        }

        return $plainValue === '' ? '(empty)' : $plainValue;
    }

    private function looksHashed(string $value): bool
    {
        return str_starts_with($value, '$2y$')
            || str_starts_with($value, '$2a$')
            || str_starts_with($value, '$argon2i$')
            || str_starts_with($value, '$argon2id$');
    }

    private function ensureDir(string $dir): void
    {
        if (!File::isDirectory($dir)) {
            File::makeDirectory($dir, 0750, true);
        }
    }
}