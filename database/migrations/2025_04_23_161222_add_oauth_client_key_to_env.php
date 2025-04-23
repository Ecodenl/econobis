<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        try {
            Artisan::call('env:updateEnvFileWithNewField');
            Log::info('Commando updateEnvFileWithNewField uitgevoerd');
        } catch (\Throwable $e) {
            // Command bestaat niet of fout tijdens uitvoeren
            Log::warning('Kon env:updateEnvFileWithNewField niet uitvoeren: ' . $e->getMessage());
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
