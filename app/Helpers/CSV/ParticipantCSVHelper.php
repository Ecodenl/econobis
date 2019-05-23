<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\CSV;

use App\Eco\Address\AddressType;
use Carbon\Carbon;
use League\Csv\Reader;

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
                'contact.contactPerson.contact.person.title',
                'contact.contactPerson.contact.primaryEmailaddress',
                'contact.contactPerson.contact.primaryphoneNumber',
                'contact.contactPerson.occupation',
                'contact.legalRepContact.contact.person.title',
                'contact.legalRepContact.contact.primaryEmailaddress',
                'contact.legalRepContact.contact.primaryphoneNumber',
                'contact.legalRepContact.occupation',
                'contact.addresses',
                'contact.emailAddresses',
                'contact.primaryEmailAddress',
                'contact.primaryphoneNumber',
                'contact.primaryAddress.country',
                'contact.primaryContactEnergySupplier.energySupplier',
                'giftedByContact',
                'legalRepContact',
                'project',
                'participantProjectStatus',
                'participantProjectPayoutType'
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
                        $addressArr['country'] = (($address && $address->country) ? $address->country->name : '');

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

                    $participant->iban_contact = $participant->contact->iban;
                    $participant->iban_attn_contact = $participant->contact->iban_attn;
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

                    if($participant->contact->type_id === 'person' && $participant->contact->legalRepContact){
                        $participant->lrcStartDate = $participant->contact->legalRepContact->start_date ? Carbon::parse($participant->contact->legalRepContact->start_date)->format('d-m-Y') : '';
                        $participant->lrcEndDate = $participant->contact->legalRepContact->end_date ? Carbon::parse($participant->contact->legalRepContact->end_date)->format('d-m-Y') : '';
                        $participant->lrcOccupation = $participant->contact->legalRepContact->occupation->primary_occupation;
                        $participant->lrcFullName = $participant->contact->legalRepContact->contact->full_name;
                        $participant->lrcPrimaryEmailAddress = $participant->contact->legalRepContact->contact->primaryEmailAddress ? $participant->contact->legalRepContact->contact->primaryEmailAddress->email : '';
                        $participant->lrcPrimaryPhonenumber = $participant->contact->legalRepContact->contact->primaryPhonenumber ? $participant->contact->legalRepContact->contact->primaryPhonenumber->number : '';
                        if($participant->contact->type_id === 'person' && $participant->contact->legalRepContact && $participant->contact->legalRepContact->contact->type_id == 'person'){
                            $participant->lrcTitle = $participant->contact->legalRepContact->contact->person->title ? $participant->contact->legalRepContact->contact->person->title->name : '';
                            $participant->lrcInitials = $participant->contact->legalRepContact->contact->person->initials;
                            $participant->lrcFirstName = $participant->contact->legalRepContact->contact->person->first_name;
                            $participant->lrcLastNamePrefix = $participant->contact->legalRepContact->contact->person->last_name_prefix;
                            $participant->lrcLastName = $participant->contact->legalRepContact->contact->person->last_name;
                            $participant->lrcDateOfBirth = $participant->contact->legalRepContact->contact->person->date_of_birth ? Carbon::parse($participant->contact->legalRepContact->contact->person->date_of_birth)->format('d-m-Y') : '';
                        }
                    }
                    
                    if ($participant->contact->type_id === 'organisation' && $participant->contact->contactPerson && $participant->contact->contactPerson->contact->type_id == 'person') {
                        $participant->cpStartDate = $participant->contact->contactPerson->startDate ? Carbon::parse($participant->contact->contactPerson->startDate)->format('d-m-Y') : '';
                        $participant->cpEndDate = $participant->contact->contactPerson->endDate ? Carbon::parse($participant->contact->contactPerson->endDate)->format('d-m-Y') : '';
                        $participant->cpOccupation = $participant->contact->contactPerson->occupation->primary_occupation;
                        $participant->cpTitle = $participant->contact->contactPerson->contact->person->title ? $participant->contact->contactPerson->contact->person->title->name : '';
                        $participant->cpFullName = $participant->contact->contactPerson->contact->full_name;
                        $participant->cpInitials = $participant->contact->contactPerson->contact->person->initials;
                        $participant->cpFirstName = $participant->contact->contactPerson->contact->person->first_name;
                        $participant->cpLastNamePrefix = $participant->contact->contactPerson->contact->person->last_name_prefix;
                        $participant->cpLastName = $participant->contact->contactPerson->contact->person->last_name;
                        $participant->cpDateOfBirth = $participant->contact->contactPerson->contact->person->date_of_birth ? Carbon::parse($participant->contact->contactPerson->contact->person->date_of_birth)->format('d-m-Y') : '';
                        $participant->cpPrimaryEmailAddress = $participant->contact->contactPerson->contact->primaryEmailAddress ? $participant->contact->contactPerson->contact->primaryEmailAddress->email : '';
                        $participant->cpPrimaryPhonenumber = $participant->contact->contactPerson->contact->primaryPhonenumber ? $participant->contact->contactPerson->contact->primaryPhonenumber->number : '';
                    }

                    // Reformat energy supplier fields
                    if ($participant->contact->primaryContactEnergySupplier) {
                        // Reformat when supplier starts with equal sign (example '=om')
                        $participant->energy_supplier_name
                            = $participant->contact->primaryContactEnergySupplier->energySupplier->name;
                        $participant->energy_supplier_member_since
                            = $this->formatDate($participant->contact->primaryContactEnergySupplier->member_since);
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
                    'contact.id' => 'Contact id',
                    'contact.number' => 'Contactnummer',
                    'project.name' => 'Deelname naam',
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
                    'contact.primaryEmailAddress.email' => 'Email primair',
                    'emailAddress_2' => 'Email 2',
                    'emailAddress_3' => 'Email 3',
                    'emailAddress_4' => 'Email 4',
                    'emailAddress_5' => 'Email 5',
                    'contact.primaryphoneNumber.number' => 'Telefoonnummer primair',
                    'phonenumber_2' => 'Telefoonnummer 2',
                    'phonenumber_3' => 'Telefoonnummer 3',
                    'energy_supplier_name' => 'Energieleverancier',
                    'energy_supplier_member_since' => 'Energieleverancier klant sinds',
                    'contact.primaryContactEnergySupplier.es_number' => 'Klantnummer',
                    'contact.primaryContactEnergySupplier.ean_electricity' => 'EAN electra',
                    'contact.primaryContactEnergySupplier.ean_gas' => 'EAN gas',
                    'project.code' => 'Projectcode',
                    'project.participation_worth' => 'Waarde per deelname',
                    'participations_requested' => 'Deelnames aangevraagd',
                    'participations_granted' => 'Deelnames toegekend',
                    'participations_rest_sale' => 'Deelnames restverkoop',
                    'participations_definitive' => 'Deelnames huidig',
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
                    'iban_contact' => 'Iban contact',
                    'iban_attn_contact' => 'Iban contact uitkeren t.n.v.',
                    'participantProjectStatus.name' => 'Status',
                    'date_register' => 'Inschrijfdatum',
                    'date_end' => 'Einddatum',
                    'participantProjectPayoutType.name' => 'Uitkeren op',
                    'cpStartDate' => 'Contactpersoon startdatum',
                    'cpEndDate' => 'Contactpersoon einddatum',
                    'cpOccupation' => 'Contactpersoon rol',
                    'cpTitle' => 'Contactpersoon aanspreektitel',
                    'cpFullName' => 'Contactpersoon naam',
                    'cpInitials' => 'Contactpersoon initialen',
                    'cpFirstName' => 'Contactpersoon voornaam',
                    'cpLastNamePrefix' => 'Contactpersoon tussenvoegsel',
                    'cpLastName' => 'Contactpersoon achternaam',
                    'cpDateOfBirth' => 'Contactpersoon geboortedatum',
                    'cpPrimaryEmailAddress' => 'Contactpersoon primair e-mailaddress',
                    'cpPrimaryPhonenumber' => 'Contactpersoon primair telefoonnummer',
                    'lrcStartDate' => 'Wettelijke vertegenwoordiger startdatum',
                    'lrcEndDate' => 'Wettelijke vertegenwoordiger einddatum',
                    'lrcOccupation' => 'Wettelijke vertegenwoordiger rol',
                    'lrcTitle' => 'Wettelijke vertegenwoordiger aanspreektitel',
                    'lrcFullName' => 'Wettelijke vertegenwoordiger naam',
                    'lrcInitials' => 'Wettelijke vertegenwoordiger initialen',
                    'lrcFirstName' => 'Wettelijke vertegenwoordiger voornaam',
                    'lrcLastNamePrefix' => 'Wettelijke vertegenwoordiger tussenvoegsel',
                    'lrcLastName' => 'Wettelijke vertegenwoordiger achternaam',
                    'lrcDateOfBirth' => 'Wettelijke vertegenwoordiger geboortedatum',
                    'lrcPrimaryEmailAddress' => 'Wettelijke vertegenwoordiger primair e-mailaddress',
                    'lrcPrimaryPhonenumber' => 'Wettelijke vertegenwoordiger primair telefoonnummer',
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