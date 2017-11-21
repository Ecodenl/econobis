<?php

namespace App\Eco\BuildingFeature;

use App\Eco\Address\Address;
use Illuminate\Database\Eloquent\Model;

class BuildingFeature extends Model
{
    protected $table = 'building_features';
     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'address_id', 'build_year', 'building_type', 'owner_id'
    ];

    public function roles()
    {
        return $this->belongsToMany(Address::class);
    }

}
