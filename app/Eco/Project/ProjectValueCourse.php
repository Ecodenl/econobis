<?php

namespace App\Eco\Project;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class ProjectValueCourse extends Model
{
    use RevisionableTrait;

    protected $table = 'project_value_course';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    //relations
    public function project(){
        return $this->belongsTo(Project::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }
}
