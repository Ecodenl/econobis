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
        Schema::table('mailboxes', function (Blueprint $table) {
            $table->boolean('is_system_mailbox')->default(false)->after('email');
            $table->boolean('only_outgoing_mailbox')->default(false)->after('is_system_mailbox');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mailboxes', function (Blueprint $table) {
            $table->dropColumn('only_outgoing_mailbox');
            $table->dropColumn('is_system_mailbox');
        });

    }
};
