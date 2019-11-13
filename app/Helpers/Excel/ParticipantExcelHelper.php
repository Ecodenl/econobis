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
        set_time_limit(300);

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
        $headerData[31] = 'Nota adres';
        $headerData[32] = 'Nota huisnummer';
        $headerData[33] = 'Nota toevoeging';
        $headerData[34] = 'Nota postcode';
        $headerData[35] = 'Nota plaats';
        $headerData[36] = 'Nota land';
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
        $headerData[51] = 'Huidig saldo rekening';
        $headerData[52] = 'Totale opbrengsten';
        $headerData[53] = 'Huidig aantal deelnames';
        $headerData[54] = 'Boekwaarde per deelname';
        $headerData[55] = 'Huidige totale waarde';
        $headerData[56] = 'Contract retour';
        $headerData[57] = 'Geschonken door';
        $headerData[58] = 'Akkoord regelement';
        $headerData[59] = 'Jaarlijks verbruik';
        $headerData[60] = 'Iban uitkeren';
        $headerData[61] = 'Iban uitkeren t.n.v.';
        $headerData[62] = 'Iban contact';
        $headerData[63] = 'Iban contact t.n.v.';
        $headerData[64] = 'Eerste ingangsdatum';
        $headerData[65] = 'Uitkeren op';
        $headerData[66] = 'Contactpersoon startdatum';
        $headerData[67] = 'Contactpersoon einddatum';
        $headerData[68] = 'Contactpersoon rol';
        $headerData[69] = 'Contactpersoon aanspreektitel';
        $headerData[70] = 'Contactpersoon naam';
        $headerData[71] = 'Contactpersoon initialen';
        $headerData[72] = 'Contactpersoon voornaam';
        $headerData[73] = 'Contactpersoon tussenvoegsel';
        $headerData[74] = 'Contactpersoon achternaam';
        $headerData[75] = 'Contactpersoon geboortedatum';
        $headerData[76] = 'Contactpersoon primair e-mailaddress';
        $headerData[77] = 'Contactpersoon primair telefoonnummer';
        $headerData[78] = 'Wettelijke vertegenwoordiger startdatum';
        $headerData[79] = 'Wettelijke vertegenwoordiger einddatum';
        $headerData[80] = 'Wettelijke vertegenwoordiger rol';
        $headerData[81] = 'Wettelijke vertegenwoordiger aanspreektitel';
        $headerData[82] = 'Wettelijke vertegenwoordiger naam';
        $headerData[83] = 'Wettelijke vertegenwoordiger initialen';
        $headerData[84] = 'Wettelijke vertegenwoordiger voornaam';
        $headerData[85] = 'Wettelijke vertegenwoordiger tussenvoegsel';
        $headerData[86] = 'Wettelijke vertegenwoordiger achternaam';
        $headerData[87] = 'Wettelijke vertegenwoordiger geboortedatum';
        $headerData[88] = 'Wettelijke vertegenwoordiger primair e-mailaddress';
        $headerData[89] = 'Wettelijke vertegenwoordiger primair telefoonnummer';

        $headerData[90] = 'Type mutatie';
        $headerData[91] = 'Status';
        $headerData[92] = 'Aantal interesse';
        $headerData[93] = 'Bedrag interesse';
        $headerData[94] = 'Datum interesse';
        $headerData[95] = 'Datum log interesse';
        $headerData[96] = 'Aantal ingeschreven';
        $headerData[97] = 'Bedrag ingeschreven';
        $headerData[98] = 'Datum ingeschreven';
        $headerData[99] = 'Datum log ingeschreven';
        $headerData[100] = 'Aantal toegekend';
        $headerData[101] = 'Bedrag toegekend';
        $headerData[102] = 'Datum toegekend';
        $headerData[103] = 'Datum log toegekend';
        $headerData[104] = 'Aantal definitief';
        $headerData[105] = 'Bedrag definitief';
        $headerData[106] = 'Ingangsdatum';
        $headerData[107] = 'Log Ingangsdatum';
        $headerData[108] = 'Opbrengst';
        $headerData[109] = 'Betaaldatum';
        $headerData[110] = 'Boekstuk';
        $headerData[111] = 'Uitgekeerd op';
        $headerData[112] = 'Opbrengst kWh';
        $headerData[113] = 'kWh';
        $headerData[114] = 'Indicatie teruggave EB';

        $completeData[] = $headerData;

        foreach ($this->participants->chunk(500) as $chunk) {
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
                $participant->date_contract_retour = $participant->date_contract_retour
                    ? Carbon::parse($participant->date_contract_retour)->format('d-m-Y') : '';
                $participant->date_register = $participant->date_register
                    ? Carbon::parse($participant->date_register)
                        ->format('d-m-Y') : '';

                $projectTypeCodeRef = $participant->project->projectType->code_ref;
                $currentBalanceAccount = 0;
                if($projectTypeCodeRef == 'loan') {
                    $currentBalanceAccount = $participant->amount_definitive;
                }
                if($projectTypeCodeRef === 'capital' || $projectTypeCodeRef === 'postalcode_link_capital') {
                    $currentBalanceAccount = $participant->participations_capital_worth;
                }
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
                $rowData[48] = $participant->contact->primaryContactEnergySupplier ? 'EAN: ' . $participant->contact->primaryContactEnergySupplier->ean_electricity : '';
                $rowData[49] = $participant->contact->primaryContactEnergySupplier ? 'EAN: ' . $participant->contact->primaryContactEnergySupplier->ean_gas : '';
                $rowData[50] = $projectCode;

                $rowData[51] = $currentBalanceAccount;
                $rowData[52] = $participant->participations_returns_total;
                $rowData[53] = $participant->participations_definitive ;
                $rowData[54] = $currentBookWorth;
                $rowData[55] = $participant->participations_definitive * $currentBookWorth;
                $rowData[56] = $participant->date_contract_retour;
                $rowData[57] = $participant->giftedByContact ? $participant->giftedByContact->full_name : '';
                $rowData[58] = $participant->did_accept_agreement;
                $rowData[59] = $participant->power_kwh_consumption;
                $rowData[60] = $participant->iban_payout;
                $rowData[61] = $participant->iban_attn;
                $rowData[62] = $participant->iban_contact;
                $rowData[63] = $participant->iban_attn_contact;
                $rowData[64] = $participant->date_register;
                $rowData[65] = $participant->participantProjectPayoutType ? $participant->participantProjectPayoutType->name : '';
                $rowData[66] = $participant->cpStartDate;
                $rowData[67] = $participant->cpEndDate;
                $rowData[68] = $participant->cpOccupation;
                $rowData[69] = $participant->cpTitle;
                $rowData[70] = $participant->cpFullName;
                $rowData[71] = $participant->cpInitials;
                $rowData[72] = $participant->cpFirstName;
                $rowData[73] = $participant->cpLastNamePrefix;
                $rowData[74] = $participant->cpLastName;
                $rowData[75] = $participant->cpDateOfBirth;
                $rowData[76] = $participant->cpPrimaryEmailAddress;
                $rowData[77] = $participant->cpPrimaryPhonenumber;
                $rowData[78] = $participant->lrcStartDate;
                $rowData[79] = $participant->lrcEndDate;
                $rowData[80] = $participant->lrcOccupation;
                $rowData[81] = $participant->lrcTitle;
                $rowData[82] = $participant->lrcFullName;
                $rowData[83] = $participant->lrcInitials;
                $rowData[84] = $participant->lrcFirstName;
                $rowData[85] = $participant->lrcLastNamePrefix;
                $rowData[86] = $participant->lrcLastName;
                $rowData[87] = $participant->lrcDateOfBirth;
                $rowData[88] = $participant->lrcPrimaryEmailAddress;
                $rowData[89] = $participant->lrcPrimaryPhonenumber;

                $rowData[90] = "";
                $rowData[91] = "";
                $rowData[92] = $participant->participations_interessed;
                $rowData[93] = $participant->amount_interessed;
                $rowData[94] = "";
                $rowData[95] = "";
                $rowData[96] = $participant->participations_optioned;
                $rowData[97] = $participant->amount_optioned;
                $rowData[98] = "";
                $rowData[99] = "";
                $rowData[100] = $participant->participations_granted;
                $rowData[101] = $participant->amount_granted;
                $rowData[102] = "";
                $rowData[103] = "";
                $rowData[104] = $participant->participations_definitive;
                $rowData[105] = $participant->amount_definitive;
                $rowData[106] = "";
                $rowData[107] = "";
                $rowData[108] = "";
                $rowData[109] = "";
                $rowData[110] = "";
                $rowData[111] = "";
                $rowData[112] = "";
                $rowData[113] = "";

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

                    $rowData[90] = $mutationType ? $mutationType->name : '';
                    $rowData[91] = $mutationStatus ? $mutationStatus->name : '';

                    if($mutationType->code_ref === 'first_deposit' || $mutationType->code_ref === 'deposit' )
                    {
                        $rowData[92] = $mutation->quantity_interest;
                        $rowData[93] = $mutation->amount_interest;
                        $rowData[94] = $mutation->date_interest ? Carbon::parse($mutation->date_interest)->format('d-m-Y') : "";
                        $rowData[95] = $logInterestDateTime;
                        $rowData[96] = $mutation->quantity_option;
                        $rowData[97] = $mutation->amount_option;
                        $rowData[98] = $mutation->date_option ? Carbon::parse($mutation->date_option)->format('d-m-Y') : "";
                        $rowData[99] = $logOptionDateTime;
                        $rowData[100] = $mutation->quantity_granted;
                        $rowData[101] = $mutation->amount_granted;
                        $rowData[102] = $mutation->date_granted ? Carbon::parse($mutation->date_granted)->format('d-m-Y') : "";
                        $rowData[103] = $logGrantedDateTime;
                        $rowData[104] = $mutation->quantity_final;
                        $rowData[105] = $mutation->amount_final;
                        $rowData[106] = $mutation->date_entry ? Carbon::parse($mutation->date_entry)->format('d-m-Y') : "";
                        $rowData[107] = $logFinalDateTime;
                        $rowData[108] = "";
                        $rowData[109] = "";
                        $rowData[110] = "";
                        $rowData[111] = "";
                        $rowData[112] = "";
                        $rowData[113] = "";
                        $rowData[114] = "";
                    }

                    if($mutationType->code_ref === 'result')
                    {
                        $rowData[108] = $mutation->returns;
                        $rowData[109] = $mutation->date_payment ? Carbon::parse($mutation->date_payment)->format('d-m-Y') : "";
                        $rowData[110] = $mutation->entry;
                        $rowData[111] = $mutation->paid_on;
                        $rowData[112] = "";
                        $rowData[113] = "";
                        $rowData[114] = "";
                    }
                    if($mutationType->code_ref === 'energyTaxRefund')
                    {
                        $rowData[108] = "";
                        $rowData[109] = "";
                        $rowData[110] = "";
                        $rowData[111] = "";
                        $rowData[112] = $mutation->payout_kwh_price;
                        $rowData[113] = $mutation->payout_kwh;
                        $rowData[114] = $mutation->indication_of_restitution_energy_tax;
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