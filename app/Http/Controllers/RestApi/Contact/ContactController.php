<?php


namespace App\Http\Controllers\RestApi\Contact;


use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactType;
use App\Http\Controllers\Api\ApiController;

class ContactController extends ApiController
{
    public function getContact(?string $contactnr)
    {
        if (!$contactnr) {
            abort(501, 'Er is helaas een fout opgetreden (contactnummer ontbreekt).');
        }

        $contact = Contact::where('number', $contactnr)->first();
        if(!$contact) {
            abort(501, 'Er is helaas een fout opgetreden (contact niet gevonden).');
        }

        $contactType = '';
        $contactTitle = '';
        $contactInitials = '';
        $contactFirstName = '';
        $contactLastNamePrefix = '';
        $contactLastName = '';
        $contactOrganisationName = '';
        if ($contact->type_id === ContactType::PERSON) {
            $contactType = 'Persoon';
            $contactTitle = $contact->person?->title?->name;
            $contactInitials = $contact->person?->initials;
            $contactFirstName = $contact->person?->first_name;
            $contactLastNamePrefix = $contact->person?->last_name_prefix;
            $contactLastName = $contact->person?->last_name;
            $contactOrganisationName = '';

        } elseif ($contact->type_id === ContactType::ORGANISATION) {
            $contactType = 'Organisatie';
            $contactOrganisationName = $contact->full_name;
        }

        $result = [
            'contactType' => $contactType ?? '',
            'contactTitle' => $contactTitle ?? '',
            'contactInitials' =>$contactInitials ?? '',
            'contactFirstName' => $contactFirstName ?? '',
            'contactLastNamePrefix' => $contactLastNamePrefix ?? '',
            'contactLastName' => $contactLastName ?? '',
            'contactOrganisationName' => $contactOrganisationName ?? '',
            'contactPrimairyEmail' => $contact->primaryEmailAddress?->email ?? '',
            'addressStreet' => $contact->primaryAddress?->street ?? '',
            'addressNumber' => $contact->primaryAddress?->number ?? '',
            'addressAddition' => $contact->primaryAddress?->addition ?? '',
            'addressPostalCode' => $contact->primaryAddress?->postal_code ?? '',
            'addressCity' => $contact->primaryAddress?->city ?? '',
            'addressCountry' => $contact->primaryAddress?->country?->name ?? '',
        ];

        return response()->json($result);
    }


}