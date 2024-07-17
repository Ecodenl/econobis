<?php

use App\Eco\Opportunity\OpportunityStatus;
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
        DB::table('opportunity_status')
            ->where('code_ref', 'no_execution')
            ->update([
                'order' => 70
            ]);
        DB::table('opportunity_status')
            ->where('code_ref', 'deleted_in_hd')
            ->update([
                'order' => 80
            ]);

        $opportunityStatus = New OpportunityStatus();
        $opportunityStatus->name = 'Subsidie aanvaag in afwachting';
        $opportunityStatus->uses_wf = 0;
        $opportunityStatus->email_template_id_wf = null;
        $opportunityStatus->number_of_days_to_send_email = 0;
        $opportunityStatus->active = 1;
        $opportunityStatus->external_hoom_id = null;
        $opportunityStatus->code_ref = "subsidy-request_pending";
        $opportunityStatus->order = 10;
        $opportunityStatus->save();

        $opportunityStatus = New OpportunityStatus();
        $opportunityStatus->name = 'Subsidie aanvraag toegekend';
        $opportunityStatus->uses_wf = 0;
        $opportunityStatus->email_template_id_wf = null;
        $opportunityStatus->number_of_days_to_send_email = 0;
        $opportunityStatus->active = 1;
        $opportunityStatus->external_hoom_id = null;
        $opportunityStatus->code_ref = "subsidy-request_granted";
        $opportunityStatus->order = 11;
        $opportunityStatus->save();

        $opportunityStatus = New OpportunityStatus();
        $opportunityStatus->name = 'Subsidie aanvraag afgewezen';
        $opportunityStatus->uses_wf = 0;
        $opportunityStatus->email_template_id_wf = null;
        $opportunityStatus->number_of_days_to_send_email = 0;
        $opportunityStatus->active = 1;
        $opportunityStatus->external_hoom_id = null;
        $opportunityStatus->code_ref = "subsidy-request_rejected";
        $opportunityStatus->order = 12;
        $opportunityStatus->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
};
