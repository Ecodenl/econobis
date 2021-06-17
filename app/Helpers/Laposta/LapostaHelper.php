<?php


namespace App\Helpers\Laposta;


use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Cooperation\Cooperation;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Laposta;
use Laposta_Field;
use Laposta_List;

class LapostaHelper
{
    private $contactGroup;
    private $cooperation;

    public function __construct(ContactGroup $contactGroup)
    {
        $this->contactGroup= $contactGroup;
        $this->cooperation = Cooperation::first();
    }

    public function createList() {

        // General checks before API call
        $this->validateGeneral();

        // Check if all necessary fields are filled
        $this->validateRequiredCreateListFields();

        $lapostaResponse = $this->createListToLaposta();
        $lapostaListId = $lapostaResponse['list']['list_id'];

        // When success save list id
        $this->contactGroup->laposta_list_id = $lapostaListId;
        $this->contactGroup->save();

        $this->createFields();

        // Return list id
        return $lapostaListId;
    }

    public function updateList() {

        // General checks before API call
        $this->validateGeneral();

        // Check if all necessary fields are filled
        $this->validateRequiredUpdateListFields();

        $lapostaResponse = $this->updateListToLaposta();

        // Return list id
        return $this->contactGroup->laposta_list_id;
    }

    public function deleteList() {

        // General checks before API call
        $this->validateGeneral();

        $lapostaResponse = $this->deleteListToLaposta();

        // When success save list id
        $this->contactGroup->laposta_list_id = null;
        $this->contactGroup->save();

        // Return list id
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

    private function validateRequiredCreateListFields()
    {
        $errorsCheckBefore = [];

        if(!$this->cooperation->use_laposta) {
            $errorsCheckBefore[] = 'Gebruik laposta niet geactiveerd';
        }

        if(!$this->cooperation->laposta_key) {
            $errorsCheckBefore[] = 'Geen key Laposta bekend';
        }

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

    private function validateRequiredUpdateListFields()
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
            'state' => 'active',
            'name' => 'Contact nummer',
            'tag' => '{{contact_nummer}}',
            'datatype' => 'text',
            'required' => true,
            'in_form' => true,
            'in_list' => true,
        ];
        $this->createFieldToLaposta($fieldData);

        $fieldData = [
            'state' => 'active',
            'name' => 'Contact titel',
            'tag' => '{{contact_titel}}',
            'datatype' => 'text',
            'required' => true,
            'in_form' => true,
            'in_list' => true,
        ];
        $this->createFieldToLaposta($fieldData);

        $fieldData = [
            'state' => 'active',
            'name' => 'Contact voornaam',
            'tag' => '{{contact_voornaam}}',
            'datatype' => 'text',
            'required' => true,
            'in_form' => true,
            'in_list' => true,
        ];
        $this->createFieldToLaposta($fieldData);

        $fieldData = [
            'state' => 'active',
            'name' => 'Contact achternaam',
            'tag' => '{{contact_achternaam}}',
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