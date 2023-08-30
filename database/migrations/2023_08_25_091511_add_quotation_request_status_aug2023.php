<?php

use App\Eco\Opportunity\OpportunityAction;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddQuotationRequestStatusAug2023 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $bezoekOpportunityAction = OpportunityAction::where('code_ref', 'visit')->first();
        $bezoekGetOrder = QuotationRequestStatus::where('opportunity_action_id', $bezoekOpportunityAction->id)->where('code_ref', 'default')->first();
        DB::table('quotation_request_status')->insert([
                ['name' => 'Geen afspraak kunnen maken', 'code_ref' => 'not-made', 'opportunity_action_id' => $bezoekOpportunityAction->id, 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now(), 'order' => $bezoekGetOrder->order, 'is_pending_status' => 0],
            ]
        );
        $bezoekQuotationRequestStatuses = QuotationRequestStatus::where('opportunity_action_id', $bezoekOpportunityAction->id)->orderBy('order')->orderBy('id')->get();
        $newOrder = 1;
        foreach ($bezoekQuotationRequestStatuses as $bezoekItem) {
            $bezoekItem->order = $newOrder;
            $bezoekItem->save();
            $newOrder++;
        }

        $offerteverzoekOpportunityAction = OpportunityAction::where('code_ref', 'quotation-request')->first();
        $offerteverzoekGetOrder1 = QuotationRequestStatus::where('opportunity_action_id', $offerteverzoekOpportunityAction->id)->where('code_ref', 'default')->first();
        $offerteverzoekGetOrder2 = QuotationRequestStatus::where('opportunity_action_id', $offerteverzoekOpportunityAction->id)->where('code_ref', 'no-response')->first();
        DB::table('quotation_request_status')->where('opportunity_action_id', $offerteverzoekOpportunityAction->id)->where('code_ref', 'under-review')->update(['code_ref' => "under-review-occupant"]);
        DB::table('quotation_request_status')->insert([
                ['name' => 'Offerte aanvraag in behandeling', 'code_ref' => 'under-review', 'opportunity_action_id' => $offerteverzoekOpportunityAction->id, 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now(), 'order' => $offerteverzoekGetOrder1->order, 'is_pending_status' => 0],
                ['name' => 'Uitgevoerd', 'code_ref' => 'executed', 'opportunity_action_id' => $offerteverzoekOpportunityAction->id, 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now(), 'order' => $offerteverzoekGetOrder2->order, 'is_pending_status' => 0],
                ['name' => 'Offerteverzoek akkoord', 'code_ref' => 'pm-approved', 'opportunity_action_id' => $offerteverzoekOpportunityAction->id, 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now(), 'order' => $offerteverzoekGetOrder2->order, 'is_pending_status' => 0],
                ['name' => 'Offerteverzoek niet akkoord', 'code_ref' => 'pm-not-approved', 'opportunity_action_id' => $offerteverzoekOpportunityAction->id, 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now(), 'order' => $offerteverzoekGetOrder2->order, 'is_pending_status' => 0],
            ]
        );
        $offerteverzoekQuotationRequestStatuses = QuotationRequestStatus::where('opportunity_action_id', $offerteverzoekOpportunityAction->id)->orderBy('order')->orderBy('id')->get();
        $newOrder = 1;
        foreach ($offerteverzoekQuotationRequestStatuses as $offerteverzoekItem) {
            $offerteverzoekItem->order = $newOrder;
            $offerteverzoekItem->save();
            $newOrder++;
        }

        $budgetaanvraagOpportunityAction = OpportunityAction::where('code_ref', 'subsidy-request')->first();
        $budgetaanvraagGetOrder = QuotationRequestStatus::where('opportunity_action_id', $budgetaanvraagOpportunityAction->id)->where('code_ref', 'not-approved')->first();
        DB::table('quotation_request_status')->where('opportunity_action_id', $budgetaanvraagOpportunityAction->id)->where('code_ref', 'send')->update(['code_ref' => "under-review-occupant"]);
        DB::table('quotation_request_status')->insert([
                ['name' => 'Vaststelling in behandeling', 'code_ref' => 'under-review-det', 'opportunity_action_id' => $budgetaanvraagOpportunityAction->id, 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now(), 'order' => $budgetaanvraagGetOrder->order, 'is_pending_status' => 0],
                ['name' => 'Vaststelling akkoord', 'code_ref' => 'approved-det', 'opportunity_action_id' => $budgetaanvraagOpportunityAction->id, 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now(), 'order' => $budgetaanvraagGetOrder->order, 'is_pending_status' => 0],
                ['name' => 'Vaststelling niet akkoord', 'code_ref' => 'not-approved-det', 'opportunity_action_id' => $budgetaanvraagOpportunityAction->id, 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now(), 'order' => $budgetaanvraagGetOrder->order, 'is_pending_status' => 0],
            ]
        );
        $budgetaanvraagQuotationRequestStatuses = QuotationRequestStatus::where('opportunity_action_id', $budgetaanvraagOpportunityAction->id)->orderBy('order')->orderBy('id')->get();
        $newOrder = 1;
        foreach ($budgetaanvraagQuotationRequestStatuses as $budgetaanvraagItem) {
            $budgetaanvraagItem->order = $newOrder;
            $budgetaanvraagItem->save();
            $newOrder++;
        }
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
