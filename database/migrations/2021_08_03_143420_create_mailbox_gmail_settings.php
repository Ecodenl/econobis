<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMailboxGmailSettings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mailbox_gmail_api_settings', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedInteger('mailbox_id');
            $table->foreign('mailbox_id')->references('id')->on('mailboxes');

            $table->string('client_id')->nullable();
            $table->string('project_id')->nullable();
            $table->text('client_secret')->nullable();
            $table->text('token')->nullable();
            $table->timestamps();
        });

        Schema::table('mailboxes', function (Blueprint $table) {
            $table->string('incoming_server_type')->nullable()->after('mailgun_domain_id');
        });

        foreach (\App\Eco\Mailbox\Mailbox::all() as $mailbox){
            $mailbox->incoming_server_type = 'imap';
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
    }
}
