<?php


namespace App\Http\Controllers\Portal\Contact;


use App\Eco\Address\Address;
use App\Eco\Address\AddressType;
use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactType;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EmailAddress\EmailAddressType;
use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\EnergySupplier\EnergySupplierType;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\FreeFields\FreeFieldsField;
use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\PhoneNumber\PhoneNumberType;
use App\Eco\PortalFreeFields\PortalFreeFieldsPage;
use App\Eco\Project\Project;
use App\Eco\Project\ProjectStatus;
use App\Eco\Project\ProjectType;
use App\Eco\Task\Task;
use App\Eco\Task\TaskType;
use App\Eco\User\User;
use App\Helpers\Address\AddressHelper;
use App\Helpers\ContactGroup\ContactGroupHelper;
use App\Helpers\Document\DocumentHelper;
use App\Helpers\Laposta\LapostaMemberHelper;
use App\Helpers\Project\RevenuesKwhHelper;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Template\TemplateVariableHelper;
use App\Helpers\Workflow\TaskWorkflowHelper;
use App\Http\Controllers\Api\AddressEnergySupplier\AddressEnergySupplierController;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\FreeFields\FreeFieldsFieldRecordController;
use App\Http\Controllers\Api\PortalFreeFields\PortalFreeFieldsFieldRecordController;
use App\Http\Resources\Portal\Administration\AdministrationResource;
use App\Http\Resources\Portal\Documents\FinancialOverviewDocumentResource;
use App\Http\Resources\Project\ProjectRegister;
use App\Rules\EnumExists;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ContactController extends ApiController
{
    public function update(Contact $contactOrgineel, Request $request)
    {
        if (!isset($request) || !isset($request->id) || !isset($request->typeId)) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }
        // todo wellicht met binnenkomend contactOrigineel checken of contact ondertussen gewijzigd is?

        // ophalen contactgegevens portal user (vertegenwoordiger)
        $portalUser = Auth::user();
        if (!Auth::isPortalUser() || !$portalUser->contact) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }

        // Voor aanmaak van contact gegevens wordt created by and updated by via ContactObserver altijd bepaald obv Auth::id
        // todo wellicht moeten we hier nog wat op anders verzinnen, voornu gebruiken we responisibleUserId from settings.json, verderop zetten we dat weer terug naar portal user
        $responsibleUserId = PortalSettings::get('responsibleUserId');
        if (!$responsibleUserId) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }

        $updateUser = User::find($responsibleUserId);
        $updateUser->occupation = '@portal-update@';
        Auth::setUser($updateUser);

        DB::transaction(function () use ($request, $portalUser) {

            $contact = Contact::find($request->id);
            $ibanOld = $contact->iban;
            $ibanAttnOld = $contact->iban_attn;

            $contactData = $request->validate([
                'iban' => '',
                'ibanAttn' => '',
                'didAgreeAvg' => 'boolean',
            ]);

            $contact->fill($this->arrayKeysToSnakeCase($contactData));
            $contact->save();

            if($ibanOld != $contact->iban || $ibanAttnOld != $contact->iban_attn)
            {
                $this->createTaskIbanChange($contact, $ibanOld, $ibanAttnOld);
            }

            // PERSON
            if ($request->typeId == ContactType::PERSON) {

                $this->updatePerson($contact, $request);
                $this->updateEmailCorrespondence($contact, $request);
                $this->updateEmailInvoice($contact, $request);
                $this->updatePhoneNumberPrimary($contact, $request);
                $this->updatePhoneNumberTwo($contact, $request);
                if (isset($request['primaryAddress'])) {
                    $currentAddressEnergySupplierElectricity = isset($request['primaryAddress']['currentAddressEnergySupplierElectricity']) ? $request['primaryAddress']['currentAddressEnergySupplierElectricity'] : null;
                    $this->updateAddress(ContactType::PERSON, $contact, $request['primaryAddress'], $currentAddressEnergySupplierElectricity, 'visit', $request->projectId);
                }
                if (isset($request['freeFieldsFieldRecords'])) {
                    $this->updateFreeFieldsContact($contact, $request['freeFieldsFieldRecords'], $portalUser);
                }
            }

            // ORGANISATION
            if ($request->typeId == ContactType::ORGANISATION) {

                $this->updateOrganisation($contact, $request);
                $this->updateEmailCorrespondence($contact, $request);
                $this->updateEmailInvoice($contact, $request);
                $this->updatePhoneNumberPrimary($contact, $request);
                $this->updatePhoneNumberTwo($contact, $request);
                if (isset($request['visitAddress'])) {
                    $currentAddressEnergySupplierElectricity = isset($request['visitAddress']['currentAddressEnergySupplierElectricity']) ? $request['visitAddress']['currentAddressEnergySupplierElectricity'] : null;
                    $this->updateAddress(ContactType::ORGANISATION, $contact, $request['visitAddress'], $currentAddressEnergySupplierElectricity, 'visit', $request->projectId);
                }
                if (isset($request['postalAddress'])) {
                    $this->updateAddress(ContactType::ORGANISATION, $contact, $request['postalAddress'], null, 'postal', null);
                }
                if (isset($request['invoiceAddress'])) {
                    $this->updateAddress(ContactType::ORGANISATION, $contact, $request['invoiceAddress'], null, 'invoice', null);
                }
                if (isset($request['freeFieldsFieldRecords'])) {
                    $this->updateFreeFieldsContact($contact, $request['freeFieldsFieldRecords'], $portalUser);
                }
            }

        });

        // todo wellicht moeten we hier nog wat op anders verzinnen, voor nu hebben we responisibleUserId from settings.json tijdelijk in Auth user gezet hierboven
        // Voor zekerheid hierna weer even Auth user herstellen met portal user
        Auth::setUser($portalUser);

    }

    public function updatePortalFreeFieldsPageValues(Contact $contact, Request $request)
    {
        if (!isset($request) || !isset($request->id)) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }

        // ophalen contactgegevens portal user (vertegenwoordiger)
        $portalUser = Auth::user();
        if (!Auth::isPortalUser() || !$portalUser->contact) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }

        // Voor aanmaak van contact gegevens wordt created by and updated by via ContactObserver altijd bepaald obv Auth::id
        // todo wellicht moeten we hier nog wat op anders verzinnen, voornu gebruiken we responisibleUserId from settings.json, verderop zetten we dat weer terug naar portal user
        $responsibleUserId = PortalSettings::get('responsibleUserId');
        if (!$responsibleUserId) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }

        $updateUser = User::find($responsibleUserId);
        $updateUser->occupation = '@portal-update@';
        Auth::setUser($updateUser);

        DB::transaction(function () use ($contact, $request, $portalUser) {

            $contact = Contact::find($contact->id);
            $this->updateFreeFieldsContact($contact, $request['freeFieldsFieldRecords'], $portalUser);

        });

        // todo wellicht moeten we hier nog wat op anders verzinnen, voor nu hebben we responisibleUserId from settings.json tijdelijk in Auth user gezet hierboven
        // Voor zekerheid hierna weer even Auth user herstellen met portal user
        Auth::setUser($portalUser);

    }

    public function previewDocument(Contact $contact, Project $project, Request $request)
    {
        $documentTemplateAgreementId = $project ? $project->document_template_agreement_id : 0;
        $documentTemplate = DocumentTemplate::find($documentTemplateAgreementId);

        if(!$documentTemplate)
        {
            $documentBody = '';
        }else{
            $documentBody = DocumentHelper::getDocumentBody($contact, $project, null, $documentTemplate, [
                'amountOptioned' => data_get($request->registerValues, 'amountOptioned', 0),
                'participationsOptioned' => data_get($request->registerValues, 'participationsOptioned', 0),
                'transactionCostsAmount' => data_get($request->registerValues, 'transactionCostsAmount', 0),
            ]);
        }
        return $documentBody;
    }
    public function previewIncreaseDocument(Contact $contact, Project $project, ParticipantProject $participantProject, Request $request)
    {
        $documentTemplateAgreementId = $project ? $project->document_template_increase_participations_id : 0;
        $documentTemplate = DocumentTemplate::find($documentTemplateAgreementId);

        if(!$documentTemplate)
        {
            $documentBody = '';
        }else{
            $documentBody = DocumentHelper::getDocumentBody($contact, $project, $participantProject, $documentTemplate, [
                'amountOptioned' => data_get($request->registerValues, 'amountOptioned', 0),
                'participationsOptioned' => data_get($request->registerValues, 'participationsOptioned', 0),
                'transactionCostsAmount' => data_get($request->registerValues, 'transactionCostsAmount', 0),
            ]);
        }
        return $documentBody;
    }

    public function getContactFreeFields(Contact $contact)
    {
        $freeFieldsFieldRecordController = new FreeFieldsFieldRecordController();
        return $freeFieldsFieldRecordController->getValuesForPortal('contacts', $contact->id,);
    }
    public function getContactPortalFreeFields(Contact $contact, Request $request)
    {
        $urlPageRef = $request->get('urlPageRef');

        // Page must be active
        $portalFreeFieldsPage = PortalFreeFieldsPage::where('url_page_ref', $urlPageRef)->where('is_active', true)->first();
        if (!$portalFreeFieldsPage) {
            abort(403, 'Geen toegang tot deze pagina.');
        }

        $portalFreeFieldsFieldRecordController = new PortalFreeFieldsFieldRecordController();
        return $portalFreeFieldsFieldRecordController->getValuesForPortal($urlPageRef, 'contacts', $contact->id,);
    }

    public function getContactProjects(Contact $contact)
    {
        // only active projects that are today in registration period, and only is_active projecttypes
        $allowedProjectStatuses = ProjectStatus::where('code_ref', 'active' )->get()->pluck('id');
        $activeProjectTypes = ProjectType::where('is_active', true)->get()->pluck('id');
        $projects = Project::whereIn('project_status_id', $allowedProjectStatuses)
            ->whereIn('project_type_id', $activeProjectTypes)
            ->where('date_start_registrations', '<=', Carbon::today()->format('Y-m-d'))
            ->where('date_end_registrations', '>=', Carbon::today()->format('Y-m-d'))
            ->get();
        foreach ($projects as $key => $project) {
            $this->setContactProjectIndicators($project, $contact, $projects, $key);
        }
        return response()->json(ProjectRegister::collection($projects));
    }

    public function getContactGroups(Contact $contact)
    {
        $groups = $contact->groups()->select('name', 'id')->get();

        return $groups;
    }

    public function getContactProjectData(Contact $contact, Project $project)
    {
        $this->setContactProjectIndicators($project, $contact, null, 0);

//        $belongsToMembershipGroup = in_array( $project->question_about_membership_group_id, $contact->getAllGroups() );
        $belongsToMembershipGroup = false;
        if($project->question_about_membership_group_id){
            $questionAboutMembershipGroup = ContactGroup::find($project->question_about_membership_group_id);
            if($questionAboutMembershipGroup){
                $questionAboutMembershipGroupContactsIds = $questionAboutMembershipGroup->getAllContacts(true);
                $belongsToMembershipGroup = in_array( $contact->id, $questionAboutMembershipGroupContactsIds );
            }
        }
        $textIsMemberMerged = $project->text_is_member;
        $textIsMemberMerged = TemplateVariableHelper::replaceTemplateVariables($textIsMemberMerged, 'contact', $contact);
        $textIsMemberMerged = TemplateVariableHelper::replaceTemplateVariables($textIsMemberMerged, 'ik', Auth::user());
        $textIsMemberMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textIsMemberMerged,'portal' );
        $textIsMemberMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textIsMemberMerged,'contacten_portal' );
        $textIsMemberMerged = TemplateVariableHelper::replaceTemplateCooperativeVariables($textIsMemberMerged,'cooperatie' );

        $textIsNoMemberMerged = $project->text_is_no_member;
        $textIsNoMemberMerged = TemplateVariableHelper::replaceTemplateVariables($textIsNoMemberMerged, 'contact', $contact);
        $textIsNoMemberMerged = TemplateVariableHelper::replaceTemplateVariables($textIsNoMemberMerged, 'ik', Auth::user());
        $textIsNoMemberMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textIsNoMemberMerged,'portal' );
        $textIsNoMemberMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textIsNoMemberMerged,'contacten_portal' );
        $textIsNoMemberMerged = TemplateVariableHelper::replaceTemplateCooperativeVariables($textIsNoMemberMerged,'cooperatie' );

        $textBecomeMemberMerged = $project->text_become_member;
        $textBecomeMemberMerged = TemplateVariableHelper::replaceTemplateVariables($textBecomeMemberMerged, 'contact', $contact);
        $textBecomeMemberMerged = TemplateVariableHelper::replaceTemplateVariables($textBecomeMemberMerged, 'ik', Auth::user());
        $textBecomeMemberMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textBecomeMemberMerged,'portal' );
        $textBecomeMemberMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textBecomeMemberMerged,'contacten_portal' );
        $textBecomeMemberMerged = TemplateVariableHelper::replaceTemplateCooperativeVariables($textBecomeMemberMerged,'cooperatie' );

        $textBecomeNoMemberMerged = $project->text_become_no_member;
        $textBecomeNoMemberMerged = TemplateVariableHelper::replaceTemplateVariables($textBecomeNoMemberMerged, 'contact', $contact);
        $textBecomeNoMemberMerged = TemplateVariableHelper::replaceTemplateVariables($textBecomeNoMemberMerged, 'ik', Auth::user());
        $textBecomeNoMemberMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textBecomeNoMemberMerged,'portal' );
        $textBecomeNoMemberMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textBecomeNoMemberMerged,'contacten_portal' );
        $textBecomeNoMemberMerged = TemplateVariableHelper::replaceTemplateCooperativeVariables($textBecomeNoMemberMerged,'cooperatie' );

        $textAgreeTermsMerged = $project->text_agree_terms;
        $textAgreeTermsMerged = str_replace('{voorwaarden_link}', "<a href='" . $project->link_agree_terms . "' target='_blank'>voorwaarden</a>", $textAgreeTermsMerged);
        $textAgreeTermsMerged = str_replace('{project_informatie_link}', "<a href='" . $project->link_understand_info . "' target='_blank'>project informatie</a>", $textAgreeTermsMerged);
        $textAgreeTermsMerged = TemplateVariableHelper::replaceTemplateVariables($textAgreeTermsMerged, 'contact', $contact);
        $textAgreeTermsMerged = TemplateVariableHelper::replaceTemplateVariables($textAgreeTermsMerged, 'ik', Auth::user());
        $textAgreeTermsMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textAgreeTermsMerged,'portal' );
        $textAgreeTermsMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textAgreeTermsMerged,'contacten_portal' );
        $textAgreeTermsMerged = TemplateVariableHelper::replaceTemplateCooperativeVariables($textAgreeTermsMerged,'cooperatie' );

        $textLinkAgreeTermsMerged = $project->text_link_agree_terms;
        $textLinkAgreeTermsMerged = str_replace('{voorwaarden_link}', "<a href='" . $project->link_agree_terms . "' target='_blank'>" . $project->text_link_name_agree_terms . "</a>", $textLinkAgreeTermsMerged);
        $textLinkAgreeTermsMerged = TemplateVariableHelper::replaceTemplateVariables($textLinkAgreeTermsMerged, 'contact', $contact);
        $textLinkAgreeTermsMerged = TemplateVariableHelper::replaceTemplateVariables($textLinkAgreeTermsMerged, 'ik', Auth::user());
        $textLinkAgreeTermsMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textLinkAgreeTermsMerged,'portal' );
        $textLinkAgreeTermsMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textLinkAgreeTermsMerged,'contacten_portal' );
        $textLinkAgreeTermsMerged = TemplateVariableHelper::replaceTemplateCooperativeVariables($textLinkAgreeTermsMerged,'cooperatie' );

        $textLinkUnderstandInfoMerged = $project->text_link_understand_info;
        $textLinkUnderstandInfoMerged = str_replace('{project_informatie_link}', "<a href='" . $project->link_understand_info . "' target='_blank'>" . $project->text_link_name_understand_info . "</a>", $textLinkUnderstandInfoMerged);
        $textLinkUnderstandInfoMerged = TemplateVariableHelper::replaceTemplateVariables($textLinkUnderstandInfoMerged, 'contact', $contact);
        $textLinkUnderstandInfoMerged = TemplateVariableHelper::replaceTemplateVariables($textLinkUnderstandInfoMerged, 'ik', Auth::user());
        $textLinkUnderstandInfoMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textLinkUnderstandInfoMerged,'portal' );
        $textLinkUnderstandInfoMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textLinkUnderstandInfoMerged,'contacten_portal' );
        $textLinkUnderstandInfoMerged = TemplateVariableHelper::replaceTemplateCooperativeVariables($textLinkUnderstandInfoMerged,'cooperatie' );

        $textAcceptAgreementMerged = $project->text_accept_agreement;
        $textAcceptAgreementMerged = TemplateVariableHelper::replaceTemplateVariables($textAcceptAgreementMerged, 'contact', $contact);
        $textAcceptAgreementMerged = TemplateVariableHelper::replaceTemplateVariables($textAcceptAgreementMerged, 'ik', Auth::user());
        $textAcceptAgreementMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textAcceptAgreementMerged,'portal' );
        $textAcceptAgreementMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textAcceptAgreementMerged,'contacten_portal' );
        $textAcceptAgreementMerged = TemplateVariableHelper::replaceTemplateCooperativeVariables($textAcceptAgreementMerged,'cooperatie' );

        $textAcceptAgreementQuestionMerged = $project->text_accept_agreement_question;
        $textAcceptAgreementQuestionMerged = TemplateVariableHelper::replaceTemplateVariables($textAcceptAgreementQuestionMerged, 'contact', $contact);
        $textAcceptAgreementQuestionMerged = TemplateVariableHelper::replaceTemplateVariables($textAcceptAgreementQuestionMerged, 'ik', Auth::user());
        $textAcceptAgreementQuestionMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textAcceptAgreementQuestionMerged,'portal' );
        $textAcceptAgreementQuestionMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textAcceptAgreementQuestionMerged,'contacten_portal' );
        $textAcceptAgreementQuestionMerged = TemplateVariableHelper::replaceTemplateCooperativeVariables($textAcceptAgreementQuestionMerged,'cooperatie' );

        $textRegistrationFinishedMerged = $project->text_registration_finished;
        $textRegistrationFinishedMerged = TemplateVariableHelper::replaceTemplateVariables($textRegistrationFinishedMerged, 'contact', $contact);
        $textRegistrationFinishedMerged = TemplateVariableHelper::replaceTemplateVariables($textRegistrationFinishedMerged, 'ik', Auth::user());
        $textRegistrationFinishedMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textRegistrationFinishedMerged,'portal' );
        $textRegistrationFinishedMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textRegistrationFinishedMerged,'contacten_portal' );
        $textRegistrationFinishedMerged = TemplateVariableHelper::replaceTemplateCooperativeVariables($textRegistrationFinishedMerged,'cooperatie' );

        $result = [
            "projectRegisterIndicators" => ProjectRegister::make($project),
            "belongsToMembershipGroup" => $belongsToMembershipGroup,
            "textIsMemberMerged" => $textIsMemberMerged,
            "textIsNoMemberMerged" => $textIsNoMemberMerged,
            "textBecomeMemberMerged" => $textBecomeMemberMerged,
            "textBecomeNoMemberMerged" => $textBecomeNoMemberMerged,
            "textAgreeTermsMerged" => $textAgreeTermsMerged,
            "textLinkAgreeTermsMerged" => $textLinkAgreeTermsMerged,
            "textLinkUnderstandInfoMerged" => $textLinkUnderstandInfoMerged,
            "textAcceptAgreementMerged" => $textAcceptAgreementMerged,
            "textAcceptAgreementQuestionMerged" => $textAcceptAgreementQuestionMerged,
            "textRegistrationFinishedMerged" => $textRegistrationFinishedMerged,
            ];
        return response()->json($result);
    }

    public function financialOverviewDocuments(Contact $contact)
    {
        $contact->load([
            'financialOverviewContactsSend' => function($query){
                $query->orderBy('date_sent');
            },
        ]);
        return FinancialOverviewDocumentResource::collection($contact->financialOverviewContactsSend);
    }

    public function relatedAdministrations(Contact $contact)
    {
        $contactId = $contact->id;
        $administrations = Administration::whereHas('projects', function($query) use($contactId){
            $query->whereHas('participantsProject', function($query2) use($contactId){
                $query2->where('contact_id', $contactId);
            });
        })->orderBy('name')->get();
        if($administrations->count() == 0){
            $defaultAdministrationId = PortalSettings::get('defaultAdministrationId');
            if(!empty($defaultAdministrationId)){
                $administrations = Administration::whereId($defaultAdministrationId)->get();
            }
        }

        return AdministrationResource::collection($administrations);
    }

    public function addContactToContactGroup(Contact $contact, ContactGroup $contactGroup)
    {
        if(!$contactGroup->contacts()->where('contact_id', $contact->id)->exists()){

            $contactGroup->contacts()->attach([$contact->id => ['member_created_at' => \Illuminate\Support\Carbon::now(), 'member_to_group_since' => Carbon::now()]]);
            if($contactGroup->laposta_list_id){
                $lapostaMemberHelper = new LapostaMemberHelper($contactGroup, $contact);
                $lapostaMemberHelper->createMember();
            }

            if($contactGroup->send_email_new_contact_link){
                $contactGroupHelper = new ContactGroupHelper($contactGroup, $contact);
                $contactGroupHelper->processEmailNewContactToGroup();
            }
            if($contactGroup->inspection_person_type_id !== null){
                $contact->inspection_person_type_id = $contactGroup->inspection_person_type_id;
                $contact->save();
            }
        }
    }

    public function removeContactFromContactGroup(Contact $contact, ContactGroup $contactGroup)
    {
        if($contactGroup->laposta_list_id){
            if($contactGroup->contacts()->where('contact_id', $contact->id)->exists()){
                $contactGroupPivot = $contactGroup->contacts()->where('contact_id', $contact->id)->first()->pivot;
                if($contactGroupPivot->laposta_member_id !== null
                    && $contactGroupPivot->laposta_member_state !== 'unknown'
                    && $contactGroupPivot->laposta_member_state !== 'inprogress'
                ){
                    $lapostaMemberHelper = new LapostaMemberHelper($contactGroup, $contact);
                    $lapostaMemberHelper->deleteMember();
                }
            }
        }

        $contactGroup->contacts()->detach($contact);

        //now check if the contact is still in any inspection_person_type_group,
        // if so set the inspection_person_type_id column to first found
        // if not set the inspection_person_type_id column to null again
        if($contact->groups()->whereNotNull('inspection_person_type_id')->exists()) {
            $contact->inspection_person_type_id = $contact->groups()->whereNotNull('inspection_person_type_id')->first()->inspection_person_type_id;
            $contact->save();
        } else {
            $contact->inspection_person_type_id = null;
            $contact->save();
        }
    }

    protected function updatePerson($contact, Request $request)
    {
        $person = $contact->person;
        $personData = $request->person;
        if ($person) {
            if (!isset($personData['titleId']) || empty($personData['titleId']) || $personData['titleId'] == 'null' || $personData['titleId'] == '' || $personData['titleId'] == 0 ) {
                $personData['titleId'] = null;
            }
            if (!isset($personData['dateOfBirth']) || empty($personData['dateOfBirth']) || $personData['dateOfBirth'] == 'null' || $personData['dateOfBirth'] == '' ) {
                $personData['dateOfBirth'] = null;
            }

            $lnp = $person->last_name_prefix;
            if (isset($personData['lastNamePrefixId']) ) {
                if ($personData['lastNamePrefixId'] == 'null' || $personData['lastNamePrefixId'] == '' || $personData['lastNamePrefixId'] == 0) {
                    $lnp = '';
                } else {
                    $lnp = LastNamePrefix::where('id', $personData['lastNamePrefixId'])->pluck('name')[0];
                }
            }
            $personData['lastNamePrefix'] = $lnp;


            unset($personData['title']);
            unset($personData['lastNamePrefixId']);

            $person->fill($this->arrayKeysToSnakeCase($personData));
            $person->save();
        }
    }

    protected function updateOrganisation($contact, Request $request)
    {
        $organisation = $contact->organisation;
        $organisationData = $request->organisation;
        if ($organisation) {

            $organisation->fill($this->arrayKeysToSnakeCase($organisationData));
            $organisation->save();
        }
    }

    protected function updateEmailCorrespondence($contact, Request $request)
    {

        if (isset($request['emailCorrespondence'])) {
            $emailCorrespondenceData = $request['emailCorrespondence'];
            if (isset($emailCorrespondenceData['id'])) {
                $emailCorrespondence = $contact->emailAddresses->find($emailCorrespondenceData['id']);
                if ($emailCorrespondence) {
                    $emailCorrespondence->fill($this->arrayKeysToSnakeCase($emailCorrespondenceData));
                }

            } else {
                $emailCorrespondenceData['typeId'] = EmailAddressType::ADMINISTRATION;
                $emailCorrespondenceData['primary'] = true;

                Validator::make($emailCorrespondenceData, [
                    'typeId' => new EnumExists(EmailAddressType::class),
                    'email' => '',
                    'primary' => 'boolean',
                ]);

                $emailCorrespondenceData = $this->sanitizeData($emailCorrespondenceData, [
                    'typeId' => 'nullable',
                    'primary' => 'boolean',
                ]);
                $emailCorrespondence = new EmailAddress($this->arrayKeysToSnakeCase($emailCorrespondenceData));
                $emailCorrespondence->contact_id = $contact->id;
            }
            $emailCorrespondence->save();
        }

    }

    protected function updateEmailInvoice($contact, Request $request)
    {
        if (isset($request['emailInvoice'])) {
            $emailInvoiceData = $request['emailInvoice'];
            if (isset($emailInvoiceData['id'])) {
                $emailInvoice = $contact->emailAddresses->find($emailInvoiceData['id']);
                if ($emailInvoice) {

                    if(empty($emailInvoiceData['email']) )
                    {
                        $emailInvoice->delete();
                    }else{
                        $emailInvoice->fill($this->arrayKeysToSnakeCase($emailInvoiceData));
                        $emailInvoice->save();
                    }
                }

            } else {
                if ( isset($emailInvoiceData['email']) && !empty($emailInvoiceData['email']) ) {
                    $emailInvoiceData['typeId'] = EmailAddressType::INVOICE;
                    $emailInvoiceData['primary'] = false;

                    Validator::make($emailInvoiceData, [
                        'typeId' => new EnumExists(EmailAddressType::class),
                        'email' => '',
                        'primary' => 'boolean',
                    ]);

                    $emailInvoiceData = $this->sanitizeData($emailInvoiceData, [
                        'typeId' => 'nullable',
                        'primary' => 'boolean',
                    ]);

                    $emailInvoice = new EmailAddress($this->arrayKeysToSnakeCase($emailInvoiceData));
                    $emailInvoice->contact_id = $contact->id;
                    $emailInvoice->save();
                }
            }
        }

    }

    protected function updatePhoneNumberPrimary($contact, Request $request)
    {
        if (isset($request['phoneNumberPrimary'])) {
            $phoneNumberPrimaryData = $request['phoneNumberPrimary'];
            if (isset($phoneNumberPrimaryData['id'])) {
                $phoneNumberPrimary = $contact->phoneNumbers->find($phoneNumberPrimaryData['id']);
                if ($phoneNumberPrimary) {
                    if(empty($phoneNumberPrimaryData['number']) )
                    {
                        $phoneNumberPrimary->delete();
                    }else{
                        $phoneNumberPrimary->fill($this->arrayKeysToSnakeCase($phoneNumberPrimaryData));
                        $phoneNumberPrimary->save();
                    }
                }

            } else {
                if ( isset($phoneNumberPrimaryData['number']) && !empty($phoneNumberPrimaryData['number']) ) {
                    $phoneNumberPrimaryData['typeId'] = PhoneNumberType::HOME;
                    $phoneNumberPrimaryData['primary'] = true;

                    Validator::make($phoneNumberPrimaryData, [
                        'typeId' => new EnumExists(PhoneNumberType::class),
                        'number' => '',
                        'primary' => 'boolean',
                    ]);

                    $phoneNumberPrimaryData = $this->sanitizeData($phoneNumberPrimaryData, [
                        'typeId' => 'nullable',
                        'primary' => 'boolean',
                    ]);

                    $phoneNumberPrimary = new PhoneNumber($this->arrayKeysToSnakeCase($phoneNumberPrimaryData));
                    $phoneNumberPrimary->contact_id = $contact->id;
                    $phoneNumberPrimary->save();
                }
            }
        }

    }

    protected function updatePhoneNumberTwo($contact, Request $request)
    {
        if (isset($request['phoneNumberTwo'])) {
            $phoneNumberTwoData = $request['phoneNumberTwo'];
            if (isset($phoneNumberTwoData['id'])) {
                $phoneNumberTwo = $contact->phoneNumbers->find($phoneNumberTwoData['id']);

                if ($phoneNumberTwo) {
                    if(empty($phoneNumberTwoData['number']) )
                    {
                        $phoneNumberTwo->delete();
                    }else{
                        $phoneNumberTwo->fill($this->arrayKeysToSnakeCase($phoneNumberTwoData));
                        $phoneNumberTwo->save();
                    }
                }

            } else {
                if ( isset($phoneNumberTwoData['number']) && !empty($phoneNumberTwoData['number']) ) {
                    $phoneNumberTwoData['typeId'] = PhoneNumberType::HOME;
                    $phoneNumberTwoData['primary'] = false;

                    Validator::make($phoneNumberTwoData, [
                        'typeId' => new EnumExists(PhoneNumberType::class),
                        'number' => '',
                        'primary' => 'boolean',
                    ]);

                    $phoneNumberTwoData = $this->sanitizeData($phoneNumberTwoData, [
                        'typeId' => 'nullable',
                        'primary' => 'boolean',
                    ]);

                    $phoneNumberTwo = new PhoneNumber($this->arrayKeysToSnakeCase($phoneNumberTwoData));
                    $phoneNumberTwo->contact_id = $contact->id;
                    $phoneNumberTwo->save();
                }
            }
        }

    }

    protected function updateAddress($type, $contact, $addressData, $currentAddressEnergySupplierElectricity, $addressType, $projectId)
    {
        unset($addressData['country']);
        if($addressData['countryId'] == ''){
            $addressData['countryId'] = null;
        }
        if($addressData['number'] == ''){
            $addressData['number'] = null;
        }
        $addressData['postalCode'] = strtoupper( $addressData['postalCode']);
        if(preg_match('/^\d{4}\s[A-Za-z]{2}$/', $addressData['postalCode'])){
            $addressData['postalCode'] = preg_replace('/\s+/', '', $addressData['postalCode']);
        }

        $address = null;
        $addressOld = null;
        if (isset($addressData['id']))
        {
            $address = $contact->addresses->find($addressData['id']);
            $addressOld = $address;
            if ($address)
            {
                if(empty($addressData['street']) && empty($addressData['postalCode']) && empty($addressData['city']) )
                {
                    $address->delete();
                }else{
//                    if ($type == ContactType::ORGANISATION && $addressType == 'visit') {
//                        $addressData['primary'] = true;
//                    }
                    $address->fill($this->arrayKeysToSnakeCase($addressData));

                    $addressHelper = new AddressHelper($contact, $address);
                    $checkAddressOk = $addressHelper->checkAddress($projectId, true);

                    if ($projectId) {
                        $project = Project::find($projectId);
                        if($project->check_double_addresses) {
                            $addressIsDouble = $addressHelper->checkDoubleAddress($project);
                            if ($addressIsDouble) {
                                abort(412, 'Er is al een deelnemer ingeschreven op dit adres die meedoet aan een SCE project.');
                            }
                        }
                    }

                    foreach ($contact->participations as $participation) {

                        if($participation->project->check_double_addresses){
                            $addressIsDouble = $addressHelper->checkDoubleAddress($participation->project);
                            if($addressIsDouble){
                                abort(412, 'Er is al een deelnemer ingeschreven op dit adres die meedoet aan een SCE project.' );
                            }
                        }
                    }

                    $address->save();
                }
            }

        }else{
            if(!empty($addressData['number']) && !empty($addressData['postalCode'])) {
                $addressData['typeId'] = $addressType;
//                if ($type == ContactType::ORGANISATION && $addressType == 'visit') {
                    if ($addressType == 'visit') {
                    $addressData['primary'] = true;
                }

                Validator::make($addressData, [
                    'typeId' => new EnumExists(AddressType::class),
                    'number' => '',
                    'primary' => 'boolean',
                ]);

                $addressData = $this->sanitizeData($addressData, [
                    'typeId' => 'nullable',
                    'primary' => 'boolean',
                ]);

                $address = new Address($this->arrayKeysToSnakeCase($addressData));
                $address->contact_id = $contact->id;

                $addressHelper = new AddressHelper($contact, $address);
                $checkAddressOk = $addressHelper->checkAddress($projectId, true);

                $address->save();
            }
        }

        $noteAddress = '';
        if($addressOld != null && $addressOld->ean_electricity != $address->ean_electricity){
            $noteAddress = $noteAddress . "Oude EAN elektriciteit: " . $addressOld->ean_electricity . "\n";
        }
        if( ($addressOld == null && $address != null && $address->ean_electricity != null) || ($addressOld != null && $address != null && $addressOld->ean_electricity != $address->ean_electricity)){
            $noteAddress = $noteAddress . "Nieuwe EAN elektriciteit: " . $address->ean_electricity . "\n";
        }
        if($addressOld != null && $address != null && $addressOld->ean_gas != $address->ean_gas){
            $noteAddress = $noteAddress . "Oude EAN gas: " . $addressOld->ean_gas . "\n";
        }
        if( ($addressOld == null && $address != null && $address->ean_gas != null) || ($addressOld != null && $address != null && $addressOld->ean_gas != $address->ean_gas)){
            $noteAddress = $noteAddress . "Nieuwe EAN gas: " . $address->ean_gas . "\n";
        }
        if(!empty($noteAddress)){
            $checkContactTaskResponsibleUserId = PortalSettings::get('checkContactTaskResponsibleUserId');
            $checkContactTaskResponsibleTeamId = PortalSettings::get('checkContactTaskResponsibleTeamId');
            $taskTypeForPortal = TaskType::where('default_portal_task_type', true)->first();

            if($taskTypeForPortal) {
                $newTask = new Task();
                $newTask->note = $noteAddress;
                $newTask->type_id = $taskTypeForPortal->id;
                $newTask->contact_id = $address->contact_id;
                $newTask->responsible_user_id = !empty($checkContactTaskResponsibleUserId) ? $checkContactTaskResponsibleUserId : null;
                $newTask->responsible_team_id = !empty($checkContactTaskResponsibleTeamId) ? $checkContactTaskResponsibleTeamId : null;
                $newTask->date_planned_start = Carbon::today();
                $newTask->save();

                if ($newTask->type && $newTask->type->uses_wf_new_task) {
                    $taskWorkflowHelper = new TaskWorkflowHelper($newTask);
                    $processed = $taskWorkflowHelper->processWorkflowEmailNewTask();
                    if($processed)
                    {
                        $newTask->date_sent_wf_new_task =  Carbon::now();
                        $newTask->save();
                    }
                }

            }
        }

        if ($address != null && $currentAddressEnergySupplierElectricity != null ) {
            $this->updateEnergySupplierToAddress($address, $currentAddressEnergySupplierElectricity);
        }

    }

    protected function updateEnergySupplierToAddress(Address $address, $currentAddressEnergySupplierElectricityData)
    {
        unset($currentAddressEnergySupplierElectricityData['energySupplier']);

        $currentAddressEnergySupplierElectricityData['addressId'] = $address->id;

        if(!isset($currentAddressEnergySupplierElectricityData['energySupplierId']) || $currentAddressEnergySupplierElectricityData['energySupplierId'] == ''){
            $currentAddressEnergySupplierElectricityData['energySupplierId'] = null;
        }
        if(!isset($currentAddressEnergySupplierElectricityData['memberSince']) || $currentAddressEnergySupplierElectricityData['memberSince'] == ''){
            $currentAddressEnergySupplierElectricityData['memberSince'] = null;
        }

        if (isset($currentAddressEnergySupplierElectricityData['id']))
        {
            $currentAddressEnergySupplierElectricityOld = $address->addressEnergySuppliers->find($currentAddressEnergySupplierElectricityData['id']);
        }else{
            $currentAddressEnergySupplierElectricityOld = null;
        }

        $currentAddressEnergySupplierElectricityNew = null;

        if ($currentAddressEnergySupplierElectricityOld == null){
            if($currentAddressEnergySupplierElectricityData['energySupplierId'] == null || $currentAddressEnergySupplierElectricityData['memberSince'] == null) {
                return;
            }
            $currentAddressEnergySupplierElectricityNew = $this->createNewAddressEnergySupplier($address, $currentAddressEnergySupplierElectricityData);
            $currentAddressEnergySupplierElectricityNew->save();
            $this->checkSplitRevenuePart($currentAddressEnergySupplierElectricityNew);
        } else {
            if($currentAddressEnergySupplierElectricityData['energySupplierId'] == null) {
                // delete
                $currentAddressEnergySupplierElectricityOld->delete();
            }else{
                if($currentAddressEnergySupplierElectricityData['memberSince'] == null) {
                    return;
                }
                if($currentAddressEnergySupplierElectricityData['energySupplierId'] == $currentAddressEnergySupplierElectricityOld->energy_supplier_id) {
                    // update
                    $currentAddressEnergySupplierElectricityNew = clone $currentAddressEnergySupplierElectricityOld;
                    $currentAddressEnergySupplierElectricityNew->member_since = $currentAddressEnergySupplierElectricityData['memberSince'];
                    $currentAddressEnergySupplierElectricityNew->es_number = $currentAddressEnergySupplierElectricityData['esNumber'];

                    $addressEnergySupplierController = new AddressEnergySupplierController();
                    $addressEnergySupplierController->validateAddressEnergySupplier($currentAddressEnergySupplierElectricityNew, true);

                    $currentAddressEnergySupplierElectricityNew->save();
                }else{

                    // new
                    $currentAddressEnergySupplierElectricityNew = $this->createNewAddressEnergySupplier($address, $currentAddressEnergySupplierElectricityData);

                    $addressEnergySupplierController = new AddressEnergySupplierController();
                    $addressEnergySupplierController->validateAddressEnergySupplier($currentAddressEnergySupplierElectricityNew, true);

                    $currentAddressEnergySupplierElectricityNew->save();
                    $this->checkSplitRevenuePart($currentAddressEnergySupplierElectricityNew);

                }

                $currentAddressEnergySupplierElectricityNew->save();
            }
        }

        //Make task note of changes
        $noteAddressEnergySupplier = "Controleren wijziging energie leverancier gegevens:\n";
        $addressEnergySupplierChanged = false;

        if($currentAddressEnergySupplierElectricityOld != null && ($currentAddressEnergySupplierElectricityNew == null || $currentAddressEnergySupplierElectricityOld->energy_supplier_id != $currentAddressEnergySupplierElectricityNew->energy_supplier_id) ){
            $noteAddressEnergySupplier = $noteAddressEnergySupplier . "Oude leverancier: " . EnergySupplier::find($currentAddressEnergySupplierElectricityOld->energy_supplier_id)->name . "\n";
            $addressEnergySupplierChanged = true;
        }
        if( ($currentAddressEnergySupplierElectricityOld == null && $currentAddressEnergySupplierElectricityNew != null && $currentAddressEnergySupplierElectricityNew->energy_supplier_id != null) || ($currentAddressEnergySupplierElectricityOld != null && $currentAddressEnergySupplierElectricityNew != null && $currentAddressEnergySupplierElectricityOld->energy_supplier_id != $currentAddressEnergySupplierElectricityNew->energy_supplier_id)){
            $noteAddressEnergySupplier = $noteAddressEnergySupplier . "Nieuwe leverancier:" . EnergySupplier::find($currentAddressEnergySupplierElectricityNew->energy_supplier_id)->name . "\n";
            $addressEnergySupplierChanged = true;
        }
        if($currentAddressEnergySupplierElectricityOld != null && ($currentAddressEnergySupplierElectricityNew == null || $currentAddressEnergySupplierElectricityOld->es_number != $currentAddressEnergySupplierElectricityNew->es_number) ){
            $noteAddressEnergySupplier = $noteAddressEnergySupplier . "Oude klantnummer: " . $currentAddressEnergySupplierElectricityOld->es_number . "\n";
            $addressEnergySupplierChanged = true;
        }
        if( ($currentAddressEnergySupplierElectricityOld == null && $currentAddressEnergySupplierElectricityNew != null && $currentAddressEnergySupplierElectricityNew->es_number != null) || ($currentAddressEnergySupplierElectricityOld != null && $currentAddressEnergySupplierElectricityNew != null && $currentAddressEnergySupplierElectricityOld->es_number != $currentAddressEnergySupplierElectricityNew->es_number)){
            $noteAddressEnergySupplier = $noteAddressEnergySupplier . "Nieuwe klantnummer: " . $currentAddressEnergySupplierElectricityNew->es_number . "\n";
            $addressEnergySupplierChanged = true;
        }
        if($currentAddressEnergySupplierElectricityOld != null && ($currentAddressEnergySupplierElectricityNew == null || $currentAddressEnergySupplierElectricityOld->member_since != $currentAddressEnergySupplierElectricityNew->member_since) ){
            $noteAddressEnergySupplier = $noteAddressEnergySupplier . "Oude klant sinds: " . $currentAddressEnergySupplierElectricityOld->member_since . "\n";
            $addressEnergySupplierChanged = true;
        }
        if( ($currentAddressEnergySupplierElectricityOld == null && $currentAddressEnergySupplierElectricityNew != null && $currentAddressEnergySupplierElectricityNew->member_since != null) || ($currentAddressEnergySupplierElectricityOld != null && $currentAddressEnergySupplierElectricityNew != null && $currentAddressEnergySupplierElectricityOld->member_since != $currentAddressEnergySupplierElectricityNew->member_since)){
            $noteAddressEnergySupplier = $noteAddressEnergySupplier . "Nieuwe klant sinds: " . $currentAddressEnergySupplierElectricityNew->member_since . "\n";
            $addressEnergySupplierChanged = true;
        }

        if($addressEnergySupplierChanged) {
            $checkContactTaskResponsibleUserId = PortalSettings::get('checkContactTaskResponsibleUserId');
            $checkContactTaskResponsibleTeamId = PortalSettings::get('checkContactTaskResponsibleTeamId');
            $taskTypeForPortal = TaskType::where('default_portal_task_type', true)->first();

            if ($taskTypeForPortal) {
                $newTask = new Task();
                $newTask->note = $noteAddressEnergySupplier;
                $newTask->type_id = $taskTypeForPortal->id;
                $newTask->contact_id = $address->contact_id;
                $newTask->responsible_user_id = !empty($checkContactTaskResponsibleUserId) ? $checkContactTaskResponsibleUserId : null;
                $newTask->responsible_team_id = !empty($checkContactTaskResponsibleTeamId) ? $checkContactTaskResponsibleTeamId : null;
                $newTask->date_planned_start = Carbon::today();
                $newTask->save();

                if ($newTask->type && $newTask->type->uses_wf_new_task) {
                    $taskWorkflowHelper = new TaskWorkflowHelper($newTask);
                    $processed = $taskWorkflowHelper->processWorkflowEmailNewTask();
                    if($processed)
                    {
                        $newTask->date_sent_wf_new_task =  Carbon::now();
                        $newTask->save();
                    }
                }
            }
        }

    }

    protected function updateFreeFieldsContact($contact, array $freeFieldsFieldRecordsData, $portalUser)
    {
        // Array to hold transformed records
        $updateValues = [];

        foreach ($freeFieldsFieldRecordsData as $key => $value) {
            // Extract record id from "record-{id}" format
            $recordId = (int) str_replace('record-', '', $key);

            // Fetch field format type from FreeFieldsField model
            $freeFieldsField = FreeFieldsField::find($recordId);
            $fieldFormatType = $freeFieldsField?->freeFieldsFieldFormat?->format_type ?? null;

            if ($fieldFormatType) {
                // Initialize a single record array with defaults
                $record = [
                    'id' => $recordId,
                    'fieldFormatType' => $fieldFormatType, // add fieldFormatType
                    'fieldRecordValueText' => null,
                    'fieldRecordValueBoolean' => null,
                    'fieldRecordValueInt' => null,
                    'fieldRecordValueDouble' => null,
                    'fieldRecordValueDatetime' => null,
                ];

                // Assign values based on format type
                switch ($fieldFormatType) {
                    case 'boolean':
                        $record['fieldRecordValueBoolean'] = (bool) $value;
                        break;
                    case 'text_short':
                    case 'text_long':
                        $record['fieldRecordValueText'] = $value;
                        break;
                    case 'int':
                        $record['fieldRecordValueInt'] = (int) $value;
                        break;
                    case 'double_2_dec':
                    case 'amount_euro':
                        $record['fieldRecordValueDouble'] = (double) str_replace(',', '.', $value);
                        break;
                    case 'date':
                    case 'datetime':
                        $record['fieldRecordValueDatetime'] = $value;
                        break;
                }

                // Add the transformed record to updateValues
                $updateValues[] = $record;
            }
        }

        // Call updateValues with transformed data
        $controller = new FreeFieldsFieldRecordController();
        $controller->updateValuesFromFreeFieldsContact($contact->id, $updateValues, 'portal', $portalUser->id);
    }

    protected function createTaskIbanChange(Contact $contact, $ibanOld, $ibanAttnOld)
    {
        //Make task note of changes
        $note = "Controleren wijziging IBAN gegevens:\n";
        if($ibanOld != $contact->iban) {
            $note = $note . "Oude IBAN  : " . $ibanOld . "\n";
            $note = $note . "Nieuwe IBAN: " . $contact->iban . "\n";
        }
        if($ibanAttnOld != $contact->iban_attn) {
            $note = $note . "Oude IBAN t.n.v.  : " . $ibanAttnOld . "\n";
            $note = $note . "Nieuwe IBAN t.n.v.: " . $contact->iban_attn . "\n";
        }

        $checkContactTaskResponsibleUserId = PortalSettings::get('checkContactTaskResponsibleUserId');
        $checkContactTaskResponsibleTeamId = PortalSettings::get('checkContactTaskResponsibleTeamId');
        $taskTypeForPortal = TaskType::where('default_portal_task_type', true)->first();

        if($taskTypeForPortal) {
            $newTask = new Task();
            $newTask->note = $note;
            $newTask->type_id = $taskTypeForPortal->id;
            $newTask->contact_id = $contact->id;
            $newTask->responsible_user_id = !empty($checkContactTaskResponsibleUserId) ? $checkContactTaskResponsibleUserId
                : null;
            $newTask->responsible_team_id = !empty($checkContactTaskResponsibleTeamId) ? $checkContactTaskResponsibleTeamId
                : null;
            $newTask->date_planned_start = Carbon::today();

            $newTask->save();

            if ($newTask->type && $newTask->type->uses_wf_new_task) {
                $taskWorkflowHelper = new TaskWorkflowHelper($newTask);
                $processed = $taskWorkflowHelper->processWorkflowEmailNewTask();
                if($processed)
                {
                    $newTask->date_sent_wf_new_task =  Carbon::now();
                    $newTask->save();
                }
            }
        }
    }

    /**
     * @param $project
     * @param Contact $contact
     * @param $projects
     * @param int $key
     */
    protected function setContactProjectIndicators($project, Contact $contact, $projects, int $key)
    {
        $project->isSceOrPcrProject = $project->projectType->code_ref === 'postalcode_link_capital' || $project->is_sce_project;
        $project->hasParticipation = false;
        $project->allowIncreaseParticipations = false;
        $project->allowPayMollie = false;
        $project->econobisPaymentLink = '';
        $project->allowRegisterToProject = false;
        $project->textNotAllowedRegisterToProject = 'Inschrijving op dit project niet mogelijk.';
        $project->participationsOptioned = 0;
        $project->amountOptioned = 0;
        $project->powerKwhConsumption = 0;

        // Fetch all participations for the contact that match the project and are not terminated
        $participantProjects = $contact->participations()
            ->where('project_id', $project->id)
            ->whereNull('date_terminated')
            ->get();

        // Set hasParticipation if participations exist
        if ($participantProjects->isNotEmpty()) {
            $project->hasParticipation = true;
        }

        // Check if any mutation meets the criteria
        $mutationToPay = null;
        foreach ($participantProjects as $participantProject) {
            $mutationToPay = $participantProject->mutationsAsc()
                ->whereNull('date_payment')
                ->get() // Retrieve all mutations in ascending order
                ->first(fn($mutation) => !$mutation->is_paid_by_mollie); // Filter by the dynamic attribute

            if ($mutationToPay) {
                break; // Stop searching after finding the first valid mutation
            }
        }

        // Set project fields if a valid mutation is found
        if ($mutationToPay && $project->uses_mollie) {
            $project->allowPayMollie = true;
            $project->econobisPaymentLink = $mutationToPay->econobis_payment_link;
        } else if ($project->allow_increase_participations_in_portal
            && $project->date_start_registrations <= Carbon::now()->format('Y-m-d')
            && $project->date_end_registrations >= Carbon::now()->format('Y-m-d')) {
            $project->allowIncreaseParticipations = true;
        }

        // no participation for this contact/project yet or increase is allowed
        if ( $project->hasParticipation === false || (bool)$project->allow_increase_participations_in_portal === true ) {

            // no membership required, then allow register to project
            if (!$project->is_membership_required) {
                $project->allowRegisterToProject = true;
                $project->textNotAllowedRegisterToProject = '';

            // membership required and project not visible for all contacts
            } elseif (!$project->visible_for_all_contacts) {

                // determine if contact is member (through the linked contactgroups of project)
                if ($project->requiresContactGroups()) {
                    $contactInRequiredContactGroup = false;
                    foreach ($project->requiresContactGroups as $contactGroup) {
                        $allContacts = (array_unique($contactGroup->getAllContacts()->pluck('id')->toArray()));
                        if(in_array($contact->id, $allContacts)) {
                            $contactInRequiredContactGroup = true;
                            continue;
                        }
                    }

                    // if contact is member (through the linked contactgroups of project), then allow register to project
                    if($contactInRequiredContactGroup){
                        $project->allowRegisterToProject = true;
                        $project->textNotAllowedRegisterToProject = '';
                    }else {
                        // Contact not a member and if function came with incoming collection projects, then we remove (forget) this project.
                        if (!$project->allowRegisterToProject && $projects) {
                            $projects->forget($key);
                        }
                    }

                // no linked contactgroups available, then don't show project
                } else {
                    // If function came with incoming collection projects, then we remove (forget) this project.
                    if($projects){
                        $projects->forget($key);
                    }
                }

            // membership required but project is visible for all contacts
            } else {

                // determine if contact is member (through the linked contactgroups of project)
                if ($project->requiresContactGroups()) {
                    $contactInRequiredContactGroup = false;
                    foreach ($project->requiresContactGroups as $contactGroup) {
                        $allContacts = (array_unique($contactGroup->getAllContacts()->pluck('id')->toArray()));
                        if(in_array($contact->id, $allContacts)) {
                            $contactInRequiredContactGroup = true;
                            continue;
                        }
                    }
                    // if contact is member (through the linked contactgroups of project), then allow register to project
                    if($contactInRequiredContactGroup){
                        $project->allowRegisterToProject = true;
                        $project->textNotAllowedRegisterToProject = '';
                    }else{
                        // Contact not a member, still show project, but don't allow register to project, and put info text in textfield not allowed register to project.
                        $project->textNotAllowedRegisterToProject = $project->text_info_project_only_members;
                    }
                }
                // no linked contactgroups available, then don't show project
            }

            // if check postalcode link and project is sce or pcr project and register to project was still allowed at this moment
//            if($project->check_postalcode_link && $project->isSceOrPcrProject && $project->allowRegisterToProject) {

            // if register to project was still allowed at this moment and check postalcode_link or PCR project (always check_portalcode_link)
            if ($project->allowRegisterToProject && ($project->check_postalcode_link || $project->projectType->code_ref === 'postalcode_link_capital') ) {

                // if sce project and no addresses found, than register to project not allowed
                if($contact->noAddressesFound) {
                    $project->allowRegisterToProject = false;
                    $project->textNotAllowedRegisterToProject = 'Om in te schrijven voor dit project moeten er adresgegevens bekend zijn.';
                // if addresses found, check postalcode
                }else{
                    // Check address
                    $addressHelper = new AddressHelper($contact, $contact->addressForPostalCodeCheck);
                    $checkAddressOk = $addressHelper->checkAddress($project->id, false);
                    if(!$checkAddressOk){
                        // If hide when not matching postal check and if function came with incoming collection projects, then we remove (forget) this project.
                        if ($project->hide_when_not_matching_postal_check && $projects) {
                            $projects->forget($key);
                            return false;
                        }
                        $project->allowRegisterToProject = false;
                        $project->textNotAllowedRegisterToProject = implode(';', $addressHelper->messages);
                        return false;
                    }
                }
            }

            // if to check double addresses (not allowed) and register to project was still allowed at this moment
            if($project->check_double_addresses && $project->allowRegisterToProject && $contact->addressForPostalCodeCheck) {

                $addressHelper = new AddressHelper($contact, $contact->addressForPostalCodeCheck);
                $addressIsDouble = $addressHelper->checkDoubleAddress($project);
                if($addressIsDouble){
                    $project->allowRegisterToProject = false;
                    $project->textNotAllowedRegisterToProject = 'Er is al een deelnemer ingeschreven op dit adres die meedoet aan een SCE project.';
                }

            }

        }
    }

    /**
     * @param Address $address
     * @param $currentAddressEnergySupplierElectricityData
     * @return AddressEnergySupplier
     */
    protected function createNewAddressEnergySupplier(Address $address, $currentAddressEnergySupplierElectricityData): AddressEnergySupplier
    {
        if (!empty($address->ean_gas)) {
            $currentAddressEnergySupplierElectricityData['energySupplyTypeId'] = 3;
        } else {
            $currentAddressEnergySupplierElectricityData['energySupplyTypeId'] = 2;
        }

        Validator::make($currentAddressEnergySupplierElectricityData, [
            'energySupplyTypeId' => new EnumExists(EnergySupplierType::class),
            'isCurrentSupplier' => 'boolean',
        ]);
        $currentAddressEnergySupplierElectricityData = $this->sanitizeData($currentAddressEnergySupplierElectricityData, [
            'energySupplyTypeId' => 'nullable',
            'isCurrentSupplier' => 'boolean',
        ]);
        $currentAddressEnergySupplierElectricityNew = new AddressEnergySupplier($this->arrayKeysToSnakeCase($currentAddressEnergySupplierElectricityData));

        $addressEnergySupplierController = new AddressEnergySupplierController();
        if ($addressEnergySupplierController->validateAddressEnergySupplier($currentAddressEnergySupplierElectricityNew, false)) {
            $addressEnergySupplierController->setEndDateAddressEnergySupplier($currentAddressEnergySupplierElectricityNew);
        }
        return $currentAddressEnergySupplierElectricityNew;
    }

    /**
     * @param AddressEnergySupplier $currentAddressEnergySupplierElectricityNew
     */
    protected function checkSplitRevenuePart(AddressEnergySupplier $currentAddressEnergySupplierElectricityNew): void
    {
        $revenuePartsKwhArray = [];
        if (Carbon::parse($currentAddressEnergySupplierElectricityNew->end_date_previous)->format('Y-m-d') != '1900-01-01') {
            $participations = $currentAddressEnergySupplierElectricityNew->address->participations;
            foreach ($participations as $participation) {
                $projectType = $participation->project->projectType;
                if ($projectType->code_ref === 'postalcode_link_capital') {
                    $revenuesKwhHelper = new RevenuesKwhHelper();
                    $splitRevenuePartsKwhResponse = $revenuesKwhHelper->checkAndSplitRevenuePartsKwh($participation, $currentAddressEnergySupplierElectricityNew->member_since, $currentAddressEnergySupplierElectricityNew);
                    if ($splitRevenuePartsKwhResponse) {
                        $revenuePartsKwhArray [] = $splitRevenuePartsKwhResponse;
                    }
                }
            }
        }
    }

}