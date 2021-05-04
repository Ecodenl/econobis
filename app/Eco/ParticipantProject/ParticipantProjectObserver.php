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

        $obligations = 0;
        $participations = 0;
        $pcr = 0;
        $loan = 0;

        foreach ($contact->participations as $participation){
            $projectCodeRef = $participation->project->projectType->code_ref;
            switch ($projectCodeRef) {
                case 'obligation':
                    $obligations += $participation->participations_definitive;
                    break;
                case 'capital':
                    $participations += $participation->participations_definitive;
                    break;
                case 'postalcode_link_capital':
                    $pcr += $participation->participations_definitive;
                    break;
                case 'loan':
                    $loan += $participation->amount_definitive;
                    break;
            }
        }

        $contact->obligations_current = $obligations;
        $contact->participations_current = $participations;
        $contact->postalcode_link_capital_current = $pcr;
        $contact->loan_current = $loan;
        $contact->save();

        // When participations are definitive then add participant to project revenue distribution if available
        if($participantProject->isDirty('participations_definitive') || $participantProject->isDirty('amount_definitive')) {
            foreach($participantProject->project->projectRevenues as $projectRevenue) {
                // If project revenue is already confirmed then continue
                if($projectRevenue->confirmed) continue;

                $projectRevenueController = new ProjectRevenueController();

                $projectRevenueController->saveDistribution($projectRevenue, $participantProject);

                $projectTypeCodeRef = (ProjectType::where('id', $projectRevenue->project->project_type_id)->first())->code_ref;
                if($projectRevenue->category->code_ref == 'revenueEuro'
                && ($projectTypeCodeRef === 'capital' || $projectTypeCodeRef === 'postalcode_link_capital')) {
                    foreach($projectRevenue->distribution as $distribution) {
                        $distribution->calculator()->runRevenueCapitalResult();
                        $distribution->save();
                    }
                }
                if($projectRevenue->category->code_ref == 'revenueKwh') {
                    foreach($projectRevenue->distribution as $distribution) {
                        $distribution->calculator()->runRevenueKwh();
                        $distribution->save();
                    }
                }
                if($projectRevenue->category->code_ref == 'revenueKwhSplit') {
//todo: wm moet hier nog wat met revenueKwhSplit ?
//                    foreach($projectRevenue->distribution as $distribution) {
//                        $distribution->calculator()->runRevenueKwh();
//                        $distribution->save();
//                    }
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