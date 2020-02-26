<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\ParticipationProject;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\ContactGroup\DynamicContactGroupFilter;
use App\Eco\Document\Document;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Mailbox\Mailbox;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\ParticipantProject\ParticipantProjectPayoutType;
use App\Eco\ParticipantProject\ParticipantProjectStatus;
use App\Eco\Project\ProjectValueCourse;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Helpers\Excel\ParticipantExcelHelper;
use App\Helpers\Excel\ParticipantExcelHelperHelper;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Template\TemplateTableHelper;
use App\Http\Resources\Contact\ContactPeek;
use App\Http\Resources\ContactGroup\FullContactGroup;
use App\Jobs\ParticipationProject\CreateParticipantReport;
use Barryvdh\DomPDF\Facade as PDF;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\PostalCodeLink\PostalCodeLink;
use App\Eco\Project\Project;
use App\Helpers\Delete\Models\DeleteParticipation;
use App\Helpers\RequestInput\RequestInput;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\ParticipantProject\Grid\RequestQuery;
use App\Http\Resources\ParticipantProject\FullParticipantProject;
use App\Http\Resources\ParticipantProject\GridParticipantProject;
use App\Http\Resources\ParticipantProject\ParticipantProjectPeek;
use App\Http\Resources\ParticipantProject\Templates\ParticipantReportMail;
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
        $participantProject = $requestQuery->get();
        $participantProject->load([
            'contact.primaryContactEnergySupplier.energySupplier',
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

    public function excel(RequestQuery $requestQuery)
    {
        set_time_limit(0);

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
            'contact.primaryContactEnergySupplier.energySupplier',
            'giftedByContact',
            'legalRepContact',
            'project',
            'participantProjectPayoutType',
            'mutations.statusLog',
            'mutations.status',
            'mutations.type',
        ]);

        $participantExcelHelper = new ParticipantExcelHelper($participants);

        return $participantExcelHelper->downloadExcel();
    }

    public function show(ParticipantProject $participantProject)
    {
        $participantProject->load([
            'mutations' => function($query){
                $query->orderBy('id', 'desc');
            },
        ]);
        $participantProject->load([
            'contact',
            'project.projectType',
            'project.administration',
            'project.projectValueCourses',
            'participantProjectPayoutType',
            'giftedByContact',
            'legalRepContact',
            'mutations.type',
            'mutations.status',
            'mutations.statusLog',
            'mutations.createdBy',
            'mutations.updatedBy',
            'obligationNumbers',
            'documents',
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
            ->integer('projectId')->validate('required|exists:projects,id')->alias('project_id')->next()
            ->get();

        $participantProject = new ParticipantProject();

        $participantProject->fill($data);

        $participantProject->save();

        $project = Project::find($participantProject->project_id);
        $contact = Contact::find($participantProject->contact_id);

        // Loan / Obligation: Default type id is account.
        if($project->projectType->code_ref == 'loan' ||$project->projectType->code_ref == 'obligation'){
            $participantProject->type_id = ParticipantProjectPayoutType::where('code_ref', 'account')->value('id');
            $participantProject->save();
        }

        // Create first mutation
        $this->storeFirstMutation($requestInput, $participantProject, $project);

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
                array_push($message, 'Contact zit niet in de benodigde groep.');
            }
        }

        switch($project->projectType->code_ref) {
            case 'postalcode_link_capital': //Postalcode link capital
                $this->validatePostalCode($message, $project, $contact);
                $this->validateUsage($message, $project, $participantProject);
                $this->validateEnergySupplier($message, $contact);
                break;
            default:
                return ['id' => $participantProject->id];
                break;
        }

        return ['id' => $participantProject->id, 'message' => $message];
    }


    public function update(RequestInput $requestInput, ParticipantProject $participantProject)
    {
        $this->authorize('manage', ParticipantProject::class);

        $data = $requestInput
            ->boolean('didAcceptAgreement')->alias('did_accept_agreement')->next()
            ->date('dateDidAcceptAgreement')->validate('date')->alias('date_did_accept_agreement')->next()
            ->date('dateRegister')->validate('date')->alias('date_register')->next()
            ->boolean('didUnderstandInfo')->alias('did_understand_info')->next()
            ->date('dateDidUnderstandInfo')->validate('date')->alias('date_did_understand_info')->next()
            ->integer('giftedByContactId')->validate('nullable|exists:contacts,id')->onEmpty(null)->alias('gifted_by_contact_id')->next()
            ->string('ibanPayout')->alias('iban_payout')->next()
            ->integer('legalRepContactId')->validate('nullable|exists:contacts,id')->onEmpty(null)->alias('legal_rep_contact_id')->next()
            ->string('ibanPayoutAttn')->alias('iban_payout_attn')->next()
            ->integer('typeId')->validate('nullable|exists:participant_project_payout_type,id')->onEmpty(null)->alias('type_id')->next()
            ->integer('powerKwhConsumption')->alias('power_kwh_consumption')->next()
            ->get();

        $participantProject->fill($data);

        $participantProject->save();

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
            ->integer('payoutPercentageTerminated')->validate('nullable')->onEmpty(null)->alias('payout_percentage_terminated')->next()
            ->get();

        // Set terminated date
        $participantProject->date_terminated = $data['date_terminated'];
        $payoutPercentageTerminated = $data['payout_percentage_terminated'];

        DB::transaction(function () use ($participantProject, $payoutPercentageTerminated) {
            $participantProject->save();

            $projectType = $participantProject->project->projectType;
            $mutationStatusFinalId = ParticipantMutationStatus::where('code_ref', 'final')->value('id');

            // If Payout percentage is filled then make a result mutation (not when capital or postalcode_link_capital)
            if ($payoutPercentageTerminated && $projectType->code_ref !== 'capital' && $projectType->code_ref !== 'postalcode_link_capital') {
                $mutationTypeResultId = ParticipantMutationType::where('code_ref', 'result')->where('project_type_id', $projectType->id)->value('id');
                // Calculate result from last revenue distribution till date terminate
                $this->createMutationResult($participantProject, $mutationTypeResultId, $mutationStatusFinalId, $payoutPercentageTerminated, $projectType);
            }
            // Make mutation withdrawal of total participations/loan
            $mutationTypeWithDrawalId = ParticipantMutationType::where('code_ref', 'withDrawal')->where('project_type_id', $projectType->id)->value('id');

            $this->createMutationWithDrawal($participantProject, $mutationTypeWithDrawalId, $mutationStatusFinalId, $projectType);

            if($payoutPercentageTerminated) {
                // Remove distributions on active revenue(s)
                $participantProject->projectRevenueDistributions()->where('status', 'concept')->forceDelete();
            }
        });
    }

    public function peek()
    {

        $participants = ParticipantProject::all();
        $participants->load(['contact', 'project']);

        return ParticipantProjectPeek::collection($participants);
    }

    public function validatePostalCode(&$message, Project $project, Contact $contact)
    {
        $checkText = 'Postcode check: ';
        $primaryAddress = $contact->primaryAddress;
        if(!$primaryAddress){
            array_push($message, $checkText . 'Contact heeft geen primair adres.');
            return false;
        }
        if(!$project->postal_code){
            array_push($message, $checkText . 'Project heeft geen postcode.');
            return false;
        }
        $postalCodeAreaContact = substr($primaryAddress->postal_code, 0 , 4);
        if(!($postalCodeAreaContact > 999 && $postalCodeAreaContact < 9999)){
            array_push($message, $checkText . 'Contact heeft geen geldige postcode op zijn primaire adres.');
            return false;
        }
        $postalCodeAreaProductionProject = substr($project->postal_code, 0 , 4);
        if(!($postalCodeAreaProductionProject > 999 && $postalCodeAreaProductionProject < 9999)){
            array_push($message, $checkText . 'Project heeft geen geldige postcode.');
            return false;
        }
        $validPostalAreas = PostalCodeLink::where('postalcode_main', $postalCodeAreaProductionProject)->pluck('postalcode_link')->toArray();
        if(!$validPostalAreas){
            array_push($message, $checkText . 'Project postcode heeft geen postcoderoos.');
            return false;
        }
        if(!in_array($postalCodeAreaContact, $validPostalAreas)){
            array_push($message, $checkText . 'Postcode nummer ' . $postalCodeAreaContact . ' niet gevonden in toegestane postcode(s): ' . implode(', ', $validPostalAreas) . '.');
            return false;
        }
    }

    public function validateUsage(&$message, Project $project, ParticipantProject $participant)
    {
        $checkText = 'Gebruik check: ';

        if(!$project->power_kw_available){
            array_push($message, $checkText . 'Project heeft nog geen opgesteld vermogen.');
            return false;
        }

        if(!$project->total_participations){
            array_push($message, $checkText . 'Project heeft nog geen totaal aantal participaties.');
            return false;
        }

        if(!$participant->power_kwh_consumption){
            array_push($message, $checkText . 'Participant heeft nog geen jaarlijks verbruik.');
            return false;
        }

        if(!$participant->participations_requested){
            array_push($message, $checkText . 'Participant heeft nog geen participaties aangevraagd.');
            return false;
        }

        $participant =  (($project->power_kw_available /  $project->total_participations) * $participant->participations_requested) * 0.8;

        if($participant > $participant->power_kwh_consumption){
            array_push($message, $checkText . 'Participant produceert ' . round($participant, 2) . ' dit is meer dan hij consumeert: ' . round($participant->power_kwh_consumption, 2) . '.');
            return false;
        }
    }

    public function validateEnergySupplier(&$message, Contact $contact)
    {
        $checkText = 'Energieleverancier check: ';

        $primaryContactEnergySupplier = $contact->primaryContactEnergySupplier;

        if(!$primaryContactEnergySupplier){
            array_push($message, $checkText . 'Contact heeft nog geen energieleverancier.');
            return false;
        }

        $energySupplier = $primaryContactEnergySupplier->energySupplier;

        if(!$energySupplier->does_postal_code_links){
            array_push($message, $checkText . 'Energieleverancier van contact doet niet mee aan postcoderoos.');
            return false;
        }
    }

    public function previewPDF(Request $request, DocumentTemplate $documentTemplate, EmailTemplate $emailTemplate) {

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

    public function previewEmail(Request $request, DocumentTemplate $documentTemplate, EmailTemplate $emailTemplate) {
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

                $primaryMailbox = Mailbox::getDefault();
                if ($primaryMailbox) {
                    $fromEmail = $primaryMailbox->email;
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

    public function createParticipantReport(Request $request, DocumentTemplate $documentTemplate, EmailTemplate $emailTemplate)
    {
        set_time_limit(0);
        $participantIds = $request->input('participantIds');
        $subject = $request->input('subject');

        foreach($participantIds as $participantId) {
            CreateParticipantReport::dispatch($participantId, $subject, $documentTemplate->id, $emailTemplate->id, Auth::id());
        }

        return null;
    }

    public function createParticipantProjectReport($subject, $participantId, DocumentTemplate $documentTemplate, EmailTemplate $emailTemplate)
    {
        $portalName = PortalSettings::get('portalName');
        $cooperativeName = PortalSettings::get('cooperativeName');
        $subject = str_replace('{cooperatie_portal_naam}', $portalName, $subject);
        $subject = str_replace('{cooperatie_naam}', $cooperativeName, $subject);

        //get current logged in user
        $user = Auth::user();

        $messages = [];
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

        $primaryEmailAddress = $contact->primaryEmailAddress;

        try
        {
            $time = Carbon::now();

            $document = new Document();
            $document->document_type = 'internal';
            $document->document_group = $documentTemplate->document_group;
            $document->contact_id = $contact->id;
            $document->project_id = $project->id;
            $document->participation_project_id = $participant->id;
            $document->template_id = $documentTemplate->id;

            $filename = str_replace(' ', '', $this->translateToValidCharacterSet($project->code)) . '_' . str_replace(' ', '', $this->translateToValidCharacterSet($contact->full_name));

            //max length name 25
            $filename = substr($filename, 0, 25);

            $document->filename = $filename  . substr($document->getDocumentGroup()->name, 0, 1) . (Document::where('document_group', 'revenue')->count() + 1) . '_' .  $time->format('Ymd') . '.pdf';

            $document->save();

            $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'documents' . DIRECTORY_SEPARATOR . $document->filename));

            file_put_contents($filePath, $pdf);

            $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));

            $alfrescoResponse = $alfrescoHelper->createFile($filePath, $document->filename, $document->getDocumentGroup()->name);

            $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
            $document->save();
        } catch (\Exception $e) {
            Log::error('Fout bij maken rapport document voor ' . $primaryEmailAddress->email . ' (' . $contact->full_name . ')' );
            Log::error($e->getMessage());
            array_push($messages, 'Fout bij maken rapport document voor ' . $primaryEmailAddress->email . ' (' . $contact->full_name . ')' );
        }

        //send email
        if($primaryEmailAddress){
            try{
                // todo bij createParticipantRevenueReport wordt setMailConfigByDistribution gedaan
                // moet hier dan ook niet zo iets als ssetMailConfigByParticipant komen?
//                $this->setMailConfigByParticipant($participant);

                $email = Mail::to($primaryEmailAddress->email);
                if(!$subject){
                    $subject = 'Participant rapportage Econobis';
                }

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

                $primaryMailbox = Mailbox::getDefault();
                if ($primaryMailbox) {
                    $fromEmail = $primaryMailbox->email;
                    $fromName = $primaryMailbox->name;
                } else {
                    $fromEmail = \Config::get('mail.from.address');
                    $fromName = \Config::get('mail.from.name');
                }

                $email->send(new ParticipantReportMail($email, $fromEmail, $fromName,
                    $htmlBodyWithContactVariables, $document));
            } catch (\Exception $e) {
                Log::error( 'Fout bij verzenden email naar ' . $primaryEmailAddress->email . ' (' . $contact->full_name . ')' );
                Log::error($e->getMessage());
                array_push($messages, 'Fout bij verzenden email naar ' . $primaryEmailAddress->email . ' (' . $contact->full_name . ')' );
            }

            //delete file on server, still saved on alfresco.
            Storage::disk('documents')->delete($document->filename);
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

        return FullParticipantProject::collection($participations);
    }

    /**
     * @param RequestInput $requestInput
     * @param $data
     * @param ParticipantProject $participantProject
     * @param $project
     */
    public function storeFirstMutation(RequestInput $requestInput, ParticipantProject $participantProject, Project $project): void
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

    /**
     * @param ParticipantProject $participantProject
     * @param $mutationTypeWithDrawalId
     * @param $mutationStatusFinalId
     * @param $projectType
     */
    protected function createMutationWithDrawal(ParticipantProject $participantProject, $mutationTypeWithDrawalId, $mutationStatusFinalId, $projectType): void
    {
        $participantMutation = new ParticipantMutation();
        $participantMutation->participation_id = $participantProject->id;
        $participantMutation->type_id = $mutationTypeWithDrawalId;
        $participantMutation->status_id = $mutationStatusFinalId;
        if ($projectType->code_ref == 'loan') {
            $amountDefinitive = $participantProject->calculator()->amountDefinitive();

            $participantMutation->amount = '-' . $amountDefinitive;
            $participantMutation->amount_final = '-' . $amountDefinitive;
        } else {
            $participationsDefinitive = $participantProject->calculator()->participationsDefinitive();

            $participantMutation->quantity = '-' . $participationsDefinitive;
            $participantMutation->quantity_final = '-' . $participationsDefinitive;
        }
        $participantMutation->date_entry = $participantProject['date_terminated'];

        // Calculate participation worth based on current book worth of project
        if ($participantMutation->status->code_ref === 'final' && $participantMutation->participation->project->projectType->code_ref !== 'loan') {
            $bookWorth = ProjectValueCourse::where('project_id', $participantMutation->participation->project_id)
                ->where('date', '<=', $participantMutation->date_entry)
                ->orderBy('date', 'desc')
                ->value('book_worth');
            $participantMutation->participation_worth = $bookWorth * $participantMutation->quantity;
        }

        $participantMutation->save();

        // Herbereken de afhankelijke gegevens op het participantProject
        $participantMutation->participation->calculator()->run()->save();

        // Herbereken de afhankelijke gegevens op het project
        $participantMutation->participation->project->calculator()->run()->save();
    }

    /**
     * @param ParticipantProject $participantProject
     * @param $mutationTypeWithDrawalId
     * @param $mutationStatusFinalId
     * @param $projectType
     */
    protected function createMutationResult(ParticipantProject $participantProject, $mutationTypeResultId, $mutationStatusFinalId, $payoutPercentageTerminated, $projectType): void
    {
        $result = $this->calculatePayoutHowLongInPossession($participantProject, $payoutPercentageTerminated);

        $participantMutation = new ParticipantMutation();
        $participantMutation->participation_id = $participantProject->id;
        $participantMutation->type_id = $mutationTypeResultId;
        $participantMutation->status_id = $mutationStatusFinalId;
        if ($projectType->code_ref == 'loan') {
            $participantMutation->amount = $result;
        }
        $participantMutation->returns = $result;
        if ($projectType->code_ref == 'loan') {
            $participantMutation->date_entry = $participantProject->date_terminated;
        } else {
            $participantMutation->date_payment = $participantProject->date_terminated;
        }
        $participantMutation->paid_on = 'Bijschrijven';
        $participantMutation->save();

        // Recalculate dependent data in participantProject
        $participantMutation->participation->calculator()->run()->save();

        // Recalculate dependent data in project
        $participantMutation->participation->project->calculator()->run()->save();
    }

    protected function calculatePayoutHowLongInPossession(ParticipantProject $participantProject, $payoutPercentageTerminated)
    {
        $currentBookWorth = $participantProject->project->currentBookWorth();
        $projectTypeCodeRef = $participantProject->project->projectType->code_ref;
        $dateBegin = $participantProject->project->date_interest_bearing ? new Carbon($participantProject->project->date_interest_bearing) : null;
        $dateEnd = new Carbon($participantProject->date_terminated);

        if (!$dateEnd) return 0;

        $mutations = $participantProject->mutationsDefinitive;

        $payout = 0;

        foreach ($mutations as $mutation) {
            $dateEntry = $mutation->date_entry;

            // If date entry is before date begin then date entry is equal to date begin
            if($dateEntry < $dateBegin) $dateEntry = $dateBegin;

            $daysOfPeriod = $dateEnd->diffInDays($dateEntry);

            if($projectTypeCodeRef === 'obligation' || $projectTypeCodeRef === 'capital' || $projectTypeCodeRef === 'postalcode_link_capital') {
                $mutationValue = $currentBookWorth * $mutation->quantity;
            }

            if($projectTypeCodeRef === 'loan') {
                $mutationValue = $mutation->amount;
            }

            if($dateEntry > $dateEnd) $mutationValue = 0;
            $payout += ($mutationValue * $payoutPercentageTerminated) / 100 / ($dateEntry->isLeapYear() ? 366 : 365) * $daysOfPeriod;
        }

        return number_format($payout, 2, '.', '');
    }

    protected function translateToValidCharacterSet($field){

        $field = iconv('UTF-8', 'ASCII//TRANSLIT', $field);
        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);

        return $field;
    }

}