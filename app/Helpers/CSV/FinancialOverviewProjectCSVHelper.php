<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\CSV;

use App\Eco\FinancialOverview\FinancialOverviewProject;
use App\Eco\Project\ProjectType;
use Carbon\Carbon;
use League\Csv\Reader;

class FinancialOverviewProjectCSVHelper
{
    private $csvExporter;
    private $participants;
    private $financialOverviewProject;
    private $projectTypeCodeRef;
    private $startDate;
    private $endDate;

    public function __construct(FinancialOverviewProject $financialOverviewProject)
    {
        $this->csvExporter = new Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $startDate = Carbon::createFromDate($financialOverviewProject->financialOverview->year, 1, 1);
        $this->startDate = $startDate;
        $endDate = Carbon::createFromDate($financialOverviewProject->financialOverview->year, 12, 31);
        $this->endDate = $endDate;
        $this->participants = $financialOverviewProject->financialOverviewParticipantProjects;
        $this->financialOverviewProject = $financialOverviewProject;
        $this->projectTypeCodeRef = (ProjectType::where('id', $financialOverviewProject->project->project_type_id)->first())->code_ref;
    }

    public function downloadCSV(){

        $csv = '';
        $headers = true;

        foreach ($this->participants->chunk(500) as $chunk) {
            $chunk->load([
                'participantProject.contact',
                'participantProject.project',
            ]);

            if($this->projectTypeCodeRef === 'loan'){
                $this->csvExporter->beforeEach(function ($participant) {
                    $participant->created_at_date = $participant->created_at->format('d-m-Y');
                    $participant->updated_at_date = $participant->updated_at->format('d-m-Y');
                    $participant->amount_start_value = $this->formatFinancial($participant->amount_start_value);
                    $participant->amount_end_value = $this->formatFinancial($participant->amount_end_value);
                });

                $csv = $this->csvExporter->build($chunk, [
                    'id' => '#',
                    'participantProject.contact.number' => 'Contact nummer',
                    'participantProject.contact.full_name' => 'Naam',
                    'participantProject.project.name' => 'Project',
                    'amount_start_value' => 'Totale waarde per ' . $this->startDate->format('d-m-Y'),
                    'amount_end_value' => 'Totale waarde per ' . $this->startDate->format('d-m-Y'),
                ], $headers);

            } else {
                $this->csvExporter->beforeEach(function ($participant) {
                    $participant->created_at_date = $participant->created_at->format('d-m-Y');
                    $participant->updated_at_date = $participant->updated_at->format('d-m-Y');
                    $participant->bookworth_start_value = $this->formatFinancial($participant->bookworth_start_value);
                    $participant->amount_start_value = $this->formatFinancial($participant->amount_start_value);
                    $participant->bookworth_end_value = $this->formatFinancial($participant->bookworth_end_value);
                    $participant->amount_end_value = $this->formatFinancial($participant->amount_end_value);
                });

                $csv = $this->csvExporter->build($chunk, [
                    'id' => '#',
                    'participantProject.contact.number' => 'Contact nummer',
                    'participantProject.contact.full_name' => 'Naam',
                    'participantProject.project.name' => 'Project',
                    'quantity_start_value' => 'Aantal per ' . $this->startDate->format('d-m-Y'),
                    'bookworth_start_value' => 'Waarde per ' . $this->startDate->format('d-m-Y'),
                    'amount_start_value' => 'Totale waarde per ' . $this->startDate->format('d-m-Y'),
                    'quantity_end_value' => 'Aantal per ' . $this->endDate->format('d-m-Y'),
                    'bookworth_end_value' => 'Waarde per ' . $this->endDate->format('d-m-Y'),
                    'amount_end_value' => 'Totale waarde per ' . $this->endDate->format('d-m-Y'),
                ], $headers);

            }

            $headers = false;
        }
        if (empty($csv)) abort(422, 'Geen gegevens om te downloaden');

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