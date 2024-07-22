<?php

namespace App\Eco\Contact;

use Illuminate\Database\Eloquent\Model;

class ContactToImport extends Model
{
    protected $guarded = ['id'];

    protected $dates = [
        'member_since',
        'end_date',
    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
