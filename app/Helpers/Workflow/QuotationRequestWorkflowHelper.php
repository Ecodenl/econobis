<?php

namespace App\Helpers\Workflow;

use App\Eco\Campaign\CampaignWorkflow;
use App\Eco\Email\Email;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Mailbox\Mailbox;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
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

        $to = null;
        $cc = null;
        if($campaignWorkflow->mail_to_contact_wf == 1) {
//            Log::info('to mail_to_contact_wf is geset');
            $to = $this->contact->primaryEmailAddress;
            if ($campaignWorkflow->mail_cc_to_coach_wf && $this->quotationRequest->organisationOrCoach && $this->quotationRequest->organisationOrCoach->primaryEmailAddress) {
//                Log::info('cc mail_cc_to_coach_wf is geset');
                $cc = $this->quotationRequest->organisationOrCoach->primaryEmailAddress;
            }
        } else {
            if ($campaignWorkflow->mail_cc_to_coach_wf && $this->quotationRequest->organisationOrCoach && $this->quotationRequest->organisationOrCoach->primaryEmailAddress) {
//                Log::info('to mail_cc_to_coach_wf is geset');
                $to = $this->quotationRequest->organisationOrCoach->primaryEmailAddress;
            }
        }
//        if(!$to && !$cc) {
//            Log::info('geen to en geen cc');
//        }

        if(!$to) return false;

        $mail = Mail::fromMailbox($mailbox)
            ->to($to);
        $toEmail = $to->email;
        $ccEmail = '';
        if($cc) {
            $mail->cc($this->quotationRequest->organisationOrCoach->primaryEmailAddress);
            $ccEmail = $cc->email;
        }

        $this->mailWorkflow($emailTemplate, $mail, $mailbox, $toEmail, $ccEmail);
        return true;
    }

    public function processWorkflowEmailReminder(CampaignWorkflow $campaignWorkflow){
        set_time_limit(0);

        if (!$this->quotationRequest_status) {
            return false;
        }
        if (!$this->quotationRequest_status->send_email_reminder) {
            return false;
        }

        if (!$this->contact) {
            return false;
        }

        if (!$campaignWorkflow->is_active) {
            return false;
        }
        if (!$campaignWorkflow->mail_reminder_to_coach_wf) {
            return false;
        }

        $emailTemplate = EmailTemplate::find($campaignWorkflow->email_template_id_reminder);
        if (!$emailTemplate) {
            return false;
        }

        if (!$this->quotationRequest->organisationOrCoach || !$this->quotationRequest->organisationOrCoach->primaryEmailAddress) {
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
            ->to($this->quotationRequest->organisationOrCoach->primaryEmailAddress);

        $this->mailWorkflow($emailTemplate, $mail, $mailbox, $this->quotationRequest->organisationOrCoach->primaryEmailAddress->email, '');

        return true;
    }

    public function mailWorkflow($emailTemplate, $mail, $mailbox, $to, $cc)
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
                    if($this->quotationRequest->opportunity->intake) {
                        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'intake', $this->quotationRequest->opportunity->intake);
                        if ($this->quotationRequest->opportunity->intake->campaign) {
                            $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'campagne',
                                $this->quotationRequest->opportunity->intake->campaign);
                        }
                    }
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
        $email = new Email();
        $email->mailbox_id = $mailbox->id;
        $email->from = $mailbox->email;
        $email->to = [$to];
        $email->cc = ($cc != '') ? [$cc] : [];
        $email->bcc = [];
        $email->subject = $subject;
        $email->folder = 'sent';
        if($this->quotationRequest) {
            $email->quotation_request_id = $this->quotationRequest->id;
            if($this->quotationRequest->opportunity) {
                $email->opportunity_id = $this->quotationRequest->opportunity->id;
            }
        }
        $email->date_sent = new Carbon();
        $email->html_body = $htmlBody;
        $email->sent_by_user_id = Auth::id();
        $email->save();

        $email->contacts()->attach([$this->contact->id]);

        //end save the mail to send
//        Log::info('mail');
//        Log::info(json_encode($mail));
        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody, $emailTemplate->default_attachment_document_id));
    }

}