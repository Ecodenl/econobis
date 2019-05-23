<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\CSV;

use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\Project\ProjectRevenue;
use Carbon\Carbon;
use League\Csv\Reader;

class RevenueDistributionCSVHelper
{
    private $csvExporter;
    private $distribution;

    public function __construct($distribution)
    {
        $this->csvExporter = new Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->distribution = $distribution;
    }

    public function downloadCSV(){

        $csv = '';
        $headers = true;

        foreach ($this->distribution->chunk(500) as $chunk) {
            $chunk->load([
                'contact.person.title',
                'contact.primaryAddress',
        ]);

        $this->csvExporter->beforeEach(function ($distribution) {
            $distribution->created_at_date = $distribution->created_at->format('d-m-Y');
            $distribution->updated_at_date = $distribution->updated_at->format('d-m-Y');

            $distribution->period_start = $this->formatDate($distribution->revenue->date_begin);
            $distribution->period_end = $this->formatDate($distribution->revenue->date_end);

            $distribution->type = $distribution->contact->getType()->name;

            $address = $distribution->contact->primaryAddress;

            $distribution->street = ($address ? $address->street : '');
            $distribution->street_number = ($address ? $address->number : '');
            $distribution->addition = ($address ? $address->addition : '');
            $distribution->postal_code = ($address ? $address->postal_code : '');
            $distribution->city = ($address ? $address->city : '');
            $distribution->country = (($address && $address->country) ? $address->country->name : '');

            // person/organisation fields
            if ($distribution->contact->type_id === 'person') {
                $distribution->title = $distribution->contact->person->title;
                $distribution->initials = $distribution->contact->person->initials;
                $distribution->first_name = $distribution->contact->person->first_name;
                $distribution->last_name_prefix = $distribution->contact->person->last_name_prefix;
                $distribution->last_name = $distribution->contact->person->last_name;
            }

            $distribution->date_payout = $this->formatDate($distribution->date_payout);

            $distribution->payout_formatted = $this->formatFinancial($distribution->payout);
            $distribution->kwh_return_formatted = $this->formatFinancial($distribution->kwh_return);
        });


            $csv = $this->csvExporter->build($chunk, [
                'id' => '#',
                'type' => 'Type',
                'contact.full_name' => 'Naam',
                'participations_amount' => 'Participaties',
                'payout_formatted' => 'Uit te keren bedrag',
                'payout_type' => 'Uitkeren op',
                'date_payout' => 'Datum uitkering',
                'energy_supplier_name' => 'Energieleverancier',
                'delivered_total' => 'Geleverd totaal',
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
                'updated_at_date' => 'Laatste update op',
                'created_at_date' => 'Gemaakt op',
            ], $headers);
            $headers = false;
        }

        return Reader::BOM_UTF8 . $csv->getCsv();
    }

    private function formatDate($date) {
        $formatDate = $date ? new Carbon($date) : false;
        return $formatDate ? $formatDate->format('d-m-Y') : '';
    }

    private function formatFinancial($amount){
        return number_format($amount, 2, ',', '');
    }
}