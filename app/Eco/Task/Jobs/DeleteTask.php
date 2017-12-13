<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 13-12-2017
 * Time: 14:18
 */

namespace App\Eco\Task\Jobs;


use App\Eco\Task\Task;

class DeleteTask
{

    /**
     * @var Task
     */
    private $task;

    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    public function handle()
    {
        foreach($this->task->attachments as $attachment){
            (new DeleteTaskAttachment($attachment))->handle();
        }

        $this->task->delete();
    }
}