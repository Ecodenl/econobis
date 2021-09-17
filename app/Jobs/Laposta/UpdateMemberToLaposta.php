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

class UpdateMemberToLaposta implements ShouldQueue
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
//        $this->contactGroupsPivot = null;
//        if($contactGroup->contacts()->where('contact_id', $contact->id)->exists()){
//            $this->contactGroupsPivot = $contactGroup->contacts()->where('contact_id', $contact->id)->first()->pivot;
//        }
        $this->userId = $userId;

        $jobLog = new JobsLog();
        $jobLog->value = 'Start synchroniseren relatie '.$this->contact->primaryEmailAddress->email.' in Laposta.';
        $jobLog->user_id = $userId;
        $jobLog->job_category_id = 'sync-laposta';
        $jobLog->save();
    }

    public function handle()
    {
//        $contactGroupsPivot = null;
//        if($this->contactGroup->contacts()->where('contact_id', $this->contact->id)->exists()){
//            $contactGroupsPivot = $this->contactGroup->contacts()->where('contact_id', $this->contact->id)->first()->pivot;
//        }

        Laposta::setApiKey($this->lapostaKey);

        $member = new Laposta_Member($this->contactGroup->laposta_list_id ? $this->contactGroup->laposta_list_id : '');
        $memberFieldData = [];
        if($this->contact->type_id === ContactType::PERSON) {
            $memberFieldData = [
                'contactnummer' => $this->contact->number ? $this->contact->number : '',
                'contactvoornaam' => $this->contact->person->first_name ? $this->contact->person->first_name : ($this->contact->person->initials ? $this->contact->person->initials : ''),
                'contacttitel' => $this->contact->person->title ? $this->contact->person->title->name : '',
                'contactachternaam' => $this->contact->person->last_name . ($this->contact->person->last_name_prefix ? ', ' . $this->contact->person->last_name_prefix : ''),
            ];
        }
        if($this->contact->type_id === ContactType::ORGANISATION) {
            $memberFieldData = [
                'contactnummer' => $this->contact->number ? $this->contact->number : '',
                'contactachternaam' => $this->contact->full_name ? $this->contact->full_name : '',
            ];
        }

        $memberData = [
            'email' => $this->contact->primaryEmailAddress->email ? $this->contact->primaryEmailAddress->email : '',
            'custom_fields' => $memberFieldData,
        ];

        try {
//            $lapostaResponse = $member->update($contactGroupsPivot->laposta_member_id, $memberData);
            $lapostaResponse = $member->update($this->lapostaMemberId, $memberData);

            $lapostaMemberState = $lapostaResponse['member']['state'];
            $this->contactGroup->contacts()->updateExistingPivot($this->contact->id,
                [
                    'laposta_member_state' => $lapostaMemberState,
                ]);

            $value = 'Relatie '.$this->contact->primaryEmailAddress->email.') in Laposta gesynchroniseerd.';
            $jobLog = new JobsLog();
            $jobLog->value = $value;
            $jobLog->user_id = $this->userId;
            $jobLog->job_category_id = 'sync-laposta';
            $jobLog->save();

        } catch (\Exception $e) {
            $this->contactGroup->contacts()->updateExistingPivot($this->contact->id, ['laposta_member_state' => 'unknown']);
            $message = 'Groep: ' . $this->contactGroup->name . ' - Fout bij het synchroniseren van een Laposta relatie ' . $memberData['email'] . ', melding Laposta: ' ;
            if ($e->getMessage()) {
                $message = $message . $e->getMessage();
            } else {
                $message = $message . 'Onbekend';
            }
            Log::error( $message . '. Contactgroup id: ' . $this->contactGroup->id . '. Http status: ' . ($e->getHttpStatus() ? $e->getHttpStatus() : '') . '.');
//            Log::error( $message . '. Contactgroup id: ' . $this->contactGroup->id . '. Http status: ' . $e . '.');
            $value = $message;
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
        $jobLog->value = 'Synchroniseren relatie '.$this->contact->primaryEmailAddress->email.' in Laposta mislukt.';
        $jobLog->user_id = $this->userId;
        $jobLog->job_category_id = 'sync-laposta';
        $jobLog->save();

        Log::error('Synchroniseren relatie '.$this->contact->primaryEmailAddress->email.' in Laposta mislukt: ' . $exception->getMessage());
    }

}