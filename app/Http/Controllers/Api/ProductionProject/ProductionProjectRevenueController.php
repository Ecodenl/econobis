<?php

namespace App\Http\Controllers\Api\ProductionProject;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Occupation\OccupationContact;
use App\Eco\PaymentInvoice\PaymentInvoice;
use App\Eco\ProductionProject\ProductionProjectRevenue;
use App\Eco\ProductionProject\ProductionProjectRevenueDistribution;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Helpers\CSV\EnergySupplierCSVHelper;
use App\Helpers\CSV\RevenueDistributionCSVHelper;
use App\Helpers\CSV\RevenueParticipantsCSVHelper;
use App\Helpers\Email\EmailHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Helpers\Template\TemplateTableHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\Order\OrderController;
use App\Http\Resources\ParticipantProductionProject\FullRevenueParticipantProductionProject;
use App\Http\Resources\ParticipantProductionProject\Templates\ParticipantReportMail;
use App\Http\Resources\ProductionProject\FullProductionProjectRevenue;
use App\Http\Resources\ProductionProject\FullProductionProjectRevenueDistribution;
use App\Jobs\Revenue\CreatePaymentInvoices;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class ProductionProjectRevenueController extends ApiController
{
    public function show(ProductionProjectRevenue $productionProjectRevenue)
    {
        $productionProjectRevenue->load([
            'type',
            'category',
            'productionProject.administration',
            'createdBy',
        ]);

        return FullProductionProjectRevenue::make($productionProjectRevenue);
    }

    public function csv(ProductionProjectRevenue $productionProjectRevenue)
    {
        set_time_limit(0);

        if ($productionProjectRevenue->confirmed) {
            $productionProjectRevenue = new RevenueDistributionCSVHelper($productionProjectRevenue->distribution);
        } else {
            $productionProjectRevenue = new RevenueParticipantsCSVHelper($productionProjectRevenue->productionProject->participantsProductionProject, $productionProjectRevenue);
        }


        return $productionProjectRevenue->downloadCSV();
    }

    public function getRevenueDistribution(ProductionProjectRevenue $productionProjectRevenue, Request $request)
    {
        $limit = 100;
        $offset = $request->input('page') ? $request->input('page') * $limit : 0;

        $distribution = $productionProjectRevenue->distribution()->limit($limit)->offset($offset)->get();
        $total = $productionProjectRevenue->distribution()->count();

        return FullProductionProjectRevenueDistribution::collection($distribution)
            ->additional(['meta' => [
                'total' => $total,
            ]
            ]);

    }

    public function getRevenueParticipants(ProductionProjectRevenue $productionProjectRevenue, Request $request)
    {
        $limit = 100;
        $offset = $request->input('page') ? $request->input('page') * $limit : 0;

        $participants = $productionProjectRevenue->productionProject->participantsProductionProject()->limit($limit)->offset($offset)->get();
        $total = $productionProjectRevenue->productionProject->participantsProductionProject()->count();

        $participants->load([
            'participantProductionProjectPayoutType',
        ]);

        return FullRevenueParticipantProductionProject::collection($participants)
            ->additional(['meta' => [
                'total' => $total,
            ]
            ]);
    }

    public function store(RequestInput $requestInput)
    {
        $this->authorize('manage', ProductionProjectRevenue::class);

        $data = $requestInput
            ->integer('categoryId')
            ->validate('required|exists:production_project_revenue_category,id')
            ->alias('category_id')->next()
            ->integer('productionProjectId')
            ->validate('required|exists:production_projects,id')
            ->alias('production_project_id')->next()
            ->boolean('confirmed')->next()
            ->date('dateBegin')->validate('required|date')->alias('date_begin')
            ->next()
            ->date('dateEnd')->validate('required|date')->alias('date_end')
            ->next()
            ->date('dateEntry')->validate('required|date')->alias('date_entry')
            ->next()
            ->string('dateConfirmed')->validate('nullable|date')->onEmpty(null)
            ->alias('date_confirmed')->next()
            ->integer('kwhStart')->alias('kwh_start')->onEmpty(null)->next()
            ->integer('kwhEnd')->alias('kwh_end')->onEmpty(null)->next()
            ->integer('kwhStartHigh')->alias('kwh_start_high')->onEmpty(null)
            ->next()
            ->integer('kwhEndHigh')->alias('kwh_end_high')->onEmpty(null)
            ->next()
            ->integer('kwhStartLow')->alias('kwh_start_low')->onEmpty(null)
            ->next()
            ->integer('kwhEndLow')->alias('kwh_end_low')->onEmpty(null)->next()
            ->integer('revenue')->onEmpty(null)->next()
            ->string('datePayed')->validate('nullable|date')
            ->alias('date_payed')->whenMissing(null)->onEmpty(null)->next()
            ->integer('payPercentage')->onEmpty(null)->alias('pay_percentage')
            ->next()
            ->integer('typeId')
            ->validate('nullable|exists:production_project_revenue_type,id')
            ->onEmpty(null)->alias('type_id')->next()
            ->double('payoutKwh')->alias('payout_kwh')->onEmpty(null)->whenMissing(null)->next()
            ->get();

        $productionProjectRevenue = new ProductionProjectRevenue();

        $productionProjectRevenue->fill($data);

        $productionProjectRevenue->save();

        if ($productionProjectRevenue->confirmed) {
            $this->saveDistribution($productionProjectRevenue);
            $productionProjectRevenue->load('distribution');
        }

        $productionProjectRevenue->load('createdBy', 'productionProject');

        return FullProductionProjectRevenue::make($productionProjectRevenue);
    }


    public function update(
        RequestInput $requestInput,
        ProductionProjectRevenue $productionProjectRevenue
    )
    {
        $this->authorize('manage', ProductionProjectRevenue::class);

        $data = $requestInput
            ->integer('categoryId')
            ->validate('required|exists:production_project_revenue_category,id')
            ->alias('category_id')->next()
            ->boolean('confirmed')->next()
            ->date('dateBegin')->validate('required|date')->alias('date_begin')
            ->next()
            ->date('dateEnd')->validate('required|date')->alias('date_end')
            ->next()
            ->date('dateEntry')->validate('required|date')->alias('date_entry')
            ->next()
            ->string('dateConfirmed')->validate('nullable|date')->onEmpty(null)
            ->alias('date_confirmed')->next()
            ->integer('kwhStart')->alias('kwh_start')->onEmpty(null)->next()
            ->integer('kwhEnd')->alias('kwh_end')->onEmpty(null)->next()
            ->integer('kwhStartHigh')->alias('kwh_start_high')->onEmpty(null)
            ->next()
            ->integer('kwhEndHigh')->alias('kwh_end_high')->onEmpty(null)
            ->next()
            ->integer('kwhStartLow')->alias('kwh_start_low')->onEmpty(null)
            ->next()
            ->integer('kwhEndLow')->alias('kwh_end_low')->onEmpty(null)->next()
            ->integer('revenue')->onEmpty(null)->next()
            ->string('datePayed')->validate('nullable|date')->onEmpty(null)
            ->whenMissing(null)->alias('date_payed')->next()
            ->integer('payPercentage')->onEmpty(null)->alias('pay_percentage')
            ->next()
            ->integer('typeId')
            ->validate('nullable|exists:production_project_revenue_type,id')
            ->onEmpty(null)->alias('type_id')->next()
            ->double('payoutKwh')->alias('payout_kwh')->onEmpty(null)->whenMissing(null)->next()
            ->get();

        $productionProjectRevenue->fill($data);

        $productionProjectRevenue->save();

        $productionProjectRevenue->confirmed
        && $this->saveDistribution($productionProjectRevenue);

        return FullProductionProjectRevenue::collection(ProductionProjectRevenue::where('production_project_id',
            $productionProjectRevenue->production_project_id)
            ->with('createdBy', 'productionProject', 'type', 'distribution')
            ->orderBy('date_begin')->get());
    }

    public function saveDistribution(
        ProductionProjectRevenue $productionProjectRevenue
    )
    {

        $productionProjectRevenue->save();

        $productionProject = $productionProjectRevenue->productionProject;
        $participants = $productionProject->participantsProductionProject;

        $totalParticipations = 0;

        foreach ($participants as $participant) {
            $totalParticipations += $participant->participations_current;
        }

        $totalParticipations ?: $totalParticipations = 1;

        foreach ($participants as $participant) {
            $contact = Contact::find($participant->contact_id);
            $primaryAddress = $contact->primaryAddress;
            $primaryContactEnergySupplier
                = $contact->primaryContactEnergySupplier;

            $distribution = new ProductionProjectRevenueDistribution();

            $distribution->revenue_id
                = $productionProjectRevenue->id;
            $distribution->contact_id = $contact->id;

            if ($primaryAddress) {
                $distribution->address = $primaryAddress->present()
                    ->streetAndNumber();
                $distribution->postal_code = $primaryAddress->postal_code;
                $distribution->city = $primaryAddress->city;
            }

            $distribution->status = $contact->getStatus()
                ? $contact->getStatus()->name : '';
            $distribution->participations_amount
                = $participant->participations_current;

            $distribution->payout = round((($productionProjectRevenue->revenue
                        * ($productionProjectRevenue->pay_percentage / 100))
                    / $totalParticipations)
                * $participant->participations_current, 2);

            $distribution->payout_type
                = $participant->participantProductionProjectPayoutType->name;

            $distribution->delivered_total
                = round((($productionProjectRevenue->kwh_end
                        - $productionProjectRevenue->kwh_start)
                    / $totalParticipations)
                * $participant->participations_current, 2);

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
            $distribution->payout_kwh = $productionProjectRevenue->payout_kwh;

            $distribution->participation_id = $participant->id;
            $distribution->save();
        }
    }

    public function createEnergySupplierReport(
        Request $request,
        ProductionProjectRevenue $productionProjectRevenue,
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

        $productionProject = $productionProjectRevenue->productionProject;

        $energySupplierHtml
            = TemplateVariableHelper::replaceTemplateVariables($html,
            'opbrengst', $productionProjectRevenue);
        $energySupplierHtml
            = TemplateVariableHelper::replaceTemplateVariables($energySupplierHtml,
            'productie_project', $productionProject);
        $energySupplierHtml
            = TemplateVariableHelper::replaceTemplateVariables($energySupplierHtml,
            'ik', $user);
        $energySupplierHtml
            = TemplateVariableHelper::replaceTemplateVariables($energySupplierHtml,
            'administratie', $productionProject->administration);

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

    public function createEnergySupplierCSV(
        Request $request,
        ProductionProjectRevenue $productionProjectRevenue,
        EnergySupplier $energySupplier
    )
    {
        $documentName = $request->input('documentName');
        $fileName = $documentName . '.csv';
        $templateId = $request->input('templateId');

        //get current logged in user
        $user = Auth::user();

        if ($templateId) {
            set_time_limit(0);
            $csvHelper = new EnergySupplierCSVHelper($energySupplier,
                $productionProjectRevenue, $templateId, $fileName);
            $csv = $csvHelper->getCSV();
        }

        $document = new Document();
        $document->document_type = 'internal';
        $document->document_group = 'revenue';

        $document->filename = $fileName;

        $document->save();

        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'documents' . DIRECTORY_SEPARATOR
            . $document->filename));
        file_put_contents($filePath, $csv);

        $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));

        $alfrescoResponse = $alfrescoHelper->createFile($filePath,
            $document->filename, $document->getDocumentGroup()->name);

        $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
        $document->save();

        //delete file on server, still saved on alfresco.
        Storage::disk('documents')->delete($document->filename);
    }


    public function destroy(ProductionProjectRevenue $productionProjectRevenue)
    {
        $this->authorize('manage', ProductionProjectRevenue::class);

        $productionProjectRevenue->forceDelete();
    }

    public function createInvoices(
        $distributions
    )
    {

        $createdInvoices = [];

        foreach ($distributions as $distribution) {
            if (!$distribution->revenue->productionProject->administration_id) {
                abort(400,
                    'Geen administratie gekoppeld aan dit productie project');
            }
            if ($distribution->payout_type === 'Rekening'
                && $distribution->payout > 0
                && !(empty($distribution->address)
                    || empty($distribution->postal_code)
                    || empty($distribution->city)
                    || (empty($distribution->participation->iban_payout) && empty($distribution->contact->iban)))
            ) {
                $paymentInvoice = new PaymentInvoice();
                $paymentInvoice->revenue_distribution_id = $distribution->id;
                $paymentInvoice->administration_id
                    = $distribution->revenue->productionProject->administration_id;
                $paymentInvoice->save();

                array_push($createdInvoices, $paymentInvoice);
            }
        }

        return $createdInvoices;
    }

    public function peekDistributionByIds(Request $request)
    {
        $this->authorize('manage', ProductionProjectRevenue::class);

        $ids = $request->input('ids') ? $request->input('ids') : [];

        $distribution = ProductionProjectRevenueDistribution::whereIn('id',
            $ids)->with(['revenue'])->get();

        return FullProductionProjectRevenueDistribution::collection($distribution);
    }

    public function downloadPreview(Request $request, ProductionProjectRevenueDistribution $distribution)
    {
        return $this->createParticipantRevenueReport($request->input('subject'),
            [$distribution->id],
            DocumentTemplate::find($request->input('documentTemplateId')),
            EmailTemplate::find($request->input('emailTemplateId')), true);
    }

    public function previewEmail(Request $request, ProductionProjectRevenueDistribution $distribution)
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
                = ProductionProjectRevenueDistribution::find($distributionId);

            $contact = $distribution->contact;
            $orderController = new OrderController();

            $contactInfo = $orderController->getContactInfoForOrder($contact);

            $primaryEmailAddress = $contact->primaryEmailAddress;

            $revenue = $distribution->revenue;
            $productionProject = $revenue->productionProject;
            $administration = $productionProject->administration;

            if (!$previewEmail) {

                $html = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $html);

                $revenueHtml = TemplateTableHelper::replaceTemplateTables($html, $contact);

                $revenueHtml
                    = TemplateVariableHelper::replaceTemplateVariables($revenueHtml,
                    'contact', $contact);

                //wettelijk vertegenwoordiger
                if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
                    $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->first()->primaryContact;
                    $revenueHtml
                        = TemplateVariableHelper::replaceTemplateVariables($revenueHtml,
                        'wettelijk_vertegenwoordiger', $wettelijkVertegenwoordiger);
                }
                $revenueHtml
                    = TemplateVariableHelper::replaceTemplateVariables($revenueHtml,
                    'administratie', $administration);
                $revenueHtml
                    = TemplateVariableHelper::replaceTemplateVariables($revenueHtml,
                    'verdeling', $distribution);
                $revenueHtml
                    = TemplateVariableHelper::replaceTemplateVariables($revenueHtml,
                    'opbrengst', $revenue);
                $revenueHtml
                    = TemplateVariableHelper::replaceTemplateVariables($revenueHtml,
                    'productie_project', $productionProject);
                $revenueHtml
                    = TemplateVariableHelper::replaceTemplateVariables($revenueHtml,
                    'ik', $user);
                $revenueHtml
                    = TemplateVariableHelper::replaceTemplateVariables($revenueHtml,
                    'participant', $distribution->participation);

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

                $filename = str_replace(' ', '', $productionProject->code) . '_'
                    . str_replace(' ', '', $contact->full_name);

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

                $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));

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

                $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body, $contact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'contact', $contact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'ik', $user);

                //wettelijk vertegenwoordiger
                if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
                    $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->first()->primaryContact;
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables,
                        'wettelijk_vertegenwoordiger', $wettelijkVertegenwoordiger);
                }

                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'participant', $distribution->participation);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'administratie', $administration);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'verdeling', $distribution);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'opbrengst', $revenue);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'productie_project', $productionProject);
                $htmlBodyWithContactVariables = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);
                $subject = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $subject);
                $htmlBodyWithContactVariables = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $htmlBodyWithContactVariables);

                $primaryMailbox = Mailbox::getDefault();

                if ($previewEmail) {
                    return [
                        'from' => $primaryMailbox->email,
                        'to' => $primaryEmailAddress->email,
                        'subject' => $subject,
                        'htmlBody' => $htmlBodyWithContactVariables
                    ];
                } else {
                    $email->send(new ParticipantReportMail($email, $primaryMailbox->email, $primaryMailbox->name,
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

    public function createPaymentInvoices(Request $request)
    {
        set_time_limit(0);
        $createReport = $request->input('createReport');
        $createInvoice = $request->input('createInvoice');
        $distributionIds = $request->input('distributionIds');
        $subject = $request->input('subject');
        $documentTemplateId = $request->input('documentTemplateId');
        $emailTemplateId = $request->input('emailTemplateId');

        CreatePaymentInvoices::dispatch($createReport, $createInvoice, $distributionIds, $subject, $documentTemplateId, $emailTemplateId, Auth::id());

        return ProductionProjectRevenueDistribution::find($distributionIds[0])->revenue->productionProject->administration_id;
    }

    protected function setMailConfigByDistribution(ProductionProjectRevenueDistribution $distribution)
    {
        // Standaard vanuit primaire mailbox mailen
        $mailboxToSendFrom = Mailbox::where('primary', 1)->first();

        // Als er een mailbox aan de administratie is gekoppeld, dan deze gebruiken
        $productionProject = $distribution->revenue->productionProject;

        if ($productionProject->administration && $productionProject->administration->mailbox) {
            $mailboxToSendFrom = $productionProject->administration->mailbox;
        }

        // Configuratie instellen als er een mailbox is gevonden
        if ($mailboxToSendFrom) {
            (new EmailHelper())->setConfigToMailbox($mailboxToSendFrom);
        }
    }

}