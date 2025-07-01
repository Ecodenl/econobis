<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Laravel\Passport\ClientRepository;

class CreatePkceClients extends Command
{
    protected $signature = 'passport:create-pkce-clients';
    protected $description = 'Create PKCE OAuth clients for client-app and customer-portal-app based on configuration';

    public function handle()
    {
        $coopName = config('app.APP_COOP_NAME', 'Unknown Coöperatie');
        $baseUrl = config('app.url', 'http://localhost');

        $clients = [
            [
                'name' => "{$coopName} client-app PKCE Client",
                'provider' => 'users',
                'redirect' => "{$baseUrl}/auth/callback",
            ],
            [
                'name' => "{$coopName} customer-portal-app PKCE Client",
                'provider' => 'portal_users',
                'redirect' => "{$baseUrl}/auth/callback",
            ],
        ];

        $repo = new ClientRepository();

        foreach ($clients as $data) {
            $existing = \DB::table('oauth_clients')->where('name', $data['name'])->first();
            if ($existing) {
                $this->warn("⚠️ Client already exists: {$data['name']}");
                continue;
            }

            $client = $repo->create(
                null,
                $data['name'],
                $data['redirect'],
                null,
                false,
                false,
                false,
            );

            $client->provider = $data['provider'];
            $client->save();

            $this->info("✅ Created: {$client->name} (ID: {$client->id})");
        }
    }
}
