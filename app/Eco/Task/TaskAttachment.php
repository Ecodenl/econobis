<?php

namespace App\Eco\Task;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class TaskAttachment extends Model
{

    use SoftDeletes, RevisionableTrait;

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

}
