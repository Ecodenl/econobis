<?php

namespace App\Http\Controllers\Api\FinancialOverview;

use App\Eco\FinancialOverview\FinancialOverviewContact;
use App\Eco\FinancialOverview\FinancialOverviewParticipantProject;
use App\Eco\FinancialOverview\FinancialOverviewProject;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Project\ProjectType;
use App\Eco\Project\ProjectValueCourse;
use App\Helpers\Delete\Models\DeleteFinancialOverviewParticipantProject;
use App\Http\Controllers\Controller;
use Carbon\Carbon;

class FinancialOverviewParticipantProjectController extends Controller
{
    public function createParticipantProjectsForFinancialOverview(FinancialOverviewProject $financialOverviewProject)
    {
        $financialOverview = $financialOverviewProject->financialOverview;

        $startDate = Carbon::createFromDate($financialOverview->year, 1, 1);
        $endDate = Carbon::createFromDate($financialOverview->year, 12, 31);

        $participants = $financialOverviewProject->project->participantsProject->filter(function($participantProject) use ($startDate) {
            return ($participantProject->date_terminated == null) ||
                ($participantProject->date_terminated > Carbon::parse($startDate)->startOfDay()->toDateString());
        });

        foreach ($participants as $participant) {
            //calculate start_value en end_value of participation
            $this->createFinancialOverviewParticipantProjects($participant, $startDate, $endDate, $financialOverviewProject);

        }
    }

    public function recalculateParticipantProjectForFinancialOverviews(ParticipantProject $participant)
    {
        $financialOverviewProjects = $participant->project->financialOverviewProjects->where('definitive', false);
        foreach ($financialOverviewProjects as $financialOverviewProject) {
            $financialOverview = $financialOverviewProject->financialOverview;

            $startDate = Carbon::createFromDate($financialOverview->year, 1, 1);
            $endDate = Carbon::createFromDate($financialOverview->year, 12, 31);

            if($participant->date_terminated && Carbon::parse($participant->date_terminated)->format('Y-m-d') < Carbon::parse($startDate)->format('Y-m-d') ) {
                $financialOverviewParticipantProject = FinancialOverviewParticipantProject::where('financial_overview_project_id', $financialOverviewProject->id)->where('participant_project_id', $participant->id)->first();
                if($financialOverviewParticipantProject){
                    $deleteFinancialOverviewParticipantProject = new DeleteFinancialOverviewParticipantProject($financialOverviewParticipantProject);
                    $deleteFinancialOverviewParticipantProject->delete();
                }
            } else {
                $this->createFinancialOverviewParticipantProjects($participant, $startDate, $endDate, $financialOverviewProject);
            }
        }
    }

    /**
     * @param ParticipantProject $participant
     * @param Carbon $startDate
     * @param Carbon $endDate
     * @param FinancialOverviewProject $financialOverviewProject
     */
    protected function createFinancialOverviewParticipantProjects(ParticipantProject $participant, Carbon $startDate, Carbon $endDate, FinancialOverviewProject $financialOverviewProject)
    {
        $startValue = $this->calculateParticipationsValue($participant, $startDate, $startDate);
        $cloneEndDate = clone $endDate;
        $endValue = $this->calculateParticipationsValue($participant, $endDate, $cloneEndDate->addDay());

        if ($startValue['quantity'] != 0 || $startValue['bookworth'] != 0 || $startValue['amount'] != 0
            || $endValue['quantity'] != 0 || $endValue['bookworth'] != 0 || $endValue['amount'] != 0) {

            FinancialOverviewParticipantProject::updateOrCreate([
                //Add unique field to match here
                'financial_overview_project_id' => $financialOverviewProject->id,
                'participant_project_id' => $participant->id,
            ], [
                'quantity_start_value' => $startValue['quantity'],
                'quantity_end_value' => $endValue['quantity'],
                'bookworth_start_value' => $startValue['bookworth'],
                'bookworth_end_value' => $endValue['bookworth'],
                'amount_start_value' => $startValue['amount'],
                'amount_end_value' => $endValue['amount'],
            ]);

            FinancialOverviewContact::updateOrCreate([
                //Add unique field to match here
                'financial_overview_id' => $financialOverviewProject->financialOverview->id,
                'contact_id' => $participant->contact_id,
            ], [
                'status_id' => 'concept',
            ]);
        }

    }

    protected function calculateParticipationsValue($participant, $dateReference1, $dateReference2)
    {
        $projectTypeCodeRef = (ProjectType::where('id', $participant->project->project_type_id)->first())->code_ref;
        $projectValueCourse = ProjectValueCourse::where('project_id', $participant->project->id)->where('date', '<=', $dateReference1->format('Y-m-d'))->orderBy('date', 'DESC')->first();
        $projectBookWorth = $projectValueCourse ? $projectValueCourse->book_worth : 0;

        $mutations = $participant->mutationsDefinitive()
            ->whereDate('date_entry', '<', $dateReference2->format('Y-m-d'))
            ->get();

        $participationsQBA['quantity'] = 0;
        $participationsQBA['bookworth'] = 0;
        $participationsQBA['amount'] = 0;
        if(count($mutations) == 0) {
            return $participationsQBA;
        }

        $participationsValue = 0;

        if($projectTypeCodeRef === 'obligation' || $projectTypeCodeRef === 'capital' || $projectTypeCodeRef === 'postalcode_link_capital') {
            $measureType = 'quantity';
        }

        if($projectTypeCodeRef === 'loan') {
            $measureType = 'amount';
        }

        foreach ($mutations as $mutation) {
            $participationsValue += $mutation[$measureType] ;
        }

        if($projectTypeCodeRef === 'obligation' || $projectTypeCodeRef === 'capital' || $projectTypeCodeRef === 'postalcode_link_capital') {
            $participationsQBA['quantity'] = $participationsValue;
            $participationsQBA['bookworth'] = $projectBookWorth;
            $participationsQBA['amount'] = $participationsValue * $projectBookWorth;
        }

        if($projectTypeCodeRef === 'loan') {
            $participationsQBA['quantity'] = 1;
            $participationsQBA['bookworth'] = $participationsValue;
            $participationsQBA['amount'] = $participationsValue;
        }

        return $participationsQBA;
    }

}