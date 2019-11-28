<?php

namespace App\Console\Commands;

use App\Eco\Task\Task;
use App\Helpers\Workflow\TaskWorkflowHelper;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
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
        $tasksToProcess = Task::where('finished', true)
            ->whereNull('date_sent_wf_completed_task')
            ->whereHas('type', function($query){
            $query->where('uses_wf_completed_task', true);
            })->get();

        foreach ($tasksToProcess as $task) {
//            echo "Date finished: " . Carbon::parse($task->date_finished)->toDateString() . "\n";
            $days = $task->type ? $task->type->number_of_days_to_send_email_completed_task : 0;
            $mailDate = Carbon::parse($task->date_finished)->addDays($days);
//            echo "Date for mail: " . Carbon::parse($mailDate)->toDateString() . "\n";
            if(Carbon::parse($mailDate) < Carbon::now()->startOfDay()){
//                echo "do wat" . "\n";
                $taskWorkflowHelper = new TaskWorkflowHelper($task);
                $processed = $taskWorkflowHelper->processWorkflowEmailCompleteTask();
                if($processed)
                {
                    $task->date_sent_wf_completed_task =  Carbon::now();
                    $task->save();
                }
            }
        }

        Log::info("Email verstuurd X aantal dagen na afhandelen taak.");
    }
}
