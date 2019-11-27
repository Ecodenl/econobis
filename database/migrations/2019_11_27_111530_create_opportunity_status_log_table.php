<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOpportunityStatusLogTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('opportunity_status_log', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('opportunity_id');
            $table->foreign('opportunity_id')
                ->references('id')->on('opportunities')
                ->onDelete('restrict');
            $table->unsignedInteger('from_status_id')->nullable();
            $table->foreign('from_status_id')
                ->references('id')->on('opportunity_status')
                ->onDelete('restrict');
            $table->unsignedInteger('to_status_id');
            $table->foreign('to_status_id')
                ->references('id')->on('opportunity_status')
                ->onDelete('restrict');
            $table->dateTime('date_status')->nullable();
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
        Schema::dropIfExists('opportunity_status_log');
    }
}
