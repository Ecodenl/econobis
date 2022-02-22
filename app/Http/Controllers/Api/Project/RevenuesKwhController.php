<?php

namespace App\Http\Controllers\Api\Project;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Occupation\OccupationContact;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\RevenuesKwh\RevenueDistributionKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Helpers\CSV\RevenueDistributionCSVHelper;
use App\Helpers\CSV\RevenueDistributionKwhCSVHelper;
use App\Helpers\Delete\Models\DeleteRevenuesKwh;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Excel\EnergySupplierExcelHelper;
use App\Helpers\Project\RevenuesKwhHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Template\TemplateTableHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\Order\OrderController;
use App\Http\Resources\ParticipantProject\Templates\ParticipantReportMail;
use App\Http\Resources\Project\FullRevenueDistributionKwh;
use App\Http\Resources\Project\FullRevenuesKwh;
use App\Jobs\RevenueKwh\CreateRevenuesKwhReport;
use App\Jobs\RevenueKwh\ProcessRevenuesKwh;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Writer\Xls;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class RevenuesKwhController extends ApiController
{
    public function show(RevenuesKwh $revenuesKwh)
    {
        $revenuesKwh->load([
            'category',
            'project.administration',
            'project.projectType',
            'partsKwh',
            'createdBy',
        ]);

        return FullRevenuesKwh::make($revenuesKwh);
    }

    public function csv(RevenuesKwh $revenuesKwh)
    {
        set_time_limit(0);

        $revenuesKwh = new RevenueDistributionKwhCSVHelper($revenuesKwh, $revenuesKwh->project->project_type_id);

        return $revenuesKwh->downloadCSV();
    }

    public function getRevenueDistribution(RevenuesKwh $revenuesKwh, Request $request)
    {
        $limit = 100;
        $offset = $request->input('page') ? $request->input('page') * $limit : 0;

        $distributionKwh = $revenuesKwh->distributionKwh()->limit($limit)->offset($offset)->orderBy('status')->get();
        $distributionKwhIdsTotal = $revenuesKwh->distributionKwh()->pluck('id')->toArray();
        $total = $revenuesKwh->distributionKwh()->count();

        return FullRevenueDistributionKwh::collection($distributionKwh)
            ->additional(['meta' => [
                'total' => $total,
                'distributionKwhIdsTotal' => $distributionKwhIdsTotal,
            ]
            ]);

    }

    public function store(RequestInput $requestInput, Request $request)
    {
        $this->authorize('manage', RevenuesKwh::class);

        $data = $requestInput
            ->integer('categoryId')->validate('required|exists:project_revenue_category,id')->alias('category_id')->next()
            ->string('distributionTypeId')->onEmpty(null)->alias('distribution_type_id')->next()
            ->integer('projectId')->validate('required|exists:projects,id')->alias('project_id')->next()
            ->boolean('confirmed')->next()
            ->string('status')->whenMissing('concept')->onEmpty('concept')->next()
            ->date('dateBegin')->validate('nullable|date')->alias('date_begin')->next()
            ->date('dateEnd')->validate('nullable|date')->alias('date_end')->next()
            ->date('dateConfirmed')->validate('nullable|date')->onEmpty(null)->alias('date_confirmed')->next()
            ->double('payoutKwh')->alias('payout_kwh')->onEmpty(null)->whenMissing(null)->next()
            ->get();

        $revenuesKwh = new RevenuesKwh();

        $revenuesKwh->fill($data);

        $revenuesKwh->save();

        $valuesKwhData = $request->get("valuesKwh");

        $revenuesKwhHelper = new RevenuesKwhHelper();
        $revenuesKwhHelper->createStartRevenueValuesKwh($valuesKwhData, $revenuesKwh);
        $revenuesKwhHelper->createStartRevenuePartsKwh($revenuesKwh);

        $this->saveParticipantsOfDistribution($revenuesKwh);

        $revenuesKwh->load('createdBy', 'project');

        return FullRevenuesKwh::make($revenuesKwh);
    }

    public function update(RequestInput $requestInput, RevenuesKwh $revenuesKwh)
    {
        $this->authorize('manage', RevenuesKwh::class);
        $data = $requestInput
            ->string('distributionTypeId')->onEmpty(null)->alias('distribution_type_id')->next()
            ->boolean('confirmed')->next()
            ->string('status')->whenMissing('concept')->onEmpty('concept')->next()
            ->date('dateBegin')->validate('nullable|date')->alias('date_begin')->next()
            ->date('dateEnd')->validate('nullable|date')->alias('date_end')->next()
            ->date('dateConfirmed')->validate('nullable|date')->onEmpty(null)->alias('date_confirmed')->next()
            ->double('payoutKwh')->alias('payout_kwh')->onEmpty(null)->whenMissing(null)->next()
            ->get();

        $revenuesKwh->fill($data);

        $revenuesKwhConfirmedIsDirty = false;
        if($revenuesKwh->isDirty('confirmed')){
            $revenuesKwhConfirmedIsDirty = true;
        }

        $recalculateDistribution = false;
        if($revenuesKwh->isDirty('date_begin') ||
            $revenuesKwh->isDirty('date_end') ||
            $revenuesKwh->isDirty('payout_kwh') ||
            $revenuesKwhConfirmedIsDirty) {
            $recalculateDistribution = true;
        }

        if($revenuesKwh->confirmed) {
            if ($revenuesKwh->status == 'concept') {
                // Alle voorgaande parts met status concept ook definitief maken (confirmed)
                foreach ($revenuesKwh->conceptPartsKwh as $conceptRevenuePartKwh){
                    $conceptRevenuePartKwh->confirmed = true;
                    $conceptRevenuePartKwh->status = 'confirmed';
                    $conceptRevenuePartKwh->date_confirmed = $revenuesKwh->date_confirmed;
                    foreach($conceptRevenuePartKwh->conceptDistributionPartsKwh as $distributionPreviousPartsKwh){
                        $distributionPreviousPartsKwh->status = 'confirmed';
                        $distributionPreviousPartsKwh->save();
                    }
                    foreach($conceptRevenuePartKwh->conceptDistributionValuesKwh as $distributionPreviousValuesKwh){
                        $distributionPreviousValuesKwh->status = 'confirmed';
                        $distributionPreviousValuesKwh->save();
                    }
                    $conceptRevenuePartKwh->save();
                    $conceptRevenuePartKwh->calculator()->runRevenueKwh(null);
                }
                $revenuesKwh->status = 'confirmed';
            }
        }
        $revenuesKwh->save();

        if($recalculateDistribution)  $this->saveParticipantsOfDistribution($revenuesKwh);

        return FullRevenuesKwh::collection(RevenuesKwh::where('project_id',
            $revenuesKwh->project_id)
            ->with('createdBy', 'project', 'partsKwh', 'distributionKwh')
            ->orderBy('date_begin')->get());
    }

    //todo WM: dit naar job verplaatsen ?!
    public function saveParticipantsOfDistribution(RevenuesKwh $revenuesKwh)
    {
        set_time_limit(300);

        $project = $revenuesKwh->project;
        $participants = $project->participantsProject;
        foreach ($participants as $participant) {
            $this->saveDistributionKwh($revenuesKwh, $participant);
        }
    }

    public function saveDistributionKwh(RevenuesKwh $revenuesKwh, ParticipantProject $participant):void
    {
        $contact = Contact::find($participant->contact_id);
        if($participant->address){
            $participantAddress = $participant->address;
        }else{
            $participantAddress = $participant->contact->primaryAddress;
        }

        // If participant already is added to project revenue distribution then update
        if(RevenueDistributionKwh::where('revenue_id', $revenuesKwh->id)->where('participation_id', $participant->id)->exists()) {
            $distributionKwh = RevenueDistributionKwh::where('revenue_id', $revenuesKwh->id)->where('participation_id', $participant->id)->first();
//todo WM: opschonen
//            Log::info('Bijwerken distributionKwh: ' . $distributionKwh->id . ' - revenueKwh id: ' . $revenuesKwh->id . ' - oud id: ' . $revenuesKwh->old_revenue_id );
        } else {
            $distributionKwh = new RevenueDistributionKwh();
//todo WM: opschonen
//            Log::info('Nieuwe distributionKwh: ' . $distributionKwh->id . ' - revenueKwh id: ' . $revenuesKwh->id . ' - oud id: ' . $revenuesKwh->old_revenue_id );
            $distributionKwh->revenue_id = $revenuesKwh->id;
            $distributionKwh->participation_id = $participant->id;
            $distributionKwh->contact_id = $contact->id;
        }

        if($revenuesKwh->confirmed) {
            $distributionKwh->status = 'confirmed';
        } else {
            $distributionKwh->status = 'concept';
        }

        if ($participantAddress) {
            $distributionKwh->street = $participantAddress->street;
            $distributionKwh->street_number = $participantAddress->number;
            $distributionKwh->street_number_addition = $participantAddress->addition;
            $distributionKwh->address = $participantAddress->present()->streetAndNumber();
            $distributionKwh->postal_code = $participantAddress->postal_code;
            $distributionKwh->city = $participantAddress->city;
            $distributionKwh->country = $participantAddress->country_id ? $participantAddress->country->name : '';
            $distributionKwh->energy_supplier_ean_electricity = $participantAddress->ean_electricity;
        }
        $distributionKwh->participations_quantity = $this->determineParticipationsQuantity($distributionKwh);
        $distributionKwh->save();
    }

    protected function determineParticipationsQuantity(RevenueDistributionKwh $distributionKwh)
    {
        $quantityOfParticipations = 0;
        $dateBeginInitial = Carbon::parse($distributionKwh->participation->date_register);
        $dateEndInitial = Carbon::parse($distributionKwh->revenuesKwh->date_end);
        $mutations = $distributionKwh->participation->mutationsDefinitiveForKwhPeriod;
        foreach ($mutations as $index => $mutation) {
            $dateEntry = Carbon::parse($mutation->date_entry);
            if($dateEntry >= $dateBeginInitial && $dateEntry <= $dateEndInitial){
                $quantityOfParticipations += $mutation->quantity;
            }
        }

        return $quantityOfParticipations;
    }

    public function createEnergySupplierReport(
        Request $request,
        RevenuesKwh $revenuesKwh,
        DocumentTemplate $documentTemplate
    )
    {
        $project = $revenuesKwh->project;

        $documentName = $request->input('documentName');

        //get current logged in user
        $user = Auth::user();

        //load template parts
        $documentTemplate->load('footer', 'baseTemplate', 'header');

        $html = $documentTemplate->header ? $documentTemplate->header->html_body
            : '';

        if ($documentTemplate->baseTemplate) {
            $html .= TemplateVariableHelper::replaceTemplateTagVariable($documentTemplate->baseTemplate->html_body,
                $documentTemplate->html_body, '', '');
        } else {
            $html .= TemplateVariableHelper::replaceTemplateFreeTextVariables($documentTemplate->html_body,
                '', '');
        }

        $html .= $documentTemplate->footer
            ? $documentTemplate->footer->html_body : '';

        $energySupplierHtml
            = TemplateVariableHelper::replaceTemplateVariables($html,
            'opbrengst', $revenuesKwh);
        $energySupplierHtml
            = TemplateVariableHelper::replaceTemplateVariables($energySupplierHtml,
            'project', $project);
        $energySupplierHtml
            = TemplateVariableHelper::replaceTemplateVariables($energySupplierHtml,
            'ik', $user);
        $energySupplierHtml
            = TemplateVariableHelper::replaceTemplateVariables($energySupplierHtml,
            'administratie', $project->administration);

        $energySupplierHtml
            = TemplateVariableHelper::stripRemainingVariableTags($energySupplierHtml);

        $pdf = PDF::loadView('documents.generic', [
            'html' => $energySupplierHtml,
        ])->output();

        $document = new Document();
        $document->document_type = 'internal';
        $document->document_group = 'revenue';
        $document->project_id = $project->id;

        $document->filename = $documentName . '.pdf';

        $document->save();

        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'documents/'
            . $document->filename));
        file_put_contents($filePath, $pdf);

        $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));

        $alfrescoResponse = $alfrescoHelper->createFile($filePath,
            $document->filename, $document->getDocumentGroup()->name);

        $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
        $document->save();

        //delete file on server, still saved on alfresco.
        Storage::disk('documents')->delete($document->filename);
    }

    public function createEnergySupplierAllExcel(
        Request $request,
        RevenuesKwh $revenuesKwh
    )
    {
        $energySupplierIds = array_unique($revenuesKwh->distributionKwh()->whereNotNull('es_id')->pluck('es_id')->toArray());
        foreach ($energySupplierIds as $energySupplierId) {
            $energySupplier = EnergySupplier::find($energySupplierId);
            $this->createEnergySupplierExcel($request, $revenuesKwh, $energySupplier, true);
        }
    }

    public function createEnergySupplierOneExcel(
        Request $request,
        RevenuesKwh $revenuesKwh,
        EnergySupplier $energySupplier
    )
    {
            $this->createEnergySupplierExcel($request, $revenuesKwh, $energySupplier, false);
    }

    protected function createEnergySupplierExcel(
        Request $request,
        RevenuesKwh $revenuesKwh,
        EnergySupplier $energySupplier,
        $createAll
    )
    {
        $project = $revenuesKwh->project;

        switch ($energySupplier->file_format_id){
            case 1:
                $fileFormat = '.xls';
                break;
            default:
                $fileFormat = '.xlsx';
                break;
        }

        $documentName = $request->input('documentName');
        $fileName = $createAll ? ($documentName . '-' . $energySupplier->abbreviation . $fileFormat) : $documentName . $fileFormat;
        $templateId = $energySupplier->excel_template_id;

        if ($templateId) {
            set_time_limit(0);
            $excelHelper = new EnergySupplierExcelHelper($energySupplier,
                $revenuesKwh, $templateId, $fileName);
            $excel = $excelHelper->getExcel();
        }else{
            abort(412, 'Geen geldige excel template gevonden.');
        }

        $document = new Document();
        $document->document_type = 'internal';
        $document->document_group = 'revenue';
        $document->project_id = $project->id;

        $document->filename = $fileName;

        $document->save();

        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'documents' . DIRECTORY_SEPARATOR
            . $document->filename));

        switch ($energySupplier->file_format_id){
            case 1:
                $writer = new Xls($excel);
                break;
            default:
                $writer = new Xlsx($excel);
                break;
        }
        $writer->save($filePath);

