<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 13-12-2017
 * Time: 14:21
 */

namespace App\Eco\Task\Jobs;


use App\Helpers\Jobs\GenericDeleteModelJob;
use Storage;

class DeleteTaskAttachment extends GenericDeleteModelJob
{

    public function handle()
    {
        // Als het een force delete is wordt het record niet softgedelete maar echt verwijderd
        // In dat geval de bijlage zelf ook verwijderen.
        if($this->force) Storage::disk('task_attachments')->delete($this->model->filename);

        $this->deleteModel();
    }
}