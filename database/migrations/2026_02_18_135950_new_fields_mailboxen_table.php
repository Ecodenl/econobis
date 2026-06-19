<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('mailgun_domains', function (Blueprint $table) {
            $table->boolean('is_system_mailgun_domain')->default(false)->after('secret');
        });

        Schema::table('mailboxes', function (Blueprint $table) {
            $table->boolean('only_outgoing_mailbox')->default(false)->after('email');
        });

        Schema::table('mailbox_oauth_api_settings', function (Blueprint $table) {
            $table->boolean('force_reconnect')->default(false);
            $table->boolean('force_select_account')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mailbox_oauth_api_settings', function (Blueprint $table) {
            $table->dropColumn('force_select_account');
            $table->dropColumn('force_reconnect');
        });

        Schema::table('mailboxes', function (Blueprint $table) {
            $table->dropColumn('only_outgoing_mailbox');
        });

        Schema::table('mailgun_domains', function (Blueprint $table) {
            $table->dropColumn('is_system_mailgun_domain');
        });

    }
};
