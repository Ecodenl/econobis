<?php

use App\Eco\Campaign\Campaign;
use App\Eco\Cooperation\Cooperation;
use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ChangesInspectionFieldsCooperationAndCampaignTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('campaigns', function (Blueprint $table) {
            $table->unsignedInteger('inspection_planned_email_template_id')->nullable();
            $table->foreign('inspection_planned_email_template_id')
                ->references('id')->on('email_templates')
                ->onDelete('set null');
            $table->integer('inspection_planned_mailbox_id')->unsigned()->nullable();
            $table->foreign('inspection_planned_mailbox_id')->references('id')->on('mailboxes')->onDelete('restrict');

            $table->unsignedInteger('inspection_recorded_email_template_id')->nullable();
            $table->foreign('inspection_recorded_email_template_id')
                ->references('id')->on('email_templates')
                ->onDelete('set null');

            $table->unsignedInteger('inspection_released_email_template_id')->nullable();
            $table->foreign('inspection_released_email_template_id')
                ->references('id')->on('email_templates')
                ->onDelete('set null');

            $table->integer('default_workflow_mailbox_id')->unsigned()->nullable();
            $table->foreign('default_workflow_mailbox_id')->references('id')->on('mailboxes')->onDelete('restrict');
        });

        Schema::create('campaign_workflows', function (Blueprint $table) {
            $table->id();
            $table->string('workflow_for_type');
            $table->integer('campaign_id')->unsigned()->nullable();;
            $table->foreign('campaign_id')->references('id')->on('campaigns');
            $table->unsignedInteger('opportunity_status_id')->nullable();
            $table->foreign('opportunity_status_id')
                ->references('id')->on('opportunity_status')
                ->onDelete('restrict');
            $table->unsignedInteger('quotation_request_status_id')->nullable();
            $table->foreign('quotation_request_status_id')
                ->references('id')->on('quotation_request_status')
                ->onDelete('restrict');
            $table->integer('number_of_days_to_send_email')->default(0);
            $table->unsignedInteger('email_template_id_wf')->nullable();
            $table->foreign('email_template_id_wf')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');
            $table->boolean('mail_cc_to_coach_wf')->default(false);
            $table->boolean('is_active')->default(false);
        });

        $campaigns = Campaign::all();

        $cooperation = Cooperation::first();
        if($cooperation){
            foreach($campaigns as $campaign){
                $campaign->inspection_planned_email_template_id = $cooperation->inspection_planned_email_template_id;
                $campaign->inspection_planned_mailbox_id = $cooperation->inspection_planned_mailbox_id;
                $campaign->inspection_recorded_email_template_id = $cooperation->inspection_recorded_email_template_id;
                $campaign->inspection_released_email_template_id = $cooperation->inspection_released_email_template_id;
                $campaign->save();
            }
        }

        $opportunityStatuses = OpportunityStatus::where('uses_wf', true)->where('active', true)->get();
        foreach ($opportunityStatuses as $opportunityStatus) {
            foreach($campaigns as $campaign){
                DB::table('campaign_workflows')->insert([
                        'workflow_for_type' => 'opportunity',
                        'campaign_id' => $campaign->id,
                        'opportunity_status_id' => $opportunityStatus->id,
                        'quotation_request_status_id' => null,
                        'number_of_days_to_send_email' => $opportunityStatus->number_of_days_to_send_email,
                        'email_template_id_wf' => $opportunityStatus->email_template_id_wf,
                        'mail_cc_to_coach_wf' => false,
                        'is_active' => true]
                );
            }
        }

        $quotationRequestStatuses = QuotationRequestStatus::where('uses_wf', true)->get();
        foreach ($quotationRequestStatuses as $quotationRequestStatus) {
            foreach($campaigns as $campaign){
                DB::table('campaign_workflows')->insert([
                        'workflow_for_type' => 'quotationrequest',
                        'campaign_id' => $campaign->id,
                        'opportunity_status_id' => null,
                        'quotation_request_status_id' => $quotationRequestStatus->id,
                        'number_of_days_to_send_email' => $quotationRequestStatus->number_of_days_to_send_email,
                        'email_template_id_wf' => $quotationRequestStatus->email_template_id_wf,
                        'mail_cc_to_coach_wf' => true,
                        'is_active' => true]
                );
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
        Schema::dropIfExists('campaign_workflows');

        Schema::table('campaigns', function (Blueprint $table) {
            $table->dropForeign(['default_workflow_mailbox_id']);
            $table->dropColumn('default_workflow_mailbox_id');
            $table->dropForeign(['inspection_released_email_template_id']);
            $table->dropColumn('inspection_released_email_template_id');
            $table->dropForeign(['inspection_recorded_email_template_id']);
            $table->dropColumn('inspection_recorded_email_template_id');
            $table->dropForeign(['inspection_planned_mailbox_id']);
            $table->dropColumn('inspection_planned_mailbox_id');
            $table->dropForeign(['inspection_planned_email_template_id']);
            $table->dropColumn('inspection_planned_email_template_id');
        });
    }
};
