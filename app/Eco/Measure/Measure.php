<?php

namespace App\Eco\Measure;

use App\Eco\Address\Address;
use App\Eco\EnergyLabel\EnergyLabel;
use Illuminate\Database\Eloquent\Model;

class Measure extends Model
{
    protected $table = 'measures';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function energy_label()
    {
        return $this->hasOne(EnergyLabel::class);
    }

    public function addresses()
    {
        return $this->belongsToMany(Address::class);
    }

    public static function getAllMeasures(Address $address)
    {
        $address->load(['measures_taken', 'measures_requested']);
        foreach ($address->measures_taken as $measure){
            $measures['taken'][] = $measure->name;
        }
        foreach ($address->measures_requested as $measure){
            $measures['requested'][] = $measure->name;
        }
        return $measures;
    }

}
