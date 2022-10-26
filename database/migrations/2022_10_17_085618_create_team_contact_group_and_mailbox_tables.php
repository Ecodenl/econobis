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
// todo WM: team_mailbox niet nodig (autorisatie kan via mailbox_user)
// Wellicht hebben we later wel team_document_created_from nodig.
//        Schema::create('team_mailbox', function (Blueprint $table) {
//            $table->integer('mailbox_id')->unsigned();
//            $table->foreign('mailbox_id')->references('id')->on('mailboxes');
//            $table->integer('team_id')->unsigned();
//            $table->foreign('team_id')->references('id')->on('teams');
//            $table->unique(['mailbox_id','team_id']);
//            $table->timestamps();
//        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('team_contact_group');
// todo WM: team_mailbox niet nodig (autorisatie kan via mailbox_user)
// Wellicht hebben we later wel team_document_created_from nodig.
//        Schema::dropIfExists('team_mailbox');
    }
}
