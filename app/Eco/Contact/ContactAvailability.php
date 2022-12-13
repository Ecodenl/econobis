<?php

namespace App\Eco\Contact;

use Illuminate\Database\Eloquent\Model;

class ContactAvailability extends Model
{
    protected $guarded = [];

    protected $casts = [
//        'from' => 'datetime:Y-m-d H:i:s',
//        'to' => 'datetime:Y-m-d H:i:s',
    ];

//    protected $dates = [
//        'from',
//        'to',
//    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
