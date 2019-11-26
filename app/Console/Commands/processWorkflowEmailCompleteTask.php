<?php

namespace App\Console\Commands;

use App\Eco\Task\Task;
use App\Helpers\Workflow\TaskWorkflowHelper;
use Illuminate\Console\Command;
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
        $tasksToProcess = Task::where('finished', true)->whereNull('date_sent_wf_completed_task')
            ->whereHas('type', function($query){
            $query->where('uses_wf_completed_task', true);
            })->get();

        foreach ($tasksToProcess as $task) {
            $taskWorkflowHelper = new TaskWorkflowHelper($task);
            $taskWorkflowHelper->processWorkflowEmailCompleteTask();
        }

        Log::info("Email verstuurd X aantal dagen na afhandelen taak.");
    }
}
