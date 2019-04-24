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
    private $counter;

    public function __construct(
        EnergySupplier $energySupplier,
        ProductionProjectRevenue $productionProjectRevenue,
        $templateId, $fileName
    ) {
        $this->csvExporter = new Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->energySupplier = $energySupplier;
        $this->productionProjectRevenue = $productionProjectRevenue;
        $this->templateId = $templateId;
        $this->fileName = $fileName;
        $this->distributions = $productionProjectRevenue->distribution()->where('es_id', $energySupplier->id)->get();
    }

    public function getCSV()
    {

        if($this->distributions->count() === 0){
            abort(403, 'Geen verdeling voor deze energiemaatschappij');
        }

        switch ($this->templateId) {
            case '1':
                $csv = $this->getEnecoCsv();
                break;
            case '2':
                $csv = $this->getGreenchoiceCsv();
                break;
            case '3':
                $csv = $this->getOxxioCsv();
                break;
            case '4':
                $csv = $this->getNuonCsv();
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
                'contact.primaryEmailAddress',
                'contact.primaryphoneNumber',
                'revenue',
                'contact.primaryContactEnergySupplier',
            ]);

            $this->csvExporter->beforeEach(function ($distribution) {
                // Now notes field will have this value
                if (strlen($distribution->postal_code)>3) {
                    echo "more than 140";
                }
                $distribution->empty_column_account_number = '';
                $distribution->empty_column_proximity_rate = '';
                $distribution->empty_column_power_total = '';
                $distribution->empty_column_EB_discount_total_excl_vat = '';
                $distribution->empty_column_customer_receives_excl_vat = '';
                $distribution->empty_column_customer_receives_incl_vat = '';
                $distribution->empty_column_eb_year = '';
                $distribution->empty_column_settle_date = '';
                $distribution->postal_code_numbers = strlen($distribution->postal_code)>3 ? substr($distribution->postal_code, 0, 4) : '';
                $distribution->postal_code_letters = strlen($distribution->postal_code)>5 ? substr($distribution->postal_code, 5) : '';
                $distribution->period_start = $this->formatDate($distribution->revenue->date_begin);
                $distribution->period_end   = $this->formatDate($distribution->revenue->date_end);
            });

            $csv = $this->csvExporter->build($chunk, [
                'contact.full_name' => 'Naam',
                'contact.person.initials' => 'Voorletters',
                'contact.person.last_name_prefix' => 'Tussenvoegsel',
                'address' => 'Adres',
                'postal_code_numbers' => 'Postcode cijfers',
                'postal_code_letters' => 'Postcode letters',
                'city' => 'Woonplaats',
                'contact.primaryContactEnergySupplier.ean_electricity' => 'Ean-code leveringsadres',
                'contact.primaryEmailAddress.email' => 'Emailadres',
                'contact.primaryphoneNumber.number' => 'Telefoonnummer',
                'period_start' => 'Startdatum',
                'empty_column_reading_on_3112' => 'Stand op 31-12',
                'period_end' => 'Einddatum',
                'participations_amount' => 'Aantal kavels',
                'contact.primaryContactEnergySupplier.es_number' => 'Eneco klantnr',
                'empty_column_account_number' => 'Accountnr',
                'delivered_total' => 'Opwek',
                'empty_column_proximity_rate' => 'Nabijheids-tarief',
                'empty_column_power_total' => 'Stroom Totaal',
                'empty_column_EB_discount_total_excl_vat' => 'EB Korting Totaal Excl. BTW',
                'empty_column_customer_receives_excl_vat' => 'Klant Ontvangt Excl. BTW',
                'empty_column_customer_receives_incl_vat' => 'Klant Ontvangt Incl. BTW',
                'empty_column_eb_year' => 'EB <jaartal>',
                'empty_column_settle_date' => 'Afrekendatum',
            ], $headers);
            $headers = false;
        }
        return $csv->getCsv();
    }

    private function getGreenchoiceCsv()
    {
        $csv = '';
        $headers = true;
        $this->counter = 0;

        foreach ($this->distributions->chunk(500) as $chunk) {
            $chunk->load([
                'revenue',
                'contact.primaryContactEnergySupplier',
            ]);
            $this->csvExporter->beforeEach(function ($distribution) {
                // Now notes field will have this value
                ++$this->counter;
                $distribution->seq_nr = $this->counter;
                $distribution->registration_date = $this->formatDate(new Carbon('now'));
                $distribution->period_start = $this->formatDate($distribution->revenue->date_begin);
                $distribution->period_end   = $this->formatDate($distribution->revenue->date_end);
                $distribution->empty_column_expected_revenue = '';
                $distribution->file_name = $this->fileName;
            });

            $csv = $this->csvExporter->build($chunk, [
                'seq_nr' => 'Volgnr',
                'contact.full_name' => 'KlantNaam',
                'postal_code' => 'Postcode',
                'contact.primaryContactEnergySupplier.es_number' => 'KlantNummer',
                'contact.primaryContactEnergySupplier.ean_electricity' => 'EanCode',
                'registration_date' => 'OntvangstDatum',
                'period_start' => 'BeginDatum',
                'period_end' => 'EindDatum',
                'participations_amount' => 'Aantal participaties',
                'empty_column_expected_revenue' => 'Verwachte opbrengst',
                'delivered_total' => 'ProductieHoeveelheid',
                'file_name' => 'BestandsNaam',
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
                $distribution->period_start = $this->formatDate($distribution->revenue->date_begin);
                $distribution->period_end   = $this->formatDate($distribution->revenue->date_end);
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

    private function getNuonCsv()
    {
        $csv = '';
        $headers = true;

        foreach ($this->distributions->chunk(500) as $chunk) {
            $chunk->load([
                'contact.person',
                'contact.primaryEmailAddress',
                'contact.primaryphoneNumber',
                'revenue',
                'contact.primaryContactEnergySupplier',
            ]);

            $this->csvExporter->beforeEach(function ($distribution) {
                // Now notes field will have this value
                $distribution->empty_column_unit_kwh = '';
                $distribution->period_start = $this->formatDate($distribution->revenue->date_begin);
                $distribution->period_end   = $this->formatDate($distribution->revenue->date_end);
            });

            $csv = $this->csvExporter->build($chunk, [
                'contact.number' => 'Interne Ref.nr.',
                'contact.person.title.name' => 'Aanspreektitel',
                'contact.person.first_name' => 'Voornaam',
                'contact.person.last_name_prefix' => 'Tussenvoegsel',
                'contact.person.last_name' => 'Achternaam',
                'address' => 'Adres Aansluiting',
                'postal_code' => 'Postcode Aansluiting',
                'city' => 'Woonplaats Aansluiting',
                'energy_supplier_name' => 'Leverancier',
                'contact.primaryContactEnergySupplier.es_number' => 'Klantnummer',
                'contact.iban' => 'Contractrekening',
                'contact.primaryContactEnergySupplier.ean_electricity' => 'EanCode',
                'participations_amount' => 'Aantal certificaten',
                'period_start' => 'Startdatum',
                'period_end' => 'Einddatum',
                'delivered_total' => 'Toegerekende productie',
                'empty_column_unit_kwh' => 'Eenheid (kWh)',

            ], $headers);
            $headers = false;
        }
        return $csv->getCsv();
    }

    private function formatDate($date) {
        $formatDate = $date ? new Carbon($date) : false;
        return $formatDate ? $formatDate->format('d-m-Y') : '';
    }
}