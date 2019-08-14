<?php

namespace App\Http\Controllers\Api\Project;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Occupation\OccupationContact;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\PaymentInvoice\PaymentInvoice;
use App\Eco\Project\ProjectRevenue;
use App\Eco\Project\ProjectRevenueDistribution;
use App\Eco\Project\ProjectRevenueDeliveredKwhPeriod;
use App\Eco\Project\ProjectType;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Helpers\CSV\RevenueDistributionCSVHelper;
use App\Helpers\CSV\RevenueParticipantsCSVHelper;
use App\Helpers\Delete\Models\DeleteRevenue;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Excel\EnergySupplierExcelHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Helpers\Template\TemplateTableHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\Order\OrderController;
use App\Http\Resources\ParticipantProject\FullRevenueParticipantProject;
use App\Http\Resources\ParticipantProject\Templates\ParticipantReportMail;
use App\Http\Resources\Project\FullProjectRevenue;
use App\Http\Resources\Project\FullProjectRevenueDistribution;
use App\Jobs\Revenue\CreatePaymentInvoices;
use App\Jobs\Revenue\CreateRevenueReport;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class ProjectRevenueController extends ApiController
{
    public function show(ProjectRevenue $projectRevenue)
    {
        $projectRevenue->load([
            'type',
            'category',
            'project.administration',
            'project.projectType',
            'participantProjectPayoutType',
        'createdBy',
        ]);

        return FullProjectRevenue::make($projectRevenue);
    }

    public function csv(ProjectRevenue $projectRevenue)
    {
        set_time_limit(0);

        //todo WM Volgens mij kan RevenueParticipantsCSVHelper dan helemaal weg cq opgeschoond worden, toch?
//        if ($projectRevenue->confirmed) {
//            $projectRevenue = new RevenueDistributionCSVHelper($projectRevenue->distribution);
//        } else {
//            $projectRevenue = new RevenueParticipantsCSVHelper($projectRevenue->project->participantsProject, $projectRevenue);
//        }
            $projectRevenue = new RevenueDistributionCSVHelper($projectRevenue->distribution);


        return $projectRevenue->downloadCSV();
    }

    public function getRevenueDistribution(ProjectRevenue $projectRevenue, Request $request)
    {
        $limit = 100;
        $offset = $request->input('page') ? $request->input('page') * $limit : 0;

        $distribution = $projectRevenue->distribution()->limit($limit)->offset($offset)->orderBy('status')->get();
        $total = $projectRevenue->distribution()->count();

        return FullProjectRevenueDistribution::collection($distribution)
            ->additional(['meta' => [
                'total' => $total,
            ]
            ]);

    }

    public function getRevenueParticipants(ProjectRevenue $projectRevenue, Request $request)
    {
        $limit = 100;
        $offset = $request->input('page') ? $request->input('page') * $limit : 0;

        $participants = $projectRevenue->project->participantsProject()->limit($limit)->offset($offset)->get();
        $total = $projectRevenue->project->participantsProject()->count();

        $participants->load([
            'participantProjectPayoutType',
        ]);

        return FullRevenueParticipantProject::collection($participants)
            ->additional(['meta' => [
                'total' => $total,
            ]
            ]);
    }

    public function store(RequestInput $requestInput)
    {
        $this->authorize('manage', ProjectRevenue::class);

        $data = $requestInput
            ->integer('categoryId')
            ->validate('required|exists:project_revenue_category,id')
            ->alias('category_id')->next()
            ->string('distributionTypeId')->onEmpty(null)->alias('distribution_type_id')->next()
            ->integer('projectId')
            ->validate('required|exists:projects,id')
            ->alias('project_id')->next()
            ->boolean('confirmed')->next()
            ->date('dateBegin')->validate('required|date')->alias('date_begin')->next()
            ->date('dateEnd')->validate('required|date')->alias('date_end')->next()
            ->date('dateReference')->validate('required|date')->alias('date_reference')->next()
            ->date('dateConfirmed')->validate('nullable|date')->onEmpty(null)
            ->alias('date_confirmed')->next()
            ->integer('kwhStart')->alias('kwh_start')->onEmpty(null)->next()
            ->integer('kwhEnd')->alias('kwh_end')->onEmpty(null)->next()
            ->integer('kwhStartHigh')->alias('kwh_start_high')->onEmpty(null)->next()
            ->integer('kwhEndHigh')->alias('kwh_end_high')->onEmpty(null)->next()
            ->integer('kwhStartLow')->alias('kwh_start_low')->onEmpty(null)->next()
            ->integer('kwhEndLow')->alias('kwh_end_low')->onEmpty(null)->next()
            ->double('revenue')->onEmpty(null)->next()
            ->string('datePayed')->validate('nullable|date')
            ->alias('date_payed')->whenMissing(null)->onEmpty(null)->next()
            ->double('payPercentage')->onEmpty(null)->alias('pay_percentage')->next()
            ->double('keyAmountFirstPercentage')->onEmpty(null)->alias('key_amount_first_percentage')->next()
            ->double('payPercentageValidFromKeyAmount')->onEmpty(null)->alias('pay_percentage_valid_from_key_amount')->next()
            ->integer('typeId')
            ->validate('nullable|exists:project_revenue_type,id')
            ->onEmpty(null)->alias('type_id')->next()
            ->double('payoutKwh')->alias('payout_kwh')->onEmpty(null)->whenMissing(null)->next()
            ->integer('payoutTypeId')->onEmpty(null)->alias('payout_type_id')->next()
            ->get();

        $projectRevenue = new ProjectRevenue();

        $projectRevenue->fill($data);

        $projectRevenue->save();

        $this->saveParticipantsOfDistribution($projectRevenue);

        if ($projectRevenue->confirmed) {
            $projectRevenue->load('distribution');
        }

        $projectRevenue->load('createdBy', 'project');

        return FullProjectRevenue::make($projectRevenue);
    }


    public function update(
        RequestInput $requestInput,
        ProjectRevenue $projectRevenue
    )
    {
        $this->authorize('manage', ProjectRevenue::class);

        $data = $requestInput
            ->string('distributionTypeId')->onEmpty(null)->alias('distribution_type_id')->next()
            ->boolean('confirmed')->next()
            ->date('dateBegin')->validate('required|date')->alias('date_begin')->next()
            ->date('dateEnd')->validate('required|date')->alias('date_end')->next()
            ->date('dateReference')->validate('required|date')->alias('date_reference')->next()
            ->date('dateConfirmed')->validate('nullable|date')->onEmpty(null)
            ->alias('date_confirmed')->next()
            ->integer('kwhStart')->alias('kwh_start')->onEmpty(null)->next()
            ->integer('kwhEnd')->alias('kwh_end')->onEmpty(null)->next()
            ->integer('kwhStartHigh')->alias('kwh_start_high')->onEmpty(null)->next()
            ->integer('kwhEndHigh')->alias('kwh_end_high')->onEmpty(null)->next()
            ->integer('kwhStartLow')->alias('kwh_start_low')->onEmpty(null)->next()
            ->integer('kwhEndLow')->alias('kwh_end_low')->onEmpty(null)->next()
            ->double('revenue')->onEmpty(null)->next()
            ->string('datePayed')->validate('nullable|date')->onEmpty(null)
            ->whenMissing(null)->alias('date_payed')->next()
            ->double('payPercentage')->onEmpty(null)->alias('pay_percentage')->next()
            ->double('keyAmountFirstPercentage')->onEmpty(null)->alias('key_amount_first_percentage')->next()
            ->double('payPercentageValidFromKeyAmount')->onEmpty(null)->alias('pay_percentage_valid_from_key_amount')->next()
            ->integer('typeId')
            ->validate('nullable|exists:project_revenue_type,id')
            ->onEmpty(null)->alias('type_id')->next()
            ->double('payoutKwh')->alias('payout_kwh')->onEmpty(null)->whenMissing(null)->next()
            ->integer('payoutTypeId')->onEmpty(null)->alias('payout_type_id')->next()
            ->get();

        $projectRevenue->fill($data);

        $recalculateDistribution = false;

        if($projectRevenue->isDirty('date_begin') ||
            $projectRevenue->isDirty('date_end') ||
            $projectRevenue->isDirty('date_reference') ||
            $projectRevenue->isDirty('kwh_start') ||
            $projectRevenue->isDirty('kwh_end') ||
            $projectRevenue->isDirty('payout_kwh') ||
            $projectRevenue->isDirty('pay_percentage') ||
            $projectRevenue->isDirty('key_amount_first_percentage') ||
            $projectRevenue->isDirty('pay_percentage_valid_from_key_amount') ||
            $projectRevenue->isDirty('distribution_type_id') ||
            $projectRevenue->isDirty('confirmed')) {
            $recalculateDistribution = true;
        }

        // If period is changed then remove all values from revenue distribution period
        if($projectRevenue->isDirty('date_begin') ||
            $projectRevenue->isDirty('date_end')) {
                $projectRevenue->deliveredKwhPeriod()->delete();
        }

        $projectRevenue->save();

        if($recalculateDistribution) $this->saveParticipantsOfDistribution($projectRevenue);

        return FullProjectRevenue::collection(ProjectRevenue::where('project_id',
            $projectRevenue->project_id)
            ->with('createdBy', 'project', 'type', 'distribution')
            ->orderBy('date_begin')->get());
    }

    public function saveParticipantsOfDistribution(
        ProjectRevenue $projectRevenue
    )
    {
        $project = $projectRevenue->project;
        $participants = $project->participantsProjectDefinitive;

        foreach ($participants as $participant) {
            $this->saveDistribution($projectRevenue, $participant);
        }

        $projectTypeCodeRef = (ProjectType::where('id', $projectRevenue->project->project_type_id)->first())->code_ref;
        if($projectRevenue->category->code_ref == 'revenueEuro'
            && ($projectTypeCodeRef === 'capital' || $projectTypeCodeRef === 'postalcode_link_capital')) {
            foreach($projectRevenue->distribution as $distribution) {
                $distribution->calculator()->runRevenueCaptitalResult();
                $distribution->save();
            }
        }

        if($projectRevenue->category->code_ref == 'revenueKwh') {
            foreach($projectRevenue->distribution as $distribution) {
                $distribution->calculator()->runRevenueKwh();
                $distribution->save();
            }
        }
    }

    public function saveDistribution(ProjectRevenue $projectRevenue, ParticipantProject $participant)
    {
        $contact = Contact::find($participant->contact_id);
        $primaryAddress = $contact->primaryAddress;
        $primaryContactEnergySupplier
            = $contact->primaryContactEnergySupplier;

        // If participant already is added to project revenue distribution then update
        if(ProjectRevenueDistribution::where('revenue_id', $projectRevenue->id)->where('participation_id', $participant->id)->exists()) {
            $distribution = ProjectRevenueDistribution::where('revenue_id', $projectRevenue->id)->where('participation_id', $participant->id)->first();
        } else {
            $distribution = new ProjectRevenueDistribution();
        }

        $distribution->revenue_id
            = $projectRevenue->id;
        $distribution->contact_id = $contact->id;

        if($projectRevenue->confirmed) {
            $distribution->status = 'confirmed';
        } else {
            $distribution->status = 'concept';
        }

        if ($primaryAddress) {
            $distribution->address = $primaryAddress->present()
                ->streetAndNumber();
            $distribution->postal_code = $primaryAddress->postal_code;
            $distribution->city = $primaryAddress->city;
        }

        if($participant->participantProjectPayoutType){
            $distribution->payout_type = $participant->participantProjectPayoutType->name;
        }elseif($projectRevenue->participantProjectPayoutType){
            $distribution->payout_type = $projectRevenue->participantProjectPayoutType->name;
        }else{
            $distribution->payout_type = '';
        }

        if ($primaryContactEnergySupplier) {
            $distribution->energy_supplier_name
                = $primaryContactEnergySupplier->energySupplier->name;

            $distribution->es_id
                = $primaryContactEnergySupplier->energySupplier->id;

            $distribution->energy_supplier_ean_electricity
                = $primaryContactEnergySupplier->ean_electricity;

            $distribution->energy_supplier_number
                = $primaryContactEnergySupplier->es_number;
        }

        $distribution->participation_id = $participant->id;
        $distribution->save();

        if($projectRevenue->category->code_ref == 'revenueKwh') {
            $this->saveDeliveredKwhPeriod($distribution);
            return;
        }

        $projectTypeCodeRef = (ProjectType::where('id', $projectRevenue->project->project_type_id)->first())->code_ref;
        if($projectTypeCodeRef === 'capital' || $projectTypeCodeRef === 'postalcode_link_capital') {
            $this->saveDeliveredKwhPeriod($distribution);
        }

        // Recalculate values of distribution after saving
        $distribution->calculator()->runRevenueEuro();
        $distribution->save();
    }

    public function saveDeliveredKwhPeriod(ProjectRevenueDistribution $distribution)
    {
        $distributionId = $distribution->id;
        $revenue = $distribution->revenue;

        $dateBeginFromRevenue = $revenue->date_begin;
        $dateEndFromRevenue = $revenue->date_end;

        if (!$dateBeginFromRevenue || !$dateEndFromRevenue) return 0;

        $quantityOfParticipations = 0;

        $mutations = $distribution->participation->mutationsDefinitive;

        foreach ($mutations as $index => $mutation) {
            $dateBegin = $dateBeginFromRevenue;
            $dateEnd = $dateEndFromRevenue;

            $nextMutation = $mutations->get(++$index);

            if($nextMutation) {
                $dateEnd = $nextMutation->date_entry;
            }

            $dateEntry = $mutation->date_entry;

            // If date entry is after date begin then date begin is equal to date entry
            if($dateEntry > $dateBegin) $dateBegin = $dateEntry;

            $dateEndForPeriod = clone $dateEnd;
            $daysOfPeriod = $dateEndForPeriod->addDay()->diffInDays($dateBegin);

            $quantityOfParticipations += $mutation->quantity;

            $deliveredKwhPeriod = ProjectRevenueDeliveredKwhPeriod::updateOrCreate(
                [
                    'distribution_id' => $distributionId,
                    'revenue_id' => $revenue->id,
                    'date_begin' => $dateBegin
                ],
                [
                    'date_end' => $dateEnd,
                    'days_of_period' => $daysOfPeriod,
                    'participations_quantity' => $quantityOfParticipations
                ]
            );

            $deliveredKwhPeriod->save();
        }
    }

    public function createEnergySupplierReport(
        Request $request,
        ProjectRevenue $projectRevenue,
        DocumentTemplate $documentTemplate,
        EnergySupplier $energySupplier
    )
    {
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

        $project = $projectRevenue->project;

        $energySupplierHtml
            = TemplateVariableHelper::replaceTemplateVariables($html,
            'opbrengst', $projectRevenue);
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

    public function createEnergySupplierExcel(
        Request $request,
        ProjectRevenue $projectRevenue,
        EnergySupplier $energySupplier
    )
    {
        $documentName = $request->input('documentName');
        $fileName = $documentName . '.xlsx';
        $templateId = $request->input('templateId');

        if ($templateId) {
            set_time_limit(0);
            $excelHelper = new EnergySupplierExcelHelper($energySupplier,
                $projectRevenue, $templateId, $fileName);
            $excel = $excelHelper->getExcel();
        }

        $document = new Document();
        $document->document_type = 'internal';
        $document->document_group = 'revenue';

        $document->filename = $fileName;

        $document->save();

        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'documents' . DIRECTORY_SEPARATOR
            . $document->filename));

        $writer = new Xlsx($excel);
        $writer->save($filePath);

//        die("stop hier maar even voor testdoeleinden Excel (behoud file.xlsx in storage/app/documents)");

        $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));

        $alfrescoResponse = $alfrescoHelper->createFile($filePath,
            $document->filename, $document->getDocumentGroup()->name);

        $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
        $document->save();

        //delete file on server, still saved on alfresco.
        Storage::disk('documents')->delete($document->filename);
    }

    public function destroy(ProjectRevenue $projectRevenue)
    {
        $this->authorize('manage', ProjectRevenue::class);

        try {
            DB::beginTransaction();

            $deleteRevenue = new DeleteRevenue($projectRevenue);
            $result = $deleteRevenue->delete();

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

    public function createInvoices(
        $distributions, $datePayout
    )
    {

        $createdInvoices = [];

        if (!($distributions->first())->revenue->project->administration_id) {
            abort(400,
                'Geen administratie gekoppeld aan dit productie project');
        }

        foreach ($distributions as $distribution) {
            $projectTypeCodeRef = (ProjectType::where('id', $distribution->revenue->project->project_type_id)->first())->code_ref;
            //status moet nog bevestigd (confirmed zijn)
            if ($distribution->status === 'confirmed')
            {
                // indien Opbrengst Kwh, dan geen voorwaarden inzake adres of IBAN
                if ($distribution->revenue->category->code_ref === 'revenueKwh') {
                    $distribution->status = 'in-progress';
                    $distribution->save();
                }else{
                    // indien Opbrengst Euro, dan wel voorwaarden inzake adres of IBAN (afhankellijk van payout type)
                    if ($distribution->payout_type === 'Rekening'
                        && ($distribution->payout > 0)
                        && !(empty($distribution->address)
                            || empty($distribution->postal_code)
                            || empty($distribution->city)
                            || (empty($distribution->participation->iban_payout) && empty($distribution->contact->iban))
                        )
                    )
                    {
                            $distribution->status = 'in-progress';
                        $distribution->save();
                    }
                    if ($distribution->payout_type === 'Bijschrijven'
                        && ($projectTypeCodeRef === 'capital' || $projectTypeCodeRef === 'postalcode_link_capital' || $distribution->payout > 0)
                    ) {
                        $distribution->status = 'in-progress';
                        $distribution->save();
                    }
                }
            }
        }

        foreach ($distributions as $distribution) {
            //status moet nu onderhanden zijn (in-progess zijn)
            if ($distribution->status === 'in-progress')
            {
                // indien Opbrengst Kwh, dan alleen mutation aanmaken en daarna status op Afgehandeld (processed).
                if ($distribution->revenue->category->code_ref === 'revenueKwh') {
                    $this->createParticipantMutationForRevenueKwh($distribution, $datePayout);
                    $distribution->status = 'processed';
                    $distribution->save();
                }else{
                    // indien Opbrengst Euro, dan gaan we of facturen en sepa aanmaken of bijschrijven (afhankellijk van payout type)
                    if ($distribution->payout_type === 'Rekening')
                    {
                        $currentYear = Carbon::now()->year;
                        // Haal laatst uitgedeelde uitkeringsfactuurnummer op (binnen aanmaakjaar)
                        $lastPaymentInvoice = PaymentInvoice::where('administration_id',
                            $distribution->revenue->project->administration_id)->where('invoice_number', '!=', 0)
                            ->whereYear('created_at', '=', $currentYear)->orderBy('invoice_number', 'desc')->first();

                        $newInvoiceNumber = 1;
                        if ($lastPaymentInvoice) {
                            $newInvoiceNumber = ($lastPaymentInvoice->invoice_number + 1);
                        }

                        if (PaymentInvoice::where('administration_id',
                            $distribution->revenue->project->administration_id)
                            ->where('invoice_number', '=', $newInvoiceNumber)
                            ->whereYear('created_at', '=', $currentYear)
                            ->exists()
                        ) {
                            // voor abort status weer even terug zetten naar confirmed (anders blijft ie op "in-progress" hangen).
                            $distribution->status = 'confirmed';
                            $distribution->save();
                            abort(404, "Voor uitkeringsfactuur met administratie ID "
                                . $distribution->revenue->project->administration_id . " en revenue distribution ID "
                                . $distribution->id . " kon geen nieuw nummer bepaald worden.");
                        } else {
                            $paymentInvoice = new PaymentInvoice();
                            $paymentInvoice->revenue_distribution_id = $distribution->id;
                            $paymentInvoice->administration_id
                                = $distribution->revenue->project->administration_id;
                            $paymentInvoice->invoice_number = $newInvoiceNumber;
                            $paymentInvoice->number = 'U' . Carbon::now()->year . '-' . $newInvoiceNumber;
                            $paymentInvoice->status_id = 'sent';
                            $paymentInvoice->save();
                        }
                        array_push($createdInvoices, $paymentInvoice);
                    }

                    if ($distribution->payout_type === 'Bijschrijven') {
                        $participantMutation = new ParticipantMutation();
                        $participantMutation->participation_id = $distribution->participation_id;
                        $participantMutation->type_id = ParticipantMutationType::where('code_ref', 'result')
                            ->where('project_type_id', $distribution->participation->project->project_type_id)->value('id');
                        $participantMutation->status_id = ParticipantMutationStatus::where('code_ref', 'final')
                            ->value('id');
                        $participantMutation->amount = $distribution->payout;
                        $participantMutation->returns = $distribution->payout;
                        $participantMutation->paid_on = 'Bijschrijven';
                        $participantMutation->date_entry = $datePayout;
                        $participantMutation->save();

                        // Recalculate dependent data in participantProject
                        $participantMutation->participation->calculator()->run()->save();

                        // Recalculate dependent data in project
                        $participantMutation->participation->project->calculator()->run()->save();
                    }

                    // Nu kan status op Afgehandeld (processed).
                    $distribution->status = 'processed';
                    $distribution->date_payout = $datePayout;
                    $distribution->save();
                }
            }
        }
        return $createdInvoices;
    }

    public function peekDistributionByIds(Request $request)
    {
        $this->authorize('manage', ProjectRevenue::class);

        $ids = $request->input('ids') ? $request->input('ids') : [];

        $distribution = ProjectRevenueDistribution::whereIn('id',
            $ids)->with(['revenue'])->get();

        return FullProjectRevenueDistribution::collection($distribution);
    }

    public function downloadPreview(Request $request, ProjectRevenueDistribution $distribution)
    {
        return $this->createParticipantRevenueReport($request->input('subject'),
            [$distribution->id],
            DocumentTemplate::find($request->input('documentTemplateId')),
            EmailTemplate::find($request->input('emailTemplateId')), true);
    }

    public function previewEmail(Request $request, ProjectRevenueDistribution $distribution)
    {
        return $this->createParticipantRevenueReport($request->input('subject'),
            [$distribution->id],
            DocumentTemplate::find($request->input('documentTemplateId')),
            EmailTemplate::find($request->input('emailTemplateId')), false,
            true);
    }

    public function createParticipantRevenueReport($subject, $distributionIds, DocumentTemplate $documentTemplate, EmailTemplate $emailTemplate, $previewPDF = false, $previewEmail = false)
    {
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

        foreach ($distributionIds as $distributionId) {
            $distribution
                = ProjectRevenueDistribution::find($distributionId);

            if( !( empty($distribution->address)
                || empty($distribution->postal_code)
                || empty($distribution->city) ) ) {

                $contact = $distribution->contact;
                $orderController = new OrderController();

                $contactInfo = $orderController->getContactInfoForOrder($contact);

                $primaryEmailAddress = $contact->primaryEmailAddress;

                $revenue = $distribution->revenue;
                $project = $revenue->project;
                $administration = $project->administration;

                if (!$previewEmail) {

                    $html = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $html);

                    $revenueHtml = TemplateTableHelper::replaceTemplateTables($html, $contact);

                    $revenueHtml
                        = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'contact', $contact);

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
                        = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'verdeling', $distribution);
                    $revenueHtml
                        = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'opbrengst', $revenue);
                    $revenueHtml
                        = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'project', $project);
                    $revenueHtml
                        = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'deelname', $distribution->participation);
                    $revenueHtml
                        = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'mutaties', $distribution->participation->mutations);

                    $revenueHtml
                        = TemplateVariableHelper::stripRemainingVariableTags($revenueHtml);
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

                    $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
                    $document->save();
                }

                //send email
                if ($primaryEmailAddress) {
                    $this->setMailConfigByDistribution($distribution);

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
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'verdeling', $distribution);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'opbrengst', $revenue);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'project', $project);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'deelname', $distribution->participation);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'mutaties', $distribution->participation->mutations);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);

                    $subject = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $subject);
                    $htmlBodyWithContactVariables = str_replace('{contactpersoon}', $contactInfo['contactPerson'],
                        $htmlBodyWithContactVariables);

                    $primaryMailbox = Mailbox::getDefault();
                    if ($primaryMailbox) {
                        $fromEmail = $primaryMailbox->email;
                        $fromName = $primaryMailbox->name;
                    } else {
                        $fromEmail = \Config::get('mail.from.address');
                        $fromName = \Config::get('mail.from.name');
                    }

                    if ($previewEmail) {
                        return [
                            'from' => $fromEmail,
                            'to' => $primaryEmailAddress->email,
                            'subject' => $subject,
                            'htmlBody' => $htmlBodyWithContactVariables
                        ];
                    } else {
                        $email->send(new ParticipantReportMail($email, $fromEmail, $fromName,
                            $htmlBodyWithContactVariables, $document));
                    }
                } else {
                    return [
                        'from' => 'Geen e-mail bekend.',
                        'to' => 'Geen e-mail bekend.',
                        'subject' => 'Geen e-mail bekend.',
                        'htmlBody' => 'Geen e-mail bekend.'
                    ];
                }

                if (!$previewPDF && !$previewEmail) {
                    //delete file on server, still saved on alfresco.
                    Storage::disk('documents')->delete($document->filename);
                }
            }
        }
    }

    public function createRevenueReport(Request $request)
    {
        set_time_limit(0);
        $distributionIds = $request->input('distributionIds');
        $subject = $request->input('subject');
        $documentTemplateId = $request->input('documentTemplateId');
        $emailTemplateId = $request->input('emailTemplateId');

        CreateRevenueReport::dispatch($distributionIds, $subject, $documentTemplateId, $emailTemplateId, Auth::id());

        return ProjectRevenueDistribution::find($distributionIds[0])->revenue->project->administration_id;
    }
    public function createPaymentInvoices(Request $request)
    {
        set_time_limit(0);
        $distributionIds = $request->input('distributionIds');
        $datePayout = $request->input('datePayout');

        CreatePaymentInvoices::dispatch($distributionIds, $datePayout, Auth::id());

        return ProjectRevenueDistribution::find($distributionIds[0])->revenue->project->administration_id;
    }

    protected function createParticipantMutationForRevenueKwh(ProjectRevenueDistribution $distribution, $datePayout){
        $participantMutation = new ParticipantMutation();
        $participantMutation->participation_id = $distribution->participation_id;
        $participantMutation->type_id = ParticipantMutationType::where('code_ref', 'energyTaxRefund')->where('project_type_id', $distribution->participation->project->project_type_id)->value('id');
        $participantMutation->payout_kwh_price = $distribution->payout_kwh;
        $participantMutation->payout_kwh = $distribution->delivered_total;
        $participantMutation->indication_of_restitution_energy_tax = $distribution->KwhReturn;
        $participantMutation->paid_on = $distribution->contact->primaryContactEnergySupplier ? $distribution->contact->primaryContactEnergySupplier->energySupplier->name : '';
        $participantMutation->date_payment = $datePayout;
        $participantMutation->save();
    }

    protected function setMailConfigByDistribution(ProjectRevenueDistribution $distribution)
    {
        // Standaard vanuit primaire mailbox mailen
        $mailboxToSendFrom = Mailbox::where('primary', 1)->first();

        // Als er een mailbox aan de administratie is gekoppeld, dan deze gebruiken
        $project = $distribution->revenue->project;

        if ($project->administration && $project->administration->mailbox) {
            $mailboxToSendFrom = $project->administration->mailbox;
        }

        // Configuratie instellen als er een mailbox is gevonden
        if ($mailboxToSendFrom) {
            (new EmailHelper())->setConfigToMailbox($mailboxToSendFrom);
        }
    }

    protected function translateToValidCharacterSet($field){

        $field = iconv('UTF-8', 'ASCII//TRANSLIT', $field);
        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);

        return $field;
    }


}