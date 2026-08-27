<?php

namespace App\Console\Commands\Install;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class MigrateEnvToOauthClientSecretFromDb extends Command
{
    protected $signature = 'install:migrate-env-oauth-client-secret-from-db
        {--path= : Absolute path to the .env file (defaults to base_path(.env))}
        {--marker-file= : If set and exists, command will skip. If set and not exists, it will be created after success}
        {--oauth-client-id= : Override oauth client id instead of env/app config}
        {--dry-run : Do not write, only show changes}';

    protected $description = 'Migrate .env to use OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET, reading the current plaintext secret from oauth_clients';

    public function handle(): int
    {
        $envPath = $this->option('path') ?: base_path('.env');
        $markerFile = $this->option('marker-file');
        $dryRun = (bool) $this->option('dry-run');

        if ($markerFile && File::exists($markerFile)) {
            $this->info("Marker exists, skipping: {$markerFile}");
            return self::SUCCESS;
        }

        if (!File::exists($envPath)) {
            $this->error("Env file not found: {$envPath}");
            return self::FAILURE;
        }

        $original = File::get($envPath);
        $existingVars = $this->parseEnvFileToAssoc($original);

        $oauthClientId = $this->option('oauth-client-id')
            ?: ($existingVars['OAUTH_CLIENT_ID'] ?? config('app.oauth_client_id', '2'));

        $client = DB::table('oauth_clients')->where('id', $oauthClientId)->first();

        if (!$client) {
            $this->error("oauth_clients record not found for id {$oauthClientId}");
            return self::FAILURE;
        }

        $secret = (string) ($client->secret ?? '');

        if ($secret === '') {
            $this->error("oauth_clients.secret is empty for id {$oauthClientId}");
            return self::FAILURE;
        }

        if ($this->looksHashed($secret)) {
            $this->error("oauth_clients.secret for id {$oauthClientId} already looks hashed. Plaintext secret can no longer be recovered from DB.");
            $this->line('Set OAUTH_CLIENT_SECRET manually from your saved secret, or create a new password grant client and use that secret.');
            return self::FAILURE;
        }

        $wantedDefaults = [
            'OAUTH_CLIENT_ID' => (string) $oauthClientId,
            'OAUTH_CLIENT_SECRET' => $secret,
        ];

        $lines = preg_split("/\r\n|\n|\r/", $original);
        $newLines = [];
        $touched = [];

        foreach ($lines as $line) {
            $trimmed = ltrim($line);

            if ($line === '' || str_starts_with($trimmed, '#')) {
                $newLines[] = $line;
                continue;
            }

            [$k, $v] = $this->splitEnvLine($line);
            if ($k === null) {
                $newLines[] = $line;
                continue;
            }

            if (array_key_exists($k, $wantedDefaults)) {
                $newVal = $wantedDefaults[$k];
                $newLines[] = $this->formatEnvLine($k, $newVal);
                $touched[$k] = ['from' => $v, 'to' => $newVal];
                continue;
            }

            $newLines[] = $line;
        }

        $appendLines = [];
        foreach ($wantedDefaults as $key => $wantedVal) {
            $hasKey = array_key_exists($key, $existingVars) || $this->envLinesContainKey($newLines, $key);

            if ($hasKey) {
                continue;
            }

            $appendLines[] = $this->formatEnvLine($key, $wantedVal);
            $touched[$key] = ['from' => null, 'to' => $wantedVal];
        }

        if (!empty($appendLines)) {
            $newLines[] = '';
            $newLines[] = '# OAuth client bridge';
            foreach ($appendLines as $appendLine) {
                $newLines[] = $appendLine;
            }
        }

        $newContent = implode(PHP_EOL, $newLines);
        $changed = ($newContent !== $original);

        $this->line("Env path: {$envPath}");
        $this->line("OAuth client id: {$oauthClientId}");
        if ($markerFile) {
            $this->line("Marker file: {$markerFile}");
        }
        $this->line('---');

        if (!empty($touched)) {
            $this->info('Set/updated keys:');
            foreach ($touched as $k => $diff) {
                $from = $this->maskIfSecret($k, $diff['from']);
                $to = $this->maskIfSecret($k, $diff['to']);
                $this->line(" - {$k}: {$from} -> {$to}");
            }
        } else {
            $this->info('Set/updated keys: (none)');
        }

        if (!$changed) {
            $this->info('No changes needed.');

            if (!$dryRun && $markerFile) {
                $this->ensureDir(dirname($markerFile));
                File::put($markerFile, 'migrated ' . now()->toDateTimeString() . PHP_EOL);
                $this->info("Marker written: {$markerFile}");
            }

            return self::SUCCESS;
        }

        if ($dryRun) {
            $this->warn('Dry-run enabled: no file written.');
            return self::SUCCESS;
        }

        $backupPath = $envPath . '.bak.' . now()->format('YmdHis');
        File::put($backupPath, $original);
        $this->info("Backup created: {$backupPath}");

        File::put($envPath, $newContent);
        $this->info("Updated env written: {$envPath}");

        if ($markerFile) {
            $this->ensureDir(dirname($markerFile));
            File::put($markerFile, 'migrated ' . now()->toDateTimeString() . PHP_EOL);
            $this->info("Marker written: {$markerFile}");
        }

        return self::SUCCESS;
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

            [$k, $v] = $this->splitEnvLine($line);
            if ($k === null) {
                continue;
            }

            $vars[$k] = $v;
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
        $val = substr($line, $pos + 1);

        if ($key === '' || preg_match('/\s/', $key)) {
            return [null, null];
        }

        return [$key, $val];
    }

    private function envLinesContainKey(array $lines, string $key): bool
    {
        foreach ($lines as $line) {
            if ($line === '' || str_starts_with(ltrim($line), '#')) {
                continue;
            }

            [$k, $_] = $this->splitEnvLine($line);
            if ($k === $key) {
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

    private function maskIfSecret(string $key, ?string $value): string
    {
        if ($value === null) {
            return '(null)';
        }

        if ($key === 'OAUTH_CLIENT_SECRET') {
            $len = strlen($value);
            if ($len <= 8) {
                return '***';
            }
            return substr($value, 0, 5) . '***' . substr($value, -4);
        }

        return $value === '' ? '(empty)' : $value;
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