<?php

use App\Eco\Email\Email;
use App\Eco\Mailbox\Mailbox;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // mailbox_gmail_api_settings
        Schema::rename('mailbox_gmail_api_settings', 'mailbox_oauth_api_settings');

        Schema::table('emails', function (Blueprint $table) {
            $table->string('msoauth_message_id')->nullable()->after('gmail_message_id');
            $table->renameColumn('gmail_message_id', 'xxx_gmail_message_id');
        });

        $emails = Email::all();
        foreach ($emails as $email){
            $email->msoauth_message_id = $email->xxx_gmail_message_id;
            $email->save();
        }

        $mailboxes = Mailbox::all();
        foreach ($mailboxes as $mailbox){
            if($mailbox->incoming_server_type == 'gmail' || $mailbox->outgoing_server_type == 'gmail' ){
                $mailbox->valid = false;
                $mailbox->is_active = false;
                if($mailbox->incoming_server_type == 'gmail') {
                    $mailbox->incoming_server_type = 'imap';
                }
                if($mailbox->outgoing_server_type == 'gmail' ) {
                    $mailbox->outgoing_server_type = 'smtp';
                }
                $mailbox->save();
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('emails', function (Blueprint $table) {
            $table->dropColumn('msoauth_message_id');
            $table->renameColumn('xxx_gmail_message_id', 'gmail_message_id');
        });

        Schema::rename('mailbox_oauth_api_settings', 'mailbox_gmail_api_settings');
    }
};
