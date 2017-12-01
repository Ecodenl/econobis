<?php

namespace App\Eco\Registration;

use App\Eco\Registration\Registration;
use Illuminate\Database\Eloquent\Model;

class RegistrationNote extends Model
{
    protected $table = 'notes_registration';

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id','registration_id', 'note'
    ];

    public function registrations()
    {
        return $this->belongsTo(Registration::class);
    }

}
