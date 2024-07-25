<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Project;

use App\Eco\Email\Email;
use App\Eco\Project\Project;
use App\Eco\Project\ProjectValueCourse;
use App\Helpers\Delete\Models\DeleteProject;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Project\Grid\RequestQuery;
use App\Http\Resources\Project\FullProject;
use App\Http\Resources\Project\GridProject;
use App\Http\Resources\Project\ProjectPeek;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProjectController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $this->authorize('view', Project::class);

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
        set_time_limit(60);

        $this->authorize('view', Project::class);

        $project->load([
            'projectStatus',
            'projectType',
            'projectLoanType',
            'ownedBy',
            'createdBy',
            'updatedBy',
            'projectValueCourses.project',
            'projectValueCourses.createdBy',
            'projectRevenues.category',
            'projectRevenues.createdBy',
            'revenuesKwh.createdBy',
            'tasks',
            'documents',
            'documentsNotOnPortal',
            'documentsOnPortal',
            'administration',
            'requiresContactGroups',
            'documentTemplateAgreement',
            'documentAgreeTerms',
            'documentUnderstandInfo',
            'documentProjectInfo',
            'emailTemplateAgreement',
            'questionAboutMembershipGroup',
            'memberGroup',
            'noMemberGroup',
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
            ->boolean('usesMollie')->alias('uses_mollie')->next()
            ->date('dateStart')->validate('nullable|date')->onEmpty(null)->alias('date_start')->next()
            ->date('dateEnd')->validate('nullable|date')->onEmpty(null)->alias('date_end')->next()
            ->date('dateEntry')->validate('nullable|date')->onEmpty(null)->alias('date_entry')->next()
            ->date('dateProduction')->validate('nullable|date')->onEmpty(null)->alias('date_production')->next()
            ->date('dateStartRegistrations')->validate('nullable|date')->onEmpty(null)->alias('date_start_registrations')->next()
            ->date('dateEndRegistrations')->validate('nullable|date')->onEmpty(null)->alias('date_end_registrations')->next()
            ->integer('projectTypeId')->validate('required|exists:project_type,id')->onEmpty(null)->alias('project_type_id')->next()
            ->boolean('isSceProject')->alias('is_sce_project')->next()
            ->string('baseProjectCodeRef')->alias('base_project_code_ref')->next()
            ->boolean('checkDoubleAddresses')->alias('check_double_addresses')->next()
            ->boolean('checkPostalcodeLink')->alias('check_postalcode_link')->next()
            ->boolean('hideWhenNotMatchingPostalCheck')->alias('hide_when_not_matching_postal_check')->next()
            ->boolean('disableChangeContactNameOnPortal')->alias('disable_change_contact_name_on_portal')->next()
            ->string('postalCode')->alias('postal_code')->next()
            ->string('address')->next()
            ->string('city')->next()
            ->string('ean')->next()
            ->string('eanManager')->alias('ean_manager')->next()
            ->string('warrantyOrigin')->alias('warranty_origin')->next()
            ->string('eanSupply')->alias('ean_supply')->next()
            ->double('participationWorth')->alias('participation_worth')->onEmpty('0.00')->next()
            ->integer('powerKwAvailable')->alias('power_kw_available')->next()
            ->integer('maxParticipations')->alias('max_participations')->next()
            ->string('taxReferral')->alias('tax_referral')->next()
            ->string('postalcodeLink')->onEmpty(null)->alias('postalcode_link')->next()
            ->string('addressNumberSeries')->onEmpty(null)->alias('address_number_series')->next()
            ->integer('totalParticipations')->alias('total_participations')->next()
            ->integer('minParticipations')->alias('min_participations')->next()
            ->boolean('isMembershipRequired')->alias('is_membership_required')->next()
            ->boolean('visibleForAllContacts')->alias('visible_for_all_contacts')->next()
            ->string('textInfoProjectOnlyMembers')->alias('text_info_project_only_members')->next()
            ->boolean('isParticipationTransferable')->alias('is_participation_transferable')->next()
            ->integer('loanTypeId')->validate('nullable|exists:project_loan_types,id')->onEmpty(null)->alias('loan_type_id')->next()
            ->double('amountOfLoanNeeded')->onEmpty(null)->alias('amount_of_loan_needed')->next()
            ->double('minAmountLoan')->onEmpty(null)->alias('min_amount_loan')->next()
            ->double('maxAmountLoan')->onEmpty(null)->alias('max_amount_loan')->next()
            ->integer('documentTemplateAgreementId')->validate('nullable|exists:document_templates,id')->onEmpty(null)->alias('document_template_agreement_id')->next()
            ->integer('emailTemplateAgreementId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->alias('email_template_agreement_id')->next()
            ->string('linkAgreeTerms')->alias('link_agree_terms')->next()
            ->string('linkUnderstandInfo')->alias('link_understand_info')->next()
            ->string('linkProjectInfo')->alias('link_project_info')->next()
            ->integer('documentIdAgreeTerms')->validate('nullable|exists:documents,id')->onEmpty(null)->alias('document_id_agree_terms')->next()
            ->integer('documentIdUnderstandInfo')->validate('nullable|exists:documents,id')->onEmpty(null)->alias('document_id_understand_info')->next()
            ->integer('documentIdProjectInfo')->validate('nullable|exists:documents,id')->onEmpty(null)->alias('document_id_project_info')->next()
            ->boolean('showQuestionAboutMembership')->whenMissing(false)->onEmpty(false)->alias('show_question_about_membership')->next()
            ->boolean('useTransactionCostsWithMembership')->whenMissing(false)->onEmpty(false)->alias('use_transaction_costs_with_membership')->next()
            ->integer('questionAboutMembershipGroupId')->validate('nullable|exists:contact_groups,id')->onEmpty(null)->alias('question_about_membership_group_id')->next()
            ->string('textIsMember')->alias('text_is_member')->next()
            ->string('textIsNoMember')->alias('text_is_no_member')->next()
            ->string('textBecomeMember')->alias('text_become_member')->next()
            ->integer('memberGroupId')->validate('nullable|exists:contact_groups,id')->onEmpty(null)->alias('member_group_id')->next()
            ->string('textBecomeNoMember')->alias('text_become_no_member')->next()
            ->integer('noMemberGroupId')->validate('nullable|exists:contact_groups,id')->onEmpty(null)->alias('no_member_group_id')->next()
            ->string('textAgreeTerms')->alias('text_agree_terms')->next()
            ->string('textLinkAgreeTerms')->alias('text_link_agree_terms')->next()
            ->string('textLinkUnderstandInfo')->alias('text_link_understand_info')->next()
            ->string('textAcceptAgreement')->alias('text_accept_agreement')->next()
            ->string('textAcceptAgreementQuestion')->alias('text_accept_agreement_question')->next()
            ->string('textRegistrationFinished')->alias('text_registration_finished')->next()
            ->string('textTransactionCosts')->alias('text_transaction_costs')->next()
            ->string('transactionCostsCodeRef')->whenMissing('none')->onEmpty('none')->alias('transaction_costs_code_ref')->next()
            ->double('transactionCostsAmountMin')->validate('nullable|numeric')->whenMissing(null)->alias('transaction_costs_amount_min')->next()
            ->double('transactionCostsAmountMax')->validate('nullable|numeric')->whenMissing(null)->alias('transaction_costs_amount_max')->next()
            ->double('transactionCostsAmount')->validate('nullable|numeric')->whenMissing(null)->whenMissing(null)->alias('transaction_costs_amount')->next()
            ->double('transactionCostsPercentage')->validate('nullable|numeric')->whenMissing(null)->alias('transaction_costs_percentage')->next()
            ->double('transactionCostsAmount2')->validate('nullable|numeric')->whenMissing(null)->alias('transaction_costs_amount_2')->next()
            ->double('transactionCostsPercentage2')->validate('nullable|numeric')->whenMissing(null)->alias('transaction_costs_percentage_2')->next()
            ->double('transactionCostsAmount3')->validate('nullable|numeric')->whenMissing(null)->alias('transaction_costs_amount_3')->next()
            ->double('transactionCostsPercentage3')->validate('nullable|numeric')->whenMissing(null)->alias('transaction_costs_percentage_3')->next()
            ->get();

        $project = new Project();

        $project->fill($data);

        $project->save();

        // Create project valuecourse if participationWorth is > 0
        // Only if project type is capital or postal code link capital
        if($project->participation_worth > 0) {
            if($project->projectType->code_ref != 'loan') {
                $projectValueCourse = new ProjectValueCourse();

                $projectValueCourse->fill([
                    'project_id' => $project->id,
                    'date' => Carbon::now(),
                    'book_worth' => $project->participation_worth,
                    'active' => true,
                ]);

                $projectValueCourse->save();
            }
        }

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
            ->boolean('usesMollie')->alias('uses_mollie')->next()
            ->date('dateStart')->validate('nullable|date')->onEmpty(null)->alias('date_start')->next()
            ->date('dateEnd')->validate('nullable|date')->onEmpty(null)->alias('date_end')->next()
            ->date('dateEntry')->validate('nullable|date')->onEmpty(null)->alias('date_entry')->next()
            ->date('dateProduction')->validate('nullable|date')->onEmpty(null)->alias('date_production')->next()
            ->date('dateInterestBearing')->validate('nullable|date')->onEmpty(null)->alias('date_interest_bearing')->next()
            ->date('dateInterestBearingRedemption')->validate('nullable|date')->onEmpty(null)->alias('date_interest_bearing_redemption')->next()
            ->date('dateInterestBearingKwh')->validate('nullable|date')->onEmpty(null)->alias('date_interest_bearing_kwh')->next()
            ->integer('kwhStartHighNextRevenue')->alias('kwh_start_high_next_revenue')->onEmpty(null)->next()
            ->integer('kwhStartLowNextRevenue')->alias('kwh_start_low_next_revenue')->onEmpty(null)->next()
            ->date('dateStartRegistrations')->validate('nullable|date')->onEmpty(null)->alias('date_start_registrations')->next()
            ->date('dateEndRegistrations')->validate('nullable|date')->onEmpty(null)->alias('date_end_registrations')->next()
            ->integer('projectTypeId')->validate('required|exists:project_type,id')->onEmpty(null)->alias('project_type_id')->next()
            ->boolean('isSceProject')->alias('is_sce_project')->next()
            ->string('baseProjectCodeRef')->alias('base_project_code_ref')->next()
            ->boolean('checkDoubleAddresses')->alias('check_double_addresses')->next()
            ->boolean('checkPostalcodeLink')->alias('check_postalcode_link')->next()
            ->boolean('hideWhenNotMatchingPostalCheck')->alias('hide_when_not_matching_postal_check')->next()
            ->boolean('disableChangeContactNameOnPortal')->alias('disable_change_contact_name_on_portal')->next()
            ->string('postalCode')->alias('postal_code')->next()
            ->string('address')->next()
            ->string('city')->next()
            ->string('ean')->next()
            ->string('eanManager')->alias('ean_manager')->next()
            ->string('warrantyOrigin')->alias('warranty_origin')->next()
            ->string('eanSupply')->alias('ean_supply')->next()
            ->double('participationWorth')->alias('participation_worth')->next()
            ->integer('powerKwAvailable')->alias('power_kw_available')->next()
            ->integer('maxParticipations')->alias('max_participations')->next()
            ->string('taxReferral')->alias('tax_referral')->next()
            ->string('postalcodeLink')->onEmpty(null)->alias('postalcode_link')->next()
            ->string('addressNumberSeries')->onEmpty(null)->alias('address_number_series')->next()
            ->integer('totalParticipations')->alias('total_participations')->next()
            ->integer('minParticipations')->alias('min_participations')->next()
            ->boolean('isMembershipRequired')->alias('is_membership_required')->next()
            ->boolean('visibleForAllContacts')->alias('visible_for_all_contacts')->next()
            ->string('textInfoProjectOnlyMembers')->alias('text_info_project_only_members')->next()
            ->boolean('isParticipationTransferable')->alias('is_participation_transferable')->next()
            ->integer('loanTypeId')->validate('nullable|exists:project_loan_types,id')->onEmpty(null)->alias('loan_type_id')->next()
            ->double('amountOfLoanNeeded')->onEmpty(null)->alias('amount_of_loan_needed')->next()
            ->double('minAmountLoan')->onEmpty(null)->alias('min_amount_loan')->next()
            ->double('maxAmountLoan')->onEmpty(null)->alias('max_amount_loan')->next()
            ->integer('documentTemplateAgreementId')->validate('nullable|exists:document_templates,id')->onEmpty(null)->alias('document_template_agreement_id')->next()
            ->integer('emailTemplateAgreementId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->alias('email_template_agreement_id')->next()
            ->string('linkAgreeTerms')->alias('link_agree_terms')->next()
            ->string('linkUnderstandInfo')->alias('link_understand_info')->next()
            ->string('linkProjectInfo')->alias('link_project_info')->next()
            ->integer('documentIdAgreeTerms')->validate('nullable|exists:documents,id')->onEmpty(null)->whenMissing(null)->alias('document_id_agree_terms')->next()
            ->integer('documentIdUnderstandInfo')->validate('nullable|exists:documents,id')->onEmpty(null)->whenMissing(null)->alias('document_id_understand_info')->next()
            ->integer('documentIdProjectInfo')->validate('nullable|exists:documents,id')->onEmpty(null)->whenMissing(null)->alias('document_id_project_info')->next()
            ->boolean('showQuestionAboutMembership')->whenMissing(false)->onEmpty(false)->alias('show_question_about_membership')->next()
            ->boolean('useTransactionCostsWithMembership')->whenMissing(false)->onEmpty(false)->alias('use_transaction_costs_with_membership')->next()
            ->integer('questionAboutMembershipGroupId')->validate('nullable|exists:contact_groups,id')->onEmpty(null)->alias('question_about_membership_group_id')->next()
            ->string('textIsMember')->alias('text_is_member')->next()
            ->string('textIsNoMember')->alias('text_is_no_member')->next()
            ->string('textBecomeMember')->alias('text_become_member')->next()
            ->integer('memberGroupId')->validate('nullable|exists:contact_groups,id')->onEmpty(null)->alias('member_group_id')->next()
            ->string('textBecomeNoMember')->alias('text_become_no_member')->next()
            ->integer('noMemberGroupId')->validate('nullable|exists:contact_groups,id')->onEmpty(null)->alias('no_member_group_id')->next()
            ->string('textAgreeTerms')->alias('text_agree_terms')->next()
            ->string('textLinkAgreeTerms')->alias('text_link_agree_terms')->next()
            ->string('textLinkUnderstandInfo')->alias('text_link_understand_info')->next()
            ->string('textAcceptAgreement')->alias('text_accept_agreement')->next()
            ->string('textAcceptAgreementQuestion')->alias('text_accept_agreement_question')->next()
            ->string('textRegistrationFinished')->alias('text_registration_finished')->next()
            ->string('textTransactionCosts')->alias('text_transaction_costs')->next()
            ->string('transactionCostsCodeRef')->whenMissing('none')->onEmpty('none')->alias('transaction_costs_code_ref')->next()
            ->double('transactionCostsAmountMin')->validate('nullable|numeric')->whenMissing(null)->alias('transaction_costs_amount_min')->next()
            ->double('transactionCostsAmountMax')->validate('nullable|numeric')->whenMissing(null)->alias('transaction_costs_amount_max')->next()
            ->double('transactionCostsAmount')->validate('nullable|numeric')->whenMissing(null)->alias('transaction_costs_amount')->next()
            ->double('transactionCostsPercentage')->validate('nullable|numeric')->whenMissing(null)->alias('transaction_costs_percentage')->next()
            ->double('transactionCostsAmount2')->validate('nullable|numeric')->whenMissing(null)->alias('transaction_costs_amount_2')->next()
            ->double('transactionCostsPercentage2')->validate('nullable|numeric')->whenMissing(null)->alias('transaction_costs_percentage_2')->next()
            ->double('transactionCostsAmount3')->validate('nullable|numeric')->whenMissing(null)->alias('transaction_costs_amount_3')->next()
            ->double('transactionCostsPercentage3')->validate('nullable|numeric')->whenMissing(null)->alias('transaction_costs_percentage_3')->next()
            ->get();

        $project->fill($data);

        DB::transaction(function () use ($request, $project) {
            $participationWorthChanged = $project->isDirty(['participation_worth']);

            $project->save();
            if($participationWorthChanged){
//todo WM: Bij veel deelnemers loopt hij hier nu tegen timelimit van 30sec aan.
//         Deze procedure zullen we nog moeten ombouwen naar verwerking in job(s).
                foreach ($project->participantsProject as $participantProject){
                    $participantProject->participations_definitive_worth = $participantProject->calculator()->participationsDefinitiveWorth();
                    if($project->projectType->code_ref == 'capital' || $project->projectType->code_ref == 'postalcode_link_capital') {
                        $participantProject->participations_capital_worth = $participantProject->calculator()->participationsCapitalWorth();
                    }
                    $participantProject->save();
                }

                // Create project valuecourse if participationWorth changed and no valuecourse with bookworth is filled out
                // Only if project type is capital or postal code link capital
                if($project->projectType->code_ref != 'loan') {
                    $projectValueCourseWithBookWorthCount = $project->projectValueCourses->where('book_worth', '>', '0')->count();

                    if($projectValueCourseWithBookWorthCount === 0) {
                        $projectValueCourse = new ProjectValueCourse();

                        $projectValueCourse->fill([
                            'project_id' => $project->id,
                            'date' => Carbon::now(),
                            'book_worth' => $project->participation_worth,
                            'active' => true,
                        ]);

                        $projectValueCourse->save();
                    }
                }
            }

            $contactGroupIds = explode(',', $request->contactGroupIds);

            if ($contactGroupIds[0] == '') {
                $contactGroupIds = [];
            }

            $project->requiresContactGroups()->sync($contactGroupIds);
//todo WM: Dit is overbodig hier. Herberekenen participantsprojects is alleen
//         noodzakelijk als nominale waarde wijzigt. Herberekekingenn daarvoor
//         zijn hierboven al gedaan in eerdere foreach project->participantsProject lus.
//         Bij veel deelnemers loopt hij daar nu overigens al tegen timelimit van 30sec aan.
//         Die procedure zullen we nog moeten ombouwen naar verwerking in job(s).
//            foreach ($project->participantsProject as $participantProject){
//                // Herbereken de afhankelijke gegevens op het participantProject
//                $participantProject->calculator()->run()->save();
//            }

            // Herbereken de afhankelijke gegevens op het project
            $project->calculator()->run()->save();

        });

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
//        $this->authorize('view', Project::class);
        if(Auth::user()->hasPermissionTo('view_project', 'api')){
            $projects = Project::orderBy('name')->orderBy('id')->get();
        } else {
            $projects = new Collection();
        }

        $projects->load(['projectType']);

        return ProjectPeek::collection($projects);
    }

    public function getObligationNumbers(Project $project)
    {
        $this->authorize('view', Project::class);

        $obligationNumbers = [];

        foreach ($project->participantsProject as $participation){
            $obligationNumbers = array_merge($obligationNumbers, $participation->obligationNumbers()->pluck('number')->toArray());
        }

        return $obligationNumbers;
    }

    public function getRelatedEmails($id, $folder)
    {
        $this->authorize('view', Project::class);

        return Email::where('project_id', $id)->where('folder', $folder)->get();
    }

    public function getActive(){
        $this->authorize('view', Project::class);

        return Project::whereIn('project_status_id', [1,2])->pluck('id');
    }

    public function getChartData(Project $project){
        $this->authorize('view', Project::class);

        //TODO fixing chart data
//        $participantProjectStatuses = ParticipantProjectStatus::all();
//
//        $chartData = [];
//
//        foreach($participantProjectStatuses as $participantProjectStatus) {
//            $chartData[] = [
//                "name" => $participantProjectStatus->name,
//                "count" => count($project->participantsProject) ? $project->participantsProject()->where('status_id', $participantProjectStatus->id)->count() : 0,
//            ];
//        };

        return ['code' => $project->code, 'data' => null];
    }

    public function getChartDataParticipations(Project $project){
        $this->authorize('view', Project::class);

        //TODO fixing chart data
//        $participantProjectStatuses = ParticipantProjectStatus::all();
//
//        $chartData = [];
//
//        foreach($participantProjectStatuses as $participantProjectStatus) {
//            $total = 0;
//
//            foreach ($project->participantsProject as $participant){
//                if($participant->status_id == $participantProjectStatus->id){
//                    $total += ($participant->participations_granted - $participant->participations_sold);
//                }
//            }
//            $chartData[] = [
//                "name" => $participantProjectStatus->name,
//                "count" => $total,
//            ];
//        };

        return ['code' => $project->code, 'data' => null];
    }

    public function getChartDataStatus(Project $project){
        $this->authorize('view', Project::class);

        //TODO fixing chart data

//        $contactStatuses = ContactStatus::collection();
//
//        $chartData = [];
//
//        foreach($contactStatuses as $contactStatus) {
//            $chartData[] = [
//                "name" => $contactStatus->name,
//                "count" => count($project->participantsProject) ? $project->participantsProject()->leftJoin('contacts', 'participation_project.contact_id', '=', 'contacts.id')->where('contacts.status_id', $contactStatus->id)->count() : 0,
//            ];
//        };

        return ['code' => $project->code, 'data' => null];
    }
}