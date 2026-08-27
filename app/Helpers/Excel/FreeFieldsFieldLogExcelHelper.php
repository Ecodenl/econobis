<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Excel;

use App\Eco\Address\Address;
use App\Eco\Contact\Contact;
use App\Eco\FreeFields\FreeFieldsTable;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
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
            abort(411, 'Geen mutatie log regels aanwezig');
        }

        $completeData = [];

        $headerData = [];

        $headerData[0] = 'Wijzigings datum / tijd';
        $headerData[1] = 'Gewijzigd voor contactnaam';
        $headerData[2] = 'Gewijzigd voor contactnummer';
        $headerData[3] = 'Gewijzigd voor adres';
        $headerData[4] = 'Vrije veld';
        $headerData[5] = 'Oude waarde';
        $headerData[6] = 'Nieuwe waarde';
        $headerData[7] = 'Portal gebruiker contactnaam';
        $headerData[8] = 'Portal gebruiker contactnummer';
        $headerData[9] = 'Portal gebruiker concact primair emailadres';
        $headerData[10] = 'Portal gebruiker login emailadres';

        $completeData[] = $headerData;

        foreach ($this->freeFieldsFieldLogs->chunk(500) as $chunk) {
            $chunk->load([
                'freeFieldsFieldRecord', 'portalUser', 'user',
            ]);

            foreach ($chunk as $freeFieldsFieldLog) {

                if(!$freeFieldsFieldLog?->freeFieldsFieldRecord) continue;

                $freeFieldsFieldRecord = $freeFieldsFieldLog->freeFieldsFieldRecord;
                $freeFieldTable = FreeFieldsTable::find($freeFieldsFieldRecord?->freeFieldsField->table_id);
                Log::info('Tabel: ' . $freeFieldTable->name);
                Log::info('table_record_id: ' . $freeFieldsFieldRecord->table_record_id);
                $contact = null;
                $address = null;
                if($freeFieldTable?->table === 'contacts'){
                    $contact = Contact::find($freeFieldsFieldRecord->table_record_id);
                }
                if($freeFieldTable?->table === 'addresses'){
                    $address = Address::find($freeFieldsFieldRecord->table_record_id);
                }

                $rowData = [];
                $rowData[0] = $freeFieldsFieldLog->updated_at ? Carbon::parse($freeFieldsFieldLog->updated_at)->format('d-m-Y H:i:s') : '';
                $rowData[1] = $contact?->full_name_fnf ?? '';
                $rowData[2] = $contact?->number ?? '';
                $rowData[3] = $address?->street_postal_code_city ?? '';
                $rowData[4] = $freeFieldsFieldLog?->freeFieldsFieldRecord->freeFieldsField->field_name ?? '';
                $rowData[5] = $freeFieldsFieldLog->old_value ?? '';
                $rowData[6] = $freeFieldsFieldLog->new_value ?? '';
                $rowData[7] = $freeFieldsFieldLog?->portalUser?->contact?->full_name_fnf ?? '';
                $rowData[8] = $freeFieldsFieldLog?->portalUser?->contact?->number ?? '';
                $rowData[9] = $freeFieldsFieldLog?->portalUser?->contact?->primaryEmailAddress?->email ?? '';
                $rowData[10] = $freeFieldsFieldLog?->portalUser?->email ?? '';

                $completeData[] = $rowData;
            }
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Load all data in worksheet
        $sheet->fromArray($completeData);

        for ($col = 'A'; $col !== 'L'; $col++) {
            $spreadsheet->getActiveSheet()
                ->getColumnDimension($col)
                ->setAutoSize(true);
        }

        $sheet->getStyle('A1:K1')
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