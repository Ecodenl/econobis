<?php

namespace App\Http\Controllers\Api\FinancialOverview;

use App\Eco\Contact\Contact;
use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\FinancialOverview\FinancialOverviewContact;
use App\Eco\FinancialOverview\FinancialOverviewParticipantProject;
use App\Eco\FinancialOverview\FinancialOverviewProject;
use App\Eco\Project\ProjectType;
use App\Helpers\Delete\Models\DeleteFinancialOverview;
use App\Helpers\FinancialOverview\FinancialOverviewHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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

        $data = $input->string('description')->next()
            ->integer('administrationId')->validate('exists:administrations,id')->alias('administration_id')->next()
            ->integer('year')->next()
            ->boolean('definitive')->onEmpty(false)->whenMissing(false)->next()
            ->string('statusId')->onEmpty('concept')->whenMissing('concept')->alias('status_id')->next()
            ->date('dateProcessed')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_processed')->next()
            ->get();

        $financialOverview = new FinancialOverview($data);
        $financialOverview->save();

        $this->createProjectsForFinancialOverview($financialOverview);

        return Jory::on($financialOverview);
    }

    public function update(RequestInput $input, FinancialOverview $financialOverview)
    {
        $this->authorize('manage', FinancialOverview::class);
        $data = $input->string('description')->next()
            ->integer('administrationId')->validate('exists:administrations,id')->alias('administration_id')->next()
            ->integer('year')->next()
            ->boolean('definitive')->onEmpty(false)->whenMissing(false)->next()
            ->string('statusId')->onEmpty('concept')->whenMissing('concept')->alias('status_id')->next()
            ->date('dateProcessed')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_processed')->next()
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
                'status_id' => 'concept',
            ]);

            $financialOverviewParticipantProjectController = new FinancialOverviewParticipantProjectController();
            $financialOverviewParticipantProjectController->createParticipantProjectsForFinancialOverview($project, $financialOverviewProject);
        }
    }

    public function getNewProjectsForFinancialOverviewGrid(FinancialOverview $financialOverview)
    {
        return FinancialOverviewHelper::getNewProjectsForFinancialOverviewGrid($financialOverview);
    }
    public function getNewProjectsForFinancialOverview(FinancialOverview $financialOverview)
    {
        return FinancialOverviewHelper::getNewProjectsForFinancialOverview($financialOverview);
    }

}