<?php

namespace App\Jobs\Email;

use App\Eco\Email\Email;
use App\Eco\Email\EmailRecipientCollection;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\Jobs\JobsLog;
use App\Eco\User\User;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Email\Templates\GenericMail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendSingleMailToContact extends SendSingleMail
{
    protected EmailAddress $emailAddress;

    public function __construct(Email $email, EmailAddress $emailAddress, User $user)
    {
        $this->emailAddress = $emailAddress;

        parent::__construct($email, new EmailRecipientCollection(), $user);
    }

    public function handle(): Email
    {
        $email = $this->getUpdatedEmail();

        try {
            Mail::fromMailbox($this->email->mailbox)
                ->to($this->emailAddress->email)
                ->cc($this->cc->getEmailAdresses()->toArray())
                ->bcc($this->bcc->getEmailAdresses()->toArray())
                ->send(new GenericMail($email, $email->html_body));
        } catch (\Exception $e) {
            Log::error('Mail ' . $email->id . ' naar e-mailadres ' . $this->emailAddress->email . ' kon niet worden verzonden');
            Log::error($e->getMessage());

            $jobLog = new JobsLog();
            $jobLog->value = 'Mail ' . $email->id . ' naar e-mailadres ' . $this->emailAddress->email . ' kon niet worden verzonden';
            $jobLog->user_id = $this->user->id;
            $jobLog->job_category_id = 'email';
            $jobLog->save();
        }

        return $email;
    }

    protected function getNewSubject($oldSubject)
    {
        $subject = parent::getNewSubject($oldSubject);

        return $this->replaceContactVariables($subject);
    }

    protected function getNewHtmlBody($oldHtmlBody)
    {
        $htmlBody = $this->replaceDefaultVariables($oldHtmlBody);
        $htmlBody = $this->replaceContactVariables($htmlBody);

        return TemplateVariableHelper::stripRemainingVariableTags($htmlBody);
    }

    protected function replaceContactVariables(string $string): string
    {
        $email = $this->email;
        $contact = $this->emailAddress->contact;

        $string = str_replace('{contactpersoon}', $contact->full_name, $string);
        $string = TemplateVariableHelper::replaceTemplateVariables($string, 'contact', $contact);
        $string = TemplateVariableHelper::replaceTemplatePortalVariables($string, 'portal');
        $string = TemplateVariableHelper::replaceTemplatePortalVariables($string, 'contacten_portal');
        $string = TemplateVariableHelper::replaceTemplateCooperativeVariables($string, 'cooperatie');

        if ($email->task) {
            $string = TemplateVariableHelper::replaceTemplateVariables($string, 'taak', $email->task);
        }
        if ($email->intake) {
            $string = TemplateVariableHelper::replaceTemplateVariables($string, 'intake', $email->intake);
            if ($email->intake->campaign) {
                $string = TemplateVariableHelper::replaceTemplateVariables($string, 'campagne',
                    $email->intake->campaign);
            }
        }
        if ($email->opportunity) {
            $string = TemplateVariableHelper::replaceTemplateVariables($string, 'kans', $email->opportunity);
            if ($email->opportunity->intake) {
                $string = TemplateVariableHelper::replaceTemplateVariables($string, 'intake',
                    $email->opportunity->intake);
                if ($email->opportunity->intake->campaign) {
                    $string = TemplateVariableHelper::replaceTemplateVariables($string, 'campagne',
                        $email->opportunity->intake->campaign);
                }
            }
        }
        if ($email->quotationRequest) {
            $string = TemplateVariableHelper::replaceTemplateVariables($string, 'offerteverzoek', $email->quotationRequest);
            $string = TemplateVariableHelper::replaceTemplateVariables($string, 'kansactie', $email->quotationRequest);
            if ($email->quotationRequest->opportunity) {
                $string = TemplateVariableHelper::replaceTemplateVariables($string, 'kans', $email->quotationRequest->opportunity);
                if ($email->quotationRequest->opportunity->intake) {
                    $string = TemplateVariableHelper::replaceTemplateVariables($string, 'intake',
                        $email->quotationRequest->opportunity->intake);
                    if ($email->quotationRequest->opportunity->intake->campaign) {
                        $string = TemplateVariableHelper::replaceTemplateVariables($string, 'campagne',
                            $email->quotationRequest->opportunity->intake->campaign);
                    }
                }
            }
        }
        if ($email->contactGroup) {
            $string = TemplateVariableHelper::replaceTemplateVariables($string, 'groep', $email->contactGroup);
        }

        return $string;
    }
}