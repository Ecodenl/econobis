<?php

namespace App\Eco\Registration;

use App\Eco\Registration\Registration;
use Illuminate\Database\Eloquent\Model;

class RegistrationReason extends Model
{
    protected $table = 'reasons';

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function registrations()
    {
        return $this->belongsToMany(Registration::class);
    }

}
