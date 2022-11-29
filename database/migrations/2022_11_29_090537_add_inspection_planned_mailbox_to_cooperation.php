<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddInspectionPlannedMailboxToCooperation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::table('cooperations', function (Blueprint $table) {
            $table->integer('inspection_planned_mailbox_id')
                ->unsigned()
                ->nullable()
                ->after('inspection_planned_email_template_id');

            $table->foreign('inspection_planned_mailbox_id')
                ->references('id')
                ->on('mailboxes')
                ->onDelete('restrict');
            }
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cooperations', function (Blueprint $table) {
            $table->dropForeign(['inspection_planned_mailbox_id']);
            $table->dropColumn('inspection_planned_mailbox_id');
        });
    }
}
