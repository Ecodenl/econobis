<?php

namespace App\Eco\Task;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TaskPropertyValue extends Model
{
    use SoftDeletes;

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
