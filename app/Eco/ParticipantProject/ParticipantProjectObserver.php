<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\ParticipantProject;

use App\Eco\Contact\Contact;
use App\Eco\Project\ProjectType;
use App\Http\Controllers\Api\Project\ProjectRevenueController;
use App\Http\Controllers\Api\Project\RevenuesKwhController;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class ParticipantProjectObserver
{

    public function creating(ParticipantProject $participantProject)
    {
        $userId = Auth::id();
        $participantProject->created_by_id = $userId;
        $participantProject->updated_by_id = $userId;
        if($participantProject->created_with == null){
            $participantProject->created_with = 'econobis';
        }
        $participantProject->updated_with = $participantProject->created_with;
    }

    public function saved(ParticipantProject $participantProject)
    {
        $contact = Contact::find($participantProject->contact_id);

        $contact->calculateParticipationTotals()->save();

        // When participations definitive or anmount definitive are added or changed then add/change/delete participant to project revenue distribution if available
        // also when (payout) type is changed.
        if($participantProject->isDirty('participations_definitive') || $participantProject->isDirty('amount_definitive') || $participantProject->isDirty('type_id')) {

            $projectTypeCodeRef = (ProjectType::where('id', $participantProject->project->project_type_id)->first())->code_ref;

            foreach($participantProject->project->projectRevenues as $projectRevenue) {
                // If project revenue is already confirmed then continue
                if($projectRevenue->confirmed) continue;

                $projectRevenueController = new ProjectRevenueController();
                $projectRevenueController->saveDistributions($projectRevenue, $participantProject, $projectTypeCodeRef);

                $projectTypeCodeRef = (ProjectType::where('id', $projectRevenue->project->project_type_id)->first())->code_ref;
                if($projectRevenue->category->code_ref == 'revenueEuro'
                && ($projectTypeCodeRef === 'capital' || $projectTypeCodeRef === 'postalcode_link_capital')) {
                    foreach($projectRevenue->distribution as $distribution) {
                        $distribution->calculator()->runRevenueCapitalResult();
                        $distribution->save();
                    }
                }
            }

            $revenuesKwhController = new RevenuesKwhController();
            foreach($participantProject->project->revenuesKwh as $revenuesKwh) {
                // If project revenue is already confirmed then continue
                if($revenuesKwh->confirmed) continue;

                $revenuesKwhController->saveDistributionKwh($revenuesKwh, $participantProject);
                foreach($revenuesKwh->partsKwh as $revenuePartsKwh) {
                    //todo WM: of kan dit wel direct?
                    if($revenuePartsKwh->status == 'concept'){
                        $revenuePartsKwh->status = 'concept-to-update';
                        $revenuePartsKwh->save();
                    }
                }
            }
        }

    }

    public function updating(ParticipantProject $participantProject)
    {
        $userId = Auth::id();
        $participantProject->updated_by_id = $userId;
        $updatedWith = '';
        if(Auth::user()){
            $updatedWith = Auth::user()->occupation;
        }
        switch ($updatedWith){
            case '@portal-update@':
                $participantProject->updated_with = 'portal';
                break;
            case '@webform-update@':
                $participantProject->updated_with = 'webform';
                break;
            default:
                $participantProject->updated_with = 'econobis';
                break;
        }

        if($participantProject->isDirty('did_accept_agreement') && $participantProject->did_accept_agreement ) {
            $participantProject->date_did_accept_agreement = Carbon::now();
        }
        if($participantProject->isDirty('did_understand_info') && $participantProject->did_understand_info ) {
            $participantProject->date_did_understand_info = Carbon::now();
        }


    }
}