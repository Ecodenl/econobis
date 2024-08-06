<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\ParticipantMutation;

use App\Eco\Project\ProjectRevenueCategory;
use App\Http\Controllers\Api\Project\RevenuesKwhController;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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

                // Check if reveneusKwh have to be updated (only for concept ones)
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
            // If date_entry, amount of quantity is changed
            if ($dateEntryFormated != $dateEntryOriginalFormated
                || $participantMutation->amount != $participantMutation->getOriginal('amount')
                || $participantMutation->quantity != $participantMutation->getOriginal('quantity')
            ) {
                // only check mutation of type: 'first_deposit', 'deposit', 'withDrawal'
                $this->setConceptRevenuesToUpdate($participantMutation);
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
        // only check mutation of type: 'first_deposit', 'deposit', 'withDrawal'
        $this->setConceptRevenuesToUpdate($participantMutation);

        // If mutation was deleted, than determine date_register (is earliest first deposit date entry) by participant again.
        $participantProject = $participantMutation->participation;
        $participantProject->date_register = $participantProject->dateEntryFirstDeposit;
        $participantProject->save();

    }

    /**
     * @param ParticipantMutation $participantMutation
     * @return void
     */
    private function setConceptRevenuesToUpdate(ParticipantMutation $participantMutation): void
    {
        $mutationTypesToCheck = ParticipantMutationType::where('project_type_id', $participantMutation->participation->project->project_type_id)->whereIn('code_ref', ['first_deposit', 'deposit', 'withDrawal'])->get()->pluck('id')->toArray();
        if (in_array($participantMutation->type_id, $mutationTypesToCheck)) {
            $participantProject = $participantMutation->participation;

            // Check if projectReveneus have to be updated (only for concept ones and category revenueEuro of redemptionEuro) to concept-to-update
            $projectRevenueCategoryRevenueEuro = ProjectRevenueCategory::where('code_ref', 'revenueEuro')->first()->id;
            $projectRevenueCategoryRedemptionEuro = ProjectRevenueCategory::where('code_ref', 'redemptionEuro')->first()->id;
            $projectRevenues = $participantProject->project->projectRevenues()->where('confirmed', false)->where('status', 'concept')->whereIn('category_id', [$projectRevenueCategoryRevenueEuro, $projectRevenueCategoryRedemptionEuro])->get();
            foreach ($projectRevenues as $projectRevenue) {
                $projectRevenue->status = 'concept-to-update';
                $projectRevenue->save();
            }
        }
    }

}