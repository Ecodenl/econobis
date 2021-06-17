<?php


namespace App\Helpers\Laposta;


use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Cooperation\Cooperation;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Laposta;
use Laposta_Field;
use Laposta_List;
use Laposta_Member;

class LapostaListHelper
{
    private contactGroupsPivot;
    private $contactGroup;
    private $contact;
    private $cooperation;

    public function __construct(ContactGroupsPivot $contactGroupsPivot)
    {
        $this->contactGroup= $contactGroup;
        $this->contact= $contact;
        $this->cooperation = Cooperation::first();
    }

    public function createMember() {

        // General checks before API call
        $this->validateGeneral();

        // Check if all necessary fields are filled
        $this->validateRequiredCreateMemberFields();

        $lapostaResponse = $this->createMemberToLaposta();
        dd($lapostaResponse);
        $lapostaMemberId = $lapostaResponse['member']['member_id'];

        // When success save member id
        $this->contactGroupsPivot->laposta_member_id = $lapostaMemberId;
        $this->contactGroupsPivot->save();

        // Return member id
        return $lapostaMemberId;
    }

    public function updateMember() {

        // General checks before API call
        $this->validateGeneral();

        // Check if all necessary fields are filled
        $this->validateRequiredUpdateMemberFields();

        $lapostaResponse = $this->updateMemberToLaposta();

        // Return member id
        return $this->contactGroupsPivot->laposta_member_id;
    }

    public function deleteMember() {

        // General checks before API call
        $this->validateGeneral();

        $lapostaResponse = $this->deletMemberToLaposta();

        // When success save member id
        $this->contactGroupsPivot->laposta_member_id = null;
        $this->contactGroupsPivot->save();

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

        $errors = null;
        if(count($errorsCheckBefore)) {
            $errors = array("econobis" => $errorsCheckBefore);
        };
        if($errors) throw ValidationException::withMessages($errors);

        Laposta::setApiKey($this->cooperation->laposta_key);

        return true;
    }

    private function validateRequiredCreateMemberFields()
    {
        $errorsCheckBefore = [];

        if($this->contactGroup->laposta_list_id) {
            $errorsCheckBefore[] = 'Koppeling Laposta bestaat al';
        }

        if(!$this->contactGroup->name) {
            $errorsCheckBefore[] = 'Contactgroep naam ontbreekt';
        }

        $errors = null;
        if(count($errorsCheckBefore)) {
            $errors = array("econobis" => $errorsCheckBefore);
        };
        if($errors) throw ValidationException::withMessages($errors);

        return true;
    }

    private function validateRequiredUpdateMemberFields()
    {
        $errorsCheckBefore = [];

        if(!$this->contactGroup->laposta_list_id) {
            $errorsCheckBefore[] = 'Koppeling Laposta niet bekend';
        }

        if(!$this->contactGroup->name) {
            $errorsCheckBefore[] = 'Contactgroep naam ontbreekt';
        }

        $errors = null;
        if(count($errorsCheckBefore)) {
            $errors = array("econobis" => $errorsCheckBefore);
        };
        if($errors) throw ValidationException::withMessages($errors);

        return true;
    }

    private function createListToLaposta()
    {
        $list = new Laposta_List();
        $listData = [
            'name' => $this->contactGroup->name ? $this->contactGroup->name : '',
            'remarks' => $this->contactGroup->description ? $this->contactGroup->description : '',
        ];

        try {
            $response = $list->create($listData);

            return $response;
        } catch (\Exception $e) {
            if ($e->getMessage()) {
                Log::error('Er is iets misgegaan bij het aanmaken van een Laposta lijst voor contactgroep id ' . $this->contactGroup->id . ', melding: ' . $e->getHttpStatus() . ' - ' . $e->getMessage());
                abort($e->getHttpStatus(), $e->getMessage());
            } else {
                Log::error('Er is iets misgegaan met bij het aanmaken van een Laposta lijst voor contactgroep id ' . $this->contactGroup->id . ', melding: ' . $e->getHttpStatus());
                abort($e->getHttpStatus(), 'Er is iets misgegaan bij het synchroniseren naar Laposta');
            }
        }
    }

