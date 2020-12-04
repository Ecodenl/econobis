<?php

namespace App\Http\Controllers\Api\FinancialOverview;

use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\FinancialOverview\FinancialOverviewParticipantProject;
use App\Eco\FinancialOverview\FinancialOverviewProject;
use App\Eco\Project\ProjectType;
use App\Helpers\Delete\Models\DeleteFinancialOverview;
use App\Helpers\FinancialOverview\FinancialOverviewHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use JosKolenberg\LaravelJory\Facades\Jory;

class FinancialOverviewController extends Controller
{

    public function jory()
    {
        return Jory::on(FinancialOverview::class);
    }

    public function store(RequestInput $input, Request $request)
    {
        $this->authorize('manage', FinancialOverview::class);

        $data = $input->integer('administrationId')->validate('exists:administrations,id')->alias('administration_id')->next()
            ->integer('year')->next()
            ->boolean('definitive')->onEmpty(false)->whenMissing(false)->next()
            ->get();

        $financialOverview = new FinancialOverview($data);
        $financialOverview->save();

        $this->createProjectsForFinancialOverview($financialOverview);

        return Jory::on($financialOverview);
    }

    public function update(RequestInput $input, FinancialOverview $financialOverview)
    {
        $this->authorize('manage', FinancialOverview::class);
        $data = $input->integer('administrationId')->validate('exists:administrations,id')->alias('administration_id')->next()
            ->integer('year')->next()
            ->boolean('definitive')->onEmpty(false)->whenMissing(false)->next()
            ->get();

        $financialOverview->fill($data);
        $financialOverview->save();

        return GenericResource::make($financialOverview);
    }

    public function destroy(FinancialOverview $financialOverview)
    {
        $this->authorize('manage', FinancialOverview::class);

        try {
            DB::beginTransaction();

            $deleteFinancialOverview = new DeleteFinancialOverview($financialOverview);
            $result = $deleteFinancialOverview->delete();

            if(count($result) > 0){
                DB::rollBack();
                abort(412, implode(";", array_unique($result)));
            }

            DB::commit();
        } catch (\PDOException $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            abort(501, 'Er is helaas een fout opgetreden.');
        }
    }

    public function createProjectsForFinancialOverview(FinancialOverview $financialOverview)
    {
        $projects = $this->getNewProjectsForFinancialOverview($financialOverview);

        foreach ($projects as $project) {
            $financialOverviewProject = FinancialOverviewProject::create([
                'financial_overview_id' => $financialOverview->id,
                'project_id' => $project->id,
                'definitive' => false,
            ]);

            $participants = $project->participantsProject;

            foreach ($participants as $participant) {
                //todo WM: hier bepalen start_value en end_value
                $startValue = $this->calculateParticipationsValue($participant, Carbon::createFromDate($financialOverview->year, 1, 1));
                $endValue = $this->calculateParticipationsValue($participant, Carbon::createFromDate($financialOverview->year, 12, 31));

                FinancialOverviewParticipantProject::create([
                    'financial_overview_project_id' => $financialOverviewProject->id,
                    'participant_project_id' => $participant->id,
                    'start_value' => $startValue,
                    'end_value' => $endValue,
                ]);

            }
        }
    }

    public function getNewProjectsForFinancialOverview(FinancialOverview $financialOverview)
    {
        return FinancialOverviewHelper::getNewProjectsForFinancialOverview($financialOverview);
    }

    protected function calculateParticipationsValue($participant, $dateReference)
    {
        $projectTypeCodeRef = (ProjectType::where('id', $participant->project->project_type_id)->first())->code_ref;

        $mutations = $participant->mutationsDefinitive()
            ->whereDate('date_entry', '<=', $dateReference);

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
        return $participationsValue;
    }


}