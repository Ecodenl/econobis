<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCalculatedParticipationFieldsToProjects extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participation_project', function (Blueprint $table) {
            $table->integer('participations_definitive')->nullable(false)->default(0);
            $table->float('participations_definitive_worth')->nullable(false)->default(0.00);
            $table->integer('participations_optioned')->nullable(false)->default(0);
        });
        Schema::table('projects', function (Blueprint $table) {
            $table->integer('participations_definitive')->nullable(false)->default(0);
            $table->integer('participations_optioned')->nullable(false)->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
