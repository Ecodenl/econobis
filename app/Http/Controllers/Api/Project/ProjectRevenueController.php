<?php

namespace App\Http\Controllers\Api\Project;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Occupation\OccupationContact;
use App\Eco\PaymentInvoice\PaymentInvoice;
use App\Eco\Project\ProjectRevenue;
use App\Eco\Project\ProjectRevenueDistribution;
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
use App\Http\Resources\ParticipantProject\FullRevenueParticipantProject;
use App\Http\Resources\ParticipantProject\Templates\ParticipantReportMail;
use App\Http\Resources\Project\FullProjectRevenue;
use App\Http\Resources\Project\FullProjectRevenueDistribution;
use App\Jobs\Revenue\CreatePaymentInvoices;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class ProjectRevenueController extends ApiController
{
    public function show(ProjectRevenue $projectRevenue)
    {
        $projectRevenue->load([
            'type',
            'category',
            'project.administration',
            'createdBy',
        ]);

        return FullProjectRevenue::make($projectRevenue);
    }

    public function csv(ProjectRevenue $projectRevenue)
    {
        set_time_limit(0);

        if ($projectRevenue->confirmed) {
            $projectRevenue = new RevenueDistributionCSVHelper($projectRevenue->distribution);
        } else {
            $projectRevenue = new RevenueParticipantsCSVHelper($projectRevenue->project->participantsProject, $projectRevenue);
        }


        return $projectRevenue->downloadCSV();
    }

    public function getRevenueDistribution(ProjectRevenue $projectRevenue, Request $request)
    {
        $limit = 100;
        $offset = $request->input('page') ? $request->input('page') * $limit : 0;

        $distribution = $projectRevenue->distribution()->limit($limit)->offset($offset)->get();
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
            ->integer('projectId')
            ->validate('required|exists:projects,id')
            ->alias('project_id')->next()
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
            ->double('revenue')->onEmpty(null)->next()
            ->string('datePayed')->validate('nullable|date')
            ->alias('date_payed')->whenMissing(null)->onEmpty(null)->next()
            ->double('payPercentage')->onEmpty(null)->alias('pay_percentage')
            ->next()
            ->integer('typeId')
            ->validate('nullable|exists:project_revenue_type,id')
            ->onEmpty(null)->alias('type_id')->next()
            ->double('payoutKwh')->alias('payout_kwh')->onEmpty(null)->whenMissing(null)->next()
            ->get();

        $projectRevenue = new ProjectRevenue();

        $projectRevenue->fill($data);

        $projectRevenue->save();

        if ($projectRevenue->confirmed) {
            $this->saveDistribution($projectRevenue);
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
            ->integer('categoryId')
            ->validate('required|exists:project_revenue_category,id')
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
            ->double('revenue')->onEmpty(null)->next()
            ->string('datePayed')->validate('nullable|date')->onEmpty(null)
            ->whenMissing(null)->alias('date_payed')->next()
            ->double('payPercentage')->onEmpty(null)->alias('pay_percentage')
            ->next()
            ->integer('typeId')
            ->validate('nullable|exists:project_revenue_type,id')
            ->onEmpty(null)->alias('type_id')->next()
            ->double('payoutKwh')->alias('payout_kwh')->onEmpty(null)->whenMissing(null)->next()
            ->get();

        $projectRevenue->fill($data);

        $projectRevenue->save();

        $projectRevenue->confirmed
        && $this->saveDistribution($projectRevenue);

        return FullProjectRevenue::collection(ProjectRevenue::where('project_id',
            $projectRevenue->project_id)
            ->with('createdBy', 'project', 'type', 'distribution')
            ->orderBy('date_begin')->get());
    }

    public function saveDistribution(
        ProjectRevenue $projectRevenue
    )
    {

        $projectRevenue->save();

        $project = $projectRevenue->project;
        $participants = $project->participantsProject;

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

            $distribution = new ProjectRevenueDistribution();

            $distribution->revenue_id
                = $projectRevenue->id;
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

            $distribution->payout = round((($projectRevenue->revenue
                        * ($projectRevenue->pay_percentage / 100))
                    / $totalParticipations)
                * $participant->participations_current, 2);

            $distribution->payout_type
                = $participant->participantProjectPayoutType->name;

            $distribution->delivered_total
                = round((($projectRevenue->kwh_end
                        - $projectRevenue->kwh_start)
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
            $distribution->payout_kwh = $projectRevenue->payout_kwh;

            $distribution->participation_id = $participant->id;
            $distribution->save();
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
            'productie_project', $project);
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

    public function createEnergySupplierCSV(
        Request $request,
        ProjectRevenue $projectRevenue,
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
                $projectRevenue, $templateId, $fileName);
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


    public function destroy(ProjectRevenue $projectRevenue)
    {
        $this->authorize('manage', ProjectRevenue::class);

        $projectRevenue->forceDelete();
    }

    public function createInvoices(
        $distributions
    )
    {

        $createdInvoices = [];

        foreach ($distributions as $distribution) {
            if (!$distribution->revenue->project->administration_id) {
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
                $currentYear = Carbon::now()->year;
                // Haal laatst uitgedeelde uitkeringsfactuurnummer op (binnen aanmaakjaar)
                $lastPaymentInvoice = PaymentInvoice::where('administration_id', $distribution->revenue->productionProject->administration_id)->where('invoice_number', '!=', 0)->whereYear('created_at', '=', $currentYear)->orderBy('invoice_number', 'desc')->first();

                $newInvoiceNumber = 1;
                if($lastPaymentInvoice)
                {
                    $newInvoiceNumber = ($lastPaymentInvoice->invoice_number + 1) ;
                }

                if(PaymentInvoice::where('administration_id', $distribution->revenue->productionProject->administration_id)->where('invoice_number', '=', $newInvoiceNumber)->whereYear('created_at', '=', $currentYear)->exists())
                {
                    abort(404, "Voor uitkeringsfactuur met administratie ID " . $distribution->revenue->productionProject->administration_id . " en revenue distribution ID " . $distribution->id . " kon geen nieuw nummer bepaald worden.");
                }else{
                    $paymentInvoice = new PaymentInvoice();
                    $paymentInvoice->revenue_distribution_id = $distribution->id;
                    $paymentInvoice->administration_id
                        = $distribution->revenue->productionProject->administration_id;
                    $paymentInvoice->invoice_number = $newInvoiceNumber;
                    $paymentInvoice->number = 'U' . Carbon::now()->year . '-' . $newInvoiceNumber;
                    $paymentInvoice->status_id = 'sent';
                    $paymentInvoice->save();
                }

                array_push($createdInvoices, $paymentInvoice);
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
                    'project', $project);
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

                $filename = str_replace(' ', '', $project->code) . '_'
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
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'project', $project);
                $htmlBodyWithContactVariables = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);
                $subject = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $subject);
                $htmlBodyWithContactVariables = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $htmlBodyWithContactVariables);

                $primaryMailbox = Mailbox::getDefault();
                if($primaryMailbox)
                {
                    $fromEmail = $primaryMailbox->email;
                    $fromName = $primaryMailbox->name;
                }else{
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

        return ProjectRevenueDistribution::find($distributionIds[0])->revenue->project->administration_id;
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

}