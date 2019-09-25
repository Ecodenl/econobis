<?php


namespace App\Http\Controllers\Portal\ParticipationProject;


use App\Eco\Contact\Contact;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\ParticipantProject\ParticipantProjectPayoutType;
use App\Eco\Project\Project;
use App\Eco\User\User;
use App\Http\Controllers\Api\Setting\SettingController;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ParticipationProjectController extends Controller
{
    public function create(Request $request)
    {
        if (!isset($request) || !isset($request->contactId)) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }
        // ophalen contactgegevens portal user (vertegenwooridger)
        $portalUser = Auth::user();
        if (!Auth::isPortalUser() || !$portalUser->contact) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }
        // ophalen contactgegevens
        $contact = Contact::find($request->contactId);
        if (!$contact) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }
        // ophalen projectgegevens
        $project = Project::find($request->projectId);
        if (!$contact) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }

        // Voor aanmaak van Participant Mutations wordt created by and updated by via ParticipantMutationObserver altijd bepaald obv Auth::id
        // todo wellicht moeten we hier nog wat op anders verzinnen, voornu gebruiken we responisibleUserId from settings.json, verderop zetten we dat weer terug naar portal user
        $settingController = new SettingController();
        $responsibleUserId = $settingController->getSingleSetting("responsibleUserId");
        if (!$responsibleUserId) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }

        Auth::setUser(User::find($responsibleUserId));
//            $this->log('responsible_user_id : ' . $webform->responsible_user_id);

        DB::transaction(function () use ($contact, $project, $request) {
            $this->creatParticipantProject($contact, $project, $request);
        });
        // todo wellicht moeten we hier nog wat op anders verzinnen, voor nu hebben we responisibleUserId from settings.json tijdelijk in Auth user gezet hierboven
        // Voor zekerheid hierna weer even Auth user herstellen met portal user
        Auth::setUser($portalUser);


    }

    protected function creatParticipantProject($contact, $project, $request)
    {

        $today = Carbon::now();

        $projectTypeCodeRef = $project->projectType->code_ref;
        $payoutTypeId = null;
        switch($projectTypeCodeRef){
            // default Betaalwijze Op rekening indien lening of obligatie
            case 'loan' :
            case 'obligation' :
                $payoutTypeId = ParticipantProjectPayoutType::where('code_ref', 'account')->value('id');
                break;
        }
        $powerKwhConcumption = ($request->powerKwhConsumption && $request->powerKwhConsumption!= '') ?: 0;

        $participation = ParticipantProject::create([
            'contact_id' => $contact->id,
            'project_id' => $project->id,
            'type_id' => $payoutTypeId,
            'did_accept_agreement' => (bool)$request->didAgreeTerms,
            'date_did_accept_agreement' => $today,
            'did_understand_info' => (bool)$request->didUnderstandInfo,
            'date_did_understand_info'  => $today,
            'power_kwh_consumption' => $powerKwhConcumption,
        ]);

        // vanuit portal standaard altijd status 'interest'
        $status = ParticipantMutationStatus::where('code_ref', 'interest')->first();

        $dateInterest = null;
        $amountInterest = 0;
        $quantityInterest = 0;
        $dateOption = null;
        $amountOption = 0;
        $quantityOption = 0;
        $dateGranted = null;
        $amountGranted = 0;
        $quantityGranted = 0;
        $dateFinal = null;
        $amountFinal = 0;
        $quantityFinal = 0;
        $participationMutationDate = $today ?: null;
        $participationMutationAmount = $request->amountInteressed ?: null;
        $participationMutationQuantity = $request->participationsInteressed ?: null;


        switch($status->code_ref){
            case 'interest' :
                $dateInterest = $participationMutationDate;
                $amountInterest = $participationMutationAmount;
                $quantityInterest = $participationMutationQuantity;
                break;
        }

        $participantMutation = ParticipantMutation::create([
            'participation_id' => $participation->id,
            'type_id' => ParticipantMutationType::where('project_type_id', $project->project_type_id)->where('code_ref', 'first_deposit')->value('id'),
            'status_id' => $status->id,
            'amount' => $participationMutationAmount,
            'quantity' => $participationMutationQuantity,
            'date_interest' => $dateInterest,
            'amount_interest' => $amountInterest,
            'quantity_interest' => $quantityInterest,
            'date_option' => $dateOption,
            'amount_option' => $amountOption,
            'quantity_option' => $quantityOption,
            'date_granted' => $dateGranted,
            'amount_granted' => $amountGranted,
            'quantity_granted' => $quantityGranted,
            'date_entry' => $dateFinal,
            'amount_final' => $amountFinal,
            'quantity_final' => $quantityFinal,
        ]);

        // Recalculate dependent data in participantProject
        $participantMutation->participation->calculator()->run()->save();

        // Recalculate dependent data in project
        $participantMutation->participation->project->calculator()->run()->save();
    }
}