<?php

namespace Database\Seeders\System;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RestApiPassportClientSeeder extends Seeder
{
    public function run(): void
    {
        // ClientCredientials Grant client (geen password / personal access)

        $appName = config('app.name');

        $clientName = "Econobis {$appName} Rest-API ClientCredentials Grant Client";

        // Check of client al bestaat
        $exists = DB::table('oauth_clients')
            ->where('name', $clientName)
            ->where('password_client', false)
            ->where('personal_access_client', false)
            ->exists();

        if ($exists) {
            $this->command?->info("Passport REST API client bestaat al: {$clientName}");
            return;
        }

        $secret = Str::random(40);

        DB::table('oauth_clients')->insert([
            'user_id' => null,
            'name' => $clientName,
            'secret' => password_hash($secret, PASSWORD_BCRYPT),
            'provider' => 'users',
            'redirect' => '',
            'personal_access_client' => false,
            'password_client' => false,
            'revoked' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->command?->info("Passport REST API client aangemaakt:");
        $this->command?->info("Client name: {$clientName}");
        $this->command?->info("⚠️ Client secret (sla veilig op!): {$secret}");
    }
}
