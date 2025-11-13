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

class FreeFieldsFieldLogExcelHelper
{
    private $freeFieldsFieldLogs;

    public function __construct($freeFieldsFieldLogs)
    {
        $this->freeFieldsFieldLogs = $freeFieldsFieldLogs;
    }

    public function downloadExcel()
    {

        if($this->freeFieldsFieldLogs->count() === 0){
            abort(403, 'Geen mutatie log regels aanwezig');
        }

        $completeData = [];

        $headerData = [];

        $headerData[0] = 'Wijzigings datum / tijd';
        $headerData[1] = 'Vrije veld';
        $headerData[2] = 'Oude waarde';
        $headerData[3] = 'Nieuwe waarde';
        $headerData[4] = 'Portal gebruiker contactnaam';
        $headerData[5] = 'Portal gebruiker contactnummer';
        $headerData[6] = 'Portal gebruiker concact primair emailadres';
        $headerData[7] = 'Portal gebruiker login emailadres';

        $completeData[] = $headerData;

        foreach ($this->freeFieldsFieldLogs->chunk(500) as $chunk) {
            $chunk->load([
                'freeFieldsFieldRecord', 'portalUser', 'user',
            ]);

            foreach ($chunk as $freeFieldsFieldLog) {
                $rowData = [];
                $rowData[0] = $freeFieldsFieldLog->updated_at ? Carbon::parse($freeFieldsFieldLog->updated_at)->format('d-m-Y H:i:s') : '';
                $rowData[1] = $freeFieldsFieldLog?->freeFieldsFieldRecord?->freeFieldsField?->field_name ?? '';
                $rowData[2] = $freeFieldsFieldLog->old_value ?? '';
                $rowData[3] = $freeFieldsFieldLog->new_value ?? '';
                $rowData[4] = $freeFieldsFieldLog?->portalUser?->contact?->full_name ?? '';
                $rowData[5] = $freeFieldsFieldLog?->portalUser?->contact?->number ?? '';
                $rowData[6] = $freeFieldsFieldLog?->portalUser?->contact?->primaryEmailAddress?->email ?? '';
                $rowData[7] = $freeFieldsFieldLog?->portalUser?->email ?? '';

                $completeData[] = $rowData;
            }
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Load all data in worksheet
        $sheet->fromArray($completeData);

        for ($col = 'A'; $col !== 'H'; $col++) {
            $spreadsheet->getActiveSheet()
                ->getColumnDimension($col)
                ->setAutoSize(true);
        }

        $sheet->getStyle('A1:H1')
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