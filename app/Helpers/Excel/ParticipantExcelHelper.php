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
        $headerData[] = '#participant';
        $headerData[] = '#mutation';
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

        $headerData[] = 'Type mutatie';
        $headerData[] = 'Status';
        $headerData[] = 'Aantal interesse';
        $headerData[] = 'Bedrag interesse';
        $headerData[] = 'Datum interesse';
        $headerData[] = 'Datum log interesse';
        $headerData[] = 'Aantal ingeschreven';
        $headerData[] = 'Bedrag ingeschreven';
        $headerData[] = 'Datum ingeschreven';
        $headerData[] = 'Datum log ingeschreven';
        $headerData[] = 'Aantal toegekend';
        $headerData[] = 'Bedrag toegekend';
        $headerData[] = 'Datum toegekend';
        $headerData[] = 'Datum log toegekend';
        $headerData[] = 'Aantal definitief';
        $headerData[] = 'Bedrag definitief';
        $headerData[] = 'Ingangsdatum';
        $headerData[] = 'Log Ingangsdatum';

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
                $rowData[0] = $participant->id;
                $rowData[1] = 0;
                $rowData[2] = $participant->contact->id;
                $rowData[3] = $participant->contact->number;
                $rowData[4] = $participant->project->name;
                $rowData[5] = $participant->contact->full_name;
                $rowData[6] = $participant->contact->organisation ? $participant->contact->organisation->name : '';
                $rowData[7] = $participant->title ? $participant->title->name : '';
                $rowData[8] = $participant->initials;
                $rowData[9] = $participant->first_name;
                $rowData[10] = $participant->last_name_prefix;
                $rowData[11] = $participant->last_name;
                $rowData[12] = $participant->date_of_birth;
                $rowData[13] = $participant['address_deliver']['street'];
                $rowData[14] = $participant['address_deliver']['number'];
                $rowData[15] = $participant['address_deliver']['addition'];
                $rowData[16] = $participant['address_deliver']['postal_code'];
                $rowData[17] = $participant['address_deliver']['city'];
                $rowData[18] = $participant['address_deliver']['country'];
                $rowData[19] = $participant['address_visit']['street'];
                $rowData[20] = $participant['address_visit']['number'];
                $rowData[21] = $participant['address_visit']['addition'];
                $rowData[22] = $participant['address_visit']['postal_code'];
                $rowData[23] = $participant['address_visit']['city'];
                $rowData[24] = $participant['address_visit']['country'];
                $rowData[25] = $participant['address_postal']['street'];
                $rowData[26] = $participant['address_postal']['number'];
                $rowData[27] = $participant['address_postal']['addition'];
                $rowData[28] = $participant['address_postal']['postal_code'];
                $rowData[29] = $participant['address_postal']['city'];
                $rowData[30] = $participant['address_postal']['country'];
                $rowData[31] = $participant['address_invoice']['street'];
                $rowData[32] = $participant['address_invoice']['number'];
                $rowData[33] = $participant['address_invoice']['addition'];
                $rowData[34] = $participant['address_invoice']['postal_code'];
                $rowData[35] = $participant['address_invoice']['city'];
                $rowData[36] = $participant['address_invoice']['country'];
                $rowData[37] = $participant->contact->primaryEmailAddress ? $participant->contact->primaryEmailAddress->email : '';
                $rowData[38] = $participant->emailAddress_2;
                $rowData[39] = $participant->emailAddress_3;
                $rowData[40] = $participant->emailAddress_4;
                $rowData[41] = $participant->emailAddress_5;
                $rowData[42] = $participant->contact->primaryphoneNumber ? $participant->contact->primaryphoneNumber->number : '';
                $rowData[43] = $participant->phonenumber_2;
                $rowData[44] = $participant->phonenumber_3;
                $rowData[45] = $participant->energy_supplier_name;
                $rowData[46] = $participant->energy_supplier_member_since;
                $rowData[47] = $participant->contact->primaryContactEnergySupplier ? $participant->contact->primaryContactEnergySupplier->es_number : '';
                $rowData[48] = $participant->contact->primaryContactEnergySupplier ? $participant->contact->primaryContactEnergySupplier->ean_electricity : '';
                $rowData[49] = $participant->contact->primaryContactEnergySupplier ? $participant->contact->primaryContactEnergySupplier->ean_gas : '';
                $rowData[50] = $participant->project->code;
                $rowData[51] = $participant->project->participation_worth;
                $rowData[52] = $participant->participations_requested;
                $rowData[53] = $participant->participations_granted;
                $rowData[54] = $participant->participations_rest_sale;
                $rowData[55] = $participant->participations_definitive;
                $rowData[56] = $participant->participations_worth_total;
                $rowData[57] = $participant->date_contract_send;
                $rowData[58] = $participant->date_contract_retour;
                $rowData[59] = $participant->date_payed;
                $rowData[60] = $participant->giftedByContact ? $participant->giftedByContact->full_name : '';
                $rowData[61] = $participant->did_accept_agreement;
                $rowData[62] = $participant->power_kwh_consumption;
                $rowData[63] = $participant->iban_payout;
                $rowData[64] = $participant->iban_attn;
                $rowData[65] = $participant->iban_contact;
                $rowData[66] = $participant->iban_attn_contact;
                $rowData[67] = $participant->date_register;
                $rowData[68] = $participant->date_end;
                $rowData[69] = $participant->participantProjectPayoutType ? $participant->participantProjectPayoutType->name : '';
                $rowData[70] = $participant->cpStartDate;
                $rowData[71] = $participant->cpEndDate;
                $rowData[72] = $participant->cpOccupation;
                $rowData[73] = $participant->cpTitle;
                $rowData[74] = $participant->cpFullName;
                $rowData[75] = $participant->cpInitials;
                $rowData[76] = $participant->cpFirstName;
                $rowData[77] = $participant->cpLastNamePrefix;
                $rowData[78] = $participant->cpLastName;
                $rowData[79] = $participant->cpDateOfBirth;
                $rowData[80] = $participant->cpPrimaryEmailAddress;
                $rowData[81] = $participant->cpPrimaryPhonenumber;
                $rowData[82] = $participant->lrcStartDate;
                $rowData[83] = $participant->lrcEndDate;
                $rowData[84] = $participant->lrcOccupation;
                $rowData[85] = $participant->lrcTitle;
                $rowData[86] = $participant->lrcFullName;
                $rowData[87] = $participant->lrcInitials;
                $rowData[88] = $participant->lrcFirstName;
                $rowData[89] = $participant->lrcLastNamePrefix;
                $rowData[90] = $participant->lrcLastName;
                $rowData[91] = $participant->lrcDateOfBirth;
                $rowData[92] = $participant->lrcPrimaryEmailAddress;
                $rowData[93] = $participant->lrcPrimaryPhonenumber;

                $rowData[94] = "";
                $rowData[95] = "";
                $rowData[96] = $participant->participations_interessed;
                $rowData[97] = $participant->amount_interessed;
                $rowData[98] = "";
                $rowData[99] = "";
                $rowData[100] = $participant->participations_optioned;
                $rowData[101] = $participant->amount_optioned;
                $rowData[102] = "";
                $rowData[103] = "";
                $rowData[104] = $participant->participations_granted;
                $rowData[105] = $participant->amount_granted;
                $rowData[106] = "";
                $rowData[107] = "";
                $rowData[108] = $participant->participations_definitive;
                $rowData[109] = $participant->amount_definitive;
                $rowData[110] = "";
                $rowData[111] = "";

                $completeData[] = $rowData;

                foreach ($participant->mutations as $mutation) {
                    $rowData[1] = $mutation->id;

                    $mutationType = $mutation->type;
                    $mutationStatus = $mutation->status;
                    $mutationStatusLogInterest = $mutation->statusLog->where('to_status_id', 1)->first();
                    $logInterestDateTime = $mutationStatusLogInterest ? Carbon::parse($mutationStatusLogInterest->date_status)->format('d-m-Y H:i:s') : "";
                    $mutationStatusLogOption   = $mutation->statusLog->where('to_status_id', 2)->first();
                    $logOptionDateTime = $mutationStatusLogOption ? Carbon::parse($mutationStatusLogOption->date_status)->format('d-m-Y H:i:s') : "";
                    $mutationStatusLogGranted  = $mutation->statusLog->where('to_status_id', 3)->first();
                    $logGrantedDateTime = $mutationStatusLogGranted ? Carbon::parse($mutationStatusLogGranted->date_status)->format('d-m-Y H:i:s') : "";
                    $mutationStatusLogFinal    = $mutation->statusLog->where('to_status_id', 4)->first();
                    $logFinalDateTime = $mutationStatusLogFinal ? Carbon::parse($mutationStatusLogFinal->date_status)->format('d-m-Y H:i:s') : "";

                    if($mutationType->code_ref === 'first_deposit' || $mutationType->code_ref === 'deposit' )
                    {
                        $rowData[94] = $mutationType->name;
                        $rowData[95] = $mutationStatus->name;
                        $rowData[96] = $mutation->quantity_interessed;
                        $rowData[97] = $mutation->amount_interest;
                        $rowData[98] = $mutation->date_interest ? Carbon::parse($mutation->date_interest)->format('d-m-Y') : "";
                        $rowData[99] = $logInterestDateTime;
                        $rowData[100] = $mutation->quantity_optioned;
                        $rowData[101] = $mutation->amount_option;
                        $rowData[102] = $mutation->date_option ? Carbon::parse($mutation->date_option)->format('d-m-Y') : "";
                        $rowData[103] = $logOptionDateTime;
                        $rowData[104] = $mutation->quantity_granted;
                        $rowData[105] = $mutation->amount_granted;
                        $rowData[106] = $mutation->date_granted ? Carbon::parse($mutation->date_granted)->format('d-m-Y') : "";
                        $rowData[107] = $logGrantedDateTime;
                        $rowData[108] = $mutation->quantity_final;
                        $rowData[109] = $mutation->amount_final;
                        $rowData[110] = $mutation->date_entry ? Carbon::parse($mutation->date_entry)->format('d-m-Y') : "";
                        $rowData[111] = $logFinalDateTime;

                        $completeData[] = $rowData;
                    }

                }

            }
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        for ($col = 'A'; $col !== 'DI'; $col++) {
            $spreadsheet->getActiveSheet()
                ->getColumnDimension($col)
                ->setAutoSize(true);
        }

        $sheet->getStyle('A1:DH1')
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