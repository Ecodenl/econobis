<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeFieldsOpportunityEvaluation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('opportunity_evaluation', function (Blueprint $table) {
            $table->string('is_realised', 1)->nullable()->change();
            $table->string('is_statisfied',1)->nullable()->change();
            $table->string('would_recommend_organisation',1)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('opportunity_evaluation', function (Blueprint $table) {
            $table->boolean('is_realised')->change();
            $table->boolean('is_statisfied')->change();
            $table->boolean('would_recommend_organisation')->change();
        });
    }
}
