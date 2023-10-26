<?php

namespace App\Http\Controllers\Portal\QuotationRequest;

use App\Eco\Cooperation\Cooperation;
use App\Eco\Document\Document;
use App\Eco\Document\DocumentCreatedFrom;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Portal\PortalUser;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Helpers\Alfresco\AlfrescoHelper;
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
        $organisationContact = $portalUser->contact->getOrganisationContact();
        if ($portalUser->contact->isCoach()) {
            $quotationRequestsQuery = $portalUser->contact->quotationRequests();
//        } elseif ($portalUser->contact->isOrganisation()) {
//            $quotationRequestsQuery = $portalUser->contact->quotationRequests();
        } else if ($organisationContact) {
            $quotationRequestsQuery = $organisationContact->quotationRequests();
        } elseif ($portalUser->contact->isExternalParty()) {
            $quotationRequestsQuery = $portalUser->contact->quotationRequestsAsExternalParty();
        } elseif ($portalUser->contact->isProjectManager()) {
            $quotationRequestsQuery = $portalUser->contact->quotationRequestsAsProjectManager();
        } elseif ($portalUser->contact->isOccupant()) {
            $contactId = $portalUser->contact->id;
            $quotationRequestsQuery =  QuotationRequest::whereNotNull('opportunity_action_id')
                ->where( function ($query) use ($contactId) {
                return $query->whereHas('opportunity.intake', function ($query) use ($contactId) {
                    return $query->where('contact_id', $contactId);
                });
            });
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
//            'quotationText' => ['nullable', 'string'],
            'datePlannedAttempt1' => ['nullable', 'date'],
            'datePlannedAttempt2' => ['nullable', 'date'],
            'datePlannedAttempt3' => ['nullable', 'date'],
            'datePlanned' => ['nullable', 'date'],
            'dateRecorded' => ['nullable', 'date'],
            'dateReleased' => ['nullable', 'date'],
            'dateApprovedClient' => ['nullable', 'date'],
            'dateApprovedProjectManager' => ['nullable', 'date'],
            'dateApprovedExternal' => ['nullable', 'date'],
            'opportunityStatusId' => ['integer'],
            'coachOrOrganisationNote' => ['nullable', 'string'],
            'projectmanagerNote' => ['nullable', 'string'],
            'externalpartyNote' => ['nullable', 'string'],
            'clientNote' => ['nullable', 'string'],
            'statusId' => ['integer'],
            'dateUnderReview' => ['nullable', 'date'],
            'dateExecuted' => ['nullable', 'date'],
            'dateUnderReviewDetermination' => ['nullable', 'date'],
            'dateApprovedDetermination' => ['nullable', 'date'],
            'quotationAmount' => ['nullable', 'string'],
            'awardAmount' => ['nullable', 'string'],
            'amountDetermination' => ['nullable', 'string'],
        ]);

