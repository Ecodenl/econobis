<?php

namespace App\Console\Commands;

use App\Eco\Schedule\CommandRun;
use App\Eco\Task\Task;
use App\Helpers\Workflow\TaskWorkflowHelper;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class processWorkflowEmailCompleteTask extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'workflow:processWorkflowEmailCompleteTask';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Workflow email versturen na X aantal dagen na afhandelen taak.";

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

        $tasksToProcess = Task::where('finished', true)
            ->whereNull('date_sent_wf_completed_task')
            ->whereHas('type', function($query){
            $query->where('uses_wf_completed_task', true);
            })->get();

        foreach ($tasksToProcess as $task) {
            $days = $task->type ? $task->type->number_of_days_to_send_email_completed_task : 0;
            $mailDate = Carbon::parse($task->date_finished)->addDays((int) $days);
            if(Carbon::parse($mailDate) <= Carbon::now()->startOfDay()){
                $taskWorkflowHelper = new TaskWorkflowHelper($task);
                $processed = $taskWorkflowHelper->processWorkflowEmailCompleteTask();
                if($processed)
                {
                    $task->date_sent_wf_completed_task =  Carbon::now();
                    $task->save();
                }
            }
        }

        $commandRun->end_at = Carbon::now();
        $commandRun->finished = true;
        $commandRun->save();

        Log::info("Email verstuurd X aantal dagen na afhandelen taak.");
    }
}
