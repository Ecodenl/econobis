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
use App\Eco\Contact\ContactType;
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
use Illuminate\Support\Str;

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

            //check for duplicates (lastname) + address
            if ($conflict = $this->findDuplicateAddressConflict($person, $address)) {
                if ($conflict['count'] === 1) {
                    $msg = $conflict['type'] === 'same_name'
                        ? "Contact met achternaam {$person->last_name} en postcode {$address->postal_code} en huisnummer {$address->number} en huisnummertoevoeging {$address->addition} bestaat al."
                        : "Contact met postcode {$address->postal_code} en huisnummer {$address->number} en huisnummertoevoeging {$address->addition} maar andere achternaam bestaat al.";

                    return response()->json([
                        'error' => 409,
                        'message' => $msg,
                        'contactId' => $conflict['contactId'],
                        'cancelButtonText' => $conflict['cancel'],
                    ], 409);
                }

                $msg = $conflict['type'] === 'same_name'
                    ? "Contact met achternaam {$person->last_name} en postcode {$address->postal_code} en huisnummer {$address->number} en huisnummertoevoeging {$address->addition} bestaat al: {$conflict['list']}"
                    : "Contact met postcode {$address->postal_code} en huisnummer {$address->number} en huisnummertoevoeging {$address->addition} maar andere achternaam bestaat al: {$conflict['list']}";

                return response()->json([
                    'error' => 409,
                    'message' => $msg,
                    'contactId' => '',
                    'cancelButtonText' => $conflict['cancel'],
                ], 409);
            }

            //check for duplicates lastname + email
            if ($conflict = $this->findDuplicateEmailAddressConflict($person, $emailAddress)) {
                if ($conflict['count'] === 1) {
                    $msg = $conflict['kind'] === 'name_and_email'
                        ? "Contact met achternaam {$person->last_name} en e-mail {$emailAddress->email} bestaat al."
                        : "Er is al een contact met e-mail {$emailAddress->email}.";
                    return response()->json([
                        'error' => 409,
                        'message' => $msg,
                        'contactId' => $conflict['contactId'],
                        'cancelButtonText' => $conflict['kind'] === 'name_and_email'
                            ? 'Annuleer en ga naar bestaand contact'
                            : 'Annuleer en ga naar bestaand contact',
                    ], 409);
                }

                // Meerdere
                $msg = $conflict['kind'] === 'name_and_email'
                    ? "Contact met achternaam {$person->last_name} en e-mail {$emailAddress->email} bestaat al: {$conflict['list']}"
                    : "Contact met e-mail {$emailAddress->email} bestaat al: {$conflict['list']}";

                return response()->json([
                    'error' => 409,
                    'message' => $msg,
                    'contactId' => '',
                    'cancelButtonText' => 'Annuleer',
                ], 409);
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

    private function findDuplicateAddressConflict($person, $address): ?array
    {
        if (!$address) return null;

        $byAddress = Contact::query()
            ->whereHas('addresses', fn($q) => $q
                ->where('number', $address->number)
                ->where('addition', $address->addition)
                ->where('postal_code', $address->postal_code)
            );

        $cases = [
            ['op' => '=',   'single' => 'same_name',  'cancel' => 'Annuleer en ga naar bestaand contact'],
            ['op' => '<>',  'single' => 'other_name', 'cancel' => 'Annuleer'],
        ];

        foreach ($cases as $case) {
            $probe = (clone $byAddress)
                ->whereHas('person', fn($q) => $q->where('last_name', $case['op'], $person->last_name))
                ->limit(2)->pluck('id');

            if ($probe->count() === 1) {
                return [
                    'type' => $case['single'], // 'same_name' | 'other_name'
                    'count' => 1,
                    'contactId' => $probe->first(),
                    'cancel' => $case['cancel'],
                ];
            }

            if ($probe->count() > 1) {
                $dups = (clone $byAddress)
                    ->whereHas('person', fn($q) => $q->where('last_name', $case['op'], $person->last_name))
                    ->with(['person:id,contact_id,first_name,last_name','addresses' => fn($q) => $q
                        ->where('number', $address->number)
                        ->where('addition', $address->addition)
                        ->where('postal_code', $address->postal_code)
                        ->limit(1)])
                    ->get();

                $list = "<br>";
                foreach ($dups as $c) {
                    $a = $c->addresses->first();
                    $fullName = trim(($c->person->first_name ?? '') . ' ' . ($c->person->last_name ?? ''));
                    $numberWithAdd = trim(($a->number ?? '') . ' ' . ($a->addition ?? ''));
                    $list .= "<br>{$numberWithAdd} : {$fullName}";
                }

                return [
                    'type' => $case['single'],
                    'count' => $dups->count(),
                    'list'  => $list,
                    'cancel'=> $case['cancel'],
                ];
            }
        }

        return null;
    }

    private function findDuplicateEmailAddressConflict(Person $person, EmailAddress $emailAddress): ?array
    {
        if (!$emailAddress?->email) {
            return null;
        }

        // Normaliseer voor zekerheid; DB is vaak case-insensitive, maar dit maakt het expliciet.
        $email = Str::lower(trim($emailAddress->email));

        // Basis: alle contacts die dit e-mailadres hebben (respecteert soft deletes)
        $byEmail = Contact::query()
            ->whereHas('emailAddresses', fn($q) => $q->where('email', $email));

        // 1) Zelfde achternaam + e-mail
        $sameLastProbe = (clone $byEmail)
            ->whereHas('person', fn($q) => $q->where('last_name', $person->last_name))
            ->limit(2)
            ->pluck('id');

        if ($sameLastProbe->count() === 1) {
            return ['kind' => 'name_and_email', 'count' => 1, 'contactId' => $sameLastProbe->first()];
        }
        if ($sameLastProbe->count() > 1) {
            $dups = (clone $byEmail)
                ->whereHas('person', fn($q) => $q->where('last_name', $person->last_name))
                ->with([
                    'person:id,contact_id,first_name,last_name',
                    // puur voor display; limit(1) om payload klein te houden
                    'emailAddresses' => fn($q) => $q->where('email', $email)->limit(1),
                ])
                ->get();

            $list = "<br>";
            foreach ($dups as $c) {
                $fullName = $c->full_name ?? '';
                $number = $c->number ?? ''; // pas aan als 'number' elders staat
                $list .= "<br>{$number} : {$fullName}";
            }
            return ['kind' => 'name_and_email', 'count' => $dups->count(), 'list' => $list];
        }

        // 2) Alleen e-mail (ongeacht achternaam)
        $emailOnlyProbe = (clone $byEmail)
            ->limit(2)
            ->pluck('id');

        if ($emailOnlyProbe->count() === 1) {
            return ['kind' => 'email_only', 'count' => 1, 'contactId' => $emailOnlyProbe->first()];
        }
        if ($emailOnlyProbe->count() > 1) {
            $dups = (clone $byEmail)
                ->with([
                    'emailAddresses' => fn($q) => $q->where('email', $email)->limit(1),
                ])
                ->get();

            $list = "<br>";
            foreach ($dups as $c) {
                $fullName = $c->full_name ?? '';
                $number = $c->number ?? ''; // pas aan als 'number' elders staat
                $list .= "<br>{$number} : {$fullName}";
            }
            return ['kind' => 'email_only', 'count' => $dups->count(), 'list' => $list];
        }

        return null;
    }

    public function update(Request $request, Person $person)
    {
        $this->authorize('update', $person);

        $contact = Contact::where('hoom_account_id', $request['hoomAccountId'])
            ->where('type_id', ContactType::PERSON)->first();
        $duplicateHoomAccountIdErrorMessage = '';
        if ($contact) {
            $duplicateHoomAccountIdErrorMessage = 'Er bestaat al een gebruiker met dit Hoom account id: '
                . $contact->full_name . ' (' . $contact->number . ').';
        }

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
            'hoomAccountId' => 'unique:contacts,hoom_account_id,'.$person->contact_id,
        ], ['hoomAccountId' => $duplicateHoomAccountIdErrorMessage]);

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