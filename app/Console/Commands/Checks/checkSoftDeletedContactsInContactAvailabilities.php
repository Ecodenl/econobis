<?php

namespace App\Console\Commands\Checks;

use App\Eco\Contact\Contact;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkSoftDeletedContactsInContactAvailabilities extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:checkSoftDeletedContactsInContactAvailabilities {--recover=false}';
    //protected $mailTo = 'xaris@econobis.nl';
    protected $mailTo = 'patrick.koeman@xaris.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op soft deleted contacten (id\'s) in contact availabilities';

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

        Log::info('Procedure check op soft deleted contacten (id\'s) in contact availabilities ' . ($doRecover ? ' MET HERSTEL!' : ''));

        $contactAvailabilitiesWithDeletedContactIds = $this->getContactAvailabilitiesWithDeletedContactIds($doRecover);

        if(!empty($contactAvailabilitiesWithDeletedContactIds)) {
            $this->sendMail($contactAvailabilitiesWithDeletedContactIds, $doRecover);
            Log::info('Soft deleted contacten (ids) gevonden in contact availabilities. Mail verzonden,');
        } else {
            Log::info('Geen soft deleted contacten (ids) gevonden in contact availabilities.');
        }

        Log::info('Procedure check op soft deleted contacten (id\'s) in contact availabilities klaar.');

    }

    private function sendMail($contactAvailabilitiesWithDeletedContactIds, $doRecover)
    {
        $subject = 'Soft deleted contacten (ids) gevonden in contact availabilities! (' . count($contactAvailabilitiesWithDeletedContactIds) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $contactAvailabilitiesWithDeletedContactIdsHtml = "<p>De volgende contact availabilities id's hebben soft deleted contacten (ids) :</p>";
        if($doRecover){
            $contactAvailabilitiesWithDeletedContactIdsHtml .= "<p>MET HERSTEL!</p>";
        }
        foreach ($contactAvailabilitiesWithDeletedContactIds as $contactAvailabilitiesWithDeletedContactId) {
            $contactAvailabilitiesWithDeletedContactIdsHtml .=
                "Contact availabilities: " . $contactAvailabilitiesWithDeletedContactId['contact-availabilities-id'] . " | " .
                "Contact : " . $contactAvailabilitiesWithDeletedContactId['contact-id'] . " | " .
                "From : " . $contactAvailabilitiesWithDeletedContactId['from'] . " | " .
                "To : " . $contactAvailabilitiesWithDeletedContactId['to'] . " | " .
                "Created at : " . $contactAvailabilitiesWithDeletedContactId['created-at'] . " | " .
                "Updated at : " . $contactAvailabilitiesWithDeletedContactId['updated-at'] . "</br>"
            ;
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $contactAvailabilitiesWithDeletedContactIdsHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }

    private function getContactAvailabilitiesWithDeletedContactIds(bool $doRecover): array
    {
        $counter = 0;
        $contactAvailabilitiesWithTrashedContactReturn = [];

        $contactsTrashed = Contact::onlyTrashed()->pluck('id')->toArray();

        $contactAvailabilitiesWithTrashedContact = DB::table('contact_availabilities')
            ->whereIn('contact_id', $contactsTrashed)
            ->get();

        foreach ($contactAvailabilitiesWithTrashedContact as $contactAvailabilityWithTrashedContact) {
            if($doRecover) {
                Log::info('Delete van contactAvailabilities met contactId ' . $contactAvailabilityWithTrashedContact->contact_id . ', from '.$contactAvailabilityWithTrashedContact->from. ', to ' . $contactAvailabilityWithTrashedContact->to. ', createdAt ' . $contactAvailabilityWithTrashedContact->created_at. ' en updatedAt ' . $contactAvailabilityWithTrashedContact->updated_at);
                DB::table('contact_availabilities')
                    ->where('id', $contactAvailabilityWithTrashedContact->id)
                    ->delete();
            }
            $contactAvailabilitiesWithTrashedContactReturn[$counter]['contact-availabilities-id'] = $contactAvailabilityWithTrashedContact->id;
            $contactAvailabilitiesWithTrashedContactReturn[$counter]['contact-id'] = $contactAvailabilityWithTrashedContact->contact_id;
            $contactAvailabilitiesWithTrashedContactReturn[$counter]['from'] = $contactAvailabilityWithTrashedContact->from;
            $contactAvailabilitiesWithTrashedContactReturn[$counter]['to'] = $contactAvailabilityWithTrashedContact->to;
            $contactAvailabilitiesWithTrashedContactReturn[$counter]['created-at'] = $contactAvailabilityWithTrashedContact->created_at;
            $contactAvailabilitiesWithTrashedContactReturn[$counter]['updated-at'] = $contactAvailabilityWithTrashedContact->updated_at;
            $counter++;
        }

        return $contactAvailabilitiesWithTrashedContactReturn;
    }
}

