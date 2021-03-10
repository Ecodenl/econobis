<?php


namespace App\Http\Controllers\Portal\ParticipationProject;


use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Document\Document;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Occupation\OccupationContact;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\ParticipantProject\ParticipantProjectPayoutType;
use App\Eco\Project\Project;
use App\Eco\User\User;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Helpers\Document\DocumentHelper;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Template\TemplateTableHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Api\ContactGroup\ContactGroupController;
use App\Http\Controllers\Controller;
use App\Http\Resources\ParticipantProject\Templates\ParticipantReportMail;
use App\Http\Resources\Portal\ParticipantProject\ParticipantProjectResource;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
use Config;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ParticipationProjectController extends Controller
{
    /**
     * @var $participationMutation ParticipantMutation
     */
    private $participationMutation;

    public function show(ParticipantProject $participantProject)
    {
        // ophalen contactgegevens portal user
        $portalUser = Auth::user();
        if (!Auth::isPortalUser() || !$portalUser->contact) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }
        $allowedContactOrganisationIds = $portalUser->contact->occupations->where('type_id', 'organisation')->where('primary', true)->pluck('primary_contact_id')->toArray();
        $allowedContactPersonIds = $portalUser->contact->occupations->where('type_id', 'person')->where('occupation_for_portal', true)->pluck('primary_contact_id')->toArray();
        $allowedContactIds = array_merge($allowedContactOrganisationIds, $allowedContactPersonIds);

        $authorizedForContact = in_array($participantProject->contact_id, $allowedContactIds);
        if ($portalUser->contact_id != $participantProject->contact_id && !$authorizedForContact) {
            abort(403, 'Verboden');
        }

        $participantProject->load([
            'contact',
            'project.projectType',
            'project.administration',
            'project.projectValueCourses',
            'participantProjectPayoutType',
            'mutationsForPortal.type',
            'mutationsForPortal.status',
            'mutationsForPortal.statusLog',
            'mutationsForPortal.createdBy',
            'mutationsForPortal.updatedBy',
            'obligationNumbers',
            'documents',
            'createdBy',
            'updatedBy',
        ]);

        return ParticipantProjectResource::make($participantProject);
    }

    public function create(Request $request)
    {
        if (!isset($request) || !isset($request->contactId)) {
            abort(501, 'Er is helaas een fout opgetreden (1).');
        }
        // ophalen contactgegevens portal user (vertegenwoordiger)
        $portalUser = Auth::user();
        if (!Auth::isPortalUser() || !$portalUser->contact) {
            abort(501, 'Er is helaas een fout opgetreden (2).');
        }
        // ophalen contactgegevens
        $contact = Contact::find($request->contactId);
        if (!$contact) {
            abort(501, 'Er is helaas een fout opgetreden (3).');
        }
        // ophalen projectgegevens
        $project = Project::find($request->projectId);
        if (!$project) {
            abort(501, 'Er is helaas een fout opgetreden (4).');
        }
        // project moet nog openstaan voor inschrijving
        if ($project->date_start_registrations > Carbon::now()->format('Y-m-d')) {
            abort(501, 'Project is nog niet open voor inschrijving.');
        }
        // project moet nog openstaan voor inschrijving
        if ($project->date_end_registrations < Carbon::now()->format('Y-m-d')) {
            abort(501, 'Project is gesloten voor inschrijving.');
        }

        // Voor aanmaak van Participant Mutations wordt created by and updated by via ParticipantMutationObserver altijd bepaald obv Auth::id
        // todo wellicht moeten we hier nog wat op anders verzinnen, voornu gebruiken we responisibleUserId from settings.json, verderop zetten we dat weer terug naar portal user
        $responsibleUserId = PortalSettings::get('responsibleUserId');
        if (!$responsibleUserId) {
            abort(501, 'Er is helaas een fout opgetreden (5).');
        }

        DB::transaction(function () use ($contact, $project, $request, $portalUser, $responsibleUserId) {
            $participation = $this->createParticipantProject($contact, $project, $request, $portalUser, $responsibleUserId);
            $this->createAndSendRegistrationDocument($contact, $project, $participation, $responsibleUserId, $request);
        });

        if($this->participationMutation->participation->project->administration->uses_mollie){
            /**
             * Als Mollie voor dit project aan staat dan returnen we die zodat er naar de betaalpagina geredirect kan worden.
             */
            return [
                'econobisPaymentLink' => $this->participationMutation->econobis_payment_link,
            ];
        }
    }

    protected function createAndSendRegistrationDocument($contact, $project, $participation, $responsibleUserId, $request)
    {
        $documentTemplateAgreementId = $project ? $project->document_template_agreement_id : 0;
        $documentTemplate = DocumentTemplate::find($documentTemplateAgreementId);

        if(!$documentTemplate)
        {
            $documentBody = '';
        }else{
            $documentBody = DocumentHelper::getDocumentBody($contact, $project, $documentTemplate, $request);
        }

        $emailTemplateAgreementId = $project ? $project->email_template_agreement_id : 0;

        $emailTemplate = EmailTemplate::find($emailTemplateAgreementId);
        $pdf = PDF::loadView('documents.generic', [
            'html' => $documentBody,
        ])->output();

        $time = Carbon::now();
        $portalUser = Auth::user();

        // todo wellicht moeten we hier nog wat op anders verzinnen, voor nu zetten we responisibleUserId in Auth user tbv observers die create_by en updated_by hiermee vastleggen
        Auth::setUser(User::find($responsibleUserId));

        $document = new Document();
        $document->document_type = 'internal';
        $document->document_group = 'registration';
        $document->contact_id = $contact->id;
        $document->project_id = $project->id;
        $document->participation_project_id = $participation->id;
        $document->template_id = $documentTemplate->id;

        $filename = str_replace(' ', '', $this->translateToValidCharacterSet($project->code)) . '_'
            . str_replace(' ', '', $this->translateToValidCharacterSet($contact->full_name));

        //max length name 25
        $filename = substr($filename, 0, 25);

        $document->filename = $filename
            . substr($document->getDocumentGroup()->name, 0, 1)
            . (Document::where('document_group', 'registration')->count()
                + 1) . '_' . $time->format('Ymd') . '.pdf';
        $document->save();

        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR
            . 'documents/' . $document->filename));
        file_put_contents($filePath, $pdf);

        if(Config::get('app.ALFRESCO_COOP_USERNAME') != 'local') {
            $alfrescoHelper = new AlfrescoHelper(Config::get('app.ALFRESCO_COOP_USERNAME'),
                Config::get('app.ALFRESCO_COOP_PASSWORD'));

            $alfrescoResponse = $alfrescoHelper->createFile($filePath,
                $document->filename, $document->getDocumentGroup()->name);
            $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
            $document->save();
        }

        // todo wellicht moeten we hier nog wat op anders verzinnen, voor nu hebben we responisibleUserId from settings.json tijdelijk in Auth user gezet hierboven
        // Voor zekerheid hierna weer even Auth user herstellen met portal user
        Auth::setUser($portalUser);

        $primaryEmailAddress = $contact->primaryEmailAddress;

        //send email
        if ($primaryEmailAddress) {
            $mailbox = $this->setMailConfigByDistribution($project);
            if ($mailbox) {
                $fromEmail = $mailbox->email;
                $fromName = $mailbox->name;
            } else {
                $fromEmail = Config::get('mail.from.address');
                $fromName = Config::get('mail.from.name');
            }

            $portalUserContact = $portalUser ? $portalUser->contact : null;

            $email = Mail::to($primaryEmailAddress->email);
            if($emailTemplate && !empty($emailTemplate->subject) )
            {
                $subject = $emailTemplate->subject;
                $portalName = PortalSettings::get('portalName');
                $cooperativeName = PortalSettings::get('cooperativeName');
                $subject = str_replace('{cooperatie_portal_naam}', $portalName, $subject);
                $subject = str_replace('{cooperatie_naam}', $cooperativeName, $subject);
                $subject = str_replace('{contactpersoon}', $contact->full_name, $subject);
            }else{
                $subject = 'Bevestiging inschrijving';
            }

            $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'project', $project);

            $email->subject = $subject;
            $emailTemplateBody = $emailTemplate ? $emailTemplate->html_body : '';

            $email->html_body
                = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
                . $subject . '</title></head>'
                . $emailTemplateBody . '</html>';

            $projectTypeCodeRef = $project->projectType->code_ref;

            if($projectTypeCodeRef == 'loan'){
                $participationsOptioned =  0;
                $amountOptioned =  $request['amountOptioned'] ? number_format($request['amountOptioned'], 2, ',', '') : 0;
            }else{
                $participationsOptioned =  $request['participationsOptioned'] ? $request['participationsOptioned'] : 0;
                $amountOptioned =  ( $request['participationsOptioned'] && $project->currentBookWorth() ) ? number_format( ( $request['participationsOptioned'] * $project->currentBookWorth() ), 2, ',', '') : 0;
            }

            $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body, $contact);
            $htmlBodyWithContactVariables = str_replace('{deelname_aantal_ingeschreven}', $participationsOptioned, $htmlBodyWithContactVariables);
            $htmlBodyWithContactVariables = str_replace('{deelname_bedrag_ingeschreven}', $amountOptioned, $htmlBodyWithContactVariables);
            $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'contact', $contact);
            $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBodyWithContactVariables,'portal' );
            $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBodyWithContactVariables,'contacten_portal' );
            $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateCooperativeVariables($htmlBodyWithContactVariables,'cooperatie' );

            //wettelijk vertegenwoordiger
            if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
                $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)
                    ->where('occupation_id', 7)->first()->primaryContact;
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'wettelijk_vertegenwoordiger', $wettelijkVertegenwoordiger);
            }

            $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'vertegenwoordigde', $portalUserContact);
            $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'administratie', $project->administration);
            $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'project', $project);
            $htmlBodyWithContactVariables = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);

