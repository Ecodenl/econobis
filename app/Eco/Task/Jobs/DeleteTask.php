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
        $this->deleteProperties();
        $this->deleteAttachments();
        $this->deleteTask();
    }

    protected function deleteAttachments()
    {
        foreach ($this->task->attachments as $attachment) {
            (new DeleteTaskAttachment($attachment))->handle();
        }
    }

    private function deleteProperties()
    {
        $this->task->properties()->delete();
    }

    protected function deleteTask()
    {
        $this->task->delete();
    }
}