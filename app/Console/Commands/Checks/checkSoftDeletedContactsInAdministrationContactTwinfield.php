<?php

namespace App\Console\Commands\Checks;

use App\Eco\Contact\Contact;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkSoftDeletedContactsInAdministrationContactTwinfield extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:checkSoftDeletedContactsInAdministrationContactTwinfield {--recover=false}';
    protected $mailTo = 'xaris@econobis.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op soft deleted contacten (id\'s) in administration contact Twinfield';

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

        Log::info('Procedure check op soft deleted contacten (id\'s) in administration contact Twinfield ' . ($doRecover ? ' MET HERSTEL!' : ''));

        $administrationContactTwinfieldWithDeletedContactIds = $this->getAdministrationContactTwinfieldWithDeletedContactIds($doRecover);

        if(!empty($administrationContactTwinfieldWithDeletedContactIds)) {
            $this->sendMail($administrationContactTwinfieldWithDeletedContactIds, $doRecover);
            Log::info('Soft deleted contacten (ids) gevonden in administration contact Twinfield. Mail verzonden,');
        } else {
            Log::info('Geen soft deleted contacten (ids) gevonden in administration contact Twinfield.');
        }

        Log::info('Procedure check op soft deleted contacten (id\'s) in administration contact Twinfield klaar.');

    }

    private function sendMail($administrationContactTwinfieldWithDeletedContactIds, $doRecover)
    {
        $subject = 'Soft deleted contacten (ids) gevonden in administration contact Twinfield! (' . count($administrationContactTwinfieldWithDeletedContactIds) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $administrationContactTwinfieldWithDeletedContactIdsHtml = "<p>De volgende administration contact Twinfield id's hebben soft deleted contacten (ids) :</p>";
        if($doRecover){
            $administrationContactTwinfieldWithDeletedContactIdsHtml .= "<p>MET HERSTEL!</p>";
        }
        foreach ($administrationContactTwinfieldWithDeletedContactIds as $administrationContactTwinfieldWithDeletedContactId) {
            $administrationContactTwinfieldWithDeletedContactIdsHtml .=
                "Administration contact Twinfield: " . $administrationContactTwinfieldWithDeletedContactId['administration-contact-twinfield-id'] . " | " .
                "Contact : " . $administrationContactTwinfieldWithDeletedContactId['contact-id'] . " | " .
                "Administratie : " . $administrationContactTwinfieldWithDeletedContactId['administration-id'] . " | " .
                "Twinfield nummer : " . $administrationContactTwinfieldWithDeletedContactId['twinfield-number'] . "</br>"
            ;
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $administrationContactTwinfieldWithDeletedContactIdsHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }

    private function getAdministrationContactTwinfieldWithDeletedContactIds(bool $doRecover): array
    {
        $counter = 0;
        $administrationContactTwinfieldReturn = [];

        $contactsTrashed = Contact::onlyTrashed()->pluck('id')->toArray();

        $administrationContactTwinfieldsWithTrashedContact = DB::table('administration_contact_twinfield')
            ->whereIn('contact_id', $contactsTrashed)
            ->get();

        foreach ($administrationContactTwinfieldsWithTrashedContact as $administrationContactTwinfield) {
            if($doRecover) {
                Log::info('Delete van administrationContactTwinfield met id:' . $administrationContactTwinfield->id.  ', contactId ' . $administrationContactTwinfield->contact_id . ', administrationId '.$administrationContactTwinfield->administration_id. ' en twinfieldNumber ' . $administrationContactTwinfield->twinfield_number);
                DB::table('administration_contact_twinfield')
                    ->where('id', $administrationContactTwinfield->id)
                    ->delete();
            }
            $administrationContactTwinfieldReturn[$counter]['administration-contact-twinfield-id'] = $administrationContactTwinfield->id;
            $administrationContactTwinfieldReturn[$counter]['contact-id'] = $administrationContactTwinfield->contact_id;
            $administrationContactTwinfieldReturn[$counter]['administration-id'] = $administrationContactTwinfield->administration_id;
            $administrationContactTwinfieldReturn[$counter]['twinfield-number'] = $administrationContactTwinfield->twinfield_number;
            $counter++;
        }

        return $administrationContactTwinfieldReturn;
    }
}

