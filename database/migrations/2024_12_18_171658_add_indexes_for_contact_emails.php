<?php

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
        Schema::table('emails', function (Blueprint $table) {
            $table->index(['folder', 'mailbox_id', 'deleted_at', 'subject', 'status', 'date_sent'], 'idx_emails_advanced');
        });

        Schema::table('contact_email', function (Blueprint $table) {
            $table->index(['email_id', 'contact_id'], 'idx_contact_email_email_contact');
        });

        Schema::table('contact_email_manual', function (Blueprint $table) {
            $table->index(['email_id', 'contact_id'], 'idx_contact_email_manual_email_contact');
        });

        Schema::table('contacts', function (Blueprint $table) {
            $table->index(['id', 'deleted_at', 'full_name'], 'idx_contacts_advanced');
        });

        Schema::table('mailboxes', function (Blueprint $table) {
            $table->index(['id', 'name'], 'idx_mailboxes_name');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->index(['id', 'first_name', 'last_name'], 'idx_users_name');
        });

        Schema::table('teams', function (Blueprint $table) {
            $table->index(['id', 'name'], 'idx_teams_name');
        });

        Schema::table('email_attachments', function (Blueprint $table) {
            $table->index(['email_id', 'id', 'cid'], 'idx_email_attachments');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
//        Schema::table('emails', function (Blueprint $table) {
//            $table->dropIndex('idx_emails_folder_mailbox_deleted_sent');
//        });
//        Schema::table('contacts', function (Blueprint $table) {
//            $table->dropIndex('idx_contacts_fullname_deleted');
//        });
//        Schema::table('contact_email', function (Blueprint $table) {
//            $table->dropIndex('idx_contact_email');
//        });
//        Schema::table('contact_email_manual', function (Blueprint $table) {
//            $table->dropIndex('idx_contact_email_manual');
//        });

        Schema::table('emails', function (Blueprint $table) {
            $table->dropIndex('idx_emails_advanced');
        });

        Schema::table('contact_email', function (Blueprint $table) {
            $table->dropIndex('idx_contact_email_email_contact');
        });

        Schema::table('contact_email_manual', function (Blueprint $table) {
            $table->dropIndex('idx_contact_email_manual_email_contact');
        });

        Schema::table('contacts', function (Blueprint $table) {
            $table->dropIndex('idx_contacts_advanced');
        });

        Schema::table('mailboxes', function (Blueprint $table) {
            $table->dropIndex('idx_mailboxes_name');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex('idx_users_name');
        });

        Schema::table('teams', function (Blueprint $table) {
            $table->dropIndex('idx_teams_name');
        });

        Schema::table('email_attachments', function (Blueprint $table) {
            $table->dropIndex('idx_email_attachments');
        });
    }
};