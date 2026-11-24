<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement(
            'ALTER TABLE oauth_clients
             MODIFY personal_access_client TINYINT(1) NOT NULL DEFAULT 0,
             MODIFY password_client TINYINT(1) NOT NULL DEFAULT 0'
        );
    }

    public function down(): void
    {
        DB::statement(
            'ALTER TABLE oauth_clients
             MODIFY personal_access_client TINYINT(1) NOT NULL,
             MODIFY password_client TINYINT(1) NOT NULL'
        );
    }
};