<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->integer('total_participations_power_kw_available_other')
                ->nullable()
                ->after('total_participations_power_kwh_consumption');

            $table->integer('total_participations_power_kwh_consumption_other')
                ->nullable()
                ->after('total_participations_power_kw_available_other');
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn([
                'total_participations_power_kw_available_other',
                'total_participations_power_kwh_consumption_other',
            ]);
        });
    }
};
