<?php

use App\Eco\Campaign\Campaign;
use App\Eco\Opportunity\OpportunityAction;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateCampaignOpportunityActionTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('opportunity_actions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
        });

        DB::table('opportunity_actions')->insert([
                ['name' => 'Offerteverzoek'],
                ['name' => 'Bezoek'],
                ['name' => 'Subsidie aanvraag'],
            ]
        );

        Schema::create('campaign_opportunity_action', function (Blueprint $table) {
            $table->unsignedInteger('campaign_id');
            $table->unsignedInteger('opportunity_action_id');
            $table->timestamps();
            $table->primary(['campaign_id', 'opportunity_action_id'], 'campaign_opportunity_action_primary');
        });
//        $offerteverzoekAction = DB::table('opportunity_actions')
//            ->where('name', 'Offerteverzoek')
//            ->get();
        $offerteverzoekAction = OpportunityAction::where('name', 'Offerteverzoek')->first();
        foreach (Campaign::withTrashed()->get() as $campaign) {
            $campaign->opportunityActions()->sync([$offerteverzoekAction->id]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('opportunity_actions');
        Schema::dropIfExists('campaign_opportunity_action');
    }
}
