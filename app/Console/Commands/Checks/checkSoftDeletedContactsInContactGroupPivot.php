<?php

namespace App\Console\Commands\Checks;

use App\Eco\Contact\Contact;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
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
    protected $mailTo = 'xaris@econobis.nl';

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
        $subject = 'Soft deleted contacten (ids) gevonden in contact groepen! (' . count($contactGroupsWithDeletedContactIds) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $contactGroupsWithDeletedContactIdsHtml = "<p>De volgende contacten groepen id's hebben soft deleted contacten (ids) :</p>";
        if($doRecover){
            $contactGroupsWithDeletedContactIdsHtml .= "<p>MET HERSTEL!</p>";
        }
        foreach ($contactGroupsWithDeletedContactIds as $contactGroupWithDeletedContactIds) {
            $contactGroupsWithDeletedContactIdsHtml .=
                "Contact groep: " . $contactGroupWithDeletedContactIds['group-id'] . " " . $contactGroupWithDeletedContactIds['group-name'] . " | " .
                "Contact : " . $contactGroupWithDeletedContactIds['contact-id'] . " " . $contactGroupWithDeletedContactIds['contact-name'] . "</br>"
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

        $contactsTrashed = Contact::onlyTrashed()->pluck('id')->toArray();

        $contactGroupPivots = DB::table('contact_groups_pivot')
            ->join('contact_groups', 'contact_groups.id', '=', 'contact_groups_pivot.contact_group_id')
            ->join('contacts','contacts.id', '=', 'contact_groups_pivot.contact_id')
            ->select('contact_group_id', 'contact_groups.name', 'contact_id', 'contacts.full_name')
            ->whereIn('contact_id', $contactsTrashed)
            ->get();

        foreach ($contactGroupPivots as $contactGroupPivot) {
            if($doRecover) {
//                Log::info('Detach van contactGroupPivot contactId ' . $contactGroupPivot->contact_id . ' en contactGroupId ' . $contactGroupPivot->contact_group_id);
                DB::table('contact_groups_pivot')
                    ->where('contact_id', $contactGroupPivot->contact_id)
                    ->where('contact_group_id', $contactGroupPivot->contact_group_id)
                    ->delete();
            }
            $contactGroupsReturn[$counter]['group-id'] = $contactGroupPivot->contact_group_id;
            $contactGroupsReturn[$counter]['group-name'] = $contactGroupPivot->name;
            $contactGroupsReturn[$counter]['contact-id'] = $contactGroupPivot->contact_id;
            $contactGroupsReturn[$counter]['contact-name'] = $contactGroupPivot->full_name;
            $counter++;
        }

        return $contactGroupsReturn;
    }
}

