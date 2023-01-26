<?php

use App\Eco\Opportunity\OpportunityAction;
use Illuminate\Database\Migrations\Migration;

class AddQuotationRequestStatus extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $bezoekAction = OpportunityAction::where('name', 'Bezoek')->first();
        DB::table('quotation_request_status')->insert([
                ['name' => 'Afspraak afgezegd', 'opportunity_action_id' => $bezoekAction->id, 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now(), 'order' => 4],
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
