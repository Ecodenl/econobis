<?php

namespace App\Http\Controllers\Api\ContactGroup;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Helpers\RequestInput\RequestInput;
use App\Http\RequestQueries\ContactGroup\Grid\RequestQuery;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Contact\GridContact;
use App\Http\Resources\ContactGroup\FullContactGroup;
use App\Http\Resources\ContactGroup\GridContactGroup;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ContactGroupController extends Controller
{
    public function grid(RequestQuery $query)
    {
        return GridContactGroup::collection($query->get());
    }

    public function show(ContactGroup $contactGroup)
    {
        $contactGroup->load(['responsibleUser', 'createdBy']);
        return FullContactGroup::make($contactGroup);
    }

    public function getContactGroups(Contact $contact)
    {
        $groups = $contact->groups()->select('name', 'id')->get();

        return $groups;
    }


    public function store(RequestInput $requestInput)
    {
//        $this->authorize('createGroup', ContactGroup::class);

        $data = $requestInput->string('name')->whenMissing('')->next()
            ->string('description')->whenMissing('')->next()
            ->boolean('closed')->validate('boolean')->whenMissing(false)->next()
            ->integer('responsibleUserId')->default(null)->validate('exists:users,id')->alias('responsible_user_id')->next()
            ->date('dateStarted')->default(null)->validate('nullable|date')->alias('date_started')->next()
            ->date('dateFinished')->default(null)->validate('nullable|date')->alias('date_finished')->next()
            ->get();

        $contactGroup = new ContactGroup($data);
        $contactGroup->save();

        return FullContactGroup::make($contactGroup->fresh());
    }

    public function update(RequestInput $requestInput, ContactGroup $contactGroup)
    {
//        $this->authorize('editGroup', ContactGroup::class);


        $data = $requestInput->string('name')->next()
            ->string('description')->next()
            ->boolean('closed')->validate('boolean')->next()
            ->integer('responsibleUserId')->onEmpty(null)->validate('exists:users,id')->alias('responsible_user_id')->next()
            ->date('dateStarted')->onEmpty(null)->validate('nullable|date')->alias('date_started')->next()
            ->date('dateFinished')->onEmpty(null)->validate('nullable|date')->alias('date_finished')->next()
            ->get();

        $contactGroup->fill($data);
        $contactGroup->save();

        return FullContactGroup::make($contactGroup->fresh());
    }

    public function destroy(ContactGroup $contactGroup)
    {
//        $this->authorize('deleteGroup', ContactGroup::class);

        $contactGroup->delete();
    }

    public function contacts(ContactGroup $contactGroup)
    {
        return FullContact::collection($contactGroup->contacts);
    }

    public function gridContacts(ContactGroup $contactGroup)
    {
        return GridContact::collection($contactGroup->contacts);
    }

    public function addContact(ContactGroup $contactGroup, Contact $contact)
    {
//        $this->authorize('addToGroup', ContactGroup::class);
        $contactGroup->contacts()->attach($contact);
    }

    public function removeContact(ContactGroup $contactGroup, Contact $contact)
    {
//        $this->authorize('removeFromGroup', ContactGroup::class);
        $contactGroup->contacts()->detach($contact);
    }

    public function addContacts(ContactGroup $contactGroup, Request $request)
    {
//        $this->authorize('addToGroup', ContactGroup::class);

        $contactIds = json_decode($request->input('ids'));

        $contactGroup->contacts()->attach($contactIds);
    }
}
