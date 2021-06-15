<?php


namespace App\Helpers\Laposta;


use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Cooperation\Cooperation;
use Illuminate\Validation\ValidationException;
use Laposta;
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
        // Check if all necessary fields are filled
        $this->validateRequiredFields();

        $lapostaResponse = $this->createListToLaposta();
        $lapostaListId = $lapostaResponse['list']['list_id'];

        // Return list id
        return $lapostaListId;
    }

    private function validateRequiredFields()
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

    private function createListToLaposta()
    {
        Laposta::setApiKey($this->cooperation->laposta_key);
        $list = new Laposta_List();
        $listData = [
            'name' => $this->contactGroup->name ? $this->contactGroup->name : '',
            'remarks' => $this->contactGroup->description ? $this->contactGroup->description : ''];

        $response = $list->create($listData);
        return $response;
    }

}