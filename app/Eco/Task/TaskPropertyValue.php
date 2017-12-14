<?php

namespace App\Eco\Task;

use Illuminate\Database\Eloquent\Model;

class TaskPropertyValue extends Model
{

    protected $guarded = ['id'];

    /**
     * required
     */
    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    /**
     * required
     */
    public function property()
    {
        return $this->belongsTo(TaskProperty::class);
    }

}
