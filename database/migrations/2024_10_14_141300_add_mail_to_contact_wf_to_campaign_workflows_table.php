<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMailToContactWfToCampaignWorkflowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('campaign_workflows', function (Blueprint $table) {
            $table->boolean('mail_to_contact_wf')->after('mail_cc_to_coach_wf')->default(false);
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
            $table->dropColumn('mail_to_contact_wf');
        });
    }
}
