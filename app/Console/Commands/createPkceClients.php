<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;
use Laravel\Passport\ClientRepository;

class CreatePkceClients extends Command
{
    protected $signature = 'passport:create-pkce-clients';
    protected $description = 'Create PKCE OAuth clients for client-app and customer-portal-app based on configuration';

    public function handle()
    {
        $coopName = config('app.APP_COOP_NAME', 'Unknown Coöperatie');
        $baseUrl = config('app.url', 'http://localhost');

        $this->appendToEnvIfMissing('SESSION_DOMAIN', $this->determineSessionDomain());
        $this->appendToEnvIfMissing('SESSION_SAMESITE', 'None');
        $this->appendToEnvIfMissing('SESSION_SECURE_COOKIE', 'true');

        $repo = new ClientRepository();

        $clientAppExisting = \DB::table('oauth_clients')->where('name', "{$coopName} client-app PKCE Client")->first();
        if ($clientAppExisting) {
            $this->warn("⚠️ Client already exists: {$coopName} client-app PKCE Client");
        } else {
            $clientAppClient = $repo->create(
                null,
                "{$coopName} client-app PKCE Client",
                "{$baseUrl}/auth/callback",
                'users',
                false,
                false,
                false,
            );
            $this->info("Client-app client aangemaakt met ID: {$clientAppClient->id}");
            $this->appendToEnvIfMissing('OAUTH_CLIENT_ID', $clientAppClient->id);
        }

        $portalAppExisting = \DB::table('oauth_clients')->where('name', "{$coopName} customer-portal-app PKCE Client")->first();
        if ($portalAppExisting) {
            $this->warn("⚠️ Client already exists: {$coopName} customer-portal-app PKCE Client");
        } else {
            $portalAppClient = $repo->create(
                null,
                "{$coopName} customer-portal-app PKCE Client",
                "{$baseUrl}/auth/callback",
                'portal_users',
                false,
                false,
                false,
            );
            $this->info("Portal-app client aangemaakt met ID: {$portalAppClient->id}");
            $this->appendToEnvIfMissing('OAUTH_PORTAL_CLIENT_ID', $portalAppClient->id);
        }

        Artisan::call('config:cache');
        $this->info('config:cache uitgevoerd');
    }

//    private function appendToEnvIfMissing($key, $value)
//    {
//        $envPath = base_path('.env');
//
//        if (!file_exists($envPath)) {
//            $this->error('.env file not found.');
//            return;
//        }
//
//        $envContent = file_get_contents($envPath);
//
//        if (Str::contains($envContent, "{$key}=")) {
//            $this->info("{$key} already set in .env");
//            return;
//        }
//
//        file_put_contents($envPath, PHP_EOL . "{$key}={$value}" . PHP_EOL, FILE_APPEND);
//        $this->info("{$key} toegevoegd aan .env: {$value}");
//    }
    private function appendToEnvIfMissing($key, $value)
    {
        $envPath = base_path('.env');

        if (!file_exists($envPath)) {
            $this->error('.env file not found.');
            return;
        }

        $envLines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        $keyExists = collect($envLines)->contains(function ($line) use ($key) {
            // Negeer commentaarregels
            $line = trim($line);
            return !Str::startsWith($line, '#') && Str::startsWith($line, "{$key}=");
        });

        if ($keyExists) {
            $this->info("{$key} already set in .env");
            return;
        }

        file_put_contents($envPath, PHP_EOL . "{$key}={$value}" . PHP_EOL, FILE_APPEND);
        $this->info("{$key} toegevoegd aan .env: {$value}");
    }
    private function determineSessionDomain()
    {
        $hostname = gethostname();

        return Str::contains($hostname, 'econobis.eu') ? '.econobis.eu' :
            (Str::contains($hostname, 'econobis-laravel7.nl') ? '.econobis-laravel7.nl' : '.econobis.nl');
    }
}

