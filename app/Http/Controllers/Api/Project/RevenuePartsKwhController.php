<?php

namespace App\Http\Controllers\Api\Project;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\RevenuesKwh\RevenueDistributionKwh;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use App\Eco\RevenuesKwh\RevenueDistributionValuesKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Eco\RevenuesKwh\RevenueValuesKwh;
use App\Eco\RevenuesKwh\RevenuePartsKwh;
use App\Helpers\Delete\Models\DeleteRevenuePartsKwh;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\Project\FullRevenueDistributionPartsKwh;
use App\Http\Resources\Project\FullRevenuePartsKwh;
use App\Jobs\RevenueKwh\CreateRevenuePartsKwhReport;
use App\Jobs\RevenueKwh\ProcessRevenuePartsKwh;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RevenuePartsKwhController extends ApiController
{
    public function show(RevenuePartsKwh $revenuePartsKwh)
    {
//        $revenuePartsKwh->load([
//            'distributionPartsKwh',
//        ]);

        return FullRevenuePartsKwh::make($revenuePartsKwh);
    }

//todo WM: RevenueDistributionPartsCSVHelper moet nog gemaakt worden.
//    public function csv(RevenuePartsKwh $revenuePartsKwh)
//    {
//        set_time_limit(0);
//
//        $revenuePartsKwh = new RevenueDistributionPartsCSVHelper($revenuePartsKwh->distributionPartsKwh);
//
//        return $revenuePartsKwh->downloadCSV();
//    }

    public function getRevenueDistributionParts(RevenuePartsKwh $revenuePartsKwh, Request $request)
    {
        $limit = 100;
        $offset = $request->input('page') ? $request->input('page') * $limit : 0;

        $distributionPartsKwh = $revenuePartsKwh->distributionPartsKwh()->limit($limit)->offset($offset)->orderBy('status')->get();
        $distributionPartsKwhIdsTotal = $revenuePartsKwh->distributionPartsKwh()->pluck('id')->toArray();
        $total = $revenuePartsKwh->distributionPartsKwh()->count();

        return FullRevenueDistributionPartsKwh::collection($distributionPartsKwh)
            ->additional(['meta' => [
                'total' => $total,
                'distributionPartsKwhIdsTotal' => $distributionPartsKwhIdsTotal,
            ]
            ]);

    }

    public function update(RequestInput $requestInput, Request $request, RevenuePartsKwh $revenuePartsKwh)
    {
        $this->authorize('manage', RevenuesKwh::class);

        $data = $requestInput
            ->boolean('confirmed')->next()
            ->string('status')->whenMissing('concept')->onEmpty('concept')->next()
            ->date('dateBegin')->validate('nullable|date')->alias('date_begin')->next()
            ->date('dateEnd')->validate('nullable|date')->alias('date_end')->next()
            ->date('dateConfirmed')->validate('nullable|date')->onEmpty(null)->alias('date_confirmed')->next()
            ->double('payoutKwh')->alias('payout_kwh')->onEmpty(null)->whenMissing(null)->next()
            ->get();

        $revenuePartsKwh->fill($data);

        if($revenuePartsKwh->status == 'new'){
            $revenuePartsKwh->status = 'concept';
        }

        if($revenuePartsKwh->confirmed) {
            // Alle voorgaande parts met status concept ook definitief maken (confirmed)
            $checkDateForPreviousPart = Carbon::parse($revenuePartsKwh->date_begin)->format('Y-m-d');
            $previousRevenuePartsKwh = RevenuePartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_end', '<', $checkDateForPreviousPart)->where('status', 'concept')->orderBy('date_begin')->get();
            foreach ($previousRevenuePartsKwh as $previousRevenuePartKwh){
                $previousRevenuePartKwh->confirmed = true;
                $previousRevenuePartKwh->status = 'confirmed';
                $previousRevenuePartKwh->date_confirmed = $revenuePartsKwh->date_confirmed;
                foreach($previousRevenuePartKwh->conceptDistributionPartsKwh as $distributionPreviousPartsKwh){
                    $distributionPreviousPartsKwh->status = 'confirmed';
                    $distributionPreviousPartsKwh->save();
                }
                foreach($previousRevenuePartKwh->conceptDistributionValuesKwh as $distributionPreviousValuesKwh){
                    $distributionPreviousValuesKwh->status = 'confirmed';
                    $distributionPreviousValuesKwh->save();
                }
                $previousRevenuePartKwh->save();
            }

            $revenuePartsKwh->status = 'confirmed';
            foreach($revenuePartsKwh->conceptDistributionPartsKwh as $distributionPartsKwh){
                $distributionPartsKwh->status = 'confirmed';
                $distributionPartsKwh->save();
            }
            foreach($revenuePartsKwh->conceptDistributionValuesKwh as $distributionValuesKwh){
                $distributionValuesKwh->status = 'confirmed';
                $distributionValuesKwh->save();
            }
        }

        $revenuePartsKwh->save();

        //todo WM: dit naar job queue (met status in-progress-calculate?
        $valuesKwhData = $request->get("valuesKwh");
        $revenuePartsKwh->calculator()->runRevenueKwh($valuesKwhData);

        return FullRevenuePartsKwh::collection(RevenuePartsKwh::where('revenue_id',
            $revenuePartsKwh->revenue_id)
            ->with('distributionPartsKwh')
            ->orderBy('date_begin')->get());
    }

    public function createEnergySupplierReport(
        Request $request,
        RevenuePartsKwh $revenuePartsKwh,
        DocumentTemplate $documentTemplate
    )
    {
//        $documentName = $request->input('documentName');
//
//        //get current logged in user
//        $user = Auth::user();
//
//        //load template parts
//        $documentTemplate->load('footer', 'baseTemplate', 'header');
//
//        $html = $documentTemplate->header ? $documentTemplate->header->html_body
//            : '';
//
//        if ($documentTemplate->baseTemplate) {
//            $html .= TemplateVariableHelper::replaceTemplateTagVariable($documentTemplate->baseTemplate->html_body,
//                $documentTemplate->html_body, '', '');
//        } else {
//            $html .= TemplateVariableHelper::replaceTemplateFreeTextVariables($documentTemplate->html_body,
//                '', '');
//        }
//
//        $html .= $documentTemplate->footer
//            ? $documentTemplate->footer->html_body : '';
//
//        $project = $revenuePartsKwh->revenuesKwh->project;
//
//        $energySupplierHtml
//            = TemplateVariableHelper::replaceTemplateVariables($html,
//            'opbrengst', $revenuePartsKwh);
//        $energySupplierHtml
//            = TemplateVariableHelper::replaceTemplateVariables($energySupplierHtml,
//            'project', $project);
//        $energySupplierHtml
//            = TemplateVariableHelper::replaceTemplateVariables($energySupplierHtml,
//            'ik', $user);
//        $energySupplierHtml
//            = TemplateVariableHelper::replaceTemplateVariables($energySupplierHtml,
//            'administratie', $project->administration);
//
//        $energySupplierHtml
//            = TemplateVariableHelper::stripRemainingVariableTags($energySupplierHtml);
//
//        $pdf = PDF::loadView('documents.generic', [
//            'html' => $energySupplierHtml,
//        ])->output();
//
//        $document = new Document();
//        $document->document_type = 'internal';
//        $document->document_group = 'revenue';
//        $document->project_id = $revenuePartsKwh->revenuesKwh->id;
//
//        $document->filename = $documentName . '.pdf';
//
//        $document->save();
//
//        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'documents/'
//            . $document->filename));
//        file_put_contents($filePath, $pdf);
//
//        $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));
//
//        $alfrescoResponse = $alfrescoHelper->createFile($filePath,
//            $document->filename, $document->getDocumentGroup()->name);
//
//        $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
//        $document->save();
//
//        //delete file on server, still saved on alfresco.
//        Storage::disk('documents')->delete($document->filename);
    }
//
//    public function createEnergySupplierAllExcel(
//        Request $request,
//        RevenuePartsKwh $revenuePartsKwh
//    )
//    {
//        $energySupplierIds = array_unique($revenuePartsKwh->distributionPartsKwh()->whereNotNull('es_id')->pluck('es_id')->toArray());
//        foreach ($energySupplierIds as $energySupplierId) {
//            $energySupplier = EnergySupplier::find($energySupplierId);
//            $this->createEnergySupplierExcel($request, $revenuePartsKwh, $energySupplier, true);
//        }
//    }
//
//    public function createEnergySupplierOneExcel(
//        Request $request,
//        RevenuePartsKwh $revenuePartsKwh,
//        EnergySupplier $energySupplier
//    )
//    {
//            $this->createEnergySupplierExcel($request, $revenuePartsKwh, $energySupplier, false);
//    }
//
//    protected function createEnergySupplierExcel(
//        Request $request,
//        RevenuePartsKwh $revenuePartsKwh,
//        EnergySupplier $energySupplier,
//        $createAll
//    )
//    {
//        switch ($energySupplier->file_format_id){
//            case 1:
//                $fileFormat = '.xls';
//                break;
//            default:
//                $fileFormat = '.xlsx';
//                break;
//        }
//
//        $documentName = $request->input('documentName');
//        $fileName = $createAll ? ($documentName . '-' . $energySupplier->abbreviation . $fileFormat) : $documentName . $fileFormat;
//        $templateId = $energySupplier->excel_template_id;
//
//        if ($templateId) {
//            set_time_limit(0);
//            $excelHelper = new EnergySupplierExcelHelper($energySupplier,
//                $revenuePartsKwh, $templateId, $fileName);
//            $excel = $excelHelper->getExcel();
//        }else{
//            abort(412, 'Geen geldige excel template gevonden.');
//        }
//
//        $document = new Document();
//        $document->document_type = 'internal';
//        $document->document_group = 'revenue';
//        $document->project_id = $revenuePartsKwh->revenuesKwh->id;
//
//        $document->filename = $fileName;
//
//        $document->save();
//
//        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'documents' . DIRECTORY_SEPARATOR
//            . $document->filename));
//
//        switch ($energySupplier->file_format_id){
//            case 1:
//                $writer = new Xls($excel);
//                break;
//            default:
//                $writer = new Xlsx($excel);
//                break;
//        }
//        $writer->save($filePath);
//
////        die("stop hier maar even voor testdoeleinden Excel (behoud file.xlsx in storage/app/documents)");
//
//        if(\Config::get('app.ALFRESCO_COOP_USERNAME') != 'local')
//        {
//            $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));
//
//            $alfrescoResponse = $alfrescoHelper->createFile($filePath,
//                $document->filename, $document->getDocumentGroup()->name);
//            $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
//        }else{
//            $alfrescoResponse = null;
//        }
//
//        $document->save();
//
//        //delete file on server, still saved on alfresco.
//        if(\Config::get('app.ALFRESCO_COOP_USERNAME') != 'local') {
//            Storage::disk('documents')->delete($document->filename);
//        }
//    }
//
//    public function destroy(RevenuePartsKwh $revenuePartsKwh)
//    {
//        $this->authorize('manage', RevenuesKwh::class);
//
//        try {
//            DB::beginTransaction();
//
//            $deleteRevenuePartsKwh = new DeleteRevenuePartsKwh($revenuePartsKwh);
//            $result = $deleteRevenuePartsKwh->delete();
//
//            if(count($result) > 0){
//                DB::rollBack();
//                abort(412, implode(";", array_unique($result)));
//            }
//
//            DB::commit();
//        } catch (\PDOException $e) {
//            DB::rollBack();
//            Log::error($e->getMessage());
//            abort(501, 'Er is helaas een fout opgetreden.');
//        }
//    }
//
    public function peekDistributionKwhPartsByIds(Request $request)
    {
        $this->authorize('manage', RevenuesKwh::class);

        $ids = $request->input('ids') ? $request->input('ids') : [];

        $distributionPartsKwh = RevenueDistributionPartsKwh::whereIn('id', $ids)->with(['revenuePartsKwh'])->get();

        return FullRevenueDistributionPartsKwh::collection($distributionPartsKwh);
    }
//
//    public function downloadPreview(Request $request, RevenueDistributionPartsKwh $distributionPartsKwh)
//    {
//        //get current logged in user
//        $user = Auth::user();
//
//        //load template parts
//        $documentTemplate = DocumentTemplate::find($request->input('documentTemplateId'));
//        $documentTemplate->load('footer', 'baseTemplate', 'header');
//
//        $html = $documentTemplate->header ? $documentTemplate->header->html_body : '';
//
//        if ($documentTemplate->baseTemplate) {
//            $html .= TemplateVariableHelper::replaceTemplateTagVariable($documentTemplate->baseTemplate->html_body,
//                $documentTemplate->html_body, '', '');
//        } else {
//            $html .= TemplateVariableHelper::replaceTemplateFreeTextVariables($documentTemplate->html_body,
//                '', '');
//        }
//
//        $html .= $documentTemplate->footer ? $documentTemplate->footer->html_body : '';
//
//        if( !( empty($distributionPartsKwh->address)
//            || empty($distributionPartsKwh->postal_code)
//            || empty($distributionPartsKwh->city) ) ) {
//
//            $contact = $distributionPartsKwh->contact;
//            $orderController = new OrderController();
//            $contactInfo = $orderController->getContactInfoForOrder($contact);
//            $revenuePartsKwh = $distributionPartsKwh->revenuePartsKwh;
//            $project = $revenuePartsKwh->revenuesKwh->project;
//            $administration = $project->administration;
//
//            $html = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $html);
//
//            $revenueHtml = TemplateTableHelper::replaceTemplateTables($html, $contact);
//
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'contact', $contact);
//            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml, 'portal');
//            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml, 'contacten_portal');
//            $revenueHtml = TemplateVariableHelper::replaceTemplateCooperativeVariables($revenueHtml, 'cooperatie');
//
//            //wettelijk vertegenwoordiger
//            if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
//                $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)
//                    ->where('occupation_id', 7)->first()->primaryContact;
//                $revenueHtml
//                    = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'wettelijk_vertegenwoordiger',
//                    $wettelijkVertegenwoordiger);
//            }
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'ik', $user);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'administratie', $administration);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'verdeling', $distributionPartsKwh);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'opbrengst', $revenuePartsKwh);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'project', $project);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'deelname',
//                $distributionPartsKwh->participation);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'mutaties',
//                $distributionPartsKwh->participation->mutations);
//
//            $revenueHtml
//                = TemplateVariableHelper::stripRemainingVariableTags($revenueHtml);
//            $pdf = PDF::loadView('documents.generic', [
//                'html' => $revenueHtml,
//            ])->output();
//
//            return $pdf;
//        }
//        return null;
//    }
//
//    public function previewEmail(Request $request, RevenueDistributionPartsKwh $distributionPartsKwh)
//    {
//        $subject = $request->input('subject');
//        $portalName = PortalSettings::get('portalName');
//        $cooperativeName = PortalSettings::get('cooperativeName');
//        $subject = str_replace('{cooperatie_portal_naam}', $portalName, $subject);
//        $subject = str_replace('{cooperatie_naam}', $cooperativeName, $subject);
//
//        //get current logged in user
//        $user = Auth::user();
//
//        //load template parts
//        $emailTemplate = EmailTemplate::find($request->input('emailTemplateId'));
//
//        if( !( empty($distributionPartsKwh->address)
//            || empty($distributionPartsKwh->postal_code)
//            || empty($distributionPartsKwh->city) ) ) {
//
//            $contact = $distributionPartsKwh->contact;
//            $orderController = new OrderController();
//
//            $contactInfo = $orderController->getContactInfoForOrder($contact);
//            $subject = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $subject);
//
//            $primaryEmailAddress = $contact->primaryEmailAddress;
//
//            $revenuePartsKwh = $distributionPartsKwh->revenuePartsKwh;
//            $project = $revenuePartsKwh->revenuesKwh->project;
//            $administration = $project->administration;
//
//            //Make preview email
//            if ($primaryEmailAddress) {
//                $mailbox = $this->setMailConfigByDistribution($distributionPartsKwh);
//                if ($mailbox) {
//                    $fromEmail = $mailbox->email;
//                    $fromName = $mailbox->name;
//                } else {
//                    $fromEmail = \Config::get('mail.from.address');
//                    $fromName = \Config::get('mail.from.name');
//                }
//
//                $email = Mail::to($primaryEmailAddress->email);
//                if (!$subject) {
//                    $subject = 'Participant rapportage Econobis';
//                }
//
//                $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'project', $project);
//
//                $email->subject = $subject;
//
//                $email->html_body
//                    = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
//                    . $subject . '</title></head>'
//                    . $emailTemplate->html_body . '</html>';
//
//                $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body,
//                    $contact);
//                $htmlBodyWithContactVariables
//                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'contact',
//                    $contact);
//
//                //wettelijk vertegenwoordiger
//                if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
//                    $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)
//                        ->where('occupation_id', 7)->first()->primaryContact;
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables,
//                        'wettelijk_vertegenwoordiger', $wettelijkVertegenwoordiger);
//                }
//
//                $htmlBodyWithContactVariables
//                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'ik', $user);
//                $htmlBodyWithContactVariables
//                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'administratie', $administration);
//                $htmlBodyWithContactVariables
//                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'verdeling', $distributionPartsKwh);
//                $htmlBodyWithContactVariables
//                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'opbrengst', $revenuePartsKwh);
//                $htmlBodyWithContactVariables
//                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'project', $project);
//                $htmlBodyWithContactVariables
//                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'deelname', $distributionPartsKwh->participation);
//                $htmlBodyWithContactVariables
//                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'mutaties', $distributionPartsKwh->participation->mutations);
//                $htmlBodyWithContactVariables
//                    = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);
//
//                $htmlBodyWithContactVariables = str_replace('{contactpersoon}', $contactInfo['contactPerson'],
//                    $htmlBodyWithContactVariables);
//
//                return [
//                    'from' => $fromEmail,
//                    'to' => $primaryEmailAddress->email,
//                    'subject' => $subject,
//                    'htmlBody' => $htmlBodyWithContactVariables
//                ];
//            } else {
//                return [
//                    'from' => 'Geen e-mail bekend.',
//                    'to' => 'Geen e-mail bekend.',
//                    'subject' => 'Geen e-mail bekend.',
//                    'htmlBody' => 'Geen e-mail bekend.'
//                ];
//            }
//        }
//        return [
//            'from' => 'Geen e-mail bekend.',
//            'to' => 'Geen e-mail bekend.',
//            'subject' => 'Geen e-mail bekend.',
//            'htmlBody' => 'Geen e-mail bekend.'
//        ];
//    }
//
    public function createRevenuePartsReport(Request $request)
    {
        set_time_limit(0);
        $distributionPartsKwhIds = $request->input('distributionPartsKwhIds');
        $subject = $request->input('subject');
        $documentTemplateId = $request->input('documentTemplateId');
        $emailTemplateId = $request->input('emailTemplateId');

        foreach($distributionPartsKwhIds as $distributionPartsKwhId) {
            CreateRevenuePartsKwhReport::dispatch($distributionPartsKwhId, $subject, $documentTemplateId, $emailTemplateId, Auth::id());
        }

        return null;
    }
