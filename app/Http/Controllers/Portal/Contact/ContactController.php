<?php


namespace App\Http\Controllers\Portal\Contact;


use App\Eco\Address\Address;
use App\Eco\Address\AddressType;
use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactType;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EmailAddress\EmailAddressType;
use App\Eco\EnergySupplier\ContactEnergySupplier;
use App\Eco\EnergySupplier\ContactEnergySupplierType;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\PhoneNumber\PhoneNumberType;
use App\Eco\Project\Project;
use App\Eco\Project\ProjectStatus;
use App\Eco\Project\ProjectType;
use App\Eco\Task\Task;
use App\Eco\Task\TaskType;
use App\Eco\User\User;
use App\Helpers\Address\AddressHelper;
use App\Helpers\Document\DocumentHelper;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\Portal\Administration\AdministrationResource;
use App\Http\Resources\Portal\Documents\FinancialOverviewDocumentResource;
use App\Http\Resources\Project\ProjectRegister;
use App\Rules\EnumExists;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

        DB::transaction(function () use ($request) {

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
                    $this->updateAddress($contact, $request['primaryAddress'], 'visit', $request->projectId);
                }
                if (isset($request['primaryContactEnergySupplier']) && $request['primaryContactEnergySupplier'] != null ) {
                    $this->updateEnergySupplierToContact($contact, $request['primaryContactEnergySupplier']);
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
                    $this->updateAddress($contact, $request['visitAddress'], 'visit', $request->projectId);
                }
                if (isset($request['postalAddress'])) {
                    $this->updateAddress($contact, $request['postalAddress'], 'postal', null);
                }
                if (isset($request['invoiceAddress'])) {
                    $this->updateAddress($contact, $request['invoiceAddress'], 'invoice', null);
                }
                if (isset($request['primaryContactEnergySupplier']) && $request['primaryContactEnergySupplier'] != null ) {
                    $this->updateEnergySupplierToContact($contact, $request['primaryContactEnergySupplier']);
                }
            }

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
            $documentBody = DocumentHelper::getDocumentBody($contact, $project, $documentTemplate, [
                'amountOptioned' => $request->amountOptioned,
                'participationsOptioned' => $request->participationsOptioned,
                'transactionCostsAmount' => $request->transactionCostsAmount,
            ]);
        }
        return $documentBody;
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
            ->where('hide_when_not_matching_postal_check', '=', false)
            ->get();
        foreach ($projects as $key => $project) {
            $this->setContactProjectIndicators($project, $contact, $projects, $key);
        }
        return response()->json(ProjectRegister::collection($projects));
    }

    public function getContactProjectData(Contact $contact, Project $project)
    {
        $this->setContactProjectIndicators($project, $contact, null, 0);

        $belongsToMembershipGroup = in_array( $project->question_about_membership_group_id, $contact->getAllGroups() );

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
        $textLinkAgreeTermsMerged = str_replace('{voorwaarden_link}', "<a href='" . $project->link_agree_terms . "' target='_blank'>voorwaarden</a>", $textLinkAgreeTermsMerged);
        $textLinkAgreeTermsMerged = TemplateVariableHelper::replaceTemplateVariables($textLinkAgreeTermsMerged, 'contact', $contact);
        $textLinkAgreeTermsMerged = TemplateVariableHelper::replaceTemplateVariables($textLinkAgreeTermsMerged, 'ik', Auth::user());
        $textLinkAgreeTermsMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textLinkAgreeTermsMerged,'portal' );
        $textLinkAgreeTermsMerged = TemplateVariableHelper::replaceTemplatePortalVariables($textLinkAgreeTermsMerged,'contacten_portal' );
        $textLinkAgreeTermsMerged = TemplateVariableHelper::replaceTemplateCooperativeVariables($textLinkAgreeTermsMerged,'cooperatie' );

        $textLinkUnderstandInfoMerged = $project->text_link_understand_info;
        $textLinkUnderstandInfoMerged = str_replace('{project_informatie_link}', "<a href='" . $project->link_understand_info . "' target='_blank'>project informatie</a>", $textLinkUnderstandInfoMerged);
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

    protected function updatePerson($contact, Request $request)
    {
        $person = $contact->person;
        $personData = $request->person;
        if ($person) {
            if (!isset($personData['titleId']) || empty($personData['titleId']) || $personData['titleId'] == 'null' || $personData['titleId'] == 0 ) {
                $personData['titleId'] = null;
            }

            $lnp = $person->last_name_prefix;
            if (isset($personData['lastNamePrefixId']) ) {
                if ($personData['lastNamePrefixId'] == 'null' || $personData['lastNamePrefixId'] == 0) {
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

    protected function updateAddress($contact, $addressData, $addressType, $projectId)
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
        if (isset($addressData['id']))
        {
            $address = $contact->addresses->find($addressData['id']);
            if ($address)
            {
                if(empty($addressData['street']) && empty($addressData['postalCode']) && empty($addressData['city']) )
                {
                    $address->delete();
                }else{
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
    }

    protected function updateEnergySupplierToContact(Contact $contact, $primaryContactEnergySupplierData)
    {
        unset($primaryContactEnergySupplierData['energySupplier']);

        if($primaryContactEnergySupplierData['energySupplierId'] == ''){
            $primaryContactEnergySupplierData['energySupplierId'] = null;
        }
        if($primaryContactEnergySupplierData['memberSince'] == ''){
            $primaryContactEnergySupplierData['memberSince'] = null;
        }
        if (isset($primaryContactEnergySupplierData['id']))
        {
            $primaryContactEnergySupplierOld = $contact->contactEnergySuppliers->find($primaryContactEnergySupplierData['id']);
        }else{
            $primaryContactEnergySupplierOld = null;
        }

        if($primaryContactEnergySupplierData['energySupplierId'] != null)
        {
            $primaryContactEnergySupplierData['isCurrentSupplier'] = true;
            $primaryContactEnergySupplierData['contactEnergySupplyTypeId'] = 2;
            if(isset($primaryContactEnergySupplierData['eanGas']) && trim($primaryContactEnergySupplierData['eanGas']) != '' )
            {
                $primaryContactEnergySupplierData['contactEnergySupplyTypeId'] = 3;
            }

            Validator::make($primaryContactEnergySupplierData, [
                'contactEnergySupplyTypeId' => new EnumExists(ContactEnergySupplierType::class),
                'isCurrentSupplier' => 'boolean',
            ]);

            $primaryContactEnergySupplierData = $this->sanitizeData($primaryContactEnergySupplierData, [
                'contactEnergySupplyTypeId' => 'nullable',
                'isCurrentSupplier' => 'boolean',
            ]);

            if ($primaryContactEnergySupplierOld == null
                || $primaryContactEnergySupplierOld->energy_supplier_id != $primaryContactEnergySupplierData['energySupplierId']
                || $primaryContactEnergySupplierOld->es_number != $primaryContactEnergySupplierData['esNumber']
                || $primaryContactEnergySupplierOld->member_since != $primaryContactEnergySupplierData['memberSince']
                || $primaryContactEnergySupplierOld->ean_electricity != $primaryContactEnergySupplierData['eanElectricity']
                || $primaryContactEnergySupplierOld->ean_gas != $primaryContactEnergySupplierData['eanGas']
            ) {

                if ($primaryContactEnergySupplierOld != null)
                {
                    // primary contact energie supplier already exists
                    // make existing not primary and make a new primary
                    $primaryContactEnergySupplierOld->is_current_supplier = false;
                    $primaryContactEnergySupplierOld->save();
                }

                $primaryContactEnergySupplierNew = new ContactEnergySupplier($this->arrayKeysToSnakeCase($primaryContactEnergySupplierData));
                $primaryContactEnergySupplierNew->contact_id = $contact->id;
                $primaryContactEnergySupplierNew->save();


                //Make task note of changes
                $note = "Controleren wijziging energie leverancier gegevens:\n";
                if($primaryContactEnergySupplierOld != null && $primaryContactEnergySupplierOld->energy_supplier_id != $primaryContactEnergySupplierNew->energy_supplier_id){
                    $note = $note . "Oude leverancier: " . EnergySupplier::find($primaryContactEnergySupplierOld->energy_supplier_id)->name . "\n";
                }
                if( ($primaryContactEnergySupplierOld == null && $primaryContactEnergySupplierNew->energy_supplier_id != null) || ($primaryContactEnergySupplierOld != null && $primaryContactEnergySupplierOld->energy_supplier_id != $primaryContactEnergySupplierNew->energy_supplier_id)){
                    $note = $note . "Nieuwe leverancier:" . EnergySupplier::find($primaryContactEnergySupplierNew->energy_supplier_id)->name . "\n";
                }
                if($primaryContactEnergySupplierOld != null && $primaryContactEnergySupplierOld->es_number != $primaryContactEnergySupplierNew->es_number){
                    $note = $note . "Oude klantnummer: " . $primaryContactEnergySupplierOld->es_number . "\n";
                }
                if( ($primaryContactEnergySupplierOld == null && $primaryContactEnergySupplierNew->es_number != null) || ($primaryContactEnergySupplierOld != null && $primaryContactEnergySupplierOld->es_number != $primaryContactEnergySupplierNew->es_number)){
                    $note = $note . "Nieuwe klantnummer:" . $primaryContactEnergySupplierNew->es_number . "\n";
                }
                if($primaryContactEnergySupplierOld != null && $primaryContactEnergySupplierOld->member_since != $primaryContactEnergySupplierNew->member_since){
                    $note = $note . "Oude klant sinds: " . $primaryContactEnergySupplierOld->member_since . "\n";
                }
                if( ($primaryContactEnergySupplierOld == null && $primaryContactEnergySupplierNew->member_since != null) || ($primaryContactEnergySupplierOld != null && $primaryContactEnergySupplierOld->member_since != $primaryContactEnergySupplierNew->member_since)){
                    $note = $note . "Nieuwe klant sinds:" . $primaryContactEnergySupplierNew->member_since . "\n";
                }
                if($primaryContactEnergySupplierOld != null && $primaryContactEnergySupplierOld->ean_electricity != $primaryContactEnergySupplierNew->ean_electricity){
                    $note = $note . "Oude EAN electriciteit: " . $primaryContactEnergySupplierOld->ean_electricity . "\n";
                }
                if( ($primaryContactEnergySupplierOld == null && $primaryContactEnergySupplierNew->ean_electricity != null) || ($primaryContactEnergySupplierOld != null && $primaryContactEnergySupplierOld->ean_electricity != $primaryContactEnergySupplierNew->ean_electricity)){
                    $note = $note . "Nieuwe EAN electriciteit:" . $primaryContactEnergySupplierNew->ean_electricity . "\n";
                }
                if($primaryContactEnergySupplierOld != null && $primaryContactEnergySupplierOld->ean_gas != $primaryContactEnergySupplierNew->ean_gas){
                    $note = $note . "Oude EAN gas: " . $primaryContactEnergySupplierOld->ean_gas . "\n";
                }
                if( ($primaryContactEnergySupplierOld == null && $primaryContactEnergySupplierNew->ean_gas != null) || ($primaryContactEnergySupplierOld != null && $primaryContactEnergySupplierOld->ean_gas != $primaryContactEnergySupplierNew->ean_gas)){
                    $note = $note . "Nieuwe EAN gas:" . $primaryContactEnergySupplierNew->ean_gas . "\n";
                }

                $checkContactTaskResponsibleUserId = PortalSettings::get('checkContactTaskResponsibleUserId');
                $checkContactTaskResponsibleTeamId = PortalSettings::get('checkContactTaskResponsibleTeamId');
                $taskTypeForPortal = TaskType::where('default_portal_task_type', true)->first();

                if($taskTypeForPortal) {
                    $newTask = new Task();
                    $newTask->note = $note;
                    $newTask->type_id = $taskTypeForPortal->id;
                    $newTask->contact_id = $contact->id;
                    $newTask->responsible_user_id = !empty($checkContactTaskResponsibleUserId) ? $checkContactTaskResponsibleUserId : null;
                    $newTask->responsible_team_id = !empty($checkContactTaskResponsibleTeamId) ? $checkContactTaskResponsibleTeamId : null;
                    $newTask->date_planned_start = Carbon::today();

                    $newTask->save();
                }


            }
        }

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
        }
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
            $query->WhereHas('participantsProject', function($query2) use($contactId){
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
        $project->allowChangeParticipation = false;
        $project->allowPayMollie = false;
        $project->econobisPaymentLink = '';
        $project->allowRegisterToProject = false;
        $project->textNotAllowedRegisterToProject = '';
        $project->participationsOptioned = 0;
        $project->amountOptioned = 0;
        $project->powerKwhConsumption = 0;

        $previousParticipantProject = $contact->participations()->where('project_id', $project->id)->first();
        // Is there allready a participation for this contact/project ?
        if ($previousParticipantProject) {
            $project->hasParticipation = true;
            $project->participationsOptioned = $previousParticipantProject->participations_optioned;
            $project->amountOptioned = $previousParticipantProject->amount_optioned;
            $project->powerKwhConsumption = $previousParticipantProject->power_kwh_consumption;
            $previousMutation = optional(optional($previousParticipantProject)->mutations())->first(); // Pakken de eerste mutatie, er zou er altijd maar een moeten zijn op dit moment.

            /* If mollie is used and there was a first mutation with status option and isn't paid by mollie yet, then:
               - allow change of option participation
               - allow to pay for mollie (still open)
               - return also the econobisPaymentLink to pay with mollie */
            if ($project->uses_mollie && $previousMutation && !$previousMutation->is_paid_by_mollie && $previousMutation->status->code_ref === 'option') {
                $project->allowChangeParticipation = true;
                $project->allowPayMollie = true;
                $project->econobisPaymentLink = $previousMutation->econobis_payment_link;
            }

        // no participation for this contact/project yet
        } else {

            // no membership required, then allow register to project
            if (!$project->is_membership_required) {
                $project->allowRegisterToProject = true;

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
                    }else{
                        // Contact not a member, still show project, but don't allow register to project, and put info text in textfield not allowed register to project.
                        $project->textNotAllowedRegisterToProject = $project->text_info_project_only_members;
                    }
                }
                // no linked contactgroups available, then don't show project
            }

            // if check postalcode link and project is sce or pcr project and register to project was still allowed at this moment
            if($project->check_postalcode_link && $project->isSceOrPcrProject && $project->allowRegisterToProject) {
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
                        $project->allowRegisterToProject = false;
                        $project->textNotAllowedRegisterToProject = implode(';', $addressHelper->messages);
                        return false;
                    }
                }
            }

            // if to check double addresses (not allowed) and register to project was still allowed at this moment
            if($project->check_double_addresses && $project->allowRegisterToProject) {

                $address = null;
                // PERSON
                if ($contact->type_id == ContactType::PERSON) {
                    $address = $contact->primaryAddress;
                }
                // ORGANISATION, use visit address
                if ($contact->type_id == ContactType::ORGANISATION) {
                    $address = Address::where('contact_id', $contact->id)->where('type_id', 'visit')->first();
                }
                $addressHelper = new AddressHelper($contact, $address);
                $addressIsDouble = $addressHelper->checkDoubleAddress($project);
                if($addressIsDouble){
                    $project->allowRegisterToProject = false;
                    $project->textNotAllowedRegisterToProject = 'Er is al een deelnemer ingeschreven op dit adres die meedoet aan een SCE project.';
                }

            }

        }
    }

}