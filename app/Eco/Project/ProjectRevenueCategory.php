<?php

namespace App\Eco\Project;

use Illuminate\Database\Eloquent\Model;

class ProjectRevenueCategory extends Model
{
    protected $table = 'project_revenue_category';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function projectRevenue()
    {
        return $this->hasMany(ProjectRevenue::class, 'id', 'type_id');
    }
}
