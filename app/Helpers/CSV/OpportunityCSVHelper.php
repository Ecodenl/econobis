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

class OpportunityCSVHelper
{
    private $csvExporter;
    private $opportunities;

    public function __construct($opportunities)
    {
        $this->csvExporter = new Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->opportunities = $opportunities;
    }

    public function downloadCSV(){

        $csv = '';
        $headers = true;

        foreach ($this->opportunities->chunk(500) as $chunk) {
            $chunk->load([
                'measureCategory',
                'intake.contact.person.title',
                'status',
                'opportunityEvaluation',
                'intake.campaign',
                'intake.address.country',
                'createdBy',
                'updatedBy',
        ]);

        $this->csvExporter->beforeEach(function ($opportunity) {
            $opportunity->amount_of_quotation_requests = $opportunity->quotationRequests()->count();
            $opportunity->full_address = optional(optional($opportunity->intake->address)->present())->streetAndNumber();

            $opportunity->desired_date = $this->formatDate($opportunity->desired_date);
            $opportunity->evaluation_agreed_date = $this->formatDate($opportunity->evaluation_agreed_date);

            $opportunity->created_at_date = $opportunity->created_at->format('d-m-Y');
            $opportunity->updated_at_date = $opportunity->updated_at->format('d-m-Y');

            $opportunity->is_realised = ($opportunity->opportunityEvaluation && $opportunity->opportunityEvaluation->is_realised) ? 'Ja' : 'Nee';
            $opportunity->is_statisfied = ($opportunity->opportunityEvaluation && $opportunity->opportunityEvaluation->is_statisfied) ? 'Ja' : 'Nee';
            $opportunity->would_recommend_organisation = ($opportunity->opportunityEvaluation && $opportunity->opportunityEvaluation->would_recommend_organisation) ? 'Ja' : 'Nee';

            $address = $opportunity->intake->address;

            $opportunity->street = ($address ? $address->street : '');
            $opportunity->street_number = ($address ? $address->number : '');
            $opportunity->addition = ($address ? $address->addition : '');
            $opportunity->postal_code = ($address ? $address->postal_code : '');
            $opportunity->city = ($address ? $address->city : '');
            $opportunity->country = (($address && $address->country) ? $address->country->name : '');

            // person/organisation fields
            if ($opportunity->intake->contact->type_id === 'person') {
                $opportunity->title = $opportunity->intake->contact->person->title;
                $opportunity->initials = $opportunity->intake->contact->person->initials;
                $opportunity->first_name = $opportunity->intake->contact->person->first_name;
                $opportunity->last_name_prefix = $opportunity->intake->contact->person->last_name_prefix;
                $opportunity->last_name = $opportunity->intake->contact->person->last_name;
            }

            $opportunity->updated_by = $opportunity->updatedBy->present()->fullName();
            $opportunity->created_by = $opportunity->createdBy->present()->fullName();
        });


        $csv = $this->csvExporter->build($chunk, [
            'number' => '#',
            'intake.contact.full_name' => 'Contact',
            'title.name' => 'Persoon titel',
            'initials' => 'Persoon initialen',
            'first_name' => 'Persoon voornaam',
            'last_name_prefix' => 'Persoon tussenvoegsel',
            'last_name' => 'Persoon achternaam',
            'street' => 'Straat',
            'street_number' => 'Nummer',
            'addition' => 'Toevoeging',
            'postal_code' => 'Postcode',
            'city' => 'Stad',
            'country' => 'Land',
            'measureCategory.name' => 'Maatregel categorie',
            'intake.campaign.name' => 'Campagne',
            'status.name' => 'Status',
            'amount_of_quotation_requests' => 'Aantal offertes',
            'quotation_text' => 'Toelichting op maatregel',
            'desired_date' => 'Datum uitvoering gepland',
            'evaluation_agreed_date' => 'Datum evaluatie akkoord',
            'is_realised' => 'Is de maatregel uitgevoerd?',
            'is_statisfied' => 'Bent u tevreden over de uitvoering?',
            'would_recommend_organisation' => 'Zou u het bedrijf aanbevelen?',
            'opportunityEvaluation.note' => 'Heeft u verder opmerkingen of aanbevelingen?',
            'updated_at_date' => 'Laatste update op',
            'updated_by' => 'Laatste update door',
            'created_at_date' => 'Gemaakt op',
            'created_by' => 'Gemaakt door',
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