<?php

namespace App\Jobs\Email;

use App\Eco\Contact\ContactEmail;
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
        $jobLog = new JobsLog();
        $jobLog->value = 'Start e-mail(s) versturen.';
        $jobLog->user_id = $this->user->id;
        $jobLog->job_category_id = 'email';
        $jobLog->save();

        $hasError = false;

        try {
            $this->prepareEmailForSending();

            $updatedEmail = $this->getMailJob()->handle();

            $this->markEmailAsSent($updatedEmail);
            $this->markContactEmailsAsSent();

            $this->convertEmailAddressIdsToEmailAddresses();
        } catch (\Exception $e) {
            $hasError = true;

            // ContactEmail op error zetten bij mislukte send
            $this->markContactEmailsAsError($e);

            // todo WM: opschonen na test
//            Log::error('E-mail versturen mislukt: ' . $e->getMessage(), [
//                'email_id' => $this->email->id ?? null,
//            ]);
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

        // todo WM: opschonen na test
//        Log::error('E-mail maken mislukt:' . $exception->getMessage(), [
//            'email_id' => $this->email->id ?? null,
//        ]);
    }

    protected function getMailJob()
    {
        $to = $this->email->getToRecipients();

        if ($to->hasSingleContact()) {
            return (new SendSingleMailToContact(
                $this->email,
                $to->first()->getEmailAddressModel(),
                $this->user
            ))
                ->setCC($this->email->getCcRecipients())
                ->setBCC($this->email->getBccRecipients());
        }

        return (new SendSingleMail($this->email, $to, $this->user))
            ->setCC($this->email->getCcRecipients())
            ->setBCC($this->email->getBccRecipients());
    }

    protected function prepareEmailForSending()
    {
        // 1) contacten + ContactEmail (STATUS_TO_SEND) klaarzetten
        $this->syncContactsByRecipients();

        // 2) HTML wrappen (alleen als nog niet gebeurd)
        if (! str_contains($this->email->html_body ?? '', '<!DOCTYPE html>')) {
            $this->email->html_body =
                '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
                . $this->email->subject . '</title></head><body>'
                . $this->email->html_body . '</body></html>';
        }

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

    /**
     * 1) Houd de pivot email->contacts in sync (zoals voorheen)
     * 2) Bouw/refresh ContactEmail-records met status TO_SEND.
     */
    protected function syncContactsByRecipients()
    {
        $email = $this->email;

        // to / cc / bcc kunnen id's of plain strings zijn; we pakken alleen de numerieke (EmailAddress-id's)
        $emailAddressIds = collect()
            ->merge(collect($email->to))
            ->merge(collect($email->cc))
            ->merge(collect($email->bcc))
            ->filter(function ($idOrEmailAddress) {
                return is_numeric($idOrEmailAddress);
            })
            ->map(fn($v) => (int) $v)
            ->unique();

        if ($emailAddressIds->isEmpty()) {
            // geen gekoppelde EmailAddresses → pivot leegmaken én ContactEmail opruimen
            $email->contacts()->sync([]);
            ContactEmail::where('email_id', $email->id)->delete();

            return;
        }

        // Alle betrokken EmailAddress + contact_id ophalen
        $emailAddresses = EmailAddress::whereIn('id', $emailAddressIds)->get();

        $contactIds = $emailAddresses
            ->pluck('contact_id')
            ->filter()   // null eruit
            ->unique()
            ->values();

        // Pivot-relatie bijwerken (bestaand gedrag)
        $email->contacts()->sync($contactIds->toArray());

        // ContactEmail voor deze mail opschonen: alleen nog voor huidige contacten
        ContactEmail::where('email_id', $email->id)
            ->whereNotIn('contact_id', $contactIds)
            ->delete();

        // ContactEmail klaarzetten op STATUS_TO_SEND voor alle huidige ontvangers
        foreach ($emailAddresses as $emailAddress) {
            if (! $emailAddress->contact_id) {
                continue;
            }

            ContactEmail::updateOrCreate(
                [
                    'email_id'   => $email->id,
                    'contact_id' => $emailAddress->contact_id,
                ],
                [
                    'email_address_id' => $emailAddress->id,
                    'status_code'      => ContactEmail::STATUS_TO_SEND,
                ]
            );
        }
    }

    /**
     * Na succesvolle send: alle ContactEmail voor deze mail op SENT.
     */
    protected function markContactEmailsAsSent(): void
    {
        ContactEmail::where('email_id', $this->email->id)
            ->update(['status_code' => ContactEmail::STATUS_SENT]);
    }

    /**
     * Bij fout: alle ContactEmail voor deze mail op ERROR.
     */
    protected function markContactEmailsAsError(\Throwable $e): void
    {
        ContactEmail::where('email_id', $this->email->id)
            ->update(['status_code' => ContactEmail::STATUS_ERROR]);
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
