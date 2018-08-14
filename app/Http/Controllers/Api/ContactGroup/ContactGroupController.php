<?php

namespace App\Http\Controllers\Api\ContactGroup;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
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
            ->get();

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
            abort(501, $e->getMessage());
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
}
