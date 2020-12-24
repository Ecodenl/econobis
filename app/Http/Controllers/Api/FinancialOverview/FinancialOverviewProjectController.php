<?php

namespace App\Http\Controllers\Api\FinancialOverview;

use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\FinancialOverview\FinancialOverviewParticipantProject;
use App\Eco\FinancialOverview\FinancialOverviewProject;
use App\Eco\Project\Project;
use App\Eco\Project\ProjectType;
use App\Eco\Project\ProjectValueCourse;
use App\Helpers\Delete\Models\DeleteFinancialOverviewProject;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use App\Jobs\FinancialOverview\CreateFinancialOverviewParticipantProjects;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use JosKolenberg\LaravelJory\Facades\Jory;

class FinancialOverviewProjectController extends Controller
{

    public function jory()
    {
        return Jory::on(FinancialOverviewProject::class);
    }

    public function store(RequestInput $input, Request $request)
    {
        $this->authorize('manage', FinancialOverview::class);

        $financialOverview = FinancialOverview::find($request->get('financialOverviewId'));
        if(!$financialOverview)
        {
            abort(409,'Waardestaat jaar/administratie onbekend');
        }
        if($financialOverview->definitive)
        {
            abort(409,'Waardestaat ' . $financialOverview->description . ' is al definitief.');
        }


        $data = $input->integer('financialOverviewId')->alias('financial_overview_id')->next()
            ->integer('projectId')->validate('exists:projects,id')->alias('project_id')->next()
            ->boolean('definitive')->onEmpty(false)->whenMissing(false)->next()
            ->string('statusId')->onEmpty('in-progress')->whenMissing('in-progress')->alias('status_id')->next()
            ->get();

        $financialOverviewProject = new FinancialOverviewProject($data);
        $financialOverviewProject->save();

        CreateFinancialOverviewParticipantProjects::dispatch($financialOverviewProject, Auth::id());

        return Jory::on($financialOverviewProject);

    }

    public function update(RequestInput $input, FinancialOverviewProject $financialOverviewProject)
    {
        $this->authorize('manage', FinancialOverview::class);

        $financialOverview = $financialOverviewProject->financialOverview;
        if(!$financialOverview)
        {
            abort(409,'Waardestaat jaar/administratie onbekend');
        }
        if($financialOverview->definitive)
        {
            abort(409,'Waardestaat jaar ' . $financialOverview->description . ' is al definitief.');
        }

        $data = $input->boolean('definitive')->onEmpty(false)->whenMissing(false)->next()
            ->get();

        $financialOverviewProject->fill($data);
        $financialOverviewProject->save();

        $project = Project::find($financialOverviewProject->project_id);
        $this->updateParticipantMutations($project, $financialOverviewProject);

        return GenericResource::make($financialOverviewProject);
    }

    public function destroy(FinancialOverviewProject $financialOverviewProject)
    {
        $this->authorize('manage', FinancialOverview::class);

        try {
            DB::beginTransaction();

            $deleteFinancialOverviewProject = new DeleteFinancialOverviewProject($financialOverviewProject);
            $result = $deleteFinancialOverviewProject->delete();

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

    public function updateParticipantMutations(Project $project, FinancialOverviewProject $financialOverviewProject)
    {
        $financialOverview = $financialOverviewProject->financialOverview;
        $endDate = Carbon::createFromDate($financialOverview->year, 1, 1)->addYear();
        $participants = $project->participantsProject;
        foreach ($participants as $participant) {
            $mutations = $participant->mutationsDefinitive()
                ->whereDate('date_entry', '<', $endDate);

            //set true/false for all mutations on financial overview definitive till enddate
            foreach ($mutations->get() as $mutation) {
                $mutation->financial_overview_definitive = $financialOverviewProject->definitive;
                $mutation->save();
            }
        }
    }

}