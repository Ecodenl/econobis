<?php

namespace App\Http\Controllers\Api\Project;

use App\Eco\Document\Document;
use App\Eco\Document\DocumentCreatedFrom;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\Email\Email;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Occupation\OccupationContact;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\Project\ProjectType;
use App\Eco\RevenuesKwh\RevenueDistributionKwh;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use App\Eco\RevenuesKwh\RevenuePartsKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Eco\RevenuesKwh\RevenueValuesKwh;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Helpers\CSV\RevenueDistributionPartsKwhCSVHelper;
use App\Helpers\Delete\Models\DeleteRevenuePartsKwh;
use App\Helpers\Excel\EnergySupplierExcelHelper;
use App\Helpers\Project\RevenueDistributionKwhHelper;
use App\Helpers\Project\RevenuesKwhHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Template\TemplateTableHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\Order\OrderController;
use App\Http\Resources\ParticipantProject\Templates\ParticipantReportMail;
use App\Http\Resources\Project\FullRevenueDistributionPartsKwh;
use App\Http\Resources\Project\FullRevenuePartsKwh;
use App\Http\Resources\Project\FullRevenuePartsKwhForReport;
use App\Jobs\RevenueKwh\CreateRevenuePartsKwhReport;
use App\Jobs\RevenueKwh\ProcessRevenuesKwh;
use App\Jobs\RevenueKwh\ReportEnergySupplierExcel;
use App\Jobs\RevenueKwh\UpdateRevenuePartsKwh;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Writer\Xls;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class RevenuePartsKwhController extends ApiController
{
    public function show(RevenuePartsKwh $revenuePartsKwh)
    {
        set_time_limit(60);
        return FullRevenuePartsKwh::make($revenuePartsKwh);
    }

    public function showForReport(RevenuePartsKwh $revenuePartsKwh)
    {
        set_time_limit(60);
        return FullRevenuePartsKwhForReport::make($revenuePartsKwh);
    }

    public function csv(RevenuePartsKwh $revenuePartsKwh)
    {
        set_time_limit(0);

        $revenuePartsKwh = new RevenueDistributionPartsKwhCSVHelper($revenuePartsKwh);

        return $revenuePartsKwh->downloadCSV();
    }

    public function getRevenueDistributionParts(RevenuePartsKwh $revenuePartsKwh, Request $request)
    {
//        todo origineel 100: voor testen op 10
        $limit = 100;
        $offset = $request->input('page') ? $request->input('page') * $limit : 0;

        $total = $revenuePartsKwh->distributionPartsKwhVisible()->count();
        $distributionPartsKwh = $revenuePartsKwh->distributionPartsKwhVisible()->limit($limit)->offset($offset)->orderBy('status')->get();
        $distributionPartsKwhTotal = $revenuePartsKwh->distributionPartsKwhVisible()->whereNull('date_participant_report')->get();
        $distributionPartsKwhIdsTotal = [];
        foreach ($distributionPartsKwhTotal as $distributionPartKwhTotal){
            if($distributionPartKwhTotal->is_previous_visible_part_reported){
                $distributionPartsKwhIdsTotal[] = $distributionPartKwhTotal->id;
            }
        }

        return FullRevenueDistributionPartsKwh::collection($distributionPartsKwh)
            ->additional(['meta' => [
                'total' => $total,
                'distributionPartsKwhIdsTotal' => $distributionPartsKwhIdsTotal,
            ]
            ]);

    }

    public function update(RequestInput $requestInput, Request $request, RevenuePartsKwh $revenuePartsKwh)
    {
        set_time_limit(60);

        $this->authorize('manage', RevenuesKwh::class);

        $data = $requestInput
            ->boolean('confirmed')->next()
            ->string('status')->whenMissing('concept')->onEmpty('concept')->next()
            ->date('dateBegin')->validate('nullable|date')->alias('date_begin')->next()
            ->date('dateEnd')->validate('nullable|date')->alias('date_end')->next()
            ->date('dateConfirmed')->validate('nullable|date')->onEmpty(null)->alias('date_confirmed')->next()
            ->date('datePayout')->validate('nullable|date')->onEmpty(null)->alias('date_payout')->next()
            ->double('payoutKwh')->alias('payout_kwh')->onEmpty(null)->whenMissing(null)->next()
            ->get();

        $revenuePartsKwh->fill($data);

        if($revenuePartsKwh->status == 'new' || $revenuePartsKwh->status == 'concept-to-update'){
            $revenuePartsKwh->status = 'concept';
        }

        $revenuePartsKwh->save();

        if(!$revenuePartsKwh->confirmed && $revenuePartsKwh->status == 'concept') {
            $valuesKwhData = $request->get("valuesKwh");

            $revenuesKwhHelper = new RevenuesKwhHelper();
            $revenuesKwhHelper->createOrUpdateRevenueValuesKwh($valuesKwhData, $revenuePartsKwh);
            UpdateRevenuePartsKwh::dispatch($revenuePartsKwh, Auth::id());
        }

        if($revenuePartsKwh->confirmed && $revenuePartsKwh->status == 'concept') {
            $this->setRevenuePartsKwhDefinitive($revenuePartsKwh);
        }

        $revenuePartsKwh->calculator()->runCountingsRevenuesKwh();

        return FullRevenuePartsKwh::collection(RevenuePartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)
            ->with('distributionPartsKwh')
            ->orderBy('date_begin')->get());
    }

    public function destroy(RevenuePartsKwh $revenuePartsKwh)
    {
        $this->authorize('manage', RevenuesKwh::class);

        $newEndDate = Carbon::parse($revenuePartsKwh->date_begin)->subDay()->format('Y-m-d');

        try {
            DB::beginTransaction();

            $deleteRevenuePartsKwh = new DeleteRevenuePartsKwh($revenuePartsKwh);
            $result = $deleteRevenuePartsKwh->delete();

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

        $revenuePartsKwh->revenuesKwh->date_end = $newEndDate;
        $revenuePartsKwh->revenuesKwh->save();
        if($revenuePartsKwh->previous_revenue_parts_kwh){
            foreach ($revenuePartsKwh->previous_revenue_parts_kwh->distributionPartsKwh as $distributionPartsKwh) {
                $distributionPartsKwh->is_end_total_period = true;
                $distributionPartsKwh->is_visible = $this->determineIsVisible($distributionPartsKwh);
                $distributionPartsKwh->save();
            }
        }
    }

    public function reportEnergySupplier(
        Request $request,
        RevenuePartsKwh $revenuePartsKwh
    ){
        $documentName = $request->input('documentName');
        ReportEnergySupplierExcel::dispatch($documentName, $revenuePartsKwh, Auth::id());

    }

    public function reportEnergySupplierJob(
        $documentName,
        RevenuePartsKwh $revenuePartsKwh,
        EnergySupplier $energySupplier,
        $upToPartsKwhIds
    )
    {
        set_time_limit(180);
        $revenueDistributionKwhHelper = new RevenueDistributionKwhHelper();
        $distributionsKwh = $revenuePartsKwh->revenuesKwh->distributionKwh()->whereIn('id', $revenueDistributionKwhHelper->getDistributionForReportEnergySupplierIds($revenuePartsKwh) )->get();
        foreach ($distributionsKwh as $distributionKwh) {
            $distributionsPartsKwh = $distributionKwh->distributionPartsKwh->whereIn('parts_id', $upToPartsKwhIds)->where('es_id', $energySupplier->id);
            foreach ($distributionsPartsKwh as $distributionPartsKwh) {
                if ($distributionPartsKwh->status === 'confirmed') {
                    if($distributionPartsKwh->delivered_kwh_from_till_visible == 0) {
                        $distributionPartsKwh->status = 'processed';
                    } else {
                        $distributionPartsKwh->status = 'in-progress-report';
                    }
                    $distributionPartsKwh->save();

                    $distributionsValuesKwh = $distributionKwh->distributionValuesKwh->where('parts_id', $distributionPartsKwh->partsKwh->id)->where('distribution_id', $distributionKwh->id);
                    foreach ($distributionsValuesKwh as $distributionValuesKwh) {
                        if ($distributionValuesKwh->status === 'confirmed') {
                            if($distributionPartsKwh->delivered_kwh_from_till_visible == 0) {
                                $distributionValuesKwh->status = 'processed';
                            } else {
                                $distributionValuesKwh->status = 'in-progress-report';
                            }
                            $distributionValuesKwh->save();
                        }
                    }
                }
            }
        }

        $excel = null;

        // Als documentnaam (prefix bestandsnaam) @geen@ is opgegeven, dan geen document aanmaken.
        if($documentName != '@geen@'){

            switch ($energySupplier->file_format_id){
            case 1:
                $fileFormat = '.xls';
                break;
            default:
                $fileFormat = '.xlsx';
                break;
            }

            $fileName = $this->translateToValidCharacterSet($documentName) . '-' . $energySupplier->abbreviation . $fileFormat;
            $templateId = $energySupplier->excel_template_id;

            if ($templateId) {
                set_time_limit(0);
                $excelHelper = new EnergySupplierExcelHelper($energySupplier, $revenuePartsKwh, $templateId, $fileName);
                $excel = $excelHelper->getExcel();
            }else{
                abort(412, 'Geen geldige excel template gevonden.');
            }

            if($excel){
                $documentCreatedFromProjectId = DocumentCreatedFrom::where('code_ref', 'project')->first()->id;

                $document = new Document();
                $document->document_created_from_id = $documentCreatedFromProjectId;
                $document->document_type = 'internal';
                $document->document_group = 'revenue';
                $document->project_id = $revenuePartsKwh->revenuesKwh->project->id;

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

        }

        foreach ($distributionsKwh as $distributionKwh) {
            //status moet nu onderhanden zijn (in-progress-report zijn)
            if ($distributionKwh->status === 'in-progress-report-concept' || $distributionKwh->status === 'in-progress-report')
            {
                $deliveredTotal = 0;
                $kwhReturn = 0;
                $energySupplierName = EnergySupplier::find($energySupplier->id)->name;

                $distributionsPartsKwh = $distributionKwh->distributionPartsKwh->whereIn('parts_id', $upToPartsKwhIds)->where('es_id', $energySupplier->id);

                foreach($distributionsPartsKwh as $distributionPartsKwh) {
                    if ($distributionPartsKwh->status === 'in-progress-report') {
                        // Geen excel gemaakt, dan terug naar status confirmed
                        if(!$excel && $documentName != '@geen@'){
                            $distributionPartsKwh->status = 'confirmed';
                        } else {
                            $deliveredTotal = $deliveredTotal + $distributionPartsKwh->delivered_kwh;
                            $kwhReturn = $kwhReturn + $distributionPartsKwh->kwh_return_this_part;
                            // Als documentnaam (prefix bestandsnaam) @geen@ is opgegeven, dan is er geen document aangemaakt en werken we date_energy_supplier_report ook niet bij.
                            if($documentName != '@geen@') {
                                $distributionPartsKwh->date_energy_supplier_report = Carbon::now()->format('Y-m-d');
                            }
                            $distributionPartsKwh->status = 'processed';
                        }
                        $distributionPartsKwh->save();
                        $distributionsValuesKwh = $distributionKwh->distributionValuesKwh->where('parts_id', $distributionPartsKwh->partsKwh->id)->where('distribution_id', $distributionKwh->id);
                        foreach($distributionsValuesKwh as $distributionValuesKwh) {
                            if ($distributionValuesKwh->status === 'in-progress-report') {
                                // Geen excel gemaakt, dan terug naar status confirmed
                                if(!$excel && $documentName != '@geen@'){
                                    $distributionValuesKwh->status = 'confirmed';
                                } else {
                                    $distributionValuesKwh->status = 'processed';
                                }
                                $distributionValuesKwh->save();
                            }
                        }
                    }
                }

                if($kwhReturn != 0){
                    $this->createParticipantMutationForRevenueKwh($distributionKwh->participation_id, $revenuePartsKwh->payout_kwh, $revenuePartsKwh->date_payout, $deliveredTotal, $kwhReturn, $energySupplierName);
                }

            }

        }

    }

    public function setProcessedEnergySupplierJob(
        RevenuePartsKwh $revenuePartsKwh,
        $energySupplier,
        $upToPartsKwhIds
    )
    {
        set_time_limit(180);

        $revenueDistributionKwhHelper = new RevenueDistributionKwhHelper();
        $distributionsForReportIds = $revenuePartsKwh->revenuesKwh->distributionKwh()->whereIn('id', $revenueDistributionKwhHelper->getDistributionForReportEnergySupplierIds($revenuePartsKwh))->get()->pluck('id')->toArray();;
        $distributionsKwh = $revenuePartsKwh->revenuesKwh
            ->distributionKwh()
            ->whereIn('id', $revenueDistributionKwhHelper->getDistributionSetProcessedEnergySupplierIds($revenuePartsKwh) )
            ->whereNotin('id', $distributionsForReportIds)
            ->get();
        foreach ($distributionsKwh as $distributionKwh) {

            //status moet nu onderhanden zijn (in-progress-set-processed zijn)
            if ($distributionKwh->status === 'in-progress-set-processed')
            {
                if($energySupplier){
                    $distributionsPartsKwh = $distributionKwh->distributionPartsKwh->whereIn('parts_id', $upToPartsKwhIds)->where('es_id', $energySupplier->id);
                } else {
                    $distributionsPartsKwh = $distributionKwh->distributionPartsKwh->whereIn('parts_id', $upToPartsKwhIds)->whereNull('es_id');
                }
                foreach($distributionsPartsKwh as $distributionPartsKwh) {
                    if ($distributionPartsKwh->status === 'confirmed') {
                        $distributionPartsKwh->status = 'processed';
                        $distributionPartsKwh->save();

                        $distributionsValuesKwh = $distributionKwh->distributionValuesKwh->where('parts_id', $distributionPartsKwh->partsKwh->id)->where('distribution_id', $distributionKwh->id);
                        foreach($distributionsValuesKwh as $distributionValuesKwh) {
                            if ($distributionValuesKwh->status === 'confirmed') {
                                $distributionValuesKwh->status = 'processed';
                                $distributionValuesKwh->save();
                            }
                        }
                    }
                }
            }

        }

    }

    public function peekDistributionKwhPartsByIds(Request $request)
    {
        $this->authorize('manage', RevenuesKwh::class);

        $ids = $request->input('ids') ? $request->input('ids') : [];

        $distributionPartsKwh = RevenueDistributionPartsKwh::whereIn('id', $ids)->with(['partsKwh'])->get();

        return FullRevenueDistributionPartsKwh::collection($distributionPartsKwh);
    }

    public function downloadPreview(Request $request, RevenueDistributionPartsKwh $distributionPartsKwh)
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

        if( !( empty($distributionPartsKwh->distributionKwh->address)
            || empty($distributionPartsKwh->distributionKwh->postal_code)
            || empty($distributionPartsKwh->distributionKwh->city) ) ) {

            $contact = $distributionPartsKwh->distributionKwh->contact;
            $orderController = new OrderController();
            $contactInfo = $orderController->getContactInfoForOrder($contact);
            $revenuePartsKwh = $distributionPartsKwh->partsKwh;
            $project = $revenuePartsKwh->revenuesKwh->project;
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
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'verdeling', $distributionPartsKwh);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'opbrengst', $revenuePartsKwh);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'project', $project);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'deelname',
                $distributionPartsKwh->distributionKwh->participation);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'mutaties',
                $distributionPartsKwh->distributionKwh->participation->mutations);

            $revenueHtml
                = TemplateVariableHelper::stripRemainingVariableTags($revenueHtml);

            $pdf = PDF::loadView('documents.generic', [
                'html' => $revenueHtml,
            ])->output();

            return $pdf;
        } else {
            $revenueHtml = '<h1>Kon geen document opstellen: adres niet compleet</h1>';

            $pdf = PDF::loadView('documents.generic', [
                'html' => $revenueHtml,
            ])->output();

            return $pdf;
        }
        return null;
    }

    public function previewEmail(Request $request, RevenueDistributionPartsKwh $distributionPartsKwh)
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

        if( !( empty($distributionPartsKwh->distributionKwh->address)
            || empty($distributionPartsKwh->distributionKwh->postal_code)
            || empty($distributionPartsKwh->distributionKwh->city) ) ) {

            $contact = $distributionPartsKwh->distributionKwh->contact;
            $orderController = new OrderController();

            $contactInfo = $orderController->getContactInfoForOrder($contact);
            $subject = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $subject);

            $primaryEmailAddress = $contact->primaryEmailAddress;

            $revenuePartsKwh = $distributionPartsKwh->partsKwh;
            $project = $revenuePartsKwh->revenuesKwh->project;
            $administration = $project->administration;

            //Make preview email
            if ($primaryEmailAddress) {
                $mailbox = $this->getMailboxByDistribution($project);
                if ($mailbox) {
                    $fromEmail = $mailbox->email;
                } else {
                    $fromEmail = \Config::get('mail.from.address');
                }

                $email = Mail::fromMailbox($mailbox)
                    ->to($primaryEmailAddress->email);
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
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'verdeling', $distributionPartsKwh);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'opbrengst', $revenuePartsKwh);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'project', $project);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'deelname', $distributionPartsKwh->distributionKwh->participation);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'mutaties', $distributionPartsKwh->distributionKwh->participation->mutations);
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

    public function createRevenuePartsKwhReport(Request $request)
    {
        set_time_limit(0);
        $distributionPartsKwhIds = $request->input('distributionPartsKwhIds');
        $subject = $request->input('subject');
        $documentTemplateId = $request->input('documentTemplateId');
        $emailTemplateId = $request->input('emailTemplateId');
        $showOnPortal = $request->input('showOnPortal');

        $distributionPartsKwh = RevenueDistributionPartsKwh::find($distributionPartsKwhIds[0]);
        $distributionKwh = $distributionPartsKwh->distributionKwh;
        $revenuesKwh = $distributionKwh->revenuesKwh;
        $project = $revenuesKwh->project;

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
                'html_body' => EmailTemplate::find($emailTemplateId)->html_body,
                'folder' => 'sent',
                'date_sent' => \Illuminate\Support\Carbon::now(),
                'project_id' => $project->id,
                'sent_by_user_id' => Auth::id(),
            ]);
            $emailModel->save();
        }

        foreach($distributionPartsKwhIds as $distributionPartsKwhId) {
            CreateRevenuePartsKwhReport::dispatch($distributionPartsKwhId, $subject, $documentTemplateId, $emailTemplateId, $showOnPortal, Auth::id(), $emailModel);
        }

        return null;
    }

    public function createParticipantRevenuePartsReport($subject, $distributionPartsKwhId, $distributionKwhId, DocumentTemplate $documentTemplate, EmailTemplate $emailTemplate, $showOnPortal)
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
        $distributionPartsKwh = RevenueDistributionPartsKwh::find($distributionPartsKwhId);

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
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'verdeling', $distributionPartsKwh);
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

                $documentCreatedFromParticipantId = DocumentCreatedFrom::where('code_ref', 'participant')->first()->id;

                $document = new Document();
                $document->document_created_from_id = $documentCreatedFromParticipantId;
                $document->document_type = 'internal';
                $document->document_group = 'revenue';
                $document->contact_id = $contact->id;
                $document->project_id = $project->id;
                $document->participation_project_id = $distributionKwh->participation_id;
                $document->template_id = $documentTemplate->id;
                $document->show_on_portal = $showOnPortal;

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

                if(\Config::get('app.ALFRESCO_COOP_USERNAME') != 'local') {
                    $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'),
                        \Config::get('app.ALFRESCO_COOP_PASSWORD'));

                    $alfrescoResponse = $alfrescoHelper->createFile($filePath,
                        $document->filename, $document->getDocumentGroup()->name);
                    if($alfrescoResponse == null)
                    {
                        throw new \Exception('Fout bij maken rapport document in Alfresco.');
                    }
                    $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
                }else{
                    $document->alfresco_node_id = null;
                }

                $document->save();
            }
            catch (\Exception $e) {
                Log::error('Fout bij maken rapport document voor ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')' );
                Log::error($e->getMessage());
                array_push($messages, 'Fout bij maken rapport document voor ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')' );
            }

            //send email
            if ($primaryEmailAddress) {
                try{
                    $mailbox = $this->getMailboxByDistribution($project);
                    if ($mailbox) {
                        $fromEmail = $mailbox->email;
                        $fromName = $mailbox->name;
                    } else {
                        $fromEmail = \Config::get('mail.from.address');
                        $fromName = \Config::get('mail.from.name');
                    }

                    $email = Mail::fromMailbox($mailbox)
                        ->to($primaryEmailAddress->email);
                    
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
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'verdeling', $distributionPartsKwh);
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
                Log::error( 'Fout bij verzenden email naar **onbekend emailadres** (' . $contact->full_name . ')' );
                array_push($messages, 'Fout bij verzenden email naar **onbekend emailadres** (' . $contact->full_name . ')' );
            }

            //delete file on server, still saved on alfresco.
            if(\Config::get('app.ALFRESCO_COOP_USERNAME') != 'local') {
                Storage::disk('documents')->delete($document->filename);
            }
        }
        if(count($messages) > 0)
        {
            return ['messages' => $messages];
        }
        else
        {
            // Geen fouten bijwerken datum rapportage
            $upToPartsKwhIds = RevenuePartsKwh::where('revenue_id', $distributionPartsKwh->revenue_id)->where('date_begin', '<=', $distributionPartsKwh->partsKwh->date_begin)->orderBy('date_begin')->pluck('id')->toArray();
            $upToDistributionPartsKwh = RevenueDistributionPartsKwh::where('revenue_id', $distributionPartsKwh->revenue_id)->where('distribution_id', $distributionPartsKwh->distribution_id)->whereIn('parts_id', $upToPartsKwhIds)->whereIn('status', ['confirmed', 'processed'])->whereNull('date_participant_report')->get();
            $beginDateParticipantReport = $distributionPartsKwh->not_reported_date_begin;;
            $endDateParticipantReport = $distributionPartsKwh->partsKwh->date_end;;

            foreach ($upToDistributionPartsKwh as $distributionPartToUpdate) {
                $distributionPartToUpdate->date_participant_report = Carbon::today();
                $distributionPartToUpdate->begin_date_participant_report = $beginDateParticipantReport;
                $distributionPartToUpdate->end_date_participant_report = $endDateParticipantReport;
                $distributionPartToUpdate->save();
            }
            return null;
        }
    }

    public function setRevenuePartsKwhDefinitive(RevenuePartsKwh $revenuePartsKwh)
    {
        set_time_limit(0);

        $distributionsKwhIds = array_unique( $revenuePartsKwh->distributionPartsKwh->pluck('distribution_id')->toArray() );
        $dateConfirmed = $revenuePartsKwh->date_confirmed;
        $datePayout = $revenuePartsKwh->date_payout;
        $revenueId = $revenuePartsKwh->revenue_id;
        $upToPartsKwhIds = RevenuePartsKwh::where('revenue_id', $revenueId)->where('date_begin', '<=', $revenuePartsKwh->date_begin)->where('status', '!=', 'processed')->orderBy('date_begin')->pluck('id')->toArray();

        ProcessRevenuesKwh::dispatch($distributionsKwhIds, $dateConfirmed, $datePayout, $upToPartsKwhIds, Auth::id());
    }

    public function processRevenuesKwhJob($distributionsKwh, $dateConfirmed, $datePayout, $upToPartsKwhIds)
    {
        $partsKwh = RevenuePartsKwh::whereIn('id', $upToPartsKwhIds)->get();
        foreach ($partsKwh as $partKwh) {
            if ($partKwh->status === 'in-progress-process') {
                // Part (en alle voorgaande parts) met status in-progress-process ook definitief maken (confirmed true)
                $partKwh->confirmed = true;
                $partKwh->date_confirmed = $dateConfirmed;
                $partKwh->date_payout = $datePayout;
                $partKwh->save();

                // Values van part (en alle voorgaande parts) met status in-progress-process ook definitief maken (status confirmed)
                foreach ($partKwh->conceptValuesKwh() as $conceptValueKwh) {
                    $conceptValueKwh->status = 'confirmed';
                    $conceptValueKwh->save();
                }

                // When processing last part, also set endvalue to confirmed.
                if( $partKwh->date_end && $partKwh->date_end == $partKwh->revenuesKwh->date_end ){
                    $dateRegistrationDayAfterEnd = Carbon::parse($partKwh->date_end)->addDay()->format('Y-m-d');
                    $endRevenueValuesKwhOriginal = RevenueValuesKwh::where('revenue_id', $partKwh->revenue_id)->where('date_registration', $dateRegistrationDayAfterEnd)->first();
                    if($endRevenueValuesKwhOriginal){
                        $endRevenueValuesKwhOriginal->status = 'confirmed';
                        $endRevenueValuesKwhOriginal->save();
                    }
                }
            }
        }

        if (!($distributionsKwh->first())->revenuesKwh->project->administration_id) {
            abort(400,
                'Geen administratie gekoppeld aan dit productie project');
        }else{
            $lastYearFinancialOverviewDefinitive =  $distributionsKwh->first()->revenuesKwh->project->lastYearFinancialOverviewDefinitive;
            if( !empty($lastYearFinancialOverviewDefinitive) && !empty($datePayout) && Carbon::parse($datePayout)->year <= $lastYearFinancialOverviewDefinitive)
            {
                abort(400,'De uitkeringsdatum valt in jaar ' . Carbon::parse($datePayout)->year . ' waar al een definitive waardestaat voor dit project aanwezig is.');
            }
        }

        $revenuePartsKwhHasNotConfirmed = ($distributionsKwh->first())->revenuesKwh->partsKwh()->where('confirmed', false)->exists();

        foreach ($distributionsKwh as $distributionKwh) {
            //status moet nu onderhanden zijn (in-progress-process zijn)0
//todo WM: opschonen
// Indien status confirmed, dan hoeven we niets meer te doen voor betreffende partKwh
// Onderscheid tussen confirmed en concept voor in-progress-process dan ook niet meer nodig
//            if ($distributionKwh->status === 'in-progress-process-concept' || $distributionKwh->status === 'in-progress-process')
            if ($distributionKwh->status === 'in-progress-process')
            {
                $distributionsPartsKwh = $distributionKwh->distributionPartsKwh->whereIn('parts_id', $upToPartsKwhIds);
                foreach($distributionsPartsKwh as $distributionPartsKwh) {
                    if ($distributionPartsKwh->status === 'in-progress-process') {
                        $distributionPartsKwh->status = 'confirmed';
                        $distributionPartsKwh->save();
                        // Indien part visible en nog niet gerapporteerd (zou ook nog niet gedaan moeten zijn bij definitief maken, want deelnemer rapportage kan je niet maken van concepten)
                        // en) not_reported_delivered_kwh is 0, dan gaan we t/m deze deelperiode uitsluiten van deelnemer rapportage. We willen niet delivered_kwh 0 rapporteren nl.
                        if( $distributionPartsKwh->is_visible == true && $distributionPartsKwh->date_participant_report == null && $distributionPartsKwh->not_reported_delivered_kwh == 0 ){
                            $upToPartsKwhExcludeForReportIds = RevenuePartsKwh::where('revenue_id', $distributionPartsKwh->revenue_id)->where('date_begin', '<=', $distributionPartsKwh->partsKwh->date_begin)->orderBy('date_begin')->pluck('id')->toArray();
                            $upToDistributionPartsKwh = RevenueDistributionPartsKwh::where('revenue_id', $distributionPartsKwh->revenue_id)->where('distribution_id', $distributionPartsKwh->distribution_id)->whereIn('parts_id', $upToPartsKwhExcludeForReportIds)->whereIn('status', ['confirmed', 'processed'])->whereNull('date_participant_report')->get();
                            $beginDateParticipantReport = $distributionPartsKwh->not_reported_date_begin;;
                            $endDateParticipantReport = $distributionPartsKwh->partsKwh->date_end;;
                            foreach ($upToDistributionPartsKwh as $distributionPartToUpdate) {
                                $distributionPartToUpdate->date_participant_report = '1900-01-01';
                                $distributionPartToUpdate->begin_date_participant_report = $beginDateParticipantReport;
                                $distributionPartToUpdate->end_date_participant_report = $endDateParticipantReport;
                                $distributionPartToUpdate->save();
                            }
                        }
                    }
                }
                $distributionsValuesKwh = $distributionKwh->distributionValuesKwh->whereIn('parts_id', $upToPartsKwhIds);
                foreach($distributionsValuesKwh as $distributionValuesKwh) {
                    if ($distributionValuesKwh->status === 'in-progress-process') {
                        $distributionValuesKwh->status = 'confirmed';
                        $distributionValuesKwh->save();
                    }
                }
// todo WM: opschonen (vervangen door $revenuePartsKwhHasNotConfirmed == false check)
//                if($distributionKwh->revenuesKwh->partsKwh->where('status', '==', 'new')->count() > 0){
//                    $distributionKwh->status = 'concept';
//                } else {
                    if($distributionKwh->distributionValuesKwh->whereNotIn('status', ['confirmed', 'processed'])->count() == 0
                        && $distributionKwh->distributionValuesKwh->where('status', '==', 'confirmed')->count() > 0
                        && $revenuePartsKwhHasNotConfirmed == false) {
                        $distributionKwh->status = 'confirmed';
                    } else {
                        $distributionKwh->status = 'concept';
                    }
//                }
                $distributionKwh->save();
            }

        }

        $partsKwh = RevenuePartsKwh::whereIn('id', $upToPartsKwhIds)->get();
        foreach ($partsKwh as $partKwh) {
            if ($partKwh->status === 'in-progress-process') {
                $partKwh->status = 'confirmed';
                $partKwh->save();
                $partKwh->calculator()->runCountingsRevenuesKwh();
            }
        }

        // Reload revenuesKwh
        $revenuesKwh = RevenuesKwh::find($distributionsKwh->first()->revenue_id);
        if($revenuesKwh->distributionKwh->where('status', '!=', 'confirmed')->count() == 0
            && $revenuesKwh->distributionKwh->where('status', '==', 'confirmed')->count() > 0
            && $revenuesKwh->partsKwh->where('status', '!=', 'confirmed')->count() == 0
            && $revenuesKwh->partsKwh->where('status', '==', 'confirmed')->count() > 0
        ){
            $revenuesKwh->status = 'confirmed';
            $revenuesKwh->confirmed = true;
            $revenuesKwh->date_confirmed = $dateConfirmed;
            $revenuesKwh->save();
        }

    }

    protected function createParticipantMutationForRevenueKwh($participationId, $payoutKwh, $datePayout, $deliveredTotal, $kwhReturn, $energySupplierName){
        $pcrTypeId = ProjectType::where('code_ref', 'postalcode_link_capital')->value('id');
        $participantMutationTypeId = ParticipantMutationType::where('code_ref', 'energyTaxRefund')->where('project_type_id', $pcrTypeId)->value('id');

        $participantMutation = new ParticipantMutation();
        $participantMutation->participation_id = $participationId;
        $participantMutation->type_id = $participantMutationTypeId;
        $participantMutation->payout_kwh_price = $payoutKwh;
        $participantMutation->payout_kwh = round($deliveredTotal, 2);
        $participantMutation->indication_of_restitution_energy_tax = round($kwhReturn,2);
        $participantMutation->paid_on = $energySupplierName;
        $participantMutation->date_payment = $datePayout;
        $participantMutation->save();
    }

    protected function getMailboxByDistribution($project)
    {
        // Standaard vanuit primaire mailbox mailen
        $mailboxToSendFrom = Mailbox::getDefault();

        if ($project->administration && $project->administration->mailbox) {
            $mailboxToSendFrom = $project->administration->mailbox;
        }

        return $mailboxToSendFrom;
    }

    /**
     * @param RevenueDistributionPartsKwh $distributionPartsKwh
     */
    protected function determineIsVisible(RevenueDistributionPartsKwh $distributionPartsKwh): bool
    {
        if ($distributionPartsKwh->is_energy_supplier_switch
            || $distributionPartsKwh->is_end_participation
            || $distributionPartsKwh->is_end_total_period
            || $distributionPartsKwh->is_end_year_period) {
            return true;
        } else {
            return false;
        }
    }

    protected function translateToValidCharacterSet($field){

//        $field = strtr(utf8_decode($field), utf8_decode('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ'), 'AAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy');
        $field = strtr(mb_convert_encoding($field, 'UTF-8', mb_list_encodings()), mb_convert_encoding('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ', 'UTF-8', mb_list_encodings()), 'AAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy');
//        $field = iconv('UTF-8', 'ASCII//TRANSLIT', $field);
        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);

        return $field;
    }

}