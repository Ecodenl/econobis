<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 16:12
 */

namespace App\Eco\ContactNote;

use Illuminate\Support\Facades\Auth;

class ContactNoteObserver
{

    public function creating(ContactNote $contactNote)
    {
        $userId = Auth::id();
        $contactNote->created_by_id = $userId;
        $contactNote->updated_by_id = $userId;
    }

    public function updating(ContactNote $contactNote)
    {
        $userId = Auth::id();
        $contactNote->updated_by_id = $userId;
    }

}