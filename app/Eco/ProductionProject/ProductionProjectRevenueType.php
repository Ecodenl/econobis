<?php

namespace App\Eco\ProductionProject;

use Illuminate\Database\Eloquent\Model;

class ProductionProjectRevenueType extends Model
{
    protected $table = 'production_project_revenue_type';

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
