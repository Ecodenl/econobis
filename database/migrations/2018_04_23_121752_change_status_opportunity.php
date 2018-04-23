<?php

use App\Eco\Campaign\CampaignType;
use App\Eco\Task\TaskType;
use Illuminate\Database\Migrations\Migration;

class ChangeStatusOpportunity extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $opportunityStatus = \App\Eco\Opportunity\OpportunityStatus::where('name', 'Realisatie')->first();
        $opportunityStatus->name = 'Uitvoering';
        $opportunityStatus->save();

        $opportunityStatus = \App\Eco\Opportunity\OpportunityStatus::where('name', 'Realisatie, doe het zelf')->first();
        $opportunityStatus->name = 'Uitvoering, doe het zelf';
        $opportunityStatus->save();

        $opportunityStatus = \App\Eco\Opportunity\OpportunityStatus::where('name', 'Geen realisatie')->first();
        $opportunityStatus->name = 'Geen uitvoering';
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
