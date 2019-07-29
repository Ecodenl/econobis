<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAmountResultToProjectRevenueDeliverdKwhPeriodTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_revenue_delivered_kwh_period', function (Blueprint $table) {
            $table->double('amount_result', 10, 2)->nullable()->after('delivered_kwh');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
//        Schema::table('project_revenue_delivered_kwh_period', function ($table) {
//            $table->dropColumn('amount_result');
//        });
    }
}
