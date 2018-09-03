<?php

namespace App\Http\Controllers\Api\ContactGroup;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ComposedContactGroup;
use App\Eco\ContactGroup\ContactGroup;
use App\Helpers\CSV\ContactCSVHelper;
use App\Helpers\Delete\Models\DeleteContactGroup;
use App\Helpers\RequestInput\RequestInput;
use App\Http\RequestQueries\ContactGroup\Grid\RequestQuery;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Contact\GridContact;
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
        $contactGroup->load(['responsibleUser', 'createdBy', 'tasks']);
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
            ->get();

        $contactGroupIds = explode(',', $request->contactGroupIds);

        if ($contactGroupIds[0] == '') {
            $contactGroupIds = [];
            $data['type_id'] = 'static';
        }
        else{
            $data['type_id'] = 'composed';
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
            ->get();

        //Van dynamisch een statische groep maken
        if($contactGroup->type_id === 'dynamic' && $data['type_id'] === 'static'){
            $this->makeStatic($contactGroup);
        }

        $contactGroup->fill($data);
        $contactGroup->save();

        return FullContactGroup::make($contactGroup->load('responsibleUser'));
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
    }

    public function contacts(ContactGroup $contactGroup)
    {
        return FullContact::collection($contactGroup->contacts);
    }

    public function gridContacts(ContactGroup $contactGroup)
    {
        return GridContact::collection($contactGroup->all_contacts);
    }

    public function addContact(ContactGroup $contactGroup, Contact $contact)
    {
        $this->authorize('addToGroup', $contact);
        $contactGroup->contacts()->attach($contact);
    }

    public function removeContact(ContactGroup $contactGroup, Contact $contact)
    {
        $this->authorize('removeFromGroup', $contact);
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
        $allContacts = $contactGroup->all_contacts;

        foreach ($contactGroup->filters as $filter){
            $filter->delete();
        }

        foreach ($contactGroup->extraFilters as $extraFilter){
            $extraFilter->delete();
        }

        $contactGroup->contacts()->sync($allContacts);
    }
}
