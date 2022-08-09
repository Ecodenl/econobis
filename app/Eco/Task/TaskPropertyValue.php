<?php

namespace App\Eco\Task;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class TaskPropertyValue extends Model
{
    use RevisionableTrait, HasFactory;

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
