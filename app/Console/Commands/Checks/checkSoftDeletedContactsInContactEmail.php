<?php

namespace App\Console\Commands\Checks;

use App\Eco\Contact\Contact;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkSoftDeletedContactsInContactEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:checkSoftDeletedContactsInContactEmail {--recover=false}';
    protected $mailTo = 'xaris@econobis.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op soft deleted contacten (id\'s) in contact emails';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // met of zonder herstel?
        $doRecover = $this->option('recover') == 'true';

        Log::info('Procedure check op soft deleted contacten (id\'s) in contact emails ' . ($doRecover ? ' MET HERSTEL!' : ''));

        $contactEmailsWithDeletedContactIds = $this->getContactEmailsWithDeletedContactIds($doRecover);

        if(!empty($contactEmailsWithDeletedContactIds)) {
            $this->sendMail($contactEmailsWithDeletedContactIds, $doRecover);
            Log::info('Soft deleted contacten (ids) gevonden in contact emails. Mail verzonden,');
        } else {
            Log::info('Geen soft deleted contacten (ids) gevonden in contact emails.');
        }

        Log::info('Procedure check op soft deleted contacten (id\'s) in contact emails klaar.');

    }

    private function sendMail($contactEmailsWithDeletedContactIds, $doRecover)
    {
        $subject = 'Soft deleted contacten (ids) gevonden in contact emails! (' . count($contactEmailsWithDeletedContactIds) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $contactEmailsWithDeletedContactIdsHtml = "<p>De volgende contact email id's hebben soft deleted contacten (ids) :</p>";
        if($doRecover){
            $contactEmailsWithDeletedContactIdsHtml .= "<p>MET HERSTEL!</p>";
        }
        foreach ($contactEmailsWithDeletedContactIds as $contactEmailWithDeletedContactIds) {
            $contactEmailsWithDeletedContactIdsHtml .=
                "Email: " . $contactEmailWithDeletedContactIds['email-id'] . " " . $contactEmailWithDeletedContactIds['email-subject'] . " | " .
                "Contact : " . $contactEmailWithDeletedContactIds['contact-id'] . " " . $contactEmailWithDeletedContactIds['contact-name'] . "</br>"
            ;
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $contactEmailsWithDeletedContactIdsHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }

    private function getContactEmailsWithDeletedContactIds(bool $doRecover): array
    {
        $counter = 0;
        $contactEmailsReturn = [];

        $contactsTrashed = Contact::onlyTrashed()->pluck('id')->toArray();

        $contactEmails = DB::table('contact_email')
            ->join('emails', 'emails.id', '=', 'contact_email.email_id')
            ->join('contacts','contacts.id', '=', 'contact_email.contact_id')
            ->select('email_id', 'emails.subject', 'contact_id', 'contacts.full_name')
            ->whereIn('contact_id', $contactsTrashed)
            ->get();

        foreach ($contactEmails as $contactEmail) {
            if($doRecover) {
//                Log::info('Detach van contactEmail contactId ' . $contactEmail->contact_id . ' en contactEmailId ' . $contactEmail->email_id);
                DB::table('contact_email')
                    ->where('contact_id', $contactEmail->contact_id)
                    ->where('email_id', $contactEmail->email_id)
                    ->delete();
            }
            $contactEmailsReturn[$counter]['email-id'] = $contactEmail->email_id;
            $contactEmailsReturn[$counter]['email-subject'] = $contactEmail->subject;
            $contactEmailsReturn[$counter]['contact-id'] = $contactEmail->contact_id;
            $contactEmailsReturn[$counter]['contact-name'] = $contactEmail->full_name;
            $counter++;
        }

        return $contactEmailsReturn;
    }
}

