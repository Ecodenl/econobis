<?php

namespace App\Console\Commands\Install;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MigrateEnvToPrivateCaptcha extends Command
{
    protected $signature = 'install:migrate-env-privatecaptcha
        {--path= : Absolute path to the .env file (defaults to base_path(.env))}
        {--seed-file= : Absolute path to a seed env file containing PrivateCaptcha keys}
        {--marker-file= : If set and exists, command will skip. If set and not exists, it will be created after success}
        {--dry-run : Do not write, only show changes}';

    protected $description = 'Migrate .env from Google reCAPTCHA to PrivateCaptcha (one-time safe + seed-file support)';

    public function handle(): int
    {
        $envPath = $this->option('path') ?: base_path('.env');
        $seedFile = $this->option('seed-file');
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

        $seedVars = [];
        if ($seedFile) {
            if (!File::exists($seedFile)) {
                $this->error("Seed file not found: {$seedFile}");
                return self::FAILURE;
            }
            $seedVars = $this->parseEnvFileToAssoc(File::get($seedFile));
        }

        $original = File::get($envPath);
        $lines = preg_split("/\r\n|\n|\r/", $original);

        // Keys we remove from env (Google reCAPTCHA server-side)
        $removeKeys = [
            'RE_CAPTCHA_SERVER_SIDE_URL',
            'RE_CAPTCHA_SERVER_SIDE_KEY',
        ];

        // Keys we will ensure exist for PrivateCaptcha
        // Values come from seed file if provided; otherwise keep existing if present; otherwise default value (some empty).
        $privateDefaults = [
            'PRIVATECAPTCHA_SITEKEY_NL'  => $seedVars['PRIVATECAPTCHA_SITEKEY_NL']  ?? null,
            'PRIVATECAPTCHA_SITEKEY_EU'  => $seedVars['PRIVATECAPTCHA_SITEKEY_EU']  ?? null,
            'PRIVATECAPTCHA_API_KEY'     => $seedVars['PRIVATECAPTCHA_API_KEY']     ?? null,
            'PRIVATECAPTCHA_VERIFY_URL'  => $seedVars['PRIVATECAPTCHA_VERIFY_URL']  ?? 'https://api.privatecaptcha.com/verify',
            'PRIVATECAPTCHA_ENABLED'     => $seedVars['PRIVATECAPTCHA_ENABLED']     ?? 'true',
        ];

        // Parse existing .env to know which keys already exist (so we don't blindly append duplicates)
        $existingVars = $this->parseEnvFileToAssoc($original);

        // First pass: rewrite lines; remove keys; keep everything else intact
        $newLines = [];
        $removed = [];
        $touched = [];

        foreach ($lines as $line) {
            // preserve empty lines and comments as-is
            if ($line === '' || str_starts_with(ltrim($line), '#')) {
                $newLines[] = $line;
                continue;
            }

            [$k, $v] = $this->splitEnvLine($line);
            if ($k === null) {
                // unknown line, keep
                $newLines[] = $line;
                continue;
            }

            if (in_array($k, $removeKeys, true)) {
                $removed[] = $k;
                continue; // drop line
            }

            // If PrivateCaptcha key already exists in env AND we have a seeded value, we overwrite it.
            if (array_key_exists($k, $privateDefaults) && $privateDefaults[$k] !== null) {
                $newVal = $privateDefaults[$k];
                $newLines[] = $this->formatEnvLine($k, $newVal);
                $touched[$k] = ['from' => $v, 'to' => $newVal];
                continue;
            }

            // Otherwise keep original line untouched
            $newLines[] = $line;
        }

        // Second pass: ensure all PrivateCaptcha keys exist; if missing, append them
        $appendLines = [];
        foreach ($privateDefaults as $key => $wantedVal) {
            $hasKey = array_key_exists($key, $existingVars) || $this->envLinesContainKey($newLines, $key);

            if ($hasKey) {
                continue;
            }

            // If no seed provided, some are allowed to be empty; we still add the key.
            $valToWrite = $wantedVal ?? '';
            $appendLines[] = $this->formatEnvLine($key, $valToWrite);
            $touched[$key] = ['from' => null, 'to' => $valToWrite];
        }

        // Append a blank line + comment header (only if we actually append anything)
        if (!empty($appendLines)) {
            $newLines[] = '';
            $newLines[] = '# PrivateCaptcha';
            foreach ($appendLines as $l) {
                $newLines[] = $l;
            }
        }

        $newContent = implode(PHP_EOL, $newLines);
        $changed = ($newContent !== $original);

        // Output summary
        $this->line("Env path: {$envPath}");
        if ($seedFile) $this->line("Seed file: {$seedFile}");
        if ($markerFile) $this->line("Marker file: {$markerFile}");
        $this->line('---');

        if (!empty($removed)) {
            $this->info('Removed keys: ' . implode(', ', array_unique($removed)));
        } else {
            $this->info('Removed keys: (none)');
        }

        if (!empty($touched)) {
            $this->info('Set/updated keys:');
            foreach ($touched as $k => $diff) {
                $from = $this->maskIfSecret($k, $diff['from']);
                $to   = $this->maskIfSecret($k, $diff['to']);
                $this->line(" - {$k}: {$from} -> {$to}");
            }
        } else {
            $this->info('Set/updated keys: (none)');
        }

        if (!$changed) {
            $this->info('No changes needed.');
            // still create marker, because “done is done”
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

        // Backup (optional but nice): .env.bak.YYYYmmddHHMMSS
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
            if ($line === '' || str_starts_with($line, '#')) continue;

            [$k, $v] = $this->splitEnvLine($line);
            if ($k === null) continue;

            $vars[$k] = $v;
        }

        return $vars;
    }

