<?php

namespace App\Eco\BuildingType;

use App\Eco\Address\Address;
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

    public function addresses()
    {
        return $this->belongsToMany(Address::class);
    }

}
