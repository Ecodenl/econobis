<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOutgoingServerTypeToMailbox extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('mailboxes', function (Blueprint $table) {
            $table->string('outgoing_server_type')->nullable(false)->default('');
        });

        foreach (\App\Eco\Mailbox\Mailbox::all() as $mailbox){
            $mailbox->outgoing_server_type = 'smtp';
            $mailbox->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('mailboxes', function (Blueprint $table) {
            $table->dropColumn('outgoing_server_type');
        });
    }
}
