<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Excel;

use App\Eco\Opportunity\Opportunity;
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

    public function downloadExcel($withOpportunities = "true")
    {
        if($this->intakes->count() === 0){
            abort(403, 'Geen intakes aanwezig in selectie');
        }

        $completeData = [];

        $headerData = [];

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
        $headerData[] = 'Buurt';
        $headerData[] = 'Wijk';
        $headerData[] = 'Land';
        $headerData[] = 'Aanmeldingsbron(nen)';
        $headerData[] = 'Campagne';
        $headerData[] = 'Status';
        $headerData[] = 'Laatste update op';
        $headerData[] = 'Laatste update door';
        $headerData[] = 'Gemaakt op';
        $headerData[] = 'Gemaakt door';
        $headerData[] = 'Opmerking';
        $headerData[] = 'Motivatie';
        $headerData[] = 'Interesse maatregel';
        if( $withOpportunities == "true" ) {
            $headerData[] = 'Gerelateerde kans';
            $headerData[] = 'Kans status';
            $headerData[] = 'Kans datum uitvoering';
            $headerData[] = 'Kans datum evaluatie';
        }

        $completeData[] = $headerData;

        foreach ($this->intakes->chunk(500) as $chunk) {
            $chunk->load([
                'contact.person.title',
                'address.country',
                'campaign',
                'status',
                'sources',
                'opportunities',
                'createdBy',
                'updatedBy',
            ]);

            foreach ($chunk as $intake) {
                $intake->sources_string = '';
                $sources = [];
                foreach ($intake->sources as $source) {
                    array_push($sources, $source->name_custom ?: $source->name);
                }

                if (count($sources) > 0) {
                    $intake->sources_string = implode(', ', $sources);
                }

                $address = $intake->address;

                // person/organisation fields
                if ($intake->contact->type_id === 'person') {
                    $intake->title = $intake->contact->person->title;
                    $intake->initials = $intake->contact->person->initials;
                    $intake->first_name = $intake->contact->person->first_name;
                    $intake->last_name_prefix = $intake->contact->person->last_name_prefix;
                    $intake->last_name = $intake->contact->person->last_name;
                }
                $rowData = [];
                $rowData[0] = $intake->contact ? $intake->contact->full_name : '';
                $rowData[1] = $intake->title ? $intake->title->name : '';
                $rowData[2] = $intake->initials;
                $rowData[3] = $intake->first_name;
                $rowData[4] = $intake->last_name_prefix;
                $rowData[5] = $intake->last_name;
                $rowData[6] = ($address ? $address->street : '');
                $rowData[7] = ($address ? $address->number : '');
                $rowData[8] = ($address ? $address->addition : '');
                $rowData[9] = ($address ? $address->postal_code : '');
                $rowData[10] = ($address ? $address->city : '');
                $rowData[11] = ($address ? $address->shared_area_name : '');
                $rowData[12] = (($address && $address->getSharedPostalCodesHouseNumber() && $address->getSharedPostalCodesHouseNumber()->sharedArea) ? $address->getSharedPostalCodesHouseNumber()->sharedArea->district_name : '');
                $rowData[13] = (($address && $address->country) ? $address->country->name : '');
                $rowData[14] = $intake->sources_string;
                $rowData[15] = $intake->campaign ? $intake->campaign->name : '';
                $rowData[16] = $intake->status ? $intake->status->name : '';
                $rowData[17] = $this->formatDate($intake->updated_at);
                $rowData[18] = $intake->updatedBy ? $intake->updatedBy->present()->fullName() : '';
                $rowData[19] = $this->formatDate($intake->created_at);
                $rowData[20] = $intake->createdBy ? $intake->createdBy->present()->fullName() : '' ;
                $rowData[21] = $intake->note ?? '';
                $rowData[22] = implode(', ', $intake->reasons->pluck('name')->toArray());

                if (count($intake->measuresRequested)>0 AND $withOpportunities == "true") {

                    // measuresRequested
                    foreach ($intake->measuresRequested as $measure) {
                        $rowData[23] = $measure->name;

                        // opportunity
                        $opportunity = Opportunity::where('intake_id', $intake->id)->where('measure_category_id', $measure->id)->first();
                        if ($opportunity) {
                            $rowData[24] = $opportunity->number;
                            $rowData[25] = $opportunity->status ? $opportunity->status->name : '';
                            $rowData[26] = $this->formatDate($opportunity->desired_date);
                            $rowData[27] = $this->formatDate($opportunity->evaluation_agreed_date);
                        }

                        $completeData[] = $rowData;

                    }
                } else {
                    $rowData[23] = implode(', ', $intake->measuresRequested->pluck('name')->toArray());
                    $rowData[24] = '';
                    $rowData[25] = '';
                    $rowData[26] = '';
                    $rowData[27] = '';
                    $completeData[] = $rowData;
                }
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
