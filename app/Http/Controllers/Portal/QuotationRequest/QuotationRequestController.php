<?php

namespace App\Http\Controllers\Portal\QuotationRequest;

use App\Eco\Contact\Contact;
use App\Eco\Cooperation\Cooperation;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class QuotationRequestController
{
    public function getByContact(Contact $contact)
    {
        return response()->json($contact->quotationRequests->map(function(QuotationRequest $quotationRequest){
            return $this->getJson($quotationRequest);
        }));
    }

    public function view(QuotationRequest $quotationRequest)
    {
        return response()->json($this->getJson($quotationRequest));
    }

    public function update(Request $request, QuotationRequest $quotationRequest)
    {
        $request->validate([
            'datePlanned' => ['nullable', 'date'],
            'dateRecorded' => ['nullable', 'date'],
            'dateApprovedExternal' => ['nullable', 'date'],
            'dateReleased' => ['nullable', 'date'],
            'approvedProjectManager' => ['boolean'],
            'approvedClient' => ['boolean'],
        ]);

        $quotationRequest->date_planned = $request->input('datePlanned');
        $quotationRequest->date_recorded = $request->input('dateRecorded');
        $quotationRequest->date_approved_external = $request->input('dateApprovedExternal');
        $quotationRequest->date_released = $request->input('dateReleased');
        $quotationRequest->approved_project_manager = $request->input('approvedProjectManager');
        $quotationRequest->approved_client = $request->input('approvedClient');

        $sendMail = ($quotationRequest->isDirty('date_planned') && !!$quotationRequest->date_planned);

        $quotationRequest->save();

        if($sendMail){
            \Log::info('Sending mail'); // Todo
//            $this->sendMail($quotationRequest);
        }
    }

    private function getJson(QuotationRequest $quotationRequest)
    {
        return [
            'id' => $quotationRequest->id,
            'opportunity' => [
                'intake' => [
                    'contact' => [
                        'id' => $quotationRequest->opportunity->intake->contact->id,
                        'fullName' => $quotationRequest->opportunity->intake->contact->full_name,
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
            'approvedProjectManager' => $quotationRequest->approved_project_manager,
            'approvedClient' => $quotationRequest->approved_client,
        ];
    }

    private function sendMail(QuotationRequest $quotationRequest)
    {
        $cooperation = Cooperation::first();
        $emailTemplate = EmailTemplate::find($cooperation->inspectionPlannedEmailTemplate);

        if(!$emailTemplate) {
            return;
        }

        $contact = $quotationRequest->opportunity->intake->contact;

        (new EmailHelper())->setConfigToDefaultMailbox();

        $mail = Mail::to($contact->primaryEmailAddress);


        $subject = $emailTemplate->subject ? $emailTemplate->subject : 'Afspraak schouwen';
        $htmlBody = $emailTemplate->html_body;

        $subject = str_replace('{cooperatie_naam}', $cooperation->name, $subject);
        $subject = str_replace('{contactpersoon}', $contact->full_name, $subject);
        $subject = TemplateVariableHelper::replaceTemplateVariables($subject,'contact', $contact);

        $htmlBody = str_replace('{cooperatie_naam}', $cooperation->name, $htmlBody);
        $htmlBody = str_replace('{contactpersoon}', $contact->full_name, $htmlBody);
        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody,'contact', $contact);

        $htmlBody = TemplateVariableHelper::stripRemainingVariableTags($htmlBody);

        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
            . $subject . '</title></head>'
            . $htmlBody . '</html>';


        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}