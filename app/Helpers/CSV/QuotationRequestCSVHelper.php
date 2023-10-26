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
                'organisationOrCoach',
                'projectManager',
                'externalParty',
                'status',
                'opportunityAction',
                'opportunity.intake.contact.person.title',
                'opportunity.intake.campaign',
                'opportunity.measureCategory',
                'opportunity.measures',
                'updatedBy',
            ]);

            $this->csvExporter->beforeEach(function ($quotationRequest) {
                $quotationRequest->date_planned = $this->formatDateTime($quotationRequest->date_planned);
                $quotationRequest->date_recorded = $this->formatDateTime($quotationRequest->date_recorded);
                $quotationRequest->date_released = $this->formatDate($quotationRequest->date_released);
                $quotationRequest->date_approved_client = $this->formatDate($quotationRequest->date_approved_client);
                $quotationRequest->date_approved_project_manager = $this->formatDate($quotationRequest->date_approved_project_manager);
                $quotationRequest->date_under_review = $this->formatDate($quotationRequest->date_under_review);
                $quotationRequest->date_approved_external = $this->formatDate($quotationRequest->date_approved_external);
                $quotationRequest->measures = '';

                $quotationRequest->opportunityActionName = $quotationRequest->opportunityAction ? $quotationRequest->opportunityAction->name : '';

                $measures = [];
                foreach ($quotationRequest->opportunity->measures as $measure){
                    array_push($measures, $measure->name);
                }

                if(count($measures) > 0){
                    $quotationRequest->measures = implode(', ', $measures);
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
                $quotationRequest->area_name = ($address ? $address->shared_area_name : '');
                $quotationRequest->district_name = (($address && $address->getSharedPostalCodesHouseNumber()) ? $address->getSharedPostalCodesHouseNumber()->sharedArea->district_name : '');
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
                'organisationOrCoach.full_name' => 'Organisatie/Coach',
                'projectManager.full_name' => 'Projectleider',
                'externalParty.full_name' => 'Externe partij',
                'opportunityActionName' => 'Actie op kans',
                'status.name' => 'Status',
                'date_planned' => 'Datum afspraak',
                'date_recorded' => 'Datum opname',
                'date_released' => 'Datum uitgebracht',
                'date_approved_client' => 'Datum akkoord bewoner',
                'date_approved_project_manager' => 'Datum akkoord projectleider',
                'date_under_review' => 'Datum toekenning in behandeling',
                'date_approved_external' => 'Datum akkoord toekenning',
                'quotation_text' => 'Offerte omschrijving',
                'quotation_amount' => 'Offerte bedrag',
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
                'area_name' => 'Buurt',
                'district_name' => 'Wijk',
                'country' => 'Land',
                'opportunity.number' => 'Kans ID',
                'opportunity.measureCategory.name' => 'Maatregel categorie',
                'measures' => 'Maatregelen specifiek',
                'opportunity.intake.campaign.name' => 'Campagne',
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
    private function formatDateTime($date) {
        $formatDate = $date ? new Carbon($date) : false;
        return $formatDate ? $formatDate->format('d-m-Y H:i') : '';
    }
}