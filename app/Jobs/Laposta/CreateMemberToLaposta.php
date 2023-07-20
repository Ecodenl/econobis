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

class CreateMemberToLaposta implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $lapostaKey;
    private $contactGroup;
    private $contact;
    private $userId;

    public function __construct($lapostaKey, ContactGroup $contactGroup, Contact $contact, $userId)
    {
        $this->lapostaKey = $lapostaKey;
        $this->contactGroup = $contactGroup;
        $this->contact = $contact;
        $this->userId = $userId;

//        $jobLog = new JobsLog();
//        $jobLog->value = 'Start aanmaken relatie '.$this->contact->primaryEmailAddress->email.' in Laposta.';
//        $jobLog->user_id = $userId;
//        $jobLog->job_category_id = 'sync-laposta';
//        $jobLog->save();
    }

    public function handle()
    {
        Laposta::setApiKey($this->lapostaKey);

        $member = new Laposta_Member($this->contactGroup->laposta_list_id ? $this->contactGroup->laposta_list_id : '');
        $memberFieldData = [];
        if($this->contact->type_id === ContactType::PERSON) {
            $memberFieldData = [
                'contactnummer' => $this->contact->number ? $this->contact->number : '',
                'contactvoornaam' => $this->contact->person->first_name ? $this->contact->person->first_name : ($this->contact->person->initials ? $this->contact->person->initials : ''),
                'contacttitel' => $this->contact->person->title ? $this->contact->person->title->salutation : '',
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
            'ip' => isset($_SERVER['SERVER_ADDR']) ? $_SERVER['SERVER_ADDR'] : '0.0.0.0',
            'email' => $this->contact->primaryEmailAddress->email ? $this->contact->primaryEmailAddress->email : '',
            'custom_fields' => $memberFieldData,
        ];

        try {
            // wait for 1,5 second
            sleep(1);
            usleep(500000);
            $lapostaResponse = $member->create($memberData);

            $lapostaMemberId = $lapostaResponse['member']['member_id'];
            $lapostaMemberState = $lapostaResponse['member']['state'];
            $this->contactGroup->contacts()->updateExistingPivot($this->contact->id,
                [
                    'laposta_member_id' => $lapostaMemberId,
                    'laposta_member_state' => $lapostaMemberState,
                ]);

//            $value = 'Relatie '.$this->contact->primaryEmailAddress->email.') in Laposta aangemaakt.';
//            $jobLog = new JobsLog();
//            $jobLog->value = $value;
//            $jobLog->user_id = $this->userId;
//            $jobLog->job_category_id = 'sync-laposta';
//            $jobLog->save();

        } catch (\Exception $e) {
            $this->contactGroup->contacts()->updateExistingPivot($this->contact->id, ['laposta_member_state' => 'unknown']);
//            $message = 'Groep: ' . $this->contactGroup->name . ' - Fout bij het aanmaken van een Laposta relatie ' . $memberData['email'] . ', melding Laposta: ' ;
//            if ($e->getMessage()) {
//                $message = $message . $e->getMessage();
//            } else {
//                $message = $message . 'Onbekend';
//            }
//            if($e->getMessage() && $e->getMessage() == 'API error: Email address exists'){
//                Log::info( $message . '. Contactgroup id: ' . $this->contactGroup->id . '. Http status: ' . $e->getHttpStatus() . '.');
//            }else{
//                Log::error( $message . '. Contactgroup id: ' . $this->contactGroup->id . '. Http status: ' . $e->getHttpStatus() . '.');
//            }
//            $value = $message;
//            $jobLog = new JobsLog();
//            $jobLog->value = $value;
//            $jobLog->user_id = $this->userId;
//            $jobLog->job_category_id = 'sync-laposta';
//            $jobLog->save();
        }
    }

    public function failed(\Exception $exception)
    {
//        $jobLog = new JobsLog();
//        $jobLog->value = 'Aanmaken relatie '.$this->contact->primaryEmailAddress->email.' in Laposta mislukt.';
//        $jobLog->user_id = $this->userId;
//        $jobLog->job_category_id = 'sync-laposta';
//        $jobLog->save();
//
//        Log::error('Aanmaken relatie '.$this->contact->primaryEmailAddress->email.' in Laposta mislukt: ' . $exception->getMessage());
    }

}