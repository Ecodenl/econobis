<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\CSV;

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
                'measures',
                'intake.contact.person.title',
                'status',
                'evaluationRealised',
                'evaluationStatisfied',
                'evaluationRecommendOrganisation',
                'intake.campaign',
                'intake.address.country',
                'createdBy',
                'updatedBy',
            ]);

            $this->csvExporter->beforeEach(function ($opportunity) {
                $opportunity->amount_of_quotation_requests = $opportunity->quotationRequests()->count();
                $opportunity->full_address = optional(optional($opportunity->intake->address)->present())->streetAndNumber();

                $opportunity->measures_specific = '';

                $measures = [];

                foreach ($opportunity->measures as $measure){
                    array_push($measures, $measure->name);
                }

                if(count($measures) > 0){
                    $opportunity->measures_specific = implode(', ', $measures);
                }

                $opportunity->desired_date = $this->formatDate($opportunity->desired_date);
                $opportunity->evaluation_agreed_date = $this->formatDate($opportunity->evaluation_agreed_date);

                $opportunity->created_at_date = $opportunity->created_at->format('d-m-Y');
                $opportunity->updated_at_date = $opportunity->updated_at->format('d-m-Y');

                $address = $opportunity->intake->address;

                $opportunity->street = ($address ? $address->street : '');
                $opportunity->street_number = ($address ? $address->number : '');
                $opportunity->addition = ($address ? $address->addition : '');
                $opportunity->postal_code = ($address ? $address->postal_code : '');
                $opportunity->city = ($address ? $address->city : '');

                $opportunity->area_name = ($address ? $address->shared_area_name : '');
                $opportunity->district_name = (($address && $address->getSharedPostalCodesHouseNumber() && $address->getSharedPostalCodesHouseNumber()->sharedArea) ? $address->getSharedPostalCodesHouseNumber()->sharedArea->district_name : '');

                $opportunity->country = (($address && $address->country) ? $address->country->name : '');

                $opportunity->contact_number = $opportunity->intake->contact->number;

                // person/organisation fields
                if ($opportunity->intake->contact->type_id === 'person') {
                    $opportunity->title = $opportunity->intake->contact->person->title;
                    $opportunity->initials = $opportunity->intake->contact->person->initials;
                    $opportunity->first_name = $opportunity->intake->contact->person->first_name;
                    $opportunity->last_name_prefix = $opportunity->intake->contact->person->last_name_prefix;
                    $opportunity->last_name = $opportunity->intake->contact->person->last_name;
                }
                $opportunity->primaryphoneNumber = $opportunity->intake->contact->primaryphoneNumber ? $opportunity->intake->contact->primaryphoneNumber->number : '';
                $opportunity->primaryEmailAddress = $opportunity->intake->contact->primaryEmailAddress ? $opportunity->intake->contact->primaryEmailAddress->email : '';

                $opportunity->updated_by = $opportunity->updatedBy ? $opportunity->updatedBy->present()->fullName() : '';
                $opportunity->created_by = $opportunity->createdBy ? $opportunity->createdBy->present()->fullName() : '';
            });


            $csv = $this->csvExporter->build($chunk, [
                'number' => '#',
                'contact_number' => 'Contactnummer',
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
                'city' => 'Plaats',
                'area_name' => 'Buurt',
                'district_name' => 'Wijk',
                'country' => 'Land',
                'primaryphoneNumber' => 'Telefoon',
                'primaryEmailAddress' => 'E-mailadres',
                'measureCategory.name' => 'Maatregel categorie',
                'measures_specific' => 'Maatregelen specifiek',
                'intake.campaign.name' => 'Campagne',
                'status.name' => 'Status',
                'opportunity_code' => 'Kans code',
                'amount' => 'Aantal',
                'amount_of_quotation_requests' => 'Aantal offertes',
                'quotation_text' => 'Toelichting op maatregel',
                'desired_date' => 'Datum uitvoering',
                'evaluation_agreed_date' => 'Datum evaluatie',
                'evaluationRealised.name' => 'Is de evaluatie uitgevoerd?',
                'evaluationStatisfied.name' => 'Bent u tevreden over de uitvoering?',
                'evaluationRecommendOrganisation.name' => 'Zou u het bedrijf aanbevelen?',
                'evaluation_note' => 'Heeft u verder opmerkingen of aanbevelingen?',
                'updated_at_date' => 'Laatste update op',
                'updated_by' => 'Laatste update door',
                'created_at_date' => 'Gemaakt op',
                'created_by' => 'Gemaakt door',
            ], $headers);
            $headers = false;
        }
        if (empty($csv)) abort(422, 'Geen gegevens om te downloaden');

        return Reader::BOM_UTF8 . $csv->getCsv();
    }

    private function formatDate($date) {
        $formatDate = $date ? new Carbon($date) : false;
        return $formatDate ? $formatDate->format('d-m-Y') : '';
    }
}