<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class SeedQuotationRequestStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        $budgetAanvraagAction = OpportunityAction::where('code_ref', 'subsidy-request')->first();

        DB::table('quotation_request_status')->insert([
            [
                'name' => 'Budgetaanvraag verstuurd naar bewoner',
                'opportunity_action_id' => $budgetAanvraagAction->id,
                'uses_wf' => 0,
                'email_template_id_wf' => null,
                'number_of_days_to_send_email' => 0,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'order' => 5,
                'is_pending_status' => 0
            ], [
                'name' => 'Subsidieaanvraag in behandeling',
                'opportunity_action_id' => $budgetAanvraagAction->id,
                'uses_wf' => 0,
                'email_template_id_wf' => null,
                'number_of_days_to_send_email' => 0,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'order' => 6,
                'is_pending_status' => 0
            ], [
                'name' => 'Subsidieaanvraag akkoord',
                'opportunity_action_id' => $budgetAanvraagAction->id,
                'uses_wf' => 0,
                'email_template_id_wf' => null,
                'number_of_days_to_send_email' => 0,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'order' => 7,
                'is_pending_status' => 0
            ], [
                'name' => 'Subsidieaanvraag niet akkoord',
                'opportunity_action_id' => $budgetAanvraagAction->id,
                'uses_wf' => 0,
                'email_template_id_wf' => null,
                'number_of_days_to_send_email' => 0,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'order' => 8,
                'is_pending_status' => 0
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        //
    }
}
