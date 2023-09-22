<?php

namespace App\Helpers\Workflow;

use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Opportunity\Opportunity;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Support\Facades\Mail;

class OpportunityWorkflowHelper
{

    public function __construct(Opportunity $opportunity)
    {
        $this->opportunity = $opportunity;
        $this->opportunity_status = $opportunity->status;
        $this->contact = $opportunity->intake->contact;
        $this->cooperativeName = PortalSettings::get('cooperativeName');

    }

    public function processWorkflowEmail(){
        set_time_limit(0);

        if (!$this->opportunity_status) {
            return false;
        }
        if (!$this->opportunity_status->uses_wf) {
            return false;
        }

        if (!$this->contact) {
            return false;
        }

        $emailTemplate = EmailTemplate::find($this->opportunity_status->email_template_id_wf);
        if (!$emailTemplate) {
            return false;
        }
        if(!$this->contact->primaryEmailAddress)
        {
            return false;
        }

        $mail = Mail::to($this->contact->primaryEmailAddress);
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
        }
        if($this->opportunity) {
            $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'kans', $this->opportunity);
            $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'kans', $this->opportunity);
            if($this->opportunity->intake) {
                $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'intake',
                    $this->opportunity->intake);
                if($this->opportunity->intake->campaign) {
                    $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'campagne',
                        $this->opportunity->intake->campaign);
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