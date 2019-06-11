<?php

namespace App\Eco\Project;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class ProjectRevenue extends Model
{
    use RevisionableTrait;

    protected $table = 'project_revenues';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    protected $dates = [
        'date_begin',
        'date_end',
        'date_reference',
        'date_confirmed',
        'date_payed',
        'created_at',
        'updated_at',
    ];

    //relations
    public function project(){
        return $this->belongsTo(Project::class);
    }

    public function type(){
        return $this->belongsTo(ProjectRevenueType::class, 'type_id');
    }

    public function category(){
        return $this->belongsTo(ProjectRevenueCategory::class, 'category_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function distribution(){
        return $this->hasMany(ProjectRevenueDistribution::class, 'revenue_id');
    }

    //Appended fields
    public function getKwhResultAttribute()
    {
        return ($this->kwh_end - $this->kwh_start);
    }
}
