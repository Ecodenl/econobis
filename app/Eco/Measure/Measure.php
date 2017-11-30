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
        return $this->belongsTo(EnergyLabel::class);
    }

    public function addresses()
    {
        return $this->belongsToMany(Address::class);
    }
}
