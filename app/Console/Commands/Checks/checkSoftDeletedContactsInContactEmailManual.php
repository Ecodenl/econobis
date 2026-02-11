<?php

namespace App\Console\Commands\Checks;

use App\Eco\Contact\Contact;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkSoftDeletedContactsInContactEmailManual extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:checkSoftDeletedContactsInContactEmailManual {--recover=false}';
    protected $mailTo = 'xaris@econobis.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op soft deleted contacten (id\'s) in contact emails manual';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // met of zonder herstel?
        $doRecover = $this->option('recover') == 'true';

        Log::info('Procedure check op soft deleted contacten (id\'s) in contact emails manual ' . ($doRecover ? ' MET HERSTEL!' : ''));

        $contactEmailManualsWithDeletedContactIds = $this->getContactEmailManualsWithDeletedContactIds($doRecover);

        if(!empty($contactEmailManualsWithDeletedContactIds)) {
            $this->sendMail($contactEmailManualsWithDeletedContactIds, $doRecover);
            Log::info('Soft deleted contacten (ids) gevonden in contact emails manual. Mail verzonden,');
        } else {
            Log::info('Geen soft deleted contacten (ids) gevonden in contact emails manual.');
        }

        Log::info('Procedure check op soft deleted contacten (id\'s) in contact emails manual klaar.');

    }

    private function sendMail($contactEmailManualsWithDeletedContactIds, $doRecover)
    {
        $subject = 'Soft deleted contacten (ids) gevonden in contact emails manual! (' . count($contactEmailManualsWithDeletedContactIds) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $contactEmailManualsWithDeletedContactIdsHtml = "<p>De volgende contact email manual id's hebben soft deleted contacten (ids) :</p>";
        if($doRecover){
            $contactEmailManualsWithDeletedContactIdsHtml .= "<p>MET HERSTEL!</p>";
        }
        foreach ($contactEmailManualsWithDeletedContactIds as $contactEmailManualWithDeletedContactIds) {
            $contactEmailManualsWithDeletedContactIdsHtml .=
                "Email: " . $contactEmailManualWithDeletedContactIds['email-id'] . " " . $contactEmailManualWithDeletedContactIds['email-subject'] . " | " .
                "Contact : " . $contactEmailManualWithDeletedContactIds['contact-id'] . " " . $contactEmailManualWithDeletedContactIds['contact-name'] . "</br>"
            ;
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $contactEmailManualsWithDeletedContactIdsHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }

    /**
     * @param \Illuminate\Database\Eloquent\Collection $emails
     * @param string $emailRecipientType
     * @param array $emailsWithDeletedEmailAddressesIds
     * @param int $counter
     * @return array
     */
    private function getContactEmailManualsWithDeletedContactIds(bool $doRecover): array
    {
        $counter = 0;
        $contactEmailManualsReturn = [];

        $contactsTrashed = Contact::onlyTrashed()->pluck('id')->toArray();

        $contactEmailManuals = DB::table('contact_email_manual')
            ->join('emails', 'emails.id', '=', 'contact_email_manual.email_id')
            ->join('contacts','contacts.id', '=', 'contact_email_manual.contact_id')
            ->select('email_id', 'emails.subject', 'contact_id', 'contacts.full_name')
            ->whereIn('contact_id', $contactsTrashed)
            ->get();

        foreach ($contactEmailManuals as $contactEmailManual) {
            if($doRecover) {
//                Log::info('Detach van contactEmailManual contactId ' . $contactEmailManual->contact_id . ' en contactEmailManualId ' . $contactEmailManual->email_id);
                DB::table('contact_email_manual')
                    ->where('contact_id', $contactEmailManual->contact_id)
                    ->where('email_id', $contactEmailManual->email_id)
                    ->delete();
            }
            $contactEmailManualsReturn[$counter]['email-id'] = $contactEmailManual->email_id;
            $contactEmailManualsReturn[$counter]['email-subject'] = $contactEmailManual->subject;
            $contactEmailManualsReturn[$counter]['contact-id'] = $contactEmailManual->contact_id;
            $contactEmailManualsReturn[$counter]['contact-name'] = $contactEmailManual->full_name;
            $counter++;
        }

        return $contactEmailManualsReturn;
    }
}

