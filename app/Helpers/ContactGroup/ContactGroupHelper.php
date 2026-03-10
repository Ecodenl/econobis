<?php

namespace App\Helpers\ContactGroup;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\PortalSettings\PortalSettings;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Support\Facades\Mail;

class ContactGroupHelper
{
    private $contactGroup;
    private $contact;
    private $responsibleUser;
    private $cooperativeName;

    public function __construct(ContactGroup $contactGroup, Contact $contact)
    {
        $this->contactGroup = $contactGroup;
        $this->contact = $contact;
        $this->responsibleUser = $contactGroup->responsibleUser;
        $this->cooperativeName = PortalSettings::first()?->cooperative_name;
    }

    public function processEmailNewContactToGroup(){
        set_time_limit(0);

        if (!$this->contactGroup) {
            return false;
        }
        if (!$this->contact) {
            return false;
        }

        $emailTemplate = EmailTemplate::find($this->contactGroup->email_template_id_new_contact_link);
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
        if($this->contactGroup) {
            $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'groep', $this->contactGroup);
            $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'groep', $this->contactGroup);
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