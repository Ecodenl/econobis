<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\Contact\Grid;

use App\Eco\Address\Address;
use App\Eco\Contact\Contact;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\Organisation\Organisation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class RequestQuery extends \App\Helpers\RequestQuery\RequestQuery
{
    private $checkTeamContactIds;

    public function __construct(Request $request,
                                Filter $filter,
                                Sort $sort,
                                Joiner $joiner,
                                ExtraFilter $extraFilter,
                                $checkTeamContactIds = true)
    {
        $this->checkTeamContactIds = $checkTeamContactIds;
        parent::__construct($request, $filter, $sort, $joiner, $extraFilter);
    }

    protected function baseQuery()
    {
        $baseQuery =  Contact::query();
        if($this->checkTeamContactIds){
            $baseQuery->whereTeamContactIds(Auth::user());
        }

        $dataControleType = $this->request->get('dataControleType');

        if($dataControleType){
            switch ($dataControleType){
                case 'zelfde-email-naam':
                    $baseQuery->whereIn('contacts.id', $this->getContactsSharingEmailAndName());
                    break;
                case 'zelfde-email-adres':
                    $baseQuery->whereIn('contacts.id', $this->getContactsSharingEmailAndAddress());
                    break;
                case 'zelfde-email':
                    $baseQuery->whereIn('contacts.id', $this->getContactsSharingEmail());
                    break;
                case 'zelfde-adres':
                    $baseQuery->whereIn('contacts.id', $this->getContactsSharingAddress());
                    break;
                case 'zelfde-kvknummer':
                    $baseQuery->whereIn('contacts.id', $this->getContactsSharingCocNumber());
                    break;
                case 'zelfde-btwnummer':
                    $baseQuery->whereIn('contacts.id', $this->getContactsSharingVatNumber());
                    break;
                case 'zelfde-iban':
                    $sharedContactIds = $this->getContactsSharingIban();
                    $baseQuery->whereIn('contacts.id', $sharedContactIds);
                    $baseQuery->orderByRaw('FIELD(contacts.id, ' . implode(',', $sharedContactIds->toArray()) . ')');
                    break;
            }

        }

        $baseQuery->select('contacts.*');
//        Log::info($baseQuery->toSql());

        return $baseQuery;
    }

    /**
     * Get all contacts that share the same name and email address with more than one contact.
     *
     * @return \Illuminate\Support\Collection
     */
    private function getContactsSharingEmailAndName()
    {
        // Find name and email pairs used by more than one contact
        $sharedContacts = Contact::query()
            ->join('email_addresses', 'contacts.id', '=', 'email_addresses.contact_id')
            ->select('contacts.full_name', 'email_addresses.email')
            ->groupBy('contacts.full_name', 'email_addresses.email')
            ->havingRaw('COUNT(DISTINCT contacts.id) > 1')
            ->get();

        // Prepare an array to store the final contacts
        $sharedContactsIds = collect();

        // Loop through each shared pair to get the contact ids
        foreach ($sharedContacts as $sharedContact) {
            $sharedContactsIds = $sharedContactsIds->merge(
                Contact::query()
                    ->join('email_addresses', 'contacts.id', '=', 'email_addresses.contact_id')
                    ->where('contacts.full_name', $sharedContact->full_name)
                    ->where('email_addresses.email', $sharedContact->email)
                    ->pluck('contacts.id')
            );
        }

        return $sharedContactsIds->unique();

    }
    /**
     * Get all contacts that share the same name and address with more than one contact.
     *
     * @return \Illuminate\Support\Collection
     */
    private function getContactsSharingEmailAndAddress()
    {
        // Find name and email pairs used by more than one contact
        $sharedEmailsAndAddresses = Contact::query()
            ->select('email_addresses.email', 'addresses.postal_code', 'addresses.number', 'addresses.addition')
            ->join('email_addresses', 'contacts.id', '=', 'email_addresses.contact_id')
            ->join('addresses', 'contacts.id', '=', 'addresses.contact_id')
            ->where('addresses.type_id', '!=', 'old')
            ->groupBy('email_addresses.email', 'addresses.postal_code', 'addresses.number', 'addresses.addition')
            ->havingRaw('COUNT(DISTINCT contacts.id) > 1')
            ->get();

        // Prepare an array to store the final contacts
        $sharedContactsIds = collect();

        // Loop through each shared pair to get the contact ids
        foreach ($sharedEmailsAndAddresses as $sharedEmailAndAddress) {
            $sharedContactsIds = $sharedContactsIds->merge(
                Contact::query()
                    ->join('email_addresses', 'contacts.id', '=', 'email_addresses.contact_id')
                    ->join('addresses', 'contacts.id', '=', 'addresses.contact_id')
                    ->where('addresses.type_id', '!=', 'old')
                    ->where('email_addresses.email', $sharedEmailAndAddress->email)
                    ->where('addresses.postal_code', $sharedEmailAndAddress->postal_code)
                    ->where('addresses.number', $sharedEmailAndAddress->number)
                    ->where('addresses.addition', $sharedEmailAndAddress->addition)
                    ->pluck('contacts.id')
            );
        }

        return $sharedContactsIds->unique();

    }

    /**
     * Get all contacts that share the same email address, where the email address is used by more than one contact.
     *
     * @return \Illuminate\Support\Collection
     */
    private function getContactsSharingEmail()
    {
        // Find email addresses used by more than one contact
        $emails = EmailAddress::select('email')
            ->groupBy('email')
            ->havingRaw('COUNT(DISTINCT contact_id) > 1')
            ->pluck('email');

        // Find contacts associated with these email addresses
        $sharedContactsIds = EmailAddress::whereIn('email', $emails)->pluck('contact_id');

        return $sharedContactsIds;
    }

    /**
     * Get all contacts that share the same address, where the address is used by more than one contact.
     *
     * @return \Illuminate\Support\Collection
     */
    private function getContactsSharingAddress()
    {
        // Find addresses used by more than one contact
        $sharedAddresses = Address::query()
            ->select('postal_code', 'number', 'addition')
            ->where('addresses.type_id', '!=', 'old')
            ->groupBy('postal_code', 'number', 'addition')
            ->havingRaw('COUNT(DISTINCT contact_id) > 1')
            ->get();

        // Prepare an array to store the final contact IDs
        $sharedContactsIds = collect();

        // Loop through each shared address to get the contact ids
        foreach ($sharedAddresses as $sharedAddress) {
            $sharedContactsIds = $sharedContactsIds->merge(
                Address::query()
                    ->where('addresses.type_id', '!=', 'old')
                    ->where('postal_code', str_replace(' ', '', $sharedAddress->postal_code))
                    ->where('number', $sharedAddress->number)
                    ->where('addition', $sharedAddress->addition)
                    ->pluck('contact_id')
            );
        }

        return $sharedContactsIds->unique();
    }

    /**
     * Get all contacts that share the same coc number, where the coc number is used by more than one contact.
     *
     * @return \Illuminate\Support\Collection
     */
    private function getContactsSharingCocNumber()
    {
        // Find email addresses used by more than one contact
        $organisations = Organisation::select('chamber_of_commerce_number')
            ->whereNotNull('chamber_of_commerce_number')
            ->where('chamber_of_commerce_number', '!=', '')
            ->groupBy('chamber_of_commerce_number')
            ->havingRaw('COUNT(DISTINCT contact_id) > 1')
            ->pluck('chamber_of_commerce_number');

        // Find contacts associated with these email addresses
        $sharedContactsIds = Organisation::whereIn('chamber_of_commerce_number', $organisations)->pluck('contact_id');

        return $sharedContactsIds;
    }

    /**
     * Get all contacts that share the same vat number, where the vat number is used by more than one contact.
     *
     * @return \Illuminate\Support\Collection
     */
    private function getContactsSharingVatNumber()
    {
        // Find email addresses used by more than one contact
        $organisations = Organisation::select('vat_number')
            ->whereNotNull('vat_number')
            ->where('vat_number', '!=', '')
            ->groupBy('vat_number')
            ->havingRaw('COUNT(DISTINCT contact_id) > 1')
            ->pluck('vat_number');

        // Find contacts associated with these email addresses
        $sharedContactsIds = Organisation::whereIn('vat_number', $organisations)->pluck('contact_id');

        return $sharedContactsIds;
    }

    /**
     * Get all contacts that share the same iban, where the iban is used by more than one contact.
     *
     * @return \Illuminate\Support\Collection
     */
    private function getContactsSharingIban()
    {
        // Fetch all contacts with their decrypted IBANs
        $contacts = Contact::all()->map(function ($contact) {
            try {
                $contact->decrypted_iban = Crypt::decryptString(Crypt::encryptString($contact->iban));
                return $contact->decrypted_iban ? $contact : null;
            } catch (DecryptException $e) {
                return null; // Omit contact if decryption fails
            }
        })->filter();

        $contacts = $contacts->sortBy('decrypted_iban');

        // Group contacts by decrypted IBAN and filter those with more than one contact
        $sharedIbans = $contacts->groupBy('decrypted_iban')->filter(function ($group) {
            return $group->count() > 1 && !empty($group->first()->decrypted_iban);
        });

        // Flatten the collection to get all contacts with shared IBANs
        $sharedContacts = $sharedIbans->flatten();

        return $sharedContacts->pluck('id');
    }

}