<?php

namespace App\Http\Controllers\Api\ContactGroup;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ComposedContactGroup;
use App\Eco\ContactGroup\ContactGroup;
use App\Helpers\ContactGroup\ContactGroupHelper;
use App\Helpers\CSV\ContactCSVHelper;
use App\Helpers\Delete\Models\DeleteContactGroup;
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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ContactGroupController extends Controller
{
    public function grid(RequestQuery $query)
    {
        $contactGroups = $query->get();

        return GridContactGroup::collection($contactGroups)
            ->additional([
                'meta' => [
                    'total' => $query->total(),
                ]
            ]);
    }

    public function peek()
    {
        return ContactGroupPeek::collection(ContactGroup::orderBy('name')->get());
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
            ->get();

        //Van dynamisch een statische groep maken
        if($contactGroup->type_id === 'dynamic' && $data['type_id'] === 'static'){
            $this->makeStatic($contactGroup);
        }

        $contactGroup->fill($data);
        $contactGroup->save();

        $lapostaListHelper = new LapostaListHelper($contactGroup);
        $lapostaListHelper->updateList();

        return FullContactGroup::make($contactGroup->load('responsibleUser', 'emailTemplateNewContactLink'));
    }

    public function destroy(ContactGroup $contactGroup)
    {
        $this->authorize('delete', $contactGroup);

        try {
            DB::beginTransaction();

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

        $lapostaListHelper = new LapostaListHelper($contactGroup);
        $lapostaListHelper->deleteList();

    }

    public function contacts(ContactGroup $contactGroup)
    {
        return FullContact::collection($contactGroup->contacts);
    }

    public function gridContacts(ContactGroup $contactGroup)
    {
        return GridContactGroupContacts::collection($contactGroup->all_contact_group_contacts);
    }

    public function addContact(ContactGroup $contactGroup, Contact $contact)
    {
        $this->authorize('addToGroup', $contact);

        if(!$contactGroup->contacts()->where('contact_id', $contact->id)->exists()){

            $contactGroup->contacts()->attach($contact);

            if($contactGroup->laposta_list_id){
                $lapostaMemberHelper = new LapostaMemberHelper($contactGroup, $contact);
                $lapostaMemberHelper->createMember();
            }

            if($contactGroup->send_email_new_contact_link){
                $contactGroupHelper = new ContactGroupHelper($contactGroup, $contact);
                $contactGroupHelper->processEmailNewContactToGroup();
            }
        }
    }

    public function removeContact(ContactGroup $contactGroup, Contact $contact)
    {
        $this->authorize('removeFromGroup', $contact);

        if($contactGroup->laposta_list_id){
            $lapostaMemberHelper = new LapostaMemberHelper($contactGroup, $contact);
            $lapostaMemberHelper->deleteMember();
        }

        $contactGroup->contacts()->detach($contact);
    }

    public function addContacts(ContactGroup $contactGroup, Request $request)
    {

        $contactIds = $request->input();

        $contactGroup->contacts()->syncWithoutDetaching($contactIds);
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

    private function makeStatic(ContactGroup $contactGroup){
        $dynamicContacts = $contactGroup->dynamic_contacts;

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

    public function createLapostaList(ContactGroup $contactGroup) {


        // Laposta list bijwerken
        if($contactGroup->is_used_in_laposta){

            //Van dynamic eerst een static groep maken
            if($contactGroup->type_id === 'dynamic' || $contactGroup->type_id === 'composed'){
                $contactGroup->simulatedGroup->name = $contactGroup->name;
                $contactGroup->simulatedGroup->description = $contactGroup->description;
                $contactGroup->simulatedGroup->save();
                $lapostaListHelper = new LapostaListHelper($contactGroup->simulatedGroup);
                return $lapostaListHelper->updateList();

            }else{
                $lapostaListHelper = new LapostaListHelper($contactGroup);
                return $lapostaListHelper->updateList();
            }

        }

        // Laposta list aanmaken

        //Van dynamic eerst een static groep maken
        if($contactGroup->type_id === 'dynamic' ){
            $contactGroupNew = $contactGroup->replicate();
            $contactGroupNew->type_id = 'simulated';
            $contactGroupNew->save();

            $contactGroup->simulated_group_id = $contactGroupNew->id;
            $contactGroup->save();

            $contactGroupNew->contacts()->sync($contactGroup->dynamic_contacts->get());
        }

        //Van composed eerst een static groep maken
        if($contactGroup->type_id === 'composed' ){
            $contactGroupNew = $contactGroup->replicate();
            $contactGroupNew->type_id = 'simulated';
            $contactGroupNew->save();

            $contactGroup->simulated_group_id = $contactGroupNew->id;
            $contactGroup->save();
            $contactGroupNew->contacts()->sync($contactGroup->composed_contacts->pluck("id"));
        }

        $lapostaListHelper = new LapostaListHelper($contactGroupNew);

        return $lapostaListHelper->createList();
    }
}
