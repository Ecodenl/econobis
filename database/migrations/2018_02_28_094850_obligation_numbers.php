<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ObligationNumbers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('obligation_numbers', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('participation_id');
            $table->foreign('participation_id')
                ->references('id')->on('participation_production_project')
                ->onDelete('restrict');

            $table->string('number');
            $table->unique(['number', 'participation_id']);

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('obligation_numbers');
    }
}