//        die("stop hier maar even voor testdoeleinden Excel (behoud file.xlsx in storage/app/documents)");

        if(\Config::get('app.ALFRESCO_COOP_USERNAME') != 'local')
        {
            $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));

            $alfrescoResponse = $alfrescoHelper->createFile($filePath,
                $document->filename, $document->getDocumentGroup()->name);
            $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
        }else{
            $alfrescoResponse = null;
        }

        $document->save();

        //delete file on server, still saved on alfresco.
        if(\Config::get('app.ALFRESCO_COOP_USERNAME') != 'local') {
            Storage::disk('documents')->delete($document->filename);
        }
    }

    public function destroy(RevenuesKwh $revenuesKwh)
    {
        $this->authorize('manage', RevenuesKwh::class);

        try {
            DB::beginTransaction();

            $deleteRevenuesKwh = new DeleteRevenuesKwh($revenuesKwh);
            $result = $deleteRevenuesKwh->delete();

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

    public function peekDistributionKwhByIds(Request $request)
    {
        $this->authorize('manage', RevenuesKwh::class);

        $ids = $request->input('ids') ? $request->input('ids') : [];

        $distribution = RevenueDistributionKwh::whereIn('id', $ids)->with(['revenuesKwh'])->get();

        return FullRevenueDistributionKwh::collection($distribution);
    }

    public function downloadPreview(Request $request, RevenueDistributionKwh $distributionKwh)
    {
        //get current logged in user
        $user = Auth::user();

        //load template parts
        $documentTemplate = DocumentTemplate::find($request->input('documentTemplateId'));
        $documentTemplate->load('footer', 'baseTemplate', 'header');

        $html = $documentTemplate->header ? $documentTemplate->header->html_body : '';

        if ($documentTemplate->baseTemplate) {
            $html .= TemplateVariableHelper::replaceTemplateTagVariable($documentTemplate->baseTemplate->html_body,
                $documentTemplate->html_body, '', '');
        } else {
            $html .= TemplateVariableHelper::replaceTemplateFreeTextVariables($documentTemplate->html_body,
                '', '');
        }

        $html .= $documentTemplate->footer ? $documentTemplate->footer->html_body : '';

        if( !( empty($distributionKwh->address)
            || empty($distributionKwh->postal_code)
            || empty($distributionKwh->city) ) ) {

            $contact = $distributionKwh->contact;
            $orderController = new OrderController();
            $contactInfo = $orderController->getContactInfoForOrder($contact);
            $revenuesKwh = $distributionKwh->revenuesKwh;
            $project = $revenuesKwh->project;
            $administration = $project->administration;

            $html = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $html);

            $revenueHtml = TemplateTableHelper::replaceTemplateTables($html, $contact);

            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'contact', $contact);
            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml, 'portal');
            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml, 'contacten_portal');
            $revenueHtml = TemplateVariableHelper::replaceTemplateCooperativeVariables($revenueHtml, 'cooperatie');

            //wettelijk vertegenwoordiger
            if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
                $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)
                    ->where('occupation_id', 7)->first()->primaryContact;
                $revenueHtml
                    = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'wettelijk_vertegenwoordiger',
                    $wettelijkVertegenwoordiger);
            }
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'ik', $user);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'administratie', $administration);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'verdeling', $distributionKwh);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'opbrengst', $revenuesKwh);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'project', $project);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'deelname',
                $distributionKwh->participation);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'mutaties',
                $distributionKwh->participation->mutations);

            $revenueHtml
                = TemplateVariableHelper::stripRemainingVariableTags($revenueHtml);
            $pdf = PDF::loadView('documents.generic', [
                'html' => $revenueHtml,
            ])->output();

            return $pdf;
        }
        return null;
    }

    public function previewEmail(Request $request, RevenueDistributionKwh $distributionKwh)
    {
        $subject = $request->input('subject');
        $portalName = PortalSettings::get('portalName');
        $cooperativeName = PortalSettings::get('cooperativeName');
        $subject = str_replace('{cooperatie_portal_naam}', $portalName, $subject);
        $subject = str_replace('{cooperatie_naam}', $cooperativeName, $subject);

        //get current logged in user
        $user = Auth::user();

        //load template parts
        $emailTemplate = EmailTemplate::find($request->input('emailTemplateId'));

        if( !( empty($distributionKwh->address)
            || empty($distributionKwh->postal_code)
            || empty($distributionKwh->city) ) ) {

            $contact = $distributionKwh->contact;
            $orderController = new OrderController();

            $contactInfo = $orderController->getContactInfoForOrder($contact);
            $subject = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $subject);

            $primaryEmailAddress = $contact->primaryEmailAddress;

            $revenuesKwh = $distributionKwh->revenuesKwh;
            $project = $revenuesKwh->project;
            $administration = $project->administration;

            //Make preview email
            if ($primaryEmailAddress) {
                $mailbox = $this->setMailConfigByDistribution($distributionKwh);
                if ($mailbox) {
                    $fromEmail = $mailbox->email;
                    $fromName = $mailbox->name;
                } else {
                    $fromEmail = \Config::get('mail.from.address');
                    $fromName = \Config::get('mail.from.name');
                }

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

                //wettelijk vertegenwoordiger
                if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
                    $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)
                        ->where('occupation_id', 7)->first()->primaryContact;
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables,
                        'wettelijk_vertegenwoordiger', $wettelijkVertegenwoordiger);
                }

                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'ik', $user);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'administratie', $administration);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'verdeling', $distributionKwh);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'opbrengst', $revenuesKwh);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'project', $project);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'deelname', $distributionKwh->participation);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'mutaties', $distributionKwh->participation->mutations);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);

                $htmlBodyWithContactVariables = str_replace('{contactpersoon}', $contactInfo['contactPerson'],
                    $htmlBodyWithContactVariables);

                return [
                    'from' => $fromEmail,
                    'to' => $primaryEmailAddress->email,
                    'subject' => $subject,
                    'htmlBody' => $htmlBodyWithContactVariables
                ];
            } else {
                return [
                    'from' => 'Geen e-mail bekend.',
                    'to' => 'Geen e-mail bekend.',
                    'subject' => 'Geen e-mail bekend.',
                    'htmlBody' => 'Geen e-mail bekend.'
                ];
            }
        }
        return [
            'from' => 'Geen e-mail bekend.',
            'to' => 'Geen e-mail bekend.',
            'subject' => 'Geen e-mail bekend.',
            'htmlBody' => 'Geen e-mail bekend.'
        ];
    }

    public function createRevenuesKwhReport(Request $request)
    {
        set_time_limit(0);
        $distributionKwhIds = $request->input('distributionKwhIds');
        $subject = $request->input('subject');
        $documentTemplateId = $request->input('documentTemplateId');
        $emailTemplateId = $request->input('emailTemplateId');

        foreach($distributionKwhIds as $distributionKwhId) {
            CreateRevenuesKwhReport::dispatch($distributionKwhId, $subject, $documentTemplateId, $emailTemplateId, Auth::id());
        }

        return null;
    }

    public function createParticipantRevenueReport($subject, $distributionKwhId, DocumentTemplate $documentTemplate, EmailTemplate $emailTemplate)
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
                $documentTemplate->html_body, '', '');
        } else {
            $html .= TemplateVariableHelper::replaceTemplateFreeTextVariables($documentTemplate->html_body,
                '', '');
        }

        $html .= $documentTemplate->footer
            ? $documentTemplate->footer->html_body : '';

        $distributionKwh = RevenueDistributionKwh::find($distributionKwhId);

        if( !( empty($distributionKwh->address)
            || empty($distributionKwh->postal_code)
            || empty($distributionKwh->city) ) ) {

            $contact = $distributionKwh->contact;
            $orderController = new OrderController();

            $contactInfo = $orderController->getContactInfoForOrder($contact);
            $subject = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $subject);

            $primaryEmailAddress = $contact->primaryEmailAddress;

            $revenuesKwh = $distributionKwh->revenuesKwh;
            $project = $revenuesKwh->project;
            $administration = $project->administration;

            $html = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $html);

            $revenueHtml = TemplateTableHelper::replaceTemplateTables($html, $contact);

            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'contact', $contact);
            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml,'portal' );
            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml,'contacten_portal' );
            $revenueHtml = TemplateVariableHelper::replaceTemplateCooperativeVariables($revenueHtml,'cooperatie' );

            //wettelijk vertegenwoordiger
            if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
                $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)
                    ->where('occupation_id', 7)->first()->primaryContact;
                $revenueHtml
                    = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'wettelijk_vertegenwoordiger', $wettelijkVertegenwoordiger);
            }
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'ik', $user);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'administratie', $administration);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'verdeling', $distributionKwh);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'opbrengst', $revenuesKwh);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'project', $project);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'deelname', $distributionKwh->participation);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'mutaties', $distributionKwh->participation->mutations);

            $revenueHtml
                = TemplateVariableHelper::stripRemainingVariableTags($revenueHtml);
            $pdf = PDF::loadView('documents.generic', [
                'html' => $revenueHtml,
            ])->output();

            try
            {
                $time = Carbon::now();

                $document = new Document();
                $document->document_type = 'internal';
                $document->document_group = 'revenue';
                $document->contact_id = $contact->id;
                $document->project_id = $project->id;
                $document->participation_project_id = $distributionKwh->participation_id;
                $document->template_id = $documentTemplate->id;

                $filename = str_replace(' ', '', $this->translateToValidCharacterSet($project->code)) . '_'
                    . str_replace(' ', '', $this->translateToValidCharacterSet($contact->full_name));


                //max length name 25
                $filename = substr($filename, 0, 25);

                $document->filename = $filename
                    . substr($document->getDocumentGroup()->name, 0, 1)
                    . (Document::where('document_group', 'revenue')->count()
                        + 1) . '_' . $time->format('Ymd') . '.pdf';

                $document->save();

                $filePath = (storage_path('app' . DIRECTORY_SEPARATOR
                    . 'documents/' . $document->filename));
                file_put_contents($filePath, $pdf);

                $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'),
                    \Config::get('app.ALFRESCO_COOP_PASSWORD'));

                $alfrescoResponse = $alfrescoHelper->createFile($filePath,
                    $document->filename, $document->getDocumentGroup()->name);
                if($alfrescoResponse == null)
                {
                    throw new \Exception('Fout bij maken rapport document in Alfresco.');
                }
                $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
                $document->save();
            }
            catch (\Exception $e) {
                Log::error('Fout bij maken rapport document voor ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')' );
                Log::error($e->getMessage());
                array_push($messages, 'Fout bij maken rapport document voor ' . $primaryEmailAddress->email . ' (' . $contact->full_name . ')' );
            }

            //send email
            if ($primaryEmailAddress) {
                try{
                    $mailbox = $this->setMailConfigByDistribution($distributionKwh);
                    if ($mailbox) {
                        $fromEmail = $mailbox->email;
                        $fromName = $mailbox->name;
                    } else {
                        $fromEmail = \Config::get('mail.from.address');
                        $fromName = \Config::get('mail.from.name');
                    }

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

                    //wettelijk vertegenwoordiger
                    if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
                        $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)
                            ->where('occupation_id', 7)->first()->primaryContact;
                        $htmlBodyWithContactVariables
                            = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables,
                            'wettelijk_vertegenwoordiger', $wettelijkVertegenwoordiger);
                    }

                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'ik', $user);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'administratie', $administration);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'verdeling', $distributionKwh);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'opbrengst', $revenuesKwh);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'project', $project);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'deelname', $distributionKwh->participation);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'mutaties', $distributionKwh->participation->mutations);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);

                    $htmlBodyWithContactVariables = str_replace('{contactpersoon}', $contactInfo['contactPerson'],
                        $htmlBodyWithContactVariables);

                    $email->send(new ParticipantReportMail($email, $fromEmail, $fromName,
                        $htmlBodyWithContactVariables, $document));

                } catch (\Exception $e) {
                    Log::error( 'Fout bij verzenden email naar ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')' );
                    Log::error($e->getMessage());
                    array_push($messages, 'Fout bij verzenden email naar ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')' );
                }

            } else {
                return [
                    'from' => 'Geen e-mail bekend.',
                    'to' => 'Geen e-mail bekend.',
                    'subject' => 'Geen e-mail bekend.',
                    'htmlBody' => 'Geen e-mail bekend.'
                ];
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

    public function processRevenuesKwh(Request $request)
    {
        set_time_limit(0);
        $distributionKwhIds = $request->input('distributionKwhIds');
        $datePayout = $request->input('datePayout');

        ProcessRevenuesKwh::dispatch($distributionKwhIds, $datePayout, Auth::id());

        return RevenueDistributionKwh::find($distributionKwhIds[0])->revenuesKwh->project->administration_id;
    }

    public function processRevenuesKwhJob($distributionsKwh, $datePayout)
    {
//        set_time_limit(300);
//
//        if (!($distributionsKwh->first())->revenuesKwh->project->administration_id) {
//            abort(400,
//                'Geen administratie gekoppeld aan dit productie project');
//        }else{
//            $lastYearFinancialOverviewDefinitive =  $distributionsKwh->first()->revenuesKwh->project->lastYearFinancialOverviewDefinitive;
//            if( !empty($lastYearFinancialOverviewDefinitive) && !empty($datePayout) && Carbon::parse($datePayout)->year <= $lastYearFinancialOverviewDefinitive)
//            {
//                abort(400,'De uitkeringsdatum valt in jaar ' . Carbon::parse($datePayout)->year . ' waar al een definitive waardestaat voor dit project aanwezig is.');
//            }
//        }
//
//        foreach ($distributionsKwh as $distributionKwh) {
//            //status moet nog bevestigd (confirmed zijn)
//            if ($distributionKwh->status === 'confirmed')
//            {
//                // indien Opbrengst Kwh, dan geen voorwaarden inzake adres of IBAN
//                $distributionKwh->status = 'in-progress';
//                $distributionKwh->save();
//            }
//        }
//
//        foreach ($distributionsKwh as $distributionKwh) {
//            //todo WM: moet hier ook niet check op mutation allowed inzake definitieve waardestaten?
//            //status moet nu onderhanden zijn (in-progress zijn)
//            if ($distributionKwh->status === 'in-progress')
//            {
//                // indien Opbrengst Kwh, dan alleen mutation aanmaken en daarna status op Afgehandeld (processed).
//                if($distributionKwh->revenuesKwh->category->code_ref == 'revenueKwhSplit') {
//                    $addressEnergySupplier = AddressEnergySupplier::find($distributionKwh->participation->address->previous_address_energy_supplier_id);
//                }else{
//                    $addressEnergySupplier = $distributionKwh->participation->address->primaryAddressEnergySupplier;
//                }
//                if($distributionKwh->revenuesKwh->category->code_ref !== 'revenueKwhSplit'){
//                    $this->createParticipantMutationForRevenueKwh($distributionKwh, $datePayout, $addressEnergySupplier);
//                }
//                $distributionKwh->status = 'processed';
//                $distributionKwh->save();
//            }
//        }
    }

    protected function createParticipantMutationForRevenueKwh(RevenueDistributionKwh $distributionKwh, $datePayout, $addressEnergySupplier){
//        $participantMutation = new ParticipantMutation();
//        $participantMutation->participation_id = $distributionKwh->participation_id;
//        $participantMutation->type_id = ParticipantMutationType::where('code_ref', 'energyTaxRefund')->where('project_type_id', $distributionKwh->participation->project->project_type_id)->value('id');
//        $participantMutation->payout_kwh_price = $distributionKwh->payout_kwh;
//        $participantMutation->payout_kwh = $distributionKwh->delivered_total;
//        $participantMutation->indication_of_restitution_energy_tax = $distributionKwh->KwhReturn;
//        $participantMutation->paid_on = $addressEnergySupplier ? $addressEnergySupplier->energySupplier->name : '';
//        $participantMutation->date_payment = $datePayout;
//        $participantMutation->save();
    }

    protected function setMailConfigByDistribution(RevenueDistributionKwh $distributionKwh)
    {
        // Standaard vanuit primaire mailbox mailen
        $mailboxToSendFrom = Mailbox::getDefault();

        // Als er een mailbox aan de administratie is gekoppeld, dan deze gebruiken
        $project = $distributionKwh->revenuesKwh->project;

        if ($project->administration && $project->administration->mailbox) {
            $mailboxToSendFrom = $project->administration->mailbox;
        }

        // Configuratie instellen als er een mailbox is gevonden
        if ($mailboxToSendFrom) {
            (new EmailHelper())->setConfigToMailbox($mailboxToSendFrom);
        }
        return $mailboxToSendFrom;
    }

    protected function translateToValidCharacterSet($field){

        $field = iconv('UTF-8', 'ASCII//TRANSLIT', $field);
        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);

        return $field;
    }


}