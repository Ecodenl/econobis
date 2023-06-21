<?php

use App\Eco\Opportunity\OpportunityAction;
use Illuminate\Database\Migrations\Migration;

class AddQuotationRequestStatusJune122023 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $opportunityAction = OpportunityAction::where('code_ref', 'quotation-request')->first();

        DB::table('quotation_request_status')->insert([
                ['name' => 'Offerte nog niet aangevraagd', 'code_ref' => 'not-yet-applied-for', 'opportunity_action_id' => $opportunityAction->id, 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now(), 'order' => 0, 'is_pending_status' => 0],
            ]
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
