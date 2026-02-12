<?php

namespace App\Console\Commands\Checks;

use App\Eco\Contact\Contact;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkSoftDeletedContactsInTwinfieldLog extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:checkSoftDeletedContactsInTwinfieldLog {--recover=false}';
    protected $mailTo = 'xaris@econobis.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op soft deleted contacten (id\'s) in twinfield log waar status is contacts';

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

        Log::info('Procedure check op soft deleted contacten (id\'s) in twinfield log waar status is contacts' . ($doRecover ? ' MET HERSTEL!' : ''));

        $twinfieldLogsWithDeletedContactIds = $this->getTwinfieldLogWithDeletedContactIds($doRecover);

        if(!empty($twinfieldLogsWithDeletedContactIds)) {
            $this->sendMail($twinfieldLogsWithDeletedContactIds, $doRecover);
            Log::info('Soft deleted contacten (ids) gevonden in twinfield logs. Mail verzonden,');
        } else {
            Log::info('Geen soft deleted contacten (ids) gevonden in twinfield logs.');
        }

        Log::info('Procedure check op soft deleted contacten (id\'s) in twinfield logs klaar.');

    }

    private function sendMail($twinfieldLogsWithDeletedContactIds, $doRecover)
    {
        $subject = 'Soft deleted contacten (ids) gevonden in twinfield logs! (' . count($twinfieldLogsWithDeletedContactIds) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $twinfieldLogsWithDeletedContactIdsHtml = "<p>De twinfield log id's hebben soft deleted contacten (ids) :</p>";
        if($doRecover){
            $twinfieldLogsWithDeletedContactIdsHtml .= "<p>MET HERSTEL!</p>";
        }
        foreach ($twinfieldLogsWithDeletedContactIds as $twinfieldLogsWithDeletedContactId) {
            $twinfieldLogsWithDeletedContactIdsHtml .=
                "Id: " . $twinfieldLogsWithDeletedContactId['twinfield-log-id'] . " | " .
                "Factuur: " . $twinfieldLogsWithDeletedContactId['invoice-id'] . " | " .
                "Contact: " . $twinfieldLogsWithDeletedContactId['contact-id'] . " | " .
                "Bericht: " . $twinfieldLogsWithDeletedContactId['message-text'] . " | " .
                "Gebruiker: " . $twinfieldLogsWithDeletedContactId['user-id'] . " | " .
                "Error: " . $twinfieldLogsWithDeletedContactId['is-error'] . " | " .
                "Created at: " . $twinfieldLogsWithDeletedContactId['created-at'] . " | " .
                "Updated at: " . $twinfieldLogsWithDeletedContactId['updated-at'] . "</br>"
            ;
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $twinfieldLogsWithDeletedContactIdsHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }

    private function getTwinfieldLogWithDeletedContactIds(bool $doRecover): array
    {
        $counter = 0;
        $twinfieldLogWithTrashedContactReturn = [];

        $contactsTrashed = Contact::onlyTrashed()->pluck('id')->toArray();

        $twinfieldLogWithTrashedContact = DB::table('twinfield_log')
            ->where('message_type', 'contact')
            ->whereIn('contact_id', $contactsTrashed)
            ->get();

        foreach ($twinfieldLogWithTrashedContact as $twinfieldLogWithTrashedContact) {
            if($doRecover) {
                Log::info('Delete van twinfieldLog met id ' . $twinfieldLogWithTrashedContact->id . ', invoiceId ' . $twinfieldLogWithTrashedContact->invoice_id . ', contactId '.$twinfieldLogWithTrashedContact->contact_id. ', Bericht ' . $twinfieldLogWithTrashedContact->message_text. ', userId ' . $twinfieldLogWithTrashedContact->user_id. ', isError ' . $twinfieldLogWithTrashedContact->is_error. ', createdAt ' . $twinfieldLogWithTrashedContact->created_at. ' en updatedAt ' . $twinfieldLogWithTrashedContact->updated_at);
                DB::table('twinfield_log')
                    ->where('id', $twinfieldLogWithTrashedContact->id)
                    ->delete();
            }
            $twinfieldLogWithTrashedContactReturn[$counter]['twinfield-log-id'] = $twinfieldLogWithTrashedContact->id;
            $twinfieldLogWithTrashedContactReturn[$counter]['invoice-id'] = $twinfieldLogWithTrashedContact->invoice_id;
            $twinfieldLogWithTrashedContactReturn[$counter]['contact-id'] = $twinfieldLogWithTrashedContact->contact_id;
            $twinfieldLogWithTrashedContactReturn[$counter]['message-text'] = $twinfieldLogWithTrashedContact->message_text;
            $twinfieldLogWithTrashedContactReturn[$counter]['user-id'] = $twinfieldLogWithTrashedContact->user_id;
            $twinfieldLogWithTrashedContactReturn[$counter]['is-error'] = $twinfieldLogWithTrashedContact->is_error;
            $twinfieldLogWithTrashedContactReturn[$counter]['created-at'] = $twinfieldLogWithTrashedContact->created_at;
            $twinfieldLogWithTrashedContactReturn[$counter]['updated-at'] = $twinfieldLogWithTrashedContact->updated_at;
            $counter++;
        }

        return $twinfieldLogWithTrashedContactReturn;
    }
}

