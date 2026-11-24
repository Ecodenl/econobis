<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $unknownClients = DB::table('oauth_clients')
            ->where('revoked', false)
            ->where('personal_access_client', false)
            ->where('password_client', false)
            ->where('name', 'not like', '%ClientCredentials Grant Client%')
            ->where('name', 'not like', '%AuthCode Client%')
            ->pluck('name');

        if ($unknownClients->isNotEmpty()) {
            throw new RuntimeException(
                'Grant types kunnen niet worden bepaald voor OAuth-clients: ' .
                $unknownClients->implode(', ')
            );
        }

        Schema::table('oauth_clients', function (Blueprint $table) {
            $table->text('grant_types')
                ->nullable()
                ->after('provider');
        });

        DB::table('oauth_clients')
            ->where('personal_access_client', true)
            ->update([
                'grant_types' => json_encode(['personal_access']),
            ]);

        DB::table('oauth_clients')
            ->where('password_client', true)
            ->update([
                'grant_types' => json_encode([
                    'password',
                    'refresh_token',
                ]),
            ]);

        DB::table('oauth_clients')
            ->where('name', 'like', '%ClientCredentials Grant Client%')
            ->update([
                'grant_types' => json_encode([
                    'client_credentials',
                ]),
            ]);

        DB::table('oauth_clients')
            ->where('name', 'like', '%AuthCode Client%')
            ->update([
                'grant_types' => json_encode([
                    'authorization_code',
                    'refresh_token',
                ]),
            ]);
    }

    public function down(): void
    {
        Schema::table('oauth_clients', function (Blueprint $table) {
            $table->dropColumn('grant_types');
        });
    }
};