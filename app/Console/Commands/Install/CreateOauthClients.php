<?php

namespace App\Console\Commands\Install;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Laravel\Passport\Client;
use Laravel\Passport\ClientRepository;

class CreateOauthClients extends Command
{
    protected $signature = 'install:create-oauth-clients
        {--path= : Absolute path to the .env file (defaults to base_path(.env))}
        {--dry-run : Validate and show what would be created without making changes}';

    protected $description = 'Create missing Passport OAuth clients and write client credentials to .env';

    public function handle(ClientRepository $clients): int
    {
        $envPath = $this->option('path') ?: base_path('.env');
        $dryRun = (bool) $this->option('dry-run');

        if (!File::exists($envPath)) {
            $this->error("Env file not found: {$envPath}");
            return self::FAILURE;
        }

        if (!DB::getSchemaBuilder()->hasTable('oauth_clients')) {
            $this->error('oauth_clients table not found. Did Passport migrations run?');
            return self::FAILURE;
        }

        $originalEnv = File::get($envPath);
        $env = $this->parseEnvFileToAssoc($originalEnv);

        $appName = $this->unquoteEnvValue($env['APP_NAME'] ?? '');

        if ($appName === '') {
            $this->error('APP_NAME is missing or empty in .env.');
            return self::FAILURE;
        }

        $cooperativeName = preg_replace('/^Econobis\s+/i', '', $appName);

        $personalClientName = "{$appName} Personal Access Client";
        $userClientName = "{$appName} Password Grant Client";
        $portalClientName = "Econobis Portal App {$cooperativeName} Password Grant Client";

        /*
         * Validate both bridges before creating anything.
         */
        $userBridgeState = $this->validateBridge(
            $env,
            'OAUTH_CLIENT_ID',
            'OAUTH_CLIENT_SECRET',
            'users'
        );

        if ($userBridgeState === false) {
            return self::FAILURE;
        }

        $portalBridgeState = $this->validateBridge(
            $env,
            'OAUTH_PORTAL_CLIENT_ID',
            'OAUTH_PORTAL_CLIENT_SECRET',
            'portal'
        );

        if ($portalBridgeState === false) {
            return self::FAILURE;
        }

        /*
         * Personal Access Client.
         */
        $personalClient = $this->findActiveClient(
            $personalClientName,
            null,
            ['personal_access']
        );

        if ($personalClient) {
            $this->info("Personal Access Client already exists: id {$personalClient->id}");
        } elseif ($dryRun) {
            $this->info("Would create Personal Access Client: {$personalClientName}");
        } else {
            $personalClient = $clients->createPersonalAccessGrantClient(
                $personalClientName
            );

            $this->info("Created Personal Access Client: id {$personalClient->id}");
        }

        /*
         * OAuth client bridge.
         */
        $wantedVars = [];

        if ($userBridgeState === 'configured') {
            $this->info("OAuth client bridge already configured: id {$env['OAUTH_CLIENT_ID']}");
        } elseif ($dryRun) {
            $this->info("Would create users Password Grant Client: {$userClientName}");
        } else {
            $existingClient = $this->findActiveClient(
                $userClientName,
                'users',
                ['password', 'refresh_token']
            );

            if ($existingClient) {
                $this->error(
                    "Users Password Grant Client already exists with id {$existingClient->id}, "
                    . 'but OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET are empty.'
                );
                $this->line('The plaintext client secret cannot be recovered. Refusing to create a duplicate client.');

                return self::FAILURE;
            }

            $userClient = $clients->createPasswordGrantClient(
                $userClientName,
                'users',
                true
            );

            if (!$userClient->plainSecret) {
                $this->error('Passport did not return a plaintext secret for the users OAuth client.');
                return self::FAILURE;
            }

            $wantedVars['OAUTH_CLIENT_ID'] = (string) $userClient->id;
            $wantedVars['OAUTH_CLIENT_SECRET'] = $userClient->plainSecret;

            $this->info("Created users Password Grant Client: id {$userClient->id}");
        }

        /*
         * OAuth portal client bridge.
         */
        if ($portalBridgeState === 'configured') {
            $this->info("OAuth portal client bridge already configured: id {$env['OAUTH_PORTAL_CLIENT_ID']}");
        } elseif ($dryRun) {
            $this->info("Would create portal Password Grant Client: {$portalClientName}");
        } else {
            $existingClient = $this->findActiveClient(
                $portalClientName,
                'portal',
                ['password', 'refresh_token']
            );

            if ($existingClient) {
                $this->error(
                    "Portal Password Grant Client already exists with id {$existingClient->id}, "
                    . 'but OAUTH_PORTAL_CLIENT_ID / OAUTH_PORTAL_CLIENT_SECRET are empty.'
                );
                $this->line('The plaintext client secret cannot be recovered. Refusing to create a duplicate client.');

                return self::FAILURE;
            }

            $portalClient = $clients->createPasswordGrantClient(
                $portalClientName,
                'portal',
                true
            );

            if (!$portalClient->plainSecret) {
                $this->error('Passport did not return a plaintext secret for the portal OAuth client.');
                return self::FAILURE;
            }

            $wantedVars['OAUTH_PORTAL_CLIENT_ID'] = (string) $portalClient->id;
            $wantedVars['OAUTH_PORTAL_CLIENT_SECRET'] = $portalClient->plainSecret;

            $this->info("Created portal Password Grant Client: id {$portalClient->id}");
        }

        if ($dryRun) {
            $this->warn('Dry-run enabled: no clients or .env changes written.');
            return self::SUCCESS;
        }

        if (empty($wantedVars)) {
            $this->info('No OAuth client changes needed.');
            return self::SUCCESS;
        }

        $newEnv = $this->updateEnvContent($originalEnv, $wantedVars);

        $backupPath = $envPath . '.bak.' . now()->format('YmdHis');
        File::put($backupPath, $originalEnv);
        $this->info("Backup created: {$backupPath}");

        File::put($envPath, $newEnv);
        $this->info("Updated env written: {$envPath}");

        return self::SUCCESS;
    }

