<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\CSV;

use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\ProductionProject\ProductionProjectRevenue;
use Carbon\Carbon;
use League\Csv\Reader;

class EnergySupplierCSVHelper
{
    private $csvExporter;
    private $energySupplier;
    private $productionProjectRevenue;
    private $distributions;

    public function __construct(
        EnergySupplier $energySupplier,
        ProductionProjectRevenue $productionProjectRevenue,
        $templateId
    ) {
        $this->csvExporter = new Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->energySupplier = $energySupplier;
        $this->productionProjectRevenue = $productionProjectRevenue;
        $this->templateId = $templateId;
        $this->distributions = $productionProjectRevenue->distribution()->where('es_id', $energySupplier->id)->get();
    }

    public function getCSV()
    {

        if($this->distributions->count() === 0){
            abort(403, 'Geen verdeling voor deze energiemaatschappij');
        }
        $this->csvExporter->beforeEach(function ($distribution) {
            $distribution->period_start = $this->formatDate($distribution->revenue->date_begin);
            $distribution->period_end = $this->formatDate($distribution->revenue->date_end);
        });

        switch ($this->templateId) {
            case '1':
                $csv = $this->getEnecoCsv();
                break;
            case '2':
                $csv = $this->getGCCsv();
                break;
            case '3':
                $csv = $this->getOxxioCsv();
                break;
            default:
                break;
        }

        return $csv;
    }

    private function getEnecoCsv()
    {
        $csv = '';
        $headers = true;

        foreach ($this->distributions->chunk(500) as $chunk) {
            $chunk->load([
                'contact.person',
                'contact.person',
                'contact.primaryEmailAddress',
                'contact.primaryphoneNumber',
                'revenue',
                'contact.primaryContactEnergySupplier',
            ]);

            $csv = $this->csvExporter->build($chunk, [
                'contact.full_name' => 'Naam',
                'contact.person.initials' => 'Voorletters',
                'contact.person.last_name_prefix' => 'Tussenvoegsel',
                'address' => 'Adres',
                'postal_code' => 'Postcode',
                'city' => 'Woonplaats',
                'contact.primaryEmailAddress.email' => 'Emailadres',
                'contact.primaryphoneNumber.number' => 'Telefoonnummer',
                'period_start' => 'Startdatum',
                'period_end' => 'Einddatum',
                'participations_amount' => 'Aantal kavels',
                'contact.primaryContactEnergySupplier.es_number' => 'Eneco klantnr',
                'delivered_total' => 'Opwek',
            ], $headers);
            $headers = false;
        }
        return $csv->getCsv();
    }

    private function getGCCsv()
    {
        $csv = '';
        $headers = true;

        foreach ($this->distributions->chunk(500) as $chunk) {
            $chunk->load([
                'revenue',
                'contact.primaryContactEnergySupplier',
            ]);

            $this->csvExporter->beforeEach(function ($distribution) {
                // Now notes field will have this value
                $distribution->ean = $this->productionProjectRevenue->productionProject->ean;
            });

            $csv = $this->csvExporter->build($chunk, [
                'ean' => 'EanCode',
                'postal_code' => 'Postcode',
                'period_start' => 'BeginDatum',
                'period_end' => 'EindDatum',
                'delivered_total' => 'Productie',
                'contact.primaryContactEnergySupplier.es_number' => 'KlantNummer',
                'contact.full_name' => 'KlantNaam',
            ], $headers);
            $headers = false;
        }
        return $csv->getCsv();
    }

    private function getOxxioCsv()
    {
        $csv = '';
        $headers = true;

        foreach ($this->distributions->chunk(500) as $chunk) {
            $chunk->load([
                'revenue',
                'contact.primaryContactEnergySupplier',
            ]);

            //1-n relations

            $this->csvExporter->beforeEach(function ($distribution) {
                // Now notes field will have this value
                $distribution->ean = $this->productionProjectRevenue->productionProject->ean;
                $distribution->ean_manager = $this->productionProjectRevenue->productionProject->ean_manager;
                $distribution->tax_referral = $this->productionProjectRevenue->productionProject->tax_referral;
            });

            $csv = $this->csvExporter->build($chunk, [
                'ean' => 'project ean',
                'ean_manager' => 'project ean net',
                'period_start' => 'startdatum',
                'period_end' => 'einddatum',
                'contact.full_name' => 'participant',
                'tax_referral' => 'referentie',
                'postal_code' => 'Postcode',
                'contact.primaryContactEnergySupplier.ean_electricity' => 'ean participant',
                'contact.primaryContactEnergySupplier.es_number' => 'klantnr',
                'delivered_total' => 'geleverd kwh',
            ], $headers);
            $headers = false;
        }
        return Reader::BOM_UTF8 . $csv->getCsv();
    }

    private function formatDate($date) {
        $formatDate = $date ? new Carbon($date) : false;
        return $formatDate ? $formatDate->format('d-m-Y') : '';
    }
}