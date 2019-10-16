<?php


namespace App\Http\Controllers\Portal\Contact;


use App\Eco\Address\Address;
use App\Eco\Address\AddressType;
use App\Eco\Contact\Contact;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EmailAddress\EmailAddressType;
use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\PhoneNumber\PhoneNumberType;
use App\Eco\Project\Project;
use App\Eco\User\User;
use App\Helpers\Document\DocumentHelper;
use App\Helpers\Settings\PortalSettings;
use App\Http\Controllers\Api\ApiController;
use App\Rules\EnumExists;
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

            $contactData = $request->validate([
                'iban' => '',
                'ibanAttn' => '',
                'didAgreeAvg' => 'boolean',
                'dateDidAgreeAvg' => 'date',
            ]);

            $contact->fill($this->arrayKeysToSnakeCase($contactData));
            $contact->save();

            // PERSON
            if ($request->typeId == 'person') {

                $this->updatePerson($contact, $request);
                $this->updateEmailCorrespondence($contact, $request);
                $this->updateEmailInvoice($contact, $request);
                $this->updatePhoneNumberPrimary($contact, $request);
                $this->updatePhoneNumberTwo($contact, $request);
                if (isset($request['primaryAddress'])) {
                    $this->updateAddress($contact, $request['primaryAddress']);
                }

            }

            // ORGANISATION
            if ($request->typeId == 'organisation') {

                $this->updateOrganisation($contact, $request);
                $this->updateEmailCorrespondence($contact, $request);
                $this->updateEmailInvoice($contact, $request);
                $this->updatePhoneNumberPrimary($contact, $request);
                $this->updatePhoneNumberTwo($contact, $request);
                if (isset($request['visitAddress'])) {
                    $this->updateAddress($contact, $request['visitAddress']);
                }
                if (isset($request['postalAddress'])) {
                    $this->updateAddress($contact, $request['postalAddress']);
                }
                if (isset($request['invoiceAddress'])) {
                    $this->updateAddress($contact, $request['invoiceAddress']);
                }
            }

        });

        // todo wellicht moeten we hier nog wat op anders verzinnen, voor nu hebben we responisibleUserId from settings.json tijdelijk in Auth user gezet hierboven
        // Voor zekerheid hierna weer even Auth user herstellen met portal user
        Auth::setUser($portalUser);

    }

    public function previewDocument(Contact $contact, Project $project, Request $request)
    {
        return DocumentHelper::getDocumentBody($contact, $project);
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
                    $emailInvoice->fill($this->arrayKeysToSnakeCase($emailInvoiceData));
                }

            } else {
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
            }
            $emailInvoice->save();
        }

    }

    protected function updatePhoneNumberPrimary($contact, Request $request)
    {
        if (isset($request['phoneNumberPrimary'])) {
            $phoneNumberPrimaryData = $request['phoneNumberPrimary'];
            if (isset($phoneNumberPrimaryData['id'])) {
                $phoneNumberPrimary = $contact->phoneNumbers->find($phoneNumberPrimaryData['id']);
                if ($phoneNumberPrimary) {
                    $phoneNumberPrimary->fill($this->arrayKeysToSnakeCase($phoneNumberPrimaryData));
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
                    $phoneNumberTwo->fill($this->arrayKeysToSnakeCase($phoneNumberTwoData));
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
            }
            $phoneNumberTwo->save();
        }

    }

    protected function updateAddress($contact, $addressData)
    {
        if (isset($addressData['id']))
        {
            $primaryAddress
                = $contact->addresses->find($addressData['id']);
            if ($primaryAddress)
            {
                $primaryAddress->fill($this->arrayKeysToSnakeCase($addressData));
            }

        }else{
            $addressData['typeId'] = 'invoice';
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

            $primaryAddress = new Address($this->arrayKeysToSnakeCase($addressData));
            $primaryAddress->contact_id = $contact->id;
        }
        $primaryAddress->save();
    }

}