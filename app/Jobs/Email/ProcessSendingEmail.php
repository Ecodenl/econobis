<?php

namespace App\Jobs\Email;


use App\Eco\Email\Email;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\Jobs\JobsLog;
use App\Eco\User\User;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessSendingEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected Email $email;

    protected User $user;

    public function __construct(Email $email, User $user)
    {
        $this->email = $email;
        $this->user = $user;
    }

    public function handle()
    {
        if ($this->email->contactGroup) {
            ProcessSendingGroupEmail::dispatch($this->email, $this->user)->afterCommit();
            return;
        }

        $jobLog = new JobsLog();
        $jobLog->value = 'Start e-mail(s) versturen.';
        $jobLog->user_id = $this->user->id;
        $jobLog->job_category_id = 'email';
        $jobLog->save();

        $hasError = false;
        try{
            $this->prepareEmailForSending();
            $updatedEmail = $this->getMailJob()->handle();
            $this->markEmailAsSent($updatedEmail);
            $this->convertEmailAddressIdsToEmailAddresses();
        }catch (\Exception $e){
            $hasError = true;
        }

        $jobLog = new JobsLog();
        $jobLog->value = 'E-mail versturen klaar.' . ($hasError ? ' (met fouten)' : '');
        $jobLog->user_id = $this->user->id;
        $jobLog->job_category_id = 'email';
        $jobLog->save();
    }

    public function failed(\Throwable $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = 'E-mail versturen mislukt.';
        $jobLog->user_id = $this->user->id;
        $jobLog->job_category_id = 'email';
        $jobLog->save();

        Log::error('E-mail maken mislukt:' . $exception->getMessage());
    }

    protected function getMailJob()
    {
        $to = $this->email->getToRecipients();

        if($to->hasSingleContact()){
            return (new SendSingleMailToContact($this->email, $to->first()->getEmailAddressModel(), $this->user))
                ->setCC($this->email->getCcRecipients())
                ->setBCC($this->email->getBccRecipients());
        }

        return (new SendSingleMail($this->email, $to, $this->user))
            ->setCC($this->email->getCcRecipients())
            ->setBCC($this->email->getBccRecipients());
    }

    protected function prepareEmailForSending()
    {
        $this->syncContactsByRecipients();

        $this->email->html_body
            = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
            . $this->email->subject . '</title></head><body>'
            . $this->email->html_body . '</body></html>';

        $this->email->save();
    }

    protected function markEmailAsSent($updatedEmail)
    {
        $this->email->subject = $updatedEmail->subject;
        $this->email->subject_for_filter = trim(mb_substr($updatedEmail->subject ?? '', 0, 150));
        $this->email->html_body = $updatedEmail->html_body;
        $this->email->sent_by_user_id = $this->user->id;
        $this->email->date_sent = new Carbon();
        $this->email->folder = 'sent';
        $this->email->save();
    }

    protected function syncContactsByRecipients()
    {
        $email = $this->email;

        $emailAddressIds = collect()
            ->merge(collect($email->to))
            ->merge(collect($email->cc))
            ->merge(collect($email->bcc))
            ->filter(function($idOrEmailAddress){
                return is_numeric($idOrEmailAddress);
            })
            ->unique();

        $contactIds = EmailAddress::whereIn('id', $emailAddressIds)->pluck('contact_id');

        $email->contacts()->sync($contactIds->unique()->toArray());
    }

    protected function convertEmailAddressIdsToEmailAddresses()
    {
        $email = $this->email;

        $email->to = $email->getToRecipients()->getEmailAdresses()->toArray();
        $email->cc = $email->getCcRecipients()->getEmailAdresses()->toArray();
        $email->bcc = $email->getBccRecipients()->getEmailAdresses()->toArray();

        $email->save();
    }
}