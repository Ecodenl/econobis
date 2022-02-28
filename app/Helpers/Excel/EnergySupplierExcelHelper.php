<?php

namespace App\Helpers\Excel;

use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\RevenuesKwh\RevenuesKwh;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class EnergySupplierExcelHelper
{
    private $energySupplier;
    private $revenuesKwh;
    private $distributions;
    private $counter;
    private $fileName;

    public function __construct(
        EnergySupplier $energySupplier,
        RevenuesKwh $revenuesKwh,
        $templateId, $fileName
    ) {
        $this->energySupplier = $energySupplier;
        $this->revenuesKwh = $revenuesKwh;
        $this->templateId = $templateId;
        $this->fileName = $fileName;
        $distributionPartsKwh = $revenuesKwh->distributionPartsKwh()->where('es_id', $energySupplier->id)->pluck('distribution_id')->toArray();
        $this->distributions = $revenuesKwh->distributionKwh()->whereIn('id', $distributionPartsKwh)->get();
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
                $excel = $this->getVattenfallExcel();
                break;
            case '5':
                $excel = $this->getEnergieVanOnsExcel();
                break;
            case '6':
                $excel = $this->getUniformExcel();
                break;
            case '7':
                $excel = $this->getOmExcel();
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
        $headerData[] = 'Straat';
        $headerData[] = 'Huisnummer';
        $headerData[] = 'Toevoeging';
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
                'revenuesKwh',
                'distributionPartsKwh',
                'contact.primaryAddress',
                'participation.address',
            ]);

            foreach ($chunk as $distribution) {

                if($distribution->participation && $distribution->participation->address){
                    $participationAddress = $distribution->participation->address;
                }else{
                    $participationAddress = $distribution->contact->primaryAddress;
                }
                $eanElectricity = $distribution->ean_electricity && !empty($distribution->ean_electricity)
                    ? 'EAN: ' . $distribution->ean_electricity
                    : ( $participationAddress && !empty($participationAddress->ean_electricity)
                        ? 'EAN: ' . $participationAddress->ean_electricity : '' );
                $esNumbers = implode(',', $distribution->distributionPartsKwh()
                    ->where('es_id', $this->energySupplier->id)
                    ->where(function ($query) {
                        $query->whereNotNull('energy_supplier_number')
                            ->orWhere('energy_supplier_number', '!=', '');
                    })
                    ->pluck('energy_supplier_number')->toArray());
                $deliveredTotalEs = $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)->sum('delivered_kwh');
                $dateBeginYear = Carbon::parse($this->revenuesKwh->date_begin)->year;
                $deliveredTotalEsEndOfYear = $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_end', $dateBeginYear);
                    })->sum('delivered_kwh');

                $rowData = [];
                $rowData[] = $distribution->contact->full_name;
                $rowData[] = $distribution->contact->person ? $distribution->contact->person->initials : '';
                $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name_prefix : '';
                $rowData[] = $distribution->street ? $distribution->street : $distribution->address;
                $rowData[] = ($distribution->street && $distribution->street_number) ? $distribution->street_number : '';
                $rowData[] = ($distribution->street && $distribution->street_number_addition) ? $distribution->street_number_addition : '';

                if($distribution->country != '' && $distribution->country != 'Nederland')
                {
                    $rowData[] = $distribution->postal_code_numbers = $distribution->postal_code;
                    $rowData[] = $distribution->postal_code_letters = '';
                }else{
                    $rowData[] = $distribution->postal_code_numbers = strlen($distribution->postal_code) > 3
                        ? substr($distribution->postal_code, 0, 4) : '';
                    $rowData[] = $distribution->postal_code_letters
                        = strlen($distribution->postal_code) == 6
                        ? substr($distribution->postal_code, 4)
                        : (strlen($distribution->postal_code) == 7
                            ? substr($distribution->postal_code, 5)
                            : '');
                }
                $rowData[] = $distribution->city;
                $rowData[] = $eanElectricity;
                $rowData[] = $distribution->contact->primaryEmailAddress
                    ? $distribution->contact->primaryEmailAddress->email : '';
                $rowData[] = $distribution->contact->primaryphoneNumber
                    ? $distribution->contact->primaryphoneNumber->number : '';
                $rowData[] = $this->formatDate($this->revenuesKwh->date_begin);
                $rowData[] = round($deliveredTotalEsEndOfYear, 2);
                $rowData[] = $this->formatDate($this->revenuesKwh->date_end);
                $rowData[] = $distribution->participations_quantity;
                $rowData[] = $esNumbers;
                $rowData[] = '';
                $rowData[] = round($deliveredTotalEs, 2);
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

        return $spreadsheet;
    }

    private function getGreenchoiceExcel()
    {
        $this->counter = 0;

        $completeData = [];

        $headerData = [];
        $headerData[] = 'ZonId';
        $headerData[] = 'EanCode';
        $headerData[] = 'Postcode';
        $headerData[] = 'Huisnummer';
        $headerData[] = 'Toevoeging';
        $headerData[] = 'OntvangstDatum';
        $headerData[] = 'BeginDatum';
        $headerData[] = 'EindDatum';
        $headerData[] = 'BestandsNaam';
        $headerData[] = 'KlantNummer';
        $headerData[] = 'KlantNaam';
        $headerData[] = 'Collectief';
        $headerData[] = 'Project';
        $headerData[] = 'Totaal certificaten';
        $headerData[] = 'Totaal Productie';
        $headerData[] = 'Certificaten Adres';
        $headerData[] = 'Productie Adres';

        $completeData[] = $headerData;

        foreach ($this->distributions->chunk(500) as $chunk) {
            $chunk->load([
                'contact.person',
                'contact.primaryEmailAddress',
                'contact.primaryphoneNumber',
                'revenuesKwh',
                'distributionPartsKwh',
                'contact.primaryAddress',
                'participation.address',
            ]);

            foreach ($chunk as $distribution) {

                if($distribution->participation && $distribution->participation->address){
                    $participationAddress = $distribution->participation->address;
                }else{
                    $participationAddress = $distribution->contact->primaryAddress;
                }
                $eanElectricity = $distribution->ean_electricity && !empty($distribution->ean_electricity)
                    ? 'EAN: ' . $distribution->ean_electricity
                    : ( $participationAddress && !empty($participationAddress->ean_electricity)
                        ? 'EAN: ' . $participationAddress->ean_electricity : '' );
                $dateBeginYear = Carbon::parse($this->revenuesKwh->date_begin)->year;

                $partsUpToEndOfYearForTotal = $distribution->revenuesKwh->distributionPartsKwh()
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_end', $dateBeginYear);
                    });
                $totalEndOfYear = $partsUpToEndOfYearForTotal->get()->sum('delivered_kwh');
                $partsNextYearForTotal = $distribution->revenuesKwh->distributionPartsKwh()
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_begin', '>', $dateBeginYear);
                    });
                $totalNextYear = $partsNextYearForTotal->get()->sum('delivered_kwh');

                $esNumbersEndOfYear = implode(',', $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_end', $dateBeginYear);
                    })
                    ->where(function ($query) {
                        $query->whereNotNull('energy_supplier_number')
                            ->orWhere('energy_supplier_number', '!=', '');
                    })
                    ->pluck('energy_supplier_number')->toArray());
