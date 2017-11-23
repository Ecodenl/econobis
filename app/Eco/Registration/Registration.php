<?php

namespace App\Eco\Registration;

use App\Eco\Address\Address;
use App\Eco\Campaign\Campaign;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{

    protected $table = 'registrations';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'address_id', 'status_id',
    ];

    public function sources()
    {
        return $this->belongsToMany(RegistrationSource::class,
            'registration_source', 'registration_id', 'source_id');
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function campaigns()
    {
        return $this->hasOne(Campaign::class);
    }

    public function note()
    {
        return $this->hasMany(RegistrationNote::class);
    }

    public function reasons()
    {
        return $this->belongsToMany(RegistrationReason::class,
            'reason_registration', 'registration_id', 'reason_id');
    }

    public function status()
    {
        return $this->hasOne(RegistrationStatus::class, 'id', 'registration_status_id');
    }
}
