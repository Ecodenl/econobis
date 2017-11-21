<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeasuresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('energy_labels', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('measures', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('energy_label_id')->unsigned();
            $table->foreign('energy_label_id')->references('id')->on('energy_labels');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('measure_taken_address', function (Blueprint $table) {
            $table->integer('address_id')->unsigned();
            $table->foreign('address_id')->references('id')->on('addresses');
            $table->integer('measure_id')->unsigned();
            $table->foreign('measure_id')->references('id')->on('measures');
            $table->date('measure_date');
            $table->unique(['address_id','measure_id']);
            $table->timestamps();
        });

        Schema::create('measure_requested_address', function (Blueprint $table) {
            $table->integer('address_id')->unsigned();
            $table->foreign('address_id')->references('id')->on('addresses');
            $table->integer('measure_id')->unsigned();
            $table->foreign('measure_id')->references('id')->on('measures');
            $table->date('desired_date');
            $table->tinyInteger('degree_interest');
            $table->unique(['address_id','measure_id']);
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

    }
}
