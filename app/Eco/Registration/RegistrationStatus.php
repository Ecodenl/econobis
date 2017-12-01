<?php

namespace App\Eco\Registration;

use App\Eco\Registration\Registration;
use Illuminate\Database\Eloquent\Model;

class RegistrationStatus extends Model
{
    protected $table = 'registration_status';

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function registrations()
    {;
        return $this->belongsToMany(Registration::class);
    }

}
