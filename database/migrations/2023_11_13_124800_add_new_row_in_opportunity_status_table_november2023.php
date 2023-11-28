<?php

use App\Eco\Opportunity\OpportunityStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddNewRowInOpportunityStatusTableNovember2023 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('opportunity_status')
            ->where('code_ref', 'in_progress')
            ->update([
                'code_ref' => 'mandate',
                'external_hoom_id' => null
            ]);

        $opportunityStatus = New OpportunityStatus();
        $opportunityStatus->name = 'In uitvoering';
        $opportunityStatus->uses_wf = 0;
        $opportunityStatus->email_template_id_wf = null;
        $opportunityStatus->number_of_days_to_send_email = 0;
        $opportunityStatus->active = 1;
        $opportunityStatus->external_hoom_id = 4;
        $opportunityStatus->code_ref = "in_progress";
        $opportunityStatus->order = 4;
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
}
