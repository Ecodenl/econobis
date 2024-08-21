<?php

namespace App\Console\Commands;

use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkWrongDateEntryParticipation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'participation:checkWrongDateEntry';
    protected $mailTo = 'patrick.koeman@xaris.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check wrong Date Entry for Participations';

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
        Log::info('Procedure check op ongeldige eerste ingangsdatum deelnames gestart');

        $participationsWithWrongDateEntries = DB::select(DB::raw('SELECT a.id, a.participation_id, a.type_id, a.date_entry, b.id , b.type_id, b.date_entry FROM participant_mutations as a, participant_mutations as b
            where a.participation_id = b.participation_id
            and a.type_id = 1
            and b.type_id = 2
            and a.date_entry > b.date_entry
            order by a.participation_id'));

        if(count($participationsWithWrongDateEntries) > 0) {
            $this->sendMail($participationsWithWrongDateEntries);
            Log::info('Ongeldige eerste ingangsdatum deelnemers, mail gestuurd.');
        } else {
            Log::info('Geen ongeldige eerste ingangsdatum deelnemers gevonden.');
        }

        Log::info('Procedure check op ongeldige eerste ingangsdatum deelnames klaar.');
    }

    private function sendMail($participationsWithWrongDateEntries)
    {
        $subject = 'Ongeldige eerste ingangsdatum deelnames! (' . count($participationsWithWrongDateEntries) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $participationsWithWrongDateEntriesHtml = "<p>De volgende deelname id's hebben een ongeldige eerste ingangsdatum:</p>";

        foreach ($participationsWithWrongDateEntries as $participationsWithWrongDateEntry) {
            $participationsWithWrongDateEntriesHtml .=
                "Deelnemer Id: " . $participationsWithWrongDateEntry->participation_id . "</br>" .
                "Mutatie Id: " . $participationsWithWrongDateEntry->id . "</br><br>"
            ;
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $participationsWithWrongDateEntriesHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}

