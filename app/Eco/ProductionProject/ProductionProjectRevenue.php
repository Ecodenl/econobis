<?php

namespace App\Eco\ProductionProject;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class ProductionProjectRevenue extends Model
{
    use RevisionableTrait;

    protected $table = 'production_project_revenues';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    //relations
    public function productionProject(){
        return $this->belongsTo(ProductionProject::class);
    }

    public function type(){
        return $this->belongsTo(ProductionProjectRevenueType::class, 'type_id');
    }

    public function category(){
        return $this->belongsTo(ProductionProjectRevenueCategory::class, 'category_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function distribution(){
        return $this->hasMany(ProductionProjectRevenueDistribution::class, 'revenue_id');
    }

    //Appended fields
    public function getKwhResultAttribute()
    {
        return ($this->kwh_end - $this->kwh_start);
    }
}
