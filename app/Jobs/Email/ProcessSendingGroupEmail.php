<?php

namespace App\Jobs\Email;

use App\Eco\Contact\ContactEmail;
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

    protected $firstCall;
//    protected int $errors = 0;
    protected array $errors;

    public function __construct(Email $email, User $user, $firstCall = true, array $errors = [])
    {
        $this->email = $email;
        $this->user = $user;
        $this->firstCall = $firstCall;
        $this->errors = $errors;
    }

    public function handle()
    {
        if($this->firstCall){
            Log::info('ProcessSendingGroupEmail start', [
                'email_id' => $this->email->id,
                'user_id' => $this->user->id,
                'firstCall' => $this->firstCall,
                'mail_contact_group_with_single_mail' => $this->email->mail_contact_group_with_single_mail,
                'contacts_pivot_count' => $this->email->contacts()->count(),
                'contact_email_to_send' => ContactEmail::where('email_id', $this->email->id)
                    ->where('status_code', ContactEmail::STATUS_TO_SEND)
                    ->count(),
                'contact_email_sent' => ContactEmail::where('email_id', $this->email->id)
                    ->where('status_code', ContactEmail::STATUS_SENT)
                    ->count(),
            ]);
        }

        if ($this->firstCall) {
            $jobLog = new JobsLog();
            $jobLog->value = 'Start e-mail(s) versturen.';
            $jobLog->user_id = $this->user->id;
            $jobLog->job_category_id = 'email';
            $jobLog->save();

            $this->prepareContactEmailsForGroup();
        }

        $hasMore = false;

        if($this->email->mail_contact_group_with_single_mail){
//todo WM: Tijdelijke niet versturen groepsmail in Valleienergie, later weer // weghalen !!!
            $this->sendSingleMailToAllGroupContacts();
        } else {
            $hasMore = $this->sendNextChunk();
        }

        /**
         * Als we hier komen is de laatste chunk net afgerond.
         */
        // Alleen afronden als er geen vervolgjob meer komt
        if (! $hasMore) {
            $this->sendToExtracontacten();
            $this->markEmailAsSent();

            $jobLog = new JobsLog();
            $jobLog->value = 'E-mail(s) versturen klaar.' . (count($this->errors) > 0 ? ' (met fouten)' : '');
            $jobLog->user_id = $this->user->id;
            $jobLog->job_category_id = 'email';
            $jobLog->save();

            Log::info('ProcessSendingGroupEmail finished handle', [
                'email_id' => $this->email->id,
                'errors_total' => count($this->errors),
                'final_contacts_pivot_count' => $this->email->contacts()->count(),
                'final_contact_email_to_send' => ContactEmail::where('email_id', $this->email->id)
                    ->where('status_code', ContactEmail::STATUS_TO_SEND)
                    ->count(),
                'final_contact_email_sent' => ContactEmail::where('email_id', $this->email->id)
                    ->where('status_code', ContactEmail::STATUS_SENT)
                    ->count(),
            ]);
        }

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
            $this->errors[] = $e->getMessage();
        }
    }

    protected function getMailJob(EmailRecipient $emailRecipient)
    {
        if($emailRecipient->hasModel()){
            return new SendSingleMailToContact($this->email, $emailRecipient->getEmailAddressModel(), $this->user);
        }

        return new SendSingleMail($this->email, new EmailRecipientCollection([$emailRecipient]), $this->user);
    }

    /**
     * Vul contact_email voor deze group email met status 'to-send'.
     * Draait alleen bij de eerste call.
     */
    protected function prepareContactEmailsForGroup(): void
    {
        Log::info('prepareEmailForSending start', [
            'email_id' => $this->email->id,
            'contact_group_id' => $this->email->contact_group_id,
        ]);

        // HTML-body eenmalig wrappen als dat nog niet gebeurd is
        if (! str_contains($this->email->html_body ?? '', '<!DOCTYPE html>')) {
            $this->email->html_body =
                '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
                . $this->email->subject . '</title></head><body>'
                . $this->email->html_body . '</body></html>';

            $this->email->save();
        }

        // Voor de zekerheid: geen dubbele rows (bij herstart of retry)
        ContactEmail::where('email_id', $this->email->id)
            ->whereIn('status_code', [ContactEmail::STATUS_ERROR])
            ->update(['status_code' => ContactEmail::STATUS_TO_SEND]);

        $contactGroup = $this->email->contactGroup;

        if (!$contactGroup) {
            Log::warning('ProcessSendingGroupEmail: email heeft geen contactGroup', [
                'email_id' => $this->email->id,
            ]);
            return;
        }

        Log::info('prepareEmailForSending contactGroup info', [
            'email_id' => $this->email->id,
            'contact_group_id' => $contactGroup->id,
            'type_id' => $contactGroup->type_id,
            'composed_of' => $contactGroup->composed_of,
        ]);
        // voorbeeld: alle contacts als Collection van Contact modellen
        $contacts = $contactGroup->getAllContacts(false, true);

        if (!$contacts || $contacts->isEmpty()) {
            Log::info('ProcessSendingGroupEmail: geen contacten gevonden voor group', [
                'email_id' => $this->email->id,
                'contact_group_id' => $contactGroup->id,
            ]);
            return;
        }

        Log::info('prepareEmailForSending all contacts count BEFORE filter primaryEmailAddress', [
            'email_id' => $this->email->id,
            'contacts_total' => $contacts->count(),
        ]);

        foreach ($contacts as $contact) {
            // Kies hier je mailadres (bijv. primaire)
            /** @var EmailAddress|null $emailAddress */
            $emailAddress = $contact->primaryEmailAddress ?? null;

            if (!$emailAddress) {
                // eventueel loggen / errors verzamelen
                Log::info('ProcessSendingGroupEmail: geen primaryEmailAddress gevonden bij contact', [
                    'email_id' => $this->email->id,
                    'contact_group_id' => $contactGroup->id,
                    'contact_id' => $contact->id,
                ]);
                continue;
            }

            // Dupes voorkomen: één row per (email, contact, email_address)
            ContactEmail::updateOrCreate(
                [
                    'email_id'         => $this->email->id,
                    'contact_id'       => $contact->id,
                    'email_address_id' => $emailAddress->id,
                ],
                [
                    'status_code' => ContactEmail::STATUS_TO_SEND,
                ]
            );
        }

        Log::info('ProcessSendingGroupEmail prepared contact_emails', [
            'email_id' => $this->email->id,
            'contacts_total' => $contacts->count(),
        ]);
    }

    protected function markEmailAsSent()
    {
        $this->email->cc = $this->email->getCcRecipients()->getEmailAdresses()->toArray();
        $this->email->sent_by_user_id = $this->user->id;
        $this->email->date_sent = new Carbon();
        $this->email->folder = 'sent';
        $this->email->save();
    }

    protected function sendSingleMailToAllGroupContacts(): void
    {
        // Haal alle email_address_ids uit contact_email voor deze email
        $emailAddressIds = ContactEmail::where('email_id', $this->email->id)
            ->where('status_code', ContactEmail::STATUS_TO_SEND)
            ->pluck('email_address_id')
            ->filter()         // NULL eruit
            ->unique()
            ->values()
            ->toArray();

        if (empty($emailAddressIds)) {
            Log::info('ProcessSendingGroupEmail: geen emailadressen gevonden voor single-mail-variant', [
                'email_id' => $this->email->id,
            ]);
            return;
        }

        Log::info('ProcessSendingGroupEmail: sendSingleMailToAllGroupContacts start', [
            'email_id' => $this->email->id,
            'recipients_count' => count($emailAddressIds),
        ]);

        try {
            $to = EmailRecipientCollection::createFromValues($emailAddressIds);

            // Eén enkele mail naar alle adressen in de groep
            (new SendSingleMail($this->email, $to, $this->user))->handle();

            // Succes: markeer alle to-send als sent
            ContactEmail::where('email_id', $this->email->id)
                ->where('status_code', ContactEmail::STATUS_TO_SEND)
                ->update(['status_code' => ContactEmail::STATUS_SENT]);

        } catch (\Exception $e) {
            Log::error('ProcessSendingGroupEmail: fout in sendSingleMailToAllGroupContacts', [
                'email_id'   => $this->email->id,
                'exception'  => $e->getMessage(),
            ]);

            // Alles wat nog to-send was, markeren als error
            ContactEmail::where('email_id', $this->email->id)
                ->where('status_code', ContactEmail::STATUS_TO_SEND)
                ->update(['status_code' => ContactEmail::STATUS_ERROR]);

            $this->errors[] = $e->getMessage();
        }
    }

    protected function sendNextChunk(): bool
    {
        $chunkSize = config('queue.email.chunk_size', 1);

        // Pak de volgende set te versturen items
        /** @var \Illuminate\Support\Collection|\App\Eco\Contact\ContactEmail[] $rows */
        $rows = ContactEmail::where('email_id', $this->email->id)
            ->where('status_code', ContactEmail::STATUS_TO_SEND)
            ->orderBy('id')
            ->limit($chunkSize)
            ->get();

        if ($rows->isEmpty()) {
            // Niets meer te versturen → afronden
            Log::info('ProcessSendingGroupEmail: geen to-send rows meer', [
                'email_id' => $this->email->id,
            ]);

            return false; // geen werk meer
        }

        Log::info('ProcessSendingGroupEmail: fetched chunk', [
            'email_id' => $this->email->id,
            'chunk_size' => $rows->count(),
            'chunk_limit' => $chunkSize,
            'remaining_after_fetch' => ContactEmail::where('email_id', $this->email->id)
                ->where('status_code', ContactEmail::STATUS_TO_SEND)
                ->count(),
        ]);

        foreach ($rows as $row) {
            try {
                $emailAddress = $row->emailAddress;

                if (!$emailAddress) {
                    // Geen geldig adres → markeer als error
                    $row->status_code = ContactEmail::STATUS_ERROR;
                    $row->save();
                    $this->errors[] = "Geen EmailAddress voor contact_email id={$row->id}";
                    continue;
                }

                // Hier je bestaande send-logic:
                // NIET queued; gewoon direct handle() zoals je al deed:
//todo WM: Tijdelijke niet versturen groepsmail in Valleienergie, later weer // weghalen !!!
                (new SendSingleMailToContact($this->email, $emailAddress, $this->user))->handle();

                // Succes
                $row->status_code = ContactEmail::STATUS_SENT;
                $row->save();
            } catch (\Throwable $e) {
                Log::error('ProcessSendingGroupEmail: fout bij single mail', [
                    'email_id'   => $this->email->id,
                    'row_id'     => $row->id,
                    'exception'  => $e->getMessage(),
                ]);

                $row->status_code = ContactEmail::STATUS_ERROR;
                $row->save();

                $this->errors[] = $e->getMessage();
            }
        }

        // Check of er nog werk is
        $remaining = ContactEmail::where('email_id', $this->email->id)
            ->where('status_code', ContactEmail::STATUS_TO_SEND)
            ->count();

        Log::info('ProcessSendingGroupEmail: chunk processed', [
            'email_id' => $this->email->id,
            'sent_total_so_far' => ContactEmail::where('email_id', $this->email->id)
                ->where('status_code', ContactEmail::STATUS_SENT)
                ->count(),
            'errors_in_chunk' => ContactEmail::where('email_id', $this->email->id)
                ->where('status_code', ContactEmail::STATUS_ERROR)
                ->count(),
            'remaining' => $remaining,
        ]);

        if ($remaining > 0) {
            Log::info('ProcessSendingGroupEmail: redispatch next chunk', [
                'email_id' => $this->email->id,
                'errors_so_far' => count($this->errors),
                'remaining' => $remaining,
            ]);

            // Nog niet klaar → volgende job
            self::dispatch($this->email, $this->user, false, $this->errors)
                ->afterCommit();

            return true;  // er komt nog een vervolgjob
        }

        // Klaar, maar er waren mogelijk errors
        Log::info('ProcessSendingGroupEmail: klaar voor email', [
            'email_id' => $this->email->id,
            'errors_total' => count($this->errors),
        ]);

        return false; // nu echt klaar
    }

//    protected function syncContactsByGroup($contactsWithEmail)
//    {
//        $contactIds = $contactsWithEmail->pluck('id');
//
//        /**
//         * Without detaching omdat bij het opstellen van de mail ook al "Te koppelen contacten" kunnen worden ingevoerd, deze moeten dan niet worden verwijderd.
//         */
//        $this->email->contacts()->syncWithoutDetaching($contactIds->unique()->toArray());
//    }

//    protected function attachGroupEmailAddressesFromGroup($contactsWithEmail)
//    {
//        $emailAddressIds = $contactsWithEmail->pluck('primaryEmailAddress.id');
//
//        $this->email->groupEmailAddresses()->attach($emailAddressIds->unique()->toArray());
//    }

}