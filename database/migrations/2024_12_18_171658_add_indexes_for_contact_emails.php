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
            // Index voor filtering en sortering in de emails-tabel
            $table->index(['folder', 'mailbox_id', 'deleted_at', 'date_sent'], 'idx_emails_folder_mailbox_deleted_sent');
        });

        Schema::table('contacts', function (Blueprint $table) {
            // Index voor filtering op full_name en deleted_at
            $table->index(['full_name', 'deleted_at'], 'idx_contacts_fullname_deleted');
        });

        Schema::table('contact_email', function (Blueprint $table) {
            // Index voor optimaliseren van joins
            $table->index(['email_id', 'contact_id'], 'idx_contact_email');
        });

        Schema::table('contact_email_manual', function (Blueprint $table) {
            // Index voor optimaliseren van joins
            $table->index(['email_id', 'contact_id'], 'idx_contact_email_manual');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('emails', function (Blueprint $table) {
            $table->dropIndex('idx_emails_folder_mailbox_deleted_sent');
        });

        Schema::table('contacts', function (Blueprint $table) {
            $table->dropIndex('idx_contacts_fullname_deleted');
        });

        Schema::table('contact_email', function (Blueprint $table) {
            $table->dropIndex('idx_contact_email');
        });

        Schema::table('contact_email_manual', function (Blueprint $table) {
            $table->dropIndex('idx_contact_email_manual');
        });
    }
};
