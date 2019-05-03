<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\ParticipantProject;

use App\Eco\Contact\Contact;
use Illuminate\Support\Facades\Auth;

class ParticipantProjectObserver
{

    public function creating(ParticipantProject $participantProject)
    {
        $userId = Auth::id();
        $participantProject->created_by_id = $userId;
        $participantProject->updated_by_id = $userId;
    }

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

    public function updating(ParticipantProject $participantProject)
    {
        $userId = Auth::id();
        $participantProject->updated_by_id = $userId;
    }
}