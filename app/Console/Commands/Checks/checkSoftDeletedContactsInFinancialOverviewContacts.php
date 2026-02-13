<?php

namespace App\Console\Commands\Checks;

use App\Eco\Contact\Contact;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkSoftDeletedContactsInFinancialOverviewContacts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:checkSoftDeletedContactsInFinancialOverviewContacts {--recover=false}';
    protected $mailTo = 'xaris@econobis.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op soft deleted contacten (id\'s) in financial overview contacts';

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

        Log::info('Procedure check op soft deleted contacten (id\'s) in financial overview contacts ' . ($doRecover ? ' MET HERSTEL!' : ''));

        $financialOverviewContactsWithDeletedContactIds = $this->getFinancialOverviewContactsWithDeletedContactIds($doRecover);

        if(!empty($financialOverviewContactsWithDeletedContactIds)) {
            $this->sendMail($financialOverviewContactsWithDeletedContactIds, $doRecover);
            Log::info('Soft deleted contacten (ids) gevonden in financial overview contacts. Mail verzonden,');
        } else {
            Log::info('Geen soft deleted contacten (ids) gevonden in financial overview contacts.');
        }

        Log::info('Procedure check op soft deleted contacten (id\'s) in financial overview contacts klaar.');

    }

    private function sendMail($financialOverviewContactsWithDeletedContactIds, $doRecover)
    {
        $subject = 'Soft deleted contacten (ids) gevonden in financial overview contacts! (' . count($financialOverviewContactsWithDeletedContactIds) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $financialOverviewContactsWithDeletedContactIdsHtml = "<p>De volgende financial overview contacts id's hebben soft deleted contacten (ids) :</p>";
        if($doRecover){
            $financialOverviewContactsWithDeletedContactIdsHtml .= "<p>MET HERSTEL!</p>";
        }
        foreach ($financialOverviewContactsWithDeletedContactIds as $financialOverviewContactsWithDeletedContactId) {
            $financialOverviewContactsWithDeletedContactIdsHtml .=
                "Financial overview contacts: " . $financialOverviewContactsWithDeletedContactId['financial-overview-contact-id'] . " | " .
                "Financial overview: " . $financialOverviewContactsWithDeletedContactId['financial-overview-id'] . " | " .
                "Contact: " . $financialOverviewContactsWithDeletedContactId['contact-id'] . " | " .
                "Status: " . $financialOverviewContactsWithDeletedContactId['status-id'] . " | " .
                "Filename: " . $financialOverviewContactsWithDeletedContactId['filename'] . " | " .
                "Name: " . $financialOverviewContactsWithDeletedContactId['name'] . " | " .
                "Date sent: " . $financialOverviewContactsWithDeletedContactId['date-sent'] . " | " .
                "Emailed to: " . $financialOverviewContactsWithDeletedContactId['emailed-to'] . " | " .
                "Created at: " . $financialOverviewContactsWithDeletedContactId['created-at'] . " | " .
                "Updated at: " . $financialOverviewContactsWithDeletedContactId['updated-at'] . "</br>"
            ;
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $financialOverviewContactsWithDeletedContactIdsHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }

    private function getFinancialOverviewContactsWithDeletedContactIds(bool $doRecover): array
    {
        $counter = 0;
        $financialOverviewContactsWithTrashedContactReturn = [];

        $contactsTrashed = Contact::onlyTrashed()->pluck('id')->toArray();

        $financialOverviewContactsWithTrashedContact = DB::table('financial_overview_contacts')
            ->whereIn('contact_id', $contactsTrashed)
            ->get();

        foreach ($financialOverviewContactsWithTrashedContact as $financialOverviewContactsWithTrashedContact) {
            if($doRecover) {
                Log::info('Delete van financialOverviewContacts met id:' . $financialOverviewContactsWithTrashedContact->id . ', financialOverviewId ' . $financialOverviewContactsWithTrashedContact->financial_overview_id . ', contactId '.$financialOverviewContactsWithTrashedContact->contact_id. ', statusId ' . $financialOverviewContactsWithTrashedContact->status_id. ', filename ' . $financialOverviewContactsWithTrashedContact->filename. ', name ' . $financialOverviewContactsWithTrashedContact->name. ', dateSent ' . $financialOverviewContactsWithTrashedContact->date_sent. ', emailedTo ' . $financialOverviewContactsWithTrashedContact->emailed_to. ', createdAt ' . $financialOverviewContactsWithTrashedContact->created_at. ' en updatedAt ' . $financialOverviewContactsWithTrashedContact->updated_at);
                DB::table('financial_overview_contacts')
                    ->where('id', $financialOverviewContactsWithTrashedContact->id)
                    ->delete();
            }
            $financialOverviewContactsWithTrashedContactReturn[$counter]['financial-overview-contact-id'] = $financialOverviewContactsWithTrashedContact->id;
            $financialOverviewContactsWithTrashedContactReturn[$counter]['financial-overview-id'] = $financialOverviewContactsWithTrashedContact->financial_overview_id;
            $financialOverviewContactsWithTrashedContactReturn[$counter]['contact-id'] = $financialOverviewContactsWithTrashedContact->contact_id;
            $financialOverviewContactsWithTrashedContactReturn[$counter]['status-id'] = $financialOverviewContactsWithTrashedContact->status_id;
            $financialOverviewContactsWithTrashedContactReturn[$counter]['filename'] = $financialOverviewContactsWithTrashedContact->filename;
            $financialOverviewContactsWithTrashedContactReturn[$counter]['name'] = $financialOverviewContactsWithTrashedContact->name;
            $financialOverviewContactsWithTrashedContactReturn[$counter]['date-sent'] = $financialOverviewContactsWithTrashedContact->date_sent;
            $financialOverviewContactsWithTrashedContactReturn[$counter]['emailed-to'] = $financialOverviewContactsWithTrashedContact->emailed_to;
            $financialOverviewContactsWithTrashedContactReturn[$counter]['created-at'] = $financialOverviewContactsWithTrashedContact->created_at;
            $financialOverviewContactsWithTrashedContactReturn[$counter]['updated-at'] = $financialOverviewContactsWithTrashedContact->updated_at;
            $counter++;
        }

        return $financialOverviewContactsWithTrashedContactReturn;
    }
}

