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
use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactStatus;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EmailAddress\EmailAddressType;
use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Eco\Person\Person;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\PhoneNumber\PhoneNumberType;
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
                'statusId' => new EnumExists(ContactStatus::class),
                'memberSince' => 'date',
                'memberUntil' => 'date',
                'newsletter' => 'boolean',
                'ownerId' => 'exists:users,id',
                'didAgreeAvg' => 'boolean',
                'initials' => '',
                'firstName' => '',
                'lastName' => '',
                'lastNamePrefixId' => 'exists:last_name_prefixes,id',
                'titleId' => 'exists:titles,id',
                'typeId' => 'exists:person_types,id',
                'dateOfBirth' => 'date',
            ]);

        $contactData = $this->sanitizeData($request['person'], [
            'statusId' => 'nullable',
            'memberSince' => 'nullable',
            'memberUntil' => 'nullable',
            'newsletter' => 'boolean',
            'ownerId' => 'nullable',
            'liable' => 'boolean',
            'lastNamePrefixId' => 'nullable',
            'titleId' => 'nullable',
            'typeId' => 'nullable',
            'dateOfBirth' => 'nullable',
        ]);

        $contactData = $this->arrayKeysToSnakeCase($contactData);

        $contactArray =
            [
                'status_id' => $contactData['status_id'],
                'member_since' => $contactData['member_since'],
                'member_until' => $contactData['member_until'],
                'newsletter' => $contactData['newsletter'],
                'owner_id' => $contactData['owner_id'],
                'did_agree_avg' => $contactData['did_agree_avg'],
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
                'type_id' => $contactData['type_id'],
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

        if ($request['address']['street']) {
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
            //check for duplicates lastname + postal_code + house number
            if ($address) {
                $exists = DB::table('contacts')
                    ->join('people', 'contacts.id', '=', 'people.contact_id')
                    ->join('addresses', 'contacts.id', '=',
                        'addresses.contact_id')
                    ->where('people.last_name', $person->last_name)
                    ->where('addresses.number', $address->number)
                    ->where('addresses.postal_code', $address->postal_code)
                    ->exists();
                if ($exists) {
                    abort(409, 'Contact met achternaam ' . $person->last_name
                        . ' en postcode ' . $address->postal_code
                        . ' en huisnummer ' . $address->number
                        . ' bestaat al.');
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
                    ->exists();
                if ($exists) {
                    abort(409, 'Contact met achternaam ' . $person->last_name
                        . ' en e-mail ' . $emailAddress->email
                        . ' bestaat al.');
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
            'statusId' => new EnumExists(ContactStatus::class),
            'memberSince' => 'date',
            'memberUntil' => 'date',
            'newsletter' => 'boolean',
            'iban' => '',
            'ibanAttn' => '',
            'liable' => 'boolean',
            'liabilityAmount' => 'numeric',
            'ownerId' => 'exists:users,id',
            'didAgreeAvg' => 'boolean',
        ]);

        $personData = $request->validate([
            'initials' => '',
            'firstName' => '',
            'lastName' => '',
            'lastNamePrefixId' => 'exists:last_name_prefixes,id',
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
            'memberSince' => 'nullable',
            'memberUntil' => 'nullable',
            'newsletter' => 'boolean',
            'liable' => 'boolean',
        ]);

        if(array_key_exists('iban', $contactData) && $contact->iban != $contactData['iban']) $this->authorize('updateIban', $contact);

        if(array_key_exists('liabilityAmount', $contactData)){
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
            $lnp = LastNamePrefix::where('id', $personData['lastNamePrefixId'])->pluck('name')[0];
        }

        $personData['lastNamePrefix'] = $lnp;
        unset($personData['lastNamePrefixId']);

        $person->fill($this->arrayKeysToSnakeCase($personData));
        $person->save();

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