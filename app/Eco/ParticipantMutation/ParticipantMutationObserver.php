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
use Illuminate\Support\Str;

class ParticipantMutationObserver
{

    public function creating(ParticipantMutation $participantMutation)
    {
        $userId = Auth::id();
        $participantMutation->created_by_id = $userId;
        $participantMutation->updated_by_id = $userId;
        $participantMutation->code = Str::random(32);
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
        // If date_entry is changed, than determine date_register (is earliest first deposit date entry) by participant again.
        if($participantMutation->isDirty('date_entry')) {
            $participantProject = $participantMutation->participation;
            $participantProject->date_register = $participantProject->dateEntryFirstDeposit;
            $participantProject->save();
        }
    }

    public function updating(ParticipantMutation $participantMutation)
    {
        $userId = Auth::id();
        $participantMutation->updated_by_id = $userId;
    }

    public function deleted(ParticipantMutation $participantMutation)
    {
        // If mutation was deleted, than determine date_register (is earliest first deposit date entry) by participant again.
        $participantProject = $participantMutation->participation;
        $participantProject->date_register = $participantProject->dateEntryFirstDeposit;
        $participantProject->save();
    }

}