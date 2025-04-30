<?php

namespace App\Eco\Contact;

use Illuminate\Database\Eloquent\Model;

class ContactAvailability extends Model
{
    protected $guarded = [];

    protected $casts = [
        'from' => 'datetime',
        'to' => 'datetime',
    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
