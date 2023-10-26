<?php

namespace App\Jobs\Laposta;

use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactType;
use App\Eco\ContactGroup\ContactGroup;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
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
        $this->userId = $userId;
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
            $lapostaResponse = $member->update($this->lapostaMemberId, $memberData);

            $lapostaMemberState = $lapostaResponse['member']['state'];
            $this->contactGroup->contacts()->updateExistingPivot($this->contact->id,
                [
                    'laposta_member_state' => $lapostaMemberState,
                    'laposta_last_error_message' => null,
                ]);

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
            $this->contactGroup->contacts()->updateExistingPivot($this->contact->id, ['laposta_member_state' => 'unknown', 'laposta_last_error_message' => $message]);
        }
    }

    public function failed(\Throwable $exception)
    {
    }

}