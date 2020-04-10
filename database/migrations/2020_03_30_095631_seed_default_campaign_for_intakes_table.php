<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SeedDefaultCampaignForIntakesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        if(\App\Eco\Intake\Intake::withTrashed()->whereNull('campaign_id')->count() > 0){

            $campaign = new \App\Eco\Campaign\Campaign();

            $campaign->name = 'Energie campagne';
            $campaign->type_id = 1;
            $campaign->save();
            $intakesFound = \App\Eco\Intake\Intake::withTrashed()->whereNull('campaign_id')->get();
            foreach ($intakesFound as $intakeFound){
                $intakeFound->campaign_id = $campaign->id;
                $intakeFound->save();
            }
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
