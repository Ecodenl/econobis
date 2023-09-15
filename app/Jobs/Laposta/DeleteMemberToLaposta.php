<?php

namespace App\Jobs\Laposta;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Laposta;
use Laposta_Member;

class DeleteMemberToLaposta implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $lapostaKey;
    private $contactGroup;
    private $contact;
    private $lapostaMemberId;
    private $userId;

    public function __construct($lapostaKey, ContactGroup $contactGroup, Contact $contact, $lapostaMemberId, $userId)
    {
        $this->lapostaKey = $lapostaKey;
        $this->contactGroup = $contactGroup;
        $this->contact = $contact;
        $this->lapostaMemberId = $lapostaMemberId;
        $this->userId = $userId;
    }

    public function handle()
    {
        Laposta::setApiKey($this->lapostaKey);

        $member = new Laposta_Member($this->contactGroup->laposta_list_id ? $this->contactGroup->laposta_list_id : '');

        try {
            // wait for 1,5 second
            sleep(1);
            usleep(500000);
            $lapostaResponse = $member->delete($this->lapostaMemberId);

            if($this->contactGroup->contacts()->where('contact_id', $this->contact->id)->exists()){
                $this->contactGroup->contacts()->updateExistingPivot($this->contact->id, [
                    'laposta_member_id' => null,
                    'laposta_member_state' => null,
                    'laposta_last_error_message' => null,
                ]);
            }
        } catch (\Exception $e) {
            // Mogelijke foutmeldingen laposta:
            // 'Connection error: TCP connection reset by peer ...'
            // 'API error: Email address exists ...'
            // 'API error: No valid API-key provided ...'
            // 'API error: Missing required parameter list_id ...'
            // 'API error: Unknown list%'
            // 'API error: Rate limit exceeded ...';
            if ($e->getMessage()) {
                $message = strlen($e->getMessage())>191 ? (substr($e->getMessage(),0,188) . '...') : $e->getMessage();
            } else {
                $message = 'Fout onbekend';
            }
//            $this->contactGroup->contacts()->updateExistingPivot($this->contact->id, ['laposta_member_state' => 'unknown', 'laposta_last_error_message' => $message]);
            $this->contactGroup->contacts()->updateExistingPivot($this->contact->id, ['laposta_last_error_message' => $message]);
        }
    }

    public function failed(\Throwable $exception)
    {
    }

}