<?php

namespace App\Console\Commands;

use App\Eco\Schedule\CommandRun;
use App\Eco\Task\Task;
use App\Helpers\Workflow\TaskWorkflowHelper;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class processWorkflowEmailExpiredTask extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'workflow:processWorkflowEmailExpiredTask';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Workflow email versturen na verlopen taak.";

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

        $tasksToProcess = Task::where('finished', false)
            ->whereNull('date_sent_wf_expired_task')
            ->where('date_planned_finish','<', Carbon::now()->startOfDay()->toDateString())
            ->whereHas('type', function($query){
                $query->where('uses_wf_expired_task', true);
            })
            ->get();

        foreach ($tasksToProcess as $task) {
            $taskWorkflowHelper = new TaskWorkflowHelper($task);
            $processed = $taskWorkflowHelper->processWorkflowEmailExpiredTask();
            if($processed)
            {
                $task->date_sent_wf_expired_task =  Carbon::now();
                $task->save();
            }
        }

        $commandRun->end_at = Carbon::now();
        $commandRun->finished = true;
        $commandRun->save();

        Log::info("Emails verstuurd verlopen taken.");
    }
}
