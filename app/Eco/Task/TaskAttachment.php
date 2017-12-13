<?php

namespace App\Eco\Task;

use Illuminate\Database\Eloquent\Model;

class TaskAttachment extends Model
{

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

}
