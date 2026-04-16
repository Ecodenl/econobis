<?php

namespace App\Http\Controllers\Api\FinancialOverview;

use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\FinancialOverview\FinancialOverviewProject;
use App\Helpers\Delete\Models\DeleteFinancialOverview;
use App\Helpers\FinancialOverview\FinancialOverviewHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use App\Jobs\FinancialOverview\CreateFinancialOverviewParticipantProjects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            ->integer('documentTemplateFinancialOverviewId')->validate('exists:document_templates,id')->alias('document_template_financial_overview_id')->next()
            ->integer('emailTemplateFinancialOverviewId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_financial_overview_id')->next()
            ->boolean('definitive')->onEmpty(false)->whenMissing(false)->next()
            ->string('statusId')->onEmpty('in-progress')->whenMissing('in-progress')->alias('status_id')->next()
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
            ->integer('documentTemplateFinancialOverviewId')->validate('exists:document_templates,id')->alias('document_template_financial_overview_id')->next()
            ->integer('emailTemplateFinancialOverviewId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_financial_overview_id')->next()
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
        set_time_limit(120);

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
        set_time_limit(600);

        $projects = $this->getNewProjectsForFinancialOverview($financialOverview);
        if(count($projects) == 0){
            $financialOverview->status_id = 'concept';
            $financialOverview->save();

        } else {
            foreach ($projects as $project) {
                FinancialOverviewProject::create([
                    'financial_overview_id' => $financialOverview->id,
                    'project_id' => $project->id,
                    'definitive' => false,
                    'status_id' => 'in-progress',
                ]);
            }

            $financialOverviewProjects = FinancialOverviewProject::where('financial_overview_id', $financialOverview->id)->get();
            foreach ($financialOverviewProjects as $financialOverviewProject) {
                CreateFinancialOverviewParticipantProjects::dispatch($financialOverviewProject, Auth::id());
            }

        }
    }

    public function getNewProjectsForFinancialOverview(FinancialOverview $financialOverview)
    {
        return FinancialOverviewHelper::getNewProjectsForFinancialOverview($financialOverview);
    }

    public function getTotalsInfoFinancialOverview(FinancialOverview $financialOverview)
    {
        $totalsInfo = [
            'totalFinancialOverviewProjects' => $financialOverview->total_financial_overview_projects,
            'totalFinancialOverviewProjectsInProgress' => $financialOverview->total_financial_overview_projects_in_progress,
            'totalFinancialOverviewProjectsConcept' => $financialOverview->total_financial_overview_projects_concept,
            'totalFinancialOverviewProjectsDefinitive' => $financialOverview->total_financial_overview_projects_definitive,
            'totalFinancialOverviewContacts' => $financialOverview->total_financial_overview_contacts,
            'totalFinancialOverviewContactsConcept' => $financialOverview->total_financial_overview_contacts_concept,
            'totalFinancialOverviewContactsToSend' => $financialOverview->total_financial_overview_contacts_to_send,
            'totalFinancialOverviewContactsInProgress' => $financialOverview->total_financial_overview_contacts_in_progress,
            'totalFinancialOverviewContactsErrorMaking' => $financialOverview->total_financial_overview_contacts_error_making,
            'totalFinancialOverviewContactsIsSending' => $financialOverview->total_financial_overview_contacts_is_sending,
            'totalFinancialOverviewContactsErrorSending' => $financialOverview->total_financial_overview_contacts_error_sending,
            'totalFinancialOverviewContactsIsResending' => $financialOverview->total_financial_overview_contacts_is_resending,
            'totalFinancialOverviewContactsSent' => $financialOverview->total_financial_overview_contacts_sent,
        ];

        return $totalsInfo;
    }


}