//        if($request->input('quotationText')){
//            $quotationRequest->quotation_text = $request->input('quotationText');
//        }
        $quotationRequest->date_planned_attempt1 = $request->input('datePlannedAttempt1') ?: null;
        $quotationRequest->date_planned_attempt2 = $request->input('datePlannedAttempt2') ?: null;
        $quotationRequest->date_planned_attempt3 = $request->input('datePlannedAttempt3') ?: null;
        $quotationRequest->date_planned = $request->input('datePlanned') ?: null;
        $quotationRequest->date_recorded = $request->input('dateRecorded') ?: null;
        $quotationRequest->date_released = $request->input('dateReleased') ?: null;
        $quotationRequest->date_approved_client = $request->input('dateApprovedClient') ?: null;
        $quotationRequest->date_approved_external = $request->input('dateApprovedExternal') ?: null;
        $quotationRequest->date_approved_project_manager = $request->input('dateApprovedProjectManager') ?: null;
        $quotationRequest->updated_by_id = $responsibleUserId;
        $quotationRequest->coach_or_organisation_note = $request->input('coachOrOrganisationNote');
        $quotationRequest->projectmanager_note = $request->input('projectmanagerNote');
        $quotationRequest->externalparty_note = $request->input('externalpartyNote');
        $quotationRequest->client_note = $request->input('clientNote');
        $quotationRequest->status_id = $request->input('statusId');
        $quotationRequest->date_under_review = $request->input('dateUnderReview') ?: null;
        $quotationRequest->date_executed = $request->input('dateExecuted') ?: null;
        $quotationRequest->date_under_review_determination = $request->input('dateUnderReviewDetermination') ?: null;
        $quotationRequest->date_approved_determination = $request->input('dateApprovedDetermination') ?: null;
        $quotationRequest->quotation_amount = $request->input('quotationAmount') ?: 0;
        $quotationRequest->award_amount = $request->input('awardAmount') ?: 0;
        $quotationRequest->amount_determination = $request->input('amountDetermination') ?: 0;

        $sendMailPlanned = ($quotationRequest->isDirty('date_planned') && !!$quotationRequest->date_planned);
        $sendMailRecorded = ($quotationRequest->isDirty('date_recorded') && !!$quotationRequest->date_recorded);
        $sendMailReleased = ($quotationRequest->isDirty('date_released') && !!$quotationRequest->date_released);

        $quotationRequest->save();

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

    public function viewDocumenten(QuotationRequest $quotationRequest)
    {
        $portalUser = Auth::user();

        $this->authorizeQuotationRequest($portalUser, $quotationRequest);

        return response()->json($this->getDocumentenJson($portalUser->id, $quotationRequest));
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
            $filePath = Storage::disk('documents')->path($document->file_path_and_name);
            header('X-Filename:' . $document->filename);
            header('Access-Control-Expose-Headers: X-Filename');
            return response()->download($filePath, $document->filename);
        }

        if (\Config::get('app.ALFRESCO_COOP_USERNAME') == 'local') {
            if ($document->alfresco_node_id == null) {
                $filePath = Storage::disk('documents')
                    ->path($document->filename);
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

            Storage::disk('documents')->path($file_tmp);
        }
    }

    private function getJson(QuotationRequest $quotationRequest)
    {
        return [
            'id' => $quotationRequest->id,
            'hasExternalParty' => ($quotationRequest->external_party_id == null || $quotationRequest->external_party_id == 0) ? false : true,
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
            'contactFullName' => $quotationRequest->opportunity->intake->contact->full_name,
            'streetPostalCodeCity' => $quotationRequest->opportunity->intake->address ? $quotationRequest->opportunity->intake->address->getStreetPostalCodeCityAttribute() : 'onbekend',
//            'statusName' => $quotationRequest->status->name,
            'statusOrder' => $quotationRequest->status->opportunity_action_name . '-' . $quotationRequest->status->order,
            'createdAt' => Carbon::parse($quotationRequest->created_at)->format('Y-m-d H:i:s'),
            'datePlannedAttempt1' => $quotationRequest->date_planned_attempt1 ? $quotationRequest->date_planned_attempt1 : '',
            'datePlannedAttempt2' => $quotationRequest->date_planned_attempt2 ? $quotationRequest->date_planned_attempt2 : '',
            'datePlannedAttempt3' => $quotationRequest->date_planned_attempt3 ? $quotationRequest->date_planned_attempt3 : '',
            'datePlanned' => $quotationRequest->date_planned ? $quotationRequest->date_planned : '',
            'dateRecorded' => $quotationRequest->date_recorded ? $quotationRequest->date_recorded : '',
            'dateReleased' => $quotationRequest->date_released ? $quotationRequest->date_released : '',
            'dateApprovedExternal' => $quotationRequest->date_approved_external ? $quotationRequest->date_approved_external : '',
            'dateApprovedProjectManager' => $quotationRequest->date_approved_project_manager ? $quotationRequest->date_approved_project_manager : '',
            'dateApprovedClient' => $quotationRequest->date_approved_client ? $quotationRequest->date_approved_client : '',
            'dateUnderReview' => $quotationRequest->date_under_review ? $quotationRequest->date_under_review : '',
            'dateExecuted' => $quotationRequest->date_executed ? $quotationRequest->date_executed : '',
            'dateUnderReviewDetermination' => $quotationRequest->date_under_review_determination ? $quotationRequest->date_under_review_determination : '',
            'dateApprovedDetermination' => $quotationRequest->date_approved_determination ? $quotationRequest->date_approved_determination : '',
            'quotationText' => $quotationRequest->quotation_text,
            'coachOrOrganisationNote' => $quotationRequest->coach_or_organisation_note,
            'projectmanagerNote' => $quotationRequest->projectmanager_note,
            'externalpartyNote' => $quotationRequest->externalparty_note,
            'clientNote' => $quotationRequest->client_note,
            'status' => [
                'id' => $quotationRequest->status->id,
                'name' => $quotationRequest->status->name,
                'codeRef' => $quotationRequest->status->code_ref,
            ],
            'quotationAmount' => $quotationRequest->quotation_amount,
            'costAdjustment' => $quotationRequest->cost_adjustment,
            'awardAmount' => $quotationRequest->award_amount,
            'amountDetermination' => $quotationRequest->amount_determination,
        ];
    }

    private function getDetailJson($portalUserId, QuotationRequest $quotationRequest)
    {
        $data = $this->getJson($quotationRequest);

        return $data;
    }

    private function getDocumentenJson($portalUserId, QuotationRequest $quotationRequest)
    {
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
            $mailbox = Mailbox::find($cooperation->inspection_planned_mailbox_id);
        } else {
            $mailbox = Mailbox::getDefault();
        }

        $mail = Mail::fromMailbox($mailbox)
            ->to($contact->primaryEmailAddress);

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
            $mailbox = Mailbox::find($cooperation->inspection_planned_mailbox_id);
        } else {
            $mailbox = Mailbox::getDefault();
        }

        $mail = Mail::fromMailbox($mailbox)
            ->to($contact->primaryEmailAddress);

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
            $mailbox = Mailbox::find($cooperation->inspection_planned_mailbox_id);
        } else {
            $mailbox = Mailbox::getDefault();
        }

        $mail = Mail::fromMailbox($mailbox)
            ->to($contact->primaryEmailAddress);
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
        $organisationContact = $portalUser->contact->getOrganisationContact();
        if ($portalUser->contact->isCoach()) {
            $quotationRequests = $portalUser->contact->quotationRequests;
//        } elseif ($portalUser->contact->isOrganisation()) {
//            $quotationRequests = $portalUser->contact->quotationRequests;
        } else if ($organisationContact) {
            $quotationRequests = $organisationContact->quotationRequests;
        } else if ($portalUser->contact->isExternalParty()) {
            $quotationRequests = $portalUser->contact->quotationRequestsAsExternalParty;
        } elseif ($portalUser->contact->isProjectManager()) {
            $quotationRequests = $portalUser->contact->quotationRequestsAsProjectManager;
        } elseif ($portalUser->contact->isOccupant()) {
            $contactId = $portalUser->contact->id;
            $quotationRequests =  QuotationRequest::whereNotNull('opportunity_action_id')
                ->where( function ($query) use ($contactId) {
                    return $query->whereHas('opportunity.intake', function ($query) use ($contactId) {
                        return $query->where('contact_id', $contactId);
                    });
                })->get();
        }

        if (!$quotationRequests || !$quotationRequests->contains($quotationRequest)) {
            abort(403, 'Geen toegang tot deze offerteaanvraag.');
        }
    }
}