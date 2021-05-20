<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddEmailMarkAsSeenToMailboxesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('mailboxes', function (Blueprint $table) {
            $table->boolean('email_mark_as_seen')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('mailboxes', 'email_mark_as_seen'))
        {
            Schema::table('mailboxes', function (Blueprint $table)
            {
                $table->dropColumn('email_mark_as_seen');
            });
        }
    }
}
