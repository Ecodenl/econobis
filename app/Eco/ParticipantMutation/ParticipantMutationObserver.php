<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\ParticipantMutation;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ParticipantMutationObserver
{

    public function creating(ParticipantMutation $participantMutation)
    {
        $userId = Auth::id();
        $participantMutation->created_by_id = $userId;
        $participantMutation->updated_by_id = $userId;
    }

    public function saved(ParticipantMutation $participantMutation)
    {
        if($participantMutation->isDirty('status_id')) {
            $userId = Auth::id();

            $fromStatusId = null;
            if($participantMutation->getOriginal('status_id')) {
                $fromStatusId = $participantMutation->getOriginal('status_id');
            };

            $participantMutationStatusLog = new ParticipantMutationStatusLog();

            $participantMutationStatusLog->fill([
                'participant_mutation_id' => $participantMutation->id,
                'from_status_id' => $fromStatusId,
                'to_status_id' => $participantMutation->status_id,
                'date_status' => Carbon::now(),
                'created_by_id' => $userId,
            ]);

            $participantMutationStatusLog->save();
        }
    }

    public function updating(ParticipantMutation $participantMutation)
    {
        $userId = Auth::id();
        $participantMutation->updated_by_id = $userId;
    }
}