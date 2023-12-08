<?php


namespace App\Helpers\Laposta;


use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Cooperation\Cooperation;
use App\Http\Controllers\Api\ContactGroup\ContactGroupController;
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

    public function syncAllWithLaposta() {

        // General checks before API call
        $this->validateGeneral();

        $messages = $this->syncLaposta();
        if(count($messages)) {
            throw ValidationException::withMessages(array("econobis" => $messages));
        }

    }

    public function processStateAllMembersLaposta() {
        Log::info("Doe processStateAllMembersLaposta");

        if(!$this->cooperation || !$this->cooperation->use_laposta || !$this->cooperation->laposta_key) {
            return;
        }

        Laposta::setApiKey($this->cooperation->laposta_key);

        $messages = $this->syncLaposta();
        if(count($messages)) {
            Log::info('Er is iets misgegaan bij het synchroniseren van Laposta' );
        }
    }
    protected function syncStateAllMembersLaposta() {

        Log::info("Doe syncStateAllMembersLaposta");
        // Sync state all members from laposta
        foreach($this->getAllLists() as $list){
            $listId = $list['list']['list_id'];
            Log::info("sync list: " . $listId);

            $contactGroup = ContactGroup::where('laposta_list_id', $listId)->first();
            if($contactGroup){
                Log::info("Contractgroep voor sync: " . $contactGroup->name);
                $allMembersOfList = $this->getAllMembersOfListFromLaposta($listId);
                foreach($allMembersOfList as $member){
                    $lapostaMemberId = $member['member']['member_id'];
                    $lapostaMemberState = $member['member']['state'];
                    if($contactGroup->contacts()->where('laposta_member_id', $lapostaMemberId)->exists()){
                        $contactGroupsPivot= $contactGroup->contacts()->where('laposta_member_id', $lapostaMemberId)->first()->pivot;
                        if($contactGroupsPivot != null) {
                            $contactGroup->contacts()->updateExistingPivot($contactGroupsPivot->contact_id, ['laposta_member_state' => $lapostaMemberState, 'laposta_last_error_message' => null]);
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

        if(!$this->cooperation || !$this->cooperation->use_laposta) {
            $errorsCheckBefore[] = 'Gebruik laposta niet geactiveerd';
        }

        if(!$this->cooperation || !$this->cooperation->laposta_key) {
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
                Log::info('Er is iets misgegaan bij het ophalen van alle Laposta lijsten. Melding: ' . $e->getHttpStatus() . ' - ' . $e->getMessage() );
                abort($e->getHttpStatus(), $e->getMessage());
            } else {
                Log::info('Er is iets misgegaan met bij het ophalen van alle Laposta lijsten. Melding: ' . $e->getHttpStatus() );
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
                Log::info('Er is iets misgegaan bij het ophalen van alle Laposta relaties voor laposta list id ' . $listId .  ', melding: ' . $e->getHttpStatus() . ' - ' . $e->getMessage() );
                abort($e->getHttpStatus(), $e->getMessage());
            } else {
                Log::info('Er is iets misgegaan met bij het ophalen van alle Laposta relaties voor laposta list id ' . $listId .  ', melding: ' . $e->getHttpStatus() );
                abort($e->getHttpStatus(), 'Er is iets misgegaan bij het synchroniseren van Laposta');
            }
        }
    }

    /**
     * @return array
     */
    protected function syncLaposta(): array
    {
        $messages = [];

        $allContactGroups = ContactGroup::whereNotIn('type_id', ['simulated'])->get();
        foreach ($allContactGroups as $contactGroup) {
            $checkContactGroup = $contactGroup->simulatedGroup ? $contactGroup->simulatedGroup : $contactGroup;
            $processState = $checkContactGroup->laposta_list_id ? 'inprogress' : 'unknown';
            $lapostaContacts = $checkContactGroup->contacts->whereNotNull('pivot.laposta_member_id');
            foreach ($lapostaContacts as $lapostaContact) {
                $checkContactGroup->contacts()->updateExistingPivot($lapostaContact->id, ['laposta_member_state' => $processState, 'laposta_last_error_message' => null]);
            }
        }

        // Sync state all members from laposta
        $this->syncStateAllMembersLaposta();

        Log::info("SyncLapostaList start voor alle groepen");

        $allContactGroups = ContactGroup::whereNotIn('type_id', ['simulated'])->get();
        foreach ($allContactGroups as $contactGroup) {
            $checkContactGroup = $contactGroup->simulatedGroup ? $contactGroup->simulatedGroup : $contactGroup;

            if ($contactGroup->is_used_in_laposta) {
                $lapostaContacts = $checkContactGroup->contacts->whereNotNull('pivot.laposta_member_id')->where('pivot.laposta_member_state', 'inprogress');
                foreach ($lapostaContacts as $lapostaContact) {
                    if ($checkContactGroup->type_id == 'simulated') {
                        $checkContactGroup->contacts()->detach($lapostaContact);
                    } else {
                        $checkContactGroup->contacts()->updateExistingPivot($lapostaContact->id, ['laposta_member_state' => 'unknown', 'laposta_last_error_message' => null]);
                    }
                }
                //find contactgroup again, because data of check group can be changed.
                $syncContactGroup = ContactGroup::find($contactGroup->id);

                $contactGroupController = new ContactGroupController();
                $contactGroupController->syncLapostaList($syncContactGroup);

                if (count($contactGroupController->getErrorMessagesLaposta())) {
                    Log::info("SyncLapostaList voor " . $contactGroup->name . " geeft fouten");
                }
                // tussen elke update list xx seconden niets
                $sleep = 60;
                Log::info("SyncLapostaList klaar voor : " . $contactGroup->name . " . Wacht " . $sleep . " seconden...");
                sleep($sleep);

                $messages = array_merge($messages, $contactGroupController->getErrorMessagesLaposta());
            }
        }
        Log::info("SyncLapostaList klaar voor alle groepen");
        return $messages;
    }

}