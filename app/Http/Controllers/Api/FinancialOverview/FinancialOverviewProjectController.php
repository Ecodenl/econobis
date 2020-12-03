<?php

namespace App\Http\Controllers\Api\FinancialOverview;

use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\FinancialOverview\FinancialOverviewProject;
use App\Helpers\Delete\Models\DeleteFinancialOverviewProject;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use Illuminate\Http\Request;
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

        $data = $input->integer('financialOverviewId')->alias('financial_overview_id')->next()
            ->integer('projectId')->validate('exists:projects,id')->alias('project_id')->next()
            ->boolean('definitive')->onEmpty(false)->whenMissing(false)->next()
            ->get();

        $financialOverviewProject = new FinancialOverviewProject($data);
        $financialOverviewProject->save();

//        return Jory::on($financialOverviewProject);
        return GenericResource::make($financialOverviewProject);

    }

    public function update(RequestInput $input, FinancialOverviewProject $financialOverviewProject)
    {
        $this->authorize('manage', FinancialOverview::class);

        $data = $input->boolean('definitive')->onEmpty(false)->whenMissing(false)->next()
            ->get();

        $financialOverviewProject->fill($data);
        $financialOverviewProject->save();

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

}