//                $esNamesEndOfYear = implode(',', $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
//                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
//                        $query->whereYear('date_end', $dateBeginYear);
//                    })
//                    ->where(function ($query) {
//                        $query->whereNotNull('energy_supplier_name')
//                            ->orWhere('energy_supplier_name', '!=', '');
//                    })
//                    ->pluck('energy_supplier_name')->toArray());
                $deliveredTotalEsEndOfYear = $distribution->distributionPartsKwh()
                    ->join('revenue_parts_kwh', 'revenue_distribution_parts_kwh.parts_id', '=', 'revenue_parts_kwh.id')
                    ->where('revenue_distribution_parts_kwh.es_id', $this->energySupplier->id)
                    ->whereYear('revenue_parts_kwh.date_end', $dateBeginYear)
                    ->sum('revenue_distribution_parts_kwh.delivered_kwh');
                $partsEndOfYear = $distribution->distributionPartsKwh()
                    ->join('revenue_parts_kwh', 'revenue_distribution_parts_kwh.parts_id', '=', 'revenue_parts_kwh.id')
                    ->where('revenue_distribution_parts_kwh.es_id', $this->energySupplier->id)
                    ->whereYear('revenue_parts_kwh.date_end', $dateBeginYear)
                    ->orderBy('revenue_parts_kwh.date_end', 'desc')
                    ->first();
                $participationsQuantityEndOfYear = $partsEndOfYear ? $partsEndOfYear->participations_quantity : 0;

                $esNumbersNextYear = implode(',', $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_begin', '>', $dateBeginYear);
                    })
                    ->where(function ($query) {
                        $query->whereNotNull('energy_supplier_number')
                            ->orWhere('energy_supplier_number', '!=', '');
                    })
                    ->pluck('energy_supplier_number')->toArray());
//                $esNamesNextYear = implode(',', $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
//                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
//                        $query->whereYear('date_begin', '>', $dateBeginYear);
//                    })
//                    ->where(function ($query) {
//                        $query->whereNotNull('energy_supplier_name')
//                            ->orWhere('energy_supplier_name', '!=', '');
//                    })
//                    ->pluck('energy_supplier_name')->toArray());
                $deliveredTotalEsNextYear = $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_begin', '>', $dateBeginYear);
                    })
                    ->sum('delivered_kwh');
                if(Carbon::parse($this->revenuesKwh->date_begin)->year == Carbon::parse($this->revenuesKwh->date_end)->year) {
                    $rowData = [];
                    $rowData[] = $distribution->participation_id;
                    $rowData[] = $eanElectricity;
                    $rowData[] = str_replace(' ', '', $distribution->postal_code);
                    $rowData[] = $distribution->street_number;
                    $rowData[] = $distribution->street_number_addition;
                    $rowData[] = $this->formatDate(new Carbon('now'));
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_begin);
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_end);
                    $rowData[] = $this->fileName;
                    $rowData[] = $esNumbersEndOfYear;
                    $rowData[] = $distribution->contact->full_name;
                    $rowData[] = $this->revenuesKwh->project->administration ? $this->revenuesKwh->project->administration->name : '';
                    $rowData[] = $this->revenuesKwh->project->name;
                    $rowData[] = $this->revenuesKwh->project->participations_definitive;
                    $rowData[] = round($totalEndOfYear, 2);
                    $rowData[] = $distribution->participations_quantity;
                    $rowData[] = round($deliveredTotalEsEndOfYear, 2);
                    $completeData[] = $rowData;
                }else{
                    $rowData = [];
                    $rowData[] = $distribution->participation_id;
                    $rowData[] = $eanElectricity;
                    $rowData[] = str_replace(' ', '', $distribution->postal_code);
                    $rowData[] = $distribution->street_number;
                    $rowData[] = $distribution->street_number_addition;
                    $rowData[] = $this->formatDate(new Carbon('now'));
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_begin);
                    $rowData[] = $this->formatDate(Carbon::parse($this->revenuesKwh->date_begin)->endOfYear());
                    $rowData[] = $this->fileName;
                    $rowData[] = $esNumbersEndOfYear;
                    $rowData[] = $distribution->contact->full_name;
                    $rowData[] = $this->revenuesKwh->project->administration ? $this->revenuesKwh->project->administration->name : '';
                    $rowData[] = $this->revenuesKwh->project->name;
                    $rowData[] = $this->revenuesKwh->project->participations_definitive;
                    $rowData[] = round($totalEndOfYear, 2);
                    $rowData[] = $participationsQuantityEndOfYear;
                    $rowData[] = round($deliveredTotalEsEndOfYear, 2);
                    $completeData[] = $rowData;

                    $rowData = [];
                    $rowData[] = $distribution->participation_id;
                    $rowData[] = $eanElectricity;
                    $rowData[] = str_replace(' ', '', $distribution->postal_code);
                    $rowData[] = $distribution->street_number;
                    $rowData[] = $distribution->street_number_addition;
                    $rowData[] = $this->formatDate(new Carbon('now'));
                    $rowData[] = $this->formatDate(Carbon::parse($this->revenuesKwh->date_end)->startOfYear());
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_end);
                    $rowData[] = $this->fileName;
                    $rowData[] = $esNumbersNextYear;
                    $rowData[] = $distribution->contact->full_name;
                    $rowData[] = $this->revenuesKwh->project->administration ? $this->revenuesKwh->project->administration->name : '';
                    $rowData[] = $this->revenuesKwh->project->name;
                    $rowData[] = $this->revenuesKwh->project->participations_definitive;
                    $rowData[] = round($totalNextYear, 2);
                    $rowData[] = $distribution->participations_quantity;
                    $rowData[] = round($deliveredTotalEsNextYear, 2);
                    $completeData[] = $rowData;
                }
            }
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Load all data in worksheet
        $sheet->fromArray($completeData);

        for ($col = 'A'; $col !== 'M'; $col++) {
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
                'contact.person',
                'contact.primaryEmailAddress',
                'contact.primaryphoneNumber',
                'revenuesKwh',
                'distributionPartsKwh',
                'contact.primaryAddress',
                'participation.address',
            ]);

            foreach ($chunk as $distribution) {

                if($distribution->participation && $distribution->participation->address){
                    $participationAddress = $distribution->participation->address;
                }else{
                    $participationAddress = $distribution->contact->primaryAddress;
                }
                $eanElectricity = $distribution->ean_electricity && !empty($distribution->ean_electricity)
                    ? 'EAN: ' . $distribution->ean_electricity
                    : ( $participationAddress && !empty($participationAddress->ean_electricity)
                        ? 'EAN: ' . $participationAddress->ean_electricity : '' );
                $dateBeginYear = Carbon::parse($this->revenuesKwh->date_begin)->year;

//                $partsUpToEndOfYearForTotal = $distribution->revenuesKwh->distributionPartsKwh()
//                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
//                        $query->whereYear('date_end', $dateBeginYear);
//                    });
//                $totalEndOfYear = $partsUpToEndOfYearForTotal->get()->sum('delivered_kwh');
//                $partsNextYearForTotal = $distribution->revenuesKwh->distributionPartsKwh()
//                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
//                        $query->whereYear('date_begin', '>', $dateBeginYear);
//                    });
//                $totalNextYear = $partsNextYearForTotal->get()->sum('delivered_kwh');

                $esNumbersEndOfYear = implode(',', $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_end', $dateBeginYear);
                    })
                    ->where(function ($query) {
                        $query->whereNotNull('energy_supplier_number')
                            ->orWhere('energy_supplier_number', '!=', '');
                    })
                    ->pluck('energy_supplier_number')->toArray());
                $deliveredTotalEsEndOfYear = $distribution->distributionPartsKwh()
                    ->join('revenue_parts_kwh', 'revenue_distribution_parts_kwh.parts_id', '=', 'revenue_parts_kwh.id')
                    ->where('revenue_distribution_parts_kwh.es_id', $this->energySupplier->id)
                    ->whereYear('revenue_parts_kwh.date_end', $dateBeginYear)
                    ->sum('revenue_distribution_parts_kwh.delivered_kwh');
