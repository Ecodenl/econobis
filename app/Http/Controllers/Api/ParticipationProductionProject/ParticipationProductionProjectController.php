<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\ParticipationProductionProject;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Document\Document;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Helpers\CSV\ParticipantCSVHelper;
use App\Helpers\Delete\DeleteHelper;
use App\Helpers\Template\TemplateTableHelper;
use App\Http\Resources\Contact\ContactPeek;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use Barryvdh\DomPDF\Facade as PDF;
use App\Eco\ParticipantProductionProject\ParticipantProductionProject;
use App\Eco\ParticipantTransaction\ParticipantTransaction;
use App\Eco\PostalCodeLink\PostalCodeLink;
use App\Eco\ProductionProject\ProductionProject;
use App\Helpers\RequestInput\RequestInput;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\ParticipantProductionProject\Grid\RequestQuery;
use App\Http\Resources\ParticipantProductionProject\FullParticipantProductionProject;
use App\Http\Resources\ParticipantProductionProject\GridParticipantProductionProject;
use App\Http\Resources\ParticipantProductionProject\ParticipantProductionProjectPeek;
use App\Http\Resources\ParticipantProductionProject\Templates\ParticipantReportMail;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class ParticipationProductionProjectController extends ApiController
{
    public function grid(RequestQuery $requestQuery)
    {
        $participantProductionProject = $requestQuery->get();

        $participantProductionProject->load([
            'contact.primaryContactEnergySupplier.energySupplier',
            'contact.primaryAddress',
            'contact.primaryEmailAddress',
            'participantProductionProjectStatus',
            'productionProject',
    ]);

        return GridParticipantProductionProject::collection($participantProductionProject)
            ->additional(['meta' => [
                'total' => $requestQuery->total(),
            ]
            ]);
    }

    public function csv(RequestQuery $requestQuery)
    {
        $participants = $requestQuery->getQueryNoPagination()->get();

        $participantCSVHelper = new ParticipantCSVHelper($participants);

        $csv = $participantCSVHelper->downloadCSV();

        return $csv;
    }

    public function show(ParticipantProductionProject $participantProductionProject)
    {
        $participantProductionProject->load([
            'contact',
            'productionProject',
            'participantProductionProjectStatus',
            'participantProductionProjectPayoutType',
            'giftedByContact',
            'legalRepContact',
            'transactions.type',
            'transactions.createdBy',
            'obligationNumbers',
            'documents',
        ]);

        return FullParticipantProductionProject::make($participantProductionProject);
    }

    public function store(RequestInput $requestInput)
    {
        $this->authorize('manage', ParticipantProductionProject::class);

        $data = $requestInput
            ->integer('contactId')->validate('required|exists:contacts,id')->alias('contact_id')->next()
            ->integer('statusId')->validate('required|exists:participant_production_project_status,id')->alias('status_id')->next()
            ->integer('productionProjectId')->validate('required|exists:production_projects,id')->alias('production_project_id')->next()
            ->date('dateRegister')->validate('nullable|date')->onEmpty(null)->alias('date_register')->next()
            ->integer('participationsRequested')->alias('participations_requested')->next()
            ->integer('participationsGranted')->alias('participations_granted')->next()
            ->integer('participationsSold')->alias('participations_sold')->next()
            ->integer('participationsRestSale')->alias('participations_rest_sale')->next()
            ->date('dateContractSend')->validate('nullable|date')->onEmpty(null)->alias('date_contract_send')->next()
            ->date('dateContractRetour')->validate('nullable|date')->onEmpty(null)->alias('date_contract_retour')->next()
            ->date('datePayed')->validate('nullable|date')->onEmpty(null)->alias('date_payed')->next()
            ->string('ibanPayed')->alias('iban_payed')->next()
            ->boolean('didAcceptAgreement')->alias('did_accept_agreement')->next()
            ->string('ibanAttn')->alias('iban_attn')->next()
            ->integer('giftedByContactId')->validate('nullable|exists:contacts,id')->onEmpty(null)->alias('gifted_by_contact_id')->next()
            ->string('ibanPayout')->alias('iban_payout')->next()
            ->integer('legalRepContactId')->validate('nullable|exists:contacts,id')->onEmpty(null)->alias('legal_rep_contact_id')->next()
            ->string('ibanPayoutAttn')->alias('iban_payout_attn')->next()
            ->date('dateEnd')->validate('nullable|date')->onEmpty(null)->alias('date_end')->next()
            ->integer('typeId')->validate('nullable|exists:participant_production_project_payout_type,id')->onEmpty(null)->alias('type_id')->next()
            ->integer('powerKwhConsumption')->alias('power_kwh_consumption')->next()
            ->get();

        $participantProductionProject = new ParticipantProductionProject();

        $participantProductionProject->fill($data);

        $participantProductionProject->save();

        $productionProject = ProductionProject::find($participantProductionProject->production_project_id);
        $contact = Contact::find($participantProductionProject->contact_id);

        $message = [];

        if($productionProject->is_membership_required){
            $hasGroup = false;

            foreach($productionProject->requiresContactGroups as $contactGroup) {
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

        switch($productionProject->production_project_type_id) {
            case 1: //SDE
                return ['id' => $participantProductionProject->id];
                break;
            case 2: //PCR
                $this->validatePostalCode($message, $productionProject, $contact);
                $this->validateUsage($message, $productionProject, $participantProductionProject);
                $this->validateEnergySupplier($message, $contact);
                break;
            case 3: //Investering
                return ['id' => $participantProductionProject->id];
                break;
            case 4: //Rente+aflossing
                return ['id' => $participantProductionProject->id];
                break;
            default:
                return ['id' => $participantProductionProject->id];
                break;
        }

        return ['id' => $participantProductionProject->id, 'message' => $message];
    }


    public function update(RequestInput $requestInput, ParticipantProductionProject $participantProductionProject)
    {
        $this->authorize('manage', ParticipantProductionProject::class);

        $data = $requestInput
            ->integer('statusId')->validate('required|exists:participant_production_project_status,id')->alias('status_id')->next()
            ->date('dateRegister')->validate('nullable|date')->onEmpty(null)->alias('date_register')->next()
            ->integer('participationsRequested')->alias('participations_requested')->next()
            ->integer('participationsGranted')->alias('participations_granted')->next()
            ->integer('participationsSold')->alias('participations_sold')->next()
            ->integer('participationsRestSale')->alias('participations_rest_sale')->next()
            ->date('dateContractSend')->validate('nullable|date')->onEmpty(null)->alias('date_contract_send')->next()
            ->date('dateContractRetour')->validate('nullable|date')->onEmpty(null)->alias('date_contract_retour')->next()
            ->date('datePayed')->validate('nullable|date')->onEmpty(null)->alias('date_payed')->next()
            ->string('ibanPayed')->alias('iban_payed')->next()
            ->boolean('didAcceptAgreement')->alias('did_accept_agreement')->next()
            ->string('ibanAttn')->alias('iban_attn')->next()
            ->integer('giftedByContactId')->validate('nullable|exists:contacts,id')->onEmpty(null)->alias('gifted_by_contact_id')->next()
            ->string('ibanPayout')->alias('iban_payout')->next()
            ->integer('legalRepContactId')->validate('nullable|exists:contacts,id')->onEmpty(null)->alias('legal_rep_contact_id')->next()
            ->string('ibanPayoutAttn')->alias('iban_payout_attn')->next()
            ->date('dateEnd')->validate('nullable|date')->onEmpty(null)->alias('date_end')->next()
            ->integer('typeId')->validate('required|exists:participant_production_project_payout_type,id')->alias('type_id')->next()
            ->integer('powerKwhConsumption')->alias('power_kwh_consumption')->next()
            ->get();

        $participantProductionProject->fill($data);

        $participantProductionProject->save();

        return $this->show($participantProductionProject);
    }

    public function transfer(RequestInput $requestInput)
    {
        $this->authorize('manage', ParticipantProductionProject::class);

        $data = $requestInput
            ->integer('participationId')->validate('required|exists:participation_production_project,id')->alias('participation_id')->next()
            ->integer('transferToContactId')->validate('required')->alias('transfer_to_contact_id')->next()
            ->integer('participationsAmount')->alias('participations_amount')->next()
            ->integer('participationWorth')->alias('participation_worth')->next()
            ->integer('didSign')->next()
            ->date('dateBook')->validate('nullable|date')->onEmpty(null)->alias('date_book')->next()
            ->get();

        $participation = ParticipantProductionProject::find($data['participation_id']);

        $productionProjectId = $participation->productionProject->id;

        $participation->participations_sold = $participation->participations_sold + $data['participations_amount'];
        $participation->save();

        //if 0 then participations are lost
        if($data['transfer_to_contact_id'] != 0){
            //add participations to other contact
            if(ParticipantProductionProject::where('production_project_id', $productionProjectId)->where('contact_id', $data['transfer_to_contact_id'])->exists()){
                $participationReceiving = ParticipantProductionProject::where('production_project_id', $productionProjectId)->where('contact_id', $data['transfer_to_contact_id'])->first();
                $participationReceiving->participations_granted = $participationReceiving->participations_granted + $data['participations_amount'];
                $participationReceiving->save();
            }
            //else create new one
            else{
                $participationReceiving = new ParticipantProductionProject();
                $participationReceiving->contact_id = $data['transfer_to_contact_id'];
                $participationReceiving->status_id = 2;//Definitief
                $participationReceiving->production_project_id = $productionProjectId;
                $participationReceiving->type_id = 1;//Rekening
                $participationReceiving->participations_granted = $data['participations_amount'];
                $participationReceiving->save();
            }

            //create new transaction for receiving
            $transactionReceiving = new ParticipantTransaction();
            $transactionReceiving->participation_id = $participationReceiving->id;
            $transactionReceiving->type_id = 1;//Inleg
            $transactionReceiving->date_transaction = new Carbon;
            $transactionReceiving->amount = $data['participations_amount'] * $data['participation_worth'];
            $transactionReceiving->date_booking = $data['date_book'] ;
            $transactionReceiving->save();

        }

        //create transaction for sending
        $transactionSending = new ParticipantTransaction();
        $transactionSending->participation_id = $participation->id;
        $transactionSending->type_id = 3;//Inleg
        $transactionSending->date_transaction = new Carbon;
        $transactionSending->amount = $data['participations_amount'] * $data['participation_worth'];
        $transactionSending->date_booking = $data['date_book'] ;
        $transactionSending->save();

        return $this->show($participation);
    }

    public function destroy(ParticipantProductionProject $participantProductionProject)
    {
        $this->authorize('manage', ParticipantProductionProject::class);

        DeleteHelper::delete($participantProductionProject);
    }

    public function peek()
    {

        $participants = ParticipantProductionProject::all();
        $participants->load(['contact', 'productionProject']);

        return ParticipantProductionProjectPeek::collection($participants);
    }

    public function validatePostalCode(&$message, ProductionProject $productionProject, Contact $contact)
    {
        $checkText = 'Postcode check: ';
        $primaryAddress = $contact->primaryAddress;

        if(!$primaryAddress){
            array_push($message, $checkText . 'Contact heeft geen primair adres.');
            return false;
        }

        if(!$productionProject->postal_code){
            array_push($message, $checkText . 'Productieproject heeft geen postcode.');
            return false;
        }

        $postalCodeAreaContact = substr($primaryAddress->postal_code, 0 , 4);

        if(!($postalCodeAreaContact > 999 && $postalCodeAreaContact < 9999)){
            array_push($message, $checkText . 'Contact heeft geen geldige postcode op zijn primaire adres.');
            return false;
        }

        $postalCodeAreaProductionProject = substr($productionProject->postal_code, 0 , 4);

        if(!($postalCodeAreaProductionProject > 999 && $postalCodeAreaProductionProject < 9999)){
            array_push($message, $checkText . 'Productieproject heeft geen geldige postcode.');
            return false;
        }

        $validPostalAreas = PostalCodeLink::where('postalcode_main', $postalCodeAreaProductionProject)->pluck('postalcode_link')->toArray();

        if(!$validPostalAreas){
            array_push($message, $checkText . 'Productieproject postcode heeft geen postcoderoos.');
            return false;
        }

        if(!in_array($postalCodeAreaContact, $validPostalAreas)){
            array_push($message, $checkText . 'Postcode nummer ' . $postalCodeAreaContact . ' niet gevonden in toegestane postcode(s): ' . implode(', ', $validPostalAreas) . '.');
            return false;
        }
    }

    public function validateUsage(&$message, ProductionProject $productionProject, ParticipantProductionProject $participant)
    {
        $checkText = 'Gebruik check: ';

        if(!$productionProject->power_kw_available){
            array_push($message, $checkText . 'Productieproject heeft nog geen opgesteld vermogen.');
            return false;
        }

        if(!$productionProject->total_participations){
            array_push($message, $checkText . 'Productieproject heeft nog geen totaal aantal participaties.');
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

        $participantProduction =  (($productionProject->power_kw_available /  $productionProject->total_participations) * $participant->participations_requested) * 0.8;

        if($participantProduction > $participant->power_kwh_consumption){
            array_push($message, $checkText . 'Participant produceert ' . round($participantProduction, 2) . ' dit is meer dan hij consumeert: ' . round($participant->power_kwh_consumption, 2) . '.');
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

            $participant = ParticipantProductionProject::find($participantId);

            $contact = $participant->contact;
            $primaryEmailAddress = $contact->primaryEmailAddress;

            $productionProject = $participant->productionProject;

            if(!$previewEmail){
            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($html,'contact', $contact);
            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($revenueHtml,'participant', $participant);
            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($revenueHtml,'productie_project', $productionProject);
            $revenueHtml = TemplateVariableHelper::replaceTemplateVariables($revenueHtml,'ik', $user);

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

            $filename = str_replace(' ', '', $productionProject->code) . '_' . str_replace(' ', '', $contact->full_name);

            //max length name 25
            $filename = substr($filename, 0, 25);

            $document->filename = $filename  . substr($document->getDocumentGroup()->name, 0, 1) . (Document::where('document_group', 'revenue')->count() + 1) . '_' .  $time->format('Ymd') . '.pdf';

            $document->save();

            $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'documents' . DIRECTORY_SEPARATOR . $document->filename));

            file_put_contents($filePath, $pdf);

            $alfrescoHelper = new AlfrescoHelper($user->email, $user->alfresco_password);

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
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables,'productie_project', $productionProject);
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

    public function peekContactsMembershipRequired(ParticipantProductionProject $participantProductionProject)
    {
        if($participantProductionProject->productionProject->is_membership_required){
            $contacts = Contact::select('id', 'full_name', 'number')->orderBy('full_name')->whereNull('deleted_at')->get();

            $contacts = $contacts->filter(function ($contact) use ($participantProductionProject) {
                foreach ($participantProductionProject->productionProject->requiresContactGroups as $contactGroup){
                    foreach ($contactGroup->all_contacts as $contactGroupContact) {
                        if ($contactGroupContact->id === $contact->id) {
                            return true;
                        }
                    }
                }
                return false;
            });

            //reset keys, because we unshift later on
            $contacts = $contacts->values();
        }
        else{
            $contacts = Contact::select('id', 'full_name', 'number')->orderBy('full_name')->whereNull('deleted_at')->get();
        }
        return ContactPeek::collection($contacts);
    }

    public function peekParticipantByIds(Request $request)
    {
        $participations = ParticipantProductionProject::whereIn('id',
            $request->input('ids'))->with('contact')->get();

        return FullParticipantProductionProject::collection($participations);
    }
}