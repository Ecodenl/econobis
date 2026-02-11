<?php

namespace App\Console\Commands\Checks;

use App\Eco\Contact\Contact;
use App\Helpers\Delete\Models\DeletePhoneNumber;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkSoftDeletedContactsInPhoneNumbers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:checkSoftDeletedContactsInPhoneNumbers {--recover=false}';
    protected $mailTo = 'xaris@econobis.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op soft deleted contacten (id\'s) in contact telefoonnummers niet soft deleted';

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

        Log::info('Procedure check op soft deleted contacten (id\'s) in contact telefoonnummers niet soft deleted ' . ($doRecover ? ' MET HERSTEL!' : ''));

        $phoneNumbersWithDeletedContactIds = $this->getPhoneNumbersWithDeletedContactIds($doRecover);

        if(!empty($phoneNumbersWithDeletedContactIds)) {
            $this->sendMail($phoneNumbersWithDeletedContactIds, $doRecover);
            Log::info('Soft deleted contacten (ids) gevonden in contact telefoonnummers niet soft deleted. Mail verzonden,');
        } else {
            Log::info('Geen soft deleted contacten (ids) gevonden in contact telefoonnummers niet soft deleted.');
        }

        Log::info('Procedure check op soft deleted contacten (id\'s) in contact telefoonnummers niet soft deleted klaar.');

    }

    private function sendMail($phoneNumbersWithDeletedContactIds, $doRecover)
    {
        $subject = 'Soft deleted contacten (ids) gevonden in contact phonenumbers! (' . count($phoneNumbersWithDeletedContactIds) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $phoneNumbersWithDeletedContactIdsHtml = "<p>De volgende contact phone_numbers id's (niet softdeleted) hebben soft deleted contacten (ids) :</p>";
        if($doRecover){
            $phoneNumbersWithDeletedContactIdsHtml .= "<p>MET HERSTEL!</p>";
        }
        foreach ($phoneNumbersWithDeletedContactIds as $phoneNumberWithDeletedContactIds) {
            $phoneNumbersWithDeletedContactIdsHtml .=
                "Telefoonnummer: " . $phoneNumberWithDeletedContactIds['phonenumber-id'] . " " . $phoneNumberWithDeletedContactIds['phonenumber'] . " | " .
                "Contact : " . $phoneNumberWithDeletedContactIds['contact-id'] . " " . $phoneNumberWithDeletedContactIds['contact-name'] . "</br>"
            ;
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $phoneNumbersWithDeletedContactIdsHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }

    private function getPhoneNumbersWithDeletedContactIds(bool $doRecover): array
    {
        $counter = 0;
        $phoneNumbersReturn = [];

        $contactsTrashed = Contact::onlyTrashed()->pluck('id')->toArray();

        $phoneNumbers = DB::table('phone_numbers')
            ->join('contacts','contacts.id', '=', 'phone_numbers.contact_id')
            ->select('phone_numbers.id', 'phone_numbers.number', 'phone_numbers.contact_id', 'contacts.full_name')
            ->whereIn('contact_id', $contactsTrashed)
            ->where('phone_numbers.deleted_at', null)
            ->get();

        foreach ($phoneNumbers as $phoneNumber) {
            if($doRecover) {
//                Log::info('Delete van telefoonnummer contactId ' . $phoneNumber->contact_id . ' en phoneNumberId ' . $phoneNumber->id);
                DB::table('phone_numbers')->where('id', $phoneNumber->id)->update([
                    'deleted_at' => now(),
                ]);
            }
            $phoneNumbersReturn[$counter]['phonenumber-id'] = $phoneNumber->id;
            $phoneNumbersReturn[$counter]['phonenumber'] = $phoneNumber->number;
            $phoneNumbersReturn[$counter]['contact-id'] = $phoneNumber->contact_id;
            $phoneNumbersReturn[$counter]['contact-name'] = $phoneNumber->full_name;
            $counter++;
        }

        return $phoneNumbersReturn;
    }
}

