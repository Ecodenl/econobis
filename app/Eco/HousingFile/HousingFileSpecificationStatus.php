<?php

namespace App\Eco\HousingFile;

use Illuminate\Database\Eloquent\Model;

class HousingFileSpecificationStatus extends Model
{
    protected $table = 'housing_file_specification_statuses';
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
