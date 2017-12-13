<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 13-12-2017
 * Time: 14:21
 */

namespace App\Eco\Task\Jobs;


use Storage;

class DeleteTaskAttachment
{
    private $taskAttachment;

    /**
     * DeleteTaskAttachment constructor.
     * @param $taskAttachment
     */
    public function __construct($taskAttachment)
    {
        $this->taskAttachment = $taskAttachment;
    }

    public function handle()
    {
        Storage::disk('task_attachments')->delete($this->taskAttachment->filename);
        $this->taskAttachment->delete();
    }
}