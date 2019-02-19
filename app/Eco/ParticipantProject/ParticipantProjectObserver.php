<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\ParticipantProject;

use App\Eco\Contact\Contact;

class ParticipantProjectObserver
{

    public function saved(ParticipantProject $participantProject)
    {
        $contact = Contact::find($participantProject->contact_id);

        $participations = 0;

        foreach ($contact->participations as $participation){
            $participations += $participation->participations_current;
        }

        $contact->participations_current = $participations;

        $contact->save();
    }
}