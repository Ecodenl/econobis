<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDatesToRevenueTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('revenue_parts_kwh', function (Blueprint $table) {
            $table->date('date_payout')->nullable()->after('date_confirmed');;
        });
        Schema::table('revenue_distribution_parts_kwh', function (Blueprint $table) {
            $table->date('date_energy_supplier_report')->nullable()->after('is_visible');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('revenue_parts_kwh', function (Blueprint $table) {
            $table->dropColumn('date_payout');
        });
        Schema::table('revenue_distribution_parts_kwh', function (Blueprint $table) {
            $table->dropColumn('date_energy_supplier_report');
        });
    }
}
