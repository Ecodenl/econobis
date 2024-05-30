<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Person;


use App\Eco\Address\Address;
use App\Eco\Address\AddressType;
use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EmailAddress\EmailAddressType;
use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Eco\Person\Person;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\PhoneNumber\PhoneNumberType;
use App\Helpers\Twinfield\TwinfieldCustomerHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\Contact\ContactController;
use App\Http\Resources\Person\PersonPeek;
use App\Rules\EnumExists;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PersonController extends ApiController
{

    public function store(Request $request)
    {
        $this->authorize('create', Person::class);

        Validator::make($request['person'],
            [
                'ownerId' => 'exists:users,id',
                'didAgreeAvg' => 'boolean',
                'inspectionPersonTypeId' => 'string',
                'initials' => '',
                'firstName' => '',
                'lastName' => '',
                'lastNamePrefixId' => 'exists:last_name_prefixes,id',
                'titleId' => 'exists:titles,id',
                'dateOfBirth' => 'date',
                'hoomAccountId' => '',
            ]);

        $contactData = $this->sanitizeData($request['person'], [
            'statusId' => 'nullable',
            'ownerId' => 'nullable',
            'inspectionPersonTypeId' => 'nullable',
            'liable' => 'boolean',
            'lastNamePrefixId' => 'nullable',
            'titleId' => 'nullable',
            'typeId' => 'nullable',
            'dateOfBirth' => 'nullable',
            'hoomAccountId' => 'nullable',
        ]);

        $contactData = $this->arrayKeysToSnakeCase($contactData);

        $contactArray =
            [
                'owner_id' => $contactData['owner_id'],
                'did_agree_avg' => $contactData['did_agree_avg'],
                'inspection_person_type_id' => $contactData['inspection_person_type_id'],
                'hoom_account_id' => $contactData['hoom_account_id'],
            ];

        $lnp = null;
        if(isset($contactData['last_name_prefix_id']) && $contactData['last_name_prefix_id']){
            $lnp = LastNamePrefix::where('id', $contactData['last_name_prefix_id'])->pluck('name')[0];
        }

        $personArray =
            [
                'initials' => $contactData['initials'],
                'first_name' => $contactData['first_name'],
                'last_name' => $contactData['last_name'],
                'last_name_prefix' => $lnp,
                'title_id' => $contactData['title_id'],
                'date_of_birth' => $contactData['date_of_birth'],
            ];

        $contact = new Contact($contactArray);
        $person = new Person($personArray);
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

        if($request->input('checkDuplicates')) {
            //check for duplicates lastname + postal_code + house number + house number addition
            if ($address) {
                $exists = DB::table('contacts')
                    ->join('people', 'contacts.id', '=', 'people.contact_id')
                    ->join('addresses', 'contacts.id', '=',
                        'addresses.contact_id')
                    ->where('people.last_name', $person->last_name)
                    ->where('addresses.number', $address->number)
                    ->where('addresses.addition', $address->addition)
                    ->where('addresses.postal_code', str_replace(' ','',$address->postal_code))
                    ->whereNull('contacts.deleted_at');
                if ($exists->count() == 1) {
                    return response()->json([ 'error' => 409, 'message' => 'Contact met achternaam ' . $person->last_name . ' en postcode ' . $address->postal_code . ' en huisnummer ' . $address->number . ' en huisnummertoevoeging ' . $address->addition . ' bestaat al.', 'contactId' =>  $exists->first()->contact_id, 'cancelButtonText' => 'Annuleer en ga naar bestaand contact'], 409);
                } else if ($exists->count() > 1) {
                    $duplicateContactsList = "";
                    foreach($exists->get() as $contact) {
                        $duplicateContactsList .= "<br><br>" . $contact->number . " : " . $contact->full_name;
                    }

                    return response()->json([ 'error' => 409, 'message' => 'Contact met achternaam ' . $person->last_name . ' en postcode ' . $address->postal_code . ' en huisnummer ' . $address->number . ' en huisnummertoevoeging ' . $address->addition . ' bestaat al: ' . $duplicateContactsList, 'contactId' =>  '', 'cancelButtonText' => 'Annuleer'], 409);
                }
            }

            //check for duplicates postal_code + house number + house number addition
            if ($address) {
                $exists = DB::table('contacts')
                    ->join('people', 'contacts.id', '=', 'people.contact_id')
                    ->join('addresses', 'contacts.id', '=',
                        'addresses.contact_id')
                    ->where('addresses.number', $address->number)
                    ->where('addresses.addition', $address->addition)
                    ->where('addresses.postal_code', str_replace(' ','',$address->postal_code))
                    ->whereNull('contacts.deleted_at');
                if ($exists->count() == 1) {
                    return response()->json([ 'error' => 409, 'message' => 'Contact met postcode ' . $address->postal_code . ' en huisnummer ' . $address->number . ' en huisnummertoevoeging ' . $address->addition . ' maar andere achternaam bestaat al.', 'contactId' =>  $exists->first()->contact_id, 'cancelButtonText' => 'Annuleer en ga naar bestaand contact'], 409);
                } else if ($exists->count() > 1) {
                    $duplicateContactsList = "";
                    foreach($exists->get() as $contact) {
                        $duplicateContactsList .= "<br><br>" . $contact->number . " : " . $contact->full_name;
                    }

                    return response()->json([ 'error' => 409, 'message' => 'Contact met postcode ' . $address->postal_code . ' en huisnummer ' . $address->number . ' en huisnummertoevoeging ' . $address->addition . ' maar andere achternaam bestaat al: ' . $duplicateContactsList, 'contactId' =>  '', 'cancelButtonText' => 'Annuleer'], 409);
                }
            }

            //check for duplicates lastname + email
            if ($emailAddress) {
                $exists = DB::table('contacts')
                    ->join('people', 'contacts.id', '=', 'people.contact_id')
                    ->join('email_addresses', 'contacts.id', '=',
                        'email_addresses.contact_id')
                    ->where('people.last_name', $person->last_name)
                    ->where('email_addresses.email', $emailAddress->email)
                    ->whereNull('contacts.deleted_at');
                if ($exists->count() == 1) {
                    return response()->json([ 'error' => 409, 'message' => 'Contact met achternaam ' . $person->last_name . ' en e-mail ' . $emailAddress->email . ' bestaat al.', 'contactId' =>  $exists->first()->contact_id, 'cancelButtonText' => 'Annuleer en ga naar bestaand contact'], 409);
                } else if ($exists->count() > 1) {
                    $duplicateContactsList = "";
                    foreach($exists->get() as $contact) {
                        $duplicateContactsList .= "<br><br>" . $contact->number . " : " . $contact->full_name;
                    }

                    return response()->json([ 'error' => 409, 'message' => 'Contact met achternaam ' . $person->last_name . ' en e-mail ' . $emailAddress->email . ' bestaat al:' . $duplicateContactsList, 'contactId' =>  '', 'cancelButtonText' => 'Annuleer'], 409);
                }

                //now we just check for the email
                $exists = DB::table('contacts')
                    ->join('email_addresses', 'contacts.id', '=',
                        'email_addresses.contact_id')
                    ->where('email_addresses.email', $emailAddress->email)
                    ->whereNull('contacts.deleted_at');
                if ($exists->count() == 1) {
                    $duplicateContact = $exists->first();
                    return response()->json([ 'error' => 409, 'message' => 'Er is al een contact met e-mail ' . $emailAddress->email . '. De naam van dit contact is ' . $duplicateContact->full_name, 'contactId' =>  $exists->first()->contact_id, 'cancelButtonText' => 'Annuleer en ga naar bestaand contact'], 409);
                } else if ($exists->count() > 1) {
                    $duplicateContactsList = "";
                    foreach($exists->get() as $contact) {
                        $duplicateContactsList .= "<br><br>" . $contact->number . " : " . $contact->full_name;
                    }

                    return response()->json([ 'error' => 409, 'message' => 'Contact met e-mail ' . $emailAddress->email . ' bestaat al:' . $duplicateContactsList, 'contactId' =>  '', 'cancelButtonText' => 'Annuleer'], 409);
                }
            }
        }


        DB::transaction(function () use ($person, $contact, $emailAddress, $address, $phoneNumber) {
            $contact->save();
            $person->contact_id = $contact->id;
            $person->save();
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

    public function update(Request $request, Person $person)
    {
        $this->authorize('update', $person);

        $contactData = $request->validate([
            'memberSince' => 'date',
            'memberUntil' => 'date',
            'iban' => '',
            'ibanAttn' => '',
            'liable' => 'boolean',
            'liabilityAmount' => 'numeric',
            'ownerId' => 'exists:users,id',
            'didAgreeAvg' => 'boolean',
            'inspectionPersonTypeId' => 'string',
            'isCollectMandate' => 'boolean',
            'collectMandateCode' => '',
            'collectMandateSignatureDate' => 'date',
            'collectMandateFirstRunDate' => 'date',
            'collectMandateCollectionSchema' => '',
            'hoomAccountId' => '',
        ]);

        $personData = $request->validate([
            'initials' => '',
            'firstName' => '',
            'lastName' => '',
            'lastNamePrefixId' => '',
            'titleId' => 'exists:titles,id',
            'organisationId' => 'exists:organisations,id',
            'typeId' => 'exists:person_types,id',
            'dateOfBirth' => 'date',
            'firstNamePartner' => '',
            'lastNamePartner' => '',
            'dateOfBirthPartner' => 'date',
            'primary' => 'boolean',
            'occupationId' => 'exists:occupations,id',
        ]);

        $contact = $person->contact;

        $contactData = $this->sanitizeData($contactData, [
            'statusId' => 'nullable',
            'ownerId' => 'nullable',
            'inspectionPersonTypeId' => 'nullable',
            'memberSince' => 'nullable',
            'memberUntil' => 'nullable',
            'liable' => 'boolean',
            'isCollectMandate' => 'boolean',
            'collectMandateSignatureDate' => 'nullable',
            'collectMandateFirstRunDate' => 'nullable',
            'hoomAccountId'=> 'nullable',
        ]);

        if(isset($contactData['iban']) && $contact->iban != $contactData['iban']) $this->authorize('updateIban', $contact);

        if(isset($contactData['liabilityAmount'])){
        $contactData['liabilityAmount'] != ''
            ?: $contactData['liabilityAmount'] = 0;
        }
        
        $contact->fill($this->arrayKeysToSnakeCase($contactData));
        $contact->save();

        $personData = $this->sanitizeData($personData, [
            'lastNamePrefixId' => 'nullable',
            'titleId' => 'nullable',
            'organisationId' => 'nullable',
            'typeId' => 'nullable',
            'dateOfBirth' => 'nullable',
            'dateOfBirthPartner' => 'nullable',
            'primary' => 'boolean',
            'occupationId' => 'nullable',
        ]);

        $lnp = $person->last_name_prefix;
        if(isset($personData['lastNamePrefixId']) && $personData['lastNamePrefixId']){
            if($personData['lastNamePrefixId'] === 'null') {
                $lnp = '';
            }
            else{
                $lnp = LastNamePrefix::where('id', $personData['lastNamePrefixId'])->pluck('name')[0];
            }
        }

        $personData['lastNamePrefix'] = $lnp;
        unset($personData['lastNamePrefixId']);

        $person->fill($this->arrayKeysToSnakeCase($personData));
        $person->save();

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

    public function peek()
    {
        $people = Person::all();

        return PersonPeek::collection($people);
    }
}