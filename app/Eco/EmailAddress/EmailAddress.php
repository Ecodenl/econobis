<?php

namespace App\Eco\EmailAddress;

use App\Eco\AbstractType\HasTypeTrait;
use App\Eco\Contact\Contact;
use App\Eco\EmailAddress\EmailAddressType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class EmailAddress extends Model
{

    use RevisionableTrait;

    protected $guarded = ['id'];

    protected $casts = [
        'primary' => 'boolean',
    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function getType()
    {
        if(!$this->type_id) return null;

        return EmailAddressType::get($this->type_id);
    }

}
