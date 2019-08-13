<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddKwhStartHighAndLowNextRevenueToProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('projects', function (Blueprint $table) {
            $table->integer('kwh_start_low_next_revenue')->nullable()->default(null)->after('date_interest_bearing_kwh');
            $table->integer('kwh_start_high_next_revenue')->nullable()->default(null)->after('date_interest_bearing_kwh');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
