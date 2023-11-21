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

        $headerData[] = 'Woningspecificatie ID';
        $headerData[] = 'Contact ID';
        $headerData[] = 'Woningdossier ID';
        $headerData[] = 'Maatregel categorie';
        $headerData[] = 'Maatregel';
        $headerData[] = 'Status';
        $headerData[] = 'Datum realisatie';
        $headerData[] = 'Verdieping';
        $headerData[] = 'Zijde';
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
                $rowData[0] = $housingFileSpecification->id; //'Woningspecificatie ID'
                $rowData[1] = $housingFile->address->contact ? $housingFile->address->contact->id : ''; //'Contact ID'
                $rowData[2] = $housingFile->id; //'Woningdossier ID'
                $rowData[3] = $housingFileSpecification->measure ? $housingFileSpecification->measure->name : ''; //'Maatregel categorie'
                $rowData[4] = ($housingFileSpecification->measure && $housingFileSpecification->measure->measureCategory) ? $housingFileSpecification->measure->measureCategory->name : ''; //'Maatregel'
                $rowData[5] = $housingFileSpecification->status ? $housingFileSpecification->status->name : ''; //'Status'
                $rowData[6] = $housingFileSpecification->measure_date; //'Datum realisatie'
                $rowData[7] = $housingFileSpecification->floor ? $housingFileSpecification->floor->name : ''; //'Verdieping'
                $rowData[8] = $housingFileSpecification->side ? $housingFileSpecification->side->name : ''; //'Zijde'
                $rowData[9] = $housingFileSpecification->type_of_execution ? $typeOfExecutionOptions[$housingFileSpecification->type_of_execution] : 'Onbekend'; //'Uitvoering'
                $rowData[10] = $housingFileSpecification->savings_gas; //'Savings gas'
                $rowData[11] = $housingFileSpecification->savings_electricity; //'Savings elektriciteit'
                $rowData[12] = $housingFileSpecification->co2_savings; //'Savings Co2 '

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