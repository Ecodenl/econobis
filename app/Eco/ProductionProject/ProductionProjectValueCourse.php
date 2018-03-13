<?php

namespace App\Eco\ProductionProject;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class ProductionProjectValueCourse extends Model
{
    use RevisionableTrait;

    protected $table = 'production_project_value_course';

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

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }
}
