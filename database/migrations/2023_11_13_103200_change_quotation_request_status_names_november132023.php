<?php

use App\Eco\Opportunity\OpportunityAction;
use Illuminate\Database\Migrations\Migration;

class ChangeQuotationRequestStatusNamesNovember132023 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $opportunityAction = OpportunityAction::where('code_ref', 'subsidy-request')->first();

        DB::table('quotation_request_status')->where('opportunity_action_id', $opportunityAction->id)->where('code_ref', 'approved')->update(['name' => "Subsidie aanvraag beschikt"]); //17
        DB::table('quotation_request_status')->where('opportunity_action_id', $opportunityAction->id)->where('code_ref', 'not-approved')->update(['name' => "Subsidie aanvraag niet beschikt"]); //18
        DB::table('quotation_request_status')->where('opportunity_action_id', $opportunityAction->id)->where('code_ref', 'under-review-det')->update(['name' => "Subsidievaststelling in behandeling"]); //25
        DB::table('quotation_request_status')->where('opportunity_action_id', $opportunityAction->id)->where('code_ref', 'approved-det')->update(['name' => "Subsidie vastgesteld"]); //26
        DB::table('quotation_request_status')->where('opportunity_action_id', $opportunityAction->id)->where('code_ref', 'not-approved-det')->update(['name' => "Subsidie niet vastgesteld"]); //27
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $opportunityAction = OpportunityAction::where('code_ref', 'subsidy-request')->first();

        DB::table('quotation_request_status')->where('opportunity_action_id', $opportunityAction->id)->where('code_ref', 'approved')->update(['name' => "Subsidieaanvraag akkoord"]); //17
        DB::table('quotation_request_status')->where('opportunity_action_id', $opportunityAction->id)->where('code_ref', 'not-approved')->update(['name' => "Subsidieaanvraag niet akkoord"]); //18
        DB::table('quotation_request_status')->where('opportunity_action_id', $opportunityAction->id)->where('code_ref', 'under-review-det')->update(['name' => "Vaststelling in behandeling"]); //25
        DB::table('quotation_request_status')->where('opportunity_action_id', $opportunityAction->id)->where('code_ref', 'approved-det')->update(['name' => "Vaststelling akkoord"]); //26
        DB::table('quotation_request_status')->where('opportunity_action_id', $opportunityAction->id)->where('code_ref', 'not-approved-det')->update(['name' => "Vaststelling niet akkoord"]); //27
    }
}
