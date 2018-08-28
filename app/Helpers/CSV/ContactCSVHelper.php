<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\CSV;

use App\Eco\Address\AddressType;
use App\Eco\EmailAddress\EmailAddressType;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\Occupation\Occupation;
use App\Eco\PhoneNumber\PhoneNumberType;
use App\Eco\ProductionProject\ProductionProjectRevenue;
use Carbon\Carbon;
use League\Csv\Reader;

class ContactCSVHelper
{
    private $csvExporter;
    private $contacts;

    public function __construct($contacts)
    {
        $this->csvExporter = new Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->contacts = $contacts;
    }

    public function downloadCSV()
    {
        $csv = '';
        $headers = true;

        foreach ($this->contacts->chunk(500) as $chunk) {
            $chunk->load([
                'person',
                'organisation',
                'addresses',
                'primaryEmailAddress',
                'emailAddresses',
                'primaryphoneNumber',
                'phoneNumbers',
                'primaryAddress',
                'primaryContactEnergySupplier.energySupplier',
                'contactNotes',
                'occupations.occupation',
                'occupations.primaryContact.person.title',
                'occupations.primaryContact.primaryEmailAddress',
                'occupations.primaryContact.primaryphoneNumber',
                'primaryOccupations.occupation',
                'primaryOccupations.contact.person.title',
                'primaryOccupations.contact.primaryEmailAddress',
                'primaryOccupations.contact.primaryphoneNumber',
            ]);

            foreach ($chunk as $contact) {
                // Addresses
                if ($contact->addresses) {
                    foreach (AddressType::collection() as $type) {
                        $address = $contact->addresses()->where('type_id', $type->id)->first();

                        $addressArr = [];

                        $addressArr['street'] = ($address ? $address->street : '');
                        $addressArr['number'] = ($address ? $address->number : '');
                        $addressArr['addition'] = ($address ? $address->addition : '');
                        $addressArr['postal_code'] = ($address ? $address->postal_code : '');
                        $addressArr['city'] = ($address ? $address->city : '');
                        $addressArr['country'] = (($address && $address->country) ? $address->country->name : '');

                        $contact['address_' . $type->id] = $addressArr;
                    }
                }

                // Other e-mail addresses
                if ($contact->emailAddresses) {
                    $emailAddresses = $contact->emailAddresses()->where('primary', false)->limit(5)->get();

                    $contact['emailAddress_2'] = (isset($emailAddresses[0]) ? $emailAddresses[0]->email : '');
                    $contact['emailAddress_3'] = (isset($emailAddresses[1]) ? $emailAddresses[1]->email : '');
                    $contact['emailAddress_4'] = (isset($emailAddresses[2]) ? $emailAddresses[2]->email : '');
                    $contact['emailAddress_5'] = (isset($emailAddresses[3]) ? $emailAddresses[3]->email : '');
                }

                // Other phonenumbers
                if ($contact->phoneNumbers) {
                    $phoneNumbers = $contact->phoneNumbers()->where('primary', false)->limit(2)->get();

                    $contact['phonenumber_2'] = (isset($phoneNumbers[0]) ? $phoneNumbers[0]->number : '');
                    $contact['phonenumber_3'] = (isset($phoneNumbers[1]) ? $phoneNumbers[1]->number : '');
                }

                // Latest 2 contactNotes
                if ($contact->contactNotes) {
                    $contactNotes = $contact->contactNotes()->limit(2)->orderBy('id', 'desc')->get();

                    $latestContactNotes = (isset($contactNotes[0]) ? $contactNotes[0]->note : '');
                    $latestContactNotes .= (isset($contactNotes[1]) ? ' | ' . $contactNotes[1]->note : '');

                    $contact['latest_contactNotes'] = $latestContactNotes;
                }

            // Occupations
            $first = true;
            if ($contact->occupations) {
                foreach ($contact->occupations as $occupation) {
//                    dd($occupation);
                    if($first) {
                        $contact['occupationPrimary'] = ($occupation->primary ? 'Ja' : 'Nee');
                        $contact['occupationPrimaryOrSecundary'] = 'onder';
                        $contact['occupationStartDate'] = $this->formatDate($occupation->start_date);
                        $contact['occupationEndDate'] = $this->formatDate($occupation->end_date);
                        $contact['occupationTitle'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->title : '';
                        $contact['occupationFullName'] = $occupation->full_name;
                        $contact['occupationInitial'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->initials : '';
                        $contact['occupationFirstName'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->first_name : '';
                        $contact['occupationLastNamePrefix'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->last_name_prefix : '';
                        $contact['occupationLastName'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->last_name : '';
                        $contact['occupationDateOfBirth'] = $occupation->primaryContact->person ? $this->formatDate($occupation->primaryContact->person->date_of_birth) : '';
                        $contact['occupationPrimaryEmailAddress'] = $occupation->primaryContact->primaryEmailAddress ? $occupation->primaryContact->primaryEmailAddress : '';
                        $contact['occupationPrimaryTelephoneNumber'] = $occupation->primaryContact->primaryphoneNumber ? $occupation->primaryContact->primaryphoneNumber : '';
                        $contact['occupationRole'] = $occupation->occupation->primary_occupation;
                        $first = false;
                    }
                    else{
                        $repContact = $contact->replicate();
                        $repContact['occupationPrimary'] = ($occupation->primary ? 'Ja' : 'Nee');
                        $repContact['occupationPrimaryOrSecundary'] = 'onder';
                        $repContact['occupationStartDate'] = $this->formatDate($occupation->start_date);
                        $repContact['occupationEndDate'] = $this->formatDate($occupation->end_date);
                        $repContact['occupationTitle'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->title : '';
                        $repContact['occupationFullName'] = $occupation->full_name;
                        $repContact['occupationInitial'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->initials : '';
                        $repContact['occupationFirstName'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->first_name : '';
                        $repContact['occupationLastNamePrefix'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->last_name_prefix : '';
                        $repContact['occupationLastName'] = $occupation->primaryContact->person ? $occupation->primaryContact->person->last_name : '';
                        $repContact['occupationDateOfBirth'] = $occupation->primaryContact->person ? $this->formatDate($occupation->primaryContact->person->date_of_birth) : '';
                        $repContact['occupationPrimaryEmailAddress'] = $occupation->primaryContact->primaryEmailAddress ? $occupation->primaryContact->primaryEmailAddress : '';
                        $repContact['occupationPrimaryTelephoneNumber'] = $occupation->primaryContact->primaryphoneNumber ? $occupation->primaryContact->primaryphoneNumber : '';
                        $repContact['occupationRole'] = $occupation->occupation->primary_occupation;
                        $index = $chunk->search(function ($item, $key) use ($contact) {
                            return $item->id == $contact->id;
                        });
                        $chunk->splice($index, 0, [$repContact]);
                    }
                }
            }

            // Primary Occupations
            if ($contact->primaryOccupations) {
//                dd($contact->primaryOccupations);
                foreach ($contact->primaryOccupations as $primaryOccupation) {
                    if($first) {
                        $contact['occupationPrimary'] = ($primaryOccupation->primary ? 'Ja' : 'Nee');
                        $contact['occupationPrimaryOrSecundary'] = 'boven';
                        $contact['occupationStartDate'] = $this->formatDate($primaryOccupation->start_date);
                        $contact['occupationEndDate'] = $this->formatDate($primaryOccupation->end_date);
                        $contact['occupationTitle'] = $primaryOccupation->primaryContact->person ? $primaryOccupation->primaryContact->person->title : '';
                        $contact['occupationFullName'] = $primaryOccupation->full_name;
                        $contact['occupationInitial'] = $primaryOccupation->primaryContact->person ? $primaryOccupation->primaryContact->person->initials : '';
                        $contact['occupationFirstName'] = $primaryOccupation->primaryContact->person ? $primaryOccupation->primaryContact->person->first_name : '';
                        $contact['occupationLastNamePrefix'] = $primaryOccupation->primaryContact->person ? $primaryOccupation->primaryContact->person->last_name_prefix : '';
                        $contact['occupationLastName'] = $primaryOccupation->primaryContact->person ? $primaryOccupation->primaryContact->person->last_name : '';
                        $contact['occupationDateOfBirth'] = $primaryOccupation->primaryContact->person ? $this->formatDate($primaryOccupation->primaryContact->person->date_of_birth) : '';
                        $contact['occupationPrimaryEmailAddress'] = $primaryOccupation->primaryContact->primaryEmailAddress ? $primaryOccupation->primaryContact->primaryEmailAddress : '';
                        $contact['occupationPrimaryTelephoneNumber'] = $primaryOccupation->primaryContact->primaryphoneNumber ? $primaryOccupation->primaryContact->primaryphoneNumber : '';
                        $contact['occupationRole'] = $primaryOccupation->occupation->secondary_occupation;
                        $first = false;
                    }
                    else{
                        $repContact = $contact->replicate();
                        $repContact['occupationPrimary'] = ($primaryOccupation->primary ? 'Ja' : 'Nee');
                        $repContact['occupationPrimaryOrSecundary'] = 'boven';
                        $repContact['occupationStartDate'] = $this->formatDate($primaryOccupation->start_date);
                        $repContact['occupationEndDate'] = $this->formatDate($primaryOccupation->end_date);
                        $repContact['occupationTitle'] = $primaryOccupation->primaryContact->person ? $primaryOccupation->primaryContact->person->title : '';
                        $repContact['occupationFullName'] = $primaryOccupation->full_name;
                        $repContact['occupationInitial'] = $primaryOccupation->primaryContact->person ? $primaryOccupation->primaryContact->person->initials : '';
                        $repContact['occupationFirstName'] = $primaryOccupation->primaryContact->person ? $primaryOccupation->primaryContact->person->first_name : '';
                        $repContact['occupationLastNamePrefix'] = $primaryOccupation->primaryContact->person ? $primaryOccupation->primaryContact->person->last_name_prefix : '';
                        $repContact['occupationLastName'] = $primaryOccupation->primaryContact->person ? $primaryOccupation->primaryContact->person->last_name : '';
                        $repContact['occupationDateOfBirth'] = $primaryOccupation->primaryContact->person ? $this->formatDate($primaryOccupation->primaryContact->person->date_of_birth) : '';
                        $repContact['occupationPrimaryEmailAddress'] = $primaryOccupation->primaryContact->primaryEmailAddress ? $primaryOccupation->primaryContact->primaryEmailAddress : '';
                        $repContact['occupationPrimaryTelephoneNumber'] = $primaryOccupation->primaryContact->primaryphoneNumber ? $primaryOccupation->primaryContact->primaryphoneNumber : '';
                        $repContact['occupationRole'] = $primaryOccupation->occupation->secondary_occupation;
                        $index = $chunk->search(function ($item, $key) use ($contact) {
                            return $item->id == $contact->id;
                        });
                        $chunk->splice($index, 0, [$repContact]);
                    }
                }
            }
        }

            $this->csvExporter->beforeEach(function ($contact) {
                // person/organisation fields
                if ($contact->type_id === 'person') {
                    $contact->title = $contact->person->title;
                    $contact->initials = $contact->person->initials;
                    $contact->first_name = $contact->person->first_name;
                    $contact->last_name_prefix;
                    $contact->last_name = $contact->person->last_name;
                    $contact->date_of_birth = $this->formatDate($contact->person->date_of_birth);
                    $contact->date_of_birth_partner = $this->formatDate($contact->person->date_of_birth_partner);
                }

                // Reformat energy supplier fields
                if ($contact->primaryContactEnergySupplier) {
                    // Reformat when supplier starts with equal sign (example '=om')
                    $contact->energy_supplier_name = $contact->primaryContactEnergySupplier->energySupplier->name;
                    // Member since date format
                    $contact->energy_member_since
                        = $this->formatDate($contact->primaryContactEnergySupplier->member_since);
                }

                $contact->did_agree_avg = ($contact->did_agree_avg ? 'Ja' : 'Nee');

                $contact->created_at_date = $this->formatDate($contact->created_at);
                $contact->updated_at_date = $this->formatDate($contact->updated_at);
            });

            $csv = $this->csvExporter->build($chunk, [
                'number' => '#',
                'full_name' => 'Naam',
                'organisation.name' => 'Organisatie',
                'organisation.website' => 'Website',
                'organisation.chamber_of_commerce_number' => 'Kvk',
                'organisation.vat_number' => 'Btw nummer',
                'title.name' => 'Aanspreektitel',
                'initials' => 'Initialen',
                'first_name' => 'Voornaam',
                'last_name_prefix' => 'Tussenvoegsel',
                'last_name' => 'Achternaam',
                'date_of_birth' => 'Geboortedatum',
                'iban' => 'IBAN',
                'iban_attn' => 'IBAN tnv',
                'did_agree_avg' => 'Akkoord privacybeleid',
                'person.first_name_partner' => 'Voornaam partner',
                'person.last_name_partner' => 'Achternaam partner',
                'date_of_birth_partner' => 'Geboortedatum partner',
                'address_deliver.street' => 'Bezorg adres',
                'address_deliver.number' => 'Bezorg huisnummer',
                'address_deliver.addition' => 'Bezorg toevoeging',
                'address_deliver.postal_code' => 'Bezorg postcode',
                'address_deliver.city' => 'Bezorg plaats',
                'address_deliver.country' => 'Bezorg land',
                'address_visit.street' => 'Bezoek adres',
                'address_visit.number' => 'Bezoek huisnummer',
                'address_visit.addition' => 'Bezoek toevoeging',
                'address_visit.postal_code' => 'Bezoek postcode',
                'address_visit.city' => 'Bezoek plaats',
                'address_visit.country' => 'Bezoek land',
                'address_postal.street' => 'Post adres',
                'address_postal.number' => 'Post huisnummer',
                'address_postal.addition' => 'Post toevoeging',
                'address_postal.postal_code' => 'Post postcode',
                'address_postal.city' => 'Post plaats',
                'address_postal.country' => 'Post land',
                'address_invoice.street' => 'Factuur adres',
                'address_invoice.number' => 'Factuur huisnummer',
                'address_invoice.addition' => 'Factuur toevoeging',
                'address_invoice.postal_code' => 'Factuur postcode',
                'address_invoice.city' => 'Factuur plaats',
                'address_invoice.country' => 'Factuur land',
                'primaryEmailAddress.email' => 'Email primair',
                'emailAddress_2' => 'Email 2',
                'emailAddress_3' => 'Email 3',
                'emailAddress_4' => 'Email 4',
                'emailAddress_5' => 'Email 5',
                'primaryphoneNumber.number' => 'Telefoonnummer primair',
                'phonenumber_2' => 'Telefoonnummer 2',
                'phonenumber_3' => 'Telefoonnummer 3',
                'energy_supplier_name' => 'Energieleverancier',
                'primaryContactEnergySupplier.es_number' => 'Klantnummer',
                'energy_member_since' => 'Klant sinds',
                'primaryContactEnergySupplier.ean_electricity' => 'EAN electriciteit',
                'latest_contactNotes' => 'Opmerkingen',
                'created_at_date' => 'Datum gemaakt op',
                'updated_at_date' => 'Datum laatste update',
                'occupationPrimary' => 'Primair',
                'occupationPrimaryOrSecundary' => 'Boven of onder',
                'occupationStartDate' => 'Begindatum',
                'occupationEndDate' => 'Einddatum',
                'occupationTitle.name' => 'Aanspreektitel',
                'occupationFullName' => 'Volledige naam',
                'occupationInitial' => 'Initialen',
                'occupationFirstName' => 'Voornaam',
                'occupationLastNamePrefix' => 'Tussenvoegsel',
                'occupationLastName' => 'Achternaam',
                'occupationDateOfBirth' => 'Geboortedatum',
                'occupationPrimaryEmailAddress.email' => 'Primair e-mailadres',
                'occupationPrimaryTelephoneNumber.number' => 'Primair telefoonnummer',
                'occupationRole' => 'Rol',
            ], $headers);
            $headers = false;
        }
        return Reader::BOM_UTF8 . $csv->getCsv();
    }

    private function formatDate($date) {
        $formatDate = $date ? new Carbon($date) : false;
        return $formatDate ? $formatDate->format('d-m-Y') : '';
    }
}