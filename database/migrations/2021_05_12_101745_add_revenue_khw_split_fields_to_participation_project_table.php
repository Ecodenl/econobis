<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRevenueKhwSplitFieldsToParticipationProjectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participation_project', function (Blueprint $table) {
            //
            $table->integer('kwh_start_low_next_revenue')->nullable()->default(null)->after('date_register');
            $table->integer('kwh_start_high_next_revenue')->nullable()->default(null)->after('date_register');
            $table->date('date_next_revenue_kwh')->nullable()->default(null)->after('date_register');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('participation_project', function (Blueprint $table) {
            //
        });
        if (Schema::hasColumn('participation_project', 'date_next_revenue_kwh'))
        {
            Schema::table('participation_project', function (Blueprint $table)
            {
                $table->dropColumn('date_next_revenue_kwh');
            });
        }
        if (Schema::hasColumn('participation_project', 'kwh_start_high_next_revenue'))
        {
            Schema::table('participation_project', function (Blueprint $table)
            {
                $table->dropColumn('kwh_start_high_next_revenue');
            });
        }
        if (Schema::hasColumn('participation_project', 'kwh_start_low_next_revenue'))
        {
            Schema::table('participation_project', function (Blueprint $table)
            {
                $table->dropColumn('kwh_start_low_next_revenue');
            });
        }
    }
}
