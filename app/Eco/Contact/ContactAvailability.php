<?php

namespace App\Eco\Contact;

use Illuminate\Database\Eloquent\Model;

class ContactAvailability extends Model
{
    protected $guarded = [];

    protected $dates = [
        'from',
        'to',
    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
