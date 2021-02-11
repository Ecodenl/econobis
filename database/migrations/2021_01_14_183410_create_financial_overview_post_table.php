<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFinancialOverviewPostTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('financial_overview_post', function (Blueprint $table) {
            $table->increments('id');
            $table->string('filename');
            $table->string('name');
            $table->unsignedInteger('financial_overview_id');
            $table->foreign('financial_overview_id', 'fo_post_id_foreign')->references('id')->on('financial_overviews');
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
        Schema::dropIfExists('financial_overview_post');
    }
}
