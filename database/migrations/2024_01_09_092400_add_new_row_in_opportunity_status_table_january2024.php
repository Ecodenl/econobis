<?php

use App\Eco\Opportunity\OpportunityStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddNewRowInOpportunityStatusTableJanuary2024 extends Migration
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
                'order' => 7
            ]);

        DB::table('opportunity_status')
            ->where('code_ref', 'deleted_in_hd')
            ->update([
                'order' => 8
            ]);

        $opportunityStatus = New OpportunityStatus();
        $opportunityStatus->name = 'Uitgevoerd zonder maatregel';
        $opportunityStatus->uses_wf = 0;
        $opportunityStatus->email_template_id_wf = null;
        $opportunityStatus->number_of_days_to_send_email = 0;
        $opportunityStatus->active = 1;
        $opportunityStatus->external_hoom_id = null;
        $opportunityStatus->code_ref = "executed_without_measure";
        $opportunityStatus->order = 6;
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
