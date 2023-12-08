<?php


namespace App\Http\Controllers\Portal\FreeFields;


use App\Eco\Address\Address;
use App\Eco\Contact\Contact;
use App\Http\Controllers\Api\ApiController;

class FreeFieldsFieldRecordController extends ApiController
{
    public function getContactValuesForPortal(Contact $contact)
    {
        $this->checkAllowedContact($contact);

        $freeFieldsFieldRecordController = new \App\Http\Controllers\Api\FreeFields\FreeFieldsFieldRecordController();
        return $freeFieldsFieldRecordController->getValuesForPortal('contacts', $contact->id,);
    }

    public function getAddressValuesForPortal(Address $address)
    {
        $contact = $address->contact;
        $this->checkAllowedContact($contact);

        $freeFieldsFieldRecordController = new \App\Http\Controllers\Api\FreeFields\FreeFieldsFieldRecordController();
        return $freeFieldsFieldRecordController->getValuesForPortal('addresses', $address->id,);
    }

    /**
     * @param mixed $contact
     * @return void
     */
    private function checkAllowedContact(mixed $contact): void
    {
//        todo WM: checken of dit hier moeten doen?
//        $portalUser = Auth::user();
//        if (!Auth::isPortalUser() || !$portalUser->contact) {
//            abort(501, 'Er is helaas een fout opgetreden.');
//        }
//        $allowedContactOrganisationIds = $portalUser->contact->occupations->where('type_id', 'organisation')->where('primary', true)->pluck('primary_contact_id')->toArray();
//        $allowedContactPersonIds = $portalUser->contact->occupations->where('type_id', 'person')->where('occupation_for_portal', true)->pluck('primary_contact_id')->toArray();
//        $allowedContactIds = array_merge($allowedContactOrganisationIds, $allowedContactPersonIds);
//
//        $authorizedForContact = in_array($contact->id, $allowedContactIds);
//        if ($portalUser->contact_id != $contact->id && !$authorizedForContact) {
//            abort(403, 'Verboden');
//        }
    }

}