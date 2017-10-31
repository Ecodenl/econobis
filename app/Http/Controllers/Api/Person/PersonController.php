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
use App\Rules\EnumExists;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PersonController extends ApiController
{

    public function store(Request $request)
    {

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
            'accountId' => 'exists:accounts,id',
            'typeId' => 'exists:person_types,id',
            'dateOfBirth' => 'date',
            'firstNamePartner' => '',
            'lastNamePartner' => '',
            'dateOfBirthPartner' => 'date',
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
            'accountId' => 'nullable',
            'typeId' => 'nullable',
            'dateOfBirth' => 'nullable',
            'dateOfBirthPartner' => 'nullable',
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
            'accountId' => 'exists:accounts,id',
            'typeId' => 'exists:person_types,id',
            'dateOfBirth' => 'date',
            'firstNamePartner' => '',
            'lastNamePartner' => '',
            'dateOfBirthPartner' => 'date',
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
        $contact->fill($this->arrayKeysToSnakeCase($contactData));
        $contact->save();

        $personData = $this->sanitizeData($personData, [
            'lastNamePrefixId' => 'nullable',
            'titleId' => 'nullable',
            'accountId' => 'nullable',
            'typeId' => 'nullable',
            'dateOfBirth' => 'nullable',
            'dateOfBirthPartner' => 'nullable',
        ]);
        $person->fill($this->arrayKeysToSnakeCase($personData));
        $person->save();

        // Contact exact zo teruggeven als bij het openen van een bestaand contact
        // Dus kan hier gebruik maken van bestaande controller
        return (new ContactController())->show($contact->fresh(), $request);
    }
}