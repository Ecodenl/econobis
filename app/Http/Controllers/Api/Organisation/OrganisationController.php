<?php

namespace App\Http\Controllers\Api\Organisation;

use App\Eco\Address\Address;
use App\Eco\Address\AddressType;
use App\Eco\Administration\Administration;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EmailAddress\EmailAddressType;
use App\Eco\Organisation\Organisation;
use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactStatus;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\PhoneNumber\PhoneNumberType;
use App\Helpers\Twinfield\TwinfieldCustomerHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\Contact\ContactController;
use App\Http\Resources\Organisation\OrganisationPeek;
use App\Rules\EnumExists;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrganisationController extends ApiController
{

    public function store(Request $request)
    {
        $this->authorize('create', Organisation::class);

        Validator::make($request['organisation'],
            [
                'ownerId' => 'exists:users,id',
                'didAgreeAvg' => 'boolean',
                'inspectionPersonTypeId' => 'string',
                'iban' => '',
                'ibanAttn' => '',
                'typeId' => 'exists:organisation_types,id',
                'name' => '',
                'statutoryName' => '',
                'website' => '',
                'chamberOfCommerceNumber' => '',
                'vatNumber' => '',
                'industryId' => 'exists:industries,id',
                'squareMeters' => 'integer',
            ]);

        $contactData = $this->sanitizeData($request['organisation'], [
            'ownerId' => 'nullable',
            'inspectionPersonTypeId' => 'nullable',
            'liable' => 'boolean',
            'typeId' => 'nullable',
            'industryId' => 'nullable',
            'squareMeters' => 'integer',
        ]);

        $contactData = $this->arrayKeysToSnakeCase($contactData);
        $contactArray =
            [
                'iban' => $contactData['iban'],
                'iban_attn' => $contactData['iban_attn'],
                'owner_id' => $contactData['owner_id'],
                'did_agree_avg' => $contactData['did_agree_avg'],
                'inspection_person_type_id' => isset($contactData['inspection_person_type_id']) ? $contactData['inspection_person_type_id'] : null,
            ];

        $organisationArray =
            [
                'name' => $contactData['name'],
                'statutory_name' => $contactData['statutory_name'],
                'website' => $contactData['website'],
                'chamber_of_commerce_number' => $contactData['chamber_of_commerce_number'],
                'vat_number' => $contactData['vat_number'],
            ];

        $contact = new Contact($contactArray);

        $organisation = new Organisation($organisationArray);

        $emailAddress = null;
        $address = null;
        $phoneNumber = null;

        if ($request['emailAddress']['email']) {
            Validator::make($request['emailAddress'], [
                'typeId' => new EnumExists(EmailAddressType::class),
                'email' => '',
                'primary' => 'boolean',
            ]);

            $data = $this->sanitizeData($request['emailAddress'], [
                'typeId' => 'nullable',
                'primary' => 'boolean',
            ]);

            $emailAddress
                = new EmailAddress($this->arrayKeysToSnakeCase($data));
        }

        if ($request['address']['postalCode']) {
            Validator::make($request['address'], [
                'countryId' => 'nullable|exists:countries,id',
                'typeId' => new EnumExists(AddressType::class),
                'street' => '',
                'number' => 'integer',
                'addition' => 'string',
                'city' => '',
                'postalCode' => '',
                'primary' => 'boolean',
            ]);

            $data = $this->sanitizeData($request['address'], [
                'typeId' => 'nullable',
                'countryId' => 'nullable',
                'primary' => 'boolean',
            ]);

            if(preg_match('/^\d{4}\s[A-Za-z]{2}$/', $data['postalCode'])){
                $data['postalCode'] = preg_replace('/\s+/', '', $data['postalCode']);
            }

            $address = new Address($this->arrayKeysToSnakeCase($data));

        }

        if ($request['phoneNumber']['number']) {
            Validator::make($request['phoneNumber'], [
                'typeId' => new EnumExists(PhoneNumberType::class),
                'number' => '',
                'primary' => 'boolean',
            ]);

            $data = $this->sanitizeData($request['phoneNumber'], [
                'typeId' => 'nullable',
                'primary' => 'boolean',
            ]);
            $phoneNumber = new PhoneNumber($this->arrayKeysToSnakeCase($data));

        }

        DB::transaction(function () use ($organisation, $contact, $emailAddress, $address, $phoneNumber) {
            $contact->save();
            $organisation->contact_id = $contact->id;
            $organisation->save();
            if($emailAddress) {
                $emailAddress->contact_id = $contact->id;
                $this->authorize('create', $emailAddress);
                $emailAddress->save();
            }
            if($address) {
                $address->contact_id = $contact->id;
                $this->authorize('create', $address);
                $address->save();
            }
            if($phoneNumber) {
                $phoneNumber->contact_id = $contact->id;
                $this->authorize('create', $phoneNumber);
                $phoneNumber->save();
            }
        });

        // Contact exact zo teruggeven als bij het openen van een bestaand contact
        // Dus kan hier gebruik maken van bestaande controller
        return (new ContactController())->show($contact->fresh(), $request);
    }

    public function update(Request $request, Organisation $organisation)
    {
        $this->authorize('update', $organisation);

        $contactData = $request->validate([
            'inspectionPersonTypeId' => 'string',
            'iban' => '',
            'ibanAttn' => '',
            'liable' => 'boolean',
            'liabilityAmount' => 'numeric',
            'didAgreeAvg' => 'boolean',
            'isCollectMandate' => 'boolean',
            'collectMandateCode' => '',
            'collectMandateSignatureDate' => 'date',
            'collectMandateFirstRunDate' => 'date',
            'collectMandateCollectionSchema' => '',
        ]);

        $organisationData = $request->validate([
            'typeId' => 'exists:organisation_types,id',
            'name' => '',
            'statutoryName' => '',
            'website' => '',
            'chamberOfCommerceNumber' => '',
            'vatNumber' => '',
            'industryId' => 'exists:industries,id',
            'squareMeters' => 'integer',
        ]);

        $contactData = $this->sanitizeData($contactData, [
            'ownerId' => 'nullable',
            'inspectionPersonTypeId' => 'nullable',
            'liable' => 'boolean',
            'isCollectMandate' => 'boolean',
            'collectMandateSignatureDate' => 'nullable',
            'collectMandateFirstRunDate' => 'nullable',
        ]);

        $contact = $organisation->contact;

        if(isset($contactData['iban']) && $contact->iban != $contactData['iban']) $this->authorize('updateIban', $contact);

        $contact->fill($this->arrayKeysToSnakeCase($contactData));
        $contact->inspection_person_type_id = isset($contactData['inspection_person_type_id']) ? $contactData['inspection_person_type_id'] : null;

        $contact->save();

        $organisationData = $this->sanitizeData($organisationData, [
            'typeId' => 'nullable',
            'industryId' => 'nullable',
            'squareMeters' => 'integer',
        ]);
        $organisation->fill($this->arrayKeysToSnakeCase($organisationData));
        $organisation->save();

        // Twinfield customer hoeven we vanuit hier (contact) alleen bij te werken als er een koppeling is.
        // Nieuw aanmaken gebeurt vooralsnog alleen vanuit synchroniseren notas
        if($contact->twinfieldNumbers())
        {
            $messages = [];
            foreach (Administration::where('twinfield_is_valid', 1)->where('uses_twinfield', 1)->get() as $administration) {

                $twinfieldCustomerHelper = new TwinfieldCustomerHelper($administration, null);
                $customer = $twinfieldCustomerHelper->updateCustomer($contact);
                if($twinfieldCustomerHelper->messages)
                {
                    $messages = array_merge($messages, $twinfieldCustomerHelper->messages);
                }
            }
            if( !empty($messages) )
            {
                // we use response status code 412 for Twinfield messages
                abort(412, implode(';', $messages));
            }
        }
        // Contact exact zo teruggeven als bij het openen van een bestaand contact
        // Dus kan hier gebruik maken van bestaande controller
        return (new ContactController())->show($contact->fresh(), $request);
    }

    public function peek(Request $request)
    {
        $organisations = Organisation::orderBy('name', 'asc')->get();

        return OrganisationPeek::collection($organisations);
    }
}
