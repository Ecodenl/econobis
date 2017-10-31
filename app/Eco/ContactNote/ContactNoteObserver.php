<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 16:12
 */

namespace App\Eco\ContactNote;


use App\Eco\ContactNote\ContactNote;
use App\Eco\User\User;
use Illuminate\Support\Facades\Auth;

class ContactNoteObserver
{

    public function creating(ContactNote $contact)
    {
        $userId = User::first()->id; //TODO
        $contact->created_by_id = $userId;
        $contact->updated_by_id = $userId;
    }

    public function updating(ContactNote $contact)
    {
        $userId = User::first()->id; //TODO
        $contact->updated_by_id = $userId;
    }

}