<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\Contact;


use App\Eco\User\User;
use App\Exceptions\UnauthorizedException;
use Illuminate\Support\Facades\Auth;

class ContactObserver
{

    public function deleting(Contact $contact)
    {
        if(!Auth::user()->can('delete', $contact)) throw new UnauthorizedException('Unauthorized contact deletion');
    }

    public function creating(Contact $contact)
    {
        // number kolom willen we NOT NULL houden, deze wordt meteen na opslaan bepaald op basis van het ID
        // Daarom tijdelijke waarde erin zetten zodat query niet onderuit gaat.
        $contact->number = 'temp';

        $userId = Auth::id();
        $contact->created_by_id = $userId;
        $contact->updated_by_id = $userId;
    }

    public function created(Contact $contact)
    {
        // Fresh() aanroepen, anders zijn in het model de originals nog niet gevuld en wordt in updating() alles als "dirty" beschouwd
        $contact = $contact->fresh();

        $contact->number = '2017-' . $contact->id; // TODO; goede nummers genereren
        $contact->save();
    }

    public function updating(Contact $contact)
    {
        if($contact->isDirty('iban') && !Auth::user()->can('update_iban', $contact)) throw new UnauthorizedException('Unauthorized contact iban modification');
        if($contact->isDirty('owner_id') && !Auth::user()->can('update_owner', $contact)) throw new UnauthorizedException('Unauthorized contact owner modification');

        $userId = Auth::id();
        $contact->updated_by_id = $userId;
    }

}