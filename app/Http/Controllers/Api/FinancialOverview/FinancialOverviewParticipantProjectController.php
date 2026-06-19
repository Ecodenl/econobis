<?php

namespace App\Http\Controllers\Api\FinancialOverview;

use App\Eco\FinancialOverview\FinancialOverviewContact;
use App\Eco\FinancialOverview\FinancialOverviewParticipantProject;
use App\Eco\FinancialOverview\FinancialOverviewProject;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Project\ProjectValueCourse;
use App\Helpers\Delete\Models\DeleteFinancialOverviewParticipantProject;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
                $financialOverviewParticipantProject = FinancialOverviewParticipantProject::where('financial_overview_project_id', $financialOverviewProject->id)->where('participant_project_id', $participant->id)->where('status_id', '!=', 'sent')->first();
                if($financialOverviewParticipantProject){
                    try {
                        DB::beginTransaction();

                        $deleteFinancialOverviewParticipantProject = new DeleteFinancialOverviewParticipantProject($financialOverviewParticipantProject);
                        $result = $deleteFinancialOverviewParticipantProject->delete();

                        if(count($result) > 0){
                            DB::rollBack();
                            abort(412, implode(";", array_unique($result)));
                        }

                        DB::commit();
                    } catch (\PDOException $e) {
                        DB::rollBack();
                        Log::error($e->getMessage());
                        abort(500, 'Er is helaas een fout opgetreden.');
                    }
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
        // stand per 1-1 (peildatum 1-1)
        $startValue = $this->calculateParticipationsValue($participant, $startDate);

        // stand per 31-12 (peildatum 1-1 volgend jaar)
        $cloneEndDate = clone $endDate;
        $endPeil = $cloneEndDate->addDay();
        $endValue = $this->calculateParticipationsValue($participant, $endPeil);

        if ($startValue['quantity'] != 0 || $startValue['bookworth'] != 0 || $startValue['amount'] != 0
            || $endValue['quantity'] != 0 || $endValue['bookworth'] != 0 || $endValue['amount'] != 0) {

            $dataFOPP = [
                'contact_id'            => $participant->contact_id,
                'quantity_start_value'  => $startValue['quantity'],
                'quantity_end_value'    => $endValue['quantity'],
                'bookworth_start_value' => $startValue['bookworth'],
                'bookworth_end_value'   => $endValue['bookworth'],
                'amount_start_value'    => $startValue['amount'],
                'amount_end_value'      => $endValue['amount'],
            ];

            $existingFOPP = FinancialOverviewParticipantProject::where([
                'financial_overview_project_id' => $financialOverviewProject->id,
                'participant_project_id'        => $participant->id,
            ])->first();

            if ($existingFOPP) {
                if ($existingFOPP->status_id !== 'sent') {
                    $existingFOPP->update($dataFOPP);
                }
            } else {
                FinancialOverviewParticipantProject::create(array_merge($dataFOPP, [
                    'financial_overview_project_id' => $financialOverviewProject->id,
                    'participant_project_id'        => $participant->id,
                    'status_id'                     => 'concept',
                ]));
            }

            $existingFOC = FinancialOverviewContact::where([
                'financial_overview_id' => $financialOverviewProject->financialOverview->id,
                'contact_id'            => $participant->contact_id,
            ])->first();

            if ($existingFOC) {
                if ($existingFOC->status_id !== 'sent') {
                    $existingFOC->update(['status_id' => 'concept']);
                }
            } else {
                FinancialOverviewContact::create([
                    'financial_overview_id' => $financialOverviewProject->financialOverview->id,
                    'contact_id'            => $participant->contact_id,
                    'status_id'             => 'concept',
                ]);
            }
        }

    }

    protected function calculateParticipationsValue(ParticipantProject $participant, Carbon $dateReference): array
    {
        $projectTypeCodeRef = $participant?->project?->projectType?->code_ref ?? '';
        $projectValueCourse = ProjectValueCourse::where('project_id', $participant->project_id)
            ->where('date', '<', $dateReference->format('Y-m-d'))
            ->latest('date')
            ->first();
        $projectBookWorth = $projectValueCourse ? $projectValueCourse->book_worth : 0;

        $mutationsQuery = $participant->mutationsDefinitive()
            ->whereDate('date_entry', '<', $dateReference->format('Y-m-d'));

        $participationsQBA['quantity'] = 0;
        $participationsQBA['bookworth'] = 0;
        $participationsQBA['amount'] = 0;

        if (!$mutationsQuery->exists()) {
            return $participationsQBA;
        }

        $measureType = match ($projectTypeCodeRef) {
            'obligation', 'capital', 'postalcode_link_capital' => 'quantity',
            'loan' => 'amount',
            default => null,
        };

        if ($measureType === null) {
            Log::warning('Unknown project type code_ref in calculateParticipationsValue', [
                'participant_project_id' => $participant->id ?? null,
                'project_id' => $participant->project_id ?? ($participant->project->id ?? null),
                'code_ref' => $projectTypeCodeRef,
                'peildatum' => $dateReference->format('Y-m-d'),
            ]);
            return $participationsQBA;
        }

        $participationsValue = (float) $mutationsQuery->sum($measureType);

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