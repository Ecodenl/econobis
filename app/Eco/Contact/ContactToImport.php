<?php

namespace App\Eco\Contact;

use Illuminate\Database\Eloquent\Model;

class ContactToImport extends Model
{
    protected $table = 'contacts_to_import';

    protected $guarded = ['id'];

    protected $dates = [
        'member_since',
        'end_date',
    ];
}
