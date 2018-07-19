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
use App\Eco\PhoneNumber\PhoneNumberType;
use App\Eco\ProductionProject\ProductionProjectRevenue;
use Carbon\Carbon;

class ContactCSVHelper
{
    private $csvExporter;
    private $contacts;

    public function __construct($contacts)
    {
        $this->csvExporter = new \Laracsv\Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->contacts = $contacts;
    }

    public function downloadCSV(){
        $this->contacts->load([
            'person',
            'organisation',
            'person',
            'addresses',
            'emailAddresses',
            'phoneNumbers',
            'primaryAddress',
            'primaryContactEnergySupplier.energySupplier',
        ]);

        $this->csvExporter->beforeEach(function ($contact) {
            // person/organisation fields
            if($contact->type_id === 'person'){
                $contact->initials = $contact->person->initials;
                $contact->first_name = $contact->person->first_name;
                $contact->last_name_prefix;
                $contact->last_name = $contact->person->last_name;
                // Date of birth date format
                $dateOfBirth = new Carbon($contact->person->date_of_birth);
                $contact->date_of_birth = $dateOfBirth->format('d-m-Y');
            }

            // Addresses
            if($contact->addresses) {
                foreach(AddressType::collection() as $type){
                    $address = $contact->addresses->where('type_id', $type->id)->first();
                    $addressArr['street'] = ($address ? $address->street : '');
                    $addressArr['number'] = ($address ? $address->number : '');
                    $addressArr['addition'] = ($address ? $address->addition : '');
                    $addressArr['postal_code'] = ($address ? $address->postal_code : '');
                    $addressArr['city'] = ($address ? $address->city : '');

                    $contact['address_' . $type->id] = $addressArr;
                }
            }

            // E-mail
            if($contact->emailAddresses) {
                foreach(EmailAddressType::collection() as $type){
                    $emailAddress = $contact->emailAddresses->where('type_id', $type->id)->first();
                    $contact['email_' . $type->id] = ($emailAddress ? $emailAddress->email : '');
                }
            }

            // Phonenumbers
            if($contact->phoneNumbers) {
                foreach(PhoneNumberType::collection() as $type){
                    $phoneNumber = $contact->phoneNumbers->where('type_id', $type->id)->first();
                    $contact['phonenumber_' . $type->id] = ($phoneNumber ? $phoneNumber->number : '');
                }
            }

            // Reformat energy supplier fields
            if($contact->primaryContactEnergySupplier) {
                // Reformat when supplier starts with equal sign (example '=om')
                $contact->energy_supplier_name = $contact->primaryContactEnergySupplier->energySupplier->name;
                // Member since date format
                $energyMemberSince = new Carbon($contact->primaryContactEnergySupplier->member_since);
                $contact->energy_member_since = $energyMemberSince->format('d-m-Y');
            }
        });

        $csv = $this->csvExporter->build($this->contacts, [
            'number' => '#',
            'full_name' => 'Naam',
            'organisation.name' => 'Organisatie',
            'organisation.website' => 'Website',
            'organisation.chamber_of_commerce_number' => 'Kvk',
            'organisation.vat_number' => 'Btw nummer',
            'initials' => 'Initialen',
            'first_name' => 'Voornaam',
            'last_name_prefix' => 'Tussenvoegsel',
            'last_name' => 'Achternaam',
            'date_of_birth' => 'Geboortedatum',
            'person.first_name_partner' => 'Voornaam partner',
            'person.last_name_partner' => 'Achternaam partner',
            'address_visit.street' => 'Bezoek adres',
            'address_visit.number' => 'Bezoek huisnummer',
            'address_visit.addition' => 'Bezoek toevoeging',
            'address_visit.postal_code' => 'Bezoek postcode',
            'address_visit.city' => 'Bezoek plaats',
            'address_post.street' => 'Post adres',
            'address_post.number' => 'Post huisnummer',
            'address_post.addition' => 'Post toevoeging',
            'address_post.postal_code' => 'Post postcode',
            'address_post.city' => 'Post plaats',
            'address_invoice.street' => 'Factuur adres',
            'address_invoice.number' => 'Factuur huisnummer',
            'address_invoice.addition' => 'Factuur toevoeging',
            'address_invoice.postal_code' => 'Factuur postcode',
            'address_invoice.city' => 'Factuur plaats',
            'email_general' => 'Email algemeen',
            'email_home' => 'Email prive',
            'email_work' => 'Email werk',
            'phonenumber_home' => 'Telefoonnummer prive',
            'phonenumber_work' => 'Telefoonnummer werk',
            'energy_supplier_name' => 'Energieleverancier',
            'primaryContactEnergySupplier.es_number' => 'Klantnummer',
            'energy_member_since' => 'Klant sinds',
            'primaryContactEnergySupplier.ean_electricity' => 'EAN electriciteit',
        ])->getCsv();

        return $csv;
    }
}