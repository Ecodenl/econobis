<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSourcesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sources', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('intake_source', function (Blueprint $table) {
            $table->integer('source_id')->unsigned();
            $table->foreign('source_id')->references('id')->on('sources');
            $table->integer('intake_id')->unsigned();
            $table->foreign('intake_id')->references('id')->on('intakes');
            $table->unique(['source_id','intake_id']);
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
        Schema::dropIfExists('intake_source');
        Schema::dropIfExists('sources');
    }
}
