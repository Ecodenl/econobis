<?php


namespace App\Http\Controllers\Portal\ParticipationProject;


use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Document\Document;
use App\Eco\Document\DocumentCreatedFrom;
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
use App\Helpers\Address\AddressHelper;
use App\Helpers\Delete\Models\DeleteParticipation;
use App\Helpers\Document\DocumentHelper;
use App\Eco\PortalSettings\PortalSettings;
use App\Helpers\Template\TemplateTableHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Api\ContactGroup\ContactGroupController;
use App\Http\Controllers\Api\Document\DocumentController;
use App\Http\Controllers\Controller;
use App\Http\Resources\ParticipantProject\Templates\ParticipantReportMail;
use App\Http\Resources\Portal\ParticipantProject\ParticipantProjectResource;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Config;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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
        $allowedContactOrganisationIds = $portalUser->contact->occupations
            ->where('type_id', 'organisation')
            ->where('allow_manage_in_portal', true)  // Uses the field from occupation_contact
            ->pluck('primary_contact_id')
            ->toArray();
        $allowedContactPersonIds = $portalUser->contact->occupations
            ->where('type_id', 'person')
            ->where('allow_manage_in_portal', true)  // Uses the field from occupation_contact
            ->pluck('primary_contact_id')
            ->toArray();
        $allowedContactIds = array_merge($allowedContactOrganisationIds, $allowedContactPersonIds);

        $authorizedForContact = in_array($participantProject->contact_id, $allowedContactIds);
        if ($portalUser->contact_id != $participantProject->contact_id && !$authorizedForContact) {
            abort(403, 'Verboden');
        }

        $participantProject->allowIncreaseParticipations = false;

        if ($participantProject->project->allow_increase_participations_in_portal
            && $participantProject->project->date_start_registrations <= Carbon::now()->format('Y-m-d')
            && $participantProject->project->date_end_registrations >= Carbon::now()->format('Y-m-d')) {

            if ($participantProject->project->uses_mollie) {
                // Check if any mutation meets the criteria
                $hasUnpaidMutation = $participantProject->mutations()
                    ->whereNull('date_payment')
                    ->get() // Retrieve all mutations
                    ->contains(fn($mutation) => !$mutation->is_paid_by_mollie); // Check dynamically

                // Set project field if no valid mutation is found
                if (!$hasUnpaidMutation) {
                    $participantProject->allowIncreaseParticipations = true;
                }
            } else {
                $participantProject->allowIncreaseParticipations = true;
            }
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
            'documentsOnPortal',
            'createdBy',
            'updatedBy',
        ]);

        return ParticipantProjectResource::make($participantProject);
    }

    public function documentDownload(ParticipantProject $participantProject, Document $document)
    {
        $portalUser = Auth::user();
        if (!Auth::isPortalUser() || !$portalUser->contact) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }
        $allowedContactOrganisationIds = $portalUser->contact->occupations
            ->where('type_id', 'organisation')
            ->where('allow_manage_in_portal', true)  // Uses the field from occupation_contact
            ->pluck('primary_contact_id')
            ->toArray();
        $allowedContactPersonIds = $portalUser->contact->occupations
            ->where('type_id', 'person')
            ->where('allow_manage_in_portal', true)  // Uses the field from occupation_contact
            ->pluck('primary_contact_id')
            ->toArray();
        $allowedContactIds = array_merge($allowedContactOrganisationIds, $allowedContactPersonIds);

        $authorizedForContact = in_array($participantProject->contact_id, $allowedContactIds);
        if ($portalUser->contact_id != $participantProject->contact_id && !$authorizedForContact) {
            abort(403, 'Verboden');
        }

        if ($document->filename) {
            // todo wellicht moeten we hier nog wat op anders verzinnen, voornu gebruiken we responisibleUserId from settings.json, verderop zetten we dat weer terug naar portal user
            $responsibleUserId = PortalSettings::first()?->responsible_user_id;
            if (!$responsibleUserId) {
                abort(501, 'Er is helaas een fout opgetreden (5).');
            }
            Auth::setUser(User::find($responsibleUserId));

            $documentController = new DocumentController();
            return $documentController->download($document);

            // Voor zekerheid hierna weer even Auth user herstellen met portal user
            Auth::setUser($portalUser);
        }
    }

    public function create(Request $request)
    {
        if (!isset($request)
            || !isset($request->registerValues)
            || !isset($request->registerValues['contactId'])
            || !isset($request->registerValues['projectId'])
        ) {
            abort(501, 'Er is helaas een fout opgetreden (1).');
        }
        // ophalen contactgegevens portal user (vertegenwoordiger)
        $portalUser = Auth::user();
        if (!Auth::isPortalUser() || !$portalUser->contact) {
            abort(501, 'Er is helaas een fout opgetreden (2).');
        }
        // ophalen contactgegevens
        $contact = Contact::find($request->registerValues['contactId']);
        if (!$contact) {
            abort(501, 'Er is helaas een fout opgetreden (3).');
        }
        // ophalen projectgegevens
        $project = Project::find($request->registerValues['projectId']);
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
        $responsibleUserId = PortalSettings::first()?->responsible_user_id;
        if (!$responsibleUserId) {
            abort(501, 'Er is helaas een fout opgetreden (5).');
        }

        if($project->check_double_addresses && $contact->addressForPostalCodeCheck) {
            $addressHelper = new AddressHelper($contact, $contact->addressForPostalCodeCheck);
            if ($addressHelper->checkDoubleAddress($project)) {
                abort(412, 'Er is al een deelnemer ingeschreven op dit adres die meedoet aan een SCE project.');
                return false;
            }
        }

        $address = $contact->addressForPostalCodeCheck;

        DB::transaction(function () use ($contact, $address, $project, $request, $portalUser, $responsibleUserId) {
            $participation = $this->createParticipantProject($contact, $address, $project, $request, $portalUser, $responsibleUserId);

            /**
             * Alleen aanmaken bevestigingsformulier en mailen als Mollie is uitgeschakeld, als Mollie
             * is ingeschakeld willen we deze stap pas na de betaling uitvoeren.
             */
            try {
                if(!$project->uses_mollie) {
                    $this->createAndSendRegistrationDocument($contact, $project, $request->registerType, $participation, $responsibleUserId, $this->participationMutation);
                }
            }
            catch(\Exception $e){
                Log::error('Er ging wat fout bij het maken of mailen van bevestigingsformulier. Participation id: ' . $participation->id);
                Log::error($e->getMessage());
            }
        });

        if($this->participationMutation->participation->project->uses_mollie){
            /**
             * Als Mollie voor dit project aan staat dan returnen we die zodat er naar de betaalpagina geredirect kan worden.
             */
            return [
                'econobisPaymentLink' => $this->participationMutation->econobis_payment_link,
            ];
        }
    }

    public function update(Request $request, ParticipantProject $participantProject)
    {
        if (!$participantProject
            || !isset($request)
            || !isset($request->registerType)
            || !isset($request->registerValues)
            || !isset($request->registerValues['contactId'])
            || !isset($request->registerValues['projectId'])
        ) {
            abort(501, 'Er is helaas een fout opgetreden (1).');
        }
        // ophalen contactgegevens portal user (vertegenwoordiger)
        $portalUser = Auth::user();
        if (!Auth::isPortalUser() || !$portalUser->contact) {
            abort(501, 'Er is helaas een fout opgetreden (2).');
        }
        // ophalen contactgegevens
        $contact = Contact::find($request->registerValues['contactId']);
        if (!$contact) {
            abort(501, 'Er is helaas een fout opgetreden (3).');
        }
        // ophalen projectgegevens
        $project = Project::find($request->registerValues['projectId']);
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

        if($project->check_double_addresses && $contact->addressForPostalCodeCheck) {
            $addressHelper = new AddressHelper($contact, $contact->addressForPostalCodeCheck);
            if ($addressHelper->checkDoubleAddress($project)) {
                abort(412, 'Er is al een deelnemer ingeschreven op dit adres die meedoet aan een SCE project.');
                return false;
            }
        }

        $address = $contact->addressForPostalCodeCheck;

        DB::transaction(function () use ($contact, $address, $project, $participantProject, $request, $portalUser, $responsibleUserId) {
             $this->updateParticipantProject($contact, $project, $participantProject, $request, $portalUser, $responsibleUserId);

            /**
             * Alleen aanmaken bevestigingsformulier en mailen als Mollie is uitgeschakeld, als Mollie
             * is ingeschakeld willen we deze stap pas na de betaling uitvoeren.
             */
            try {
                if(!$project->uses_mollie) {
                    $this->createAndSendRegistrationDocument($contact, $project, $request->registerType, $participantProject, $responsibleUserId, $this->participationMutation);
                }
            }
            catch(\Exception $e){
                Log::error('Er ging wat fout bij het maken of mailen van bevestigingsformulier. Participation id: ' . $participantProject->id);
                Log::error($e->getMessage());
            }
        });

        if($this->participationMutation->participation->project->uses_mollie){
            /**
             * Als Mollie voor dit project aan staat dan returnen we die zodat er naar de betaalpagina geredirect kan worden.
             */
            return [
                'econobisPaymentLink' => $this->participationMutation->econobis_payment_link,
            ];
        }

    }
    public function createAndSendRegistrationDocument($contact, $project, $registerType, $participation, $responsibleUserId, ParticipantMutation $participantMutation)
    {
        if($registerType === 'verhogen') {
            $documentTemplateAgreementId = $project ? $project->document_template_increase_participations_id : 0;
            $emailTemplateAgreementId = $project ? $project->email_template_increase_participations_id : 0;
        } else {
            $documentTemplateAgreementId = $project ? $project->document_template_agreement_id : 0;
            $emailTemplateAgreementId = $project ? $project->email_template_agreement_id : 0;
        }

        $documentTemplate = DocumentTemplate::find($documentTemplateAgreementId);

        if(!$documentTemplate)
        {
            $documentBody = '';
        }else{
            $documentBody = DocumentHelper::getDocumentBody($contact, $project, $participation, $documentTemplate, [
                'amountOptioned' => $participantMutation->amount,
                'participationsOptioned' => $participantMutation->quantity,
                'transactionCostsAmount' => $participantMutation->transaction_costs_amount,
            ]);
        }

        $emailTemplate = EmailTemplate::find($emailTemplateAgreementId);
        $pdfContent = PDF::loadView('documents.generic', [
            'html' => $documentBody,
        ])->output();

        $time = Carbon::now();
        $portalUser = Auth::user();

        // todo wellicht moeten we hier nog wat op anders verzinnen, voor nu zetten we responisibleUserId in Auth user tbv observers die create_by en updated_by hiermee vastleggen
        Auth::setUser(User::find($responsibleUserId));

        $documentCreatedFromParticipantId = DocumentCreatedFrom::where('code_ref', 'participant')->first()->id;

        $document = new Document();
        $document->document_created_from_id = $documentCreatedFromParticipantId;
        $document->document_type = 'internal';
        $document->document_group = 'registration';
        $document->show_on_portal = true;
        $document->description = 'Inschrijfformulier project ' . $project->name;
        $document->contact_id = $contact->id;
        $document->project_id = $project->id;
        $document->participation_project_id = $participation->id;
        $document->template_id = $documentTemplate->id;

        $fileName = str_replace(' ', '', $this->translateToValidCharacterSet($project->code)) . '_'
            . str_replace(' ', '', $this->translateToValidCharacterSet($contact->full_name));
        //max length name 25
        $fileName = substr($fileName, 0, 25);
        $fileName = $fileName
            . substr($document->getDocumentGroup()->name, 0, 1)
            . (Document::where('document_group', 'registration')->count()
                + 1) . '_' . $time->format('Ymd') . '.pdf';

        $document->filename = $fileName;
        $document->save();

        $uniqueName = Str::uuid() . '.pdf';
        $filePathAndName = "{$document->document_group}/" .
            Carbon::parse($document->created_at)->year .
            "/{$uniqueName}";
        Storage::disk('documents')->put($filePathAndName, $pdfContent);

        $document->file_path_and_name = $filePathAndName;
        $document->alfresco_node_id = null;
        $document->save();

        // todo wellicht moeten we hier nog wat op anders verzinnen, voor nu hebben we responisibleUserId from settings.json tijdelijk in Auth user gezet hierboven
        // Voor zekerheid hierna weer even Auth user herstellen met portal user
        Auth::setUser($portalUser);

        $primaryEmailAddress = $contact->primaryEmailAddress;

        //send email
        if ($primaryEmailAddress) {
            $mailbox = $this->getMailboxByDistribution($project);
            if ($mailbox) {
                $fromEmail = $mailbox->email;
                $fromName = $mailbox->name;
            } else {
                $fromEmail = Config::get('mail.from.address');
                $fromName = Config::get('mail.from.name');
            }

            $portalUserContact = $portalUser ? $portalUser->contact : null;

            $email = Mail::fromMailbox($mailbox)
                ->to($primaryEmailAddress->email);

            if($emailTemplate && !empty($emailTemplate->subject) )
            {
                $subject = $emailTemplate->subject;
                $portalName = PortalSettings::first()?->portal_name;
                $cooperativeName = PortalSettings::first()?->cooperative_name;
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
                $amountOptioned =  $participantMutation->amount ? number_format($participantMutation->amount, 2, ',', '') : 0;
            }else{
                $participationsOptioned =  $participantMutation->quantity ? $participantMutation->quantity : 0;
                $amountOptioned =  ( $participantMutation->quantity && $project->currentBookWorth() ) ? number_format( ( $participantMutation->quantity * $project->currentBookWorth() ), 2, ',', '') : 0;
            }
            $transactionCostsAmount =  $participantMutation->transaction_costs_amount ? number_format($participantMutation->transaction_costs_amount, 2, ',', '') : 0;

            $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body, $contact);
            $htmlBodyWithContactVariables = str_replace('{deelname_aantal_ingeschreven}', $participationsOptioned, $htmlBodyWithContactVariables);
            $htmlBodyWithContactVariables = str_replace('{deelname_bedrag_ingeschreven}', $amountOptioned, $htmlBodyWithContactVariables);
            $htmlBodyWithContactVariables = str_replace('{deelname_transactiekosten_laatste_mutatie}', $transactionCostsAmount, $htmlBodyWithContactVariables);
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
            $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'deelname', $participation);
            $htmlBodyWithContactVariables = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);

