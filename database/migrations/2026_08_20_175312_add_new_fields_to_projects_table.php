<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->integer('total_participations_power_kw_available')->nullable();
            $table->integer('total_participations_power_kwh_consumption')->nullable();

            $table->string('monitor_provider', 191)->nullable();
            $table->string('energy_community_external_code', 191)->nullable()->unique();

            $table->boolean('energy_sharing')->default(false);
            $table->boolean('energy_supplier_registration_required')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn([
                'total_participations_power_kw_available',
                'total_participations_power_kwh_consumption',
                'monitor_provider',
                'energy_community_external_code',
                'energy_sharing',
                'energy_supplier_registration_required',
            ]);
        });
    }
};