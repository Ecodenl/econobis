<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeFirstMailboxToPrimary extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $mailbox = \App\Eco\Mailbox\Mailbox::first();
        $mailbox->primary = true;
        $mailbox->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('mailboxes', function (Blueprint $table) {
            //
        });
    }
}