<?php

namespace App\Console\Commands;

use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use App\Helpers\Workflow\QuotationRequestWorkflowHelper;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
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
        $quotationRequestStatusesToProcess = QuotationRequestStatus::where('uses_wf', true)->get();
        foreach ($quotationRequestStatusesToProcess as $quotationRequestStatus) {
            Log::info("Proces: Workflow email voor status '" . $quotationRequestStatus->name . "' met aantal dagen na datum status: " . $quotationRequestStatus->number_of_days_to_send_email);

            $quotationRequestsToProcess = QuotationRequest::where('status_id', $quotationRequestStatus->id)
                ->where('date_planned_to_send_wf_email_status','=', Carbon::now()->startOfDay()->toDateString())
                ->get();
            foreach ($quotationRequestsToProcess as $quotationRequest) {
                $quotationRequestWorkflowHelper = new QuotationRequestWorkflowHelper($quotationRequest);
                $quotationRequestWorkflowHelper->processWorkflowEmail();
            }

        }
    }
}
