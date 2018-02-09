<?php

namespace App\Eco\HousingFile;

use App\Eco\Address\Address;
use App\Eco\HousingFile\HousingFile;
use Illuminate\Database\Eloquent\Model;

class BuildingType extends Model
{
    protected $table = 'building_types';
     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function housingFiles()
    {
        return $this->belongsToMany(HousingFile::class);
    }

}
