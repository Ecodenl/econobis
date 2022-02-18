<?php

namespace App\Eco\Project;

use App\Eco\RevenuesKwh\RevenuesKwh;
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
        return $this->hasMany(ProjectRevenue::class, 'category_id');
    }
    public function revenuesKwh()
    {
        return $this->hasMany(RevenuesKwh::class, 'category_id');
    }
}
