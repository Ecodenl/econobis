<?php

namespace App\Http\Controllers\Api\Project;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Document\DocumentCreatedFrom;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\Email\Email;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Occupation\OccupationContact;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\RevenuesKwh\RevenueDistributionKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Helpers\CSV\RevenueDistributionKwhCSVHelper;
use App\Helpers\Delete\Models\DeleteRevenueDistributionKwh;
use App\Helpers\Delete\Models\DeleteRevenuesKwh;
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
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

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

        $revenuesKwh = new RevenueDistributionKwhCSVHelper($revenuesKwh);

        return $revenuesKwh->downloadCSV();
    }

    public function getRevenueDistribution(RevenuesKwh $revenuesKwh, Request $request)
    {
//        todo origineel 100: voor testen op 10
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
            ->date('datePayout')->validate('nullable|date')->onEmpty(null)->alias('date_payout')->next()
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

        $oldDateBegin = $revenuesKwh->date_begin;
        $oldDateEnd = $revenuesKwh->date_end;
        $oldPayoutKwh = $revenuesKwh->payout_kwh;

        $data = $requestInput
            ->string('distributionTypeId')->onEmpty(null)->alias('distribution_type_id')->next()
            ->boolean('confirmed')->next()
            ->string('status')->whenMissing('concept')->onEmpty('concept')->next()
            ->date('dateBegin')->validate('nullable|date')->alias('date_begin')->next()
            ->date('dateEnd')->validate('nullable|date')->alias('date_end')->next()
            ->date('dateConfirmed')->validate('nullable|date')->onEmpty(null)->alias('date_confirmed')->next()
            ->date('datePayout')->validate('nullable|date')->onEmpty(null)->alias('date_payout')->next()
            ->double('payoutKwh')->alias('payout_kwh')->onEmpty(null)->whenMissing(null)->next()
            ->get();

        $revenuesKwh->fill($data);

        $recalculateDistribution = false;
        if(!$revenuesKwh->confirmed &&
            (
                Carbon::parse($revenuesKwh->date_begin) != Carbon::parse($oldDateBegin) ||
                Carbon::parse($revenuesKwh->date_end) != Carbon::parse($oldDateEnd) ||
                floatval($revenuesKwh->payout_kwh) != floatval($oldPayoutKwh)
            )
        ) {
            $recalculateDistribution = true;
        }
        $revenuesKwh->save();

        if(floatval($revenuesKwh->payout_kwh) != floatval($oldPayoutKwh)) {
            // Alle parts met status new of concept ook definitief maken (confirmed)
            foreach ($revenuesKwh->newOrConceptPartsKwh as $newOrConceptPartsKwh) {
                $newOrConceptPartsKwh->payout_kwh = $revenuesKwh->payout_kwh;
                $newOrConceptPartsKwh->save();
            }
        }

        if($recalculateDistribution){
            if(Carbon::parse($revenuesKwh->date_end)->format('Y-m-d') > Carbon::parse($oldDateEnd)->format('Y-m-d')) {
                $revenuesKwhHelper = new RevenuesKwhHelper();
                $revenuesKwhHelper->createNewLastRevenuePartsKwh($revenuesKwh);
            }
            $this->saveParticipantsOfDistribution($revenuesKwh);

        }

        return FullRevenuesKwh::make(RevenuesKwh::find($revenuesKwh->id));
    }

    public function recalculateRevenuesDistribution(RevenuesKwh $revenuesKwh)
    {
        $this->saveParticipantsOfDistribution($revenuesKwh);
    }

    //todo WM: dit naar job verplaatsen ?!
    protected function saveParticipantsOfDistribution(RevenuesKwh $revenuesKwh)
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
        $distributionKwhIsNew = false;
        if(RevenueDistributionKwh::where('revenue_id', $revenuesKwh->id)->where('participation_id', $participant->id)->exists()) {
            $distributionKwh = RevenueDistributionKwh::where('revenue_id', $revenuesKwh->id)->where('participation_id', $participant->id)->first();
        } else {
            $distributionKwh = new RevenueDistributionKwh();
            $distributionKwh->revenue_id = $revenuesKwh->id;
            $distributionKwh->participation_id = $participant->id;
            $distributionKwh->contact_id = $contact->id;
            $distributionKwhIsNew = true;
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

        list($quantityOfParticipationsAtStart, $quantityOfParticipations, $hasMutationQuantity) = $this->determineParticipationsQuantity($distributionKwh);
        if ($quantityOfParticipationsAtStart != 0 || $hasMutationQuantity) {
            // Indien $quantityOfParticipationsAtStart niet 0 is of er zijn geen mutaties
            $distributionKwh->participations_quantity_at_start = $quantityOfParticipationsAtStart;
            $distributionKwh->participations_quantity = $quantityOfParticipations;
            $distributionKwh->save();
            // Indien distribution Nieuw toegevoegd, dan voor alle parts (behalve met status new) alvast distribution parts en values toeveogen met delivered 0.
            if ($distributionKwhIsNew) {
                $revenuesKwhHelper = new RevenuesKwhHelper();
                foreach ($distributionKwh->revenuesKwh->partsKwh()->whereNotIn('status', ['new', 'in-progress-update', 'in-progress-process', 'in-progress-report'])->orderBy('date_begin')->get() as $partsKwh){
                    $revenuesKwhHelper->saveNewDistributionPartsKwh($partsKwh, $distributionKwh);
                }
            }
        } else {
            // Indien $quantityOfParticipationsAtStart 0 is en er zijn geen mutaties
            if (!$distributionKwhIsNew) {
                // Indien distribution niet nieuw
                $revenuePartsKwhHasConfirmed = $revenuesKwh->partsKwh()->where('confirmed', true)->exists();
                // en er is ook nog geen deelperiode bevestigd, dan verwijderen distributionKwh
                if (!$revenuePartsKwhHasConfirmed) {
                    $deleteRevenueDistributionKwh = new DeleteRevenueDistributionKwh($distributionKwh);
                    $deleteRevenueDistributionKwh->delete();
                }
            }
        }
    }

    /**
     * @param RevenueDistributionKwh $distributionKwh
     * @return int[]
     */
    protected function determineParticipationsQuantity(RevenueDistributionKwh $distributionKwh): array
    {
        $quantityOfParticipationsAtStart = 0;
        $quantityOfParticipations = 0;
        $dateBeginFromRegister = Carbon::parse($distributionKwh->participation->date_register)->format('Y-m-d');
        $dateTerminatedParticipation = Carbon::parse($distributionKwh->participation->date_terminated)->format('Y-m-d');
        $dateBeginRevenuesKwh = Carbon::parse($distributionKwh->revenuesKwh->date_begin)->format('Y-m-d');
        $dateEndRevenuesKwh = Carbon::parse($distributionKwh->revenuesKwh->date_end)->format('Y-m-d');
        $mutations = $distributionKwh->participation->mutationsDefinitiveForKwhPeriod;

        $hasMutationQuantity = false;

        if($distributionKwh->participation->date_terminated &&  $dateTerminatedParticipation < $dateBeginRevenuesKwh) {
            return array($quantityOfParticipationsAtStart, $quantityOfParticipations, $hasMutationQuantity);
        }

        foreach ($mutations as $mutation) {
            if ($mutation->date_entry >= $dateBeginFromRegister && $mutation->date_entry < $dateBeginRevenuesKwh) {
                $quantityOfParticipationsAtStart += $mutation->quantity;
            }
            if ($mutation->date_entry >= $dateBeginFromRegister && $mutation->date_entry <= $dateEndRevenuesKwh) {
                $quantityOfParticipations += $mutation->quantity;
            }
            if ($mutation->date_entry >= $dateBeginRevenuesKwh && $mutation->date_entry <= $dateEndRevenuesKwh) {
                if($mutation->quantity != 0){
                    $hasMutationQuantity = true;
                }
            }
        }
        return array($quantityOfParticipationsAtStart, $quantityOfParticipations, $hasMutationQuantity);
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

        $documentCreatedFromProjectId = DocumentCreatedFrom::where('code_ref', 'project')->first()->id;

        $document = new Document();
        $document->document_created_from_id = $documentCreatedFromProjectId;
        $document->document_type = 'internal';
        $document->document_group = 'revenue';
        $document->project_id = $project->id;

        $document->filename = $documentName . '.pdf';

        $document->save();

        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'documents/'
            . $document->filename));
        file_put_contents($filePath, $pdf);

        if(\Config::get('app.ALFRESCO_COOP_USERNAME') != 'local') {
            $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));

            $alfrescoResponse = $alfrescoHelper->createFile($filePath,
                $document->filename, $document->getDocumentGroup()->name);

            $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
        }else{
            $document->alfresco_node_id = null;
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
        } else {
            $revenueHtml = '<h1>Kon geen document opstellen: adres niet compleet</h1>';

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
        $showOnPortal = $request->input('showOnPortal');

        $distributionKwh = RevenueDistributionKwh::find($distributionKwhIds[0]);
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

        foreach($distributionKwhIds as $distributionKwhId) {
            CreateRevenuesKwhReport::dispatch($distributionKwhId, $subject, $documentTemplateId, $emailTemplateId, $showOnPortal, Auth::id(), $emailModel);
        }

        return null;
    }

    public function createParticipantRevenueReport($subject, $distributionKwhId, DocumentTemplate $documentTemplate, EmailTemplate $emailTemplate, $showOnPortal)
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
        } else {
            // Geen fouten bijwerken datum rapportage
            $distributionKwh->date_participant_report = Carbon::today();
            $distributionKwh->begin_date_participant_report = $distributionKwh->revenuesKwh->date_begin;
            $distributionKwh->end_date_participant_report = $distributionKwh->date_end_last_confirmed_parts_kwh;
            $distributionKwh->save();
            return null;
        }
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

    protected function translateToValidCharacterSet($field){

//        $field = strtr(utf8_decode($field), utf8_decode('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ'), 'AAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy');
        $field = strtr(mb_convert_encoding($field, 'UTF-8', mb_list_encodings()), mb_convert_encoding('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ', 'UTF-8', mb_list_encodings()), 'AAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy');
//        $field = iconv('UTF-8', 'ASCII//TRANSLIT', $field);
        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);

        return $field;
    }

}