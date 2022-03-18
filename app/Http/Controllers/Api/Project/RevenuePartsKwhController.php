<?php

namespace App\Http\Controllers\Api\Project;

use App\Eco\Document\Document;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Occupation\OccupationContact;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Eco\RevenuesKwh\RevenuePartsKwh;
use App\Eco\RevenuesKwh\RevenueValuesKwh;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Helpers\CSV\RevenueDistributionPartsKwhCSVHelper;
use App\Helpers\Delete\Models\DeleteRevenuePartsKwh;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Excel\EnergySupplierExcelHelper;
use App\Helpers\Project\RevenuesKwhHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Template\TemplateTableHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\Order\OrderController;
use App\Http\Resources\Project\FullRevenueDistributionPartsKwh;
use App\Http\Resources\Project\FullRevenuePartsKwh;
use App\Jobs\RevenueKwh\ProcessRevenuesKwh;
use App\Jobs\RevenueKwh\UpdateRevenuePartsKwh;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Writer\Xls;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class RevenuePartsKwhController extends ApiController
{
    public function show(RevenuePartsKwh $revenuePartsKwh)
    {
//        $revenuePartsKwh->load([
//            'distributionPartsKwh',
//        ]);

        return FullRevenuePartsKwh::make($revenuePartsKwh);
    }

    public function csv(RevenuePartsKwh $revenuePartsKwh)
    {
        set_time_limit(0);

        $revenuePartsKwh = new RevenueDistributionPartsKwhCSVHelper($revenuePartsKwh);

        return $revenuePartsKwh->downloadCSV();
    }

    public function getRevenueDistributionParts(RevenuePartsKwh $revenuePartsKwh, Request $request)
    {
        $limit = 100;
        $offset = $request->input('page') ? $request->input('page') * $limit : 0;

        $distributionPartsKwh = $revenuePartsKwh->distributionPartsKwhVisible()->limit($limit)->offset($offset)->orderBy('status')->get();
        $distributionPartsKwhIdsTotal = $revenuePartsKwh->distributionPartsKwhVisible()->pluck('id')->toArray();
        $total = $revenuePartsKwh->distributionPartsKwhVisible()->count();

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
            $recalculateNextPart = false;

            if ($revenuePartsKwh->next_revenue_parts_kwh) {
                $dateRegistrationDayAfterEnd = Carbon::parse($revenuePartsKwh->date_end)->addDay()->format('Y-m-d');
                $revenueValuesKwhEnd = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $dateRegistrationDayAfterEnd)->first();
                if ($revenueValuesKwhEnd
                    && ($revenueValuesKwhEnd->kwh_start != $valuesKwhData['kwhEnd']
                        || $revenueValuesKwhEnd->kwh_start_high != $valuesKwhData['kwhEndHigh']
                        || $revenueValuesKwhEnd->kwh_start_low != $valuesKwhData['kwhEndLow'])
                ) {
                    $recalculateNextPart = true;
                }
            }
            $revenuesKwhHelper = new RevenuesKwhHelper();
            $revenuesKwhHelper->createOrUpdateRevenueValuesKwh($valuesKwhData, $revenuePartsKwh, false);
            UpdateRevenuePartsKwh::dispatch($revenuePartsKwh, Auth::id());
            if ($recalculateNextPart) {
                $valuesKwhDataNext = [
                    'kwhStart' => $revenuePartsKwh->next_revenue_parts_kwh->values_kwh_start['kwhStart'],
                    'kwhStartHigh' => $revenuePartsKwh->next_revenue_parts_kwh->values_kwh_start['kwhStartHigh'],
                    'kwhStartLow' => $revenuePartsKwh->next_revenue_parts_kwh->values_kwh_start['kwhStartLow'],
                    'kwhEnd' => $revenuePartsKwh->next_revenue_parts_kwh->values_kwh_end['kwhEnd'],
                    'kwhEndHigh' => $revenuePartsKwh->next_revenue_parts_kwh->values_kwh_end['kwhEndHigh'],
                    'kwhEndLow' => $revenuePartsKwh->next_revenue_parts_kwh->values_kwh_end['kwhEndLow'],
                ];
                $revenuesKwhHelper = new RevenuesKwhHelper();
                $revenuesKwhHelper->createOrUpdateRevenueValuesKwh($valuesKwhDataNext, $revenuePartsKwh->next_revenue_parts_kwh, true);
                UpdateRevenuePartsKwh::dispatch($revenuePartsKwh->next_revenue_parts_kwh, Auth::id());
            }
        }

        if($revenuePartsKwh->confirmed && $revenuePartsKwh->status == 'concept') {
            $this->setRevenuePartsKwhDefinitive($revenuePartsKwh);
        }

        $revenuePartsKwh->calculator()->runCountingsRevenuesKwh();

        return FullRevenuePartsKwh::collection(RevenuePartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)
            ->with('distributionPartsKwh')
            ->orderBy('date_begin')->get());
    }

    public function createEnergySupplierAllExcel(
        Request $request,
        RevenuePartsKwh $revenuePartsKwh
    )
    {
        $upToRevenuePartsKwh = RevenuePartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_end', '<=', $revenuePartsKwh->date_end)->get();

        $energySupplierIds = [];
        foreach ($upToRevenuePartsKwh as $partItem){
            $partItemEnergySupplierIds = $partItem->distributionPartsKwh()->whereNull('date_energy_supplier_report')->where('is_visible', 1)->whereNotNull('es_id')->where('delivered_kwh', '!=', 0)->pluck('es_id')->toArray();
            $energySupplierIds = array_merge($partItemEnergySupplierIds, $energySupplierIds);
        }
        $energySupplierIds = array_unique($energySupplierIds);
        foreach ($energySupplierIds as $energySupplierId) {
            $energySupplier = EnergySupplier::find($energySupplierId);
            $this->createEnergySupplierExcel($request, $revenuePartsKwh, $energySupplier, true);
        }
    }

    public function createEnergySupplierOneExcel(
        Request $request,
        RevenuePartsKwh $revenuePartsKwh,
        EnergySupplier $energySupplier
    )
    {
        $this->createEnergySupplierExcel($request, $revenuePartsKwh, $energySupplier, false);
    }

    protected function createEnergySupplierExcel(
        Request $request,
        RevenuePartsKwh $revenuePartsKwh,
        EnergySupplier $energySupplier,
        $createAll
    )
    {
        $project = $revenuePartsKwh->revenuesKwh->project;

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
            $excelHelper = new EnergySupplierExcelHelper($energySupplier, $revenuePartsKwh, $templateId, $fileName);
            $excel = $excelHelper->getExcel();
            if(!$excel) return;
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
            $pdf = PDF::loadView('documents.generic', [
                'html' => '',
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
                $mailbox = $this->setMailConfigByDistribution($project);
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

    public function setRevenuePartsKwhDefinitive(RevenuePartsKwh $revenuePartsKwh)
    {
        set_time_limit(0);

        $distributionsKwhIds = array_unique( $revenuePartsKwh->distributionPartsKwh->pluck('distribution_id')->toArray() );
        $dateConfirmed = $revenuePartsKwh->date_confirmed;
        $datePayout = $revenuePartsKwh->date_payout;
        $revenueId = $revenuePartsKwh->revenue_id;
        $upToPartsKwhIds = RevenuePartsKwh::where('revenue_id', $revenueId)->where('date_begin', '<=', $revenuePartsKwh->date_begin)->where('status', '!=', 'processed')->pluck('id')->toArray();

        ProcessRevenuesKwh::dispatch($distributionsKwhIds, $dateConfirmed, $datePayout, $upToPartsKwhIds, Auth::id());
    }

//todo WM: opschonen
//
    public function processRevenuePartsKwh(Request $request)
    {
        // todo WM: testen of we hier alleen langskomen vanuit bestaande revenue die na conversie nog op confirmed staat, maar niet processed!
        Log::error("ProcessRevenuePartsKwh vanuit RevenuePartsKwhController !!");
//        set_time_limit(0);
//        $distributionPartsKwhIds = $request->input('distributionPartsKwhIds');
//        $distributionsKwhIds = array_unique( RevenueDistributionPartsKwh::whereIn('id', $distributionPartsKwhIds)->pluck('distribution_id')->toArray() );
//        $datePayout = $request->input('datePayout');
//        $revenueId = RevenueDistributionPartsKwh::where('id', $distributionPartsKwhIds[0])->first()->revenue_id;
//        $partsId = $request->input('partsId');
//        $tillPartsKwh = RevenuePartsKwh::find($partsId);
//        $upToPartsKwhIds = RevenuePartsKwh::where('revenue_id', $revenueId)->where('date_begin', '<=', $tillPartsKwh->date_begin)->where('status', '!=', 'processed')->pluck('id')->toArray();
//
//        ProcessRevenuesKwh::dispatch($distributionsKwhIds, $tillPartsKwh->date_confirmed, $datePayout, $upToPartsKwhIds, Auth::id());
//
//        return RevenueDistributionPartsKwh::find($distributionPartsKwhIds[0])->revenuesKwh->project->administration_id;
    }

    protected function createParticipantMutationForRevenueKwh(RevenueDistributionPartsKwh $distributionPartsKwh, $datePayout){
        $pcrTypeId = ProjectType::where('code_ref', 'postalcode_link_capital')->value('id');
        $participantMutationTypeId = ParticipantMutationType::where('code_ref', 'energyTaxRefund')->where('project_type_id', $pcrTypeId)->value('id');

        $participantMutation = new ParticipantMutation();
        $participantMutation->participation_id = $distributionPartsKwh->distributionKwh->participation_id;
        $participantMutation->type_id = $participantMutationTypeId;
        $participantMutation->payout_kwh_price = $distributionPartsKwh->partsKwh->payout_kwh;
        $participantMutation->payout_kwh = $distributionPartsKwh->delivered_total;
        $participantMutation->indication_of_restitution_energy_tax = $distributionPartsKwh->kwh_return;
        $participantMutation->paid_on = $distributionPartsKwh->energySupplier ? $distributionPartsKwh->energySupplier->name : '';
        $participantMutation->date_payment = $datePayout;
        $participantMutation->save();
    }

    protected function setMailConfigByDistribution($project)
    {
        // Standaard vanuit primaire mailbox mailen
        $mailboxToSendFrom = Mailbox::getDefault();

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