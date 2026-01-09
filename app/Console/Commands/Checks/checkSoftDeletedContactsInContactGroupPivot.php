<?php

namespace App\Console\Commands\Checks;

use App\Eco\ContactGroup\ContactGroup;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkSoftDeletedContactsInContactGroupPivot extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:checkSoftDeletedContactsInContactGroupPivot {--recover=false}';
    //protected $mailTo = 'xaris@econobis.nl';
    protected $mailTo = 'patrick.koeman@xaris.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op soft deleted contacten (id\'s) in contact groepen';

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

        Log::info('Procedure check op soft deleted contacten (id\'s) in contact groepen ' . ($doRecover ? ' MET HERSTEL!' : ''));

        $contactGroupsWithDeletedContactIds = $this->getContactGroupsWithDeletedContactIds($doRecover);

        if(!empty($contactGroupsWithDeletedContactIds)) {
            $this->sendMail($contactGroupsWithDeletedContactIds, $doRecover);
            Log::info('Soft deleted contacten (ids) gevonden in contact groepen. Mail verzonden,');
        } else {
            Log::info('Geen soft deleted contacten (ids) gevonden in contact groepen.');
        }

        Log::info('Procedure check op soft deleted contacten (id\'s) in contact groepen klaar.');

    }

    private function sendMail($contactGroupsWithDeletedContactIds, $doRecover)
    {
        $subject = 'Soft deleted contacten (ids) gevonden in contact groepen! - ' . \Config::get('app.APP_COOP_NAME');

        $contactGroupsWithDeletedContactIdsHtml = "<p>De volgende contacten groepen id's hebben soft deleted contacten (ids) :</p>";
        if($doRecover){
            $contactGroupsWithDeletedContactIdsHtml .= "<p>MET HERSTEL!</p>";
        }
        foreach ($contactGroupsWithDeletedContactIds as $contactGroupWithDeletedContactIds) {
            $contactGroupsWithDeletedContactIdsHtml .=
                "Contact groep Id: " . $contactGroupWithDeletedContactIds['group-id'] . "</br>" .
                "Contact id's: " . $contactGroupWithDeletedContactIds['deleted-contacts'] . "</br><br>"
            ;
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $contactGroupsWithDeletedContactIdsHtml . '</body></html>';

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
    private function getContactGroupsWithDeletedContactIds(bool $doRecover): array
    {
        $counter = 0;
        $contactGroupsReturn = [];

        $contactGroups = ContactGroup::with(['contacts' => fn ($q) => $q->withTrashed()])->get();

        foreach ($contactGroups as $contactGroup) {
            $deletedContacts = [];

            foreach ($contactGroup->contacts as $contact) {
                if ($contact->trashed()) {
                    $deletedContacts[] = $contact->id;

                    if($doRecover) {
                        $contactGroup->contacts()->detach($contact->id);
                    }
                }
            }

            if(count($deletedContacts) > 0) {
                $contactGroupsReturn[$counter]['group-id'] = $contactGroup->id;
                $contactGroupsReturn[$counter]['deleted-contacts'] = implode(',', $deletedContacts);
                $counter++;
            }
        }

        return $contactGroupsReturn;
    }
}

