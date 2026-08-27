<?php


namespace App\Http\Controllers\RestApi\Contact;


use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactType;
use App\Http\Controllers\Api\ApiController;

class ContactController extends ApiController
{
    public function getContact(string $contactPublicId)
    {
        $contact = Contact::where('public_id', $contactPublicId)->first();

        if (!$contact) {
            return response()->json([
                'message' => 'contact niet gevonden',
            ], 404);
        }

        $contactType = '';
        $contactNumber = $contact->number;
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
            'contactNumber' => $contactNumber ?? '',
            'contactTitle' => $contactTitle ?? '',
            'contactInitials' =>$contactInitials ?? '',
            'contactFirstName' => $contactFirstName ?? '',
            'contactLastNamePrefix' => $contactLastNamePrefix ?? '',
            'contactLastName' => $contactLastName ?? '',
            'contactOrganisationName' => $contactOrganisationName ?? '',
            'contactPrimaryEmail' => $contact->primaryEmailAddress?->email ?? '',
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