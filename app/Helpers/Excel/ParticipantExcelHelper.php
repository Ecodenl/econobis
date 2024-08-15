<?php

namespace App\Helpers\Excel;

use App\Eco\Address\AddressType;
use App\Eco\Project\Project;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class ParticipantExcelHelper
{
    private $participants;
    private $isObligationProject = false;

    public function __construct($participants, $filterProjectId)
    {
        $this->participants = $participants;
        if($filterProjectId && $filterProjectId > 0){
            $project = Project::find($filterProjectId);
            $this->isObligationProject = $project->projectType->code_ref == 'obligation';
        }
    }

    public function downloadExcel()
    {
        set_time_limit(300);

        $completeData = [];

        $headerData = [];
// [0]
        $headerData[0] = '#participant';
        $headerData[] = '#mutation';
        $headerData[] = 'Contact id';
        $headerData[] = 'Contactnummer';
        $headerData[] = 'Deelname naam';
        $headerData[] = 'Naam';
        $headerData[] = 'Organisatie';
        $headerData[] = 'Aanspreektitel';
        $headerData[] = 'Initialen';
        $headerData[] = 'Voornaam';
// [10]
        $headerData[] = 'Tussenvoegsel';
        $headerData[] = 'Achternaam';
        $headerData[] = 'Geboortedatum';
// [13]
        $headerData[] = 'Deelname adres';
        $headerData[] = 'Deelname huisnummer';
        $headerData[] = 'Deelname toevoeging';
        $headerData[] = 'Deelname postcode';
        $headerData[] = 'Deelname plaats';
        $headerData[] = 'Deelname land';
// [19]
        $headerData[] = 'Bezorg adres';
        $headerData[] = 'Bezorg huisnummer';
        $headerData[] = 'Bezorg toevoeging';
        $headerData[] = 'Bezorg postcode';
        $headerData[] = 'Bezorg plaats';
        $headerData[] = 'Bezorg land';
// [25]
        $headerData[] = 'Bezoek adres';
        $headerData[] = 'Bezoek huisnummer';
        $headerData[] = 'Bezoek toevoeging';
        $headerData[] = 'Bezoek postcode';
        $headerData[] = 'Bezoek plaats';
        $headerData[] = 'Bezoek land';
// [31]
        $headerData[] = 'Post adres';
        $headerData[] = 'Post huisnummer';
        $headerData[] = 'Post toevoeging';
        $headerData[] = 'Post postcode';
        $headerData[] = 'Post plaats';
        $headerData[] = 'Post land';
// [37]
        $headerData[] = 'Nota adres';
        $headerData[] = 'Nota huisnummer';
        $headerData[] = 'Nota toevoeging';
        $headerData[] = 'Nota postcode';
        $headerData[] = 'Nota plaats';
        $headerData[] = 'Nota land';
// [43]
        $headerData[] = 'Email primair';
        $headerData[] = 'Email 2';
        $headerData[] = 'Email 3';
        $headerData[] = 'Email 4';
        $headerData[] = 'Email 5';
// [48]
        $headerData[] = 'Telefoonnummer primair';
        $headerData[] = 'Telefoonnummer 2';
        $headerData[] = 'Telefoonnummer 3';
        $headerData[] = 'Energieleverancier';
        $headerData[] = 'Energieleverancier klant sinds';
        $headerData[] = 'Klantnummer';
        $headerData[] = 'EAN elektra';
        $headerData[] = 'EAN gas';
// [56]
        $headerData[] = 'Projectcode';
        $headerData[] = 'Huidig saldo rekening';
        $headerData[] = 'Totale opbrengsten';
        $headerData[] = 'Huidig aantal deelnames';
        $headerData[] = 'Boekwaarde per deelname';
        $headerData[] = 'Huidige totale waarde';
        $headerData[] = 'Contract retour';
        $headerData[] = 'Geschonken door';
        $headerData[] = 'Akkoord voorwaarden';
        $headerData[] = 'Datum akkoord';
// [66]
        $headerData[] = 'Projectinfo begrepen';
        $headerData[] = 'Datum begrepen';
        $headerData[] = 'Jaarlijks verbruik';
        $headerData[] = 'Iban uitkeren';
        $headerData[] = 'Iban uitkeren t.n.v.';
        $headerData[] = 'Iban contact';
        $headerData[] = 'Iban contact t.n.v.';
        $headerData[] = 'Eerste ingangsdatum deelname';
        $headerData[] = 'Uitkeren op';
        $headerData[] = 'Contactpersoon startdatum';
// [76]
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
// [86]
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
// [96]
        $headerData[] = 'Wettelijke vertegenwoordiger geboortedatum';
        $headerData[] = 'Wettelijke vertegenwoordiger primair e-mailaddress';
        $headerData[] = 'Wettelijke vertegenwoordiger primair telefoonnummer';
        $headerData[] = 'Deelname status';
// [100]
        $headerData[100] = 'Type mutatie';
        $headerData[] = 'Status';
        $headerData[] = 'Aantal interesse';
        $headerData[] = 'Bedrag interesse';
        $headerData[] = 'Datum interesse';
        $headerData[] = 'Datum log interesse';
        $headerData[] = 'Aantal ingeschreven';
        $headerData[] = 'Bedrag ingeschreven';
        $headerData[] = 'Datum ingeschreven';
        $headerData[] = 'Datum log ingeschreven';
// [110]
        $headerData[] = 'Aantal toegekend';
        $headerData[] = 'Bedrag toegekend';
        $headerData[] = 'Datum toegekend';
        $headerData[] = 'Datum log toegekend';
        $headerData[] = 'Aantal definitief';
        $headerData[] = 'Bedrag definitief';
        $headerData[] = 'Ingangsdatum';
        $headerData[] = 'Log Ingangsdatum';
        $headerData[] = 'Opbrengst';
        $headerData[] = 'Betaaldatum';
// [120]
        $headerData[] = 'Betalingskenmerk';
        $headerData[] = 'Boekstuk';
        $headerData[] = 'Uitgekeerd op';
        $headerData[] = 'Opbrengst kWh';
        $headerData[] = 'kWh';
        $headerData[] = 'Indicatie teruggave EB';

        $headerData[] = 'Mollie ID';
        $headerData[] = 'Mollie betaaldatum';

        if($this->isObligationProject) {
            $headerData[] = 'Obligatienummer(s)';
        }

        $completeData[] = $headerData;

        foreach ($this->participants->chunk(500) as $chunk) {
            foreach ($chunk as $participant) {
                // Geen mutaties dan volgende participant
                if(!$participant->mutations) continue;

                $projectCode = $participant->project->code;
                $currentBookWorth = $participant->project->currentBookWorth();

                // Addresses
                // Participant addres if exsists otherwise contact primaryAddress
                if($participant->address){
                    $address = $participant->address;
                }else{
                    $address = $participant->contact->primaryAddress;
                }
                $addressArr['street'] = ($address ? $address->street : '');
                $addressArr['number'] = ($address ? $address->number : '');
                $addressArr['addition'] = ($address ? $address->addition : '');
                $addressArr['postal_code'] = ($address ? $address->postal_code : '');
                $addressArr['city'] = ($address ? $address->city : '');
                $addressArr['country'] = (($address && $address->country) ? $address->country->name : '');
                $participant['address_participant'] = $addressArr;

                if ($participant->contact->addresses) {
                    foreach (AddressType::collection() as $type) {
                        $address = $participant->contact->addresses()->where('type_id', $type->id)->where('primary', true)->first();
                        if(!$address){
                            $address = $participant->contact->addresses()->where('type_id', $type->id)->first();
                        }

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

                // Participant addres if exsists otherwise contact primaryAddress
                if($participant->address){
                    $address = $participant->address;
                }else{
                    $address = $participant->contact->primaryAddress;
                }

                // Reformat energy supplier fields
                if ($address && $address->currentAddressEnergySupplierElectricity) {
                    $participant->energy_supplier_name
                        = $address->currentAddressEnergySupplierElectricity->energySupplier->name;
                    $participant->energy_supplier_member_since
                        = $this->formatDate($address->currentAddressEnergySupplierElectricity->member_since);
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
// [0]
                $rowData[0] = $participant->id;
                $rowData[] = 0;
                $rowData[] = $participant->contact->id;
                $rowData[] = $participant->contact->number;
                $rowData[] = $participant->project->name;
                $rowData[] = $participant->contact->full_name;
                $rowData[] = $participant->contact->organisation ? $participant->contact->organisation->name : '';
                $rowData[] = $participant->title ? $participant->title->name : '';
                $rowData[] = $participant->initials;
                $rowData[] = $participant->first_name;
// [10]
                $rowData[] = $participant->last_name_prefix;
                $rowData[] = $participant->last_name;
                $rowData[] = $participant->date_of_birth;
// [13]
                $rowData[] = $participant['address_participant']['street'];
                $rowData[] = $participant['address_participant']['number'];
                $rowData[] = $participant['address_participant']['addition'];
                $rowData[] = $participant['address_participant']['postal_code'];
                $rowData[] = $participant['address_participant']['city'];
                $rowData[] = $participant['address_participant']['country'];
// [19]
                $rowData[] = $participant['address_deliver']['street'];
                $rowData[] = $participant['address_deliver']['number'];
                $rowData[] = $participant['address_deliver']['addition'];
                $rowData[] = $participant['address_deliver']['postal_code'];
                $rowData[] = $participant['address_deliver']['city'];
                $rowData[] = $participant['address_deliver']['country'];
// [25]
                $rowData[] = $participant['address_visit']['street'];
                $rowData[] = $participant['address_visit']['number'];
                $rowData[] = $participant['address_visit']['addition'];
                $rowData[] = $participant['address_visit']['postal_code'];
                $rowData[] = $participant['address_visit']['city'];
                $rowData[] = $participant['address_visit']['country'];
// [31]
                $rowData[] = $participant['address_postal']['street'];
                $rowData[] = $participant['address_postal']['number'];
                $rowData[] = $participant['address_postal']['addition'];
                $rowData[] = $participant['address_postal']['postal_code'];
                $rowData[] = $participant['address_postal']['city'];
                $rowData[] = $participant['address_postal']['country'];
// [37]
                $rowData[] = $participant['address_invoice']['street'];
                $rowData[] = $participant['address_invoice']['number'];
                $rowData[] = $participant['address_invoice']['addition'];
                $rowData[] = $participant['address_invoice']['postal_code'];
                $rowData[] = $participant['address_invoice']['city'];
                $rowData[] = $participant['address_invoice']['country'];
// [43]
                $rowData[] = $participant->contact->primaryEmailAddress ? $participant->contact->primaryEmailAddress->email : '';
                $rowData[] = $participant->emailAddress_2;
                $rowData[] = $participant->emailAddress_3;
                $rowData[] = $participant->emailAddress_4;
                $rowData[] = $participant->emailAddress_5;
// [48]
                $rowData[] = $participant->contact->primaryphoneNumber ? $participant->contact->primaryphoneNumber->number : '';
                $rowData[] = $participant->phonenumber_2;
                $rowData[] = $participant->phonenumber_3;
                $rowData[] = $participant->energy_supplier_name;
                $rowData[] = $participant->energy_supplier_member_since;
                $rowData[] = $address && $address->currentAddressEnergySupplierElectricity ? $address->currentAddressEnergySupplierElectricity->es_number : '';
                $rowData[] = $address && !empty($address->ean_electricity) ? 'EAN: ' . $address->ean_electricity : '';
                $rowData[] = $address && !empty($address->ean_gas) ? 'EAN: ' . $address->ean_gas : '';
// [56]
                $rowData[] = $projectCode;
                $rowData[] = $currentBalanceAccount;
                $rowData[] = $participant->participations_returns_total;
                $rowData[] = $participant->participations_definitive ;
                $rowData[] = $currentBookWorth;
                $rowData[] = $participant->participations_definitive * $currentBookWorth;
                $rowData[] = $participant->date_contract_retour;
                $rowData[] = $participant->giftedByContact ? $participant->giftedByContact->full_name : '';
                $rowData[] = $participant->did_accept_agreement;
                $rowData[] = $participant->date_did_accept_agreement;
// [66]
                $rowData[] = $participant->did_understand_info;
                $rowData[] = $participant->date_did_understand_info;
                $rowData[] = $participant->power_kwh_consumption;
                $rowData[] = $participant->iban_payout;
                $rowData[] = $participant->iban_payout_attn;
                $rowData[] = $participant->iban_contact;
                $rowData[] = $participant->iban_attn_contact;
                $rowData[] = $participant->date_register;
                $rowData[] = $participant->participantProjectPayoutType ? $participant->participantProjectPayoutType->name : '';
                $rowData[] = $participant->cpStartDate;
// [76]
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
// [86]
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
// [96]
                $rowData[] = $participant->lrcDateOfBirth;
                $rowData[] = $participant->lrcPrimaryEmailAddress;
                $rowData[] = $participant->lrcPrimaryPhonenumber;
                $rowData[] =implode(', ', collect($participant->getUniqueMutationStatusesAttribute())->pluck('name')->toArray());

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

// [100]
                    $rowData[100] = $mutationType ? $mutationType->name : '';
                    $rowData[101] = $mutationStatus ? $mutationStatus->name : '';

                    if($mutation->molliePayments) {
                        $mollieIds = implode(', ', $mutation->molliePayments->pluck('mollie_id')->toArray());
                        $mollieDatePaidsRaw = $mutation->molliePayments->pluck('date_paid');
                        $mollieDatePaidsArray = [];
                        foreach ($mollieDatePaidsRaw as $mollieDatePaid){
                            $mollieDatePaidsArray[] = $mollieDatePaid != '' ? Carbon::parse($mollieDatePaid)->format('d-m-Y') : '00-00-0000';
                        }
                        $mollieDatePaids = implode(', ', $mollieDatePaidsArray);
                    } else {
                        $mollieIds = "";
                        $mollieDatePaids = "";
                    }

                    if($mutationType->code_ref === 'first_deposit' || $mutationType->code_ref === 'deposit' || $mutationType->code_ref === 'withDrawal' )
                    {
// [102]
                        $rowData[102] = $mutation->quantity_interest;
                        $rowData[103] = $mutation->amount_interest;
                        $rowData[104] = $mutation->date_interest ? Carbon::parse($mutation->date_interest)->format('d-m-Y') : "";
                        $rowData[105] = $logInterestDateTime;
                        $rowData[106] = $mutation->quantity_option;
                        $rowData[107] = $mutation->amount_option;
                        $rowData[108] = $mutation->date_option ? Carbon::parse($mutation->date_option)->format('d-m-Y') : "";
                        $rowData[109] = $logOptionDateTime;
                        $rowData[110] = $mutation->quantity_granted;
                        $rowData[111] = $mutation->amount_granted;
                        $rowData[112] = $mutation->date_granted ? Carbon::parse($mutation->date_granted)->format('d-m-Y') : "";
                        $rowData[113] = $logGrantedDateTime;
                        $rowData[114] = $mutation->quantity_final;
                        $rowData[115] = $mutation->amount_final;
                        $rowData[116] = $mutation->date_entry ? Carbon::parse($mutation->date_entry)->format('d-m-Y') : "";
                        $rowData[117] = $logFinalDateTime;
                        $rowData[118] = "";
                        $rowData[119] = $mutation->date_payment ? Carbon::parse($mutation->date_payment)->format('d-m-Y') : "";
                        $rowData[120] = $mutation->payment_reference ? $mutation->payment_reference : "";
                        $rowData[121] = "";
                        $rowData[122] = "";
                        $rowData[123] = "";
                        $rowData[124] = "";
                        $rowData[125]= "";
                        $rowData[126] = $mollieIds;
                        $rowData[127] = $mollieDatePaids;
                    }

                    else if($mutationType->code_ref === 'redemption')
                    {
// [96] of [102]
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
                        $rowData[114] = $mutation->quantity_final;
                        $rowData[115] = $mutation->amount_final;
                        $rowData[116] = $mutation->date_entry ? Carbon::parse($mutation->date_entry)->format('d-m-Y') : "";
                        $rowData[117] = $logFinalDateTime;
                        $rowData[118] = "";
                        $rowData[119] = $mutation->date_payment ? Carbon::parse($mutation->date_payment)->format('d-m-Y') : "";
                        $rowData[120] = $mutation->payment_reference ? $mutation->payment_reference : "";
                        $rowData[121] = $mutation->entry;
                        $rowData[122] = $mutation->paid_on;
                        $rowData[123] = "";
                        $rowData[124] = "";
                        $rowData[125] = "";
                        $rowData[126] = "";
                        $rowData[127] = "";
                    }
                    else if($mutationType->code_ref === 'result' || $mutationType->code_ref === 'result_deposit')
                    {
// [96] of [102]
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
                        $rowData[116] = "";
                        $rowData[117] = "";
                        $rowData[118] = $mutation->returns;
                        $rowData[119] = $mutation->date_payment ? Carbon::parse($mutation->date_payment)->format('d-m-Y') : "";
                        $rowData[120] = $mutation->payment_reference ? $mutation->payment_reference : "";
                        $rowData[121] = $mutation->entry;
                        $rowData[122] = $mutation->paid_on;
                        $rowData[123] = "";
                        $rowData[124] = "";
                        $rowData[125] = "";
                        $rowData[126] = "";
                        $rowData[127] = "";
                    }
                    else if($mutationType->code_ref === 'energyTaxRefund')
                    {
// [96] of [102]
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
                        $rowData[116] = "";
                        $rowData[117] = "";
                        $rowData[118] = "";
                        $rowData[119] = $mutation->date_payment ? Carbon::parse($mutation->date_payment)->format('d-m-Y') : "";
                        $rowData[120] = $mutation->payment_reference ? $mutation->payment_reference : "";
                        $rowData[121] = "";
                        $rowData[122] = "";
                        $rowData[123] = $mutation->payout_kwh_price;
                        $rowData[124] = $mutation->payout_kwh;
                        $rowData[125] = $mutation->indication_of_restitution_energy_tax;
                        $rowData[126] = "";
                        $rowData[127] = "";
                    }
                    else
                    {
// [96] of [102]
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
                        $rowData[116] = "";
                        $rowData[117] = "";
                        $rowData[118] = "";
                        $rowData[119] = "";
                        $rowData[120] = "";
                        $rowData[121] = "";
                        $rowData[122] = "";
                        $rowData[123] = "";
                        $rowData[124] = "";
                        $rowData[125] = "";
                        $rowData[126] = "";
                        $rowData[127] = "";
                    }

                    if($this->isObligationProject) {
                        $rowData[128] = $participant->obligationNumbersList;
                    }

                    $completeData[] = $rowData;
                }

            }
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        for ($col = 'A'; $col !== 'DZ'; $col++) {
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

    public function downloadExcelParticipants()
    {
        set_time_limit(300);

        $completeData = [];

        $headerData = [];
        $headerData[] = 'Contactnummer';
        $headerData[] = 'Organisatie';
        $headerData[] = 'Aanspreektitel';
        $headerData[] = 'Voorletters';
        $headerData[] = 'Voornaam';
        $headerData[] = 'Achternaam';
        $headerData[] = 'Straat';
        $headerData[] = 'Huisnummer';
        $headerData[] = 'Huisnummer toevoeging';
        $headerData[] = 'Postcode';
        $headerData[] = 'Plaats';
        $headerData[] = 'Email primair';
        $headerData[] = 'Telefoonnummer primair';
        $headerData[] = 'Aantal deelnames definitief';
        $headerData[] = 'Lening deelname definitief';
        $headerData[] = 'Eerste ingangsdatum deelname';

        if($this->isObligationProject) {
            $headerData[] = 'Obligatienummer(s)';
        }

        $completeData[] = $headerData;

        foreach ($this->participants->chunk(500) as $chunk) {
            foreach ($chunk as $participant) {

                // person/organisation fields
                if ($participant->contact->type_id === 'person') {
                    $participant->title = $participant->contact->person->title;
                    $participant->initials = $participant->contact->person->initials;
                    $participant->first_name = $participant->contact->person->first_name;
                    $participant->last_name_prefix = $participant->contact->person->last_name_prefix;
                    $participant->last_name = $participant->contact->person->last_name;
                }
                // Reformat dates
                $participant->date_register = $participant->date_register
                    ? Carbon::parse($participant->date_register)
                        ->format('d-m-Y') : '';

                // Participant addres if exsists otherwise contact primaryAddress
                if($participant->address){
                    $address = $participant->address;
                }else{
                    $address = $participant->contact->primaryAddress;
                }

                $rowData = [];
                $rowData[] = $participant->contact->number;
                $rowData[] = $participant->contact->organisation ? $participant->contact->organisation->name : '';
                $rowData[] = $participant->title ? $participant->title->name : '';
                $rowData[] = $participant->initials;
                $rowData[] = $participant->first_name;
                $rowData[] = $participant->last_name_prefix ? $participant->last_name_prefix . ' ' . $participant->last_name : $participant->last_name ;
                $rowData[] = $address ? $address->street : '';
                $rowData[] = $address ? $address->number : '';
                $rowData[] = $address ? $address->addition : '';
                $rowData[] = $address ? $address->postal_code : '';
                $rowData[] = $address ? $address->city : '';
                $rowData[] = $participant->contact->primaryEmailAddress ? $participant->contact->primaryEmailAddress->email : '';
                $rowData[] = $participant->contact->primaryphoneNumber ? $participant->contact->primaryphoneNumber->number : '';
                $rowData[] = $participant->participations_definitive ;
                $rowData[] = $participant->amount_definitive ;
                $rowData[] = $participant->date_register;

                if($this->isObligationProject) {
                    $rowData[] = $participant->obligationNumbersList;
                }

                $completeData[] = $rowData;

            }
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        for ($col = 'A'; $col !== 'R'; $col++) {
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