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
        Schema::dropIfExists('opportunity_actions');

        Schema::create('opportunity_actions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('code_ref');
        });

        DB::table('opportunity_actions')->insert([
                ['name' => 'Offerteverzoek', 'code_ref' => 'quotation-request'],
                ['name' => 'Bezoek', 'code_ref' => 'visit'],
                ['name' => 'Subsidie aanvraag', 'code_ref' => 'subsidy-request'],
            ]
        );

        Schema::create('campaign_opportunity_action', function (Blueprint $table) {
            $table->unsignedInteger('campaign_id');
            $table->unsignedInteger('opportunity_action_id');
            $table->timestamps();
            $table->primary(['campaign_id', 'opportunity_action_id'], 'campaign_opportunity_action_primary');
        });

        Schema::table('quotation_requests', function (Blueprint $table) {
            $table->unsignedInteger('opportunity_action_id')->nullable()->after('opportunity_id');
            $table->foreign('opportunity_action_id')
                ->references('id')->on('opportunity_actions')
                ->onDelete('restrict');
        });

        $offerteverzoekAction = OpportunityAction::where('name', 'Offerteverzoek')->first();

        foreach (Campaign::withTrashed()->get() as $campaign) {
            $campaign->opportunityActions()->sync([$offerteverzoekAction->id]);
        }

        DB::table('quotation_requests')->update([
            'opportunity_action_id' => $offerteverzoekAction->id
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('quotation_requests', 'opportunity_action_id')) {
            Schema::table('quotation_requests', function (Blueprint $table) {
                $table->dropForeign(['opportunity_action_id']);
                $table->dropColumn('opportunity_action_id');
            });
        }
        Schema::dropIfExists('opportunity_actions');
        Schema::dropIfExists('campaign_opportunity_action');
    }
}