    private function validateBridge(
        array $env,
        string $idKey,
        string $secretKey,
        string $provider
    ): string|false {
        $id = $this->unquoteEnvValue($env[$idKey] ?? '');
        $secret = $this->unquoteEnvValue($env[$secretKey] ?? '');

        if ($id === '' && $secret === '') {
            return 'missing';
        }

        if ($id === '' || $secret === '') {
            $this->error("Incomplete OAuth configuration: {$idKey} and {$secretKey} must either both be filled or both be empty.");
            return false;
        }

        $client = Client::query()
            ->whereKey($id)
            ->where('provider', $provider)
            ->where('revoked', false)
            ->first();

        if (!$client) {
            $this->error("OAuth client {$id} from {$idKey} was not found as an active {$provider} client.");
            return false;
        }

        $grantTypes = $client->grant_types ?? [];

        if (!in_array('password', $grantTypes, true)
            || !in_array('refresh_token', $grantTypes, true)) {
            $this->error("OAuth client {$id} from {$idKey} is not a password grant client.");
            return false;
        }

        return 'configured';
    }

    private function findActiveClient(
        string $name,
        ?string $provider,
        array $grantTypes
    ): ?Client {
        $query = Client::query()
            ->where('name', $name)
            ->where('revoked', false);

        if ($provider === null) {
            $query->whereNull('provider');
        } else {
            $query->where('provider', $provider);
        }

        return $query->get()->first(function (Client $client) use ($grantTypes) {
            $clientGrantTypes = $client->grant_types ?? [];

            sort($clientGrantTypes);
            sort($grantTypes);

            return $clientGrantTypes === $grantTypes;
        });
    }

    private function updateEnvContent(string $original, array $wantedVars): string
    {
        $lines = preg_split("/\r\n|\n|\r/", $original);
        $newLines = [];
        $found = [];

        foreach ($lines as $line) {
            if ($line === '' || str_starts_with(ltrim($line), '#')) {
                $newLines[] = $line;
                continue;
            }

            [$key] = $this->splitEnvLine($line);

            if ($key !== null && array_key_exists($key, $wantedVars)) {
                $newLines[] = $this->formatEnvLine($key, $wantedVars[$key]);
                $found[$key] = true;
                continue;
            }

            $newLines[] = $line;
        }

        foreach ($wantedVars as $key => $value) {
            if (!isset($found[$key])) {
                $newLines[] = $this->formatEnvLine($key, $value);
            }
        }

        return implode(PHP_EOL, $newLines);
    }

    private function parseEnvFileToAssoc(string $content): array
    {
        $vars = [];

        foreach (preg_split("/\r\n|\n|\r/", $content) as $line) {
            $line = trim($line);

            if ($line === '' || str_starts_with($line, '#')) {
                continue;
            }

            [$key, $value] = $this->splitEnvLine($line);

            if ($key !== null) {
                $vars[$key] = $value;
            }
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
}