<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDeliveredTotalsLastEnergySupplierToProjectRevenueDistributionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_revenue_distribution', function (Blueprint $table) {
            $table->double('delivered_total_last_es', 8, 2)->nullable()->after('delivered_total');
            $table->double('delivered_total_last_es_end_calendar_year', 8, 2)->nullable()->after('delivered_total_end_calendar_year');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('project_revenue_distribution', 'delivered_total_last_es_end_calendar_year'))
        {
            Schema::table('project_revenue_distribution', function (Blueprint $table)
            {
                $table->dropColumn('delivered_total_last_es_end_calendar_year');
            });
        }
        if (Schema::hasColumn('project_revenue_distribution', 'delivered_total_last_es'))
        {
            Schema::table('project_revenue_distribution', function (Blueprint $table)
            {
                $table->dropColumn('delivered_total_last_es');
            });
        }
    }
}
