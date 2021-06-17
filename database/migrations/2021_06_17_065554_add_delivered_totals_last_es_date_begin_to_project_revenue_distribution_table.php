<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDeliveredTotalsLastEsDateBeginToProjectRevenueDistributionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_revenue_distribution', function (Blueprint $table) {
            $table->date('date_begin_last_es')->nullable()->default(null)->after('delivered_total_last_es');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('project_revenue_distribution', 'date_begin_last_es'))
        {
            Schema::table('project_revenue_distribution', function (Blueprint $table)
            {
                $table->dropColumn('date_begin_last_es');
            });
        }
    }
}
