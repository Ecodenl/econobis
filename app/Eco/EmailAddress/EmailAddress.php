<?php

namespace App\Eco\EmailAddress;

use App\Eco\AbstractType\HasTypeTrait;
use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactEmail;
use App\Eco\Email\Email;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class EmailAddress extends Model
{

    use RevisionableTrait, SoftDeletes, HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'primary' => 'boolean',
        'type_id' => EmailAddressType::class,
    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function email()
    {
        return $this->belongsTo(Email::class);
    }
    public function contactEmails()
    {
        return $this->hasMany(ContactEmail::class, 'email_address_id');
    }

    public function getType(): ?EmailAddressType
    {
        if (!$this->type_id) {
            return null;
        }

        if ($this->type_id instanceof EmailAddressType) {
            return $this->type_id;
        }

        return EmailAddressType::get($this->type_id);
    }
}
