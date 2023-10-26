<?php

namespace App\Console\Commands;

use App\Eco\Opportunity\Opportunity;
use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\Schedule\CommandRun;
use App\Helpers\Workflow\OpportunityWorkflowHelper;
use Illuminate\Console\Command;
use Carbon\Carbon;
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
        $commandRun = new CommandRun();
        $commandRun->app_cooperation_name = config('app.APP_COOP_NAME');
        $commandRun->schedule_run_id = config('app.SCHEDULE_RUN_ID');
        $commandRun->scheduled_commands_command_ref = $this->signature;
        $commandRun->start_at = Carbon::now();
        $commandRun->end_at = null;
        $commandRun->finished = false;
        $commandRun->save();

        // Get opportunity statussen with workflow enabled and number of days to send not 0 (they are sent immediately)
        $opportunityStatusesToProcess = OpportunityStatus::where('uses_wf', true)->where('number_of_days_to_send_email', '!=', 0)->get();
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

        $commandRun->end_at = Carbon::now();
        $commandRun->finished = true;
        $commandRun->save();

        Log::info("Emails verstuurd kansen met bepaalde status.");
    }
}
