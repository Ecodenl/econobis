<?php

namespace App\Eco\Project;

use Illuminate\Database\Eloquent\Model;

class ProjectLoanType extends Model
{
    protected $table = 'project_loan_types';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
