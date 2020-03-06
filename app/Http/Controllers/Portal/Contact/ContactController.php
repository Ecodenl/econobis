<?php


namespace App\Http\Controllers\Portal\Contact;


use App\Eco\Address\Address;
use App\Eco\Address\AddressType;
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
use App\Eco\Task\Task;
use App\Eco\User\User;
use App\Helpers\Document\DocumentHelper;
use App\Helpers\Settings\PortalSettings;
use App\Http\Controllers\Api\ApiController;
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

        Auth::setUser(User::find($responsibleUserId));

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
                    $this->updateAddress($contact, $request['primaryAddress'], 'invoice');
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
                    $this->updateAddress($contact, $request['visitAddress'], 'visit');
                }
                if (isset($request['postalAddress'])) {
                    $this->updateAddress($contact, $request['postalAddress'], 'postal');
                }
                if (isset($request['invoiceAddress'])) {
                    $this->updateAddress($contact, $request['invoiceAddress'], 'invoice');
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
            $documentBody = DocumentHelper::getDocumentBody($contact, $project, $documentTemplate, $request);
        }
        return $documentBody;
    }

    protected function updatePerson($contact, Request $request)
    {
        $person = $contact->person;
        $personData = $request->person;
        if ($person) {
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
            }
            $phoneNumberPrimary->save();
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

    protected function updateAddress($contact, $addressData, $addressType)
    {
        unset($addressData['country']);
        if($addressData['countryId'] == ''){
            $addressData['countryId'] = null;
        }
        if($addressData['number'] == ''){
            $addressData['number'] = null;
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
                    $address->save();
                }
            }

        }else{
            if(!empty($addressData['street']) && !empty($addressData['postalCode']) && !empty($addressData['city'])) {
                $addressData['typeId'] = $addressType;
                $addressData['primary'] = true;

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

                $newTask = new Task();
                $newTask->note = $note;
                $newTask->type_id = 15;
                $newTask->contact_id = $contact->id;
                $newTask->responsible_user_id = !empty($checkContactTaskResponsibleUserId) ? $checkContactTaskResponsibleUserId : null;
                $newTask->responsible_team_id = !empty($checkContactTaskResponsibleTeamId) ? $checkContactTaskResponsibleTeamId : null;
                $newTask->date_planned_start = Carbon::today();

                $newTask->save();


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

        $newTask = new Task();
        $newTask->note = $note;
        $newTask->type_id = 15;
        $newTask->contact_id = $contact->id;
        $newTask->responsible_user_id = !empty($checkContactTaskResponsibleUserId) ? $checkContactTaskResponsibleUserId
            : null;
        $newTask->responsible_team_id = !empty($checkContactTaskResponsibleTeamId) ? $checkContactTaskResponsibleTeamId
            : null;
        $newTask->date_planned_start = Carbon::today();

        $newTask->save();
    }

}