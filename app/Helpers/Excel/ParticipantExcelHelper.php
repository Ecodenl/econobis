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
        $headerData[0] = '#participant';
        $headerData[1] = '#mutation';
        $headerData[2] = 'Contact id';
        $headerData[3] = 'Contactnummer';
        $headerData[4] = 'Deelname naam';
        $headerData[5] = 'Naam';
        $headerData[6] = 'Organisatie';
        $headerData[7] = 'Aanspreektitel';
        $headerData[8] = 'Initialen';
        $headerData[9] = 'Voornaam';
        $headerData[10] = 'Tussenvoegsel';
        $headerData[11] = 'Achternaam';
        $headerData[12] = 'Geboortedatum';
        $headerData[13] = 'Bezorg adres';
        $headerData[14] = 'Bezorg huisnummer';
        $headerData[15] = 'Bezorg toevoeging';
        $headerData[16] = 'Bezorg postcode';
        $headerData[17] = 'Bezorg plaats';
        $headerData[18] = 'Bezorg land';
        $headerData[19] = 'Bezoek adres';
        $headerData[20] = 'Bezoek huisnummer';
        $headerData[21] = 'Bezoek toevoeging';
        $headerData[22] = 'Bezoek postcode';
        $headerData[23] = 'Bezoek plaats';
        $headerData[24] = 'Bezoek land';
        $headerData[25] = 'Post adres';
        $headerData[26] = 'Post huisnummer';
        $headerData[27] = 'Post toevoeging';
        $headerData[28] = 'Post postcode';
        $headerData[29] = 'Post plaats';
        $headerData[30] = 'Post land';
        $headerData[31] = 'Factuur adres';
        $headerData[32] = 'Factuur huisnummer';
        $headerData[33] = 'Factuur toevoeging';
        $headerData[34] = 'Factuur postcode';
        $headerData[35] = 'Factuur plaats';
        $headerData[36] = 'Factuur land';
        $headerData[37] = 'Email primair';
        $headerData[38] = 'Email 2';
        $headerData[39] = 'Email 3';
        $headerData[40] = 'Email 4';
        $headerData[41] = 'Email 5';
        $headerData[42] = 'Telefoonnummer primair';
        $headerData[43] = 'Telefoonnummer 2';
        $headerData[44] = 'Telefoonnummer 3';
        $headerData[45] = 'Energieleverancier';
        $headerData[46] = 'Energieleverancier klant sinds';
        $headerData[47] = 'Klantnummer';
        $headerData[48] = 'EAN electra';
        $headerData[49] = 'EAN gas';
        $headerData[50] = 'Projectcode';
        $headerData[51] = 'Waarde per deelname';
        $headerData[52] = 'Deelnames aangevraagd';
        $headerData[53] = 'Deelnames toegekend';
        $headerData[54] = 'Deelnames restverkoop';
        $headerData[55] = 'Deelnames huidig';
        $headerData[56] = 'Huidige waarde';
        $headerData[57] = 'Contract verstuurd';
        $headerData[58] = 'Contract retour';
        $headerData[59] = 'Betaald op';
        $headerData[60] = 'Geschonken door';
        $headerData[61] = 'Akkoord regelement';
        $headerData[62] = 'Jaarlijks verbruik';
        $headerData[63] = 'Iban uitkeren';
        $headerData[64] = 'Iban uitkeren t.n.v.';
        $headerData[65] = 'Iban contact';
        $headerData[66] = 'Iban contact t.n.v.';
        $headerData[67] = 'Inschrijfdatum';
        $headerData[68] = 'Einddatum';
        $headerData[69] = 'Uitkeren op';
        $headerData[70] = 'Contactpersoon startdatum';
        $headerData[71] = 'Contactpersoon einddatum';
        $headerData[72] = 'Contactpersoon rol';
        $headerData[73] = 'Contactpersoon aanspreektitel';
        $headerData[74] = 'Contactpersoon naam';
        $headerData[75] = 'Contactpersoon initialen';
        $headerData[76] = 'Contactpersoon voornaam';
        $headerData[77] = 'Contactpersoon tussenvoegsel';
        $headerData[78] = 'Contactpersoon achternaam';
        $headerData[79] = 'Contactpersoon geboortedatum';
        $headerData[80] = 'Contactpersoon primair e-mailaddress';
        $headerData[81] = 'Contactpersoon primair telefoonnummer';
        $headerData[82] = 'Wettelijke vertegenwoordiger startdatum';
        $headerData[83] = 'Wettelijke vertegenwoordiger einddatum';
        $headerData[84] = 'Wettelijke vertegenwoordiger rol';
        $headerData[85] = 'Wettelijke vertegenwoordiger aanspreektitel';
        $headerData[86] = 'Wettelijke vertegenwoordiger naam';
        $headerData[87] = 'Wettelijke vertegenwoordiger initialen';
        $headerData[88] = 'Wettelijke vertegenwoordiger voornaam';
        $headerData[89] = 'Wettelijke vertegenwoordiger tussenvoegsel';
        $headerData[90] = 'Wettelijke vertegenwoordiger achternaam';
        $headerData[91] = 'Wettelijke vertegenwoordiger geboortedatum';
        $headerData[92] = 'Wettelijke vertegenwoordiger primair e-mailaddress';
        $headerData[93] = 'Wettelijke vertegenwoordiger primair telefoonnummer';

        $headerData[94] = 'Type mutatie';
        $headerData[95] = 'Status';
        $headerData[96] = 'Aantal interesse';
        $headerData[97] = 'Bedrag interesse';
        $headerData[98] = 'Datum interesse';
        $headerData[99] = 'Datum log interesse';
        $headerData[100] = 'Aantal ingeschreven';
        $headerData[101] = 'Bedrag ingeschreven';
        $headerData[102] = 'Datum ingeschreven';
        $headerData[103] = 'Datum log ingeschreven';
        $headerData[104] = 'Aantal toegekend';
        $headerData[105] = 'Bedrag toegekend';
        $headerData[106] = 'Datum toegekend';
        $headerData[107] = 'Datum log toegekend';
        $headerData[108] = 'Aantal definitief';
        $headerData[109] = 'Bedrag definitief';
        $headerData[110] = 'Ingangsdatum';
        $headerData[111] = 'Log Ingangsdatum';
        $headerData[112] = 'Opbrengst';
        $headerData[113] = 'Betaaldatum';
        $headerData[114] = 'Boekstuk';
        $headerData[115] = 'Uitgekeerd op';

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
                $projectCode = $participant->project->code;
                $currentBookWorth = $participant->project->currentBookWorth();

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
                $rowData[50] = $projectCode;
                $rowData[51] = $currentBookWorth;
                $rowData[52] = $participant->participations_requested;
                $rowData[53] = $participant->participations_granted;
                $rowData[54] = $participant->participations_rest_sale;
                $rowData[55] = $participant->participations_definitive;
                $rowData[56] = $participant->participations_definitive * $currentBookWorth;
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
                $rowData[112] = "";
                $rowData[113] = "";
                $rowData[114] = "";
                $rowData[115] = "";

//                $completeData[] = $rowData;

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

                    $rowData[94] = $mutationType->name;
                    $rowData[95] = $mutationStatus->name;

                    if($mutationType->code_ref === 'first_deposit' || $mutationType->code_ref === 'deposit' )
                    {
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
                        $rowData[112] = "";
                        $rowData[113] = "";
                        $rowData[114] = "";
                        $rowData[115] = "";

                    }

                    if($mutationType->code_ref === 'result')
                    {
                        $rowData[112] = $mutation->returns;
                        $rowData[113] = $mutation->date_payment ? Carbon::parse($mutation->date_payment)->format('d-m-Y') : "";
                        $rowData[114] = $mutation->entry;
                        $rowData[115] = $mutation->paid_on;
                    }

                    $completeData[] = $rowData;
                }

            }
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        for ($col = 'A'; $col !== 'DL'; $col++) {
            $spreadsheet->getActiveSheet()
                ->getColumnDimension($col)
                ->setAutoSize(true);
        }

        $sheet->getStyle('1:1')->getFont()->setBold(true);

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