<?php

namespace App\Eco\HousingFile;

use Illuminate\Database\Eloquent\Model;

class HousingFileHousingStatus extends Model
{
    protected $table = 'housing_file_housing_statuses';
     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    public function housingFile()
    {
        return $this->belongsTo(HousingFile::class);
    }

    public function housingFileHoomLink()
    {
        return $this->belongsTo(HousingFileHoomLink::class, 'housing_file_hoom_links_id');
    }


}
