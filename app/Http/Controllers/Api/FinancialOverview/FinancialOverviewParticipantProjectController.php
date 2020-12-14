<?php

namespace App\Http\Controllers\Api\FinancialOverview;

use App\Eco\FinancialOverview\FinancialOverviewContact;
use App\Eco\FinancialOverview\FinancialOverviewParticipantProject;
use App\Eco\FinancialOverview\FinancialOverviewProject;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Project\Project;
use App\Eco\Project\ProjectType;
use App\Eco\Project\ProjectValueCourse;
use App\Http\Controllers\Controller;
use Carbon\Carbon;

class FinancialOverviewParticipantProjectController extends Controller
{
    public function createParticipantProjectsForFinancialOverview(Project $project, FinancialOverviewProject $financialOverviewProject)
    {
        $financialOverview = $financialOverviewProject->financialOverview;
        $participants = $project->participantsProject;

        $startDate = Carbon::createFromDate($financialOverview->year, 1, 1);
        $endDate = Carbon::createFromDate($financialOverview->year, 1, 1)->addYear();
        foreach ($participants as $participant) {
            //calculate start_value en end_value of participation

            $startValue = $this->calculateParticipationsValue($participant, $startDate);
            $endValue = $this->calculateParticipationsValue($participant, $endDate);
            FinancialOverviewParticipantProject::create([
                'financial_overview_project_id' => $financialOverviewProject->id,
                'participant_project_id' => $participant->id,
                'quantity_start_value' => $startValue['quantity'],
                'quantity_end_value' => $endValue['quantity'],
                'bookworth_start_value' => $startValue['bookworth'],
                'bookworth_end_value' => $endValue['bookworth'],
                'amount_start_value' => $startValue['amount'],
                'amount_end_value' => $endValue['amount'],
            ]);

            FinancialOverviewContact::updateOrCreate([
                //Add unique field to match here
                'financial_overview_id'   => $financialOverviewProject->financialOverview->id,
                'contact_id'   => $participant->contact_id,
            ],[
                'status_id' => 'concept',
            ]);
        }
    }

    public function recalculateParticipantProjectForFinancialOverviews(ParticipantProject $participant)
    {
        // Only concept (not definitive) financial overview projects recalculate
//        $financialOverviewParticipantProjects = $participant->financialOverviewParticipantProjects()
//            ->whereHas('financialOverviewProject', function ($query) {
//                $query->where('definitive', false);
//            });
        $financialOverviewProjects = $participant->project->financialOverviewProjects->where('definitive', false);
        foreach ($financialOverviewProjects as $financialOverviewProject) {
            $financialOverview = $financialOverviewProject->financialOverview;
            $startDate = Carbon::createFromDate($financialOverview->year, 1, 1);
            $endDate = Carbon::createFromDate($financialOverview->year, 1, 1)->addYear();

            $startValue = $this->calculateParticipationsValue($participant, $startDate);
            $endValue = $this->calculateParticipationsValue($participant, $endDate);

            FinancialOverviewParticipantProject::updateOrCreate([
                //Add unique field to match here
                'participant_project_id'   => $participant->id,
            ],[
                'financial_overview_project_id' => $financialOverviewProject->id,
                'quantity_start_value' => $startValue['quantity'],
                'quantity_end_value' => $endValue['quantity'],
                'bookworth_start_value' => $startValue['bookworth'],
                'bookworth_end_value' => $endValue['bookworth'],
                'amount_start_value' => $startValue['amount'],
                'amount_end_value' => $endValue['amount'],
            ]);

            FinancialOverviewContact::updateOrCreate([
                //Add unique field to match here
                'financial_overview_id'   => $financialOverviewProject->financialOverview->id,
                'contact_id'   => $participant->contact_id,
            ],[
                'status_id' => 'concept',
            ]);

        }
    }

    protected function calculateParticipationsValue($participant, $dateReference)
    {
        $projectTypeCodeRef = (ProjectType::where('id', $participant->project->project_type_id)->first())->code_ref;
        $projectValueCourse = ProjectValueCourse::where('project_id', $participant->project->id)->where('date', '<', $dateReference->format('Y-m-d'))->orderBy('date', 'DESC')->first();
        $projectBookWorth = $projectValueCourse ? $projectValueCourse->book_worth : 0;

        $mutations = $participant->mutationsDefinitive()
            ->whereDate('date_entry', '<', $dateReference);

        $participationsValue = 0;

        if($projectTypeCodeRef === 'obligation' || $projectTypeCodeRef === 'capital' || $projectTypeCodeRef === 'postalcode_link_capital') {
            $measureType = 'quantity';
        }

        if($projectTypeCodeRef === 'loan') {
            $measureType = 'amount';
        }

        foreach ($mutations->get() as $mutation) {
            $participationsValue += $mutation[$measureType] ;
        }

        $participationsQBA['quantity'] = 0;
        $participationsQBA['bookworth'] = 0;
        $participationsQBA['amount'] = 0;

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