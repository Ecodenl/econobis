<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddGmailMessageIdToEmailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('emails', function (Blueprint $table) {
            $table->string('gmail_message_id')->nullable()->after('imap_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('emails', 'gmail_message_id'))
        {
            Schema::table('emails', function (Blueprint $table)
            {
                $table->dropColumn('gmail_message_id');
            });
        }
    }
}
