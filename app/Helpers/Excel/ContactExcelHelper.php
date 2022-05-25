<?php

namespace App\Helpers\Excel;

use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class ContactExcelHelper
{
    private $contacts;

    public function __construct($contacts)
    {
        $this->contacts = $contacts;
    }

    public function downloadExcelAddressEnergyConsumptionGas()
    {
        if($this->contacts == null || $this->contacts->count() === 0){
            return null;
        }

        $completeData = [];

        $headerData = [];
        $headerData[] = '#';
        $headerData[] = 'Naam';
        $headerData[] = 'Adres';
        $headerData[] = 'Huisnummer';
        $headerData[] = 'Toevoeging';
        $headerData[] = 'Postcode';
        $headerData[] = 'Plaats';
        $headerData[] = 'Land';
        $headerData[] = 'Begindatum';
        $headerData[] = 'Einddatum';
        $headerData[] = 'Verbruik m3';
        $headerData[] = 'Voorgesteld variabel tarief';
        $headerData[] = 'Voorgesteld vast tarief';
        $headerData[] = 'Totaal variabele kosten';
        $headerData[] = 'Totaal vaste kosten';

        $completeData[] = $headerData;

        foreach ($this->contacts->chunk(500) as $chunk) {

            foreach ($chunk as $contact) {
                $contactNumber = $contact->number;
                $contactFullName = $contact->full_name;
                // Addresses
                if ($contact->addresses->count() > 0) {
                    foreach ($contact->addresses as $address) {
                        $addressStreet = $address->street;
                        $addressNumber = $address->number;
                        $addressAddition = $address->addition;
                        $addressPostalCode = $address->postal_code;
                        $addressCity = $address->city;
                        $addressCountryName = $address->country ? $address->country->name : '';
                        // AddressEnergyConsumptionGasPeriods
                        if ($address->addressEnergyConsumptionGasPeriods->count() > 0) {
                            foreach ($address->addressEnergyConsumptionGasPeriods as $consumptionGasPeriod) {
                                $rowData = [];
                                $rowData[] = $contactNumber;
                                $rowData[] = $contactFullName;
                                $rowData[] = $addressStreet;
                                $rowData[] = $addressNumber;
                                $rowData[] = $addressAddition;
                                $rowData[] = $addressPostalCode;
                                $rowData[] = $addressCity;
                                $rowData[] = $addressCountryName;
                                $rowData[] = $this->formatDate($consumptionGasPeriod->date_begin);
                                $rowData[] = $this->formatDate($consumptionGasPeriod->date_end);
                                $rowData[] = $this->formatFinancial($consumptionGasPeriod->consumption, 0);
                                $rowData[] = $this->formatFinancial($consumptionGasPeriod->proposed_variable_rate, 2);
                                $rowData[] = $this->formatFinancial($consumptionGasPeriod->proposed_fixed_rate, 2);
                                $rowData[] = $this->formatFinancial($consumptionGasPeriod->total_variable_costs, 2);
                                $rowData[] = $this->formatFinancial($consumptionGasPeriod->total_fixed_costs, 2);
                                $completeData[] = $rowData;

//                                $contactNumber = '';
//                                $contactFullName = '';
//                                $addressStreet = '';
//                                $addressNumber = '';
//                                $addressAddition = '';
//                                $addressPostalCode = '';
//                                $addressCity = '';
//                                $addressCountryName = '';
                            }
                        }else{
                            $rowData = [];
                            $rowData[] = $contactNumber;
                            $rowData[] = $contactFullName;
                            $rowData[] = $addressStreet;
                            $rowData[] = $addressNumber;
                            $rowData[] = $addressAddition;
                            $rowData[] = $addressPostalCode;
                            $rowData[] = $addressCity;
                            $rowData[] = $addressCountryName;
                            $rowData[] = '';
                            $rowData[] = '';
                            $rowData[] = '';
                            $rowData[] = '';
                            $rowData[] = '';
                            $rowData[] = '';
                            $rowData[] = '';
                            $completeData[] = $rowData;

//                            $contactNumber = '';
//                            $contactFullName = '';
                        }
                    }
                }else{
                    $rowData = [];
                    $rowData[] = $contactNumber;
                    $rowData[] = $contactFullName;
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $completeData[] = $rowData;
                }

            }

        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        for ($col = 'A'; $col !== 'Z'; $col++) {
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

    public function downloadExcelAddressEnergyConsumptionElectricity()
    {
        if($this->contacts == null || $this->contacts->count() === 0){
            return null;
        }

        $completeData = [];

        $headerData = [];
        $headerData[] = '#';
        $headerData[] = 'Naam';
        $headerData[] = 'Adres';
        $headerData[] = 'Huisnummer';
        $headerData[] = 'Toevoeging';
        $headerData[] = 'Postcode';
        $headerData[] = 'Plaats';
        $headerData[] = 'Land';
        $headerData[] = 'Begindatum';
        $headerData[] = 'Einddatum';
        $headerData[] = 'Verbruik hoog';
        $headerData[] = 'Verbruik laag';
        $headerData[] = 'Terug hoog';
        $headerData[] = 'Terug laag';
        $headerData[] = 'Voorgesteld variabel tarief hoog';
        $headerData[] = 'Voorgesteld variabel tarief laag';
        $headerData[] = 'Voorgesteld vast tarief hoog';
        $headerData[] = 'Voorgesteld vast tarief laag';
        $headerData[] = 'Totaal variabele kosten hoog';
        $headerData[] = 'Totaal variabele kosten laag';
        $headerData[] = 'Totaal vaste kosten hoog';
        $headerData[] = 'Totaal vaste kosten laag';

        $completeData[] = $headerData;

        foreach ($this->contacts->chunk(500) as $chunk) {

            foreach ($chunk as $contact) {
                // Addresses
                $contactNumber = $contact->number;
                $contactFullName = $contact->full_name;
                if ($contact->addresses->count() > 0) {
                    foreach ($contact->addresses as $address) {
                        $addressStreet = $address->street;
                        $addressNumber = $address->number;
                        $addressAddition = $address->addition;
                        $addressPostalCode = $address->postal_code;
                        $addressCity = $address->city;
                        $addressCountryName = $address->country ? $address->country->name : '';
                        // AddressEnergyConsumptionElectricityPeriods
                        if ($address->addressEnergyConsumptionElectricityPeriods->count() > 0) {
                            foreach ($address->addressEnergyConsumptionElectricityPeriods as $consumptionElectricityPeriod){
                                $rowData = [];
                                $rowData[] = $contactNumber;
                                $rowData[] = $contactFullName;
                                $rowData[] = $addressStreet;
                                $rowData[] = $addressNumber;
                                $rowData[] = $addressAddition;
                                $rowData[] = $addressPostalCode;
                                $rowData[] = $addressCity;
                                $rowData[] = $addressCountryName;
                                $rowData[] = $this->formatDate($consumptionElectricityPeriod->date_begin);
                                $rowData[] = $this->formatDate($consumptionElectricityPeriod->date_end);
                                $rowData[] = $this->formatFinancial($consumptionElectricityPeriod->consumption_high, 0);
                                $rowData[] = $this->formatFinancial($consumptionElectricityPeriod->consumption_low, 0);
                                $rowData[] = $this->formatFinancial($consumptionElectricityPeriod->return_high, 0);
                                $rowData[] = $this->formatFinancial($consumptionElectricityPeriod->return_low, 0);
                                $rowData[] = $this->formatFinancial($consumptionElectricityPeriod->proposed_variable_rate_high, 2);
                                $rowData[] = $this->formatFinancial($consumptionElectricityPeriod->proposed_variable_rate_low, 2);
                                $rowData[] = $this->formatFinancial($consumptionElectricityPeriod->proposed_fixed_rate_high, 2);
                                $rowData[] = $this->formatFinancial($consumptionElectricityPeriod->proposed_fixed_rate_low, 2);
                                $rowData[] = $this->formatFinancial($consumptionElectricityPeriod->total_variable_costs_high, 2);
                                $rowData[] = $this->formatFinancial($consumptionElectricityPeriod->total_variable_costs_low, 2);
                                $rowData[] = $this->formatFinancial($consumptionElectricityPeriod->total_fixed_costs_high, 2);
                                $rowData[] = $this->formatFinancial($consumptionElectricityPeriod->total_fixed_costs_low, 2);
                                $completeData[] = $rowData;

//                                $contactNumber = '';
//                                $contactFullName = '';
//                                $addressStreet = '';
//                                $addressNumber = '';
//                                $addressAddition = '';
//                                $addressPostalCode = '';
//                                $addressCity = '';
//                                $addressCountryName = '';
                            }
                        }else{
                            $rowData = [];
                            $rowData[] = $contactNumber;
                            $rowData[] = $contactFullName;
                            $rowData[] = $addressStreet;
                            $rowData[] = $addressNumber;
                            $rowData[] = $addressAddition;
                            $rowData[] = $addressPostalCode;
                            $rowData[] = $addressCity;
                            $rowData[] = $addressCountryName;
                            $rowData[] = '';
                            $rowData[] = '';
                            $rowData[] = '';
                            $rowData[] = '';
                            $rowData[] = '';
                            $rowData[] = '';
                            $rowData[] = '';
                            $rowData[] = '';
                            $rowData[] = '';
                            $rowData[] = '';
                            $rowData[] = '';
                            $rowData[] = '';
                            $rowData[] = '';
                            $rowData[] = '';
                            $completeData[] = $rowData;

//                            $contactNumber = '';
//                            $contactFullName = '';
                        }
                    }
                }else{
                    $rowData = [];
                    $rowData[] = $contactNumber;
                    $rowData[] = $contactFullName;
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $completeData[] = $rowData;
                }

            }

        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        for ($col = 'A'; $col !== 'Z'; $col++) {
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

    private function formatFinancial($amount, $decimals){
        return number_format($amount, $decimals, '.', '');
    }

}