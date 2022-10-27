<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeamContactGroupAndMailboxTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('team_contact_group', function (Blueprint $table) {
            $table->integer('contact_group_id')->unsigned();
            $table->foreign('contact_group_id')->references('id')->on('contact_groups');
            $table->integer('team_id')->unsigned();
            $table->foreign('team_id')->references('id')->on('teams');
            $table->unique(['contact_group_id','team_id']);
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
        Schema::dropIfExists('team_contact_group');
    }
}
