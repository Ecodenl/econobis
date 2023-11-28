<?php

use App\Eco\Opportunity\OpportunityAction;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use Illuminate\Database\Migrations\Migration;

class AddQuotationRequestStatusNovember132023 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $opportunityAction = OpportunityAction::where('code_ref', 'subsidy-request')->first();

        $sortOrder = QuotationRequestStatus::where('opportunity_action_id', $opportunityAction->id)->where('code_ref', 'pm-not-approved')->first();

        DB::table('quotation_request_status')->insert([
                [
                    'name' => 'Aanvraag gekoppeld',
                    'code_ref' => 'linked',
                    'opportunity_action_id' => $opportunityAction->id,
                    'uses_wf' => 0,
                    'email_template_id_wf' => null,
                    'number_of_days_to_send_email' => 0,
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now(),
                    'order' => $sortOrder->order,
                    'is_pending_status' => 0],
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
