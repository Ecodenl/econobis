<?php


namespace App\Helpers\Laposta;


use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactType;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Cooperation\Cooperation;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Laposta;
use Laposta_Member;

class LapostaMemberHelper
{
    private $contactGroupsPivot;
    private $contactGroup;
    private $contact;
    private $cooperation;

    public function __construct(ContactGroup $contactGroup, Contact $contact)
    {
        $this->contactGroup = null;
        // Dynamic of Composed groups worden met simulated group gesyncroniseerd met laposta.
        if($contactGroup->type_id === 'dynamic' || $contactGroup->type_id === 'composed' ){
            $simulatedContactGroup = ContactGroup::find($contactGroup->simulated_group_id);
            if($simulatedContactGroup){
                $this->contactGroup = $simulatedContactGroup;
            }
        }else{
            $this->contactGroup = $contactGroup;
        }


        $this->contactGroup= $contactGroup;
        $this->contact= $contact;
        $this->cooperation = Cooperation::first();
        $this->contactGroupsPivot = null;
        if($contactGroup->contacts()->where('contact_id', $contact->id)->exists()){
            $this->contactGroupsPivot = $contactGroup->contacts()->where('contact_id', $contact->id)->first()->pivot;
        }
    }

    public function createMember() {

        // General checks before API call
        $this->validateGeneral();

        // Check if all necessary fields are filled
        $this->validateRequiredMemberFields();

        $lapostaResponse = $this->createMemberToLaposta();
        $lapostaMemberId = $lapostaResponse['member']['member_id'];
        $lapostaMemberState = $lapostaResponse['member']['state'];

        if($this->contactGroupsPivot != null) {
            $this->contactGroup->contacts()->detach($this->contact);
        }

        // When success save member id
        $this->contactGroup->contacts()->attach($this->contact, [
            'laposta_member_id' => $lapostaMemberId,
            'laposta_member_state' => $lapostaMemberState,
            'laposta_member_created_at' => Carbon::now(),
            'laposta_member_since' => Carbon::now(),
            ]);

        // Return member id
        return $lapostaMemberId;
    }

    public function updateMember() {

        // General checks before API call
        $this->validateGeneral();

        // Check if all necessary fields are filled
        $this->validateRequiredMemberFields();

        $lapostaResponse = $this->updateMemberToLaposta();

        // Return member id
//        return $this->contactGroupsPivot->laposta_member_id;
    }

    public function deleteMember() {

        // General checks before API call
        $this->validateGeneral();

        $lapostaResponse = $this->deleteMemberToLaposta();

        // Return member id
        return null;
    }

    private function validateGeneral()
    {
        $errorsCheckBefore = [];

        if(!$this->cooperation->use_laposta) {
            $errorsCheckBefore[] = 'Gebruik laposta niet geactiveerd';
        }

        if(!$this->cooperation->laposta_key) {
            $errorsCheckBefore[] = 'Geen key Laposta bekend';
        }

        if(!$this->contactGroup->laposta_list_id) {
            $errorsCheckBefore[] = 'Koppeling Laposta niet bekend';
        }

        $errors = null;
        if(count($errorsCheckBefore)) {
            $errors = array("econobis" => $errorsCheckBefore);
        };
        if($errors) throw ValidationException::withMessages($errors);

        Laposta::setApiKey($this->cooperation->laposta_key);

        return true;
    }

    private function validateRequiredMemberFields()
    {
        $errorsCheckBefore = [];

        if(empty($this->contact->primaryEmailAddress->email)) {
            $errorsCheckBefore[] = 'Contact primaire email ontbreekt';
        }

        if(empty($this->contact->number)) {
            $errorsCheckBefore[] = 'Contact nummer ontbreekt';
        }

        if($this->contact->type_id === ContactType::PERSON) {
            if (!$this->contact->person) {
                $errorsCheckBefore[] = 'Contact persoon ontbreekt';
            }
            if (empty($this->contact->person->first_name) && empty($this->contact->person->initials)) {
                $errorsCheckBefore[] = 'Contact voornaam en initials ontbreken';
            }
            if (empty($this->contact->person->first_name) && empty($this->contact->person->initials)) {
                $errorsCheckBefore[] = 'Contact voornaam en initials ontbreken';
            }
            if (empty($this->contact->person->last_name)) {
                $errorsCheckBefore[] = 'Contact achternaam ontbreekt';
            }
        } elseif ($this->contact->type_id === ContactType::ORGANISATION) {
            if (empty($this->contact->full_name)) {
                $errorsCheckBefore[] = 'Contact organisatienaam ontbreekt';
            }
        }else{
            $errorsCheckBefore[] = 'Contact type is niet Persoon of Organisatie';

        }

        $errors = null;
        if(count($errorsCheckBefore)) {
            $errors = array("econobis" => $errorsCheckBefore);
        };
        if($errors) throw ValidationException::withMessages($errors);

        return true;
    }

