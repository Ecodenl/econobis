<?php

namespace App\Jobs\Email;


use App\Eco\Email\Email;
use App\Eco\Email\EmailRecipient;
use App\Eco\Email\EmailRecipientCollection;
use App\Eco\Jobs\JobsLog;
use App\Eco\User\User;
use Config;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendGroupEmail implements ShouldQueue
{

    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private Email $email;

    private User $user;

    private int $errors = 0;

    /**
     * Variabele om te bepalen of dit de eerste aanroep
     * is of een opvolgende van een batch.
     *
     * @var bool
     */
    private $firstCall;

    public function __construct(Email $email, User $user, $firstCall = true)
    {
        $this->email = $email;
        $this->user = $user;
        $this->firstCall = $firstCall;

        if ($firstCall) {
            $jobLog = new JobsLog();
            $jobLog->value = 'Start e-mail(s) versturen.';
            $jobLog->user_id = $user->id;
            $jobLog->job_category_id = 'email';
            $jobLog->save();
        }
    }

    public function handle()
    {
        /**
         * Send emails to GroupContacts when available.
         *
         * We send a maximum amount each time to prevent timeouts.
         */
        $groupEmailAdresses = $this->email->groupEmailAddresses()
            ->limit(Config::get('queue.email.chunk_size'))
            ->get();

        foreach ($groupEmailAdresses as $emailAddress) {
            $mailJob = new SendSingleMailToContact($this->email, $emailAddress, $this->user);

            $mailJob->handle();

            if($mailJob->hasError()){
                $this->errors++;
            }

            /**
             * Email always detach from table otherwise the jobs
             * can stay in a loop when error occur in try/catch while sending.
             */
            $this->email->groupEmailAddresses()->detach($emailAddress->id);
        }

        /**
         * Check if there are more Group email address to send to.
         *
         * Create a new Job to pick these up.
         */
        if ($this->email->groupEmailAddresses()->exists()) {
            self::dispatch($this->email, $this->user, false);

            return;
        }

        /**
         * Als we hier komen zitten we dus in dus net de laatste chunk afgerond
         */
        $this->sendToExtracontacten();

        $jobLog = new JobsLog();
        $jobLog->value = 'E-mail(s) versturen klaar.' . ($this->errors > 0 ? ' (met fouten)' : ''); // Todo; Error count wordt niet meegenomen naar nieuwe jobs in geval van meerdere chuncks
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

    protected function sendToExtracontacten(): void
    {
        foreach ($this->email->getCcRecipients() as $emailRecipient){
            $this->sendToExtraContact($emailRecipient);
        }
    }

    protected function sendToExtraContact(EmailRecipient $emailRecipient)
    {
        $mailJob = $this->getMailJob($emailRecipient);

        $mailJob->handle();

        if($mailJob->hasError()){
            $this->errors++;
        }
    }

    protected function getMailJob(EmailRecipient $emailRecipient)
    {
        if($emailRecipient->hasModel()){
            return new SendSingleMailToContact($this->email, $emailRecipient->getEmailAddressModel(), $this->user);
        }

        return new SendSingleMail($this->email, new EmailRecipientCollection([$emailRecipient]), $this->user);
    }
}