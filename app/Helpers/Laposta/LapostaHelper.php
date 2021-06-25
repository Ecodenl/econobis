<?php


namespace App\Helpers\Laposta;


use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Cooperation\Cooperation;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Laposta;
use Laposta_List;
use Laposta_Member;

class LapostaHelper
{
    private $cooperation;

    public function __construct()
    {
        $this->cooperation = Cooperation::first();
    }

    public function processStateAllMembersLaposta() {

        // General checks before API call
        $this->validateGeneral();

        foreach($this->getAllLists() as $list){
            $listId = $list['list']['list_id'];
            $contactGroup = ContactGroup::where('laposta_list_id', $listId)->first();
            if($contactGroup){
                $allMembersOfList = $this->getAllMembersOfListFromLaposta($listId);
                foreach($allMembersOfList as $member){
                    $lapostaMemberId = $member['member']['member_id'];
                    $lapostaMemberState = $member['member']['state'];
                    if($contactGroup->contacts()->where('laposta_member_id', $lapostaMemberId)->exists()){
                        $contactGroupsPivot= $contactGroup->contacts()->where('laposta_member_id', $lapostaMemberId)->first()->pivot;
                        if($contactGroupsPivot != null) {
                            $contactGroup->contacts()->updateExistingPivot($contactGroupsPivot->contact_id, ['laposta_member_state' => $lapostaMemberState]);
                        }
                    }
                }
            }
        }
    }

    private function getAllLists() {
        $lapostaResponse = $this->getAllListsFromLaposta();

        // Return lists
        return $lapostaResponse;
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

    private function getAllListsFromLaposta()
    {
        $list = new Laposta_List();

        try {
            $response = $list->all();
            return $response['data'];
        } catch (\Exception $e) {
            if ($e->getMessage()) {
                Log::error('Er is iets misgegaan bij het ophalen van alle Laposta lijsten. Melding: ' . $e->getHttpStatus() . ' - ' . $e->getMessage() );
                abort($e->getHttpStatus(), $e->getMessage());
            } else {
                Log::error('Er is iets misgegaan met bij het ophalen van alle Laposta lijsten. Melding: ' . $e->getHttpStatus() );
                abort($e->getHttpStatus(), 'Er is iets misgegaan bij het synchroniseren van Laposta');
            }
        }
    }

    private function getAllMembersOfListFromLaposta($listId)
    {
        $member = new Laposta_Member($listId ? $listId : '');

        try {
            $response = $member->all();
            return $response['data'];
        } catch (\Exception $e) {
            if ($e->getMessage()) {
                Log::error('Er is iets misgegaan bij het ophalen van alle Laposta relaties voor contactgroep id ' . $this->contactGroup->id .  ', melding: ' . $e->getHttpStatus() . ' - ' . $e->getMessage() );
                abort($e->getHttpStatus(), $e->getMessage());
            } else {
                Log::error('Er is iets misgegaan met bij het ophalen van alle Laposta relaties voor contactgroep id ' . $this->contactGroup->id .  ', melding: ' . $e->getHttpStatus() );
                abort($e->getHttpStatus(), 'Er is iets misgegaan bij het synchroniseren van Laposta');
            }
        }
    }
}