    private function createMemberToLaposta()
    {
        $member = new Laposta_Member($this->contactGroup->laposta_list_id ? $this->contactGroup->laposta_list_id : '');
        $memberFieldData = [];
        if($this->contact->type_id === ContactType::PERSON) {
            $memberFieldData = [
                'contactnummer' => $this->contact->number ? $this->contact->number : '',
                'contactvoornaam' => $this->contact->person->first_name ? $this->contact->person->first_name : $this->contact->person->initials,
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
            'ip' => $_SERVER['SERVER_ADDR'],
            'email' => $this->contact->primaryEmailAddress->email ? $this->contact->primaryEmailAddress->email : '',
            'custom_fields' => $memberFieldData,
        ];

        try {
            $response = $member->create($memberData);
            return $response;
        } catch (\Exception $e) {
            if ($e->getMessage()) {
                Log::error('Er is iets misgegaan bij het aanmaken van een Laposta relatie ' . $memberData['email'] . ' voor contactgroep id ' . $this->contactGroup->id . ', melding: ' . $e->getHttpStatus() . ' - ' . $e->getMessage());
                abort($e->getHttpStatus(), $e->getMessage());
            } else {
                Log::error('Er is iets misgegaan met bij het aanmaken van een Laposta relatie ' . $memberData['email'] . ' voor contactgroep id ' . $this->contactGroup->id . ', melding: ' . $e->getHttpStatus());
                abort($e->getHttpStatus(), 'Er is iets misgegaan bij het synchroniseren naar Laposta');
            }
        }
    }

    private function updateMemberToLaposta()
    {
        $member = new Laposta_Member($this->contactGroup->laposta_list_id ? $this->contactGroup->laposta_list_id : '');
        $memberFieldData = [];
        if($this->contact->type_id === ContactType::PERSON) {
            $memberFieldData = [
                'contactnummer' => $this->contact->number ? $this->contact->number : '',
                'contactvoornaam' => $this->contact->person->first_name ? $this->contact->person->first_name : $this->contact->person->initials,
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
            $response = $member->update($this->contactGroupsPivot->laposta_member_id, $memberData);
            return $response;
        } catch (\Exception $e) {
            if ($e->getMessage()) {
                Log::error('Er is iets misgegaan bij het synchroniseren van een Laposta relatie ' . $memberData['email'] . ' voor contactgroep id ' . $this->contactGroup->id . ', melding: ' . $e->getHttpStatus() . ' - ' . $e->getMessage());
                abort($e->getHttpStatus(), $e->getMessage());
            } else {
                Log::error('Er is iets misgegaan met bij het synchroniseren van een Laposta relatie ' . $memberData['email'] . ' voor contactgroep id ' . $this->contactGroup->id . ', melding: ' . $e->getHttpStatus());
                abort($e->getHttpStatus(), 'Er is iets misgegaan bij het synchroniseren naar Laposta');
            }
        }
    }

    private function deleteMemberToLaposta()
    {
        $member = new Laposta_Member($this->contactGroup->laposta_list_id ? $this->contactGroup->laposta_list_id : '');

        try {
            $response = $member->delete($this->contactGroupsPivot->laposta_member_id);
            return $response;
        } catch (\Exception $e) {
            if ($e->getMessage()) {
                Log::error('Er is iets misgegaan bij het verwijderen van gekoppelde Laposta relatie voor contactgroep id ' . $this->contactGroup->id .  ', melding: ' . $e->getHttpStatus() . ' - ' . $e->getMessage() );
                abort($e->getHttpStatus(), $e->getMessage());
            } else {
                Log::error('Er is iets misgegaan met bij het verwijderen van gekoppelde Laposta relatie voor contactgroep id ' . $this->contactGroup->id .  ', melding: ' . $e->getHttpStatus() );
                abort($e->getHttpStatus(), 'Er is iets misgegaan bij het synchroniseren naar Laposta');
            }
        }
    }

}