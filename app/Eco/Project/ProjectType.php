<?php

namespace App\Eco\Project;

use Illuminate\Database\Eloquent\Model;

class ProjectType extends Model
{
    protected $table = 'project_type';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