//
//    public function createParticipantRevenueReport($subject, $distributionPartsKwhId, DocumentTemplate $documentTemplate, EmailTemplate $emailTemplate)
//    {
//        $portalName = PortalSettings::get('portalName');
//        $cooperativeName = PortalSettings::get('cooperativeName');
//        $subject = str_replace('{cooperatie_portal_naam}', $portalName, $subject);
//        $subject = str_replace('{cooperatie_naam}', $cooperativeName, $subject);
//
//        //get current logged in user
//        $user = Auth::user();
//
//        $messages = [];
//
//        //load template parts
//        $documentTemplate->load('footer', 'baseTemplate', 'header');
//
//        $html = $documentTemplate->header ? $documentTemplate->header->html_body : '';
//
//        if ($documentTemplate->baseTemplate) {
//            $html .= TemplateVariableHelper::replaceTemplateTagVariable($documentTemplate->baseTemplate->html_body,
//                $documentTemplate->html_body, '', '');
//        } else {
//            $html .= TemplateVariableHelper::replaceTemplateFreeTextVariables($documentTemplate->html_body,
//                '', '');
//        }
//
//        $html .= $documentTemplate->footer
//            ? $documentTemplate->footer->html_body : '';
//
//        $distributionPartsKwh = RevenueDistributionPartsKwh::find($distributionPartsKwhId);
//
//        if( !( empty($distributionPartsKwh->address)
//            || empty($distributionPartsKwh->postal_code)
//            || empty($distributionPartsKwh->city) ) ) {
//
//            $contact = $distributionPartsKwh->contact;
//            $orderController = new OrderController();
//
//            $contactInfo = $orderController->getContactInfoForOrder($contact);
//            $subject = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $subject);
//
//            $primaryEmailAddress = $contact->primaryEmailAddress;
//
//            $revenuePartsKwh = $distributionPartsKwh->revenuePartsKwh;
//            $project = $revenuePartsKwh->revenuesKwh->project;
//            $administration = $project->administration;
//
//            $html = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $html);
//
//            $revenueHtml = TemplateTableHelper::replaceTemplateTables($html, $contact);
//
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'contact', $contact);
//            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml,'portal' );
//            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml,'contacten_portal' );
//            $revenueHtml = TemplateVariableHelper::replaceTemplateCooperativeVariables($revenueHtml,'cooperatie' );
//
//            //wettelijk vertegenwoordiger
//            if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
//                $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)
//                    ->where('occupation_id', 7)->first()->primaryContact;
//                $revenueHtml
//                    = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'wettelijk_vertegenwoordiger', $wettelijkVertegenwoordiger);
//            }
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'ik', $user);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'administratie', $administration);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'verdeling', $distributionPartsKwh);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'opbrengst', $revenuePartsKwh);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'project', $project);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'deelname', $distributionPartsKwh->participation);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'mutaties', $distributionPartsKwh->participation->mutations);
//
//            $revenueHtml
//                = TemplateVariableHelper::stripRemainingVariableTags($revenueHtml);
//            $pdf = PDF::loadView('documents.generic', [
//                'html' => $revenueHtml,
//            ])->output();
//
//            try
//            {
//                $time = Carbon::now();
//
//                $document = new Document();
//                $document->document_type = 'internal';
//                $document->document_group = 'revenue';
//                $document->contact_id = $contact->id;
//                $document->project_id = $project->id;
//                $document->participation_project_id = $distributionPartsKwh->participation_id;
//                $document->template_id = $documentTemplate->id;
//
//                $filename = str_replace(' ', '', $this->translateToValidCharacterSet($project->code)) . '_'
//                    . str_replace(' ', '', $this->translateToValidCharacterSet($contact->full_name));
//
//
//                //max length name 25
//                $filename = substr($filename, 0, 25);
//
//                $document->filename = $filename
//                    . substr($document->getDocumentGroup()->name, 0, 1)
//                    . (Document::where('document_group', 'revenue')->count()
//                        + 1) . '_' . $time->format('Ymd') . '.pdf';
//
//                $document->save();
//
//                $filePath = (storage_path('app' . DIRECTORY_SEPARATOR
//                    . 'documents/' . $document->filename));
//                file_put_contents($filePath, $pdf);
//
//                $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'),
//                    \Config::get('app.ALFRESCO_COOP_PASSWORD'));
//
//                $alfrescoResponse = $alfrescoHelper->createFile($filePath,
//                    $document->filename, $document->getDocumentGroup()->name);
//                if($alfrescoResponse == null)
//                {
//                    throw new \Exception('Fout bij maken rapport document in Alfresco.');
//                }
//                $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
//                $document->save();
//            }
//            catch (\Exception $e) {
//                Log::error('Fout bij maken rapport document voor ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')' );
//                Log::error($e->getMessage());
//                array_push($messages, 'Fout bij maken rapport document voor ' . $primaryEmailAddress->email . ' (' . $contact->full_name . ')' );
//            }
//
//            //send email
//            if ($primaryEmailAddress) {
//                try{
//                    $mailbox = $this->setMailConfigByDistribution($distributionPartsKwh);
//                    if ($mailbox) {
//                        $fromEmail = $mailbox->email;
//                        $fromName = $mailbox->name;
//                    } else {
//                        $fromEmail = \Config::get('mail.from.address');
//                        $fromName = \Config::get('mail.from.name');
//                    }
//
//                    $email = Mail::to($primaryEmailAddress->email);
//                    if (!$subject) {
//                        $subject = 'Participant rapportage Econobis';
//                    }
//
//                    $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'project', $project);
//
//                    $email->subject = $subject;
//
//                    $email->html_body
//                        = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
//                        . $subject . '</title></head>'
//                        . $emailTemplate->html_body . '</html>';
//
//                    $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body,
//                        $contact);
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'contact',
//                        $contact);
//
//                    //wettelijk vertegenwoordiger
//                    if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
//                        $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)
//                            ->where('occupation_id', 7)->first()->primaryContact;
//                        $htmlBodyWithContactVariables
//                            = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables,
//                            'wettelijk_vertegenwoordiger', $wettelijkVertegenwoordiger);
//                    }
//
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'ik', $user);
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'administratie', $administration);
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'verdeling', $distributionPartsKwh);
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'opbrengst', $revenuePartsKwh);
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'project', $project);
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'deelname', $distributionPartsKwh->participation);
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'mutaties', $distributionPartsKwh->participation->mutations);
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);
//
//                    $htmlBodyWithContactVariables = str_replace('{contactpersoon}', $contactInfo['contactPerson'],
//                        $htmlBodyWithContactVariables);
//
//                    $email->send(new ParticipantReportMail($email, $fromEmail, $fromName,
//                        $htmlBodyWithContactVariables, $document));
//
//                } catch (\Exception $e) {
//                    Log::error( 'Fout bij verzenden email naar ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')' );
//                    Log::error($e->getMessage());
//                    array_push($messages, 'Fout bij verzenden email naar ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')' );
//                }
//
//            } else {
//                return [
//                    'from' => 'Geen e-mail bekend.',
//                    'to' => 'Geen e-mail bekend.',
//                    'subject' => 'Geen e-mail bekend.',
//                    'htmlBody' => 'Geen e-mail bekend.'
//                ];
//            }
//
//            //delete file on server, still saved on alfresco.
//            Storage::disk('documents')->delete($document->filename);
//        }
//        if(count($messages) > 0)
//        {
//            return ['messages' => $messages];
//        }
//        else
//        {
//            return null;
//        }
//    }
//
    public function processRevenuePartsKwh(Request $request)
    {
        set_time_limit(0);
        $distributionPartsKwhIds = $request->input('distributionPartsKwhIds');
        $datePayout = $request->input('datePayout');

        ProcessRevenuePartsKwh::dispatch($distributionPartsKwhIds, $datePayout, Auth::id());

        return RevenueDistributionPartsKwh::find($distributionPartsKwhIds[0])->revenuesKwh->project->administration_id;
    }
    public function processRevenuePartsKwhJob($distributionPartsKwh, $datePayout)
    {
        set_time_limit(300);

        if (!($distributionPartsKwh->first())->revenuesKwh->project->administration_id) {
            abort(400,
                'Geen administratie gekoppeld aan dit productie project');
        }else{
            $lastYearFinancialOverviewDefinitive =  $distributionPartsKwh->first()->revenuesKwh->project->lastYearFinancialOverviewDefinitive;
            if( !empty($lastYearFinancialOverviewDefinitive) && !empty($datePayout) && Carbon::parse($datePayout)->year <= $lastYearFinancialOverviewDefinitive)
            {
                abort(400,'De uitkeringsdatum valt in jaar ' . Carbon::parse($datePayout)->year . ' waar al een definitive waardestaat voor dit project aanwezig is.');
            }
        }

        $revenuePartsKwh = $distributionPartsKwh->first()->partsKwh;
        $revenuePartsKwh->status = 'in-progress-process';
        $revenuePartsKwh->save();
        foreach ($distributionPartsKwh as $distributionPartKwh) {
            //status moet nog bevestigd (confirmed zijn)
            if ($distributionPartKwh->status === 'confirmed')
            {
                $distributionPartKwh->status = 'in-progress-process';
                $distributionPartKwh->save();
            }
        }
        foreach ($revenuePartsKwh->distributionValuesKwh as $distributionValueKwh) {
            //status moet nog bevestigd (confirmed zijn)
            if ($distributionValueKwh->status === 'confirmed')
            {
                $distributionValueKwh->status = 'in-progress-process';
                $distributionValueKwh->save();
            }
        }

        foreach ($distributionPartsKwh as $distributionPartKwh) {
            //status moet nu onderhanden zijn (in-progress-process zijn)
            if ($distributionPartKwh->status === 'in-progress-process')
            {
                $this->createParticipantMutationForRevenueKwh($distributionPartKwh, $datePayout);

                $distributionPartKwh->status = 'processed';
                $distributionPartKwh->save();

                $distributionPartKwh->status = 'processed';
                $distributionPartKwh->save();
            }
        }
        foreach ($revenuePartsKwh->distributionValuesKwh as $distributionValueKwh) {
            //status moet nu onderhanden zijn (in-progress-process zijn)
            if ($distributionValueKwh->status === 'in-progress-process')
            {
                $distributionValueKwh->status = 'processed';
                $distributionValueKwh->save();
            }
        }

        //status moet nu onderhanden zijn (in-progress-process zijn)
        if ($revenuePartsKwh->status === 'in-progress-process') {
            if($revenuePartsKwh->distributionPartsKwh->where('status', '!=', 'processed')->count() == 0){
                $revenuePartsKwh->status = 'processed';
            }else{
                $revenuePartsKwh->status = 'confirmed';
            }
            $revenuePartsKwh->save();
            $revenuePartsKwh->revenuesKwh->save();
        }
        $revenuePartsKwh->calculator()->runRevenueKwh();

    }

    protected function createParticipantMutationForRevenueKwh(RevenueDistributionPartsKwh $distributionPartsKwh, $datePayout){
        $participantMutation = new ParticipantMutation();
        $participantMutation->participation_id = $distributionPartsKwh->distributionKwh->participation_id;
        $participantMutation->type_id = ParticipantMutationType::where('code_ref', 'energyTaxRefund')->where('project_type_id', $distributionPartsKwh->distributionKwh->participation->project->project_type_id)->value('id');
        $participantMutation->payout_kwh_price = $distributionPartsKwh->partsKwh->payout_kwh;
        $participantMutation->payout_kwh = $distributionPartsKwh->delivered_total;
        $participantMutation->indication_of_restitution_energy_tax = $distributionPartsKwh->kwh_return;
        $participantMutation->paid_on = $distributionPartsKwh->energySupplier ? $distributionPartsKwh->energySupplier->name : '';
        $participantMutation->date_payment = $datePayout;
        $participantMutation->save();
    }
//
//    protected function setMailConfigByDistribution(RevenueDistributionPartsKwh $distributionPartsKwh)
//    {
//        // Standaard vanuit primaire mailbox mailen
//        $mailboxToSendFrom = Mailbox::getDefault();
//
//        // Als er een mailbox aan de administratie is gekoppeld, dan deze gebruiken
//        $project = $distributionPartsKwh->revenuesKwh->project;
//
//        if ($project->administration && $project->administration->mailbox) {
//            $mailboxToSendFrom = $project->administration->mailbox;
//        }
//
//        // Configuratie instellen als er een mailbox is gevonden
//        if ($mailboxToSendFrom) {
//            (new EmailHelper())->setConfigToMailbox($mailboxToSendFrom);
//        }
//        return $mailboxToSendFrom;
//    }
//
//    protected function translateToValidCharacterSet($field){
//
//        $field = iconv('UTF-8', 'ASCII//TRANSLIT', $field);
//        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);
//
//        return $field;
//    }


}