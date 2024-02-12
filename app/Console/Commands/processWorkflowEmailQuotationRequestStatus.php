<?php

namespace App\Console\Commands;

use App\Eco\Campaign\CampaignWorkflow;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\Schedule\CommandRun;
use App\Helpers\Workflow\QuotationRequestWorkflowHelper;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class processWorkflowEmailQuotationRequestStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'workflow:processWorkflowEmailQuotationRequestStatus';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Workflow email versturen na X aantal dagen op bepaalde status.";

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

        // Get quotation request statussen with workflow enabled and number of days to send not 0 (they are sent immediately)
//        $quotationRequestStatusesToProcess = QuotationRequestStatus::where('uses_wf', true)->where('number_of_days_to_send_email', '!=', 0)->get();
//        foreach ($quotationRequestStatusesToProcess as $quotationRequestStatus) {
//            Log::info("Proces: Workflow email voor status '" . $quotationRequestStatus->name . "' (" . $quotationRequestStatus->id . ") met aantal dagen na datum status: " . $quotationRequestStatus->number_of_days_to_send_email);
//
//            $quotationRequestsToProcess = QuotationRequest::where('status_id', $quotationRequestStatus->id)
//                ->where('date_planned_to_send_wf_email_status','=', Carbon::now()->startOfDay()->toDateString())
//                ->get();
//            foreach ($quotationRequestsToProcess as $quotationRequest) {
//                $quotationRequestWorkflowHelper = new QuotationRequestWorkflowHelper($quotationRequest);
//                $quotationRequestWorkflowHelper->processWorkflowEmail();
//            }
//
//        }
        // Get campaign workflows with workflow enabled and active and number of days to send not 0 (they are sent immediately)
        $campaignWorkflowsToProces = CampaignWorkflow::where('workflow_for_type', 'quotationrequest')
            ->where('number_of_days_to_send_email', '!=', 0)
            ->where('is_active', true)
            ->whereHas('status', function($query){
                $query->where('uses_wf', true);
            })->get();
        foreach ($campaignWorkflowsToProces as $campaignWorkflow) {
            Log::info("Proces: Workflow email voor campagne '" . $campaignWorkflow->campaign->name . "' voor status '" . $campaignWorkflow->status->name . "' met aantal dagen na datum status: " . $campaignWorkflow->number_of_days_to_send_email);
            $campaignId = $campaignWorkflow->campaign_id;

            $quotationRequestsToProcess = QuotationRequest::where('status_id', $campaignWorkflow->status_id)
                ->where('date_planned_to_send_wf_email_status','=', Carbon::now()->startOfDay()->toDateString())
                ->whereHas('opportunity', function ($query) use ($campaignId) {
                    $query->whereHas('intakes', function ($query) use ($campaignId) {
                        $query->where('campaign_id', $campaignId);
                    });
                })->get();
            foreach ($quotationRequestsToProcess as $quotationRequest) {
                $quotationRequestWorkflowHelper = new QuotationRequestWorkflowHelper($quotationRequest);
                $quotationRequestWorkflowHelper->processWorkflowEmail();
            }
        }

        $commandRun->end_at = Carbon::now();
        $commandRun->finished = true;
        $commandRun->save();

        Log::info("Emails verstuurd kansacties met bepaalde status.");
    }
}
