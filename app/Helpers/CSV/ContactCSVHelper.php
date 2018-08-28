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
                'occupations',
                'primaryOccupations',
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
                        $addressArr['country'] = ($address ? $address->country->name : '');

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
            if ($contact->occupations) {
                $first = true;

                foreach ($contact->occupations as $occupation) {
                    if($first) {
                        $contact['occupation_full_name'] = $occupation->full_name;
                        $contact['occupation_primary_or_secundary'] = 'onder';
                        $contact['occupation_role'] = Occupation::find($occupation->occupation_id)->primary_occupation;
                        $first = false;
                    }
                    else{
                        $repContact = $contact->replicate();
                        $repContact['occupation_full_name'] = $occupation->full_name;
                        $repContact['occupation_primary_or_secundary'] = 'onder';
                        $contact['occupation_role'] = Occupation::find($occupation->occupation_id)->primary_occupation;
                        $index = $this->contacts->search(function ($item, $key) use ($contact) {
                            return $item->id == $contact->id;
                        });
                        $this->contacts->splice($index, 0, [$repContact]);
                    }
                }
            }

            // Primary Occupations
            if ($contact->primaryOccupations) {
                $first = true;
//                dd($contact->primaryOccupations);
                foreach ($contact->primaryOccupations as $primaryOccupation) {
                    if($first) {
                        $contact['occupation_full_name'] = $primaryOccupation->full_name;
                        $contact['occupation_primary_or_secundary'] = 'boven';
                        $contact['occupation_role'] = Occupation::find($primaryOccupation->occupation_id)->secundary_occupation;
                        $first = false;
                    }
                    else{
                        $repContact = $contact->replicate();
                        $repContact['occupation_full_name'] = $primaryOccupation->full_name;
                        $repContact['occupation_primary_or_secundary'] = 'boven';
                        $contact['occupation_role'] = Occupation::find($primaryOccupation->occupation_id)->secundary_occupation;
                        $index = $this->contacts->search(function ($item, $key) use ($contact) {
                            return $item->id == $contact->id;
                        });
                        $this->contacts->splice($index, 0, [$repContact]);
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
                'occupation_full_name' => 'Volledige naam',
                'occupation_primary_or_secundary' => 'Boven of onder',
                'occupation_role' => 'Rol',
            ], $headers);
            $headers = false;
        }
        return $csv->getCsv();
    }

    private function formatDate($date) {
        $formatDate = $date ? new Carbon($date) : false;
        return $formatDate ? $formatDate->format('d-m-Y') : '';
    }

    private function occupationsContact($occupation, $first) {
        if($first) {
            $contact['occupation_full_name'] = $occupation->full_name;
            $contact['occupation_upOrDown'] = 'onder';
            $first = false;
        }
        else{
            $repContact = $contact->replicate();
            $repContact['occupation_full_name'] = $occupation->full_name;
            $repContact['occupation_upOrDown'] = 'onder';
            $index = $this->contacts->search(function ($item, $key) use ($contact) {
                return $item->id == $contact->id;
            });
            $this->contacts->splice($index, 0, [$repContact]);
        }

        return $first;
    }

}