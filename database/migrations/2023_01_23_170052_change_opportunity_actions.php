<?php

use App\Eco\Opportunity\OpportunityAction;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeOpportunityActions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $qrStatus = OpportunityAction::where('name', 'Subsidie aanvraag')->first();
        $qrStatus->name = 'Budgetaanvraag';
        $qrStatus->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $qrStatus = OpportunityAction::where('name', 'Budgetaanvraag')->first();
        $qrStatus->name = 'Subsidie aanvraag';
        $qrStatus->save();
    }
}
