<?php

namespace App\Http\Controllers\Portal\QuotationRequest;

use App\Eco\Cooperation\Cooperation;
use App\Eco\Document\Document;
use App\Eco\Document\DocumentCreatedFrom;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Portal\PortalUser;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class QuotationRequestController
{
    public function index(Request $request)
    {
        $portalUser = Auth::user();

        $quotationRequestsQuery = null;
        if ($portalUser->contact->isExternalParty()) {
            $quotationRequestsQuery = $portalUser->contact->quotationRequestsAsExternalParty();
        } elseif ($portalUser->contact->isProjectManager()) {
            $quotationRequestsQuery = $portalUser->contact->quotationRequestsAsProjectManager();
        } elseif ($portalUser->contact->isCoach()) {
            $quotationRequestsQuery = $portalUser->contact->quotationRequests();
        } elseif ($portalUser->contact->isOrganisation()) {
            $quotationRequestsQuery = $portalUser->contact->quotationRequests();
        } else {
            $organisationContact = $portalUser->contact->getOrganisationContact();
            if ($organisationContact) {
                $quotationRequestsQuery = $organisationContact->quotationRequests();
            }
        }
        if(!$quotationRequestsQuery){
            return;
        }

        /**
         * Optioneel filteren op campagne
         */
        $campaignId = $request->input('campaignId');
        $quotationRequests = $quotationRequestsQuery->when($campaignId, function ($query) use ($campaignId) {
            return $query->whereHas('opportunity.intake', function ($query) use ($campaignId) {
                return $query->where('campaign_id', $campaignId);
            });
        })->get();

        return response()->json($quotationRequests->sortByDesc('date_planned')->map(function (QuotationRequest $quotationRequest) {
            return $this->getJson($quotationRequest);
        })->values());
    }

    public function view(QuotationRequest $quotationRequest)
    {
        $portalUser = Auth::user();

        $this->authorizeQuotationRequest($portalUser, $quotationRequest);

        return response()->json($this->getDetailJson($portalUser->id, $quotationRequest));
    }

    public function update(Request $request, QuotationRequest $quotationRequest)
    {
        $portalUser = Auth::user();

        $this->authorizeQuotationRequest($portalUser, $quotationRequest);

        $responsibleUserId = PortalSettings::get('responsibleUserId');
        if (!$responsibleUserId) {
            abort(501, 'Er is helaas een fout opgetreden (onbekende klanten portaal verantwoordelijke).');
        }

        $request->validate([
            'datePlanned' => ['nullable', 'date'],
            'dateRecorded' => ['nullable', 'date'],
            'dateReleased' => ['nullable', 'date'],
            'dateApprovedProjectManager' => ['nullable', 'date'],
            'dateApprovedExternal' => ['nullable', 'date'],
            'opportunityStatusId' => ['integer'],
            'coachOrOrganisationNote' => ['nullable', 'string'],
            'externalpartyNote' => ['nullable', 'string'],
            'statusId' => ['integer'],
            'dateUnderReview' => ['nullable', 'date'],
            'dateExecuted' => ['nullable', 'date'],
            'quotationText' => ['nullable', 'string'],
            'quotationAmount' => ['nullable', 'string'],
        ]);

        $quotationRequest->date_planned = $request->input('datePlanned') ?: null;
        $quotationRequest->date_recorded = $request->input('dateRecorded') ?: null;
        $quotationRequest->date_released = $request->input('dateReleased') ?: null;
        $quotationRequest->date_approved_external = $request->input('dateApprovedExternal') ?: null;
        $quotationRequest->date_approved_project_manager = $request->input('dateApprovedProjectManager') ?: null;
        $quotationRequest->updated_by_id = $responsibleUserId;
        $quotationRequest->quotation_text = $request->input('quotationText');
        $quotationRequest->coach_or_organisation_note = $request->input('coachOrOrganisationNote');
        $quotationRequest->externalparty_note = $request->input('externalpartyNote');
        $quotationRequest->status_id = $request->input('statusId');
        $quotationRequest->date_under_review = $request->input('dateUnderReview') ?: null;
        $quotationRequest->date_executed = $request->input('dateExecuted') ?: null;
        $quotationRequest->quotation_amount = $request->input('quotationAmount') ?: 0;

        $sendMailPlanned = ($quotationRequest->isDirty('date_planned') && !!$quotationRequest->date_planned);
        $sendMailRecorded = ($quotationRequest->isDirty('date_recorded') && !!$quotationRequest->date_recorded);
        $sendMailReleased = ($quotationRequest->isDirty('date_released') && !!$quotationRequest->date_released);

        $quotationRequest->save();

        $opportunity = $quotationRequest->opportunity;
        $opportunity->status_id = $request->input('opportunityStatusId');
        $opportunity->save();

        if ($sendMailPlanned) {
            $this->sendInspectionPlannedMail($quotationRequest);
        }
        if ($sendMailRecorded) {
            $this->sendInspectionRecordedMail($quotationRequest);
        }
        if ($sendMailReleased) {
            $this->sendInspectionReleasedMail($quotationRequest);
        }
    }

    public function uploads(Request $request, QuotationRequest $quotationRequest)
    {
        $portalUser = Auth::user();

        $this->authorizeQuotationRequest($portalUser, $quotationRequest);

        $responsibleUserId = PortalSettings::get('responsibleUserId');
        if (!$responsibleUserId) {
            abort(501, 'Er is helaas een fout opgetreden (onbekende klanten portaal verantwoordelijke).');
        }

        //get uploads
        $uploads = $request->file('uploads')
            ? $request->file('uploads') : [];

        $this->storeQuotationRequestUploads($quotationRequest, $uploads, $portalUser);

    }
    public function downloadDocument(QuotationRequest $quotationRequest, Document $document)
    {
        $portalUser = Auth::user();

        $this->authorizeQuotationRequest($portalUser, $quotationRequest);

        $documents = $this->getPortalDocuments($quotationRequest);

        if (!$documents->contains($document)) {
            abort(403, 'Geen toegang tot dit document.');
        }

        // indien document niet in alfresco maar document was gemaakt in a storage map (file_path_and_name ingevuld), dan halen we deze op uit die storage map.
        if ($document->alfresco_node_id == null && $document->file_path_and_name != null) {
            $filePath = Storage::disk('documents')->getDriver()
                ->getAdapter()->applyPathPrefix($document->file_path_and_name);
            header('X-Filename:' . $document->filename);
            header('Access-Control-Expose-Headers: X-Filename');
            return response()->download($filePath, $document->filename);
        }

        if (\Config::get('app.ALFRESCO_COOP_USERNAME') == 'local') {
            if ($document->alfresco_node_id == null) {
                $filePath = Storage::disk('documents')->getDriver()
                    ->getAdapter()->applyPathPrefix($document->filename);
                header('X-Filename:' . $document->filename);
                header('Access-Control-Expose-Headers: X-Filename');
                return response()->download($filePath, $document->filename);
            } else {
                return null;
            }
        }

        // hier verwachten we alleen nog documenten opgslagen in Alfresco. Indien geen alfresco_node_id bekend, dan valt er ook niets op te halen.
        if ($document->alfresco_node_id == null) {
            return null;
        }

        $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));
        return $alfrescoHelper->downloadFile($document->alfresco_node_id);
    }

    public function deleteDocument(QuotationRequest $quotationRequest, Document $document)
    {
        $portalUser = Auth::user();

        $this->authorizeQuotationRequest($portalUser, $quotationRequest);

        if ($document->created_by_portal_user_id != $portalUser->id) {
            abort(403, 'Niet bevoegd om dit document te verwijderen.');
        }

        // indien document niet in alfresco maar document was gemaakt in a storage map (file_path_and_name ingevuld), dan ook verwijderen in die storage map.
        if ($document->alfresco_node_id == null && $document->file_path_and_name != null) {
            Storage::disk('documents')->delete($document->file_path_and_name);
        } else {
            //delete file in Alfresco(to trashbin)
//            $user = Auth::user();
            if(\Config::get('app.ALFRESCO_COOP_USERNAME') != 'local' && $document->alfresco_node_id) {
                $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));
                $alfrescoHelper->deleteFile($document->alfresco_node_id);
            }
        }

        $document->delete();
    }

    private function storeQuotationRequestUploads($quotationRequest, $uploads, $portalUser){

        $documentCreatedFromId = DocumentCreatedFrom::where('code_ref', 'quotationrequest')->first()->id;

        $documentDescription = 'Upload document door ' . ($portalUser->contact ? $portalUser->contact->full_name_fnf : 'onbekend');

        //store uploads
        foreach ($uploads as $file) {
            if(!$file->isValid()) abort('422', 'Error uploading file');

            $document = new Document();
            $document->fill(
                [
                    'filename' => $file->getClientOriginalName(),
                    'description' => strlen($documentDescription)>191 ? substr($documentDescription, 0, 188) . '...' : $documentDescription,
                    'document_type' => 'upload',
                    'document_group' => 'general',
                    'contact_id' => $quotationRequest->opportunity->intake->contact_id,
                    'opportunity_id' => $quotationRequest->opportunity_id,
                    'document_created_from_id' => $documentCreatedFromId,
                    'intake_id' => $quotationRequest->opportunity->intake_id,
                    'campaign_id' => $quotationRequest->opportunity->intake->campaign_id,
                    'quotation_request_id' => $quotationRequest->id,
                    'show_on_portal' => true,
                ]
            );
            $document->save();

            $filepath = 'portal_uploads' . DIRECTORY_SEPARATOR . (Carbon::parse($document->created_at)->year);
            $file_tmp = $file->store($filepath, 'documents');

            $document->file_path_and_name = $file_tmp;
            $document->save();

            Storage::disk('documents')->getDriver()->getAdapter()->applyPathPrefix($file_tmp);
        }
    }

    private function getJson(QuotationRequest $quotationRequest)
    {
        return [
            'id' => $quotationRequest->id,
            'opportunityAction' => [
                'id' => $quotationRequest->opportunityAction->id,
                'name' => $quotationRequest->opportunityAction->name,
                'codeRef' => $quotationRequest->opportunityAction->code_ref,
            ],
            'opportunity' => [
                'intake' => [
                    'contact' => [
                        'id' => $quotationRequest->opportunity->intake->contact->id,
                        'fullName' => $quotationRequest->opportunity->intake->contact->full_name,
                        'primaryphoneNumber' => optional($quotationRequest->opportunity->intake->contact->primaryphoneNumber)->number,
                        'primaryEmailAddress' => optional($quotationRequest->opportunity->intake->contact->primaryEmailAddress)->email,
                    ],
                    'address' => [
                        'id' => optional($quotationRequest->opportunity->intake->address)->id,
                        'streetPostalCodeCity' => $quotationRequest->opportunity->intake->address ? $quotationRequest->opportunity->intake->address->getStreetPostalCodeCityAttribute() : 'onbekend',
                    ],
                ],
                'status' => [
                    'id' => $quotationRequest->opportunity->status->id,
                    'name' => $quotationRequest->opportunity->status->name,
                ]
            ],
            'createdAt' => Carbon::parse($quotationRequest->created_at)->format('Y-m-d H:i:s'),
            'dateRecorded' => $quotationRequest->date_recorded,
            'dateReleased' => $quotationRequest->date_released,
            'datePlanned' => $quotationRequest->date_planned,
            'dateApprovedExternal' => $quotationRequest->date_approved_external,
            'dateApprovedProjectManager' => $quotationRequest->date_approved_project_manager,
            'dateApprovedClient' => $quotationRequest->date_approved_client,
            'quotationText' => $quotationRequest->quotation_text,
            'coachOrOrganisationNote' => $quotationRequest->coach_or_organisation_note,
            'externalpartyNote' => $quotationRequest->externalparty_note,
            'status' => [
                'id' => $quotationRequest->status->id,
                'name' => $quotationRequest->status->name,
                'codeRef' => $quotationRequest->status->code_ref,
            ],
            'dateUnderReview' => $quotationRequest->date_under_review,
            'dateExecuted' => $quotationRequest->date_executed,
            'quotationAmount' => $quotationRequest->quotation_amount,
        ];
    }

    private function getDetailJson($portalUserId, QuotationRequest $quotationRequest)
    {
        $data = $this->getJson($quotationRequest);

        $data['documents'] = $this->getPortalDocuments($quotationRequest)->map(function (Document $document) use ($portalUserId){
            return [
                'id' => $document->id,
                'filename' => $document->filename,
                'description' => $document->description,
                'allowDelete' => $document->created_by_portal_user_id == $portalUserId,
            ];
        });

        return $data;
    }

    private function getPortalDocuments(QuotationRequest $quotationRequest)
    {
        $documents = $quotationRequest->documents()->where('show_on_portal', true)->get();
        $documents = $documents->merge($quotationRequest->opportunity->documents()->where('show_on_portal', true)->get());

        return $documents;
    }

    private function sendInspectionPlannedMail(QuotationRequest $quotationRequest)
    {
        $cooperation = Cooperation::first();
        if (!$cooperation) {
            return;
        }

        $emailTemplate = $cooperation->inspectionPlannedEmailTemplate;
        if (!$emailTemplate) {
            return;
        }

        $contact = $quotationRequest->opportunity->intake->contact;
        if (!$contact->primaryEmailAddress) {
            return;
        }

        if ($cooperation->inspection_planned_mailbox_id) {
            $inspectionPlannedMailbox = Mailbox::find($cooperation->inspection_planned_mailbox_id);
            (new EmailHelper())->setConfigToMailbox($inspectionPlannedMailbox);
        } else {
            (new EmailHelper())->setConfigToDefaultMailbox();
        }

        $mail = Mail::to($contact->primaryEmailAddress);

        $subject = $emailTemplate->subject ? $emailTemplate->subject : 'Afspraak schouwen';
        $this->sendInspectionMailToContact($emailTemplate, $cooperation, $subject, $contact, $quotationRequest, $mail);
    }

    private function sendInspectionRecordedMail(QuotationRequest $quotationRequest)
    {
        $cooperation = Cooperation::first();
        if (!$cooperation) {
            return;
        }

        $emailTemplate = $cooperation->inspectionRecordedEmailTemplate;
        if (!$emailTemplate) {
            return;
        }

        $contact = $quotationRequest->opportunity->intake->contact;
        if (!$contact->primaryEmailAddress) {
            return;
        }

        if ($cooperation->inspection_planned_mailbox_id) {
            $inspectionPlannedMailbox = Mailbox::find($cooperation->inspection_planned_mailbox_id);
            (new EmailHelper())->setConfigToMailbox($inspectionPlannedMailbox);
        } else {
            (new EmailHelper())->setConfigToDefaultMailbox();
        }

        $mail = Mail::to($contact->primaryEmailAddress);

        $subject = $emailTemplate->subject ? $emailTemplate->subject : 'Opname schouwen';
        $this->sendInspectionMailToContact($emailTemplate, $cooperation, $subject, $contact, $quotationRequest, $mail);
    }

    private function sendInspectionReleasedMail(QuotationRequest $quotationRequest)
    {
        $cooperation = Cooperation::first();
        if (!$cooperation) {
            return;
        }

        $emailTemplate = $cooperation->inspectionReleasedEmailTemplate;
        if (!$emailTemplate) {
            return;
        }

        $contact = $quotationRequest->opportunity->intake->contact;
        if (!$contact->primaryEmailAddress) {
            return;
        }

        if ($cooperation->inspection_planned_mailbox_id) {
            $inspectionPlannedMailbox = Mailbox::find($cooperation->inspection_planned_mailbox_id);
            (new EmailHelper())->setConfigToMailbox($inspectionPlannedMailbox);
        } else {
            (new EmailHelper())->setConfigToDefaultMailbox();
        }

        $mail = Mail::to($contact->primaryEmailAddress);
        $subject = $emailTemplate->subject ? $emailTemplate->subject : 'Opname schouwen';

        $this->sendInspectionMailToContact($emailTemplate, $cooperation, $subject, $contact, $quotationRequest, $mail);
    }

    /**
     * @param $emailTemplate
     * @param $cooperation
     * @param string $subject
     * @param $contact
     * @param QuotationRequest $quotationRequest
     * @param \Illuminate\Mail\PendingMail $mail
     */
    private function sendInspectionMailToContact($emailTemplate, $cooperation, string $subject, $contact, QuotationRequest $quotationRequest, \Illuminate\Mail\PendingMail $mail): void
    {
        $htmlBody = $emailTemplate->html_body;

        $subject = str_replace('{cooperatie_naam}', $cooperation->name, $subject);
        $subject = str_replace('{contactpersoon}', $contact->full_name, $subject);
        $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'contact', $contact);

        $htmlBody = str_replace('{cooperatie_naam}', $cooperation->name, $htmlBody);
        $htmlBody = str_replace('{contactpersoon}', $contact->full_name, $htmlBody);
        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'contact', $contact);
        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'offerteverzoek', $quotationRequest);
        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'kans', $quotationRequest->opportunity);

        $htmlBody = TemplateVariableHelper::stripRemainingVariableTags($htmlBody);

        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
            . $subject . '</title></head>'
            . $htmlBody . '</html>';


        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody, $emailTemplate->default_attachment_document_id));
    }

    private function authorizeQuotationRequest(PortalUser $portalUser, QuotationRequest $quotationRequest)
    {
        $quotationRequests = null;
        if ($portalUser->contact->isExternalParty()) {
            $quotationRequests = $portalUser->contact->quotationRequestsAsExternalParty;
        } elseif ($portalUser->contact->isProjectManager()) {
            $quotationRequests = $portalUser->contact->quotationRequestsAsProjectManager;
        } elseif ($portalUser->contact->isCoach()) {
            $quotationRequests = $portalUser->contact->quotationRequests;
        } elseif ($portalUser->contact->isOrganisation()) {
            $quotationRequests = $portalUser->contact->quotationRequests;
        } else {
            $organisationContact = $portalUser->contact->getOrganisationContact();
            if ($organisationContact) {
                $quotationRequests = $organisationContact->quotationRequests;
            }
        }

        if (!$quotationRequests || !$quotationRequests->contains($quotationRequest)) {
            abort(403, 'Geen toegang tot deze offerteaanvraag.');
        }
    }
}