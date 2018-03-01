<?php

namespace App\Eco\Measure;

use App\Eco\Address\Address;
use App\Eco\Campaign\Campaign;
use App\Eco\HousingFile\HousingFile;
use App\Eco\Intake\Intake;
use App\Eco\Opportunity\Opportunity;
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

    public function opportunities()
    {
        return $this->hasMany(Opportunity::class);
    }

    public function intakes()
    {
        return $this->belongsToMany(Intake::class, 'intake_measure_requested');
    }

    public function campaigns()
    {
        return $this->belongsToMany(Campaign::class);
    }
}
