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
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\ParticipantProject\ParticipantProjectPayoutType;
use App\Eco\ParticipantProject\ParticipantProjectStatus;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Helpers\CSV\ParticipantCSVHelper;
use App\Helpers\Template\TemplateTableHelper;
use App\Http\Resources\Contact\ContactPeek;
use App\Http\Resources\ContactGroup\FullContactGroup;
use Barryvdh\DomPDF\Facade as PDF;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\ParticipantTransaction\ParticipantTransaction;
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

    public function csv(RequestQuery $requestQuery)
    {
        set_time_limit(0);
        $participants = $requestQuery->getQueryNoPagination()->get();

        $participantCSVHelper = new ParticipantCSVHelper($participants);

        return $participantCSVHelper->downloadCSV();
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
            'transactions.type',
            'transactions.createdBy',
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

        // Default type id worth is account
        $data['type_id'] = ParticipantProjectPayoutType::where('code_ref', 'account')->value('id');

        $participantProject->fill($data);

        $participantProject->save();

        $project = Project::find($participantProject->project_id);
        $contact = Contact::find($participantProject->contact_id);

        $participantMutationStatus = ParticipantMutationStatus::find($data['status_id']);
        // Create first mutation
        $this->storeFirstMutation($requestInput, $participantMutationStatus, $participantProject, $project);

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
            ->integer('participationsRequested')->alias('participations_requested')->next()
            ->integer('participationsGranted')->alias('participations_granted')->next()
            ->integer('participationsSold')->alias('participations_sold')->next()
            ->integer('participationsRestSale')->alias('participations_rest_sale')->next()
            ->boolean('didAcceptAgreement')->alias('did_accept_agreement')->next()
            ->integer('giftedByContactId')->validate('nullable|exists:contacts,id')->onEmpty(null)->alias('gifted_by_contact_id')->next()
            ->string('ibanPayout')->alias('iban_payout')->next()
            ->integer('legalRepContactId')->validate('nullable|exists:contacts,id')->onEmpty(null)->alias('legal_rep_contact_id')->next()
            ->string('ibanPayoutAttn')->alias('iban_payout_attn')->next()
            ->integer('typeId')->validate('required|exists:participant_project_payout_type,id')->alias('type_id')->next()
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
       return $this->createParticipantReport($request, $documentTemplate, $emailTemplate, false, true);
    }

    public function previewEmail(Request $request, DocumentTemplate $documentTemplate, EmailTemplate $emailTemplate) {
        return $this->createParticipantReport($request, $documentTemplate, $emailTemplate, true, false);
    }

    public function createParticipantReport(Request $request, DocumentTemplate $documentTemplate, EmailTemplate $emailTemplate, $previewEmail = false, $previewPDF = false){
        $participantIds = $request->input('participantIds');
        $subject = $request->input('subject');

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
            $primaryEmailAddress = $contact->primaryEmailAddress;

            $project = $participant->project;

            if(!$previewEmail){
            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($html,'contact', $contact);
            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($revenueHtml,'participant', $participant);
            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($revenueHtml,'productie_project', $project);
            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($revenueHtml,'ik', $user);
            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($revenueHtml,'administratie', $project->administration);

            $revenueHtml = TemplateVariableHelper::stripRemainingVariableTags($revenueHtml);


            //if preview there is 1 participantId so we return
            $pdf = PDF::loadView('documents.generic', [
                'html' => $revenueHtml,
            ])->output();

            if ($previewPDF) {
                return $pdf;
            }

            $time = Carbon::now();

            $document = new Document();
            $document->document_type = 'internal';
            $document->document_group = 'revenue';
            $document->contact_id = $contact->id;

            $filename = str_replace(' ', '', $project->code) . '_' . str_replace(' ', '', $contact->full_name);

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
            }

            //send email
            if($primaryEmailAddress && !$previewPDF){

                $email = Mail::to($primaryEmailAddress->email);

                if(!$subject){
                    $subject = 'Participant rapportage Econobis';
                }

                $email->subject = $subject;

                $email->html_body ='<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
                    . $subject . '</title></head>'
                    . $emailTemplate->html_body . '</html>';

                $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body, $contact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'contact' ,$contact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'ik', $user);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables,'participant', $participant);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables,'productie_project', $project);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables,'administratie', $project->administration);
                $htmlBodyWithContactVariables = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);

                if ($previewEmail) {
                    return [
                        'to' => $primaryEmailAddress->email,
                        'subject' => $subject,
                        'htmlBody' => $htmlBodyWithContactVariables
                    ];
                }else {
                    $email->send(new ParticipantReportMail($email,
                        $htmlBodyWithContactVariables, $document));
                }

            }
            else{
                return [
                    'to' => 'Geen e-mail bekend.',
                    'subject' => 'Geen e-mail bekend.',
                    'htmlBody' => 'Geen e-mail bekend.'
                ];
            }

            if(!$previewEmail && !$previewPDF) {
                //delete file on server, still saved on alfresco.
                Storage::disk('documents')->delete($document->filename);
            }
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
    public function storeFirstMutation(RequestInput $requestInput, ParticipantMutationStatus $participantMutationStatus, ParticipantProject $participantProject, Project $project): void
    {
        switch ($participantMutationStatus->code_ref) {
            case 'interest':
                $mutationData = $requestInput
                    ->integer('statusId')->validate('required|exists:participant_project_status,id')->alias('status_id')->next()
                    ->integer('quantityInterest')->onEmpty(null)->alias('quantity_interest')->next()
                    ->double('amountInterest')->onEmpty(null)->alias('amount_interest')->next()
                    ->date('dateInterest')->onEmpty(null)->validate('date')->alias('date_interest')->next()
                    ->get();
                $mutationData['quantity'] = isset($mutationData['quantity_interest']) ? $mutationData['quantity_interest'] : null;
                $mutationData['amount'] = isset($mutationData['amount_interest']) ? $mutationData['amount_interest'] : null;
                break;
            case 'option':
                $mutationData = $requestInput
                    ->integer('statusId')->validate('required|exists:participant_project_status,id')->alias('status_id')->next()
                    ->integer('quantityOption')->validate('required_without:amountOption')->alias('quantity_option')->next()
                    ->double('amountOption')->validate('required_without:quantityOption')->alias('amount_option')->next()
                    ->date('dateOption')->validate('required|date')->alias('date_option')->next()
                    ->get();
                $mutationData['quantity'] = isset($mutationData['quantity_option']) ? $mutationData['quantity_option'] : null;
                $mutationData['amount'] = isset($mutationData['amount_option']) ? $mutationData['amount_option'] : null;
                break;
            case 'granted':
                $mutationData = $requestInput
                    ->integer('statusId')->validate('required|exists:participant_project_status,id')->alias('status_id')->next()
                    ->integer('quantityGranted')->validate('required_without:amountGranted')->alias('quantity_granted')->next()
                    ->double('amountGranted')->validate('required_without:quantityGranted')->alias('amount_granted')->next()
                    ->date('dateGranted')->validate('required|date')->alias('date_granted')->next()
                    ->get();
                $mutationData['quantity'] = isset($mutationData['quantity_granted']) ? $mutationData['quantity_granted'] : null;
                $mutationData['amount'] = isset($mutationData['amount_granted']) ? $mutationData['amount_granted'] : null;
                break;
            case 'final':
                $mutationData = $requestInput
                    ->integer('statusId')->validate('required|exists:participant_project_status,id')->alias('status_id')->next()
                    ->integer('quantityFinal')->validate('required_without:amountFinal')->alias('quantity_final')->next()
                    ->double('amountFinal')->validate('required_without:quantityFinal')->alias('amount_final')->next()
                    ->date('dateGranted')->validate('nullable|date')->onEmpty(null)->alias('date_granted')->next()
                    ->date('dateContractRetour')->validate('nullable|date')->onEmpty(null)->alias('date_contract_retour')->next()
                    ->date('datePayment')->validate('nullable|date')->onEmpty(null)->alias('date_payment')->next()
                    ->date('dateEntry')->validate('required|date')->alias('date_entry')->next()
                    ->get();
                $mutationData['quantity'] = isset($mutationData['quantity_final']) ? $mutationData['quantity_final'] : null;
                $mutationData['amount'] = isset($mutationData['amount_final']) ? $mutationData['amount_final'] : null;
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

        $participantMutation->save();

        DB::transaction(function () use ($participantMutation) {
            $participantMutation->save();

            // Herbereken de afhankelijke gegevens op het participantProject
            $participantMutation->participation->calculator()->run()->save();

            // Herbereken de afhankelijke gegevens op het project
            $participantMutation->participation->project->calculator()->run()->save();
        });

        // Calculate participation worth based on current book worth of project
        if($participantMutation->status->code_ref === 'final' && $project->projectType->code_ref !== 'loan') {
            $currentBookWorthOfProject = $project->currentBookWorth() * $participantMutation->quantity;

            $participantMutation->participation_worth = $currentBookWorthOfProject;
            $participantMutation->save();
        }
    }
}