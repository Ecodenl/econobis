<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddHoomMailboxIdToCooperations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cooperations', function (Blueprint $table) {
            $table->unsignedInteger('hoom_mailbox_id')->after('hoom_email_template_id')->nullable();
            $table->foreign('hoom_mailbox_id')
                ->references('id')->on('mailboxes')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cooperations', function (Blueprint $table) {
            $table->dropForeign(['hoom_mailbox_id']);
            $table->dropColumn('hoom_mailbox_id');
        });
    }
}
