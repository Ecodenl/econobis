<?php

namespace App\Eco\EnergyLabel;

use App\Eco\Measure\Measure;
use Illuminate\Database\Eloquent\Model;

class EnergyLabel extends Model
{
    protected $table = 'energy_labels';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function measures()
    {
        return $this->hasMany(Measure::class);
    }
}
