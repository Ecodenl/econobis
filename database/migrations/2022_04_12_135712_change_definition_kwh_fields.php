<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeDefinitionKwhFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('xxx_conversion_revenues_kwh', function (Blueprint $table) {
            $table->float('old_delivered_total', 14, 6)->nullable()->change();
            $table->float('old_delivered_total_concept', 14, 6)->nullable()->change();
            $table->float('old_delivered_total_confirmed', 14, 6)->nullable()->change();
            $table->float('old_delivered_total_processed', 14, 6)->nullable()->change();
            $table->float('new_delivered_total', 14, 6)->nullable()->change();
            $table->float('new_delivered_total_concept', 14, 6)->nullable()->change();
            $table->float('new_delivered_total_confirmed', 14, 6)->nullable()->change();
            $table->float('new_delivered_total_processed', 14, 6)->nullable()->change();
        });

        Schema::table('revenues_kwh', function (Blueprint $table) {
            $table->float('delivered_total_concept', 14, 6)->nullable()->change();
            $table->float('delivered_total_confirmed', 14, 6)->nullable()->change();
            $table->float('delivered_total_processed', 14, 6)->nullable()->change();

        });
        Schema::table('revenue_parts_kwh', function (Blueprint $table) {
            $table->float('delivered_total_concept', 14, 6)->nullable()->change();
            $table->float('delivered_total_confirmed', 14, 6)->nullable()->change();
            $table->float('delivered_total_processed', 14, 6)->nullable()->change();
        });
        Schema::table('revenue_distribution_kwh', function (Blueprint $table) {
            $table->float('delivered_total_concept', 14, 6)->nullable()->change();
            $table->float('delivered_total_confirmed', 14, 6)->nullable()->change();
            $table->float('delivered_total_processed', 14, 6)->nullable()->change();

        });
        Schema::table('revenue_values_kwh', function (Blueprint $table) {
            $table->float('kwh_start', 14, 6)->nullable()->change();
            $table->float('kwh_start_high', 14, 6)->nullable()->change();
            $table->float('kwh_start_low', 14, 6)->nullable()->change();
            $table->float('delivered_kwh', 14, 6)->nullable()->change();
        });
        Schema::table('revenue_distribution_values_kwh', function (Blueprint $table) {
            $table->float('delivered_kwh', 14, 6)->nullable()->change();
        });
        Schema::table('revenue_distribution_parts_kwh', function (Blueprint $table) {
            $table->float('delivered_kwh', 14, 6)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('xxx_conversion_revenues_kwh', function (Blueprint $table) {
            $table->float('old_delivered_total', 12, 6)->nullable()->change();
            $table->float('old_delivered_total_concept', 12, 6)->nullable()->change();
            $table->float('old_delivered_total_confirmed', 12, 6)->nullable()->change();
            $table->float('old_delivered_total_processed', 12, 6)->nullable()->change();
            $table->float('new_delivered_total', 12, 6)->nullable()->change();
            $table->float('new_delivered_total_concept', 12, 6)->nullable()->change();
            $table->float('new_delivered_total_confirmed', 12, 6)->nullable()->change();
            $table->float('new_delivered_total_processed', 12, 6)->nullable()->change();
        });
        Schema::table('revenues_kwh', function (Blueprint $table) {
            $table->float('delivered_total_concept', 12, 6)->nullable()->change();
            $table->float('delivered_total_confirmed', 12, 6)->nullable()->change();
            $table->float('delivered_total_processed', 12, 6)->nullable()->change();

        });
        Schema::table('revenue_parts_kwh', function (Blueprint $table) {
            $table->float('delivered_total_concept', 12, 6)->nullable()->change();
            $table->float('delivered_total_confirmed', 12, 6)->nullable()->change();
            $table->float('delivered_total_processed', 12, 6)->nullable()->change();
        });
        Schema::table('revenue_distribution_kwh', function (Blueprint $table) {
            $table->float('delivered_total_concept', 12, 6)->nullable()->change();
            $table->float('delivered_total_confirmed', 12, 6)->nullable()->change();
            $table->float('delivered_total_processed', 12, 6)->nullable()->change();

        });
        Schema::table('revenue_values_kwh', function (Blueprint $table) {
            $table->float('kwh_start', 12, 6)->nullable()->change();
            $table->float('kwh_start_high', 12, 6)->nullable()->change();
            $table->float('kwh_start_low', 12, 6)->nullable()->change();
            $table->float('delivered_kwh', 12, 6)->nullable()->change();
        });
        Schema::table('revenue_distribution_values_kwh', function (Blueprint $table) {
            $table->float('delivered_kwh', 12, 6)->nullable()->change();
        });
        Schema::table('revenue_distribution_parts_kwh', function (Blueprint $table) {
            $table->float('delivered_kwh', 12, 6)->nullable()->change();
        });
    }
}
