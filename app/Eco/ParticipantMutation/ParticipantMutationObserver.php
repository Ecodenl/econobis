<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\ParticipantMutation;

use App\Http\Controllers\Api\Project\RevenuesKwhController;
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
        if($participantMutation->created_with == null){
            $participantMutation->created_with = 'econobis';
        }
        $participantMutation->updated_with = $participantMutation->created_with;
        $participantMutation->code = Str::random(32);
    }

    public function saved(ParticipantMutation $participantMutation)
    {
        Log::info('ParticipantMutationObserver saved');
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
        $dateEntry = $participantMutation->date_entry;
        // Changed DateEntry not null
        if($dateEntry != null) {
            $dateEntryFormated = Carbon::parse($dateEntry)->format('Y-m-d');

            // Get original DateEntry. If null then use 01-01-1900 as original date.
            $dateEntryOriginal = $participantMutation->getOriginal('date_entry');
            if($dateEntryOriginal != null){
                $dateEntryOriginalFormated = Carbon::parse($dateEntryOriginal)->format('Y-m-d');
            } else {
                $dateEntryOriginalFormated = Carbon::parse('1900-01-01')->format('Y-m-d');
            }

            if ($dateEntryFormated != $dateEntryOriginalFormated)
            {
                $participantProject = $participantMutation->participation;
                $participantProject->date_register = $participantProject->dateEntryFirstDeposit;
                $participantProject->save();

                $revenuesKwhController = new RevenuesKwhController();
                foreach ($participantProject->project->revenuesKwh as $revenuesKwh) {
                    // If project revenue is already confirmed then continue
                    if ($revenuesKwh->confirmed) continue;

                    $revenuesKwhController->saveDistributionKwh($revenuesKwh, $participantProject);
                    $partsUpFromDate = $dateEntryFormated < $dateEntryOriginalFormated ? $dateEntryFormated : $dateEntryOriginalFormated;
                    $parts = $revenuesKwh->partsKwh->where('date_begin', '>=', $partsUpFromDate);
                    foreach ($parts as $revenuePartsKwh) {
                        if ($revenuePartsKwh->status == 'concept') {
                            $revenuePartsKwh->status = 'concept-to-update';
                            $revenuePartsKwh->save();
                        }
                    }
                }
            }
        }
    }

    public function updating(ParticipantMutation $participantMutation)
    {
        $userId = Auth::id();
        $participantMutation->updated_by_id = $userId;
        $updatedWith = '';
        if(Auth::user()){
            $updatedWith = Auth::user()->occupation;
        }
        switch ($updatedWith){
            case '@portal-update@':
                $participantMutation->updated_with = 'portal';
                break;
            case '@webform-update@':
                $participantMutation->updated_with = 'webform';
                break;
            default:
                $participantMutation->updated_with = 'econobis';
                break;
        }
    }

    public function deleted(ParticipantMutation $participantMutation)
    {
        // If mutation was deleted, than determine date_register (is earliest first deposit date entry) by participant again.
        $participantProject = $participantMutation->participation;
        $participantProject->date_register = $participantProject->dateEntryFirstDeposit;
        $participantProject->save();
    }

}