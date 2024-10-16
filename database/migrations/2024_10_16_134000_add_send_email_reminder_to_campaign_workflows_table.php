<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSendEmailReminderToCampaignWorkflowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('campaign_workflows', function (Blueprint $table) {
            $table->unsignedInteger('email_template_id_reminder')->nullable()->after('email_template_id_wf');
            $table->unsignedInteger('number_of_days_to_send_email_reminder')->default(0)->after('email_template_id_reminder');
            $table->foreign('email_template_id_reminder')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('campaign_workflows', function (Blueprint $table) {
            $table->dropForeign(['email_template_id_reminder']);
            $table->dropColumn('number_of_days_to_send_email_reminder');
            $table->dropColumn('email_template_id_reminder');
        });
    }
}
