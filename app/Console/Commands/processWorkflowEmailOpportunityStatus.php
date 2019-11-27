<?php

namespace App\Console\Commands;

use App\Eco\Opportunity\Opportunity;
use App\Eco\Opportunity\OpportunityStatus;
use App\Helpers\Workflow\OpportunityWorkflowHelper;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class processWorkflowEmailOpportunityStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'workflow:processWorkflowEmailOpportunityStatus';

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
        $opportunityStatusesToProcess = OpportunityStatus::where('uses_wf', true)->get();
        foreach ($opportunityStatusesToProcess as $opportunityStatus) {
            Log::info("Proces: Workflow email voor status '" . $opportunityStatus->name . "' met aantal dagen na datum status: " . $opportunityStatus->number_of_days_to_send_email);

            $opportunitiesToProcess = Opportunity::where('status_id', $opportunityStatus->id)
                ->where('date_planned_to_send_wf_email_status','=', Carbon::now()->startOfDay()->toDateString())
                ->get();
            foreach ($opportunitiesToProcess as $opportunity) {
                $opportunityWorkflowHelper = new OpportunityWorkflowHelper($opportunity);
                $opportunityWorkflowHelper->processWorkflowEmail();

            }
        }
    }
}
