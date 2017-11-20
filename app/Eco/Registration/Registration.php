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
        'id', 'status', 'address_id', 'status_id', 'important'
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
        return $this->belongsToMany(Campaign::class);
    }
}
