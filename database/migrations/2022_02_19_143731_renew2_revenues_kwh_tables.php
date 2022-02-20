<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Renew2RevenuesKwhTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('revenue_distribution_values_kwh', function (Blueprint $table) {
            $table->date('date_registration')->nullable()->after('revenue_values_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('revenue_distribution_values_kwh', function (Blueprint $table) {
            $table->dropColumn('date_registration');
        });
    }
}
