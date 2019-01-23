<?php

namespace App\Jobs\Email;


use App\Eco\Email\Email;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\Jobs\JobsLog;
use App\Eco\User\User;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Template\TemplateTableHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Email\Templates\GenericMail;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Mail;

class SendEmailsWithVariables implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var Email
     */
    private $email;
    private $tos;
    private $userId;

    public function __construct(Email $email, $tos, $userId)
    {
        $this->email = $email;
        $this->tos = $tos;
        $this->userId = $userId;

        $jobLog = new JobsLog();
        $jobLog->value = 'Start e-mail(s) versturen.';
        $jobLog->user_id = $userId;
        $jobLog->save();
    }

    public function handle()
    {
        $this->validateRequest();

        //user voor observer
        Auth::setUser(User::find($this->userId));

        $email = $this->email;

        $mailbox = $email->mailbox;

        (new EmailHelper())->setConfigToMailbox($mailbox);

        //First see if the to's are contact, user or created option
        $emailsToContact = [];
        $emailsToEmailAddress = [];
        $tos = $this->tos;

        foreach ($tos as $to) {
            if (is_numeric($to)) {
                $emailAddress = EmailAddress::find($to);
                $emailsToContact[] = $emailAddress;

            } elseif (substr($to, 0, 7) === "@group_") {
                //niets doen
            } else {
                $emailsToEmailAddress[] = $to;
            }
        }
        $ccBccSent = false;

        $amounfOfEmailsSend = 0;
        $mergedHtmlBody = $email->html_body;

        //First send emails to all emails
        if (!empty($emailsToEmailAddress)) {
            $mail = Mail::to($emailsToEmailAddress);

            ($email->cc != []) ? $mail->cc($email->cc) : null;
            ($email->bcc != []) ? $mail->bcc($email->bcc) : null;
            $htmlBodyWithVariables = TemplateVariableHelper::replaceTemplateVariables($email->html_body, 'ik', Auth::user());
            $htmlBodyWithVariables = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithVariables);

            try {
                $mail->send(new GenericMail($email, $htmlBodyWithVariables));
                $amounfOfEmailsSend++;

                if ($amounfOfEmailsSend === 1) {
                    $mergedHtmlBody = $htmlBodyWithVariables;
                }

                $ccBccSent = true;
            } catch (\Exception $e) {
                Log::error('Mail naar e-mailadres kon niet worden verzonden');
                Log::error($e->getMessage());
            }

        }

        //Send mail to all contacts
        if (!empty($emailsToContact)) {
            foreach ($emailsToContact as $emailToContact) {
                $mail = Mail::to($emailToContact->email);
                if (!$ccBccSent) {
                    ($email->cc != []) ? $mail->cc($email->cc) : null;
                    ($email->bcc != []) ? $mail->bcc($email->bcc) : null;
                    $ccBccSent = true;
                } else {
                    $email->cc = [];
                    $email->bcc = [];
                }
                $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body, $emailAddress->contact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'contact', $emailAddress->contact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'ik', Auth::user());
                if ($email->quotationRequest) {
                    $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'offerteverzoek', $email->quotationRequest);
                }
                $htmlBodyWithContactVariables = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);
                try {
                    $mail->send(new GenericMail($email, $htmlBodyWithContactVariables));
                    $amounfOfEmailsSend++;

                    if ($amounfOfEmailsSend === 1) {
                        $mergedHtmlBody = $htmlBodyWithContactVariables;
                    }
                } catch (\Exception $e) {
                    Log::error('Mail naar contact kon niet worden verzonden');
                    Log::error($e->getMessage());
                }

            }
        }

        //send mail to group contacts
        if ($email->groupEmailAddresses) {
            foreach ($email->groupEmailAddresses as $emailAddress) {
                $mail = Mail::to($emailAddress->email);
                if (!$ccBccSent) {
                    ($email->cc != []) ? $mail->cc($email->cc) : null;
                    ($email->bcc != []) ? $mail->bcc($email->bcc) : null;
                    $ccBccSent = true;
                } else {
                    $email->cc = [];
                    $email->bcc = [];
                }

                $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body, $emailAddress->contact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'contact', $emailAddress->contact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'ik', Auth::user());
                $htmlBodyWithContactVariables = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);
                try {
                    $mail->send(new GenericMail($email, $htmlBodyWithContactVariables));
                    $amounfOfEmailsSend++;

                    if ($amounfOfEmailsSend === 1) {
                        $mergedHtmlBody = $htmlBodyWithContactVariables;
                    }
                } catch (\Exception $e) {
                    Log::error('Mail naar groep e-mailadres kon niet worden verzonden');
                    Log::error($e->getMessage());
                }

            }
        }

        if ($amounfOfEmailsSend === 1) {
            $email->html_body = $mergedHtmlBody;
        }

        $email->date_sent = new Carbon();
        $email->folder = 'sent';
        $email->save();

        $jobLog = new JobsLog();
        $jobLog->value = 'E-mail(s) verstuurd.';
        $jobLog->user_id = $this->userId;
        $jobLog->save();
    }

    public function failed(\Exception $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = 'E-mail(s) versturen mislukt.';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error('E-mail maken mislukt:' . $exception->getMessage());
    }

    private function validateRequest()
    {
        if ($this->email->from != $this->email->mailbox->email) throw new \Exception('A mail can only be send with the same address as the sending mailbox');
    }
}