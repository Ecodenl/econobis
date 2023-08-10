<?php

use App\Eco\Opportunity\OpportunityAction;
use Illuminate\Database\Migrations\Migration;

class ChangeQuotationRequestStatusCodeRefs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $opportunityAction = OpportunityAction::where('code_ref', 'quotation-request')->first();

        DB::table('quotation_request_status')->where('opportunity_action_id', $opportunityAction->id)->where('code_ref', 'default')->update(['code_ref' => "not-made"]);

        DB::table('quotation_request_status')->where('opportunity_action_id', $opportunityAction->id)->where('code_ref', 'made')->update(['code_ref' => "default"]);
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
