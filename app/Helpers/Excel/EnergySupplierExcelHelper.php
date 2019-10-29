<?php

namespace App\Helpers\Excel;

use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\Project\ProjectRevenue;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class EnergySupplierExcelHelper
{
    private $energySupplier;
    private $projectRevenue;
    private $distributions;
    private $counter;

    public function __construct(
        EnergySupplier $energySupplier,
        ProjectRevenue $projectRevenue,
        $templateId, $fileName
    ) {
        $this->energySupplier = $energySupplier;
        $this->projectRevenue = $projectRevenue;
        $this->templateId = $templateId;
        $this->fileName = $fileName;
        $this->distributions = $projectRevenue->distribution()->where('es_id', $energySupplier->id)->get();
    }

    public function getExcel()
    {

        if($this->distributions->count() === 0){
            abort(403, 'Geen verdeling voor deze energiemaatschappij');
        }

        switch ($this->templateId) {
            case '1':
                $excel = $this->getEnecoExcel();
                break;
            case '2':
                $excel = $this->getGreenchoiceExcel();
                break;
            case '3':
                $excel = $this->getOxxioExcel();
                break;
            case '4':
                $excel = $this->getNuonExcel();
                break;
            default:
                break;
        }

        return $excel;
    }

    private function getEnecoExcel()
    {
        $completeData = [];

        $headerData = [];
        $headerData[] = 'Naam';
        $headerData[] = 'Voorletters';
        $headerData[] = 'Tussenvoegsel';
        $headerData[] = 'Adres';
        $headerData[] = 'Postcode cijfers';
        $headerData[] = 'Postcode letters';
        $headerData[] = 'Woonplaats';
        $headerData[] = 'Ean-code leveringsadres';
        $headerData[] = 'Emailadres';
        $headerData[] = 'Telefoonnummer';
        $headerData[] = 'Startdatum';
        $headerData[] = 'Stand op 31-12';
        $headerData[] = 'Einddatum';
        $headerData[] = 'Aantal kavels';
        $headerData[] = 'Eneco klantnr';
        $headerData[] = 'Accountnr';
        $headerData[] = 'Opwek';
        $headerData[] = 'Nabijheids-tarief';
        $headerData[] = 'Stroom Totaal';
        $headerData[] = 'EB Korting Totaal Excl. BTW';
        $headerData[] = 'Klant Ontvangt Excl. BTW';
        $headerData[] = 'Klant Ontvangt Incl. BTW';
        $headerData[] = 'EB <jaartal>';
        $headerData[] = 'Afrekendatum';

        $completeData[] = $headerData;

        foreach ($this->distributions->chunk(500) as $chunk) {
            $chunk->load([
                'contact.person',
                'contact.primaryEmailAddress',
                'contact.primaryphoneNumber',
                'revenue',
                'contact.primaryContactEnergySupplier',
            ]);

            foreach ($chunk as $distribution) {

                foreach ($distribution->deliveredKwhPeriod as $deliveredKwhPeriod) {
                    $rowData = [];
                    $rowData[] = $distribution->contact->full_name;
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->initials : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name_prefix : '';
                    $rowData[] = $distribution->address;
                    $rowData[] = $distribution->postal_code_numbers = strlen($distribution->postal_code) > 3
                        ? substr($distribution->postal_code, 0, 4) : '';
                    $rowData[] = $distribution->postal_code_letters
                        = strlen($distribution->postal_code) == 6
                        ? substr($distribution->postal_code, 4)
                        : (strlen($distribution->postal_code) == 7
                            ? substr($distribution->postal_code, 5)
                            : '');
                    $rowData[] = $distribution->city;
                    $rowData[] = $distribution->contact->primaryContactEnergySupplier && !empty($distribution->contact->primaryContactEnergySupplier->ean_electricity)
                        ? '"' . $distribution->contact->primaryContactEnergySupplier->ean_electricity . '"' : '';
                    $rowData[] = $distribution->contact->primaryEmailAddress
                        ? $distribution->contact->primaryEmailAddress->email : '';
                    $rowData[] = $distribution->contact->primaryphoneNumber
                        ? $distribution->contact->primaryphoneNumber->number : '';
                    $rowData[] = $this->formatDate($deliveredKwhPeriod->date_begin);
                    $rowData[] = '';
                    $rowData[] = $this->formatDate($deliveredKwhPeriod->date_end);
                    $rowData[] = $deliveredKwhPeriod->participations_quantity;
                    $rowData[] = $distribution->contact->primaryContactEnergySupplier
                        ? $distribution->contact->primaryContactEnergySupplier->es_number : '';
                    $rowData[] = '';
                    $rowData[] = $deliveredKwhPeriod->delivered_kwh;
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

        // FIX EAN codes
        // Kolommen metcellen die we expliciet instellen met "text" format.
        $textColumns = [
            'H'
        ];
        foreach ($textColumns as $textColumnLetter) {
            foreach ($completeData as $key => $row) {
                if ($key == 0) continue; // Header overslaan
                $cellCode = $textColumnLetter . ($key + 1);
                $sheet->getStyle($cellCode)
                    ->getNumberFormat()
                    ->setFormatCode(NumberFormat::FORMAT_TEXT );

                $cellValue = $spreadsheet->getActiveSheet()->getCell($cellCode)->getValue();

                $spreadsheet->getActiveSheet()->getCell($cellCode)
                    ->setValueExplicit(
                        $cellValue,
                        \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
                    );
            }
        }
        // EINDE FIX EAN codes

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

        return $spreadsheet;
    }

    private function getGreenchoiceExcel()
    {
        $this->counter = 0;

        $completeData = [];

        $headerData = [];
        $headerData[] = 'Volgnr';
        $headerData[] = 'KlantNaam';
        $headerData[] = 'Postcode';
        $headerData[] = 'KlantNummer';
        $headerData[] = 'EanCode';
        $headerData[] = 'OntvangstDatum';
        $headerData[] = 'BeginDatum';
        $headerData[] = 'EindDatum';
        $headerData[] = 'Aantal participaties';
        $headerData[] = 'Verwachte opbrengst';
        $headerData[] = 'ProductieHoeveelheid';
        $headerData[] = 'BestandsNaam';

        $completeData[] = $headerData;

        foreach ($this->distributions->chunk(500) as $chunk) {
            $chunk->load([
                'revenue',
                'contact.primaryContactEnergySupplier',
            ]);

            foreach ($chunk as $distribution) {

                foreach ($distribution->deliveredKwhPeriod as $deliveredKwhPeriod) {
                    $rowData = [];
                    ++$this->counter;
                    $rowData[] = $this->counter;
                    $rowData[] = $distribution->contact->full_name;
                    $rowData[] = str_replace(' ', '', $distribution->postal_code);
                    $rowData[] = $distribution->contact->primaryContactEnergySupplier
                        ? $distribution->contact->primaryContactEnergySupplier->es_number : '';
//                    $rowData[] = $distribution->contact->primaryContactEnergySupplier && !empty($distribution->contact->primaryContactEnergySupplier->ean_electricity)
//                        ? '"' . $distribution->contact->primaryContactEnergySupplier->ean_electricity . '"' : '';
                    $rowData[] = $distribution->contact->primaryContactEnergySupplier && !empty($distribution->contact->primaryContactEnergySupplier->ean_electricity)
                        ? $distribution->contact->primaryContactEnergySupplier->ean_electricity : '';
                    $rowData[] = $this->formatDate(new Carbon('now'));
                    $rowData[] = $this->formatDate($deliveredKwhPeriod->date_begin);
                    $rowData[] = $this->formatDate($deliveredKwhPeriod->date_end);
                    $rowData[] = $deliveredKwhPeriod->participations_quantity;
                    $rowData[] = '';
                    $rowData[] = $deliveredKwhPeriod->delivered_kwh;
                    $rowData[] = $this->fileName;

                    $completeData[] = $rowData;
                }
            }

        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Load all data in worksheet
        $sheet->fromArray($completeData);

        // FIX EAN codes
        // Kolommen metcellen die we expliciet instellen met "text" format.
        $textColumns = [
            'E'
        ];
        foreach ($textColumns as $textColumnLetter) {
            foreach ($completeData as $key => $row) {
                if ($key == 0) continue; // Header overslaan
                $cellCode = $textColumnLetter . ($key + 1);
//                $sheet->getStyle($cellCode)
//                    ->getNumberFormat()
//                    ->setFormatCode(NumberFormat::FORMAT_TEXT );
//
//                $cellValue = $spreadsheet->getActiveSheet()->getCell($cellCode)->getValue();
//
//                $spreadsheet->getActiveSheet()->getCell($cellCode)
//                    ->setValueExplicit(
//                        $cellValue,
//                        \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
//                    );

                $cell = $spreadsheet->getActiveSheet()->getCell($cellCode);
                $cell->setDataType(DataType::TYPE_STRING);
                $sheet->getStyle($cellCode)->getNumberFormat()->setFormatCode('#');
                $sheet->getStyle($cellCode)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);

            }
        }
        // EINDE FIX EAN codes

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

        return $spreadsheet;
    }

    private function getOxxioExcel()
    {
        $this->counter = 0;

        $completeData = [];

        $headerData = [];
        $headerData[] = 'project ean';
        $headerData[] = 'project ean net';
        $headerData[] = 'startdatum';
        $headerData[] = 'einddatum';
        $headerData[] = 'participant';
        $headerData[] = 'referentie';
        $headerData[] = 'Postcode';
        $headerData[] = 'ean participant';
        $headerData[] = 'klantnr';
        $headerData[] = 'geleverd kwh';

        $completeData[] = $headerData;

        foreach ($this->distributions->chunk(500) as $chunk) {
            $chunk->load([
                'revenue',
                'contact.primaryContactEnergySupplier',
            ]);

            foreach ($chunk as $distribution) {

                foreach ($distribution->deliveredKwhPeriod as $deliveredKwhPeriod) {
                    $rowData = [];
                    $rowData[] = $this->projectRevenue->project->ean;
                    $rowData[] = $this->projectRevenue->project->ean_manager;
                    $rowData[] = $this->formatDate($deliveredKwhPeriod->date_begin);
                    $rowData[] = $this->formatDate($deliveredKwhPeriod->date_end);
                    $rowData[] = $distribution->contact->full_name;
                    $rowData[] = $distribution->tax_referral;
                    $rowData[] = $distribution->postal_code;
                    $rowData[] = $distribution->contact->primaryContactEnergySupplier && !empty($distribution->contact->primaryContactEnergySupplier->ean_electricity)
                        ? '"' . $distribution->contact->primaryContactEnergySupplier->ean_electricity . '"' : '';
                    $rowData[] = $distribution->contact->primaryContactEnergySupplier
                        ? $distribution->contact->primaryContactEnergySupplier->es_number : '';
                    $rowData[] = $deliveredKwhPeriod->delivered_kwh;

                    $completeData[] = $rowData;
                }
            }

        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // FIX EAN codes
        // Kolommen metcellen die we expliciet instellen met "text" format.
        $textColumns = [
            'H'
        ];
        foreach ($textColumns as $textColumnLetter) {
            foreach ($completeData as $key => $row) {
                if ($key == 0) continue; // Header overslaan
                $cellCode = $textColumnLetter . ($key + 1);
                $sheet->getStyle($cellCode)
                    ->getNumberFormat()
                    ->setFormatCode(NumberFormat::FORMAT_TEXT );

                $cellValue = $spreadsheet->getActiveSheet()->getCell($cellCode)->getValue();

                $spreadsheet->getActiveSheet()->getCell($cellCode)
                    ->setValueExplicit(
                        $cellValue,
                        \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
                    );
            }
        }
        // EINDE FIX EAN codes

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

        return $spreadsheet;
    }

    private function getNuonExcel()
    {
        $this->counter = 0;

        $completeData = [];

        $headerData = [];
        $headerData[] = 'Interne Ref.nr.';
        $headerData[] = 'Aanspreektitel';
        $headerData[] = 'Voornaam';
        $headerData[] = 'Tussenvoegsel';
        $headerData[] = 'Achternaam';
        $headerData[] = 'Adres Aansluiting';
        $headerData[] = 'Postcode Aansluiting';
        $headerData[] = 'Woonplaats Aansluiting';
        $headerData[] = 'Leverancier';
        $headerData[] = 'Klantnummer';
        $headerData[] = 'Contractrekening';
        $headerData[] = 'EanCode';
        $headerData[] = 'Aantal certificaten';
        $headerData[] = 'Startdatum';
        $headerData[] = 'Einddatum';
        $headerData[] = 'Toegerekende productie';
        $headerData[] = 'Eenheid (kWh)';

        $completeData[] = $headerData;

        foreach ($this->distributions->chunk(500) as $chunk) {
            $chunk->load([
                'contact.person',
                'contact.primaryEmailAddress',
                'contact.primaryphoneNumber',
                'revenue',
                'contact.primaryContactEnergySupplier',
            ]);

            foreach ($chunk as $distribution) {

                foreach ($distribution->deliveredKwhPeriod as $deliveredKwhPeriod) {
                    $rowData = [];
                    $rowData[] = $distribution->contact->number;
                    $rowData[] = $distribution->contact->person->title ? $distribution->contact->person->title->name
                        : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->first_name : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name_prefix : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name : '';
                    $rowData[] = $distribution->address;
                    $rowData[] = $distribution->postal_code;
                    $rowData[] = $distribution->city;
                    $rowData[] = $distribution->energy_supplier_name;
                    $rowData[] = $distribution->contact->primaryContactEnergySupplier
                        ? $distribution->contact->primaryContactEnergySupplier->es_number : '';
                    $rowData[] = $distribution->contact->iban;
                    $rowData[] = $distribution->contact->primaryContactEnergySupplier && !empty($distribution->contact->primaryContactEnergySupplier->ean_electricity)
                        ? '"' . $distribution->contact->primaryContactEnergySupplier->ean_electricity . '"' : '';
                    $rowData[] = $deliveredKwhPeriod->participations_quantity;
                    $rowData[] = $this->formatDate($deliveredKwhPeriod->date_begin);
                    $rowData[] = $this->formatDate($deliveredKwhPeriod->date_end);
                    $rowData[] = $deliveredKwhPeriod->delivered_kwh;
                    $rowData[] = '';

                    $completeData[] = $rowData;
                }
            }

        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // FIX EAN codes
        // Kolommen metcellen die we expliciet instellen met "text" format.
        $textColumns = [
            'L'
        ];
        foreach ($textColumns as $textColumnLetter) {
            foreach ($completeData as $key => $row) {
                if ($key == 0) continue; // Header overslaan
                $cellCode = $textColumnLetter . ($key + 1);
                $sheet->getStyle($cellCode)
                    ->getNumberFormat()
                    ->setFormatCode(NumberFormat::FORMAT_TEXT );

                $cellValue = $spreadsheet->getActiveSheet()->getCell($cellCode)->getValue();

                $spreadsheet->getActiveSheet()->getCell($cellCode)
                    ->setValueExplicit(
                        $cellValue,
                        \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
                    );
            }
        }
        // EINDE FIX EAN codes

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

        return $spreadsheet;
    }

    private function formatDate($date) {
        $formatDate = $date ? new Carbon($date) : false;
        return $formatDate ? $formatDate->format('d-m-Y') : '';
    }
}