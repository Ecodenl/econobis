<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIntakesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('intake_status', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('intakes', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('contact_id')->unsigned();
            $table->foreign('contact_id')->references('id')->on('contacts');

            $table->integer('address_id')->unsigned()->nullable();
            $table->foreign('address_id')->references('id')->on('addresses');

            $table->integer('intake_status_id')->unsigned()->nullable();
            $table->foreign('intake_status_id')->references('id')->on('intake_status');

            $table->integer('campaign_id')->unsigned()->nullable();
            $table->foreign('campaign_id')->references('id')->on('campaigns');

            $table->string('note')->default('');

            $table->integer('created_by_id')->unsigned();
            $table->foreign('created_by_id')->references('id')->on('users');

            $table->integer('updated_by_id')->unsigned();
            $table->foreign('updated_by_id')->references('id')->on('users');

            $table->timestamps();
        });

        Schema::create('intake_measure_requested', function (Blueprint $table) {
            $table->increments('id')->unique();
            $table->integer('intake_id')->unsigned();
            $table->foreign('intake_id')->references('id')->on('intakes');
            $table->integer('measure_id')->unsigned();
            $table->foreign('measure_id')->references('id')->on('measures');
            $table->unique(['intake_id','measure_id']);
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
        Schema::dropIfExists('intakes');
        Schema::dropIfExists('intake_status');
    }
}
