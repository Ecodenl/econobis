<?php

namespace App\Eco\HousingFile;

use Illuminate\Database\Eloquent\Model;

class HousingFileHoomHousingStatus extends Model
{
    protected $table = 'housing_file_hoom_housing_statuses';
     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

// todo WM: cleanup indien niet nodig
//    public function housingFileHoomLink(){
//        return $this->belongsTo(HousingFileHoomLink::class, 'external_hoom_short_name', 'external_hoom_short_name');
//    }

}
