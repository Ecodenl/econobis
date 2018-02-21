<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterIntakeMeasureRequestedEditMeasureId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('intake_measure_requested', function (Blueprint $table) {
            $table->renameColumn('measure_id', 'measure_category_id');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('intake_measure_requested', function (Blueprint $table) {
            $table->renameColumn('measure_category_id', 'measure_id');
        });
    }
}
