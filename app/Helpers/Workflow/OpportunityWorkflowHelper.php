<?php

namespace App\Helpers\Workflow;

use App\Eco\Campaign\CampaignWorkflow;
use App\Eco\Email\Email;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Opportunity\Opportunity;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
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

    public function processWorkflowEmail(CampaignWorkflow $campaignWorkflow){
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

        $campaign = $this->opportunity->intake->campaign;
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
        $this->mailWorkflow($emailTemplate, $mail, $mailbox);
        return true;
    }

    public function mailWorkflow($emailTemplate, $mail, $mailbox)
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

        //save the mail to send
        if($this->contact && $this->contact->primaryEmailAddress) {
            $email = new Email();
            $email->mailbox_id = $mailbox->id;
            $email->from = $mailbox->email;
            $email->to = [$this->contact->primaryEmailAddress->email];
            $email->cc = [];
            $email->bcc = [];
            $email->subject = $subject;
            $email->subject_for_filter = trim(mb_substr($email->subject ?? '', 0, 150));
            $email->folder = 'sent';
            if ($this->opportunity) {
                $email->opportunity_id = $this->opportunity->id;
            }
            $email->date_sent = new Carbon();
            $email->html_body = $htmlBody;
            $email->sent_by_user_id = Auth::id();
            $email->save();

            $email->contacts()->attach([$this->contact->id]);
        }
        //end save the mail to send

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody, $emailTemplate->default_attachment_document_id));
    }

}
