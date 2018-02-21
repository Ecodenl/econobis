<?php

namespace App\Eco\Measure;

use App\Eco\Address\Address;
use App\Eco\HousingFile\HousingFile;
use App\Eco\Intake\Intake;
use Illuminate\Database\Eloquent\Model;

class MeasureCategory extends Model
{
    protected $table = 'measure_categories';
     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function measure()
    {
        return $this->hasMany(Measure::class);
    }

    public function intakes()
    {
        return $this->belongsToMany(Intake::class, 'intake_measure_requested');
    }
}