    /**
     * Splits a line like KEY=value into [KEY, value].
     * Returns [null, null] if the line is not a simple assignment.
     */
    private function splitEnvLine(string $line): array
    {
        // ignore "export KEY=..."
        $line = preg_replace('/^\s*export\s+/', '', $line);

        $pos = strpos($line, '=');
        if ($pos === false) return [null, null];

        $key = trim(substr($line, 0, $pos));
        $val = substr($line, $pos + 1);

        if ($key === '' || preg_match('/\s/', $key)) {
            return [null, null];
        }

        // do not unquote; keep raw as in file
        return [$key, $val];
    }

    private function envLinesContainKey(array $lines, string $key): bool
    {
        foreach ($lines as $line) {
            if ($line === '' || str_starts_with(ltrim($line), '#')) continue;
            [$k, $_] = $this->splitEnvLine($line);
            if ($k === $key) return true;
        }
        return false;
    }

    private function formatEnvLine(string $key, string $value): string
    {
        // If value contains spaces or special chars, quote it
        $needsQuotes = strpbrk($value, " #\t\r\n\"'") !== false;
        if ($needsQuotes) {
            // escape existing double quotes
            $escaped = str_replace('"', '\"', $value);
            return $key . '="' . $escaped . '"';
        }

        return $key . '=' . $value;
    }

    private function maskIfSecret(string $key, ?string $value): string
    {
        if ($value === null) return '(null)';
        $secretKeys = ['PRIVATECAPTCHA_API_KEY', 'RE_CAPTCHA_SERVER_SIDE_KEY'];
        if (in_array($key, $secretKeys, true)) {
            // show only prefix + last 4 chars
            $len = strlen($value);
            if ($len <= 8) return '***';
            return substr($value, 0, 5) . '***' . substr($value, -4);
        }
        return $value === '' ? '(empty)' : $value;
    }

    private function ensureDir(string $dir): void
    {
        if (!File::isDirectory($dir)) {
            File::makeDirectory($dir, 0750, true);
        }
    }
}