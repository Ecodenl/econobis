<?php

namespace App\Eco\HousingFile;

use Illuminate\Database\Eloquent\Model;

class EnergyLabelStatus extends Model
{
    protected $table = 'energy_label_status';

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
