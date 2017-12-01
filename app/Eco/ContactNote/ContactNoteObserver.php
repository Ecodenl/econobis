<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 16:12
 */

namespace App\Eco\ContactNote;

use App\Eco\User\User;

class ContactNoteObserver
{

    public function creating(ContactNote $contactNote)
    {
        $userId = User::first()->id; //TODO
        $contactNote->created_by_id = $userId;
        $contactNote->updated_by_id = $userId;
    }

    public function updating(ContactNote $contactNote)
    {
        $userId = User::first()->id; //TODO
        $contactNote->updated_by_id = $userId;
    }

}