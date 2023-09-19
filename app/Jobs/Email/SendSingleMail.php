<?php

namespace App\Jobs\Email;

use App\Eco\Email\Email;
use App\Eco\Email\EmailRecipientCollection;
use App\Eco\Jobs\JobsLog;
use App\Eco\User\User;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Email\Templates\GenericMail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendSingleMail
{
    protected Email $email;

    protected EmailRecipientCollection $to;

    protected EmailRecipientCollection $cc;

    protected EmailRecipientCollection $bcc;

    protected User $user;

    public function __construct(Email $email, EmailRecipientCollection $to, User $user)
    {
        $this->email = $email;
        $this->to = $to;
        $this->cc = new EmailRecipientCollection();
        $this->bcc = new EmailRecipientCollection();
        $this->user = $user;
    }

    public function setCC(EmailRecipientCollection $cc)
    {
        $this->cc = $cc;

        return $this;
    }

    public function setBCC(EmailRecipientCollection $bcc)
    {
        $this->bcc = $bcc;

        return $this;
    }

    public function handle(): Email
    {
        $email = $this->getUpdatedEmail();

        try {
            Mail::fromMailbox($this->email->mailbox)
                ->to($this->to->getEmailAdresses()->toArray())
                ->cc($this->cc->getEmailAdresses()->toArray())
                ->bcc($this->bcc->getEmailAdresses()->toArray())
                ->send(new GenericMail($email, $email->html_body));
        } catch (\Exception $e) {
            $value = 'Mail ' . $email->id . ' kon niet worden verzonden naar e-mailadres(sen) ' . $this->to->getEmailAdresses()->implode(', ');
            Log::error($value);
            Log::error($e->getMessage());

            $jobLog = new JobsLog();
            $jobLog->value = strlen($value)>191 ? (substr($value,0,188) . '...') : $value;
            $jobLog->user_id = $this->user->id;
            $jobLog->job_category_id = 'email';
            $jobLog->save();

            throw $e;
        }

        return $email;
    }

    protected function getUpdatedEmail()
    {
        $email = $this->email->fresh(); // We don't want any side effects on the original email object

        $email->subject = $this->getNewSubject($email->subject);
        $email->html_body = $this->getNewHtmlBody($email->html_body);

        return $email;
    }

    protected function getNewSubject($oldSubject)
    {
        $subject = $oldSubject ?: 'Econobis';

        return $this->replaceDefaultVariables($subject);
    }

    protected function getNewHtmlBody($oldHtmlBody)
    {
        $htmlBody = $this->replaceDefaultVariables($oldHtmlBody);

        return TemplateVariableHelper::stripRemainingVariableTags($htmlBody);
    }

    protected function replaceDefaultVariables(string $string): string
    {
        $string = TemplateVariableHelper::replaceTemplateVariables($string, 'ik', $this->user);

        if ($this->email->contactGroup) {
            $string = TemplateVariableHelper::replaceTemplateVariables($string, 'groep', $this->email->contactGroup);
        }

        return $string;
    }
}