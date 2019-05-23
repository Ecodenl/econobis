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

class RevenueParticipantsCSVHelper
{
    private $csvExporter;
    private $participants;
    private $projectRevenue;

    public function __construct($participants, ProjectRevenue $projectRevenue)
    {
        $this->csvExporter = new Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->participants = $participants;
        $this->projectRevenue = $projectRevenue;
    }

    public function downloadCSV(){

        $csv = '';
        $headers = true;

        foreach ($this->participants->chunk(500) as $chunk) {
            $chunk->load([
                'project',
                'contact.person.title',
                'contact.primaryAddress',
                'contact.primaryContactEnergySupplier.energySupplier',
                'participantProjectPayoutType',
        ]);

        $this->csvExporter->beforeEach(function ($participant) {
            $participant->created_at_date = $participant->created_at->format('d-m-Y');
            $participant->updated_at_date = $participant->updated_at->format('d-m-Y');

            $participant->period_start = $this->formatDate($this->projectRevenue->date_begin);
            $participant->period_end = $this->formatDate($this->projectRevenue->date_end);

            $participant->type = $participant->contact->getType()->name;

            $address = $participant->contact->primaryAddress;

            $participant->street = ($address ? $address->street : '');
            $participant->street_number = ($address ? $address->number : '');
            $participant->addition = ($address ? $address->addition : '');
            $participant->postal_code = ($address ? $address->postal_code : '');
            $participant->city = ($address ? $address->city : '');
            $participant->country = (($address && $address->country) ? $address->country->name : '');

            // person/organisation fields
            if ($participant->contact->type_id === 'person') {
                $participant->title = $participant->contact->person->title;
                $participant->initials = $participant->contact->person->initials;
                $participant->first_name = $participant->contact->person->first_name;
                $participant->last_name_prefix = $participant->contact->person->last_name_prefix;
                $participant->last_name = $participant->contact->person->last_name;
            }

            $participant->date_payed = $this->formatDate($this->projectRevenue->date_payed);

            //berekende velden
            if($this->projectRevenue->project->getCurrentParticipations() > 0) {
                $participant->payout = round((($this->projectRevenue->revenue
                            * ($this->projectRevenue->pay_percentage / 100))
                        / $this->projectRevenue->project->getCurrentParticipations())
                    * $participant->participationsCurrent, 2);

                $participant->delivered_total = round((($this->projectRevenue->kwh_end - $this->projectRevenue->kwh_start) / $this->projectRevenue->project->getCurrentParticipations()) * $participant->participations_current,2);
            }
            else{
                $participant->payout = 0;
                $participant->delivered_total = 0;
            }

            $participant->kwh_return = $participant->delivered_total * $this->projectRevenue->payout_kwh;

            $participant->payout_formatted = $this->formatFinancial($participant->payout);
            $participant->kwh_return_formatted = $this->formatFinancial($participant->kwh_return);
        });


        $csv = $this->csvExporter->build($chunk, [
            'id' => '#',
            'type' => 'Type',
            'contact.full_name' => 'Naam',
            'participations_current' => 'Participaties',
            'payout_formatted' => 'Uit te keren bedrag',
            'participantProjectPayoutType.name' => 'Uitkeren op',
            'date_payed' => 'Datum uitkering',
            'contact.primaryContactEnergySupplier.energySupplier.name' => 'Energieleverancier',
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