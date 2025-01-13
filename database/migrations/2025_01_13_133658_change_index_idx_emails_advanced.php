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
            $table->dropIndex('idx_emails_advanced');
        });
        Schema::table('emails', function (Blueprint $table) {
            $table->index(['folder', 'mailbox_id', 'deleted_at', 'date_sent', 'from', 'status'], 'idx_emails_advanced');
        });

        DB::statement('ANALYZE TABLE emails');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('emails', function (Blueprint $table) {
            $table->dropIndex('idx_emails_advanced');
        });
        Schema::table('emails', function (Blueprint $table) {
            $table->index(['folder', 'mailbox_id', 'deleted_at', 'from', \DB::raw('subject(191)'), 'status', 'date_sent'], 'idx_emails_advanced');
        });

    }
};
