<?php

namespace App\Console\Commands\Checks;

use App\Eco\Email\Email;
use App\Eco\EmailAddress\EmailAddress;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkSoftDeletedEmailAddressesInEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:checkSoftDeletedEmailAddressesInEmails {--recover=false} {--from=2026}';
    protected $mailTo = 'xaris@econobis.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op soft deleted emailaddressen (id\'s) in emails';

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
        $fromYear = $this->option('from');

        Log::info('Procedure check op soft deleted emailaddressen (id\'s) in emails vanaf jaar ' . $fromYear . ($doRecover ? ' MET HERSTEL!' : ''));

        $emailsWithDeletedEmailAddressesIds = [];

        $emails = Email::where('created_at', '>=', $fromYear . '-01-01 00:00:00')->get();
        $counter = 1;
        $emailsWithDeletedEmailAddressesIds = $this->getDeletedEmailAddressesIds($emails, 'to', $counter, $doRecover);
        $emailsWithDeletedEmailAddressesIds = array_merge($emailsWithDeletedEmailAddressesIds,  $this->getDeletedEmailAddressesIds($emails, 'cc', $counter, $doRecover));
        $emailsWithDeletedEmailAddressesIds = array_merge($emailsWithDeletedEmailAddressesIds,  $this->getDeletedEmailAddressesIds($emails, 'bcc', $counter, $doRecover));

        if(!empty($emailsWithDeletedEmailAddressesIds)) {
            $this->sendMail($emailsWithDeletedEmailAddressesIds, $doRecover, $fromYear);
            Log::info('Soft deleted emailadressen (ids) gevonden in emails. Mail verzonden,');
        } else {
            Log::info('Geen soft deleted emailadressen (ids) gevonden in emails.');
        }

        Log::info('Procedure check op soft deleted emailaddressen (id\'s) in emails vanaf jaar ' . $fromYear .' klaar.');

    }

    private function sendMail($emailsWithDeletedEmailAddressesIds, $doRecover, $fromYear)
    {
        $subject = 'Soft deleted emailadressen (ids) vanaf jaar ' . $fromYear . ' gevonden in emails! (' . count($emailsWithDeletedEmailAddressesIds) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $emailsWithDeletedEmailAddressesIdsHtml = "<p>De volgende email id's vanaf jaar " . $fromYear . " hebben soft deleted emailadressen (ids) :</p>";
        if($doRecover){
            $emailsWithDeletedEmailAddressesIdsHtml .= "<p>MET HERSTEL!</p>";
        }
        foreach ($emailsWithDeletedEmailAddressesIds as $emailWithDeletedEmailAddressesIds) {
            $emailsWithDeletedEmailAddressesIdsHtml .=
                "Email Id: " . $emailWithDeletedEmailAddressesIds['id'] . "</br>" .
                "Fout reden: " . $emailWithDeletedEmailAddressesIds['reason'] . "</br><br>"
            ;
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $emailsWithDeletedEmailAddressesIdsHtml . '</body></html>';

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
    private function getDeletedEmailAddressesIds(\Illuminate\Database\Eloquent\Collection $emails, string $emailRecipientType, int $counter, bool $doRecover): array
    {
        $emailsIds = [];

        foreach ($emails as $email) {

            switch ($emailRecipientType) {
                case 'to':
                    $field = $email->to;
                    break;
                case 'cc':
                    $field = $email->cc;
                    break;
                case 'bcc':
                    $field = $email->bcc;
                    break;
                default:
                    $field = null;
            }
//            Log::info($field);

            $toBeChanged = false;
            if (is_array($field)) {

                foreach ($field as &$recipient) {
                    if (is_numeric($recipient)) {
                        $emailAddress = EmailAddress::withTrashed()->find($recipient);
                        if (!$emailAddress) {
                            $emailsIds[$counter]['id'] = $email->id;
                            $emailsIds[$counter]['reason'] = 'Folder ' . $email->folder . ', emailaddress bij ' . $emailRecipientType . ' ' . $recipient . ' niet gevonden!';
                        } else {

                            // Indien niet concept dan altijd emailadres ID omzetten naar emailadres emailadres
                            if ($email->folder != 'concept') {
                                $emailsIds[$counter]['id'] = $email->id;
                                $emailsIds[$counter]['reason'] = 'Folder ' . $email->folder . ', emailaddress id bij ' . $emailRecipientType . ' ' . $recipient . ' gevonden in niet concept email, vervangen door emailadres: ' . $emailAddress->email;
                                $toBeChanged = true;
                                $recipient = $emailAddress->email;
                            // Indien concept dan emailadres ID alleen vervangen door emailadres emailadres indien softdeleted
                            } else if ($emailAddress && $emailAddress->deleted_at != null) {
                                $emailsIds[$counter]['id'] = $email->id;
                                $emailsIds[$counter]['reason'] = 'Folder ' . $email->folder . ', softdeleted emailaddress id bij ' . $emailRecipientType . ' ' . $recipient . ' gevonden in concept email, vervangen door emailadres: ' . $emailAddress->email;
                                $toBeChanged = true;
                                $recipient = $emailAddress->email;
                            }

                        }
                    }

                    $counter++;
                }

            }

            if($toBeChanged){
//                Log::info('To be changed');
//                Log::info($field);

                switch ($emailRecipientType) {
                    case 'to':
                        $email->to  = $field;
                        break;
                    case 'cc':
                        $email->cc  = $field;
                        break;
                    case 'bcc':
                        $email->bcc  = $field;
                        break;
                }

                if($doRecover){
                    $email->save();
                }
            }

        }
        return $emailsIds;
    }
}

