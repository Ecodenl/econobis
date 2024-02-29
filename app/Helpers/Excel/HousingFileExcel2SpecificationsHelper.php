<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Excel;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class HousingFileExcel2SpecificationsHelper
{
    private $housingFileSpecifications;

    public function __construct($housingFileSpecifications)
    {
        $this->housingFileSpecifications = $housingFileSpecifications;
    }

    public function downloadExcel()
    {
        if($this->housingFileSpecifications->count() === 0){
            abort(403, 'Geen woningdossier specificaties aanwezig in selectie');
        }

        $completeData = [];

        $headerData = [];

        $headerData[] = 'Adres';
        $headerData[] = 'Postcode';
        $headerData[] = 'Woonplaats';
        $headerData[] = 'Maatregel categorie';
        $headerData[] = 'Maatregel';
        $headerData[] = 'Status';
        $headerData[] = 'Datum realisatie';
        $headerData[] = 'Waarde';
        $headerData[] = 'Verdieping';
        $headerData[] = 'Zijde';
        $headerData[] = 'Type/merk';
        $headerData[] = 'Uitvoering';
        $headerData[] = 'Besparing gas';
        $headerData[] = 'Besparing elektriciteit';
        $headerData[] = 'CO2 besparing';

        $completeData[] = $headerData;

        $typeOfExecutionOptions = [];
        $typeOfExecutionOptions['Z'] = 'Zelf doen';
        $typeOfExecutionOptions['L'] = 'Laten doen';

        foreach ($this->housingFileSpecifications->chunk(300) as $chunk) {
            foreach ($chunk as $housingFileSpecification) {
                $housingFile = $housingFileSpecification->housingFile;
                $rowData = [];

                $rowData[0] = $housingFile->address ? $housingFile->address->fullAddress : '';
                $rowData[1] = $housingFile->address ? $housingFile->address->postal_code : '';
                $rowData[2] = $housingFile->address ? $housingFile->address->city : '';
                $rowData[3] = $housingFileSpecification->measure ? $housingFileSpecification->measure->name : ''; //'Maatregel categorie'
                $rowData[4] = ($housingFileSpecification->measure && $housingFileSpecification->measure->measureCategory) ? $housingFileSpecification->measure->measureCategory->name : ''; //'Maatregel'
                $rowData[5] = $housingFileSpecification->status ? $housingFileSpecification->status->name : ''; //'Status'
                $rowData[6] = $housingFileSpecification->measure_date; //'Datum realisatie'
                $rowData[7] = $housingFileSpecification->answer;
                $rowData[8] = $housingFileSpecification->floor ? $housingFileSpecification->floor->name : ''; //'Verdieping'
                $rowData[9] = $housingFileSpecification->side ? $housingFileSpecification->side->name : ''; //'Zijde'
                $rowData[10] = $housingFileSpecification->type_brand;
                $rowData[11] = $housingFileSpecification->type_of_execution ? $typeOfExecutionOptions[$housingFileSpecification->type_of_execution] : 'Onbekend'; //'Uitvoering'
                $rowData[12] = $housingFileSpecification->savings_gas; //'Savings gas'
                $rowData[13] = $housingFileSpecification->savings_electricity; //'Savings elektriciteit'
                $rowData[14] = $housingFileSpecification->co2_savings; //'Savings Co2 '

                $completeData[] = $rowData;
            }
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Load all data in worksheet
        $sheet->fromArray($completeData);

        for ($col = 'A'; $col !== 'N'; $col++) {
            $spreadsheet->getActiveSheet()
                ->getColumnDimension($col)
                ->setAutoSize(true);
        }

        $sheet->getStyle('A1:M1')
            ->applyFromArray([
                'font' => [
                    'bold' => true,
                ],

            ]);

        $writer = new Xlsx($spreadsheet);
        $document = $writer->save('php://output');
        return $document;
    }
}