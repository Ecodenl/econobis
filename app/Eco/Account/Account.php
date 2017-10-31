<?php

namespace App\Eco\Account;

use App\Eco\AccountType\AccountType;
use App\Eco\Contact\Contact;
use App\Eco\Person\Person;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class Account extends Model
{
    use RevisionableTrait, SoftDeletes;

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function type()
    {
        return $this->belongsTo(AccountType::class);
    }

    public function people()
    {
        return $this->hasMany(Person::class);
    }
}
