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

class CSVHelper
{
    private $csvExporter;
    private $energySupplier;
    private $productionProjectRevenue;
    private $distributions;

    public function __construct(EnergySupplier $energySupplier, ProductionProjectRevenue $productionProjectRevenue, $templateId)
    {
        $this->csvExporter = new \Laracsv\Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->energySupplier = $energySupplier;
        $this->productionProjectRevenue = $productionProjectRevenue;
        $this->templateId = $templateId;
        $this->distributions = $productionProjectRevenue->distribution()->where('es_id', $energySupplier->id)->get();
    }

    public function getCSV(){

        $this->csvExporter->beforeEach(function ($distribution) {
            // Now notes field will have this value
            $distribution->date_begin = Carbon::parse($this->productionProjectRevenue->date_begin)->format('d/m/Y');
            $distribution->date_end = Carbon::parse($this->productionProjectRevenue->date_end)->format('d/m/Y');
        });

        switch ($this->templateId){
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

    private function getEnecoCsv(){
        $this->distributions->load([
            'contact.person',
            'contact.person.lastNamePrefix',
            'contact.primaryEmailAddress',
            'contact.primaryphoneNumber',
            'revenue',
            'contact.primaryContactEnergySupplier',
            ]);

        $csv = $this->csvExporter->build($this->distributions, [
            'contact.full_name' => 'Naam',
            'contact.person.initials' => 'Voorletters',
            'contact.person.lastNamePrefix.name' => 'Tussenvoegsel',
            'address' => 'Adres',
            'postal_code' => 'Postcode',
            'city' => 'Woonplaats',
            'contact.primaryEmailAddress.email' => 'Emailadres',
            'contact.primaryphoneNumber.number' => 'Telefoonnummer',
            'date_begin' => 'Startdatum',
            'date_end' => 'Einddatum',
            'participations_amount' => 'Aantal kavels',
            'contact.primaryContactEnergySupplier.es_number' => 'Eneco klantnr',
            'delivered_total' => 'Opwek',
        ])->getCsv();

        return $csv;
    }

    private function getGCCsv(){
        $this->distributions->load([
            'revenue',
            'contact.primaryContactEnergySupplier',
        ]);

        $this->csvExporter->beforeEach(function ($distribution) {
            // Now notes field will have this value
            $distribution->ean = $this->productionProjectRevenue->productionProject->ean;
        });

        $csv = $this->csvExporter->build($this->distributions, [
            'ean' => 'EanCode',
            'postal_code' => 'Postcode',
            'date_begin' => 'BeginDatum',
            'date_end' => 'EindDatum',
            'delivered_total' => 'Productie',
            'contact.primaryContactEnergySupplier.es_number' => 'KlantNummer',
            'contact.full_name' => 'KlantNaam',
        ])->getCsv();

        return $csv;
    }

    private function getOxxioCsv(){
        $this->distributions->load([
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

        $csv = $this->csvExporter->build($this->distributions, [
            'ean' => 'project ean',
            'ean_manager' => 'project ean net',
            'date_begin' => 'start datum',
            'date_end' => 'eind datum',
            'contact.full_name' => 'participant',
            'tax_referral' => 'referentie',
            'postal_code' => 'Postcode',
            'contact.primaryContactEnergySupplier.ean_electricity' => 'ean participant',
            'contact.primaryContactEnergySupplier.es_number' => 'klantnr',
            'delivered_total' => 'geleverd kwh',
        ])->getCsv();

        return $csv;
    }
}