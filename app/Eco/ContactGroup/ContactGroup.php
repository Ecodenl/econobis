<?php

namespace App\Eco\ContactGroup;

use App\Eco\Contact\Contact;
use Illuminate\Database\Eloquent\Model;

class ContactGroup extends Model
{

    public function contacts()
    {
        return $this->belongsToMany(Contact::class, 'contact_groups_pivot');
    }

}
