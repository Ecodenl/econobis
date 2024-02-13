<?php

namespace App\Helpers\Workflow;

use App\Eco\Campaign\CampaignWorkflow;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Mailbox\Mailbox;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Support\Facades\Mail;

class QuotationRequestWorkflowHelper
{

    public function __construct(QuotationRequest $quotationRequest)
    {
        $this->quotationRequest = $quotationRequest;
        $this->quotationRequest_status = $quotationRequest->status;
        $this->contact = $quotationRequest->opportunity->intake->contact;
        $this->cooperativeName = PortalSettings::get('cooperativeName');

    }

    public function processWorkflowEmail(CampaignWorkflow $campaignWorkflow){
        set_time_limit(0);

        if (!$this->quotationRequest_status) {
            return false;
        }
        if (!$this->quotationRequest_status->uses_wf) {
            return false;
        }

        if (!$this->contact) {
            return false;
        }

        if (!$campaignWorkflow->is_active) {
            return false;
        }

        $emailTemplate = EmailTemplate::find($campaignWorkflow->email_template_id_wf);
        if (!$emailTemplate) {
            return false;
        }
        if(!$this->contact->primaryEmailAddress)
        {
            return false;
        }

        $campaign = $this->quotationRequest->opportunity->intake->campaign;
        if ($campaign->default_workflow_mailbox_id) {
            $mailbox = Mailbox::find($campaign->default_workflow_mailbox_id);
            if (!$mailbox) {
                $mailbox = Mailbox::getDefault();
            }
        } else {
            $mailbox = Mailbox::getDefault();
        }

        $mail = Mail::fromMailbox($mailbox)
            ->to($this->contact->primaryEmailAddress);
        if ($this->quotationRequest->organisationOrCoach && $this->quotationRequest->organisationOrCoach->primaryEmailAddress && $campaignWorkflow->mail_cc_to_coach_wf) {
            $mail->cc($this->quotationRequest->organisationOrCoach->primaryEmailAddress);
        }

        $this->mailWorkflow($emailTemplate, $mail);
        return true;
    }

    public function mailWorkflow($emailTemplate, $mail)
    {
//        $subject = $emailTemplate->subject ? $emailTemplate->subject : 'Bericht van Econobis';
        $subject = $emailTemplate->subject ? $emailTemplate->subject : 'Bericht van ' . $this->cooperativeName;
        $htmlBody = $emailTemplate->html_body;

        $subject = str_replace('{cooperatie_naam}', $this->cooperativeName, $subject);
        if($this->contact) {
            $subject = str_replace('{contactpersoon}', $this->contact->full_name, $subject);
            $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'contact', $this->contact);
            $htmlBody = str_replace('{contactpersoon}', $this->contact->full_name, $htmlBody);
            $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'contact', $this->contact);
            if($this->quotationRequest) {
                $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'offerteverzoek', $this->quotationRequest);
                $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'offerteverzoek', $this->quotationRequest);
                $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'kansactie', $this->quotationRequest);
                $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'kansactie', $this->quotationRequest);
                if($this->quotationRequest->opportunity) {
                    $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'kans', $this->quotationRequest->opportunity);
                }
            }
        }

//todo toevoegen custom-portal branch
//        $htmlBody = TemplateVariableHelper::replaceTemplateCooperativeVariables($htmlBody,'cooperatie' );

        $htmlBody = TemplateVariableHelper::stripRemainingVariableTags($htmlBody);

        $htmlBody
            = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
            . $subject . '</title></head>'
            . $htmlBody . '</html>';


        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody, $emailTemplate->default_attachment_document_id));
    }

}