//            $subject = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $subject);
//            $htmlBodyWithContactVariables = str_replace('{contactpersoon}', $contactInfo['contactPerson'],
//                $htmlBodyWithContactVariables);


            $email->send(new ParticipantReportMail($email, $fromEmail, $fromName,
                $htmlBodyWithContactVariables, $document));
        }

        //delete file on server, still saved on alfresco.
        if(Config::get('app.ALFRESCO_COOP_USERNAME') != 'local') {
            Storage::disk('documents')->delete($document->filename);
        }

    }

    protected function setMailConfigByDistribution(Project $project)
    {
        // Standaard vanuit primaire mailbox mailen
        $mailboxToSendFrom = Mailbox::getDefault();

        // Als er een mailbox aan de administratie is gekoppeld, dan deze gebrfsubjuiken
        if ($project->administration && $project->administration->mailbox) {
            $mailboxToSendFrom = $project->administration->mailbox;
        }

        // Configuratie instellen als er een mailbox is gevonden
        if ($mailboxToSendFrom) {
            (new EmailHelper())->setConfigToMailbox($mailboxToSendFrom);
        }
        return $mailboxToSendFrom;
    }
    protected function translateToValidCharacterSet($field){

        $field = iconv('UTF-8', 'ASCII//TRANSLIT', $field);
        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);

        return $field;
    }

    protected function createParticipantProject($contact, $project, $request, $portalUser, $responsibleUserId)
    {
        // todo wellicht moeten we hier nog wat op anders verzinnen, voor nu zetten we responisibleUserId in Auth user tbv observers die create_by en updated_by hiermee vastleggen
        Auth::setUser(User::find($responsibleUserId));

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
        $powerKwhConsumption = ($request->pcrYearlyPowerKwhConsumption && $request->pcrYearlyPowerKwhConsumption!= '') ? $request->pcrYearlyPowerKwhConsumption : 0;
        $participation = ParticipantProject::create([
            'contact_id' => $contact->id,
            'project_id' => $project->id,
            'type_id' => $payoutTypeId,
            'did_accept_agreement' => (bool)$request->didAcceptAgreement,
            'date_did_accept_agreement' => $today,
            'did_understand_info' => (bool)$request->didUnderstandInfo,
            'date_did_understand_info'  => $today,
            'choice_membership' => $request->choiceMembership,
            'power_kwh_consumption' => $powerKwhConsumption,
        ]);

        // vanuit portal standaard altijd status 'option'
        $status = ParticipantMutationStatus::where('code_ref', 'option')->first();

        $dateInterest = null;
        $amountInterest = null;
        $quantityInterest = null;
        $dateOption = null;
        $amountOption = null;
        $quantityOption = null;
        $dateGranted = null;
        $amountGranted = null;
        $quantityGranted = null;
        $dateFinal = null;
        $amountFinal = null;
        $quantityFinal = null;
        $participationMutationDate = null;
        $participationMutationAmount = null;
        $participationMutationQuantity = null;
        $participationMutationTransactionCostsAmount = null;

        switch($status->code_ref){
            case 'option' :
                $participationMutationDate = $today ?: null;
                $participationMutationAmount = $request->amountOptioned ?: null;
                $participationMutationQuantity = $request->participationsOptioned ?: null;
                $participationMutationTransactionCostsAmount = $request->transactionCostsAmount ?: null;
                $dateOption = $participationMutationDate;
                $amountOption = $participationMutationAmount;
                $quantityOption = $participationMutationQuantity;
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
            'transaction_costs_amount' => $participationMutationTransactionCostsAmount,
        ]);

        // Recalculate dependent data in participantProject
        $participantMutation->participation->calculator()->run()->save();

        // Recalculate dependent data in project
        $participantMutation->participation->project->calculator()->run()->save();

        $contactGroupController = new ContactGroupController();
        // indien gekozen voor member of no_member, maak koppeling met juiste contactgroup.
        switch ($participation->choice_membership) {
            case 1:
                // koppel aan member_group_id
                $contactGroupMember = ContactGroup::find($project->member_group_id);
                $contactGroupPivotExists = $contact->groups()->where('id', $project->member_group_id)->exists();
                if($contactGroupMember && !$contactGroupPivotExists){
                    $contactGroupController->addContact($contactGroupMember, $contact);
                }
                break;
            case 2:
                // koppel aan no_member_group_id
                $contactGroupNoMember = ContactGroup::find($project->no_member_group_id);
                $contactGroupPivotExists = $contact->groups()->where('id', $project->no_member_group_id)->exists();
                if($contactGroupNoMember && !$contactGroupPivotExists){
                    $contactGroupController->addContact($contactGroupNoMember, $contact);
                }
                break;
            default:
                // no action
                break;
        }

        /**
         * Deze maar even in dit object opslaan zodat we hem makkelijk weer kunnen oproepen vanuit de create() functie.
         */
        $this->participationMutation = $participantMutation;

        // todo wellicht moeten we hier nog wat op anders verzinnen, voor nu hebben we responisibleUserId from settings.json tijdelijk in Auth user gezet hierboven
        // Voor zekerheid hierna weer even Auth user herstellen met portal user
        Auth::setUser($portalUser);

        return $participation;
    }
}