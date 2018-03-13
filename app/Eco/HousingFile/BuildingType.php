<?php

namespace App\Eco\HousingFile;

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
        return $this->hasMany(HousingFile::class);
    }

}
