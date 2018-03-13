<?php

namespace App\Eco\ProductionProject;

use Illuminate\Database\Eloquent\Model;

class ProductionProjectType extends Model
{
    protected $table = 'production_project_type';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function productionProjects()
    {
        return $this->hasMany(ProductionProject::class);
    }
}