    private function createFields()
    {
        $fieldData = [
            'name' => 'Contact nummer',
            'datatype' => 'text',
            'required' => true,
            'in_form' => true,
            'in_list' => true,
        ];
        $this->createFieldToLaposta($fieldData);

        $fieldData = [
            'name' => 'Contact titel',
            'datatype' => 'text',
            'required' => false,
            'in_form' => true,
            'in_list' => true,
        ];
        $this->createFieldToLaposta($fieldData);

        $fieldData = [
            'name' => 'Contact voornaam',
            'datatype' => 'text',
            'required' => true,
            'in_form' => true,
            'in_list' => true,
        ];
        $this->createFieldToLaposta($fieldData);

        $fieldData = [
            'name' => 'Contact achternaam',
            'datatype' => 'text',
            'required' => true,
            'in_form' => true,
            'in_list' => true,
        ];
        $this->createFieldToLaposta($fieldData);

    }
    private function createFieldToLaposta($fieldData)
    {
        $field = new Laposta_Field($this->contactGroup->laposta_list_id ? $this->contactGroup->laposta_list_id : '');

        try {
            $response = $field->create($fieldData);

            return $response;
        } catch (\Exception $e) {
            if ($e->getMessage()) {
                Log::error('Er is iets misgegaan bij het aanmaken van een Laposta veld ' . $fieldData['name'] . ' voor contactgroep id ' . $this->contactGroup->id . ', melding: ' . $e->getHttpStatus() . ' - ' . $e->getMessage());
                abort($e->getHttpStatus(), $e->getMessage());
            } else {
                Log::error('Er is iets misgegaan met bij het aanmaken van een Laposta veld ' . $fieldData['name'] . ' voor contactgroep id ' . $this->contactGroup->id . ', melding: ' . $e->getHttpStatus());
                abort($e->getHttpStatus(), 'Er is iets misgegaan bij het synchroniseren naar Laposta');
            }
        }
    }

    private function createMemberToLaposta()
    {
        $member = new Laposta_Member($this->contactGroup->laposta_list_id ? $this->contactGroup->laposta_list_id : '');
        $memberFieldData = [
            'contactnummer' => 'C12345',
            'contactvoornaam' => 'Wim',
            'contactachternaam' => 'Test'
        ];
        $memberData = [
            'ip' => '213.125.75.154',
            'email' => 'wim@mosmania.nl',
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

    private function updateListToLaposta()
    {
        $list = new Laposta_List();
        $listData = [
            'name' => $this->contactGroup->name ? $this->contactGroup->name : '',
            'remarks' => $this->contactGroup->description ? $this->contactGroup->description : ''];

        try {
            $response = $list->update($this->contactGroup->laposta_list_id, $listData);
            return $response;
        } catch (\Exception $e) {
            if ($e->getMessage()) {
                Log::error('Er is iets misgegaan bij het synchroniseren naar Laposta voor contactgroep id ' . $this->contactGroup->id .  ', melding: ' . $e->getHttpStatus() . ' - ' . $e->getMessage() );
                abort($e->getHttpStatus(), $e->getMessage());
            } else {
                Log::error('Er is iets misgegaan met bij het synchroniseren naar Laposta voor contactgroep id ' . $this->contactGroup->id .  ', melding: ' . $e->getHttpStatus() );
                abort($e->getHttpStatus(), 'Er is iets misgegaan bij het synchroniseren naar Laposta');
            }
        }
    }

    private function deleteListToLaposta()
    {
        $list = new Laposta_List();

        try {
            $response = $list->delete($this->contactGroup->laposta_list_id);
            return $response;
        } catch (\Exception $e) {
            if ($e->getMessage()) {
                Log::error('Er is iets misgegaan bij het verwijderen van gekoppelde Laposta lijst voor contactgroep id ' . $this->contactGroup->id .  ', melding: ' . $e->getHttpStatus() . ' - ' . $e->getMessage() );
                abort($e->getHttpStatus(), $e->getMessage());
            } else {
                Log::error('Er is iets misgegaan met bij het verwijderen van gekoppelde Laposta lijst voor contactgroep id ' . $this->contactGroup->id .  ', melding: ' . $e->getHttpStatus() );
                abort($e->getHttpStatus(), 'Er is iets misgegaan bij het synchroniseren naar Laposta');
            }
        }
    }

}