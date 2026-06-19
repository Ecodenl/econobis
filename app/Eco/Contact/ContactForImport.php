<?php

namespace App\Eco\Contact;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

/**
 *
 * * @mixin Builder
 * */

class ContactForImport extends Model
{
    protected $guarded = ['id'];

    public $timestamps = false;

    public function contactToImport()
    {
        return $this->belongsTo(ContactToImport::class);
    }
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
