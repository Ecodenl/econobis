<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMailboxToAdministration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('administrations', function (Blueprint $table) {
            $table->integer('mailbox_id')->unsigned()->nullable(true);
            $table->foreign('mailbox_id')->references('id')->on('mailboxes') ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('administrations', function (Blueprint $table) {
            //
        });
    }
}
