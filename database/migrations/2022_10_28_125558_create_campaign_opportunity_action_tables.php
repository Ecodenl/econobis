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

        Schema::table('quotation_request_status', function (Blueprint $table) {
            $table->unsignedInteger('opportunity_action_id')->nullable()->after('name');
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
        DB::table('quotation_request_status')->update([
            'opportunity_action_id' => $offerteverzoekAction->id
        ]);

        $bezoekAction = OpportunityAction::where('name', 'Bezoek')->first();
        $subsidieAanvraagAction = OpportunityAction::where('name', 'Subsidie aanvraag')->first();
        DB::table('quotation_request_status')->insert([
                ['name' => 'Geen afspraak gemaakt', 'opportunity_action_id' => $bezoekAction->id, 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now(), 'order' => 1],
                ['name' => 'Afspraak gemaakt', 'opportunity_action_id' => $bezoekAction->id, 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now(), 'order' => 2],
                ['name' => 'Afspraak gedaan', 'opportunity_action_id' => $bezoekAction->id, 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now(), 'order' => 3],
                ['name' => 'Subsidie aanvraag open', 'opportunity_action_id' => $subsidieAanvraagAction->id, 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now(), 'order' => 1],
                ['name' => 'Subsidie aanvraag gemaakt', 'opportunity_action_id' => $subsidieAanvraagAction->id, 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now(), 'order' => 2],
                ['name' => 'Subsidie aanvraag akkoord', 'opportunity_action_id' => $subsidieAanvraagAction->id, 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now(), 'order' => 3],
                ['name' => 'Subsidie niet akkoord', 'opportunity_action_id' => $subsidieAanvraagAction->id, 'uses_wf' => 0, 'email_template_id_wf' => null, 'number_of_days_to_send_email' => 0, 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now(), 'order' => 4],
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
        $bezoekAction = OpportunityAction::where('name', 'Bezoek')->first();
        $subsidieAanvraagAction = OpportunityAction::where('name', 'Subsidie aanvraag')->first();
        DB::table('quotation_request_status')->whereIn('opportunity_action_id', [$bezoekAction->id, $subsidieAanvraagAction->id])->delete();
        if (Schema::hasColumn('quotation_request_status', 'opportunity_action_id')) {
            Schema::table('quotation_request_status', function (Blueprint $table) {
                $table->dropForeign(['opportunity_action_id']);
                $table->dropColumn('opportunity_action_id');
            });
        }
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
