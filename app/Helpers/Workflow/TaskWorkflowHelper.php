<?php

namespace App\Helpers\Workflow;

use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Task\Task;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Support\Facades\Mail;

class TaskWorkflowHelper
{

    /**
     * TwinfieldInvoiceHelper constructor.
     *
     * @param Administration $administration
     */
    public function __construct(Task $task)
    {
        $this->task = $task;
        $this->task_type = $task->type;
        $this->contact = $task->contact;
    }

    public function processWorkflowEmailCompleteTask(){
        set_time_limit(0);

        // Emails moeten vanuit de default mailbox worden verstuurd ipv de mail instellingen in .env
        // Daarom hier eerst de emailconfiguratie overschrijven voordat we gaan verzenden.
        (new EmailHelper())->setConfigToDefaultMailbox();

        if (!$this->task_type) {
            return false;
        }
        if (!$this->contact) {
            return false;
        }

        $mail = Mail::to($this->contact->primaryEmailAddress);

//todo toevoegen custom-portal branch
//        $cooperativeName = PortalSettings::get('cooperativeName');

        $emailTemplate = EmailTemplate::find($this->task_type->email_template_id_wf_completed_task);
        if (!$emailTemplate) {
            return false;
        }else{
//todo toevoegen custom-portal branch
//            $subject = $emailTemplate->subject ? $emailTemplate->subject : 'Bericht van ' . $cooperativeName;
            $subject = $emailTemplate->subject ? $emailTemplate->subject : 'Bericht van Econobis';
            $htmlBody = $emailTemplate->html_body;
        }

//todo toevoegen custom-portal branch
//        $subject = str_replace('{cooperatie_naam}', $cooperativeName, $subject);
        $subject = str_replace('{contactpersoon}', $this->contact->full_name, $subject);
        $htmlBody = str_replace('{contactpersoon}', $this->contact->full_name, $htmlBody);

        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody,'contact', $this->contact);
//todo toevoegen custom-portal branch
//        $htmlBody = TemplateVariableHelper::replaceTemplateCooperativeVariables($htmlBody,'cooperatie' );

        $htmlBody = TemplateVariableHelper::stripRemainingVariableTags($htmlBody);

        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
            . $subject . '</title></head>'
            . $htmlBody . '</html>';


        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));


        return true;

    }

}