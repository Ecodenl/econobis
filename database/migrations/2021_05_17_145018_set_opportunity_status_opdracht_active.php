<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SetOpportunityStatusOpdrachtActive extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $kansOpdracht = \App\Eco\Opportunity\OpportunityStatus::where('name', 'Opdracht')->first();
        $kansOpdracht->active = true;
        $kansOpdracht->save();
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
