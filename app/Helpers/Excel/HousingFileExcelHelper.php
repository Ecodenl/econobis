<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Excel;

use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class HousingFileExcelHelper
{
    private $housingFiles;

    public function __construct($housingFiles)
    {
        $this->housingFiles = $housingFiles;
    }

    public function downloadExcel()
    {

        if($this->housingFiles->count() === 0){
            abort(403, 'Geen woningdossiers aanwezig in selectie');
        }

        $completeData = [];

        $headerData = [];

        $headerData[] = 'Contactnaam';
        $headerData[] = 'Straat';
        $headerData[] = 'Nummer';
        $headerData[] = 'Toevoeging';
        $headerData[] = 'Postcode';
        $headerData[] = 'Plaats';
        $headerData[] = 'Woningtype';
        $headerData[] = 'Gebruikersopervlakte';
        $headerData[] = 'Bouwjaar';
        $headerData[] = 'Daktype';
        $headerData[] = 'Energielabel';
        $headerData[] = 'Status energielabel';
        $headerData[] = 'Aantal bouwlagen';
        $headerData[] = 'Monument';

        $completeData[] = $headerData;

        foreach ($this->housingFiles->chunk(500) as $chunk) {
            $chunk->load([
                'address.country',
            ]);

            foreach ($chunk as $housingFile) {
                $rowData = [];
                $rowData[0] = $housingFile->address->contact ? $housingFile->address->contact->full_name : '';
                $rowData[1] = $housingFile->address->street;
                $rowData[2] = $housingFile->address->number;
                $rowData[3] = $housingFile->address->addition;
                $rowData[4] = $housingFile->address->postal_code;
                $rowData[5] = $housingFile->address->city;
                $rowData[6] = $housingFile->buildingType ? $housingFile->buildingType->name : '';
                $rowData[7] = $housingFile->surface;
                $rowData[8] = $housingFile->build_year;
                $rowData[9] = $housingFile->roofType ? $housingFile->roofType->name : '';
                $rowData[10] = $housingFile->energyLabel ? $housingFile->energyLabel->name : '';
                $rowData[11] = $housingFile->energyLabelStatus ? $housingFile->energyLabelStatus->name : '';
                $rowData[12] = $housingFile->floors;
                $rowData[13] = $housingFile->is_monument;

                $completeData[] = $rowData;
            }
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Load all data in worksheet
        $sheet->fromArray($completeData);

        for ($col = 'A'; $col !== 'Y'; $col++) {
            $spreadsheet->getActiveSheet()
                ->getColumnDimension($col)
                ->setAutoSize(true);
        }

        $sheet->getStyle('A1:Z1')
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