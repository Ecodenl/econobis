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

class QuotationRequestCSVHelper
{
    private $csvExporter;
    private $quotationRequests;

    public function __construct($quotationRequests)
    {
        $this->csvExporter = new Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->quotationRequests = $quotationRequests;
    }

    public function downloadCSV(){

        $csv = '';
        $headers = true;

        foreach ($this->quotationRequests->chunk(500) as $chunk) {
            $chunk->load([
                'organisation',
                'status',
                'opportunity.intake.contact.person.title',
                'opportunity.intake.campaign',
                'opportunity.measureCategory',
                'opportunity.measures',
                'updatedBy',
                'updatedBy',

        ]);

        $this->csvExporter->beforeEach(function ($quotationRequest) {

            $quotationRequest->date_recorded = $this->formatDate($quotationRequest->date_recorded);
            $quotationRequest->date_released = $this->formatDate($quotationRequest->date_released);
            $quotationRequest->date_valid = $this->formatDate($quotationRequest->date_valid);

            $quotationRequest->measures = '';

            $measures = [];
            foreach ($quotationRequest->opportunity->measures as $measure){
                array_push($measures, $measure->name);
            }

            if(count($measures) > 0){
                $quotationRequest->measures = implode($measures, ', ');
            }

            $quotationRequest->updated_by = $quotationRequest->updatedBy->present()->fullName();
            $quotationRequest->created_by = $quotationRequest->createdBy->present()->fullName();

            $quotationRequest->created_at_date = $quotationRequest->created_at->format('d-m-Y');
            $quotationRequest->updated_at_date = $quotationRequest->updated_at->format('d-m-Y');

            $address = $quotationRequest->opportunity->intake->address;

            $quotationRequest->street = ($address ? $address->street : '');
            $quotationRequest->street_number = ($address ? $address->number : '');
            $quotationRequest->addition = ($address ? $address->addition : '');
            $quotationRequest->postal_code = ($address ? $address->postal_code : '');
            $quotationRequest->city = ($address ? $address->city : '');
            $quotationRequest->country = (($address && $address->country) ? $address->country->name : '');

            // person/$quotationRequest fields
            if ($quotationRequest->opportunity->intake->contact->type_id === 'person') {
                $quotationRequest->title = $quotationRequest->opportunity->intake->contact->person->title;
                $quotationRequest->initials = $quotationRequest->opportunity->intake->contact->person->initials;
                $quotationRequest->first_name = $quotationRequest->opportunity->intake->contact->person->first_name;
                $quotationRequest->last_name_prefix = $quotationRequest->opportunity->intake->contact->person->last_name_prefix;
                $quotationRequest->last_name = $quotationRequest->opportunity->intake->contact->person->last_name;
            }
        });


        $csv = $this->csvExporter->build($chunk, [
            'id' => '#',
            'organisation.name' => 'Organisatie',
            'date_recorded' => 'Datum opname',
            'status.name' => 'Status',
            'date_released' => 'Offerte uitgebracht',
            'date_valid' => 'Offerte geldig tot',
            'quotation_text' => 'Offerte tekst',
            'opportunity.intake.contact.full_name' => 'Contact',
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
            'opportunity.measureCategory.name' => 'Maatregel categorie',
            'measures' => 'Maatregelen specifiek',
            'opportunity.intake.campaign.name' => 'Campagne',
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