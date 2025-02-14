<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 23-11-2017
 * Time: 16:30
 */

namespace App\Eco\ContactGroup;


use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ContactGroupObserver
{

    public function creating(ContactGroup $contactGroup)
    {
        $userId = Auth::id();
        if($userId){
            $contactGroup->created_by_id = $userId;
        }
    }

    public function saved(ContactGroup $contactGroup)
    {
        if($contactGroup->simulatedGroup && ($contactGroup->isDirty('name') || $contactGroup->isDirty('description')) ) {
            $contactGroup->simulatedGroup->name = $contactGroup->name;
            $contactGroup->simulatedGroup->description = $contactGroup->description;
            $contactGroup->simulatedGroup->save();
        }

    }


}