//            $subject = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $subject);
//            $htmlBodyWithContactVariables = str_replace('{contactpersoon}', $contactInfo['contactPerson'],
//                $htmlBodyWithContactVariables);

            $email->send(new ParticipantReportMail($email, $fromEmail, $fromName,
                $htmlBodyWithContactVariables, $document, $emailTemplate->default_attachment_document_id));
        }

    }

    protected function getMailboxByDistribution(Project $project)
    {
        // Standaard vanuit primaire mailbox mailen
        $mailboxToSendFrom = Mailbox::getDefault();

        // Als er een mailbox aan de administratie is gekoppeld, dan deze gebrfsubjuiken
        if ($project->administration && $project->administration->mailbox) {
            $mailboxToSendFrom = $project->administration->mailbox;
        }

        return $mailboxToSendFrom;
    }
    protected function translateToValidCharacterSet($field){

        $fieldUtf8Decoded = mb_convert_encoding($field, 'ISO-8859-1', 'UTF-8');
        $replaceFrom = mb_convert_encoding('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ', 'ISO-8859-1', 'UTF-8');
        $replaceTo = mb_convert_encoding('AAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy', 'ISO-8859-1', 'UTF-8');
        $field = strtr( $fieldUtf8Decoded, $replaceFrom, $replaceTo );
        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);

        return $field;
    }

    protected function createParticipantProject($contact, $address, $project, $request, $portalUser, $responsibleUserId)
    {
        // todo wellicht moeten we hier nog wat op anders verzinnen, voor nu zetten we responisibleUserId in Auth user tbv observers die create_by en updated_by hiermee vastleggen
        $responsibleUser = User::find($responsibleUserId);
        $responsibleUser->occupation = '@portal-update@';
        Auth::setUser($responsibleUser);

        $today = Carbon::now();
        $projectTypeCodeRef = $project->projectType->code_ref;

        $participantMutationTypeId = ParticipantMutationType::where('project_type_id', $project->project_type_id)->where('code_ref','first_deposit')->value('id');

        $payoutTypeId = null;
        switch ($projectTypeCodeRef) {
            // default Betaalwijze Op rekening indien lening of obligatie
            case 'loan' :
            case 'obligation' :
                $payoutTypeId = ParticipantProjectPayoutType::where('code_ref', 'account')->value('id');
                break;
        }

        $powerKwhConsumption = data_get($request->registerValues, 'pcrYearlyPowerKwhConsumption', 0);
        $participation = ParticipantProject::create([
            'created_with' => 'portal',
            'contact_id' => $contact->id,
            'address_id' => $address->id,
            'project_id' => $project->id,
            'type_id' => $payoutTypeId,
            'did_accept_agreement' => (bool)data_get($request->registerValues, 'didAcceptAgreement', null),
            'date_did_accept_agreement' => $today,
            'did_understand_info' => (bool)data_get($request->registerValues, 'didUnderstandInfo', null),
            'date_did_understand_info' => $today,
            'choice_membership' => (bool)data_get($request->registerValues, 'choiceMembership', null),
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
                $participationMutationAmount = data_get($request->registerValues, 'amountOptioned', null);
                $participationMutationQuantity = data_get($request->registerValues, 'participationsOptioned', null);
                $participationMutationTransactionCostsAmount = data_get($request->registerValues, 'transactionCostsAmount', null);
                $dateOption = $participationMutationDate;
                $amountOption = $participationMutationAmount;
                $quantityOption = $participationMutationQuantity;
                break;
        }

        $participantMutation = ParticipantMutation::create([
            'participation_id' => $participation->id,
            'created_with' => 'portal',
            'type_id' => $participantMutationTypeId,
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
            'register_type' => $request->registerType ?? null,
        ]);

        // Recalculate dependent data in participantProject
        $participantMutation->participation->calculator()->run()->save();

        // Recalculate dependent data in project
        $participantMutation->participation->project->calculator()->run()->save();

        /**
         * Alleen koppelen aan juiste contactgroup als Mollie is uitgeschakeld, als Mollie
         * is ingeschakeld willen we koppelen pas na de betaling uitvoeren.
         */
        if(!$project->uses_mollie) {
            $contactGroupController = new ContactGroupController();
            // indien gekozen voor member of no_member, maak koppeling met juiste contactgroup.
            switch ($participation->choice_membership) {
                case 1:
                    // koppel aan member_group_id
                    $contactGroupMember = ContactGroup::find($project->member_group_id);
                    $contactGroupPivotExists = $contact->groups()->where('id', $project->member_group_id)->exists();
                    if ($contactGroupMember && !$contactGroupPivotExists) {
                        $contactGroupController->addContact($contactGroupMember, $contact);
                    }
                    break;
                case 2:
                    // koppel aan no_member_group_id
                    $contactGroupNoMember = ContactGroup::find($project->no_member_group_id);
                    $contactGroupPivotExists = $contact->groups()->where('id', $project->no_member_group_id)->exists();
                    if ($contactGroupNoMember && !$contactGroupPivotExists) {
                        $contactGroupController->addContact($contactGroupNoMember, $contact);
                    }
                    break;
                default:
                    // no action
                    break;
            }
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

    protected function updateParticipantProject($contact, $project, $participantProject, $request, $portalUser, $responsibleUserId)
    {
        // todo wellicht moeten we hier nog wat op anders verzinnen, voor nu zetten we responisibleUserId in Auth user tbv observers die create_by en updated_by hiermee vastleggen
        $responsibleUser = User::find($responsibleUserId);
        $responsibleUser->occupation = '@portal-update@';
        Auth::setUser($responsibleUser);

        $today = Carbon::now();
        $projectTypeCodeRef = $project->projectType->code_ref;
        $participantMutationTypeCodeRef =  $projectTypeCodeRef === 'loan' ? 'deposit' : 'first_deposit';
        $participantMutationTypeId = ParticipantMutationType::where('project_type_id', $project->project_type_id)->where('code_ref', $participantMutationTypeCodeRef)->value('id');

        $powerKwhConsumption = data_get($request->registerValues, 'pcrYearlyPowerKwhConsumption', 0);
        $participantProject->power_kwh_consumption = $powerKwhConsumption;
        $participantProject->save();

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
                $participationMutationAmount = data_get($request->registerValues, 'amountOptioned', null);
                $participationMutationQuantity = data_get($request->registerValues, 'participationsOptioned', null);
                $participationMutationTransactionCostsAmount = data_get($request->registerValues, 'transactionCostsAmount', null);
                $dateOption = $participationMutationDate;
                $amountOption = $participationMutationAmount;
                $quantityOption = $participationMutationQuantity;
                break;
        }

        $participantMutation = ParticipantMutation::create([
            'participation_id' => $participantProject->id,
            'created_with' => 'portal',
            'type_id' => $participantMutationTypeId,
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
            'register_type' => $request->registerType ?? null,
        ]);

        // Recalculate dependent data in participantProject
        $participantMutation->participation->calculator()->run()->save();

        // Recalculate dependent data in project
        $participantMutation->participation->project->calculator()->run()->save();

        /**
         * Alleen koppelen aan juiste contactgroup als Mollie is uitgeschakeld, als Mollie
         * is ingeschakeld willen we koppelen pas na de betaling uitvoeren.
         */
        if(!$project->uses_mollie) {
            $contactGroupController = new ContactGroupController();
            // indien gekozen voor member of no_member, maak koppeling met juiste contactgroup.
            switch ($participantProject->choice_membership) {
                case 1:
                    // koppel aan member_group_id
                    $contactGroupMember = ContactGroup::find($project->member_group_id);
                    $contactGroupPivotExists = $contact->groups()->where('id', $project->member_group_id)->exists();
                    if ($contactGroupMember && !$contactGroupPivotExists) {
                        $contactGroupController->addContact($contactGroupMember, $contact);
                    }
                    break;
                case 2:
                    // koppel aan no_member_group_id
                    $contactGroupNoMember = ContactGroup::find($project->no_member_group_id);
                    $contactGroupPivotExists = $contact->groups()->where('id', $project->no_member_group_id)->exists();
                    if ($contactGroupNoMember && !$contactGroupPivotExists) {
                        $contactGroupController->addContact($contactGroupNoMember, $contact);
                    }
                    break;
                default:
                    // no action
                    break;
            }
        }

        /**
         * Deze maar even in dit object opslaan zodat we hem makkelijk weer kunnen oproepen vanuit de create() functie.
         */
        $this->participationMutation = $participantMutation;

        // todo wellicht moeten we hier nog wat op anders verzinnen, voor nu hebben we responisibleUserId from settings.json tijdelijk in Auth user gezet hierboven
        // Voor zekerheid hierna weer even Auth user herstellen met portal user
        Auth::setUser($portalUser);
    }

    protected function deleteParticipantProject($previousMutation): void
    {
        foreach ($previousMutation->statusLog as $statusLog) {
            $statusLog->delete();
        }
        foreach ($previousMutation->molliePayments as $molliePayment) {
            $molliePayment->delete();
        }
        $previousMutation->delete();

        $result = (new DeleteParticipation($previousMutation->participation))->delete();

        if (count($result) > 0) {
            abort(412, implode(";", array_unique($result)));
        }
    }
}