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
use App\Exceptions\UnauthorizedException;
use Illuminate\Support\Facades\Auth;

class ContactNoteObserver
{

    public function deleting(ContactNote $contactNote)
    {
        if(!Auth::user()->can('delete', $contactNote)) throw new UnauthorizedException('Unauthorized contactNote deletion');
    }

    public function creating(ContactNote $contactNote)
    {
        if(!Auth::user()->can('update', $contactNote)) throw new UnauthorizedException('Unauthorized contactNote modification');

        $userId = User::first()->id; //TODO
        $contactNote->created_by_id = $userId;
        $contactNote->updated_by_id = $userId;
    }

    public function updating(ContactNote $contactNote)
    {
        if(!Auth::user()->can('update', $contactNote)) throw new UnauthorizedException('Unauthorized contactNote creation');

        $userId = User::first()->id; //TODO
        $contactNote->updated_by_id = $userId;
    }

}