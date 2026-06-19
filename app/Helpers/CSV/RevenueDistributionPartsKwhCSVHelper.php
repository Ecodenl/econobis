<?php

namespace App\Helpers\CSV;

use Carbon\Carbon;
use League\Csv\Reader;

class RevenueDistributionPartsKwhCSVHelper
{
    private $csvExporter;
    private $revenuePartsKwh;

    public function __construct($revenuePartsKwh)
    {
        $this->csvExporter = new Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->revenuePartsKwh = $revenuePartsKwh;
    }

    public function downloadCSV(){

        $csv = '';
        $headers = true;

        foreach ($this->revenuePartsKwh->distributionPartsKwh->sortBy('distribution_id')->chunk(500) as $chunk) {
            $chunk->load([
                'distributionKwh.contact.person.title',
                'distributionKwh.contact.primaryAddress',
            ]);

            $this->csvExporter->beforeEach(function ($distributionPartsKwh) {
                $distributionPartsKwh->power_kwh_consumption = $distributionPartsKwh->distributionKwh->participation->power_kwh_consumption;

                $distributionPartsKwh->created_at_date = $distributionPartsKwh->distributionKwh->created_at->format('d-m-Y');
                $distributionPartsKwh->updated_at_date = $distributionPartsKwh->distributionKwh->updated_at->format('d-m-Y');

                $distributionPartsKwh->period_start = $this->formatDate($distributionPartsKwh->partsKwh->date_begin);
                $distributionPartsKwh->period_end = $this->formatDate($distributionPartsKwh->partsKwh->date_end);

                $distributionPartsKwh->type = $distributionPartsKwh->distributionKwh->contact->getType()->name;

                $address = $distributionPartsKwh->distributionKwh->contact->primaryAddress;

                $distributionPartsKwh->street = ($address ? $address->street : '');
                $distributionPartsKwh->street_number = ($address ? $address->number : '');
                $distributionPartsKwh->addition = ($address ? $address->addition : '');
                $distributionPartsKwh->postal_code = ($address ? $address->postal_code : '');
                $distributionPartsKwh->city = ($address ? $address->city : '');
                $distributionPartsKwh->country = (($address && $address->country) ? $address->country->name : '');

                // person/organisation fields
                if ($distributionPartsKwh->distributionKwh->contact->type_id === 'person') {
                    $distributionPartsKwh->title = $distributionPartsKwh->distributionKwh->contact->person->title;
                    $distributionPartsKwh->initials = $distributionPartsKwh->distributionKwh->contact->person->initials;
                    $distributionPartsKwh->first_name = $distributionPartsKwh->distributionKwh->contact->person->first_name;
                    $distributionPartsKwh->last_name_prefix = $distributionPartsKwh->distributionKwh->contact->person->last_name_prefix;
                    $distributionPartsKwh->last_name = $distributionPartsKwh->distributionKwh->contact->person->last_name;
                }

                $distributionPartsKwh->date_payout = $distributionPartsKwh->partsKwh->date_payout ? $this->formatDate($distributionPartsKwh->partsKwh->date_payout) : $this->formatDate($distributionPartsKwh->partsKwh->date_confirmed);

                $distributionPartsKwh->delivered_kwh_formatted = $this->formatFinancial($distributionPartsKwh->delivered_kwh, 2);
                $distributionPartsKwh->kwh_return_formatted = $this->formatFinancial($distributionPartsKwh->kwh_return_this_part, 2);

                $distributionPartsKwh->period_start_from_till_visible = $this->formatDate($distributionPartsKwh->date_begin_from_till_visible);
                $distributionPartsKwh->period_end_from_till_visible = $this->formatDate($distributionPartsKwh->partsKwh->date_end);

                $distributionPartsKwh->delivered_kwh_EL_report_formatted = $this->formatFinancial($distributionPartsKwh->delivered_kwh_from_till_visible, 2);
                $distributionPartsKwh->kwh_return_EL_report_formatted = $this->formatFinancial($distributionPartsKwh->kwh_return, 2);
            });


            $csv = $this->csvExporter->build($chunk, [
                'id' => '#',
                'type' => 'Type',
                'distributionKwh.contact.number' => 'Nummer',
                'distributionKwh.contact.full_name' => 'Naam',
                'participations_quantity' => 'Participaties',
                'power_kwh_consumption' => 'Jaarlijks verbruik',
                'payout_formatted' => 'Uit te keren bedrag',
                'payout_type' => 'Uitkeren op',
                'date_payout' => 'Datum uitkering',
                'energy_supplier_name' => 'Energieleverancier',
                'delivered_kwh_formatted' => 'Geleverd deze periode',
                'kwh_return_formatted' => 'Teruggave EB deze periode',
                'title.name' => 'Persoon titel',
                'initials' => 'Persoon initialen',
                'first_name' => 'Persoon voornaam',
                'last_name_prefix' => 'Persoon tussenvoegsel',
                'last_name' => 'Persoon achternaam',
                'street' => 'Straat',
                'street_number' => 'Nummer',
                'addition' => 'Toevoeging',
                'postal_code' => 'Postcode',
                'city' => 'Plaats',
                'country' => 'Land',
                'period_start' => 'Begin periode',
                'period_end' => 'Eind periode',
                'updated_at_date' => 'Laatste update op',
                'created_at_date' => 'Gemaakt op',
                'period_start_from_till_visible' => 'Begin periode EL rapport',
                'period_end_from_till_visible' => 'Eind periode EL rapport',
                'delivered_kwh_EL_report_formatted' => 'Geleverd totaal EL rapport',
                'kwh_return_EL_report_formatted' => 'Teruggave EB rapport',
            ], $headers);
            $headers = false;
        }
        if (empty($csv)) abort(422, 'Geen gegevens om te downloaden');

//        Log::debug($csv->getCsv());

        return Reader::BOM_UTF8 . $csv->getCsv();
    }

    private function formatDate($date) {
        $formatDate = $date ? new Carbon($date) : false;
        return $formatDate ? $formatDate->format('d-m-Y') : '';
    }

    private function formatFinancial($amount, $decimals){
        return number_format($amount, $decimals, ',', '');
    }
}