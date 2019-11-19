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

class IntakeExcelHelper
{
    private $intakes;

    public function __construct($intakes)
    {
        $this->intakes = $intakes;
    }

    public function downloadExcel()
    {

        if($this->intakes->count() === 0){
            abort(403, 'Geen intakes aanwezig in selectie');
        }

        $completeData = [];

        $headerData = [];

        $headerData[] = '#';
        $headerData[] = 'Contact';
        $headerData[] = 'Persoon titel';
        $headerData[] = 'Persoon initialen';
        $headerData[] = 'Persoon voornaam';
        $headerData[] = 'Persoon tussenvoegsel';
        $headerData[] = 'Persoon achternaam';
        $headerData[] = 'Straat';
        $headerData[] = 'Nummer';
        $headerData[] = 'Toevoeging';
        $headerData[] = 'Postcode';
        $headerData[] = 'Plaats';
        $headerData[] = 'Land';
        $headerData[] = 'Aanmeldingsbron(nen)';
        $headerData[] = 'Campagne';
        $headerData[] = 'Status';
        $headerData[] = 'Laatste update op';
        $headerData[] = 'Laatste update door';
        $headerData[] = 'Gemaakt op';
        $headerData[] = 'Gemaakt door';

        $completeData[] = $headerData;

        foreach ($this->intakes->chunk(500) as $chunk) {
            $chunk->load([
                'contact.person.title',
                'address.country',
                'campaign',
                'status',
                'sources',
                'createdBy',
                'updatedBy',
            ]);

            foreach ($chunk as $intake) {
                $intake->sources_string = '';
                $sources = [];
                foreach ($intake->sources as $source) {
                    array_push($sources, $source->name);
                }
                if (count($sources) > 0) {
                    $intake->sources_string = implode($sources, ', ');
                }

                // person/organisation fields
                if ($intake->contact->type_id === 'person') {
                    $intake->title = $intake->contact->person->title;
                    $intake->initials = $intake->contact->person->initials;
                    $intake->first_name = $intake->contact->person->first_name;
                    $intake->last_name_prefix = $intake->contact->person->last_name_prefix;
                    $intake->last_name = $intake->contact->person->last_name;
                }

                $rowData = [];
                $rowData[] = $intake->number;
                $rowData[] = $intake->contact ? $intake->contact->full_name : '';
                $rowData[] = $intake->title ? $intake->title->name : '';
                $rowData[] = $intake->initials;
                $rowData[] = $intake->first_name;
                $rowData[] = $intake->last_name_prefix;
                $rowData[] = $intake->last_name;
                $rowData[] = $intake->street;
                $rowData[] = $intake->street_number;
                $rowData[] = $intake->addition;
                $rowData[] = $intake->postal_code;
                $rowData[] = $intake->city;
                $rowData[] = $intake->country;
                $rowData[] = $intake->sources_string;
                $rowData[] = $intake->campaign ? $intake->campaign->name : '';
                $rowData[] = $intake->status ? $intake->status->name : '';
                $rowData[] = $this->formatDate($intake->updatedAtDate);
                $rowData[] = $intake->updatedBy->present()->fullName();
                $rowData[] = $this->formatDate($intake->created_at_date);
                $rowData[] = $intake->createdBy->present()->fullName();

                $completeData[] = $rowData;

            }


        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Load all data in worksheet
        $sheet->fromArray($completeData);

        for ($col = 'A'; $col !== 'Z'; $col++) {
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

     private function formatDate($date) {
        $formatDate = $date ? new Carbon($date) : false;
        return $formatDate ? $formatDate->format('d-m-Y') : '';
    }
}