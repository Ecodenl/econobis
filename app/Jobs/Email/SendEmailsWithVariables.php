<?php

namespace App\Jobs\Email;


use App\Eco\Email\Email;
use App\Eco\Jobs\JobsLog;
use App\Eco\User\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendEmailsWithVariables implements ShouldQueue
{

    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private Email $email;

    private User $user;

    private int $errors = 0;

    public function __construct(Email $email, User $user)
    {
        $this->email = $email;
        $this->user = $user;

        $jobLog = new JobsLog();
        $jobLog->value = 'Start e-mail(s) versturen.';
        $jobLog->user_id = $user->id;
        $jobLog->job_category_id = 'email';
        $jobLog->save();
    }

    public function handle()
    {
        $mailJob = $this->getMailJob();

        $mailJob->handle();

        $jobLog = new JobsLog();
        $jobLog->value = 'E-mail(s) versturen klaar.' . ($mailJob->hasError() ? ' (met fouten)' : '');
        $jobLog->user_id = $this->user->id;
        $jobLog->job_category_id = 'email';
        $jobLog->save();
    }

    public function failed($exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = 'E-mail(s) versturen mislukt.';
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
}