<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDateReportFieldToRevenueDistributionKwhTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('revenue_distribution_kwh', function (Blueprint $table) {
            $table->date('date_participant_report')->nullable()->after('status');
            $table->date('end_date_participant_report')->nullable()->after('status');
            $table->date('begin_date_participant_report')->nullable()->after('status');
        });
        Schema::table('revenue_distribution_parts_kwh', function (Blueprint $table) {
            $table->date('date_participant_report')->nullable()->after('is_end_year_period');
            $table->date('end_date_participant_report')->nullable()->after('is_end_year_period');
            $table->date('begin_date_participant_report')->nullable()->after('is_end_year_period');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('revenue_distribution_parts_kwh', 'begin_date_participant_report')) {
            Schema::table('revenue_distribution_parts_kwh', function (Blueprint $table) {
                $table->dropColumn('begin_date_participant_report');
            });
        }
        if (Schema::hasColumn('revenue_distribution_parts_kwh', 'end_date_participant_report')) {
            Schema::table('revenue_distribution_parts_kwh', function (Blueprint $table) {
                $table->dropColumn('end_date_participant_report');
            });
        }
        if (Schema::hasColumn('revenue_distribution_parts_kwh', 'date_participant_report')) {
            Schema::table('revenue_distribution_parts_kwh', function (Blueprint $table) {
                $table->dropColumn('date_participant_report');
            });
        }
        if (Schema::hasColumn('revenue_distribution_kwh', 'begin_date_participant_report')) {
            Schema::table('revenue_distribution_kwh', function (Blueprint $table) {
                $table->dropColumn('begin_date_participant_report');
            });
        }
        if (Schema::hasColumn('revenue_distribution_kwh', 'end_date_participant_report')) {
            Schema::table('revenue_distribution_kwh', function (Blueprint $table) {
                $table->dropColumn('end_date_participant_report');
            });
        }
        if (Schema::hasColumn('revenue_distribution_kwh', 'date_participant_report')) {
            Schema::table('revenue_distribution_kwh', function (Blueprint $table) {
                $table->dropColumn('date_participant_report');
            });
        }
    }
}
