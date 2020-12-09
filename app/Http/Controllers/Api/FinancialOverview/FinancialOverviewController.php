<?php

namespace App\Http\Controllers\Api\FinancialOverview;

use App\Eco\Contact\Contact;
use App\Eco\FinancialOverview\FinancialOverview;
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

    public function getFinancialOverviewContact(FinancialOverview $financialOverview, Contact $contact)
    {
        $loanTypeId = ProjectType::where('code_ref', 'loan')->first()->id;
        $obligationTypeId = ProjectType::where('code_ref', 'obligation')->first()->id;
        $capitalTypeId = ProjectType::where('code_ref', 'capital')->first()->id;
        $pcrTypeId = ProjectType::where('code_ref', 'postalcode_link_capital')->first()->id;

        $financialOverview->load([
            'administration',
            'financialOverviewProjects',
        ]);
        $financialOverviewContactTotalProjects = FinancialOverviewParticipantProject::whereHas('financialOverviewProject', function ($query) use($financialOverview){
                $query->where('definitive', true)
                ->where('financial_overview_id', $financialOverview->id);
            })
            ->whereHas('participantProject', function ($query) use($contact){
                $query->where('contact_id', $contact->id);
            })
            ->join('financial_overview_projects', 'financial_overview_project_id', '=', 'financial_overview_projects.id')
            ->join('projects', 'financial_overview_projects.project_id', '=', 'projects.id')
            ->join('participation_project', 'participant_project_id', '=', 'participation_project.id')
            ->join('project_type', 'projects.project_type_id', '=', 'project_type.id')
            ->select('project_type.code_ref', DB::raw('SUM(start_value) as total_start_value'), DB::raw('SUM(end_value) as total_end_value'))
            ->groupBy('project_type.code_ref')
            ->orderBy('project_type.id')
            ->get();

        $financialOverviewContactLoanProjects = FinancialOverviewParticipantProject::whereHas('financialOverviewProject', function ($query) use($financialOverview, $loanTypeId){
            $query->where('definitive', true)
                ->where('financial_overview_id', $financialOverview->id)
                ->whereHas('project', function ($query) use($loanTypeId){
                    $query->where('project_type_id', $loanTypeId);
                });
        })
            ->whereHas('participantProject', function ($query) use($contact){
                $query->where('contact_id', $contact->id);
            })
            ->join('financial_overview_projects', 'financial_overview_project_id', '=', 'financial_overview_projects.id')
            ->join('projects', 'financial_overview_projects.project_id', '=', 'projects.id')
            ->join('participation_project', 'participant_project_id', '=', 'participation_project.id')
            ->select('participant_project_id', 'participation_project.contact_id', 'financial_overview_projects.project_id', 'projects.name', 'start_value', 'end_value')
            ->get();

        $financialOverviewContactObligationProjects = FinancialOverviewParticipantProject::whereHas('financialOverviewProject', function ($query) use($financialOverview, $obligationTypeId){
            $query->where('definitive', true)
                ->where('financial_overview_id', $financialOverview->id)
                ->whereHas('project', function ($query) use($obligationTypeId){
                    $query->where('project_type_id', $obligationTypeId);
                });
        })
            ->whereHas('participantProject', function ($query) use($contact){
                $query->where('contact_id', $contact->id);
            })
            ->join('financial_overview_projects', 'financial_overview_project_id', '=', 'financial_overview_projects.id')
            ->join('projects', 'financial_overview_projects.project_id', '=', 'projects.id')
            ->join('participation_project', 'participant_project_id', '=', 'participation_project.id')
            ->select('participant_project_id', 'participation_project.contact_id', 'financial_overview_projects.project_id', 'projects.name', 'start_value', 'end_value')
            ->get();

        $financialOverviewContactCapitalProjects = FinancialOverviewParticipantProject::whereHas('financialOverviewProject', function ($query) use($financialOverview, $capitalTypeId){
            $query->where('definitive', true)
                ->where('financial_overview_id', $financialOverview->id)
                ->whereHas('project', function ($query) use($capitalTypeId){
                    $query->where('project_type_id', $capitalTypeId);
                });
        })
            ->whereHas('participantProject', function ($query) use($contact){
                $query->where('contact_id', $contact->id);
            })
            ->join('financial_overview_projects', 'financial_overview_project_id', '=', 'financial_overview_projects.id')
            ->join('projects', 'financial_overview_projects.project_id', '=', 'projects.id')
            ->join('participation_project', 'participant_project_id', '=', 'participation_project.id')
            ->select('participant_project_id', 'participation_project.contact_id', 'financial_overview_projects.project_id', 'projects.name', 'start_value', 'end_value')
            ->get();

        $financialOverviewContactPcrProjects = FinancialOverviewParticipantProject::whereHas('financialOverviewProject', function ($query) use($financialOverview, $pcrTypeId){
            $query->where('definitive', true)
                ->where('financial_overview_id', $financialOverview->id)
                ->whereHas('project', function ($query) use($pcrTypeId){
                    $query->where('project_type_id', $pcrTypeId);
                });
        })
            ->whereHas('participantProject', function ($query) use($contact){
                $query->where('contact_id', $contact->id);
            })
            ->join('financial_overview_projects', 'financial_overview_project_id', '=', 'financial_overview_projects.id')
            ->join('projects', 'financial_overview_projects.project_id', '=', 'projects.id')
            ->join('participation_project', 'participant_project_id', '=', 'participation_project.id')
            ->select('participant_project_id', 'participation_project.contact_id', 'financial_overview_projects.project_id', 'projects.name', 'start_value', 'end_value')
            ->get();

        $financialOverviewContact = collect([
            'financialOverview' => $financialOverview,
            'contact' => $contact,
            'financialOverviewContactTotalProjects' => $financialOverviewContactTotalProjects,
            'financialOverviewContactLoanProjects' => $financialOverviewContactLoanProjects,
            'financialOverviewContactObligationProjects' => $financialOverviewContactObligationProjects,
            'financialOverviewContactCapitalProjects' => $financialOverviewContactCapitalProjects,
            'financialOverviewContactPcrProjects' => $financialOverviewContactPcrProjects,
            ]);
        return $financialOverviewContact;
    }

    public function downloadPreview(FinancialOverview $financialOverview, Contact $contact){
        return FinancialOverviewHelper::createFinancialOverviewContactDocument($financialOverview, $contact, true);
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