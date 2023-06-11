<?php

namespace App\Jobs\Email;

use App\Eco\Email\Email;
use App\Eco\Email\EmailRecipientCollection;
use App\Eco\Jobs\JobsLog;
use App\Eco\User\User;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Email\Templates\GenericMail;
use Carbon\Carbon;
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
        $this->validateRequest();

        $email = $this->getUpdatedEmail();

        try {
            $this->setConfigToMailbox();

            $mailManager = Mail::to($this->to->getEmailAdresses()->toArray());

            $mailManager->cc($this->cc->getEmailAdresses()->toArray())
                ->bcc($this->bcc->getEmailAdresses()->toArray())
                ->send(new GenericMail($email, $email->html_body, null));
        } catch (\Exception $e) {
            Log::error('Mail ' . $email->id . ' naar e-mailadres kon niet worden verzonden');
            Log::error($e->getMessage());

            $jobLog = new JobsLog();
            $jobLog->value = 'Mail ' . $email->id . '  naar e-mailadres(sen) ' . $this->to->getEmailAdresses()->implode(', ') . ' kon niet worden verzonden';
            $jobLog->user_id = $this->user->id;
            $jobLog->job_category_id = 'email';
            $jobLog->save();

            throw $e;
        }

        return $email;
    }

    protected function validateRequest()
    {
        if ($this->email->from != $this->email->mailbox->email) throw new \Exception('A mail can only be send with the same address as the sending mailbox');
    }

    protected function getUpdatedEmail()
    {
        $email = $this->email->replicate(); // We don't want any side effects on the original email

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

    protected function setConfigToMailbox(){
        (new EmailHelper())->setConfigToMailbox($this->email->mailbox);
    }
}