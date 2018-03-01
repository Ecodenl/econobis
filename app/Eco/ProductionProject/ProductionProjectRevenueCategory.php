<?php

namespace App\Eco\ProductionProject;

use Illuminate\Database\Eloquent\Model;

class ProductionProjectRevenueCategory extends Model
{
    protected $table = 'production_project_revenue_category';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function productionProjectRevenue()
    {
        return $this->hasMany(ProductionProjectRevenue::class, 'id', 'type_id');
    }
}
