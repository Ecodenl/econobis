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
                // Addresses
//                $contactHasConsumptionGas = false;
//                if ($contact->addresses) {
//                    foreach ($contact->addresses as $address) {
//                        if ($address->addressEnergyConsumptionGasPeriods) {
//                            foreach ($address->addressEnergyConsumptionGasPeriods as $addressEnergyConsumptionGasPeriod) {
//                                $contactHasConsumptionGas = true;
//                            }
//                        }
//                    }
//                }
//                if ($contactHasConsumptionGas) {

                    foreach ($contact->addresses as $address){
                        foreach ($address->addressEnergyConsumptionGasPeriods as $consumptionGasPeriod){
                            $rowData = [];
                            $rowData[] = $contact->full_name;
                            $rowData[] = $address->street;
                            $rowData[] = $address->number;
                            $rowData[] = $address->addition;
                            $rowData[] = $address->postal_code;
                            $rowData[] = $address->city;
                            $rowData[] = $address->country ? $address->country->name : '';
                            $rowData[] = $consumptionGasPeriod->date_begin;
                            $rowData[] = $consumptionGasPeriod->date_end;
                            $rowData[] = $consumptionGasPeriod->consumption;
                            $rowData[] = $consumptionGasPeriod->proposed_variable_rate;
                            $rowData[] = $consumptionGasPeriod->proposed_fixed_rate;
                            $rowData[] = $consumptionGasPeriod->total_variable_costs;
                            $rowData[] = $consumptionGasPeriod->total_fixed_costs;
                            $completeData[] = $rowData;
                        }
                    }

//                }
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
//                $contactHasConsumptionElectricity = false;
//                if ($contact->addresses) {
//                    foreach ($contact->addresses as $address) {
//                        if ($address->addressEnergyConsumptionElectricityPeriods) {
//                            foreach ($address->addressEnergyConsumptionElectricityPeriods as $addressEnergyConsumptionElectricityPeriod) {
//                                $contactHasConsumptionElectricity = true;
//                            }
//                        }
//                    }
//                }
//                if ($contactHasConsumptionElectricity) {

                    foreach ($contact->addresses as $address){
                        foreach ($address->addressEnergyConsumptionElectricityPeriods as $consumptionElectricityPeriod){
                            $rowData = [];
                            $rowData[] = $contact->full_name;
                            $rowData[] = $address->street;
                            $rowData[] = $address->number;
                            $rowData[] = $address->addition;
                            $rowData[] = $address->postal_code;
                            $rowData[] = $address->city;
                            $rowData[] = $address->country ? $address->country->name : '';
                            $rowData[] = $consumptionElectricityPeriod->date_begin;
                            $rowData[] = $consumptionElectricityPeriod->date_end;
                            $rowData[] = $consumptionElectricityPeriod->consumption_high;
                            $rowData[] = $consumptionElectricityPeriod->consumption_low;
                            $rowData[] = $consumptionElectricityPeriod->return_high;
                            $rowData[] = $consumptionElectricityPeriod->return_low;
                            $rowData[] = $consumptionElectricityPeriod->proposed_variable_rate_high;
                            $rowData[] = $consumptionElectricityPeriod->proposed_variable_rate_low;
                            $rowData[] = $consumptionElectricityPeriod->proposed_fixed_rate_high;
                            $rowData[] = $consumptionElectricityPeriod->proposed_fixed_rate_low;
                            $rowData[] = $consumptionElectricityPeriod->total_variable_costs_high;
                            $rowData[] = $consumptionElectricityPeriod->total_variable_costs_low;
                            $rowData[] = $consumptionElectricityPeriod->total_fixed_costs_high;
                            $rowData[] = $consumptionElectricityPeriod->total_fixed_costs_low;
                            $completeData[] = $rowData;
                        }
                    }

//                }
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
        return number_format($amount, $decimals, ',', '');
    }

}