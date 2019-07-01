<?php

namespace App\Helpers\Excel;

use App\Eco\Address\AddressType;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class ParticipantExcelHelper
{
    private $participants;

    public function __construct($participants)
    {
        $this->participants = $participants;
    }

    public function downloadExcel()
    {
        $completeData = [];

        $headerData = [];
        $headerData[] = '#';
        $headerData[] = 'Contact id';
        $headerData[] = 'Contactnummer';
        $headerData[] = 'Deelname naam';
        $headerData[] = 'Naam';
        $headerData[] = 'Organisatie';
        $headerData[] = 'Aanspreektitel';
        $headerData[] = 'Initialen';
        $headerData[] = 'Voornaam';
        $headerData[] = 'Tussenvoegsel';
        $headerData[] = 'Achternaam';
        $headerData[] = 'Geboortedatum';
        $headerData[] = 'Bezorg adres';
        $headerData[] = 'Bezorg huisnummer';
        $headerData[] = 'Bezorg toevoeging';
        $headerData[] = 'Bezorg postcode';
        $headerData[] = 'Bezorg plaats';
        $headerData[] = 'Bezorg land';
        $headerData[] = 'Bezoek adres';
        $headerData[] = 'Bezoek huisnummer';
        $headerData[] = 'Bezoek toevoeging';
        $headerData[] = 'Bezoek postcode';
        $headerData[] = 'Bezoek plaats';
        $headerData[] = 'Bezoek land';
        $headerData[] = 'Post adres';
        $headerData[] = 'Post huisnummer';
        $headerData[] = 'Post toevoeging';
        $headerData[] = 'Post postcode';
        $headerData[] = 'Post plaats';
        $headerData[] = 'Post land';
        $headerData[] = 'Factuur adres';
        $headerData[] = 'Factuur huisnummer';
        $headerData[] = 'Factuur toevoeging';
        $headerData[] = 'Factuur postcode';
        $headerData[] = 'Factuur plaats';
        $headerData[] = 'Factuur land';
        $headerData[] = 'Email primair';
        $headerData[] = 'Email 2';
        $headerData[] = 'Email 3';
        $headerData[] = 'Email 4';
        $headerData[] = 'Email 5';
        $headerData[] = 'Telefoonnummer primair';
        $headerData[] = 'Telefoonnummer 2';
        $headerData[] = 'Telefoonnummer 3';
        $headerData[] = 'Energieleverancier';
        $headerData[] = 'Energieleverancier klant sinds';
        $headerData[] = 'Klantnummer';
        $headerData[] = 'EAN electra';
        $headerData[] = 'EAN gas';
        $headerData[] = 'Projectcode';
        $headerData[] = 'Waarde per deelname';
        $headerData[] = 'Deelnames aangevraagd';
        $headerData[] = 'Deelnames toegekend';
        $headerData[] = 'Deelnames restverkoop';
        $headerData[] = 'Deelnames huidig';
        $headerData[] = 'Hudige waarde';
        $headerData[] = 'Contract verstuurd';
        $headerData[] = 'Contract retour';
        $headerData[] = 'Betaald op';
        $headerData[] = 'Wettelijk vertegenwoordiger';
        $headerData[] = 'Geschonken door';
        $headerData[] = 'Akkoord regelement';
        $headerData[] = 'Jaarlijks verbruik';
        $headerData[] = 'Iban uitkeren';
        $headerData[] = 'Iban uitkeren t.n.v.';
        $headerData[] = 'Iban contact';
        $headerData[] = 'Iban contact t.n.v.';
        $headerData[] = 'Inschrijfdatum';
        $headerData[] = 'Einddatum';
        $headerData[] = 'Uitkeren op';
        $headerData[] = 'Contactpersoon startdatum';
        $headerData[] = 'Contactpersoon einddatum';
        $headerData[] = 'Contactpersoon rol';
        $headerData[] = 'Contactpersoon aanspreektitel';
        $headerData[] = 'Contactpersoon naam';
        $headerData[] = 'Contactpersoon initialen';
        $headerData[] = 'Contactpersoon voornaam';
        $headerData[] = 'Contactpersoon tussenvoegsel';
        $headerData[] = 'Contactpersoon achternaam';
        $headerData[] = 'Contactpersoon geboortedatum';
        $headerData[] = 'Contactpersoon primair e-mailaddress';
        $headerData[] = 'Contactpersoon primair telefoonnummer';
        $headerData[] = 'Wettelijke vertegenwoordiger startdatum';
        $headerData[] = 'Wettelijke vertegenwoordiger einddatum';
        $headerData[] = 'Wettelijke vertegenwoordiger rol';
        $headerData[] = 'Wettelijke vertegenwoordiger aanspreektitel';
        $headerData[] = 'Wettelijke vertegenwoordiger naam';
        $headerData[] = 'Wettelijke vertegenwoordiger initialen';
        $headerData[] = 'Wettelijke vertegenwoordiger voornaam';
        $headerData[] = 'Wettelijke vertegenwoordiger tussenvoegsel';
        $headerData[] = 'Wettelijke vertegenwoordiger achternaam';
        $headerData[] = 'Wettelijke vertegenwoordiger geboortedatum';
        $headerData[] = 'Wettelijke vertegenwoordiger primair e-mailaddress';
        $headerData[] = 'Wettelijke vertegenwoordiger primair telefoonnummer';

        $completeData[] = $headerData;

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

                $rowData = [];
                $rowData[] = $participant->id;
                $rowData[] = $participant->contact->id;
                $rowData[] = $participant->contact->number;
                $rowData[] = $participant->project->name;
                $rowData[] = $participant->contact->full_name;
                $rowData[] = $participant->contact->organisation ? $participant->contact->organisation->name : '';
                $rowData[] = $participant->title ? $participant->title->name : '';
                $rowData[] = $participant->initials;
                $rowData[] = $participant->first_name;
                $rowData[] = $participant->last_name_prefix;
                $rowData[] = $participant->last_name;
                $rowData[] = $participant->date_of_birth;
                $rowData[] = $participant['address_deliver']['street'];
                $rowData[] = $participant['address_deliver']['number'];
                $rowData[] = $participant['address_deliver']['addition'];
                $rowData[] = $participant['address_deliver']['postal_code'];
                $rowData[] = $participant['address_deliver']['city'];
                $rowData[] = $participant['address_deliver']['country'];
                $rowData[] = $participant['address_visit']['street'];
                $rowData[] = $participant['address_visit']['number'];
                $rowData[] = $participant['address_visit']['addition'];
                $rowData[] = $participant['address_visit']['postal_code'];
                $rowData[] = $participant['address_visit']['city'];
                $rowData[] = $participant['address_visit']['country'];
                $rowData[] = $participant['address_postal']['street'];
                $rowData[] = $participant['address_postal']['number'];
                $rowData[] = $participant['address_postal']['addition'];
                $rowData[] = $participant['address_postal']['postal_code'];
                $rowData[] = $participant['address_postal']['city'];
                $rowData[] = $participant['address_postal']['country'];
                $rowData[] = $participant['address_invoice']['street'];
                $rowData[] = $participant['address_invoice']['number'];
                $rowData[] = $participant['address_invoice']['addition'];
                $rowData[] = $participant['address_invoice']['postal_code'];
                $rowData[] = $participant['address_invoice']['city'];
                $rowData[] = $participant['address_invoice']['country'];
                $rowData[] = $participant->contact->primaryEmailAddress ? $participant->contact->primaryEmailAddress->email : '';
                $rowData[] = $participant->emailAddress_2;
                $rowData[] = $participant->emailAddress_3;
                $rowData[] = $participant->emailAddress_4;
                $rowData[] = $participant->emailAddress_5;
                $rowData[] = $participant->contact->primaryphoneNumber ? $participant->contact->primaryphoneNumber->number : '';
                $rowData[] = $participant->phonenumber_2;
                $rowData[] = $participant->phonenumber_3;
                $rowData[] = $participant->energy_supplier_name;
                $rowData[] = $participant->energy_supplier_member_since;
                $rowData[] = $participant->contact->primaryContactEnergySupplier ? $participant->contact->primaryContactEnergySupplier->es_number : '';
                $rowData[] = $participant->contact->primaryContactEnergySupplier ? $participant->contact->primaryContactEnergySupplier->ean_electricity : '';
                $rowData[] = $participant->contact->primaryContactEnergySupplier ? $participant->contact->primaryContactEnergySupplier->ean_gas : '';
                $rowData[] = $participant->project->code;
                $rowData[] = $participant->project->participation_worth;
                $rowData[] = $participant->participations_requested;
                $rowData[] = $participant->participations_granted;
                $rowData[] = $participant->participations_rest_sale;
                $rowData[] = $participant->participations_definitive;
                $rowData[] = $participant->participations_worth_total;
                $rowData[] = $participant->date_contract_send;
                $rowData[] = $participant->date_contract_retour;
                $rowData[] = $participant->date_payed;
                $rowData[] = $participant->legalRepContact ? $participant->legalRepContact->full_name : '';
                $rowData[] = $participant->giftedByContact ? $participant->giftedByContact->full_name : '';
                $rowData[] = $participant->did_accept_agreement;
                $rowData[] = $participant->power_kwh_consumption;
                $rowData[] = $participant->iban_payout;
                $rowData[] = $participant->iban_attn;
                $rowData[] = $participant->iban_contact;
                $rowData[] = $participant->iban_attn_contact;
                $rowData[] = $participant->date_register;
                $rowData[] = $participant->date_end;
                $rowData[] = $participant->participantProjectPayoutType ? $participant->participantProjectPayoutType->name : '';
                $rowData[] = $participant->cpStartDate;
                $rowData[] = $participant->cpEndDate;
                $rowData[] = $participant->cpOccupation;
                $rowData[] = $participant->cpTitle;
                $rowData[] = $participant->cpFullName;
                $rowData[] = $participant->cpInitials;
                $rowData[] = $participant->cpFirstName;
                $rowData[] = $participant->cpLastNamePrefix;
                $rowData[] = $participant->cpLastName;
                $rowData[] = $participant->cpDateOfBirth;
                $rowData[] = $participant->cpPrimaryEmailAddress;
                $rowData[] = $participant->cpPrimaryPhonenumber;
                $rowData[] = $participant->lrcStartDate;
                $rowData[] = $participant->lrcEndDate;
                $rowData[] = $participant->lrcOccupation;
                $rowData[] = $participant->lrcTitle;
                $rowData[] = $participant->lrcFullName;
                $rowData[] = $participant->lrcInitials;
                $rowData[] = $participant->lrcFirstName;
                $rowData[] = $participant->lrcLastNamePrefix;
                $rowData[] = $participant->lrcLastName;
                $rowData[] = $participant->lrcDateOfBirth;
                $rowData[] = $participant->lrcPrimaryEmailAddress;
                $rowData[] = $participant->lrcPrimaryPhonenumber;

                $completeData[] = $rowData;
            }
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        for ($col = 'A'; $col !== 'CZ'; $col++) {
            $spreadsheet->getActiveSheet()
                ->getColumnDimension($col)
                ->setAutoSize(true);
        }

        $sheet->getStyle('A1:CZ1')
            ->applyFromArray([
                'font' => [
                    'bold' => true,
                ],

            ]);

        // Load all data in worksheet
        $sheet->fromArray($completeData);

        $writer = new Xlsx($spreadsheet);
        $document = $writer->save('php://output');
        return $document;
    }
    private function formatDate($date) {
        $formatDate = $date ? new Carbon($date) : false;
        return $formatDate ? $formatDate->format('d-m-Y') : '';
    }

}