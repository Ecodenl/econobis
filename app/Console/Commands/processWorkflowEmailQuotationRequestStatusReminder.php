<?php

namespace App\Console\Commands;

use App\Eco\Campaign\CampaignWorkflow;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\Schedule\CommandRun;
use App\Helpers\Workflow\QuotationRequestWorkflowHelper;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class processWorkflowEmailQuotationRequestStatusReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'workflow:processWorkflowEmailQuotationRequestStatusReminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Workflow email herinnering versturen na X aantal dagen op bepaalde status.";

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $commandRun = new CommandRun();
        $commandRun->app_cooperation_name = config('app.APP_COOP_NAME');
        $commandRun->schedule_run_id = config('app.SCHEDULE_RUN_ID');
        $commandRun->scheduled_commands_command_ref = $this->signature;
        $commandRun->start_at = Carbon::now();
        $commandRun->end_at = null;
        $commandRun->finished = false;
        $commandRun->created_in_shared = false;
        $commandRun->save();

        // Get campaign workflows with workflow enabled and active and number of days to send not 0 (they are sent immediately)
        $campaignWorkflowsToProces = CampaignWorkflow::where('workflow_for_type', 'quotationrequest')
            ->where('number_of_days_to_send_email_reminder', '!=', 0)
            ->where('is_active', true)
            ->whereHas('quotationRequestStatus', function($query){
                $query->where('uses_wf', true);
                $query->where('send_email_reminder', true);
            })->get();
        foreach ($campaignWorkflowsToProces as $campaignWorkflow) {
            Log::info("Proces: Workflow email herinnering voor campagne '" . $campaignWorkflow->campaign->name . "' voor status '" . $campaignWorkflow->quotationRequestStatus->name . "' met aantal dagen na datum status: " . $campaignWorkflow->number_of_days_to_send_email_reminder);
            $campaignId = $campaignWorkflow->campaign_id;

            $checkDatePlannedToSendReminder = Carbon::now()->addDays($campaignWorkflow->number_of_days_to_send_email_reminder)->startOfDay()->toDateString();
            Log::info('checkDatePlannedToSendReminder: ' . $checkDatePlannedToSendReminder);
            $quotationRequestsToProcess = QuotationRequest::where('status_id', $campaignWorkflow->quotation_request_status_id)
                ->where('date_planned_to_send_wf_email_status','=', $checkDatePlannedToSendReminder)
                ->whereHas('opportunity', function ($query) use ($campaignId) {
                    $query->whereHas('intake', function ($query) use ($campaignId) {
                        $query->where('campaign_id', $campaignId);
                    });
                })->get();
            foreach ($quotationRequestsToProcess as $quotationRequest) {
                Log::info("processWorkflowEmail voor " . $quotationRequest->id);
                $quotationRequestWorkflowHelper = new QuotationRequestWorkflowHelper($quotationRequest);
                $quotationRequestWorkflowHelper->processWorkflowEmailReminder($campaignWorkflow);
            }
        }

        $commandRun->end_at = Carbon::now();
        $commandRun->finished = true;
        $commandRun->save();

        Log::info("Emails herinnering verstuurd kansacties met bepaalde status.");
    }
}
