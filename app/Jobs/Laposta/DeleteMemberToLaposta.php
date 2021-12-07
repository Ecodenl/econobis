<?php

namespace App\Jobs\Laposta;

use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactType;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Jobs\JobsLog;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
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

        $jobLog = new JobsLog();
        $jobLog->value = 'Start Verwijderen relatie '.$this->contact->primaryEmailAddress->email.' in Laposta.';
        $jobLog->user_id = $userId;
        $jobLog->job_category_id = 'sync-laposta';
        $jobLog->save();
    }

    public function handle()
    {
        Laposta::setApiKey($this->lapostaKey);

        $member = new Laposta_Member($this->contactGroup->laposta_list_id ? $this->contactGroup->laposta_list_id : '');

        try {
            sleep(1);
            $lapostaResponse = $member->delete($this->lapostaMemberId);

            if($this->contactGroup->contacts()->where('contact_id', $this->contact->id)->exists()){
                $this->contactGroup->contacts()->updateExistingPivot($this->contact->id, [
                    'laposta_member_id' => null,
                    'laposta_member_state' => null,
                ]);
            }

            $value = 'Relatie '.$this->contact->primaryEmailAddress->email.') in Laposta verwijderd.';
            $jobLog = new JobsLog();
            $jobLog->value = $value;
            $jobLog->user_id = $this->userId;
            $jobLog->job_category_id = 'sync-laposta';
            $jobLog->save();

        } catch (\Exception $e) {
            $message = 'Groep: ' . $this->contactGroup->name . ' - Fout bij het verwijderen van gekoppelde Laposta relatie  ' . $this->contact->primaryEmailAddress->email . '), melding Laposta: ' ;
            if ($e->getMessage()) {
                $message = $message . $e->getMessage();
            } else {
                $message = $message . 'Onbekend';
            }
            Log::error( $message . '. Contactgroup id: ' . $this->contactGroup->id . '. Http status: ' . ($e->getHttpStatus() ? $e->getHttpStatus() : '') . '.');
            $value = strlen($message)>191 ? (substr($message,0,188) . '...') : $message;
            $jobLog = new JobsLog();
            $jobLog->value = $value;
            $jobLog->user_id = $this->userId;
            $jobLog->job_category_id = 'sync-laposta';
            $jobLog->save();
        }
    }

    public function failed(\Exception $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = 'Verwijderen relatie '.$this->contact->primaryEmailAddress->email.' in Laposta mislukt.';
        $jobLog->user_id = $this->userId;
        $jobLog->job_category_id = 'sync-laposta';
        $jobLog->save();

        Log::error('Verwijderen relatie '.$this->contact->primaryEmailAddress->email.' in Laposta mislukt: ' . $exception->getMessage());
    }

}