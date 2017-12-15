<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 13-12-2017
 * Time: 14:18
 */

namespace App\Eco\Task\Jobs;

use App\Helpers\Jobs\GenericDeleteModelJob;

class DeleteTask extends GenericDeleteModelJob
{

    public function handle()
    {
        GenericDeleteModelJob::collection($this->model->properties, $this->force);
        DeleteTaskAttachment::collection($this->model->attachments, $this->force);
        $this->deleteModel();
    }
}