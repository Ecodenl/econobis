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
        $headerData[58] = 'Akkoord voorwaarden';
        $headerData[59] = 'Datum akkoord';
        $headerData[60] = 'Projectinfo begrepen';
        $headerData[61] = 'Datum begrepen';
        $headerData[62] = 'Jaarlijks verbruik';
        $headerData[63] = 'Iban uitkeren';
        $headerData[64] = 'Iban uitkeren t.n.v.';
        $headerData[65] = 'Iban contact';
        $headerData[66] = 'Iban contact t.n.v.';
        $headerData[67] = 'Eerste ingangsdatum deelname';
        $headerData[68] = 'Uitkeren op';
        $headerData[69] = 'Contactpersoon startdatum';
        $headerData[70] = 'Contactpersoon einddatum';
        $headerData[71] = 'Contactpersoon rol';
        $headerData[72] = 'Contactpersoon aanspreektitel';
        $headerData[73] = 'Contactpersoon naam';
        $headerData[74] = 'Contactpersoon initialen';
        $headerData[75] = 'Contactpersoon voornaam';
        $headerData[76] = 'Contactpersoon tussenvoegsel';
        $headerData[77] = 'Contactpersoon achternaam';
        $headerData[78] = 'Contactpersoon geboortedatum';
        $headerData[79] = 'Contactpersoon primair e-mailaddress';
        $headerData[80] = 'Contactpersoon primair telefoonnummer';
        $headerData[81] = 'Wettelijke vertegenwoordiger startdatum';
        $headerData[82] = 'Wettelijke vertegenwoordiger einddatum';
        $headerData[83] = 'Wettelijke vertegenwoordiger rol';
        $headerData[84] = 'Wettelijke vertegenwoordiger aanspreektitel';
        $headerData[85] = 'Wettelijke vertegenwoordiger naam';
        $headerData[86] = 'Wettelijke vertegenwoordiger initialen';
        $headerData[87] = 'Wettelijke vertegenwoordiger voornaam';
        $headerData[88] = 'Wettelijke vertegenwoordiger tussenvoegsel';
        $headerData[89] = 'Wettelijke vertegenwoordiger achternaam';
        $headerData[90] = 'Wettelijke vertegenwoordiger geboortedatum';
        $headerData[91] = 'Wettelijke vertegenwoordiger primair e-mailaddress';
        $headerData[92] = 'Wettelijke vertegenwoordiger primair telefoonnummer';

        $headerData[93] = 'Type mutatie';
        $headerData[94] = 'Status';
        $headerData[95] = 'Deelname status';
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
        $headerData[116] = 'Opbrengst kWh';
        $headerData[117] = 'kWh';
        $headerData[118] = 'Indicatie teruggave EB';

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
                $participant->did_understand_info = $participant->did_understand_info ? 'Ja' : 'Nee';
                // Reformat dates
                $participant->date_contract_retour = $participant->date_contract_retour
                    ? Carbon::parse($participant->date_contract_retour)->format('d-m-Y') : '';
                $participant->date_register = $participant->date_register
                    ? Carbon::parse($participant->date_register)
                        ->format('d-m-Y') : '';
                $participant->date_did_accept_agreement = $participant->date_did_accept_agreement
                    ? Carbon::parse($participant->date_did_accept_agreement)
                        ->format('d-m-Y') : '';
                $participant->date_did_understand_info = $participant->date_did_understand_info
                    ? Carbon::parse($participant->date_did_understand_info)
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
                $rowData[48] = $participant->contact->primaryContactEnergySupplier && !empty($participant->contact->primaryContactEnergySupplier->ean_electricity) ? 'EAN: ' . $participant->contact->primaryContactEnergySupplier->ean_electricity : '';
                $rowData[49] = $participant->contact->primaryContactEnergySupplier && !empty($participant->contact->primaryContactEnergySupplier->ean_gas) ? 'EAN: ' . $participant->contact->primaryContactEnergySupplier->ean_gas : '';
                $rowData[50] = $projectCode;
                $rowData[51] = $currentBalanceAccount;
                $rowData[52] = $participant->participations_returns_total;
                $rowData[53] = $participant->participations_definitive ;
                $rowData[54] = $currentBookWorth;
                $rowData[55] = $participant->participations_definitive * $currentBookWorth;
                $rowData[56] = $participant->date_contract_retour;
                $rowData[57] = $participant->giftedByContact ? $participant->giftedByContact->full_name : '';
                $rowData[58] = $participant->did_accept_agreement;
                $rowData[59] = $participant->date_did_accept_agreement;
                $rowData[60] = $participant->did_understand_info;
                $rowData[61] = $participant->date_did_understand_info;
                $rowData[62] = $participant->power_kwh_consumption;
                $rowData[63] = $participant->iban_payout;
                $rowData[64] = $participant->iban_payout_attn;
                $rowData[65] = $participant->iban_contact;
                $rowData[66] = $participant->iban_attn_contact;
                $rowData[67] = $participant->date_register;
                $rowData[68] = $participant->participantProjectPayoutType ? $participant->participantProjectPayoutType->name : '';
                $rowData[69] = $participant->cpStartDate;
                $rowData[70] = $participant->cpEndDate;
                $rowData[71] = $participant->cpOccupation;
                $rowData[72] = $participant->cpTitle;
                $rowData[73] = $participant->cpFullName;
                $rowData[74] = $participant->cpInitials;
                $rowData[75] = $participant->cpFirstName;
                $rowData[76] = $participant->cpLastNamePrefix;
                $rowData[77] = $participant->cpLastName;
                $rowData[78] = $participant->cpDateOfBirth;
                $rowData[79] = $participant->cpPrimaryEmailAddress;
                $rowData[80] = $participant->cpPrimaryPhonenumber;
                $rowData[81] = $participant->lrcStartDate;
                $rowData[82] = $participant->lrcEndDate;
                $rowData[83] = $participant->lrcOccupation;
                $rowData[84] = $participant->lrcTitle;
                $rowData[85] = $participant->lrcFullName;
                $rowData[86] = $participant->lrcInitials;
                $rowData[87] = $participant->lrcFirstName;
                $rowData[88] = $participant->lrcLastNamePrefix;
                $rowData[89] = $participant->lrcLastName;
                $rowData[90] = $participant->lrcDateOfBirth;
                $rowData[91] = $participant->lrcPrimaryEmailAddress;
                $rowData[92] = $participant->lrcPrimaryPhonenumber;

                $rowData[93] = "";
                $rowData[94] = "";
                $rowData[95] =implode(', ', collect($participant->getUniqueMutationStatusesAttribute())->pluck('name')->toArray());
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
                $rowData[116] = "";
                $rowData[117] = "";
                $rowData[118] = "";

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

                    $rowData[93] = $mutationType ? $mutationType->name : '';
                    $rowData[94] = $mutationStatus ? $mutationStatus->name : '';

                    if($mutationType->code_ref === 'first_deposit' || $mutationType->code_ref === 'deposit' || $mutationType->code_ref === 'withDrawal' )
                    {
                        $rowData[96] = $mutation->quantity_interest;
                        $rowData[97] = $mutation->amount_interest;
                        $rowData[98] = $mutation->date_interest ? Carbon::parse($mutation->date_interest)->format('d-m-Y') : "";
                        $rowData[99] = $logInterestDateTime;
                        $rowData[100] = $mutation->quantity_option;
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
                        $rowData[116] = "";
                        $rowData[117] = "";
                        $rowData[118] = "";
                    }

                    if($mutationType->code_ref === 'redemption')
                    {
                        $rowData[96] = "";
                        $rowData[97] = "";
                        $rowData[98] = "";
                        $rowData[99] = "";
                        $rowData[100] = "";
                        $rowData[101] = "";
                        $rowData[102] = "";
                        $rowData[103] = "";
                        $rowData[104] = "";
                        $rowData[105] = "";
                        $rowData[106] = "";
                        $rowData[107] = "";
                        $rowData[108] = $mutation->quantity_final;
                        $rowData[109] = $mutation->amount_final;
                        $rowData[110] = $mutation->date_entry ? Carbon::parse($mutation->date_entry)->format('d-m-Y') : "";
                        $rowData[111] = $logFinalDateTime;
                        $rowData[112] = "";
                        $rowData[113] = $mutation->date_payment ? Carbon::parse($mutation->date_payment)->format('d-m-Y') : "";
                        $rowData[114] = $mutation->entry;
                        $rowData[115] = $mutation->paid_on;
                        $rowData[116] = "";
                        $rowData[117] = "";
                        $rowData[118] = "";
                    }
                    if($mutationType->code_ref === 'result')
                    {
                        $rowData[96] = "";
                        $rowData[97] = "";
                        $rowData[98] = "";
                        $rowData[99] = "";
                        $rowData[100] = "";
                        $rowData[101] = "";
                        $rowData[102] = "";
                        $rowData[103] = "";
                        $rowData[104] = "";
                        $rowData[105] = "";
                        $rowData[106] = "";
                        $rowData[107] = "";
                        $rowData[108] = "";
                        $rowData[109] = "";
                        $rowData[110] = "";
                        $rowData[111] = "";
                        $rowData[112] = $mutation->returns;
                        $rowData[113] = $mutation->date_payment ? Carbon::parse($mutation->date_payment)->format('d-m-Y') : "";
                        $rowData[114] = $mutation->entry;
                        $rowData[115] = $mutation->paid_on;
                        $rowData[116] = "";
                        $rowData[117] = "";
                        $rowData[118] = "";
                    }
                    if($mutationType->code_ref === 'energyTaxRefund')
                    {
                        $rowData[96] = "";
                        $rowData[97] = "";
                        $rowData[98] = "";
                        $rowData[99] = "";
                        $rowData[100] = "";
                        $rowData[101] = "";
                        $rowData[102] = "";
                        $rowData[103] = "";
                        $rowData[104] = "";
                        $rowData[105] = "";
                        $rowData[106] = "";
                        $rowData[107] = "";
                        $rowData[108] = "";
                        $rowData[109] = "";
                        $rowData[110] = "";
                        $rowData[111] = "";
                        $rowData[112] = "";
                        $rowData[113] = "";
                        $rowData[114] = "";
                        $rowData[115] = "";
                        $rowData[116] = $mutation->payout_kwh_price;
                        $rowData[117] = $mutation->payout_kwh;
                        $rowData[118] = $mutation->indication_of_restitution_energy_tax;
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