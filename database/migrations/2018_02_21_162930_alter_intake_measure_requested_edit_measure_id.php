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
        DB::table('intake_measure_requested')->truncate();

        Schema::table('intake_measure_requested', function (Blueprint $table) {
            $table->dropForeign(['measure_id']);
            $table->dropForeign(['intake_id']);

        });

        Schema::table('intake_measure_requested', function (Blueprint $table) {
            $table->dropUnique(['intake_id','measure_id']);

        });

        Schema::table('intake_measure_requested', function (Blueprint $table) {
            $table->foreign('intake_id')
                ->references('id')->on('intakes');

            $table->renameColumn('measure_id', 'measure_category_id');

            $table->foreign('measure_category_id')
                ->references('id')->on('measure_categories')
                ->onDelete('restrict');

            $table->unique(['intake_id','measure_category_id']);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('intake_measure_requested')->truncate();

        Schema::table('intake_measure_requested', function (Blueprint $table) {
            $table->dropForeign(['measure_category_id']);
            $table->dropForeign(['intake_id']);

        });

        Schema::table('intake_measure_requested', function (Blueprint $table) {
            $table->dropUnique(['intake_id','measure_category_id']);

        });

        Schema::table('intake_measure_requested', function (Blueprint $table) {
            $table->foreign('intake_id')
                ->references('id')->on('intakes');

            $table->renameColumn('measure_category_id', 'measure_id');

            $table->foreign('measure_id')
                ->references('id')->on('measures')
                ->onDelete('restrict');

            $table->unique(['intake_id','measure_id']);
        });
    }
}
