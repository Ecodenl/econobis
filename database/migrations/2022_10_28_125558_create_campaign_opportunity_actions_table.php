<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateCampaignOpportunityActionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('campaign_opportunity_actions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
        });

        DB::table('campaign_opportunity_actions')->insert([
                ['name' => 'Offerteverzoek'],
                ['name' => 'Bezoek'],
                ['name' => 'Subsidie aanvraag'],
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
        Schema::dropIfExists('campaign_opportunity_actions');
    }
}
