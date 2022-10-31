<?php

namespace App\Http\Controllers\Api\ContactGroup;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Cooperation\Cooperation;
use App\Helpers\ContactGroup\ContactGroupHelper;
use App\Helpers\CSV\ContactCSVHelper;
use App\Helpers\Delete\Models\DeleteContactGroup;
use App\Helpers\Excel\ExportGroupReportExcelHelper;
use App\Helpers\Laposta\LapostaListHelper;
use App\Helpers\Laposta\LapostaMemberHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Http\RequestQueries\ContactGroup\Grid\RequestQuery;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Contact\GridContactGroupContacts;
use App\Http\Resources\ContactGroup\ContactGroupPeek;
use App\Http\Resources\ContactGroup\FullContactGroup;
use App\Http\Resources\ContactGroup\GridContactGroup;
use App\Http\Resources\Task\SidebarTask;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class ContactGroupController extends Controller
{
    protected array $errorMessagesLaposta = [];
    public function getErrorMessagesLaposta()
    {
        return $this->errorMessagesLaposta;
    }

    public function grid(RequestQuery $query)
    {
        $this->authorize('view', ContactGroup::class);

        $contactGroups = $query->get();
        $cooperation = Cooperation::first();
        $useLaposta = $cooperation ? $cooperation->use_laposta : false;
        return GridContactGroup::collection($contactGroups)
            ->additional([
                'meta' => [
                    'total' => $query->total(),
                    'useLaposta' => $useLaposta,
                ]
            ]);
    }

    public function peek()
    {
        $teamContactGroupIds = Auth::user()->getTeamContactGroupIds();
        if($teamContactGroupIds){
            $contactGroups = ContactGroup::whereIn('id', $teamContactGroupIds)->orderBy('name')->get();
        } else {
            $contactGroups = ContactGroup::orderBy('name')->get();
        }

        return ContactGroupPeek::collection($contactGroups);
    }

    public function peekStatic()
    {
        return ContactGroupPeek::collection(ContactGroup::orderBy('name')->where('type_id', 'static')->get());
    }

    public function show(ContactGroup $contactGroup)
    {
        $contactGroup->load(['responsibleUser', 'createdBy', 'tasks', 'emailTemplateNewContactLink']);
        return FullContactGroup::make($contactGroup);
    }

    public function store(Request $request, RequestInput $requestInput)
    {
        $this->authorize('create', ContactGroup::class);

        $data = $requestInput->string('name')->whenMissing('')->next()
            ->string('description')->whenMissing('')->next()
            ->boolean('closed')->validate('boolean')->whenMissing(false)->next()
            ->integer('responsibleUserId')->default(null)
            ->validate('exists:users,id')->alias('responsible_user_id')->next()
            ->date('dateStarted')->default(null)->validate('nullable|date')
            ->alias('date_started')->next()
            ->date('dateFinished')->default(null)->validate('nullable|date')
            ->alias('date_finished')->next()
            ->boolean('showPortal')->validate('boolean')->alias('show_portal')->whenMissing(false)->next()
            ->boolean('editPortal')->validate('boolean')->alias('edit_portal')->whenMissing(false)->next()
            ->boolean('showContactForm')->validate('boolean')->alias('show_contact_form')->whenMissing(false)->next()
            ->string('contactGroupComposedType')->validate('string')->alias('composed_group_type')->whenMissing('one')->onEmpty('one')->next()
            ->boolean('sendEmailNewContactLink')->validate('boolean')->alias('send_email_new_contact_link')->whenMissing(false)->next()
            ->integer('emailTemplateIdNewContactLink')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_new_contact_link')->next()
            ->boolean('includeIntoExportGroupReport')->validate('boolean')->alias('include_into_export_group_report')->whenMissing(false)->next()
            ->boolean('isCoachGroup')->validate('boolean')->alias('is_coach_group')->whenMissing(false)->next()
            ->get();

        $contactGroupIds = explode(',', $request->contactGroupIds);

        if ($contactGroupIds[0] == '') {
            $contactGroupIds = [];
            $data['type_id'] = 'static';
            $data['composed_of'] = 'contacts';
        }
        else{
            $data['type_id'] = 'composed';
            $data['composed_of'] = 'both';
        }

        $contactGroup = new ContactGroup($data);
        $contactGroup->save();

        $contactGroup->contactGroups()->sync($contactGroupIds);

        return FullContactGroup::make($contactGroup->fresh());
    }

    public function update(
        RequestInput $requestInput,
        ContactGroup $contactGroup
    ) {
        $this->authorize('edit', $contactGroup);


        $data = $requestInput->string('name')->next()
            ->string('description')->next()
            ->boolean('closed')->validate('boolean')->next()
            ->integer('responsibleUserId')->onEmpty(null)
            ->validate('exists:users,id')->alias('responsible_user_id')->next()
            ->date('dateStarted')->onEmpty(null)->validate('nullable|date')
            ->alias('date_started')->next()
            ->date('dateFinished')->onEmpty(null)->validate('nullable|date')
            ->alias('date_finished')->next()
            ->boolean('showPortal')->validate('boolean')->alias('show_portal')->whenMissing(false)->next()
            ->boolean('editPortal')->validate('boolean')->alias('edit_portal')->whenMissing(false)->next()
            ->boolean('showContactForm')->validate('boolean')->alias('show_contact_form')->whenMissing(false)->next()
            ->string('contactGroupComposedType')->validate('string')->alias('composed_group_type')->whenMissing('one')->onEmpty('one')->next()
            ->string('type')->validate('string|required')->alias('type_id')->next()
            ->string('dynamicFilterType')->validate('string')->alias('dynamic_filter_type')->whenMissing('and')->onEmpty('and')->next()
            ->boolean('sendEmailNewContactLink')->validate('boolean')->alias('send_email_new_contact_link')->whenMissing(false)->next()
            ->integer('emailTemplateIdNewContactLink')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_new_contact_link')->next()
            ->boolean('includeIntoExportGroupReport')->validate('boolean')->alias('include_into_export_group_report')->whenMissing(false)->next()
            ->boolean('isCoachGroup')->validate('boolean')->alias('is_coach_group')->whenMissing(false)->next()
            ->get();

        //Van dynamisch een statische groep maken
        if($contactGroup->type_id === 'dynamic' && $data['type_id'] === 'static'){
            $this->makeStatic($contactGroup);
        }

        $contactGroup->fill($data);
        $contactGroup->save();

        if($contactGroup->is_used_in_laposta){
            if($contactGroup->simulatedGroup){
                $lapostaListHelper = new LapostaListHelper($contactGroup->simulatedGroup, false);
                $lapostaListHelper->updateList();
            } else {
                $lapostaListHelper = new LapostaListHelper($contactGroup, false);
                $lapostaListHelper->updateList();
            }
        }

        return FullContactGroup::make($contactGroup->load('responsibleUser', 'emailTemplateNewContactLink'));
    }

    public function destroy(ContactGroup $contactGroup)
    {
        $this->authorize('delete', $contactGroup);

        try {
            DB::beginTransaction();

            if($contactGroup->simulatedGroup){
                $deleteContactGroupSimulatedGroup = new DeleteContactGroup($contactGroup->simulatedGroup);
                $resultSimulatedGroup = $deleteContactGroupSimulatedGroup->delete();
                if(count($resultSimulatedGroup) > 0){
                    DB::rollBack();
                    abort(412, implode(";", array_unique($resultSimulatedGroup)));
                }
            }

            $deleteContactGroup = new DeleteContactGroup($contactGroup);
            $result = $deleteContactGroup->delete();

            if(count($result) > 0){
                DB::rollBack();
                abort(412, implode(";", array_unique($result)));
            }

            DB::commit();
        } catch (\PDOException $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            abort(501, 'Er is helaas een fout opgetreden.');
        }

    }

    public function contacts(ContactGroup $contactGroup)
    {
        return FullContact::collection($contactGroup->contacts);
    }

    public function gridContacts(ContactGroup $contactGroup)
    {
        return GridContactGroupContacts::collection($contactGroup->all_contact_group_contacts);
    }

    public function addContact(ContactGroup $contactGroup, Contact $contact, $collectMessages = false)
    {
        $this->authorize('addToGroup', $contact);

        if(!$contactGroup->contacts()->where('contact_id', $contact->id)->exists()){

           $contactGroup->contacts()->attach([$contact->id => ['member_created_at' => Carbon::now(), 'member_to_group_since' => Carbon::now()]]);
            if($contactGroup->laposta_list_id){
                $lapostaMemberHelper = new LapostaMemberHelper($contactGroup, $contact, $collectMessages);
                $lapostaMemberHelper->createMember();
                if($collectMessages){
                    $this->errorMessagesLaposta = array_merge($this->errorMessagesLaposta, $lapostaMemberHelper->getMessages() );
                }
            }

            if($contactGroup->send_email_new_contact_link){
                $contactGroupHelper = new ContactGroupHelper($contactGroup, $contact);
                $contactGroupHelper->processEmailNewContactToGroup();
            }
            if($contactGroup->is_coach_group){
                $contact->is_coach = true;
                $contact->save();
            }
        }
    }

    public function removeContact(ContactGroup $contactGroup, Contact $contact, $collectMessages = false)
    {
        $this->authorize('removeFromGroup', $contact);

        if($contactGroup->laposta_list_id){
            if($contactGroup->contacts()->where('contact_id', $contact->id)->exists()){
                $contactGroupPivot = $contactGroup->contacts()->where('contact_id', $contact->id)->first()->pivot;
                if($contactGroupPivot->laposta_member_id !== null
                    && $contactGroupPivot->laposta_member_state !== 'unknown'
                    && $contactGroupPivot->laposta_member_state !== 'inprogress'
                ){
                    $lapostaMemberHelper = new LapostaMemberHelper($contactGroup, $contact, $collectMessages);
                    $lapostaMemberHelper->deleteMember();
                    if($collectMessages){
                        $this->errorMessagesLaposta = array_merge($this->errorMessagesLaposta, $lapostaMemberHelper->getMessages() );
                    }

                }
            }
        }

        $contactGroup->contacts()->detach($contact);
    }

    public function updateContact(ContactGroup $contactGroup, Contact $contact, Request $request)
    {
        $this->authorize('updateFromGroup', $contact);

        //Van dynamic eerst een static groep maken
        if($contactGroup->type_id === 'dynamic' || $contactGroup->type_id === 'composed'){
            $contactGroupUpdate = $contactGroup->simulatedGroup;
        }else{
            $contactGroupUpdate = $contactGroup;
        }

        $contactGroupUpdate->contacts()->updateExistingPivot($contact->id, ['member_to_group_since' => Carbon::parse($request->get('memberToGroupSince'))]);
    }

    public function addContacts(ContactGroup $contactGroup, Request $request)
    {
        $contactIds = $request->input();

        foreach ($contactIds as $contactId) {
            $contact = Contact::find($contactId);
            $contactGroup->contacts()->syncWithoutDetaching([ $contact->id => ['member_created_at' => Carbon::now(), 'member_to_group_since' => Carbon::now()]]);
            if($contactGroup->laposta_list_id && $contact) {
                $lapostaMemberHelper = new LapostaMemberHelper($contactGroup, $contact, false);
                $lapostaMemberHelper->createMember();
            }
        }
    }

    public function tasks(ContactGroup $contactGroup)
    {
        return SidebarTask::collection($contactGroup->tasks);
    }

    public function getCsv(ContactGroup $contactGroup)
    {
        set_time_limit(0);

        $contactCSVHelper = new ContactCSVHelper($contactGroup->all_contacts);

        return $contactCSVHelper->downloadCSV();
    }

    public function excelGroupReport()
    {
        set_time_limit(0);
        $contacts = Contact::whereHas('selectedGroups')->get();

        $exportGroupReportExcelHelper = new ExportGroupReportExcelHelper($contacts);

        return $exportGroupReportExcelHelper->downloadExportGroupReportExcelHelper();
    }


    public function detachComposedContactGroup(ContactGroup $contactGroup, ContactGroup $contactGroupToDetach)
    {
        $contactGroup->contactGroups()->detach($contactGroupToDetach);
    }

    public function attachComposedContactGroup(ContactGroup $contactGroup, ContactGroup $contactGroupToAttach)
    {
        if(!($contactGroup->id === $contactGroupToAttach->id)) {
            $contactGroup->contactGroups()->syncWithoutDetaching($contactGroupToAttach);
        }
    }

    public function detachComposedExceptedContactGroup(ContactGroup $contactGroup, ContactGroup $contactGroupToDetach)
    {
        $contactGroup->contactGroupsExcepted()->detach($contactGroupToDetach);
    }

    public function attachComposedExceptedContactGroup(ContactGroup $contactGroup, ContactGroup $contactGroupToAttach)
    {
        if(!($contactGroup->id === $contactGroupToAttach->id)) {
            $contactGroup->contactGroupsExcepted()->syncWithoutDetaching($contactGroupToAttach);
        }
    }

    private function makeStatic(ContactGroup $contactGroup){
        $dynamicContacts = $contactGroup->getDynamicContacts();

        foreach ($contactGroup->filters as $filter){
            $filter->delete();
        }

        foreach ($contactGroup->extraFilters as $extraFilter){
            $extraFilter->delete();
        }

        if($contactGroup->composed_of === 'contacts'){
            $contactGroup->contacts()->sync($dynamicContacts->get());
        }
        else if($contactGroup->composed_of === 'participants'){
            // Als we een dynamische groep statisch maken die was samengesteld uit participants, dan zetten we deze om naar samengesteld uit contacts.
            // Daarna kan deze statische groep ook gebruikt worden in filter statische groep bij contacten.
//            $contactGroup->participants()->sync($dynamicContacts->get());
            $contactGroup->contacts()->sync($dynamicContacts->get()->pluck("contact_id"));
            $contactGroup->composed_of = 'contacts';
        }

    }


    public function syncContactGroupLapostaList(ContactGroup $contactGroup)
    {
        $this->syncLapostaList($contactGroup);

        if (count($this->getErrorMessagesLaposta())) {
            throw ValidationException::withMessages(array("econobis" => $this->getErrorMessagesLaposta()));
        }
    }

    public function syncLapostaList(ContactGroup $contactGroup) {

        // Laposta list bijwerken
        if($contactGroup->is_used_in_laposta){

            // via simulategroup
            if($contactGroup->simulatedGroup){
                $contactGroup->simulatedGroup->name = $contactGroup->name;
                $contactGroup->simulatedGroup->description = $contactGroup->description;
                $contactGroup->simulatedGroup->save();
                $lapostaListHelper = new LapostaListHelper($contactGroup->simulatedGroup, true);
                $lapostaListId = $lapostaListHelper->updateList();
                $this->errorMessagesLaposta = array_merge($this->errorMessagesLaposta, $lapostaListHelper->getMessages() );

                $contactGroupToAdd = $contactGroup->getAllContacts()->diff($contactGroup->simulatedGroup->getAllContacts());
                foreach ($contactGroupToAdd as $contact){
                    $this->addContact($contactGroup->simulatedGroup, $contact, true);
                }

                // haal contactgroup opnieuw op, er kunnen contacten zijn toegevoegd.
                $contactGroupWithAdded = ContactGroup::find($contactGroup->id);

                $contactGroupToRemove = $contactGroupWithAdded->simulatedGroup->getAllContacts()->diff($contactGroupWithAdded->getAllContacts());
                foreach ($contactGroupToRemove as $contact){
                    $this->removeContact($contactGroupWithAdded->simulatedGroup, $contact, true);
                }

                // haal contactgroup opnieuw op, er kunnen contacten zijn verwijderd.
                $contactGroupWithAddedAndRemoved = ContactGroup::find($contactGroup->id);

                $contactGroupToUpdate = $contactGroupWithAddedAndRemoved->simulatedGroup->contacts->whereNull('pivot.laposta_member_id');
                foreach ($contactGroupToUpdate as $contact){
                    if($contactGroupWithAddedAndRemoved->simulatedGroup->laposta_list_id){
                        $lapostaMemberHelper = new LapostaMemberHelper($contactGroupWithAddedAndRemoved->simulatedGroup, $contact, true);
                        $lapostaMemberHelper->createMember();
                        $this->errorMessagesLaposta = array_merge($this->errorMessagesLaposta, $lapostaMemberHelper->getMessages() );
                    }
                }
                $contactGroupToUpdate = $contactGroupWithAddedAndRemoved->simulatedGroup->contacts->where('pivot.laposta_member_state', 'unknown');
                foreach ($contactGroupToUpdate as $contact){
                    $lapostaMemberHelper = new LapostaMemberHelper($contactGroupWithAddedAndRemoved->simulatedGroup, $contact, true);
                    $lapostaMemberHelper->updateMember();
                    $this->errorMessagesLaposta = array_merge($this->errorMessagesLaposta, $lapostaMemberHelper->getMessages() );
                }

            }else{
                $lapostaListHelper = new LapostaListHelper($contactGroup, true);
                $lapostaListId = $lapostaListHelper->updateList();
                $this->errorMessagesLaposta = array_merge($this->errorMessagesLaposta, $lapostaListHelper->getMessages() );

                if($contactGroup->laposta_list_id){
                    $contactGroupToUpdate = $contactGroup->contacts->whereNull('pivot.laposta_member_id');
                    foreach ($contactGroupToUpdate as $contact){
                        $lapostaMemberHelper = new LapostaMemberHelper($contactGroup, $contact, true);
                        $lapostaMemberHelper->createMember();
                        $this->errorMessagesLaposta = array_merge($this->errorMessagesLaposta, $lapostaMemberHelper->getMessages() );
                    }
                    $contactGroupToUpdate = $contactGroup->contacts->where('pivot.laposta_member_state', 'unknown');
                    foreach ($contactGroupToUpdate as $contact){
                        $lapostaMemberHelper = new LapostaMemberHelper($contactGroup, $contact, true);
                        $lapostaMemberHelper->updateMember();
                        $this->errorMessagesLaposta = array_merge($this->errorMessagesLaposta, $lapostaMemberHelper->getMessages() );
                    }
                }

            }

        } else {

            // Laposta list aanmaken
            $contactGroupNew = null;

            //Van static groep maken
            if($contactGroup->type_id === 'static' ){
                $contactGroupNew = $contactGroup;
            // via simulategroup maken
            } else if($contactGroup->simulatedGroup){
                $contactGroupNew = $contactGroup->simulatedGroup;
                //Van dynamic eerst een static groep maken
            } else if($contactGroup->type_id === 'dynamic' ){
                $contactGroupNew = $contactGroup->replicate();
                $contactGroupNew->type_id = 'simulated';
                $contactGroupNew->composed_of = 'contacts';
                $contactGroupNew->show_contact_form = false;
                $contactGroupNew->save();

                $contactGroup->simulated_group_id = $contactGroupNew->id;
                $contactGroup->save();
                if($contactGroup->composed_of === 'contacts'){
                    $contactGroupNew->contacts()->sync($contactGroup->getDynamicContacts()->get()->pluck("id"));
                }
                else if($contactGroup->composed_of === 'participants'){
                    $contactGroupNew->contacts()->sync($contactGroup->getDynamicContacts()->get()->pluck("contact_id"));
                }
            //Van composed eerst een static groep maken
            } else if($contactGroup->type_id === 'composed' ){
                $contactGroupNew = $contactGroup->replicate();
                $contactGroupNew->type_id = 'simulated';
                $contactGroupNew->composed_of = 'contacts';
                $contactGroupNew->show_contact_form = false;
                $contactGroupNew->save();

                $contactGroup->simulated_group_id = $contactGroupNew->id;
                $contactGroup->save();
                $contactGroupNew->contacts()->sync($contactGroup->composed_contacts->pluck("id"));
            }

            if(!$contactGroupNew){
                return null;
            }

            $lapostaListHelper = new LapostaListHelper($contactGroupNew, true);
            $lapostaListId = $lapostaListHelper->createList();
            $this->errorMessagesLaposta = array_merge($this->errorMessagesLaposta, $lapostaListHelper->getMessages() );
        }

        return $lapostaListId;
    }

    public function deActivateContactGroupLapostaList(ContactGroup $contactGroup)
    {
        $this->deActivateLapostaList($contactGroup);

        if (count($this->getErrorMessagesLaposta())) {
            throw ValidationException::withMessages(array("econobis" => $this->getErrorMessagesLaposta()));
        }
    }

    public function deActivateLapostaList(ContactGroup $contactGroup) {
        // Laposta list bijwerken
        if($contactGroup->is_used_in_laposta){

            // via simulategroup
            if($contactGroup->simulatedGroup){
                $contactGroupToUpdate = $contactGroup->simulatedGroup->contacts->whereNotNull('pivot.laposta_member_id');
                foreach ($contactGroupToUpdate as $contact) {
                    $contactGroup->simulatedGroup->contacts()->updateExistingPivot($contact->id, ['laposta_member_id' => null, 'laposta_member_state' => null]);
                }
                $contactGroup->simulatedGroup->laposta_list_id = null;
                $contactGroup->simulatedGroup->laposta_list_created_at = null;
                $contactGroup->simulatedGroup->save();
            }else{
                $contactGroupToUpdate = $contactGroup->contacts->whereNotNull('pivot.laposta_member_id');
                foreach ($contactGroupToUpdate as $contact) {
                    $contactGroup->contacts()->updateExistingPivot($contact->id, ['laposta_member_id' => null, 'laposta_member_state' => null]);
                }
                $contactGroup->laposta_list_id = null;
                $contactGroup->laposta_list_created_at = null;
                $contactGroup->save();
            }
        }

        // Laposta list uitzetten
        return '';
    }
}
