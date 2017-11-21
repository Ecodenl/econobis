<?php

namespace App\Eco\Campaign;

use App\Eco\Registration\Registration;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $table = 'campaigns';
     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [

    ];

    public function roles()
    {
        return $this->belongsToMany(Registration::class);
    }

}
