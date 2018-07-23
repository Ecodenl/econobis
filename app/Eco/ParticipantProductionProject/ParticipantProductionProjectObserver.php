<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\ParticipantProductionProject;

use App\Eco\Contact\Contact;

class ParticipantProductionProjectObserver
{

    public function saved(ParticipantProductionProject $participantProductionProject)
    {
        $contact = Contact::find($participantProductionProject->contact_id);

        $participations = 0;

        foreach ($contact->participations as $participation){
            $participations += $participation->participations_current;
        }

        $contact->participations_current = $participations;

        $contact->save();
    }
}