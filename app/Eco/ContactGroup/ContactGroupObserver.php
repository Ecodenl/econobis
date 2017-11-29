<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 23-11-2017
 * Time: 16:30
 */

namespace App\Eco\ContactGroup;


use Illuminate\Support\Facades\Auth;

class ContactGroupObserver
{

    public function creating(ContactGroup $contactGroup)
    {
        $userId = Auth::id();
        $contactGroup->created_by_id = $userId;
    }
}