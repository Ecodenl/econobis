<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterMeasuresAddUpdatedByTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('measures', function (Blueprint $table) {
            $table->unsignedInteger('updated_by_id')->nullable()->default(null);
            $table->foreign('updated_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('measures', function (Blueprint $table) {
            $table->dropForeign(['updated_by_id']);
            $table->dropColumn('updated_by_id');
        });
    }
}
