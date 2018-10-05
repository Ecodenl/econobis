<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddValues extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $occ = new \App\Eco\Occupation\Occupation();
        $occ->primary_occupation = 'Huisgenoot';
        $occ->secondary_occupation = 'Huisgenoot';
        $occ->save();

        $opportunityStatus = new \App\Eco\Opportunity\OpportunityStatus();
        $opportunityStatus->name = 'Opdracht';
        $opportunityStatus->save();

        $tt = new \App\Eco\Task\TaskType();
        $tt->name = 'Intern overleg';
        $tt->save();

        $tt = new \App\Eco\Task\TaskType();
        $tt->name = 'Webformulier';
        $tt->save();
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
