<?php

namespace App\Jobs\Email;


use App\Eco\Email\Email;
use App\Eco\Email\EmailRecipient;
use App\Eco\Email\EmailRecipientCollection;
use App\Eco\Jobs\JobsLog;
use App\Eco\User\User;
use Carbon\Carbon;
use Config;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessSendingGroupEmail implements ShouldQueue
{

    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected Email $email;

    protected User $user;

    protected int $errors = 0;

    /**
     * Variabele om te bepalen of dit de eerste aanroep
     * is of een opvolgende van een batch.
     *
     * @var bool
     */
    protected $firstCall;

    public function __construct(Email $email, User $user, $firstCall = true, $previousErrors = 0)
    {
        $this->email = $email;
        $this->user = $user;
        $this->firstCall = $firstCall;
        $this->errors = $previousErrors;
    }

    public function handle()
    {
        if ($this->firstCall) {
            $jobLog = new JobsLog();
            $jobLog->value = 'Start e-mail(s) versturen.';
            $jobLog->user_id = $this->user->id;
            $jobLog->job_category_id = 'email';
            $jobLog->save();

            $this->prepareEmailForSending();
        }

        if($this->email->mail_contact_group_with_single_mail){
            $this->sendSingleMailToAllGroupContacts();
        }else{
            $this->sendNextChunk();
        }

        /**
         * Check if there are more Group email address to send to.
         *
         * Create a new Job to pick these up.
         */
        if ($this->email->groupEmailAddresses()->exists()) {
            self::dispatch($this->email, $this->user, false, $this->errors);

            return;
        }

        /**
         * Als we hier komen is de laatste chunk net afgerond.
         */
        $this->sendToExtracontacten();
        $this->markEmailAsSent();

        $jobLog = new JobsLog();
        $jobLog->value = 'E-mail(s) versturen klaar.' . ($this->errors > 0 ? ' (met fouten)' : '');
        $jobLog->user_id = $this->user->id;
        $jobLog->job_category_id = 'email';
        $jobLog->save();
    }

    public function failed(\Throwable $exception)
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

        try {
            $mailJob->handle();
        }catch (\Exception $e){
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

    protected function prepareEmailForSending()
    {
        // 1-malig ophalen contactGroup->all_contacts !!! (zie voor verder uitleg in _todo comment bij getAllContactsAttribute in model ContactGroup)
        // Hierna filteren we nog even op primaryEmailAddress aanwezig.
        $contactGroupAllContacts = $this->email->contactGroup->all_contacts->filter(function ($contact) {
            return !!$contact->primaryEmailAddress;
        });
        $this->syncContactsByGroup($contactGroupAllContacts);
        $this->attachGroupEmailAddressesFromGroup($contactGroupAllContacts);

        $this->email->html_body
            = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
            . $this->email->subject . '</title></head><body>'
            . $this->email->html_body . '</body></html>';

        $this->email->save();
    }

    protected function markEmailAsSent()
    {
        $this->email->sent_by_user_id = $this->user->id;
        $this->email->date_sent = new Carbon();
        $this->email->folder = 'sent';
        $this->email->save();
    }

    protected function sendSingleMailToAllGroupContacts()
    {
        try {
            $emailAddressIds = $this->email->groupEmailAddresses()->pluck('email_addresses.id')->toArray();
            $to = EmailRecipientCollection::createFromValues($emailAddressIds);

            (new SendSingleMail($this->email, $to, $this->user))->handle();
        }catch (\Exception $e){
            $this->errors++;
        }

        $this->email->groupEmailAddresses()->detach();
    }

    protected function sendNextChunk()
    {
        /**
         * We send a maximum amount each time to prevent timeouts.
         */
        $groupEmailAddresses = $this->email->groupEmailAddresses()
            ->limit(Config::get('queue.email.chunk_size'))
            ->get();

        foreach ($groupEmailAddresses as $emailAddress) {
            try {
                (new SendSingleMailToContact($this->email, $emailAddress, $this->user))->handle();
            }catch (\Exception $e){
                $this->errors++;
            }

            /**
             * Email always detach from table otherwise the jobs
             * can stay in a loop when error occur in try/catch while sending.
             */
            $this->email->groupEmailAddresses()->detach($emailAddress->id);
        }
    }

    protected function syncContactsByGroup($contactGroupAllContacts)
    {
        $contactIds = $contactGroupAllContacts->pluck('id');

        /**
         * Without detaching omdat bij het opstellen van de mail ook al "Te koppelen contacten" kunnen worden ingevoerd, deze moeten dan niet worden verwijderd.
         */
        $this->email->contacts()->syncWithoutDetaching($contactIds->unique()->toArray());
    }

    protected function attachGroupEmailAddressesFromGroup($contactGroupAllContacts)
    {
        $emailAddressIds = $contactGroupAllContacts->pluck('primaryEmailAddress.id');

        $this->email->groupEmailAddresses()->attach($emailAddressIds->unique()->toArray());
    }

}