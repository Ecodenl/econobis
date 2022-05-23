<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeDateBeginAndDateEndInProjectRevenuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_revenues', function (Blueprint $table) {
            $table->date('date_begin')->change();
            $table->date('date_end')->change();
        });    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('project_revenues', function (Blueprint $table) {
            $table->string('date_begin')->change();
            $table->string('date_end')->change();
        });
    }
}
