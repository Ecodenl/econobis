<?php

namespace App\Eco\Country;

use App\Eco\Address\Address;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $table = 'countries';
     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    protected $casts = ['id' => 'string'];
    public $incrementing = false;

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

}
