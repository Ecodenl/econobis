<?php


namespace App\Helpers\Laposta;


use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Cooperation\Cooperation;
use App\Jobs\Laposta\CreateMemberToLaposta;
use App\Jobs\Laposta\DeleteMemberToLaposta;
use App\Jobs\Laposta\UpdateMemberToLaposta;
use Illuminate\Support\Facades\Auth;
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
    private $collectMessages;

    private array $messages = [];

    public function __construct(ContactGroup $contactGroup, Contact $contact, $collectMessages = false)
    {
        $this->contactGroup = null;
        // Dynamic of Composed groups worden met simulated group gesyncroniseerd met laposta.
        if($contactGroup->type_id === 'dynamic' || $contactGroup->type_id === 'composed' ){
            $this->contactGroup = $contactGroup->simulatedGroup;
        }else{
            $this->contactGroup = $contactGroup;
        }

        $this->collectMessages = $collectMessages;
        $this->contactGroup = $contactGroup;
        $this->contact = $contact;
        $this->cooperation = Cooperation::first();
        $this->contactGroupsPivot = null;
        if($contactGroup->contacts()->where('contact_id', $contact->id)->exists()){
            $this->contactGroupsPivot = $contactGroup->contacts()->where('contact_id', $contact->id)->first()->pivot;
        }
    }

    public function getMessages()
    {
        return $this->messages;
    }

    public function createMember() {

        // General checks before API call
        $dataOk = $this->validateGeneral();
        if(!$dataOk){
            return null;
        }

        // Check if all necessary fields are filled
        $dataOk = $this->validateRequiredMemberFields();
        if(!$dataOk){
            return null;
        }

        $this->contactGroup->contacts()->updateExistingPivot($this->contact->id, ['laposta_member_state' => 'inprogress']);

        // create member(s) to Laposta
        // (unset relation contact->groups first, gives an error on function getTeamContactGroupIds() when busy with load model in job
        unset($this->contact['groups']);
        CreateMemberToLaposta::dispatch($this->cooperation->laposta_key, $this->contactGroup, $this->contact, Auth::id());
    }

    public function updateMember() {

        // General checks before API call
        $dataOk = $this->validateGeneral();
        if(!$dataOk){
            return null;
        }

        // Check if all necessary fields are filled
        $dataOk = $this->validateRequiredMemberFields();
        if(!$dataOk){
            return null;
        }

        // update member to Laposta
        // (unset relation contact->groups first, gives an error on function getTeamContactGroupIds() when busy with load model in job
        unset($this->contact['groups']);
        UpdateMemberToLaposta::dispatch($this->cooperation->laposta_key, $this->contactGroup, $this->contact, $this->contactGroupsPivot->laposta_member_id, Auth::id());
    }

    public function deleteMember() {

        // General checks before API call
        $dataOk = $this->validateGeneral();
        if(!$dataOk){
            return null;
        }

        // update member to Laposta
        // (unset relation contact->groups first, gives an error on function getTeamContactGroupIds() when busy with load model in job
        unset($this->contact['groups']);
        DeleteMemberToLaposta::dispatch($this->cooperation->laposta_key, $this->contactGroup, $this->contact, $this->contactGroupsPivot->laposta_member_id, Auth::id());
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

        if(!$this->contactGroup->laposta_list_id) {
            $errorsCheckBefore[] = 'Groep: ' . $this->contactGroup->name . ' - Koppeling Laposta lijst niet bekend';
        }

        $errors = null;
        if(count($errorsCheckBefore)) {
            $errors = array("econobis" => $errorsCheckBefore);
        };
        if($errors){
            if($this->collectMessages){
                $this->messages = $errorsCheckBefore;
                return false;
            }else{
                throw ValidationException::withMessages($errors);
            }
        }

        Laposta::setApiKey($this->cooperation->laposta_key);

        return true;
    }

    private function validateRequiredMemberFields()
    {
        $errorsCheckBefore = [];

        if(empty($this->contact->primaryEmailAddress->email)) {
            $errorsCheckBefore[] = 'Groep: ' . $this->contactGroup->name . ' - Primaire email ontbreekt voor contact ' . $this->contact->full_name . ' (' . $this->contact->number . ')';
        }

        $errors = null;
        if(count($errorsCheckBefore)) {
            $errors = array("econobis" => $errorsCheckBefore);
        };
        if($errors){
            if($this->collectMessages){
                $this->messages = $errorsCheckBefore;
                return false;
            }else{
                throw ValidationException::withMessages($errors);
            }
        }

        return true;
    }
}