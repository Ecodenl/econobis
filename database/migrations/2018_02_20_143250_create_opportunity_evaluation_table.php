<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOpportunityEvaluationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('opportunity_evaluation', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('is_realised');
            $table->boolean('is_statisfied');
            $table->boolean('would_recommend_organisation');
            $table->string('note');

            $table->unsignedInteger('opportunity_id');
            $table->foreign('opportunity_id')
                ->references('id')->on('opportunities')
                ->onDelete('restrict');

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
        Schema::dropIfExists('opportunity_evaluation');
    }
}
