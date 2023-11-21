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

class HousingFileExcelSpecificationsHelper
{
    private $housingFiles;

    public function __construct($housingFiles)
    {
        $this->housingFiles = $housingFiles;
    }

    public function downloadExcel()
    {
        if($this->housingFiles->count() === 0){
            abort(403, 'Geen woningdossiers specificaties aanwezig in selectie');
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

        foreach ($this->housingFiles->chunk(300) as $chunk) {
            foreach ($chunk as $housingFile) {
                foreach($housingFile->housingFileSpecifications as $housingFileSpecifications) {
                    $rowData = [];
                    //$rowData[0] = $housingFile->address->contact ? $housingFile->address->contact->full_name : '';
                    $rowData[0] = $housingFileSpecifications->id; //'Woningspecificatie ID'
                    $rowData[1] = $housingFile->address->contact ? $housingFile->address->contact->id : ''; //'Contact ID'
                    $rowData[2] = $housingFile->id; //'Woningdossier ID'
                    $rowData[3] = $housingFileSpecifications->measure ? $housingFileSpecifications->measure->name : ''; //'Maatregel categorie'
                    $rowData[4] = ($housingFileSpecifications->measure && $housingFileSpecifications->measure->measureCategory) ? $housingFileSpecifications->measure->measureCategory->name : ''; //'Maatregel'
                    $rowData[5] = $housingFileSpecifications->status ? $housingFileSpecifications->status->name : ''; //'Status'
                    $rowData[6] = $housingFileSpecifications->measure_date; //'Datum realisatie'
                    $rowData[7] = $housingFileSpecifications->floor ? $housingFileSpecifications->floor->name : ''; //'Verdieping'
                    $rowData[8] = $housingFileSpecifications->side ? $housingFileSpecifications->side->name : ''; //'Zijde'
                    $rowData[9] = $housingFileSpecifications->type_of_execution ? $typeOfExecutionOptions[$housingFileSpecifications->type_of_execution] : 'Onbekend'; //'Uitvoering'
                    $rowData[10] = $housingFileSpecifications->savings_gas; //'Savings gas'
                    $rowData[11] = $housingFileSpecifications->savings_electricity; //'Savings elektriciteit'
                    $rowData[12] = $housingFileSpecifications->co2_savings; //'Savings Co2 '

                    $completeData[] = $rowData;
                }
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