//                $partsEndOfYear = $distribution->distributionPartsKwh()
//                    ->join('revenue_parts_kwh', 'revenue_distribution_parts_kwh.parts_id', '=', 'revenue_parts_kwh.id')
//                    ->where('revenue_distribution_parts_kwh.es_id', $this->energySupplier->id)
//                    ->whereYear('revenue_parts_kwh.date_end', $dateBeginYear)
//                    ->orderBy('revenue_parts_kwh.date_end', 'desc')
//                    ->first();
//                $participationsQuantityEndOfYear = $partsEndOfYear ? $partsEndOfYear->participations_quantity : 0;

                $esNumbersNextYear = implode(',', $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_begin', '>', $dateBeginYear);
                    })
                    ->where(function ($query) {
                        $query->whereNotNull('energy_supplier_number')
                            ->orWhere('energy_supplier_number', '!=', '');
                    })
                    ->pluck('energy_supplier_number')->toArray());
                $deliveredTotalEsNextYear = $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_begin', '>', $dateBeginYear);
                    })
                    ->sum('delivered_kwh');

                if(Carbon::parse($this->revenuesKwh->date_begin)->year == Carbon::parse($this->revenuesKwh->date_end)->year) {
                    $rowData = [];
                    $rowData[] = $this->revenuesKwh->project && !empty($this->revenuesKwh->project->ean)
                        ? 'EAN: ' . $this->revenuesKwh->project->ean : '';
                    $rowData[] = $this->revenuesKwh->project && !empty($this->revenuesKwh->project->ean_manager)
                        ? 'EAN: ' . $this->revenuesKwh->project->ean_manager : '';
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_begin);
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_end);
                    $rowData[] = $distribution->contact->full_name;
                    $rowData[] = $distribution->tax_referral;
                    $rowData[] = $distribution->postal_code;
                    $rowData[] = $eanElectricity;
                    $rowData[] = $esNumbersEndOfYear;
                    $rowData[] = round($deliveredTotalEsEndOfYear, 2);
                    $completeData[] = $rowData;
                }else{
                    $rowData = [];
                    $rowData[] = $this->revenuesKwh->project && !empty($this->revenuesKwh->project->ean)
                        ? 'EAN: ' . $this->revenuesKwh->project->ean : '';
                    $rowData[] = $this->revenuesKwh->project && !empty($this->revenuesKwh->project->ean_manager)
                        ? 'EAN: ' . $this->revenuesKwh->project->ean_manager : '';
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_begin);
                    $rowData[] = $this->formatDate(Carbon::parse($this->revenuesKwh->date_begin)->endOfYear());
                    $rowData[] = $distribution->contact->full_name;
                    $rowData[] = $distribution->tax_referral;
                    $rowData[] = $distribution->postal_code;
                    $rowData[] = $eanElectricity;
                    $rowData[] = $esNumbersEndOfYear;
                    $rowData[] = round($deliveredTotalEsEndOfYear, 2);
                    $completeData[] = $rowData;

                    $rowData = [];
                    $rowData[] = $this->revenuesKwh->project && !empty($this->revenuesKwh->project->ean)
                        ? 'EAN: ' . $this->revenuesKwh->project->ean : '';
                    $rowData[] = $this->revenuesKwh->project && !empty($this->revenuesKwh->project->ean_manager)
                        ? 'EAN: ' . $this->revenuesKwh->project->ean_manager : '';
                    $rowData[] = $this->formatDate(Carbon::parse($this->revenuesKwh->date_end)->startOfYear());
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_end);
                    $rowData[] = $distribution->contact->full_name;
                    $rowData[] = $distribution->tax_referral;
                    $rowData[] = $distribution->postal_code;
                    $rowData[] = $eanElectricity;
                    $rowData[] = $esNumbersNextYear;
                    $rowData[] = round($deliveredTotalEsNextYear, 2);
                    $completeData[] = $rowData;
                }
            }
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Load all data in worksheet
        $sheet->fromArray($completeData);

        for ($col = 'A'; $col !== 'K'; $col++) {
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

    private function getVattenfallExcel()
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
                'revenuesKwh',
                'distributionPartsKwh',
                'contact.primaryAddress',
                'participation.address',
            ]);

            foreach ($chunk as $distribution) {

                if($distribution->participation && $distribution->participation->address){
                    $participationAddress = $distribution->participation->address;
                }else{
                    $participationAddress = $distribution->contact->primaryAddress;
                }
                $eanElectricity = $distribution->ean_electricity && !empty($distribution->ean_electricity)
                    ? 'EAN: ' . $distribution->ean_electricity
                    : ( $participationAddress && !empty($participationAddress->ean_electricity)
                        ? 'EAN: ' . $participationAddress->ean_electricity : '' );
                $dateBeginYear = Carbon::parse($this->revenuesKwh->date_begin)->year;

//                $partsUpToEndOfYearForTotal = $distribution->revenuesKwh->distributionPartsKwh()
//                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
//                        $query->whereYear('date_end', $dateBeginYear);
//                    });
//                $totalEndOfYear = $partsUpToEndOfYearForTotal->get()->sum('delivered_kwh');
//                $partsNextYearForTotal = $distribution->revenuesKwh->distributionPartsKwh()
//                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
//                        $query->whereYear('date_begin', '>', $dateBeginYear);
//                    });
//                $totalNextYear = $partsNextYearForTotal->get()->sum('delivered_kwh');

                $esNumbersEndOfYear = implode(',', $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_end', $dateBeginYear);
                    })
                    ->where(function ($query) {
                        $query->whereNotNull('energy_supplier_number')
                            ->orWhere('energy_supplier_number', '!=', '');
                    })
                    ->pluck('energy_supplier_number')->toArray());
                $esNamesEndOfYear = implode(',', $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_end', $dateBeginYear);
                    })
                    ->where(function ($query) {
                        $query->whereNotNull('energy_supplier_name')
                            ->orWhere('energy_supplier_name', '!=', '');
                    })
                    ->pluck('energy_supplier_name')->toArray());
                $deliveredTotalEsEndOfYear = $distribution->distributionPartsKwh()
                    ->join('revenue_parts_kwh', 'revenue_distribution_parts_kwh.parts_id', '=', 'revenue_parts_kwh.id')
                    ->where('revenue_distribution_parts_kwh.es_id', $this->energySupplier->id)
                    ->whereYear('revenue_parts_kwh.date_end', $dateBeginYear)
                    ->sum('revenue_distribution_parts_kwh.delivered_kwh');
                $partsEndOfYear = $distribution->distributionPartsKwh()
                    ->join('revenue_parts_kwh', 'revenue_distribution_parts_kwh.parts_id', '=', 'revenue_parts_kwh.id')
                    ->where('revenue_distribution_parts_kwh.es_id', $this->energySupplier->id)
                    ->whereYear('revenue_parts_kwh.date_end', $dateBeginYear)
                    ->orderBy('revenue_parts_kwh.date_end', 'desc')
                    ->first();
                $participationsQuantityEndOfYear = $partsEndOfYear ? $partsEndOfYear->participations_quantity : 0;

                $esNumbersNextYear = implode(',', $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_begin', '>', $dateBeginYear);
                    })
                    ->where(function ($query) {
                        $query->whereNotNull('energy_supplier_number')
                            ->orWhere('energy_supplier_number', '!=', '');
                    })
                    ->pluck('energy_supplier_number')->toArray());
                $esNamesNextYear = implode(',', $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_begin', '>', $dateBeginYear);
                    })
                    ->where(function ($query) {
                        $query->whereNotNull('energy_supplier_name')
                            ->orWhere('energy_supplier_name', '!=', '');
                    })
                    ->pluck('energy_supplier_name')->toArray());
                $deliveredTotalEsNextYear = $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_begin', '>', $dateBeginYear);
                    })
                    ->sum('delivered_kwh');

                if(Carbon::parse($this->revenuesKwh->date_begin)->year == Carbon::parse($this->revenuesKwh->date_end)->year) {
                    $rowData = [];
                    $rowData[] = $distribution->contact->number;
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->title ? $distribution->contact->person->title->name
                        : '' : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->first_name : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name_prefix : '';
                    if($distribution->contact->type_id == 'organisation'){
                        $rowData[] = $distribution->contact->full_name;
                    }else{
                        $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name : '';
                    }
                    $rowData[] = $distribution->address;
                    $rowData[] = $distribution->postal_code;
                    $rowData[] = $distribution->city;
                    $rowData[] = $esNamesEndOfYear;
                    $rowData[] = $esNumbersEndOfYear;
                    $rowData[] = $distribution->contact->iban;
                    $rowData[] = $eanElectricity;
                    $rowData[] = $participationsQuantityEndOfYear;
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_begin);
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_end);
                    $rowData[] = round($deliveredTotalEsEndOfYear, 2);
                    $rowData[] = '';
                    $completeData[] = $rowData;
                }else {
                    $rowData = [];
                    $rowData[] = $distribution->contact->number;
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->title ? $distribution->contact->person->title->name
                        : '' : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->first_name : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name_prefix : '';
                    if($distribution->contact->type_id == 'organisation'){
                        $rowData[] = $distribution->contact->full_name;
                    }else{
                        $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name : '';
                    }
                    $rowData[] = $distribution->address;
                    $rowData[] = $distribution->postal_code;
                    $rowData[] = $distribution->city;
                    $rowData[] = $esNamesEndOfYear;
                    $rowData[] = $esNumbersEndOfYear;
                    $rowData[] = $distribution->contact->iban;
                    $rowData[] = $eanElectricity;
                    $rowData[] = $participationsQuantityEndOfYear;
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_begin);
                    $rowData[] = $this->formatDate(Carbon::parse($this->revenuesKwh->date_begin)->endOfYear());
                    $rowData[] = round($deliveredTotalEsEndOfYear, 2);
                    $rowData[] = '';
                    $completeData[] = $rowData;

                    $rowData = [];
                    $rowData[] = $distribution->contact->number;
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->title ? $distribution->contact->person->title->name
                        : '' : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->first_name : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name_prefix : '';
                    if($distribution->contact->type_id == 'organisation'){
                        $rowData[] = $distribution->contact->full_name;
                    }else{
                        $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name : '';
                    }
                    $rowData[] = $distribution->address;
                    $rowData[] = $distribution->postal_code;
                    $rowData[] = $distribution->city;
                    $rowData[] = $esNamesNextYear;
                    $rowData[] = $esNumbersNextYear;
                    $rowData[] = $distribution->contact->iban;
                    $rowData[] = $eanElectricity;
                    $rowData[] = $distribution->participations_quantity;
                    $rowData[] = $this->formatDate(Carbon::parse($this->revenuesKwh->date_end)->startOfYear());
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_end);
                    $rowData[] = round($deliveredTotalEsNextYear, 2);
                    $rowData[] = '';
                    $completeData[] = $rowData;
                }
            }
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Load all data in worksheet
        $sheet->fromArray($completeData);

        for ($col = 'A'; $col !== 'R'; $col++) {
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

    private function getEnergieVanOnsExcel()
    {
        $this->counter = 0;

        $completeData = [];

        $headerData = [];
        $headerData[] = 'Ref. nr. cooperatie';
        $headerData[] = 'Aanspreektitel';
        $headerData[] = 'Voornaam';
        $headerData[] = 'Tussenvoegsel';
        $headerData[] = 'Achternaam';
        $headerData[] = 'Leverancier';
        $headerData[] = 'Klant nr.';
        $headerData[] = 'Postcode';
        $headerData[] = 'Huis nr. ( + toevoeging)';
        $headerData[] = 'Plaats';
        $headerData[] = 'Ean';
        $headerData[] = 'Productie installatie';
        $headerData[] = 'Aantal certificaten';
        $headerData[] = 'Toegekende productie (in kWh) <<jaartal>>';
        $headerData[] = 'Toegekende productie (in kWh) <<jaartal>>';

        $completeData[] = $headerData;

        foreach ($this->distributions->chunk(500) as $chunk) {
            $chunk->load([
                'contact.person',
                'contact.primaryEmailAddress',
                'contact.primaryphoneNumber',
                'revenuesKwh',
                'distributionPartsKwh',
                'contact.primaryAddress',
                'participation.address',
            ]);

            foreach ($chunk as $distribution) {

                if($distribution->participation && $distribution->participation->address){
                    $participationAddress = $distribution->participation->address;
                }else{
                    $participationAddress = $distribution->contact->primaryAddress;
                }
                $eanElectricity = $distribution->ean_electricity && !empty($distribution->ean_electricity)
                    ? 'EAN: ' . $distribution->ean_electricity
                    : ( $participationAddress && !empty($participationAddress->ean_electricity)
                        ? 'EAN: ' . $participationAddress->ean_electricity : '' );
                $dateBeginYear = Carbon::parse($this->revenuesKwh->date_begin)->year;

//                $partsUpToEndOfYearForTotal = $distribution->revenuesKwh->distributionPartsKwh()
//                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
//                        $query->whereYear('date_end', $dateBeginYear);
//                    });
//                $totalEndOfYear = $partsUpToEndOfYearForTotal->get()->sum('delivered_kwh');
//                $partsNextYearForTotal = $distribution->revenuesKwh->distributionPartsKwh()
//                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
//                        $query->whereYear('date_begin', '>', $dateBeginYear);
//                    });
//                $totalNextYear = $partsNextYearForTotal->get()->sum('delivered_kwh');

                $esNumbersEndOfYear = implode(',', $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_end', $dateBeginYear);
                    })
                    ->where(function ($query) {
                        $query->whereNotNull('energy_supplier_number')
                            ->orWhere('energy_supplier_number', '!=', '');
                    })
                    ->pluck('energy_supplier_number')->toArray());
                $esNamesEndOfYear = implode(',', $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_end', $dateBeginYear);
                    })
                    ->where(function ($query) {
                        $query->whereNotNull('energy_supplier_name')
                            ->orWhere('energy_supplier_name', '!=', '');
                    })
                    ->pluck('energy_supplier_name')->toArray());
                $deliveredTotalEsEndOfYear = $distribution->distributionPartsKwh()
                    ->join('revenue_parts_kwh', 'revenue_distribution_parts_kwh.parts_id', '=', 'revenue_parts_kwh.id')
                    ->where('revenue_distribution_parts_kwh.es_id', $this->energySupplier->id)
                    ->whereYear('revenue_parts_kwh.date_end', $dateBeginYear)
                    ->sum('revenue_distribution_parts_kwh.delivered_kwh');
                $partsEndOfYear = $distribution->distributionPartsKwh()
                    ->join('revenue_parts_kwh', 'revenue_distribution_parts_kwh.parts_id', '=', 'revenue_parts_kwh.id')
                    ->where('revenue_distribution_parts_kwh.es_id', $this->energySupplier->id)
                    ->whereYear('revenue_parts_kwh.date_end', $dateBeginYear)
                    ->orderBy('revenue_parts_kwh.date_end', 'desc')
                    ->first();
                $participationsQuantityEndOfYear = $partsEndOfYear ? $partsEndOfYear->participations_quantity : 0;

                $esNumbersNextYear = implode(',', $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_begin', '>', $dateBeginYear);
                    })
                    ->where(function ($query) {
                        $query->whereNotNull('energy_supplier_number')
                            ->orWhere('energy_supplier_number', '!=', '');
                    })
                    ->pluck('energy_supplier_number')->toArray());
                $esNamesNextYear = implode(',', $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_begin', '>', $dateBeginYear);
                    })
                    ->where(function ($query) {
                        $query->whereNotNull('energy_supplier_name')
                            ->orWhere('energy_supplier_name', '!=', '');
                    })
                    ->pluck('energy_supplier_name')->toArray());
                $deliveredTotalEsNextYear = $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_begin', '>', $dateBeginYear);
                    })
                    ->sum('delivered_kwh');

                if(Carbon::parse($this->revenuesKwh->date_begin)->year == Carbon::parse($this->revenuesKwh->date_end)->year) {
                    $rowData = [];
                    $rowData[] = $distribution->contact->number;
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->title ? $distribution->contact->person->title->name
                        : '' : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->first_name : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name_prefix : '';
                    if($distribution->contact->type_id == 'organisation'){
                        $rowData[] = $distribution->contact->full_name;
                    }else{
                        $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name : '';
                    }
                    $rowData[] = $esNamesEndOfYear;
                    $rowData[] = $esNumbersEndOfYear;
                    $rowData[] = $distribution->postal_code;
                    $rowData[] = $distribution->street_number_addition ? $distribution->street_number . '-' . $distribution->street_number_addition : $distribution->street_number;
                    $rowData[] = $distribution->city;
                    $rowData[] = $eanElectricity;
                    $rowData[] = $this->revenuesKwh->project->name;
                    $rowData[] = $participationsQuantityEndOfYear;
                    $rowData[] = round($deliveredTotalEsEndOfYear, 2);
                    $rowData[] = round($deliveredTotalEsEndOfYear, 2);
                    $completeData[] = $rowData;
                }else {
                    $rowData = [];
                    $rowData[] = $distribution->contact->number;
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->title ? $distribution->contact->person->title->name
                        : '' : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->first_name : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name_prefix : '';
                    if($distribution->contact->type_id == 'organisation'){
                        $rowData[] = $distribution->contact->full_name;
                    }else{
                        $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name : '';
                    }
                    $rowData[] = $esNamesEndOfYear;
                    $rowData[] = $esNumbersEndOfYear;
                    $rowData[] = $distribution->postal_code;
                    $rowData[] = $distribution->street_number_addition ? $distribution->street_number . '-' . $distribution->street_number_addition : $distribution->street_number;
                    $rowData[] = $distribution->city;
                    $rowData[] = $eanElectricity;
                    $rowData[] = $this->revenuesKwh->project->name;
                    $rowData[] = $participationsQuantityEndOfYear;
                    $rowData[] = round($deliveredTotalEsEndOfYear, 2);
                    $rowData[] = round($deliveredTotalEsEndOfYear, 2);
                    $completeData[] = $rowData;

                    $rowData = [];
                    $rowData[] = $distribution->contact->number;
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->title ? $distribution->contact->person->title->name
                        : '' : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->first_name : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name_prefix : '';
                    if($distribution->contact->type_id == 'organisation'){
                        $rowData[] = $distribution->contact->full_name;
                    }else{
                        $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name : '';
                    }
                    $rowData[] = $esNamesNextYear;
                    $rowData[] = $esNumbersNextYear;
                    $rowData[] = $distribution->postal_code;
                    $rowData[] = $distribution->street_number_addition ? $distribution->street_number . '-' . $distribution->street_number_addition : $distribution->street_number;
                    $rowData[] = $distribution->city;
                    $rowData[] = $eanElectricity;
                    $rowData[] = $this->revenuesKwh->project->name;
                    $rowData[] = $distribution->participations_quantity;
                    $rowData[] = round($deliveredTotalEsNextYear, 2);
                    $rowData[] = round($deliveredTotalEsNextYear, 2);
                    $completeData[] = $rowData;
                }
            }
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Load all data in worksheet
        $sheet->fromArray($completeData);

        for ($col = 'A'; $col !== 'R'; $col++) {
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

    private function getUniformExcel()
    {
        $completeData = [];

        $headerData = [];
        $headerData[] = 'Naam';
        $headerData[] = 'Voorletters';
        $headerData[] = 'Voornaam';
        $headerData[] = 'Tussenvoegsel';
        $headerData[] = 'Achternaam';
        $headerData[] = 'Straat';
        $headerData[] = 'Huisnummer';
        $headerData[] = 'Adres';
        $headerData[] = 'Postcode';
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
        $headerData[] = 'Klantnr';
        $headerData[] = 'Referentie';
        $headerData[] = 'Opwek';
        $headerData[] = 'Cooperatie';
        $headerData[] = 'Project';
        $headerData[] = 'Totale opwek';
        $headerData[] = 'Project ean';
        $headerData[] = 'Project ean net';
        $headerData[] = 'Garantie van oorsprong';
        $headerData[] = 'Aanwijzing belastingdienst';
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
                'revenuesKwh',
                'distributionPartsKwh',
                'contact.primaryAddress',
                'participation.address',
            ]);

            foreach ($chunk as $distribution) {

                if($distribution->participation && $distribution->participation->address){
                    $participationAddress = $distribution->participation->address;
                }else{
                    $participationAddress = $distribution->contact->primaryAddress;
                }
                $eanElectricity = $distribution->ean_electricity && !empty($distribution->ean_electricity)
                    ? 'EAN: ' . $distribution->ean_electricity
                    : ( $participationAddress && !empty($participationAddress->ean_electricity)
                        ? 'EAN: ' . $participationAddress->ean_electricity : '' );
                $dateBeginYear = Carbon::parse($this->revenuesKwh->date_begin)->year;

                $partsUpToEndOfYearForTotal = $distribution->revenuesKwh->distributionPartsKwh()
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_end', $dateBeginYear);
                    });
                $totalEndOfYear = $partsUpToEndOfYearForTotal->get()->sum('delivered_kwh');
                $partsNextYearForTotal = $distribution->revenuesKwh->distributionPartsKwh()
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_begin', '>', $dateBeginYear);
                    });
                $totalNextYear = $partsNextYearForTotal->get()->sum('delivered_kwh');

                $esNumbersEndOfYear = implode(',', $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_end', $dateBeginYear);
                    })
                    ->where(function ($query) {
                        $query->whereNotNull('energy_supplier_number')
                            ->orWhere('energy_supplier_number', '!=', '');
                    })
                    ->pluck('energy_supplier_number')->toArray());
                $deliveredTotalEsEndOfYear = $distribution->distributionPartsKwh()
                    ->join('revenue_parts_kwh', 'revenue_distribution_parts_kwh.parts_id', '=', 'revenue_parts_kwh.id')
                    ->where('revenue_distribution_parts_kwh.es_id', $this->energySupplier->id)
                    ->whereYear('revenue_parts_kwh.date_end', $dateBeginYear)
                    ->sum('revenue_distribution_parts_kwh.delivered_kwh');
                $partsEndOfYear = $distribution->distributionPartsKwh()
                    ->join('revenue_parts_kwh', 'revenue_distribution_parts_kwh.parts_id', '=', 'revenue_parts_kwh.id')
                    ->where('revenue_distribution_parts_kwh.es_id', $this->energySupplier->id)
                    ->whereYear('revenue_parts_kwh.date_end', $dateBeginYear)
                    ->orderBy('revenue_parts_kwh.date_end', 'desc')
                    ->first();
                $participationsQuantityEndOfYear = $partsEndOfYear ? $partsEndOfYear->participations_quantity : 0;

                $esNumbersNextYear = implode(',', $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_begin', '>', $dateBeginYear);
                    })
                    ->where(function ($query) {
                        $query->whereNotNull('energy_supplier_number')
                            ->orWhere('energy_supplier_number', '!=', '');
                    })
                    ->pluck('energy_supplier_number')->toArray());
                $deliveredTotalEsNextYear = $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_begin', '>', $dateBeginYear);
                    })
                    ->sum('delivered_kwh');

                if(Carbon::parse($this->revenuesKwh->date_begin)->year == Carbon::parse($this->revenuesKwh->date_end)->year) {
                    $rowData = [];
                    $rowData[] = $distribution->contact->full_name;
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->initials : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->first_name : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name_prefix : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name : '';
                    $rowData[] = $distribution->street;
                    $rowData[] = $distribution->street_number_addition ? $distribution->street_number . '-' . $distribution->street_number_addition : $distribution->street_number;
                    $rowData[] = $distribution->address;
                    $rowData[] = $distribution->postal_code;
                    if($distribution->country != '' && $distribution->country != 'Nederland')
                    {
                        $rowData[] = '';
                        $rowData[] = '';
                    }else {
                        $rowData[] = $distribution->postal_code_numbers = strlen($distribution->postal_code) > 3
                            ? substr($distribution->postal_code, 0, 4) : '';
                        $rowData[] = $distribution->postal_code_letters
                            = strlen($distribution->postal_code) == 6
                            ? substr($distribution->postal_code, 4)
                            : (strlen($distribution->postal_code) == 7
                                ? substr($distribution->postal_code, 5)
                                : '');
                    }
                    $rowData[] = $distribution->city;
                    $rowData[] = $eanElectricity;
                    $rowData[] = $distribution->contact->primaryEmailAddress
                        ? $distribution->contact->primaryEmailAddress->email : '';
                    $rowData[] = $distribution->contact->primaryphoneNumber
                        ? $distribution->contact->primaryphoneNumber->number : '';
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_begin);
                    $rowData[] = '';
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_end);
                    $rowData[] = $participationsQuantityEndOfYear;
                    $rowData[] = $esNumbersEndOfYear;
                    $rowData[] = $distribution->contact->number;
                    $rowData[] = round($deliveredTotalEsEndOfYear, 2);
                    $rowData[] = \Config::get('app.name');
                    $rowData[] = $this->revenuesKwh->project->name;
                    $rowData[] = round($totalEndOfYear, 2);
                    $rowData[] = $this->revenuesKwh->project && !empty($this->revenuesKwh->project->ean)
                        ? 'EAN: ' . $this->revenuesKwh->project->ean : '';
                    $rowData[] = $this->revenuesKwh->project && !empty($this->revenuesKwh->project->ean_manager)
                        ? 'EAN: ' . $this->revenuesKwh->project->ean_manager : '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $completeData[] = $rowData;
                }else {
                    $kwhEndCalendarYear = ($this->revenuesKwh->kwh_end_calendar_year_high ? $this->revenuesKwh->kwh_end_calendar_year_high : 0) +
                        ($this->revenuesKwh->kwh_end_calendar_year_low ? $this->revenuesKwh->kwh_end_calendar_year_low : 0);
                    $totalProductionEndCalendarYear = $kwhEndCalendarYear - ($this->revenuesKwh->kwh_start ? $this->revenuesKwh->kwh_start : 0);
                    $totalProductionNextYear = ($this->revenuesKwh->kwh_end ? $this->revenuesKwh->kwh_end : 0) - $kwhEndCalendarYear;

                    $rowData = [];
                    $rowData[] = $distribution->contact->full_name;
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->initials : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->first_name : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name_prefix : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name : '';
                    $rowData[] = $distribution->street;
                    $rowData[] = $distribution->street_number_addition ? $distribution->street_number . '-' . $distribution->street_number_addition : $distribution->street_number;
                    $rowData[] = $distribution->address;
                    $rowData[] = $distribution->postal_code;
                    if($distribution->country != '' && $distribution->country != 'Nederland')
                    {
                        $rowData[] = '';
                        $rowData[] = '';
                    }else {
                        $rowData[] = $distribution->postal_code_numbers = strlen($distribution->postal_code) > 3
                            ? substr($distribution->postal_code, 0, 4) : '';
                        $rowData[] = $distribution->postal_code_letters
                            = strlen($distribution->postal_code) == 6
                            ? substr($distribution->postal_code, 4)
                            : (strlen($distribution->postal_code) == 7
                                ? substr($distribution->postal_code, 5)
                                : '');
                    }
                    $rowData[] = $distribution->city;
                    $rowData[] = $eanElectricity;
                    $rowData[] = $distribution->contact->primaryEmailAddress
                        ? $distribution->contact->primaryEmailAddress->email : '';
                    $rowData[] = $distribution->contact->primaryphoneNumber
                        ? $distribution->contact->primaryphoneNumber->number : '';
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_begin);
                    $rowData[] = '';
                    $rowData[] = $this->formatDate(Carbon::parse($this->revenuesKwh->date_begin)->endOfYear());
                    $rowData[] = $participationsQuantityEndOfYear;
                    $rowData[] = $esNumbersEndOfYear;
                    $rowData[] = $distribution->contact->number;
                    $rowData[] = round($deliveredTotalEsEndOfYear, 2);
                    $rowData[] = \Config::get('app.name');
                    $rowData[] = $this->revenuesKwh->project->name;
                    $rowData[] = round($totalEndOfYear, 2);
                    $rowData[] = $this->revenuesKwh->project && !empty($this->revenuesKwh->project->ean)
                        ? 'EAN: ' . $this->revenuesKwh->project->ean : '';
                    $rowData[] = $this->revenuesKwh->project && !empty($this->revenuesKwh->project->ean_manager)
                        ? 'EAN: ' . $this->revenuesKwh->project->ean_manager : '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $completeData[] = $rowData;

                    $rowData = [];
                    $rowData[] = $distribution->contact->full_name;
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->initials : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->first_name : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name_prefix : '';
                    $rowData[] = $distribution->contact->person ? $distribution->contact->person->last_name : '';
                    $rowData[] = $distribution->street;
                    $rowData[] = $distribution->street_number_addition ? $distribution->street_number . '-' . $distribution->street_number_addition : $distribution->street_number;
                    $rowData[] = $distribution->address;
                    $rowData[] = $distribution->postal_code;
                    if($distribution->country != '' && $distribution->country != 'Nederland')
                    {
                        $rowData[] = '';
                        $rowData[] = '';
                    }else {
                        $rowData[] = $distribution->postal_code_numbers = strlen($distribution->postal_code) > 3
                            ? substr($distribution->postal_code, 0, 4) : '';
                        $rowData[] = $distribution->postal_code_letters
                            = strlen($distribution->postal_code) == 6
                            ? substr($distribution->postal_code, 4)
                            : (strlen($distribution->postal_code) == 7
                                ? substr($distribution->postal_code, 5)
                                : '');
                    }
                    $rowData[] = $distribution->city;
                    $rowData[] = $eanElectricity;
                    $rowData[] = $distribution->contact->primaryEmailAddress
                        ? $distribution->contact->primaryEmailAddress->email : '';
                    $rowData[] = $distribution->contact->primaryphoneNumber
                        ? $distribution->contact->primaryphoneNumber->number : '';
                    $rowData[] = $this->formatDate(Carbon::parse($this->revenuesKwh->date_end)->startOfYear());
                    $rowData[] = '';
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_end);
                    $rowData[] = $distribution->participations_quantity;
                    $rowData[] = $esNumbersNextYear;
                    $rowData[] = $distribution->contact->number;
                    $rowData[] = round($deliveredTotalEsNextYear, 2);
                    $rowData[] = \Config::get('app.name');
                    $rowData[] = $this->revenuesKwh->project->name;
                    $rowData[] = round($totalNextYear, 2);
                    $rowData[] = $this->revenuesKwh->project && !empty($this->revenuesKwh->project->ean)
                        ? 'EAN: ' . $this->revenuesKwh->project->ean : '';
                    $rowData[] = $this->revenuesKwh->project && !empty($this->revenuesKwh->project->ean_manager)
                        ? 'EAN: ' . $this->revenuesKwh->project->ean_manager : '';
                    $rowData[] = '';
                    $rowData[] = '';
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
//        $textColumns = [
//            'M', 'Z', 'AA'
//        ];
//        foreach ($textColumns as $textColumnLetter) {
//            foreach ($completeData as $key => $row) {
//                if ($key == 0) continue; // Header overslaan
//                $cellCode = $textColumnLetter . ($key + 1);
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
//            }
//        }
        // EINDE FIX EAN codes

        // Load all data in worksheet
        $sheet->fromArray($completeData);

        for ($col = 'A'; $col !== 'AK'; $col++) {
            $spreadsheet->getActiveSheet()
                ->getColumnDimension($col)
                ->setAutoSize(true);
        }

        $sheet->getStyle('A1:AJ1')
            ->applyFromArray([
                'font' => [
                    'bold' => true,
                ],

            ]);

        return $spreadsheet;
    }

    private function getOmExcel()
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
        $headerData[] = 'EanAdres installatie';

        $completeData[] = $headerData;

        foreach ($this->distributions->chunk(500) as $chunk) {
            $chunk->load([
                'contact.person',
                'contact.primaryEmailAddress',
                'contact.primaryphoneNumber',
                'revenuesKwh',
                'distributionPartsKwh',
                'contact.primaryAddress',
                'participation.address',
            ]);

            foreach ($chunk as $distribution) {

                if($distribution->participation && $distribution->participation->address){
                    $participationAddress = $distribution->participation->address;
                }else{
                    $participationAddress = $distribution->contact->primaryAddress;
                }
                $eanElectricity = $distribution->ean_electricity && !empty($distribution->ean_electricity)
                    ? 'EAN: ' . $distribution->ean_electricity
                    : ( $participationAddress && !empty($participationAddress->ean_electricity)
                        ? 'EAN: ' . $participationAddress->ean_electricity : '' );
                $dateBeginYear = Carbon::parse($this->revenuesKwh->date_begin)->year;

                $partsUpToEndOfYearForTotal = $distribution->revenuesKwh->distributionPartsKwh()
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_end', $dateBeginYear);
                    });
                $totalEndOfYear = $partsUpToEndOfYearForTotal->get()->sum('delivered_kwh');
                $partsNextYearForTotal = $distribution->revenuesKwh->distributionPartsKwh()
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_begin', '>', $dateBeginYear);
                    });
                $totalNextYear = $partsNextYearForTotal->get()->sum('delivered_kwh');

                $esNumbersEndOfYear = implode(',', $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_end', $dateBeginYear);
                    })
                    ->where(function ($query) {
                        $query->whereNotNull('energy_supplier_number')
                            ->orWhere('energy_supplier_number', '!=', '');
                    })
                    ->pluck('energy_supplier_number')->toArray());
                $deliveredTotalEsEndOfYear = $distribution->distributionPartsKwh()
                    ->join('revenue_parts_kwh', 'revenue_distribution_parts_kwh.parts_id', '=', 'revenue_parts_kwh.id')
                    ->where('revenue_distribution_parts_kwh.es_id', $this->energySupplier->id)
                    ->whereYear('revenue_parts_kwh.date_end', $dateBeginYear)
                    ->sum('revenue_distribution_parts_kwh.delivered_kwh');
                $partsEndOfYear = $distribution->distributionPartsKwh()
                    ->join('revenue_parts_kwh', 'revenue_distribution_parts_kwh.parts_id', '=', 'revenue_parts_kwh.id')
                    ->where('revenue_distribution_parts_kwh.es_id', $this->energySupplier->id)
                    ->whereYear('revenue_parts_kwh.date_end', $dateBeginYear)
                    ->orderBy('revenue_parts_kwh.date_end', 'desc')
                    ->first();
                $participationsQuantityEndOfYear = $partsEndOfYear ? $partsEndOfYear->participations_quantity : 0;

                $esNumbersNextYear = implode(',', $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_begin', '>', $dateBeginYear);
                    })
                    ->where(function ($query) {
                        $query->whereNotNull('energy_supplier_number')
                            ->orWhere('energy_supplier_number', '!=', '');
                    })
                    ->pluck('energy_supplier_number')->toArray());
                $deliveredTotalEsNextYear = $distribution->distributionPartsKwh()->where('es_id', $this->energySupplier->id)
                    ->whereHas('partsKwh', function ($query) use($dateBeginYear) {
                        $query->whereYear('date_begin', '>', $dateBeginYear);
                    })
                    ->sum('delivered_kwh');

                if(Carbon::parse($this->revenuesKwh->date_begin)->year == Carbon::parse($this->revenuesKwh->date_end)->year) {
                    $rowData = [];
                    ++$this->counter;
                    $rowData[] = $this->counter;
                    $rowData[] = $distribution->contact->full_name;
                    $rowData[] = str_replace(' ', '', $distribution->postal_code);
                    $rowData[] = $esNumbersEndOfYear;
                    $rowData[] = $eanElectricity;
                    $rowData[] = $this->formatDate(new Carbon('now'));
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_begin);
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_end);
                    $rowData[] = $participationsQuantityEndOfYear;
                    $rowData[] = '';
                    $rowData[] = round($deliveredTotalEsEndOfYear, 2);
                    $rowData[] = $this->fileName;
                    $rowData[] = $this->revenuesKwh->project && !empty($this->revenuesKwh->project->ean)
                        ? 'EAN: ' . $this->revenuesKwh->project->ean : '';
                    $completeData[] = $rowData;
                } else {
                    $rowData = [];
                    ++$this->counter;
                    $rowData[] = $this->counter;
                    $rowData[] = $distribution->contact->full_name;
                    $rowData[] = str_replace(' ', '', $distribution->postal_code);
                    $rowData[] = $esNumbersEndOfYear;
                    $rowData[] = $eanElectricity;
                    $rowData[] = $this->formatDate(new Carbon('now'));
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_begin);
                    $rowData[] = $this->formatDate(Carbon::parse($this->revenuesKwh->date_begin)->endOfYear());
                    $rowData[] = $participationsQuantityEndOfYear;
                    $rowData[] = '';
                    $rowData[] = round($deliveredTotalEsEndOfYear, 2);
                    $rowData[] = $this->fileName;
                    $rowData[] = $this->revenuesKwh->project && !empty($this->revenuesKwh->project->ean)
                        ? 'EAN: ' . $this->revenuesKwh->project->ean : '';
                    $completeData[] = $rowData;

                    $rowData = [];
                    ++$this->counter;
                    $rowData[] = $this->counter;
                    $rowData[] = $distribution->contact->full_name;
                    $rowData[] = str_replace(' ', '', $distribution->postal_code);
                    $rowData[] = $esNumbersNextYear;
                    $rowData[] = $eanElectricity;
                    $rowData[] = $this->formatDate(new Carbon('now'));
                    $rowData[] = $this->formatDate(Carbon::parse($this->revenuesKwh->date_end)->startOfYear());
                    $rowData[] = $this->formatDate($this->revenuesKwh->date_end);
                    $rowData[] = $distribution->participations_quantity;
                    $rowData[] = '';
                    $rowData[] = round($deliveredTotalEsNextYear, 2);
                    $rowData[] = $this->fileName;
                    $rowData[] = $this->revenuesKwh->project && !empty($this->revenuesKwh->project->ean)
                        ? 'EAN: ' . $this->revenuesKwh->project->ean : '';
                    $completeData[] = $rowData;
                }
            }
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Load all data in worksheet
        $sheet->fromArray($completeData);

        for ($col = 'A'; $col !== 'M'; $col++) {
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