<?php

namespace App\Helpers\CSV;

use Carbon\Carbon;
use League\Csv\Reader;

class RevenueDistributionKwhCSVHelper
{
    private $csvExporter;
    private $revenuesKwh;

    public function __construct($revenuesKwh)
    {
        $this->csvExporter = new Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->revenuesKwh = $revenuesKwh;
    }

    public function downloadCSV(){

        $csv = '';
        $headers = true;

        $distributionPartsKwh = $this->revenuesKwh->distributionPartsKwh()
            ->where(function($query) {
                $query->where('is_end_participation', true)
                    ->orWhere('is_energy_supplier_switch', true)
                    ->orWhere('is_end_total_period', true);
            })
            ->join('revenue_parts_kwh', 'revenue_distribution_parts_kwh.parts_id', '=', 'revenue_parts_kwh.id')
            ->orderBy('revenue_distribution_parts_kwh.distribution_id')
            ->orderBy('revenue_parts_kwh.date_begin')
            ->get(['revenue_distribution_parts_kwh.*']); // Select only columns from the main table

        foreach ($distributionPartsKwh->chunk(500) as $chunk) {
            $chunk->load([
                'distributionKwh.contact.person.title',
                'distributionKwh.contact.primaryAddress',
            ]);

            $this->csvExporter->beforeEach(function ($distributionPartsKwh) {

                $distributionPartsKwh->period_start = $this->formatDate($distributionPartsKwh->date_begin_from_till_visible);
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
                $distributionPartsKwh->delivered_kwh_formatted = $this->formatFinancial($distributionPartsKwh->delivered_kwh_from_till_visible, 2);
                $distributionPartsKwh->kwh_return_formatted = $this->formatFinancial($distributionPartsKwh->kwh_return, 2);
            });


            $csv = $this->csvExporter->build($chunk, [
                'id' => '#',
                'type' => 'Type',
                'distributionKwh.contact.number' => 'Nummer',
                'distributionKwh.contact.full_name' => 'Naam',
                'participations_quantity' => 'Participaties',
                'payout_formatted' => 'Uit te keren bedrag',
                'payout_type' => 'Uitkeren op',
                'date_payout' => 'Datum uitkering',
                'energy_supplier_name' => 'Energieleverancier',
                'delivered_kwh_formatted' => 'Geleverd totaal',
                'kwh_return_formatted' => 'Teruggave energiebelasting',
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