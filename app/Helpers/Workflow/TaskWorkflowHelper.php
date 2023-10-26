<?php

namespace App\Helpers\Workflow;

use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Task\Task;
use App\Eco\User\User;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Support\Facades\Mail;

class TaskWorkflowHelper
{

    public function __construct(Task $task)
    {
        $this->task = $task;
        $this->task_type = $task->type;
        $this->contact = $task->contact;
        $this->responsibleUser = $task->responsibleUser;
        $this->responsibleTeam = $task->responsibleTeam;
        $this->cooperativeName = PortalSettings::get('cooperativeName');

    }

    public function processWorkflowEmailCompleteTask(){
        set_time_limit(0);

        if (!$this->task_type) {
            return false;
        }
        if (!$this->task_type->uses_wf_completed_task) {
            return false;
        }

        if (!$this->contact) {
            return false;
        }

        $emailTemplate = EmailTemplate::find($this->task_type->email_template_id_wf_completed_task);
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

    public function processWorkflowEmailExpiredTask(){
        set_time_limit(0);

        if (!$this->task_type) {
            return false;
        }
        if (!$this->task_type->uses_wf_expired_task) {
            return false;
        }

        if (!$this->responsibleUser && !$this->responsibleTeam) {
            return false;
        }

        $emailTemplate = EmailTemplate::find($this->task_type->email_template_id_wf_expired_task);
        if (!$emailTemplate) {
            return false;
        }

        $users = (new User())->newCollection();
        if ($this->responsibleUser) {
            $users->push($this->responsibleUser);
        } elseif ($this->responsibleTeam && $this->responsibleTeam->users()->exists()) {
            $users = $this->responsibleTeam->users;
        }
        if(count($users) == 0)
        {
            return false;
        }

        $mail = Mail::to($users->pluck('email')->toArray());
        $this->mailWorkflow($emailTemplate, $mail);
        return true;
    }

    public function processWorkflowEmailNewTask(){
        set_time_limit(0);

        if (!$this->task_type) {
            return false;
        }
        if (!$this->task_type->uses_wf_new_task) {
            return false;
        }

        if (!$this->responsibleUser && !$this->responsibleTeam) {
            return false;
        }

        $emailTemplate = EmailTemplate::find($this->task_type->email_template_id_wf_new_task);
        if (!$emailTemplate) {
            return false;
        }

        $users = (new User())->newCollection();
        if ($this->responsibleUser) {
            $users->push($this->responsibleUser);
        } elseif ($this->responsibleTeam && $this->responsibleTeam->users()->exists()) {
            $users = $this->responsibleTeam->users;
        }
        if(count($users) == 0)
        {
            return false;
        }

        $mail = Mail::to($users->pluck('email')->toArray());
        $this->mailWorkflow($emailTemplate, $mail);
        return true;
    }

    public function mailWorkflow($emailTemplate, $mail)
    {
        $subject = $emailTemplate->subject ? $emailTemplate->subject : 'Bericht van ' . $this->cooperativeName;
        $htmlBody = $emailTemplate->html_body;

        $subject = str_replace('{cooperatie_naam}', $this->cooperativeName, $subject);
        if($this->responsibleUser){
            $subject = TemplateVariableHelper::replaceTemplateVariables($subject,'ik', $this->responsibleUser);
            $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'ik', $this->responsibleUser);
        }
        if($this->contact) {
            $subject = str_replace('{contactpersoon}', $this->contact->full_name, $subject);
            $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'contact', $this->contact);
            $htmlBody = str_replace('{contactpersoon}', $this->contact->full_name, $htmlBody);
            $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'contact', $this->contact);
        }
        if($this->task) {
            $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'taak', $this->task);
            $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'taak', $this->task);
        }

        $htmlBody = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBody,'portal' );
        $htmlBody = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBody,'contacten_portal' );
        $htmlBody = TemplateVariableHelper::replaceTemplateCooperativeVariables($htmlBody,'cooperatie' );

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