<?php

namespace App\Console\Commands\Checks;

use App\Eco\Contact\Contact;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkSoftDeletedContactsInContactNotes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:checkSoftDeletedContactsInContactNotes {--recover=false}';
    protected $mailTo = 'xaris@econobis.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op soft deleted contacten (id\'s) in contact notes';

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

        Log::info('Procedure check op soft deleted contacten (id\'s) in contact notes ' . ($doRecover ? ' MET HERSTEL!' : ''));

        $contactNotesWithDeletedContactIds = $this->getContactNotesWithDeletedContactIds($doRecover);

        if(!empty($contactNotesWithDeletedContactIds)) {
            $this->sendMail($contactNotesWithDeletedContactIds, $doRecover);
            Log::info('Soft deleted contacten (ids) gevonden in contact notes. Mail verzonden,');
        } else {
            Log::info('Geen soft deleted contacten (ids) gevonden in contact notes.');
        }

        Log::info('Procedure check op soft deleted contacten (id\'s) in contact notes klaar.');

    }

    private function sendMail($contactNotesWithDeletedContactIds, $doRecover)
    {
        $subject = 'Soft deleted contacten (ids) gevonden in contact notes! (' . count($contactNotesWithDeletedContactIds) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $contactNotesWithDeletedContactIdsHtml = "<p>De volgende contact note id's hebben soft deleted contacten (ids) :</p>";
        if($doRecover){
            $contactNotesWithDeletedContactIdsHtml .= "<p>MET HERSTEL!</p>";
        }
        foreach ($contactNotesWithDeletedContactIds as $contactNoteWithDeletedContactIds) {
            $contactNotesWithDeletedContactIdsHtml .=
                "Note: " . $contactNoteWithDeletedContactIds['note-id'] . " " . $contactNoteWithDeletedContactIds['note'] . " | " .
                "Contact : " . $contactNoteWithDeletedContactIds['contact-id'] . " " . $contactNoteWithDeletedContactIds['contact-name'] . "</br>"
            ;
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $contactNotesWithDeletedContactIdsHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }

    private function getContactNotesWithDeletedContactIds(bool $doRecover): array
    {
        $counter = 0;
        $contactNotesReturn = [];

        $contactsTrashed = Contact::onlyTrashed()->pluck('id')->toArray();

        $contactNotes = DB::table('contact_notes')
            ->join('contacts','contacts.id', '=', 'contact_notes.contact_id')
            ->select('contact_notes.id', 'contact_notes.note', 'contact_notes.contact_id', 'contacts.full_name')
            ->whereIn('contact_id', $contactsTrashed)
            ->get();

        foreach ($contactNotes as $contactNote) {
            if($doRecover) {
                Log::info('Detach van contactNote contactId ' . $contactNote->contact_id . ' en contactNoteId ' . $contactNote->id);
                DB::table('contact_notes')
                    ->where('contact_id', $contactNote->contact_id)
                    ->delete();
            }
            $contactNotesReturn[$counter]['note-id'] = $contactNote->id;
            $contactNotesReturn[$counter]['note'] = substr($contactNote->note, 0, 20) . ' (' . strlen($contactNote->note) . ' lang)';
            $contactNotesReturn[$counter]['contact-id'] = $contactNote->contact_id;
            $contactNotesReturn[$counter]['contact-name'] = $contactNote->full_name;
            $counter++;
        }

        return $contactNotesReturn;
    }
}

