<?php

use App\Eco\Opportunity\OpportunityAction;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use Illuminate\Database\Migrations\Migration;

class AddQuotationRequestStatusOktober252024 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $opportunityAction = OpportunityAction::where('code_ref', 'redirection')->first();

        $sortOrder = QuotationRequestStatus::where('opportunity_action_id', $opportunityAction->id)->where('code_ref', 'default')->first();

        DB::table('quotation_request_status')->insert([
                [
                    'name' => 'Nog doorverwijzen',
                    'code_ref' => 'still_refer',
                    'opportunity_action_id' => $opportunityAction->id,
                    'uses_wf' => 0,
                    'email_template_id_wf' => null,
                    'number_of_days_to_send_email' => 0,
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now(),
                    'order' => $sortOrder->order - 1,
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
