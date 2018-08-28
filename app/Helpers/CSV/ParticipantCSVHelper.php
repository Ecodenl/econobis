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
use Carbon\Carbon;

class ParticipantCSVHelper
{
    private $csvExporter;
    private $participants;

    public function __construct($participants)
    {
        $this->csvExporter = new Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->participants = $participants;
    }

    public function downloadCSV()
    {
        $csv = '';
        $headers = true;
        foreach ($this->participants->chunk(500) as $chunk) {
            $chunk->load([
                'contact.person.title',
                'contact.organisation',
                'contact.addresses',
                'contact.emailAddresses',
                'contact.primaryphoneNumber',
                'contact.primaryAddress.country',
                'contact.primaryContactEnergySupplier.energySupplier',
                'giftedByContact',
                'legalRepContact',
                'productionProject',
                'participantProductionProjectStatus',
                'participantProductionProjectPayoutType'
            ]);

            foreach ($chunk as $participant) {
                // Addresses
                if ($participant->contact->addresses) {
                    foreach (AddressType::collection() as $type) {
                        $address = $participant->contact->addresses()->where('type_id', $type->id)->first();

                        $addressArr = [];

                        $addressArr['street'] = ($address ? $address->street : '');
                        $addressArr['number'] = ($address ? $address->number : '');
                        $addressArr['addition'] = ($address ? $address->addition : '');
                        $addressArr['postal_code'] = ($address ? $address->postal_code : '');
                        $addressArr['city'] = ($address ? $address->city : '');
                        $addressArr['country'] = ($address ? $address->country->name : '');

                        $participant['address_' . $type->id] = $addressArr;
                    }
                }

                // Other e-mail addresses
                if ($participant->contact->emailAddresses) {
                    $emailAddresses = $participant->contact->emailAddresses()->where('primary', false)->limit(5)->get();

                    $participant['emailAddress_2'] = (isset($emailAddresses[0]) ? $emailAddresses[0]->email : '');
                    $participant['emailAddress_3'] = (isset($emailAddresses[1]) ? $emailAddresses[1]->email : '');
                    $participant['emailAddress_4'] = (isset($emailAddresses[2]) ? $emailAddresses[2]->email : '');
                    $participant['emailAddress_5'] = (isset($emailAddresses[3]) ? $emailAddresses[3]->email : '');
                }

                // Other phonenumbers
                if ($participant->contact->phoneNumbers) {
                    $phoneNumbers = $participant->contact->phoneNumbers()->where('primary', false)->limit(2)->get();

                    $participant['phonenumber_2'] = (isset($phoneNumbers[0]) ? $phoneNumbers[0]->number : '');
                    $participant['phonenumber_3'] = (isset($phoneNumbers[1]) ? $phoneNumbers[1]->number : '');
                }

                $this->csvExporter->beforeEach(function ($participant) {
                    // person/organisation fields
                    if ($participant->contact->type_id === 'person') {
                        $participant->title = $participant->contact->person->title;
                        $participant->initials = $participant->contact->person->initials;
                        $participant->first_name = $participant->contact->person->first_name;
                        $participant->last_name_prefix = $participant->contact->person->last_name_prefix;
                        $participant->last_name = $participant->contact->person->last_name;
                        // Date of birth date format
                        $dateOfBirth = $participant->contact->person->date_of_birth
                            ? new Carbon($participant->contact->person->date_of_birth) : false;
                        $participant->date_of_birth = $dateOfBirth ? $dateOfBirth->format('d-m-Y') : '';
                    }

                    // Reformat energy supplier fields
                    if ($participant->contact->primaryContactEnergySupplier) {
                        // Reformat when supplier starts with equal sign (example '=om')
                        $participant->energy_supplier_name
                            = $participant->contact->primaryContactEnergySupplier->energySupplier->name;
                    }

                    //reformat bools
                    $participant->did_accept_agreement = $participant->did_accept_agreement ? 'Ja' : 'Nee';
                    // Reformat dates
                    $participant->date_contract_send = $participant->date_contract_send
                        ? Carbon::parse($participant->date_contract_send)->format('d-m-Y') : '';
                    $participant->date_contract_retour = $participant->date_contract_retour
                        ? Carbon::parse($participant->date_contract_retour)->format('d-m-Y') : '';
                    $participant->date_payed = $participant->date_payed ? Carbon::parse($participant->date_payed)
                        ->format('d-m-Y') : '';
                    $participant->date_register = $participant->date_register
                        ? Carbon::parse($participant->date_register)
                            ->format('d-m-Y') : '';
                    $participant->date_end = $participant->date_end ? Carbon::parse($participant->date_end)
                        ->format('d-m-Y')
                        : '';
                });
            }
                $csv = $this->csvExporter->build($chunk, [
                    'id' => '#',
                    'contact.id' => 'Contactnummer',
                    'productionProject.name' => 'Productie project naam',
                    'contact.full_name' => 'Naam',
                    'contact.organisation.name' => 'Organisatie',
                    'title.name' => 'Aanspreektitel',
                    'initials' => 'Initialen',
                    'first_name' => 'Voornaam',
                    'last_name_prefix' => 'Tussenvoegsel',
                    'last_name' => 'Achternaam',
                    'date_of_birth' => 'Geboortedatum',
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
                    'contact.primaryphoneNumber.number' => 'Primair telefoonnummer',
                    'energy_supplier_name' => 'Energieleverancier',
                    'contact.primaryContactEnergySupplier.es_number' => 'Klantnummer',
                    'productionProject.code' => 'Productie project',
                    'productionProject.participation_worth' => 'Waarde per participatie',
                    'participations_requested' => 'Participaties aangevraagd',
                    'participations_granted' => 'Participaties toegekend',
                    'participations_rest_sale' => 'Participaties restverkoop',
                    'participations_current' => 'Participaties huidig',
                    'participations_worth_total' => 'Hudige waarde',
                    'date_contract_send' => 'Contract verstuurd',
                    'date_contract_retour' => 'Contract retour',
                    'date_payed' => 'Betaald op',
                    'legalRepContact.full_name' => 'Wettelijk vertegenwoordiger',
                    'giftedByContact.full_name' => 'Geschonken door',
                    'did_accept_agreement' => 'Akkoord regelement',
                    'power_kwh_consumption' => 'Jaarlijks verbruik',
                    'iban_payout' => 'Iban uitkeren',
                    'iban_attn' => 'Iban uitkeren t.n.v.',
                    'participantProductionProjectStatus.name' => 'Status',
                    'date_register' => 'Inschrijfdatum',
                    'date_end' => 'Einddatum',
                    'participantProductionProjectPayoutType.name' => 'Uitkeren op',
                ], $headers);
                $headers = false;
            }
        return $csv->getCsv();
        }
}