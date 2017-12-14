<?php

namespace App\Eco\Task;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TaskAttachment extends Model
{

    use SoftDeletes;

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

}
