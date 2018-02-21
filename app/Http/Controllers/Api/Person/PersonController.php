<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Person;


use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactStatus;
use App\Eco\Person\Person;
use App\Eco\User\User;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\Contact\ContactController;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Person\PersonPeek;
use App\Rules\EnumExists;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PersonController extends ApiController
{

    public function store(Request $request)
    {
        $this->authorize('create', Person::class);

        $contactData = $request->validate([
            'statusId' => new EnumExists(ContactStatus::class),
            'memberSince' => 'date',
            'memberUntil' => 'date',
            'newsletter' => 'boolean',
            'iban' => '',
            'liable' => 'boolean',
            'liabilityAmount' => 'numeric',
            'ownerId' => 'exists:users,id',
        ]);

        $personData = $request->validate([
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

        $contactData = $this->sanitizeData($contactData, [
            'statusId' => 'nullable',
            'ownerId' => 'nullable',
            'memberSince' => 'nullable',
            'memberUntil' => 'nullable',
            'newsletter' => 'boolean',
            'liable' => 'boolean',
        ]);
        $contact = new Contact($this->arrayKeysToSnakeCase($contactData));

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
        $person = new Person($this->arrayKeysToSnakeCase($personData));

        DB::transaction(function () use ($person, $contact) {
            $contact->save();
            $person->contact_id = $contact->id;
            $person->save();
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
            'liable' => 'boolean',
            'liabilityAmount' => 'numeric',
            'ownerId' => 'exists:users,id',
        ]);

        $personData = $request->validate([
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