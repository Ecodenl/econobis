<?php

namespace App\Eco\Registration;

use App\Eco\Registration\Registration;
use Illuminate\Database\Eloquent\Model;

class RegistrationSource extends Model
{
    protected $table = 'sources';

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
