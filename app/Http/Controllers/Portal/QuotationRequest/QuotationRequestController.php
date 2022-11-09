<?php

namespace App\Http\Controllers\Portal\QuotationRequest;

use App\Eco\Cooperation\Cooperation;
use App\Eco\Document\Document;
use App\Eco\Portal\PortalUser;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class QuotationRequestController
{
    public function index()
    {
        $portalUser = Auth::user();

        return response()->json($portalUser->contact->quotationRequests->map(function (QuotationRequest $quotationRequest) {
            return $this->getJson($quotationRequest);
        }));
    }

    public function view(QuotationRequest $quotationRequest)
    {
        $portalUser = Auth::user();

        $this->authorizeQuotationRequest($portalUser, $quotationRequest);

        return response()->json($this->getDetailJson($quotationRequest));
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
            'dateApprovedExternal' => ['nullable', 'date'],
            'dateReleased' => ['nullable', 'date'],
        ]);

        $quotationRequest->date_planned = $request->input('datePlanned') ?: null;
        $quotationRequest->date_recorded = $request->input('dateRecorded') ?: null;
        $quotationRequest->date_approved_external = $request->input('dateApprovedExternal') ?: null;
        $quotationRequest->date_released = $request->input('dateReleased') ?: null;
        $quotationRequest->updated_by_id = $responsibleUserId;

        $sendMail = ($quotationRequest->isDirty('date_planned') && !!$quotationRequest->date_planned);

        $quotationRequest->save();

        if ($sendMail) {
            $this->sendInspectionPlannedMail($quotationRequest);
        }
    }

    public function downloadDocument(QuotationRequest $quotationRequest, Document $document)
    {
        $portalUser = Auth::user();

        $this->authorizeQuotationRequest($portalUser, $quotationRequest);

        $documents = $this->getPortalDocuments($quotationRequest);

        if (!$documents->contains($document)) {
            abort(403, 'Geen toegang tot dit document.');
        }

        if (\Config::get('app.ALFRESCO_COOP_USERNAME') == 'local') {
            return null;
        }

        $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));

        return $alfrescoHelper->downloadFile($document->alfresco_node_id);
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
                        'id' => $quotationRequest->opportunity->intake->address->id,
                        'streetPostalCodeCity' => $quotationRequest->opportunity->intake->address->getStreetPostalCodeCityAttribute(),
                    ],
                ],
                'status' => [
                    'name' => $quotationRequest->opportunity->status->name,
                ]
            ],
            'dateRecorded' => $quotationRequest->date_recorded,
            'dateReleased' => $quotationRequest->date_released,
            'datePlanned' => $quotationRequest->date_planned,
            'dateApprovedExternal' => $quotationRequest->date_approved_external,
            'dateApprovedProjectManager' => $quotationRequest->date_approved_project_manager,
            'dateApprovedClient' => $quotationRequest->date_approved_client,
        ];
    }

    private function getDetailJson(QuotationRequest $quotationRequest)
    {
        $data = $this->getJson($quotationRequest);

        $data['documents'] = $this->getPortalDocuments($quotationRequest)->map(function (Document $document) {
            return [
                'id' => $document->id,
                'filename' => $document->filename,
            ];
        });

        return $data;
    }

    private function getPortalDocuments(QuotationRequest $quotationRequest)
    {
        $documents = $quotationRequest->documents()->where('show_on_portal', true)->get();
        $documents->merge($quotationRequest->opportunity->documents()->where('show_on_portal', true)->get());

        return $documents;
    }

    private function sendInspectionPlannedMail(QuotationRequest $quotationRequest)
    {
        $cooperation = Cooperation::first();
        $emailTemplate = $cooperation->inspectionPlannedEmailTemplate;

        if (!$emailTemplate) {
            return;
        }

        $contact = $quotationRequest->opportunity->intake->contact;

        (new EmailHelper())->setConfigToDefaultMailbox();

        $mail = Mail::to($contact->primaryEmailAddress);


        $subject = $emailTemplate->subject ? $emailTemplate->subject : 'Afspraak schouwen';
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
        if (!$portalUser->contact->quotationRequests->contains($quotationRequest)) {
            abort(403, 'Geen toegang tot deze offerteaanvraag.');
        }
    }
}