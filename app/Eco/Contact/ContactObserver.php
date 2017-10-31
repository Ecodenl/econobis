<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\Contact;


use App\Eco\User\User;
use Illuminate\Support\Facades\Auth;

class ContactObserver
{

    public function creating(Contact $contact)
    {
        // number kolom willen we NOT NULL houden, deze wordt meteen na opslaan bepaald op basis van het ID
        // Daarom tijdelijke waarde erin zetten zodat query niet onderuit gaat.
        $contact->number = 'temp';

        $userId = User::first()->id; //TODO
        $contact->created_by_id = $userId;
        $contact->updated_by_id = $userId;
    }

    public function created(Contact $contact)
    {
        $contact->number = '2017-' . $contact->id;
        $contact->save();
    }

    public function updating(Contact $contact)
    {
        $userId = User::first()->id; //TODO
        $contact->updated_by_id = $userId;
    }
}