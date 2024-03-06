<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\ParticipationProject;

use App\Eco\Address\Address;
use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\ContactGroup\DynamicContactGroupFilter;
use App\Eco\Document\Document;
use App\Eco\Document\DocumentCreatedFrom;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\Email\Email;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\FinancialOverview\FinancialOverviewProject;
use App\Eco\Mailbox\Mailbox;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\ParticipantProject\ParticipantProjectPayoutType;
use App\Eco\ParticipantProject\ParticipantProjectStatus;
use App\Eco\Project\Project;
use App\Eco\Project\ProjectRevenueCategory;
use App\Eco\Project\ProjectValueCourse;
use App\Helpers\Address\AddressHelper;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Helpers\Delete\Models\DeleteParticipation;
use App\Helpers\Excel\ParticipantExcelHelper;
use App\Helpers\Excel\ParticipantExcelHelperHelper;
use App\Helpers\Project\RevenuesKwhHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Template\TemplateTableHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\FinancialOverview\FinancialOverviewParticipantProjectController;
use App\Http\Controllers\Api\ParticipantMutation\ParticipantMutationController;
use App\Http\Controllers\Api\Project\ProjectRevenueController;
use App\Http\RequestQueries\ParticipantProject\Grid\RequestQuery;
use App\Http\Resources\Contact\ContactPeek;
use App\Http\Resources\ContactGroup\FullContactGroup;
use App\Http\Resources\ParticipantProject\FullParticipantProject;
use App\Http\Resources\ParticipantProject\GridParticipantProject;
use App\Http\Resources\ParticipantProject\ParticipantProjectPeek;
use App\Http\Resources\ParticipantProject\Templates\ParticipantReportMail;
use App\Jobs\ParticipationProject\CreateParticipantReport;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class ParticipationProjectController extends ApiController
{
    public function grid(RequestQuery $requestQuery)
    {
        $this->authorize('view', ParticipantProject::class);

        $participantProject = $requestQuery->get();
        $participantProject->load([
            'address.currentAddressEnergySupplierElectricity.energySupplier',
            'contact.primaryAddress',
            'contact.primaryEmailAddress',
            'project',
    ]);

        return GridParticipantProject::collection($participantProject)
            ->additional(['meta' => [
                'total' => $requestQuery->total(),
                'participantIdsTotal' => $requestQuery->totalIds(),
            ]
            ]);
    }

    public function saveAsGroup(Request $request)
    {
        $this->authorize('manage', ParticipantProject::class);

        $filters = json_decode($request->input('filters'));
        $extraFilters = json_decode($request->input('extraFilters'));

        $contactGroup = new ContactGroup();
        $contactGroup->type_id = 'dynamic';
        $contactGroup->composed_of = 'participants';
        $contactGroup->name =  ContactGroup::getAutoIncrementedName('Dynamische groep');
        $contactGroup->description = '';
        $contactGroup->dynamic_filter_type = $request->input('filterType') ? $request->input('filterType') : 'and';
        $contactGroup->save();

        if($filters) {
            foreach ($filters as $filter) {
                $dynamicFilter = new DynamicContactGroupFilter();
                $dynamicFilter->contact_group_id = $contactGroup->id;
                $dynamicFilter->field = $filter->field;
                $dynamicFilter->comperator = '';
                $dynamicFilter->data = $filter->data;
                $dynamicFilter->type = 'filter';
                $dynamicFilter->model_name = $this->getModelByField($filter->field);
                $dynamicFilter->save();
            }
        }

        if($extraFilters) {
            foreach ($extraFilters as $k => $extraFilter) {
                //From a project the extra filter with the project should be saved as a normal filter, to avoid errors in 'and' or 'or' filtering.
                if(json_decode($request->input('saveFromProject')) == true && $k === 0){
                    $dynamicFilter = new DynamicContactGroupFilter();
                    $dynamicFilter->contact_group_id = $contactGroup->id;
                    $dynamicFilter->field = $extraFilter->field;
                    $dynamicFilter->comperator = $extraFilter->type;
                    $dynamicFilter->data = $extraFilter->data;
                    $dynamicFilter->type = 'filter';
                    $dynamicFilter->model_name = $this->getModelByField($extraFilter->field);
                    $dynamicFilter->save();
                }
                else {
                    $dynamicFilter = new DynamicContactGroupFilter();
                    $dynamicFilter->contact_group_id = $contactGroup->id;
                    $dynamicFilter->field = $extraFilter->field;
                    $dynamicFilter->comperator = $extraFilter->type;
                    $dynamicFilter->data = $extraFilter->data;
                    $dynamicFilter->type = 'extraFilter';
                    $dynamicFilter->model_name = $this->getModelByField($extraFilter->field);
                    $dynamicFilter->save();
                }
            }
        }
        return FullContactGroup::make($contactGroup);
    }

    public function excel(RequestQuery $requestQuery, Request $request)
    {
        $this->authorize('view', ParticipantProject::class);

        set_time_limit(0);

        $filterProjectId = $request->input('filterProjectId');

        $participants = $requestQuery->getQuery()->get();

        $participants->load([
            'contact.person.title',
            'contact.organisation',
            'contact.contactPerson.contact.person.title',
            'contact.contactPerson.contact.primaryEmailaddress',
            'contact.contactPerson.contact.primaryphoneNumber',
            'contact.contactPerson.occupation',
            'contact.legalRepContact.contact.person.title',
            'contact.legalRepContact.contact.primaryEmailaddress',
            'contact.legalRepContact.contact.primaryphoneNumber',
            'contact.legalRepContact.occupation',
            'contact.addresses',
            'contact.emailAddresses',
            'contact.primaryEmailAddress',
            'contact.primaryphoneNumber',
            'contact.primaryAddress.country',
            'address.currentAddressEnergySupplierElectricity.energySupplier',
            'giftedByContact',
            'legalRepContact',
            'project',
            'participantProjectPayoutType',
            'mutations.statusLog',
            'mutations.status',
            'mutations.type',
        ]);

        $participantExcelHelper = new ParticipantExcelHelper($participants, $filterProjectId);

        return $participantExcelHelper->downloadExcel();
    }

    public function excelParticipants(RequestQuery $requestQuery, Request $request)
    {
        $this->authorize('view', ParticipantProject::class);

        set_time_limit(0);

        $filterProjectId = $request->input('filterProjectId');

        $participants = $requestQuery->getQuery()->get();

        $participants->load([
            'contact.person.title',
            'contact.organisation',
            'contact.contactPerson.contact.person.title',
            'contact.contactPerson.contact.primaryEmailaddress',
            'contact.contactPerson.contact.primaryphoneNumber',
            'contact.contactPerson.occupation',
            'contact.primaryEmailAddress',
            'contact.primaryphoneNumber',
            'contact.primaryAddress',
            'contact.primaryAddress.country',
            'project',
            'participantProjectPayoutType',
        ]);

        $participantExcelHelper = new ParticipantExcelHelper($participants, $filterProjectId);

        return $participantExcelHelper->downloadExcelParticipants();
    }

    public function show(ParticipantProject $participantProject)
    {
        set_time_limit(120);

        $this->authorize('view', ParticipantProject::class);

        $participantProject->load([
            'mutations' => function($query){
                $query->orderBy('id', 'desc');
            },
        ]);
        $participantProject->load([
            'contact',
            'contact.primaryAddress',
            'address.currentAddressEnergySupplierElectricity',
            'project.administration',
            'projectRevenues.type',
            'projectRevenues.category',
            'projectRevenues.createdBy',
            'revenuesKwh.createdBy',
            'participantProjectPayoutType',
            'projectRevenues',
            'revenuesKwh',
            'giftedByContact',
            'legalRepContact',
            'mutations.type',
            'mutations.status',
            'mutations.statusLog',
            'mutations.molliePayments',
            'mutations.createdBy',
            'mutations.updatedBy',
            'obligationNumbers',
            'documents',
            'documentsNotOnPortal',
            'documentsOnPortal',
            'createdBy',
            'updatedBy',
        ]);

        return FullParticipantProject::make($participantProject);
    }

    public function store(RequestInput $requestInput)
    {
        $this->authorize('manage', ParticipantProject::class);

        // TODO clean up store inputs
        $data = $requestInput
            ->integer('contactId')->validate('required|exists:contacts,id')->alias('contact_id')->next()
            ->integer('addressId')->validate('nullable|exists:addresses,id')->alias('address_id')->next()
            ->integer('projectId')->validate('required|exists:projects,id')->alias('project_id')->next()
            ->get();

        $participantProject = new ParticipantProject();

        $participantProject->fill($data);

        $project = Project::find($participantProject->project_id);
        $contact = Contact::find($participantProject->contact_id);
        $address = Address::find($participantProject->address_id);

        if($project->check_double_addresses){
            $errors = [];

            $addressHelper = new AddressHelper($contact, $address);
            $addressIsDouble = $addressHelper->checkDoubleAddress($project);
            if($addressIsDouble){
                $errors[] = 'Er is al een deelnemer ingeschreven op dit adres die meedoet aan een SCE project.';
                return ['id' => 0, 'message' => $errors];
            }
        }

        $participantProject->save();

        // Loan / Obligation: Default type id is account.
        if($project->projectType->code_ref == 'loan' ||$project->projectType->code_ref == 'obligation'){
            $participantProject->type_id = ParticipantProjectPayoutType::where('code_ref', 'account')->value('id');
            $participantProject->save();
        }

        // Create first mutation
        $this->storeFirstMutation($requestInput, $participantProject, $project);

        // Indien participation project in concept waardestaat / waardestaten, dan die herberekenen.
        $this->recalculateParticipantProjectForFinancialOverviews($participantProject);

        $message = [];

        if($project->is_membership_required){
            $hasGroup = false;

            foreach($project->requiresContactGroups as $contactGroup) {
                if ($hasGroup) {
                    break;
                }
                foreach ($contactGroup->all_contacts as $contactGroupContact) {
                    if ($contactGroupContact->id = $contact->id) {
                        $hasGroup = true;
                    }
                    if ($hasGroup) {
                        break;
                    }
                }
            }
            if(!$hasGroup){
                $message[] = 'Contact zit niet in de benodigde groep.';
            }
        }

        if($project->projectType->code_ref === 'postalcode_link_capital'){
            $this->validatePostalCode($message, $project, $contact, $address);
            $this->validateUsage($message, $project, $participantProject);
            $this->validateEnergySupplier($message, $address);
            return ['id' => $participantProject->id, 'message' => $message];
        }
        if($project->check_postalcode_link && $project->is_sce_project){
            $this->validatePostalCode($message, $project, $contact, $address);
            return ['id' => $participantProject->id, 'message' => $message];
        }

        return ['id' => $participantProject->id];
    }


    public function update(RequestInput $requestInput, ParticipantProject $participantProject)
    {
        $this->authorize('manage', ParticipantProject::class);

        $data = $requestInput
            ->boolean('didAcceptAgreement')->alias('did_accept_agreement')->next()
            ->date('dateDidAcceptAgreement')->validate('date')->alias('date_did_accept_agreement')->next()
            ->boolean('didUnderstandInfo')->alias('did_understand_info')->next()
            ->date('dateDidUnderstandInfo')->validate('date')->alias('date_did_understand_info')->next()
            ->integer('choiceMembership')->onEmpty(null)->alias('choice_membership')->next()
            ->integer('giftedByContactId')->validate('nullable|exists:contacts,id')->onEmpty(null)->alias('gifted_by_contact_id')->next()
            ->string('ibanPayout')->alias('iban_payout')->next()
            ->integer('legalRepContactId')->validate('nullable|exists:contacts,id')->onEmpty(null)->alias('legal_rep_contact_id')->next()
            ->string('ibanPayoutAttn')->alias('iban_payout_attn')->next()
            ->integer('typeId')->validate('nullable|exists:participant_project_payout_type,id')->onEmpty(null)->alias('type_id')->next()
            ->integer('powerKwhConsumption')->alias('power_kwh_consumption')->next()
            ->get();

        $participantProject->fill($data);

        $participantProject->save();

        // Herbereken de afhankelijke gegevens op het participantProject
        $participantProject->calculator()->run()->save();

        // Herbereken de afhankelijke gegevens op het project
        $participantProject->project->calculator()->run()->save();

        // Indien participation project in concept waardestaat / waardestaten, dan die herberekenen.
        $this->recalculateParticipantProjectForFinancialOverviews($participantProject);

        return $this->show($participantProject);
    }

//    public function transfer(RequestInput $requestInput)
//    {
//        $this->authorize('manage', ParticipantProject::class);
//
//        $data = $requestInput
//            ->integer('participationId')->validate('required|exists:participation_project,id')->alias('participation_id')->next()
//            ->integer('transferToContactId')->validate('required')->alias('transfer_to_contact_id')->next()
//            ->integer('participationsAmount')->alias('participations_amount')->next()
//            ->integer('participationWorth')->alias('participation_worth')->next()
//            ->integer('didSign')->next()
//            ->date('dateBook')->validate('nullable|date')->onEmpty(null)->alias('date_book')->next()
//            ->get();
//
//        $participation = ParticipantProject::find($data['participation_id']);
//
//        $projectId = $participation->project->id;
//
//        $participation->participations_sold = $participation->participations_sold + $data['participations_amount'];
//        $participation->save();
//
//        //if 0 then participations are lost
//        if($data['transfer_to_contact_id'] != 0){
//            //add participations to other contact
//            if(ParticipantProject::where('project_id', $projectId)->where('contact_id', $data['transfer_to_contact_id'])->exists()){
//                $participationReceiving = ParticipantProject::where('project_id', $projectId)->where('contact_id', $data['transfer_to_contact_id'])->first();
//                $participationReceiving->participations_granted = $participationReceiving->participations_granted + $data['participations_amount'];
//                $participationReceiving->save();
//            }
//            //else create new one
//            else{
//                $participationReceiving = new ParticipantProject();
//                $participationReceiving->contact_id = $data['transfer_to_contact_id'];
//                $participationReceiving->status_id = 2;//Definitief
//                $participationReceiving->project_id = $projectId;
//                $participationReceiving->type_id = 1;//Rekening
//                $participationReceiving->participations_granted = $data['participations_amount'];
//                $participationReceiving->save();
//            }
//
//            //create new transaction for receiving
//            $transactionReceiving = new ParticipantTransaction();
//            $transactionReceiving->participation_id = $participationReceiving->id;
//            $transactionReceiving->type_id = 1;//Inleg
//            $transactionReceiving->date_transaction = new Carbon;
//            $transactionReceiving->amount = $data['participations_amount'] * $data['participation_worth'];
//            $transactionReceiving->date_booking = $data['date_book'] ;
//            $transactionReceiving->save();
//
//        }
//
//        //create transaction for sending
//        $transactionSending = new ParticipantTransaction();
//        $transactionSending->participation_id = $participation->id;
//        $transactionSending->type_id = 3;//Inleg
//        $transactionSending->date_transaction = new Carbon;
//        $transactionSending->amount = $data['participations_amount'] * $data['participation_worth'];
//        $transactionSending->date_booking = $data['date_book'] ;
//        $transactionSending->save();
//
//        return $this->show($participation);
//    }

    public function destroy(ParticipantProject $participantProject)
    {
        $this->authorize('manage', ParticipantProject::class);

        try {
            DB::beginTransaction();

            $deleteParticipation = new DeleteParticipation($participantProject);
            $result = $deleteParticipation->delete();

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

    public function terminate(ParticipantProject $participantProject, RequestInput $requestInput)
    {
        $this->authorize('manage', ParticipantProject::class);

        $data = $requestInput
            ->date('dateTerminated')->validate('date')->alias('date_terminated')->next()
            ->double('payPercentage')->validate('nullable')->onEmpty(null)->alias('pay_percentage')->next()
            ->get();

        // Set terminated date
        $participantProject->date_terminated = $data['date_terminated'];
        $payPercentage = $data['pay_percentage'];

        $projectType = $participantProject->project->projectType;
        DB::transaction(function () use ($participantProject, $payPercentage, $projectType) {
            $participantProject->save();
            $this->recalculateParticipantProjectForFinancialOverviews($participantProject);

            // If Payout percentage is filled then make a result mutation (not when capital or postalcode_link_capital)
            if ($payPercentage && $projectType->code_ref !== 'capital' && $projectType->code_ref !== 'postalcode_link_capital') {
                // Calculate result from last revenue distribution till date terminate
                $this->createMutationResult($participantProject, $payPercentage, $projectType);
            }
            // Make mutation withdrawal of total participations/loan
            $this->createMutationWithDrawal($participantProject, $projectType);

            if($payPercentage) {
                // Remove distributions on active concept Euro and Redemption revenue(s)
                $projectRevenueCategoryRevenueEuro = ProjectRevenueCategory::where('code_ref', 'revenueEuro' )->first()->id;
                $projectRevenueCategoryRedemptionEuro = ProjectRevenueCategory::where('code_ref', 'redemptionEuro' )->first()->id;

                $participantProject->projectRevenueDistributions()
                    ->where('status', 'concept')
                    ->whereHas('revenue', function ($query) use($projectRevenueCategoryRevenueEuro, $projectRevenueCategoryRedemptionEuro) {
                        $query->where('confirmed', false)->whereIn('category_id', [$projectRevenueCategoryRevenueEuro, $projectRevenueCategoryRedemptionEuro]);
                    })
                ->forceDelete();
            }
        });

        if($projectType->code_ref === 'postalcode_link_capital') {
            $revenuesKwhHelper = new RevenuesKwhHelper();
            $revenuesKwhPart = $revenuesKwhHelper->checkAndSplitRevenuePartsKwh($participantProject, Carbon::parse($participantProject->date_terminated)->addDay(), null);

            if($revenuesKwhPart){
                $revenuePartsKwhRedirect = null;
                if($revenuesKwhPart['success'] && $revenuesKwhPart['newRevenue'] ){
                    $revenuePartsKwhRedirect = 'project/opbrengst-kwh/nieuw/' . $revenuesKwhPart['projectId']  . '/1';
                }
                if($revenuesKwhPart['success'] && !$revenuesKwhPart['newRevenue'] ){
                    $revenuePartsKwhRedirect = '/project/opbrengst-kwh/' . $revenuesKwhPart['revenuesId']  . '/deelperiode/' . $revenuesKwhPart['revenuePartsId'];
                }
                $responseParticipations = ['hasParticipations' => true, 'revenuePartsKwhRedirect' => $revenuePartsKwhRedirect,  'projectsArray' => $revenuesKwhPart];
            }else{
                $responseParticipations = ['hasParticipations' => false, null, 'projectsArray' => []];
            }

            return $responseParticipations;
        }

    }
    public function terminateObligation(ParticipantProject $participantProject, RequestInput $requestInput)
    {
        $this->authorize('manage', ParticipantProject::class);

        DB::transaction(function () use ($participantProject, $requestInput) {

            $data = $requestInput
                ->date('dateTerminated')->validate('date')->alias('date_terminated')->next()
                ->get();

            // Set terminated date
            $participantProject->date_terminated = $data['date_terminated'];
            $participantProject->save();
            $this->recalculateParticipantProjectForFinancialOverviews($participantProject);

            $projectType = $participantProject->project->projectType;

            if($participantProject->participations_definitive != 0){
                // Make new projectRevenue
                $projectRevenueController = new ProjectRevenueController();
                $projectRevenueController->storeForParticipant($requestInput, $participantProject);

                // Make mutation withdrawal of total participations/loan
                $this->createMutationWithDrawal($participantProject, $projectType);
            }

            // Remove distributions on active concept Euro and Redemption revenue(s)
            $projectRevenueCategoryRevenueEuro = ProjectRevenueCategory::where('code_ref', 'revenueEuro' )->first()->id;
            $projectRevenueCategoryRedemptionEuro = ProjectRevenueCategory::where('code_ref', 'redemptionEuro' )->first()->id;

            $participantProject->projectRevenueDistributions()
                ->where('status', 'concept')
                ->whereHas('revenue', function ($query) use($projectRevenueCategoryRevenueEuro, $projectRevenueCategoryRedemptionEuro) {
                    $query->where('confirmed', false)->whereIn('category_id', [$projectRevenueCategoryRevenueEuro, $projectRevenueCategoryRedemptionEuro]);
                })
                ->forceDelete();

        });

    }

    public function undoTerminate(ParticipantProject $participantProject, RequestInput $requestInput)
    {
        $this->authorize('manage', ParticipantProject::class);

        $data = $requestInput
            ->date('dateTerminated')->validate('nullable|date')->alias('date_terminated')->whenMissing(null)->next()
            ->get();

        // Set terminated date
        $participantProject->date_terminated = $data['date_terminated'];

        DB::transaction(function () use ($participantProject) {
            $participantProject->save();
            $this->recalculateParticipantProjectForFinancialOverviews($participantProject);
        });
    }

    public function peek()
    {
        $participants = ParticipantProject::orderBy('project_id')->get();
        $participants->load(['contact', 'project']);
        $sortedParticipants = $participants->sortBy(function($item) {
            return $item->project_id.'-'.$item->contact->full_name;
        }, SORT_NATURAL|SORT_FLAG_CASE)->values()->all();
        return ParticipantProjectPeek::collection($sortedParticipants);
    }

    public function previewPDF(Request $request, DocumentTemplate $documentTemplate) {
        $this->authorize('view', ParticipantProject::class);

        $participantIds = $request->input('participantIds');

        //get current logged in user
        $user = Auth::user();

        //load template parts
        $documentTemplate->load('footer', 'baseTemplate', 'header');

        $html = $documentTemplate->header ? $documentTemplate->header->html_body : '';

        if ($documentTemplate->baseTemplate) {
            $html .= TemplateVariableHelper::replaceTemplateTagVariable($documentTemplate->baseTemplate->html_body,
                $documentTemplate->html_body, '','');
        } else {
            $html .= TemplateVariableHelper::replaceTemplateFreeTextVariables($documentTemplate->html_body,
                '', '');
        }

        $html .= $documentTemplate->footer ? $documentTemplate->footer->html_body : '';

        foreach ($participantIds as $participantId) {
            $participant = ParticipantProject::find($participantId);
            $contact = $participant->contact;
            $project = $participant->project;

            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($html, 'contact', $contact);
            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'project', $project);
            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'deelname', $participant);
            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'mutaties',
                $participant->mutations);
            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'ik', $user);
            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml, 'portal');
            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml, 'contacten_portal');
            $revenueHtml = TemplateVariableHelper::replaceTemplateCooperativeVariables($revenueHtml, 'cooperatie');
            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'administratie',
                $project->administration);

            $revenueHtml = TemplateVariableHelper::stripRemainingVariableTags($revenueHtml);

            //if preview there is 1 participantId so we return
            $pdf = PDF::loadView('documents.generic', [
                'html' => $revenueHtml,
            ])->output();

            return $pdf;
        }
        return null;
    }

    public function previewEmail(Request $request, EmailTemplate $emailTemplate) {
        $this->authorize('view', ParticipantProject::class);

        $participantIds = $request->input('participantIds');
        $subject = $request->input('subject');
        $portalName = PortalSettings::get('portalName');
        $cooperativeName = PortalSettings::get('cooperativeName');
        $subject = str_replace('{cooperatie_portal_naam}', $portalName, $subject);
        $subject = str_replace('{cooperatie_naam}', $cooperativeName, $subject);

        //get current logged in user
        $user = Auth::user();

        foreach ($participantIds as $participantId) {
            $participant = ParticipantProject::find($participantId);

            $contact = $participant->contact;
            $primaryEmailAddress = $contact->primaryEmailAddress;

            $project = $participant->project;

            //send email
            if ($primaryEmailAddress) {
                $email = Mail::to($primaryEmailAddress->email);
                if (!$subject) {
                    $subject = 'Participant rapportage Econobis';
                }

                $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'project', $project);

                $email->subject = $subject;

                $email->html_body
                    = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
                    . $subject . '</title></head>'
                    . $emailTemplate->html_body . '</html>';

                $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body,
                    $contact);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'contact',
                    $contact);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBodyWithContactVariables,
                    'portal');
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBodyWithContactVariables,
                    'contacten_portal');
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateCooperativeVariables($htmlBodyWithContactVariables,
                    'cooperatie');
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'ik', $user);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'project',
                    $project);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'deelname',
                    $participant);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'mutaties',
                    $participant->mutations);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables,
                    'administratie', $project->administration);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);

                $mailbox = $this->getMailboxByParticipant($participant);
                if ($mailbox) {
                    $fromEmail = $mailbox->email;
                } else {
                    $fromEmail = \Config::get('mail.from.address');
                }

                return [
                    'from' => $fromEmail,
                    'to' => $primaryEmailAddress->email,
                    'subject' => $subject,
                    'htmlBody' => $htmlBodyWithContactVariables
                ];
            }
        }
        return null;
    }

    public function createParticipantReportNoPDF(Request $request, EmailTemplate $emailTemplate)
    {
        $this->createParticipantReport($request, null, $emailTemplate);
        return null;
    }

    public function createParticipantReport(Request $request, ?DocumentTemplate $documentTemplate, EmailTemplate $emailTemplate)
    {

        $this->authorize('manage', ParticipantProject::class);

        set_time_limit(0);
        $participantIds = $request->input('participantIds');
        $subject = $request->input('subject');
        $showOnPortal = $request->input('showOnPortal');

        $participantProject = ParticipantProject::find($participantIds[0]);
        $project = $participantProject->project;

        $mailbox = optional($project->administration)->mailbox ? $project->administration->mailbox : Mailbox::getDefault();

        $emailModel = null;
        if($mailbox){
            /**
             * Email model aanmaken zodat de email ook zichtbaar wordt onder verzonden items.
             * Dit is één gezamenlijke email voor alle ontvangers.
             *
             * De ontvangers worden later per succesvolle job aan deze mail toegevoegd.
             */
            $emailModel = new Email([
                'mailbox_id' => $mailbox->id,
                'from' => $mailbox->email,
                'to' => [],
                'cc' => [],
                'bcc' => [],
                'subject' => $subject,
                'html_body' => $emailTemplate->html_body,
                'folder' => 'sent',
                'date_sent' => Carbon::now(),
                'project_id' => $project->id,
                'sent_by_user_id' => Auth::id(),
            ]);
            $emailModel->save();
        }

        foreach($participantIds as $participantId) {
            CreateParticipantReport::dispatch($participantId, $subject, $documentTemplate ? $documentTemplate->id : null, $emailTemplate->id, $showOnPortal, Auth::id(), $emailModel);
        }

        return null;
    }

    public function createParticipantProjectReport($subject, $participantId, ?DocumentTemplate $documentTemplate, EmailTemplate $emailTemplate, $showOnPortal)
    {
        $this->authorize('manage', ParticipantProject::class);

        $portalName = PortalSettings::get('portalName');
        $cooperativeName = PortalSettings::get('cooperativeName');
        $subject = str_replace('{cooperatie_portal_naam}', $portalName, $subject);
        $subject = str_replace('{cooperatie_naam}', $cooperativeName, $subject);

        //get current logged in user
        $user = Auth::user();

        $messages = [];

        $participant = ParticipantProject::find($participantId);
        $contact = $participant->contact;
        $project = $participant->project;
        $primaryEmailAddress = $contact->primaryEmailAddress;

        $document = null;

        if($documentTemplate) {
            //load template parts
            $documentTemplate->load('footer', 'baseTemplate', 'header');

            $html = $documentTemplate->header ? $documentTemplate->header->html_body : '';

            if ($documentTemplate->baseTemplate) {
                $html .= TemplateVariableHelper::replaceTemplateTagVariable($documentTemplate->baseTemplate->html_body,
                    $documentTemplate->html_body, '','');
            } else {
                $html .= TemplateVariableHelper::replaceTemplateFreeTextVariables($documentTemplate->html_body,
                    '', '');
            }

            $html .= $documentTemplate->footer ? $documentTemplate->footer->html_body : '';

            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($html, 'contact', $contact);
            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'project', $project);
            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'deelname', $participant);
            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'mutaties',
                $participant->mutations);
            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'ik', $user);
            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml, 'portal');
            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml, 'contacten_portal');
            $revenueHtml = TemplateVariableHelper::replaceTemplateCooperativeVariables($revenueHtml, 'cooperatie');
            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'administratie',
                $project->administration);

            $revenueHtml = TemplateVariableHelper::stripRemainingVariableTags($revenueHtml);

            //if preview there is 1 participantId so we return
            $pdf = PDF::loadView('documents.generic', [
                'html' => $revenueHtml,
            ])->output();

            try
            {
                $time = Carbon::now();

                $documentCreatedFromParticipantId = DocumentCreatedFrom::where('code_ref', 'participant')->first()->id;

                $document = new Document();
                $document->document_created_from_id = $documentCreatedFromParticipantId;
                $document->document_type = 'internal';
                $document->document_group = $documentTemplate->document_group;
                $document->contact_id = $contact->id;
                $document->project_id = $project->id;
                $document->participation_project_id = $participant->id;
                $document->template_id = $documentTemplate->id;
                $document->show_on_portal = $showOnPortal;

                $filename = str_replace(' ', '', $this->translateToValidCharacterSet($project->code)) . '_' . str_replace(' ', '', $this->translateToValidCharacterSet($contact->full_name));

                //max length name 25
                $filename = substr($filename, 0, 25);

                $document->filename = $filename  . substr($document->getDocumentGroup()->name, 0, 1) . (Document::where('document_group', 'revenue')->count() + 1) . '_' .  $time->format('Ymd') . '.pdf';

                $document->save();

                $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'documents' . DIRECTORY_SEPARATOR . $document->filename));

                file_put_contents($filePath, $pdf);

                if(\Config::get('app.ALFRESCO_COOP_USERNAME') != 'local') {
                    $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));
                    $alfrescoResponse = $alfrescoHelper->createFile($filePath, $document->filename, $document->getDocumentGroup()->name);
                    $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
                }else{
                    $document->alfresco_node_id = null;
                }

                $document->save();
            } catch (\Exception $e) {
                Log::error('Fout bij maken rapport document voor ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')' );
                Log::error($e->getMessage());
                $messages[] = 'Fout bij maken rapport document voor ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')';
            }

        }

        //send email
        if($primaryEmailAddress){
            try{
                $mailbox = $this->getMailboxByParticipant($participant);
                if ($mailbox) {
                    $fromEmail = $mailbox->email;
                    $fromName = $mailbox->name;
                } else {
                    $fromEmail = \Config::get('mail.from.address');
                    $fromName = \Config::get('mail.from.name');
                }

                $email = Mail::fromMailbox($mailbox)
                    ->to($primaryEmailAddress->email);
                if(!$subject){
                    $subject = 'Participant rapportage Econobis';
                }

                $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'project', $project);

                $email->subject = $subject;

                $email->html_body
                    = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
                    . $subject . '</title></head>'
                    . $emailTemplate->html_body . '</html>';

                $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body, $contact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'contact' ,$contact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBodyWithContactVariables,'portal' );
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBodyWithContactVariables,'contacten_portal' );
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateCooperativeVariables($htmlBodyWithContactVariables,'cooperatie' );
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'ik', $user);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables,'project', $project);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables,'deelname', $participant);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables,'mutaties', $participant->mutations);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables,'administratie', $project->administration);
                $htmlBodyWithContactVariables = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);

                $defaultAttachmentDocumentId = $emailTemplate->defaultAttachmentDocument ? $emailTemplate->defaultAttachmentDocument->id : null;

                $email->send(new ParticipantReportMail($email, $fromEmail, $fromName,
                    $htmlBodyWithContactVariables, $document, $defaultAttachmentDocumentId));
            } catch (\Exception $e) {
                Log::error( 'Fout bij verzenden email naar ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')' );
                Log::error($e->getMessage());
                $messages[] = 'Fout bij verzenden email naar ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')';
            }

            //delete file on server, still saved on alfresco.
            if($document){
                if(\Config::get('app.ALFRESCO_COOP_USERNAME') != 'local') {
                    Storage::disk('documents')->delete($document->filename);
                }
            }
        }
        if(count($messages) > 0)
        {
            return ['messages' => $messages];
        }
        else
        {
            return null;
        }
    }

    public function peekContactsMembershipRequired(ParticipantProject $participantProject)
    {
        if($participantProject->project->is_membership_required){
            $contacts = new Collection();

            foreach ($participantProject->project->requiresContactGroups as $contactGroup){
                $contacts = $contacts->merge($contactGroup->all_contacts);
            }

            $contacts = $contacts->sortBy('full_name', SORT_NATURAL|SORT_FLAG_CASE)->values();
        }
        else{
            $contacts = Contact::select('id', 'full_name', 'number')->orderBy('full_name')->get();
        }
        return ContactPeek::collection($contacts);
    }

    public function peekParticipantByIds(Request $request)
    {
        $participations = ParticipantProject::whereIn('id',
            $request->input('ids'))->with('contact')->get();

        return ParticipantProjectPeek::collection($participations);
    }

    /**
     * @param RequestInput $requestInput
     * @param $data
     * @param ParticipantProject $participantProject
     * @param $project
     */
    private function storeFirstMutation(RequestInput $requestInput, ParticipantProject $participantProject, Project $project): void
    {
        $status = $requestInput
            ->integer('statusId')->validate('required|exists:participant_mutation_statuses,id')->alias('status_id')->next()
            ->get();

        $participantMutationStatus = ParticipantMutationStatus::find($status['status_id']);

        switch ($participantMutationStatus->code_ref) {
            case 'interest':
                $mutationData = $requestInput
                    ->integer('statusId')->validate('required|exists:participant_mutation_statuses,id')->alias('status_id')->next()
                    ->integer('quantityInterest')->onEmpty(null)->alias('quantity_interest')->next()
                    ->double('amountInterest')->onEmpty(null)->alias('amount_interest')->next()
                    ->date('dateInterest')->onEmpty(null)->validate('date')->alias('date_interest')->next()
                    ->get();
                $mutationData['quantity'] = isset($mutationData['quantity_interest']) ? $mutationData['quantity_interest'] : null;
                $mutationData['amount'] = isset($mutationData['amount_interest']) ? $mutationData['amount_interest'] : null;
                break;
            case 'option':
                $mutationData = $requestInput
                    ->integer('statusId')->validate('required|exists:participant_mutation_statuses,id')->alias('status_id')->next()
                    ->integer('quantityOption')->validate('required_without:amountOption')->alias('quantity_option')->next()
                    ->double('amountOption')->validate('required_without:quantityOption')->alias('amount_option')->next()
                    ->date('dateOption')->validate('required|date')->alias('date_option')->next()
                    ->get();
                $mutationData['quantity'] = isset($mutationData['quantity_option']) ? $mutationData['quantity_option'] : null;
                $mutationData['amount'] = isset($mutationData['amount_option']) ? $mutationData['amount_option'] : null;
                break;
            case 'granted':
                $mutationData = $requestInput
                    ->integer('statusId')->validate('required|exists:participant_mutation_statuses,id')->alias('status_id')->next()
                    ->integer('quantityGranted')->validate('required_without:amountGranted')->alias('quantity_granted')->next()
                    ->double('amountGranted')->validate('required_without:quantityGranted')->alias('amount_granted')->next()
                    ->date('dateGranted')->validate('required|date')->alias('date_granted')->next()
                    ->get();
                $mutationData['quantity'] = isset($mutationData['quantity_granted']) ? $mutationData['quantity_granted'] : null;
                $mutationData['amount'] = isset($mutationData['amount_granted']) ? $mutationData['amount_granted'] : null;
                break;
            case 'final':
                $mutationData = $requestInput
                    ->integer('statusId')->validate('required|exists:participant_mutation_statuses,id')->alias('status_id')->next()
                    ->integer('quantityFinal')->validate('required_without:amountFinal')->alias('quantity_final')->next()
                    ->double('amountFinal')->validate('required_without:quantityFinal')->alias('amount_final')->next()
                    ->date('dateGranted')->validate('nullable|date')->onEmpty(null)->alias('date_granted')->next()
                    ->date('dateContractRetour')->validate('nullable|date')->onEmpty(null)->alias('date_contract_retour')->next()
                    ->date('datePayment')->validate('nullable|date')->onEmpty(null)->alias('date_payment')->next()
                    ->string('paymentReference')->onEmpty(null)->alias('payment_reference')->next()
                    ->date('dateEntry')->validate('required|date')->alias('date_entry')->next()
                    ->get();
                $mutationData['quantity'] = isset($mutationData['quantity_final']) ? $mutationData['quantity_final'] : null;
                $mutationData['amount'] = isset($mutationData['amount_final']) ? $mutationData['amount_final'] : null;
                if(isset( $mutationData['date_granted'] ) )
                {
                    if(isset($mutationData['amount_final']) && $mutationData['amount_final'] <> 0 && !isset( $mutationData['amount_granted'] ) )
                    {
                        $mutationData = array_merge($mutationData, ['amount_granted' =>  $mutationData['amount_final']]);
                    }elseif(isset($mutationData['quantity_final']) && $mutationData['quantity_final'] <> 0 && !isset( $mutationData['quantity_granted'] ) )
                    {
                        $mutationData = array_merge($mutationData, ['quantity_granted' =>  $mutationData['quantity_final']]);
                    }
                }
                break;
        }

        $mutationData['participation_id'] = $participantProject->id;

        $participantMutationType = ParticipantMutationType::where('project_type_id', $project->project_type_id)->where('code_ref', 'first_deposit')->first();
        $mutationData['type_id'] = $participantMutationType->id;

        // Remove unnecessary fields from $mutationData
        unset($mutationData['contact_id']);
        unset($mutationData['project_id']);

        $participantMutation = new ParticipantMutation();

        $participantMutation->fill($mutationData);

        $participantMutationController = new ParticipantMutationController();
        $participantMutation->transaction_costs_amount = $participantMutationController->calculationTransactionCosts($participantMutation);

        $dateEntryYear = \Carbon\Carbon::parse($participantMutation->date_entry)->year;
        $result = $this->checkMutationAllowed($participantMutation, $dateEntryYear);

        // Calculate participation worth based on current book worth of project
        if($participantMutation->status->code_ref === 'final' && $project->projectType->code_ref !== 'loan') {
            $bookWorth = ProjectValueCourse::where('project_id', $participantMutation->participation->project_id)
                ->where('date', '<=', $participantMutation->date_entry)
                ->orderBy('date', 'desc')
                ->value('book_worth');
            $participantMutation->participation_worth = $bookWorth * $participantMutation->quantity;
        }

        DB::transaction(function () use ($participantMutation) {
            $participantMutation->save();

            // Herbereken de afhankelijke gegevens op het participantProject
            $participantMutation->participation->calculator()->run()->save();

            // Herbereken de afhankelijke gegevens op het project
            $participantMutation->participation->project->calculator()->run()->save();
        });

    }

    private function getModelByField(String $field){
        switch ($field){
            case 'contactType':
                return 'App\Eco\Contact\ContactType';
                break;
            case 'statusId':
                return 'App\Eco\Contact\ContactStatus';
                break;
            case 'participationStatusId':
                return 'App\Eco\ParticipantProject\ParticipantProjectStatus';
                break;
            case 'energySupplierId':
                return 'App\Eco\EnergySupplier\EnergySupplier';
                break;
            case 'projectId':
                return 'App\Eco\Project\Project';
                break;
            case 'giftedByContactId':
                return Contact::class;
                break;
        }
    }

    private function validatePostalCode(&$message, Project $project, Contact $contact, Address $address)
    {
        $checkText = 'Postcode check: ';
        if(!$address){
            $message[] = $checkText . 'Deelnemer heeft geen (geldig) adres.';
            return false;
        }
        $postalCodeAreaContact = substr($address->postal_code, 0 , 4);
        if(!($postalCodeAreaContact > 999 && $postalCodeAreaContact < 9999)){
            $message[] = $checkText . 'Deelnemer heeft geen geldige postcode op zijn gekoppeld adres ' . $address->street_postal_code_city. '.';
            return false;
        }
        if(!$project->postalcode_link){
            $message[] = $checkText . 'Project heeft geen deelnemende postcode(s) in postcoderoos.';
            return false;
        }

        // Check address
        $addressHelper = new AddressHelper($contact, $address);
        $checkAddressOk = $addressHelper->checkAddress($project->id, false);
        if(!$checkAddressOk){
            $message[] = $checkText . implode(';', $addressHelper->messages);
            return false;
        }
    }

    private function validateUsage(&$message, Project $project, ParticipantProject $participant)
    {
        $checkText = 'Gebruik check: ';

        if(!$project->power_kw_available){
            $message[] = $checkText . 'Project heeft nog geen opgesteld vermogen.';
            return false;
        }

        if(!$project->total_participations){
            $message[] = $checkText . 'Project heeft nog geen totaal aantal participaties.';
            return false;
        }

        if(!$participant->power_kwh_consumption){
            $message[] = $checkText . 'Participant heeft nog geen jaarlijks verbruik.';
            return false;
        }

        if(!$participant->participations_requested){
            $message[] = $checkText . 'Participant heeft nog geen participaties aangevraagd.';
            return false;
        }

        $participant =  (($project->power_kw_available /  $project->total_participations) * $participant->participations_requested) * 0.8;

        if($participant > $participant->power_kwh_consumption){
            $message[] = $checkText . 'Participant produceert ' . round($participant, 2) . ' dit is meer dan hij consumeert: ' . round($participant->power_kwh_consumption, 2) . '.';
            return false;
        }
    }

    private function validateEnergySupplier(&$message, Address $address)
    {
        $checkText = 'Energieleverancier check: ';

        $currentAddressEnergySupplierElectricity = $address ? $address->currentAddressEnergySupplierElectricity : null;

        if(!$currentAddressEnergySupplierElectricity){
            $message[] = $checkText . 'Contact heeft nog geen energieleverancier.';
            return false;
        }

        $energySupplier = $currentAddressEnergySupplierElectricity->energySupplier;

        if(!$energySupplier->does_postal_code_links){
            $message[] = $checkText . 'Energieleverancier van contact doet niet mee aan postcoderoos.';
            return false;
        }
    }

    /**
     * @param ParticipantProject $participantProject
     * @param $projectType
     */
    protected function createMutationWithDrawal(ParticipantProject $participantProject, $projectType): void
    {
        if ($projectType->code_ref == 'loan') {
            $amountOrParticipationsDefinitive = $participantProject->calculator()->amountDefinitiveForTerminating();
        } else {
            $amountOrParticipationsDefinitive = $participantProject->calculator()->participationsDefinitiveForTerminating();
        }

        $mutationStatusFinalId = ParticipantMutationStatus::where('code_ref', 'final')->value('id');
        $mutationTypeWithDrawalId = ParticipantMutationType::where('code_ref', 'withDrawal')->where('project_type_id', $projectType->id)->value('id');

        if ($amountOrParticipationsDefinitive != 0) {
            $participantMutation = new ParticipantMutation();
            $participantMutation->participation_id = $participantProject->id;
            $participantMutation->type_id = $mutationTypeWithDrawalId;
            $participantMutation->status_id = $mutationStatusFinalId;
            // date_entry is 1 day after date terminated
            $participantMutation->date_entry = Carbon::parse($participantProject['date_terminated'])->addDay()->format('Y-m-d');


            if ($projectType->code_ref == 'loan') {
                $participantMutation->amount = $amountOrParticipationsDefinitive * -1;
                $participantMutation->amount_final = $amountOrParticipationsDefinitive * -1;
            } else {
                $participantMutation->quantity = $amountOrParticipationsDefinitive * -1;
                $participantMutation->quantity_final = $amountOrParticipationsDefinitive * -1;

                $bookWorth = ProjectValueCourse::where('project_id', $participantMutation->participation->project_id)
                    ->where('date', '<=', $participantMutation->date_entry)
                    ->orderBy('date', 'desc')
                    ->value('book_worth');
                $participantMutation->participation_worth = $bookWorth * $participantMutation->quantity;
            }

            // we controleren in jaar van beeindigsdatum + 1 dag
            // (dit laatste omdat beeindiging op 31-12 nog wel mag, ook als hij in beeindigingsjaar dus in def. ws zat.
            $dateEntryYear = \Carbon\Carbon::parse($participantProject['date_terminated'])->addDay(1)->year;
            $result = $this->checkMutationAllowed($participantMutation, $dateEntryYear);

            $participantMutation->save();

            // Herbereken de afhankelijke gegevens op het participantProject
            $participantMutation->participation->calculator()->run()->save();

            // Herbereken de afhankelijke gegevens op het project
            $participantMutation->participation->project->calculator()->run()->save();
        }

    }

    /**
     * @param ParticipantProject $participantProject
     * @param $payPercentage
     * @param $projectType
     */
    protected function createMutationResult(ParticipantProject $participantProject, $payPercentage, $projectType): void
    {
        $result = $this->calculatePayoutHowLongInPossession($participantProject, $payPercentage);

        $mutationStatusFinalId = ParticipantMutationStatus::where('code_ref', 'final')->value('id');
        $mutationTypeResultDepositId = ParticipantMutationType::where('code_ref', 'result_deposit')->where('project_type_id', $projectType->id)->value('id');

        $participantMutation = new ParticipantMutation();
        $participantMutation->participation_id = $participantProject->id;
        $participantMutation->type_id = $mutationTypeResultDepositId;
        $participantMutation->status_id = $mutationStatusFinalId;
        if ($projectType->code_ref == 'loan') {
            $participantMutation->amount = $result;
        }
        $participantMutation->returns = $result;
        if ($projectType->code_ref == 'loan') {
            // date_entry is 1 day after date terminated
            $participantMutation->date_entry = Carbon::parse($participantProject->date_terminated)->addDay()->format('Y-m-d');
        } else {
            // date_payment is 1 day after date terminated
            $participantMutation->date_payment = Carbon::parse($participantProject->date_terminated)->addDay()->format('Y-m-d');
        }
        $participantMutation->paid_on = 'Bijschrijven';

        // we controleren in jaar van beeindigsdatum + 1 dag
        // (dit laatste omdat beeindiging op 31-12 nog wel mag, ook als hij in beeindigingsjaar dus in def. ws zat.
        $dateEntryYear = \Carbon\Carbon::parse($participantProject->date_terminated)->addDay(1)->year;
        $result = $this->checkMutationAllowed($participantMutation, $dateEntryYear);

        $participantMutation->save();

        // Recalculate dependent data in participantProject
        $participantMutation->participation->calculator()->run()->save();

        // Recalculate dependent data in project
        $participantMutation->participation->project->calculator()->run()->save();
    }

    protected function getMailboxByParticipant(ParticipantProject $participantProject)
    {
        // Standaard vanuit primaire mailbox mailen
        $mailboxToSendFrom = Mailbox::getDefault();;

        // Als er een mailbox aan de administratie is gekoppeld, dan deze gebruiken
        $project = $participantProject->project;

        if ($project->administration && $project->administration->mailbox) {
            $mailboxToSendFrom = $project->administration->mailbox;
        }

        return $mailboxToSendFrom;
    }

    protected function calculatePayoutHowLongInPossession(ParticipantProject $participantProject, $payPercentage)
    {
        $currentBookWorth = $participantProject->project->currentBookWorth();
        $projectTypeCodeRef = $participantProject->project->projectType->code_ref;
        $dateEnd = new Carbon($participantProject->date_terminated);
        if (!$dateEnd){
            return 0;
        }

        // Als eerst volgende dateInterestBearing na einddatum ligt, dan doen we geen uitkering meer.
        $dateInterestBearing = $participantProject->project->date_interest_bearing ? new Carbon($participantProject->project->date_interest_bearing) : null;
        if($dateInterestBearing && $dateInterestBearing->copy()->startOfDay() > $dateEnd->copy()->startOfDay()){
            return 0;
        }

        // Indien jaar van 1e ingangsdatum = jaar beeindigingsdatum, dan dateBegin = 1e ingangsdatum.
        // Anders dateBegin = 1-1-[jaar beeindigingsdatum]
        $dateBegin = $participantProject->date_entry_first_deposit ? new Carbon($participantProject->date_entry_first_deposit) : null;
        if(!$dateBegin || $dateBegin->year != $dateEnd->year){
            $dateBegin = $dateEnd->copy()->startOfYear();
        }
        // Als eerst volgende dateInterestBearing na begindatum ligt, dan wordt dit de begindatum
        $dateInterestBearing = $participantProject->project->date_interest_bearing ? new Carbon($participantProject->project->date_interest_bearing) : null;
        if($dateInterestBearing && $dateInterestBearing->copy()->startOfDay() > $dateBegin->copy()->startOfDay()){
            $dateBegin = $dateInterestBearing->copy()->startOfDay();
        }
        $daysOfYear = $this->daysOfYear($dateBegin, $dateEnd);

        $mutations = $participantProject->mutationsDefinitive;

        $payout = 0;
        foreach ($mutations as $mutation) {
            if($mutation->date_entry){
                $dateEntry = new Carbon($mutation->date_entry);

                // If date entry is before date begin then date entry is equal to date begin
                if($dateEntry < $dateBegin) $dateEntry = $dateBegin;

                $dateEndForPeriod = clone $dateEnd;
                $daysOfPeriod = $dateEndForPeriod->addDay()->diffInDays($dateEntry);

                if($projectTypeCodeRef === 'obligation' || $projectTypeCodeRef === 'capital' || $projectTypeCodeRef === 'postalcode_link_capital') {
                    $mutationValue = $currentBookWorth * $mutation->quantity;
                }

                if($projectTypeCodeRef === 'loan') {
                    $mutationValue = $mutation->amount;
                }

                if($dateEntry > $dateEnd) $mutationValue = 0;
                $payout += ($mutationValue * $payPercentage) / 100 / $daysOfYear * $daysOfPeriod;
            }
        }
        return number_format($payout, 2, '.', '');
    }

    /**
     * @param $participantProject
     */
    protected function checkMutationAllowed($participantMutation, $dateEntryYear)
    {
        $project = $participantMutation->participation->project;
        $mutationStatusFinal = (ParticipantMutationStatus::where('code_ref', 'final')->first())->id;

        if($participantMutation->status_id === $mutationStatusFinal){
            $financialOverviewProjectQuery = FinancialOverviewProject::where('project_id', $project->id)
                ->where('definitive', true)
                ->whereHas('financialOverview', function ($query) use ($project, $dateEntryYear) {
                    $query->where('administration_id', $project->administration->id)
                        ->where('year', $dateEntryYear);
                });

            if ($financialOverviewProjectQuery->exists()) {
                $financialOverview = $financialOverviewProjectQuery->first()->financialOverview;
                abort(409, 'Project komt al voor in definitive waardestaat ' . $financialOverview->description . '. Deze mutatie is niet meer mogelijk.');
                return false;
            }
        }
        return true;
    }

    protected function translateToValidCharacterSet($field){

        $fieldUtf8Decoded = mb_convert_encoding($field, 'ISO-8859-1', 'UTF-8');
        $replaceFrom = mb_convert_encoding('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ', 'ISO-8859-1', 'UTF-8');
        $replaceTo = mb_convert_encoding('AAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy', 'ISO-8859-1', 'UTF-8');
//        Log::info( mb_convert_encoding( strtr( $fieldUtf8Decoded, $replaceFrom, $replaceTo ), 'UTF-8', mb_list_encodings() ) );

        $field = mb_convert_encoding( strtr( $fieldUtf8Decoded, $replaceFrom, $replaceTo ), 'UTF-8', mb_list_encodings() );
        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);

        return $field;
    }

    /**
     * @param string $dateBegin
     * @param string $dateEnd
     */
    protected function daysOfYear($dateBegin, $dateEnd)
    {
        $dateBeginIsLeapYear = $dateBegin->isLeapYear();
        $dateEndIsLeapYear = $dateEnd->isLeapYear();

//  jaar startdatum = jaar einddatum?
//      =>	Ja	jaar startdatum leapyear?
//      	=>	Ja	29-2-jaar startdatum > startdatum en < eindatum
//          	=>	Ja	leapperiode
//				=>	Nee	geen leapperiode
//			=>	nee	geen leapperiode
//
//    	=>	Nee	jaar startdatum leapyear?
//        	=>	Ja	29-2-jaar startdatum > startdatum en < eindatum
//          	=>	Ja	leapperiode
//				=>	Nee	geen leapperiode
//			=>	Nee	jaar einddatum leapyear?
//          	=>	Ja	29-2-jaar einddatum > startdatum en < eindatum
//                  =>	Ja	leapperiode
//					=>	Nee	geen leapperiode
//				=>	nee 	geen leapperiode

        $hasPeriod29February = false;
        if ($dateBegin->year == $dateEnd->year) {
            // Period is not cross-annual period
            if ($dateBeginIsLeapYear) {
                $date29February = Carbon::createFromDate($dateBegin->year, 2, 29);
                if ($date29February->between($dateBegin, $dateEnd)) {
                    $hasPeriod29February = true;
                }
            }
        } else {
            // Period is cross-annual period
            if ($dateBeginIsLeapYear) {
                $date29February = Carbon::createFromDate($dateBegin->year, 2, 29);
                if ($date29February->between($dateBegin, $dateEnd)) {
                    $hasPeriod29February = true;
                }
            } else {
                if ($dateEndIsLeapYear) {
                    $date29February = Carbon::createFromDate($dateEnd->year, 2, 29);
                    if ($date29February->between($dateBegin, $dateEnd)) {
                        $hasPeriod29February = true;
                    }
                }
            }
        }
        return $hasPeriod29February ? 366 : 365;
    }

    /**
     * @param ParticipantProject $participantProject
     * @return void
     */
    function recalculateParticipantProjectForFinancialOverviews(ParticipantProject $participantProject): void
    {
        // Indien participation project in concept waardestaat / waardestaten, dan die herberekenen.
        if ($participantProject->project->financialOverviewProjects
            && $participantProject->project->financialOverviewProjects->where('definitive', false)->count() > 0) {
            $financialOverviewParticipantProjectController = new FinancialOverviewParticipantProjectController();
            $financialOverviewParticipantProjectController->recalculateParticipantProjectForFinancialOverviews($participantProject);
        }
    }

}