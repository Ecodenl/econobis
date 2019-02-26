<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\ParticipantMutation;

use Illuminate\Support\Facades\Auth;

class ParticipantMutationObserver
{

    public function creating(ParticipantMutation $participantMutation)
    {
        $userId = Auth::id();
        $participantMutation->created_by_id = $userId;
        $participantMutation->updated_by_id = $userId;
    }

    public function updating(ParticipantMutation $participantMutation)
    {
        $userId = Auth::id();
        $participantMutation->updated_by_id = $userId;
    }
}