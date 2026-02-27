<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;

class MigrateEnvToPrivateCaptcha extends Command
{
    protected $signature = 'install:migrate-env-privatecaptcha
        {--path=.env : Path to the env file}
        {--run-server-data : Also run install:createServerDataJs after updating .env}
        {--dry-run : Show changes but do not modify the file}';

    protected $description = 'Migrate .env from Google reCAPTCHA to PrivateCaptcha variables (backend only).';

    public function handle(): int
    {
        $path = base_path($this->option('path'));
        $dryRun = $this->option('dry-run');

        if (!File::exists($path)) {
            $this->error("Env file not found: {$path}");
            return self::FAILURE;
        }

        $originalContent = File::get($path);
        $content = $originalContent;

        $this->info('Removing old Google reCAPTCHA variables...');
        $content = preg_replace('/^\s*RE_CAPTCHA_SERVER_SIDE_URL=.*\R?/m', '', $content);
        $content = preg_replace('/^\s*RE_CAPTCHA_SERVER_SIDE_KEY=.*\R?/m', '', $content);
        $content = preg_replace('/^\s*REACT_APP_RE_CAPTCHA_KEY_EU=.*\R?/m', '', $content);
        $content = preg_replace('/^\s*REACT_APP_RE_CAPTCHA_KEY=.*\R?/m', '', $content);

        $this->info('Ensuring PrivateCaptcha backend variables exist...');

        $vars = [
            'PRIVATECAPTCHA_SITEKEY_NL' => env('PRIVATECAPTCHA_SITEKEY_NL', ''),
            'PRIVATECAPTCHA_SITEKEY_EU' => env('PRIVATECAPTCHA_SITEKEY_EU', ''),
            'PRIVATECAPTCHA_API_KEY'    => env('PRIVATECAPTCHA_API_KEY', ''),
            'PRIVATECAPTCHA_VERIFY_URL' => env('PRIVATECAPTCHA_VERIFY_URL', 'https://api.privatecaptcha.com/verify'),
            'PRIVATECAPTCHA_ENABLED'    => env('PRIVATECAPTCHA_ENABLED', 'true'),
        ];

        foreach ($vars as $key => $value) {
            $content = $this->setEnvLine($content, $key, $value);
        }

        $content = preg_replace("/\n{3,}/", "\n\n", trim($content)) . "\n";

        if ($dryRun) {
            $this->warn('--- DRY RUN --- No changes written.');
            $this->line('');
            $this->line('Resulting .env content preview:');
            $this->line('----------------------------------------');
            $this->line($content);
            $this->line('----------------------------------------');
            return self::SUCCESS;
        }

        if ($content !== $originalContent) {
            File::put($path, $content);
            $this->info('.env updated successfully.');
        } else {
            $this->info('No changes needed.');
        }

        if ($this->option('run-server-data')) {
            $this->info('Generating server-data.js...');
            Artisan::call('install:createServerDataJs');
            $this->line(Artisan::output());
        }

        return self::SUCCESS;
    }

    private function setEnvLine(string $content, string $key, string $value): string
    {
        $value = $this->escapeEnvValue($value);

        if (preg_match("/^{$key}=.*$/m", $content)) {
            return preg_replace("/^{$key}=.*$/m", "{$key}={$value}", $content);
        }

        return rtrim($content) . "\n{$key}={$value}\n";
    }

    private function escapeEnvValue(string $value): string
    {
        if ($value === '') return '';

        if (preg_match('/\s|#|=|"|\'/', $value)) {
            $value = str_replace('"', '\"', $value);
            return "\"{$value}\"";
        }

        return $value;
    }
}