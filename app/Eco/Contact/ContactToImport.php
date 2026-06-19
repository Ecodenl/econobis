<?php

namespace App\Eco\Contact;

use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

/**
 *
 * * @mixin Builder
 * */

class ContactToImport extends Model
{
    use Encryptable;

    protected $guarded = ['id'];

    protected $dates = [
        'member_since',
        'end_date',
    ];

    protected $encryptable = [
        'iban'
    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
    public function contactForImports()
    {
        return $this->hasMany(ContactForImport::class);
    }
}
