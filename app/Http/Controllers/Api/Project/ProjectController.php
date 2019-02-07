<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Project;

use App\Eco\Contact\ContactStatus;
use App\Eco\Email\Email;
use App\Eco\ParticipantProject\ParticipantProjectStatus;
use App\Eco\Project\Project;
use App\Helpers\Delete\Models\DeleteProject;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Project\Grid\RequestQuery;
use App\Http\Resources\Project\FullProject;
use App\Http\Resources\Project\GridProject;
use App\Http\Resources\Project\ProjectPeek;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProjectController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $projects = $requestQuery->get();

        $projects->load([
            'projectType',
        ]);

        return GridProject::collection($projects)
            ->additional(['meta' => [
            'total' => $requestQuery->total(),
            ]
        ]);
    }

    public function show(Project $project)
    {
        $project->load([
            'projectStatus',
            'projectType',
            'ownedBy',
            'createdBy',
            'projectValueCourses.project',
            'projectValueCourses.createdBy',
            'projectRevenues.type',
            'projectRevenues.category',
            'projectRevenues.createdBy',
            'tasks',
            'documents',
            'administration',
            'requiresContactGroups',
        ]);

        $project->relatedEmailsInbox = $this->getRelatedEmails($project->id, 'inbox');
        $project->relatedEmailsSent = $this->getRelatedEmails($project->id, 'sent');

        return FullProject::make($project);
    }

    public function store(Request $request, RequestInput $requestInput)
    {

        $this->authorize('manage', Project::class);

        $data = $requestInput
            ->string('name')->validate('required')->next()
            ->string('code')->validate('required')->next()
            ->string('description')->next()
            ->integer('ownedById')->validate('required|exists:users,id')->alias('owned_by_id')->next()
            ->integer('projectStatusId')->validate('nullable|exists:project_status,id')->onEmpty(null)->alias('project_status_id')->next()
            ->integer('administrationId')->validate('nullable|exists:administrations,id')->onEmpty(null)->alias('administration_id')->next()
            ->date('dateStart')->validate('nullable|date')->onEmpty(null)->alias('date_start')->next()
            ->date('dateEnd')->validate('nullable|date')->onEmpty(null)->alias('date_end')->next()
            ->date('dateProduction')->validate('nullable|date')->onEmpty(null)->alias('date_production')->next()
            ->date('dateStartRegistrations')->validate('nullable|date')->onEmpty(null)->alias('date_start_registrations')->next()
            ->date('dateEndRegistrations')->validate('nullable|date')->onEmpty(null)->alias('date_end_registrations')->next()
            ->integer('projectTypeId')->validate('nullable|exists:project_type,id')->onEmpty(null)->alias('project_type_id')->next()
            ->string('postalCode')->alias('postal_code')->next()
            ->string('address')->next()
            ->string('city')->next()
            ->string('ean')->next()
            ->string('eanManager')->alias('ean_manager')->next()
            ->string('warrantyOrigin')->alias('warranty_origin')->next()
            ->string('eanSupply')->alias('ean_supply')->next()
            ->integer('participationWorth')->alias('participation_worth')->next()
            ->integer('powerKwAvailable')->alias('power_kw_available')->next()
            ->integer('maxParticipations')->alias('max_participations')->next()
            ->string('taxReferral')->alias('tax_referral')->next()
            ->string('postalcodeLink')->onEmpty(null)->alias('postalcode_link')->next()
            ->integer('maxParticipationsYouth')->alias('max_participations_youth')->next()
            ->integer('totalParticipations')->alias('total_participations')->next()
            ->integer('minParticipations')->alias('min_participations')->next()
            ->boolean('isMembershipRequired')->alias('is_membership_required')->next()
            ->boolean('isParticipationTransferable')->alias('is_participation_transferable')->next()
            ->integer('amountOfLoanNeeded')->alias('amount_of_loan_needed')->next()
            ->get();

        $project = new Project();

        $project->fill($data);

        $project->save();

        $contactGroupIds = explode(',', $request->contactGroupIds);

        if ($contactGroupIds[0] == '') {
            $contactGroupIds = [];
        }

        $project->requiresContactGroups()->sync($contactGroupIds);

        return $this->show($project);
    }


    public function update(Request $request, RequestInput $requestInput, Project $project)
    {
        $this->authorize('manage', Project::class);

        $data = $requestInput
            ->string('name')->validate('required')->next()
            ->string('code')->validate('required')->next()
            ->string('description')->next()
            ->integer('ownedById')->validate('required|exists:users,id')->alias('owned_by_id')->next()
            ->integer('projectStatusId')->validate('nullable|exists:project_status,id')->onEmpty(null)->alias('project_status_id')->next()
            ->integer('administrationId')->validate('nullable|exists:administrations,id')->onEmpty(null)->alias('administration_id')->next()
            ->date('dateStart')->validate('nullable|date')->onEmpty(null)->alias('date_start')->next()
            ->date('dateEnd')->validate('nullable|date')->onEmpty(null)->alias('date_end')->next()
            ->date('dateProduction')->validate('nullable|date')->onEmpty(null)->alias('date_production')->next()
            ->date('dateStartRegistrations')->validate('nullable|date')->onEmpty(null)->alias('date_start_registrations')->next()
            ->date('dateEndRegistrations')->validate('nullable|date')->onEmpty(null)->alias('date_end_registrations')->next()
            ->integer('projectTypeId')->validate('nullable|exists:project_type,id')->onEmpty(null)->alias('project_type_id')->next()
            ->string('postalCode')->alias('postal_code')->next()
            ->string('address')->next()
            ->string('city')->next()
            ->string('ean')->next()
            ->string('eanManager')->alias('ean_manager')->next()
            ->string('warrantyOrigin')->alias('warranty_origin')->next()
            ->string('eanSupply')->alias('ean_supply')->next()
            ->integer('participationWorth')->alias('participation_worth')->next()
            ->integer('powerKwAvailable')->alias('power_kw_available')->next()
            ->integer('maxParticipations')->alias('max_participations')->next()
            ->string('taxReferral')->alias('tax_referral')->next()
            ->string('postalcodeLink')->onEmpty(null)->alias('postalcode_link')->next()
            ->integer('maxParticipationsYouth')->alias('max_participations_youth')->next()
            ->integer('totalParticipations')->alias('total_participations')->next()
            ->integer('minParticipations')->alias('min_participations')->next()
            ->boolean('isMembershipRequired')->alias('is_membership_required')->next()
            ->boolean('isParticipationTransferable')->alias('is_participation_transferable')->next()
            ->integer('amountOfLoanNeeded')->alias('amount_of_loan_needed')->next()
            ->get();

        $project->fill($data);

        $project->save();

        $contactGroupIds = explode(',', $request->contactGroupIds);

        if ($contactGroupIds[0] == '') {
            $contactGroupIds = [];
        }

        $project->requiresContactGroups()->sync($contactGroupIds);

        return $this->show($project);
    }

    public function destroy(Project $project)
    {
        $this->authorize('manage', Project::class);

        try {
            DB::beginTransaction();

            $deleteProject = new DeleteProject($project);
            $result = $deleteProject->delete();

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

    public function peek()
    {
        return ProjectPeek::collection(Project::orderBy('id')->get());
    }

    public function getObligationNumbers(Project $project){
        $obligationNumbers = [];

        foreach ($project->participantsProject as $participation){
            $obligationNumbers = array_merge($obligationNumbers, $participation->obligationNumbers()->pluck('number')->toArray());
        }

        return $obligationNumbers;
    }

    public function getRelatedEmails($id, $folder)
    {
        return Email::where('project_id', $id)->where('folder', $folder)->get();
    }

    public function getActive(){
        return Project::whereIn('project_status_id', [1,2])->pluck('id');
    }

    public function getChartData(Project $project){
        $participantProjectStatuses = ParticipantProjectStatus::all();

        $chartData = [];

        foreach($participantProjectStatuses as $participantProjectStatus) {
            $chartData[] = [
                "name" => $participantProjectStatus->name,
                "count" => count($project->participantsProject) ? $project->participantsProject()->where('status_id', $participantProjectStatus->id)->count() : 0,
            ];
        };

        return ['code' => $project->code, 'data' => $chartData];
    }

    public function getChartDataParticipations(Project $project){
        $participantProjectStatuses = ParticipantProjectStatus::all();

        $chartData = [];

        foreach($participantProjectStatuses as $participantProjectStatus) {
            $total = 0;

            foreach ($project->participantsProject as $participant){
                if($participant->status_id == $participantProjectStatus->id){
                    $total += ($participant->participations_granted - $participant->participations_sold);
                }
            }
            $chartData[] = [
                "name" => $participantProjectStatus->name,
                "count" => $total,
            ];
        };

        return ['code' => $project->code, 'data' => $chartData];
    }

    public function getChartDataStatus(Project $project){
        $contactStatuses = ContactStatus::collection();

        $chartData = [];

        foreach($contactStatuses as $contactStatus) {
            $chartData[] = [
                "name" => $contactStatus->name,
                "count" => count($project->participantsProject) ? $project->participantsProject()->leftJoin('contacts', 'participation_project.contact_id', '=', 'contacts.id')->where('contacts.status_id', $contactStatus->id)->count() : 0,
            ];
        };

        return ['code' => $project->code, 'data' => $chartData];
    }
}