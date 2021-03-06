<?php

namespace App\Eco\HousingFile;

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

    public function housingFiles()
    {
        return $this->hasMany(HousingFile::class);
    }
}
