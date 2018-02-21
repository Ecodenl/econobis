<?php

namespace App\Eco\HousingFile;

use App\Eco\Address\Address;
use App\Eco\HousingFile\HousingFile;
use Illuminate\Database\Eloquent\Model;

class RoofType extends Model
{
    protected $table = 'roof_types';
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
