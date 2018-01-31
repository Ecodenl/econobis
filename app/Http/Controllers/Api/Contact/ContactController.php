<?php

namespace App\Http\Controllers\Api\Contact;

use App\Eco\Contact\Contact;
use App\Eco\User\User;
use App\Http\Resources\Contact\ContactPeek;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Task\SidebarTask;
use App\Eco\Contact\Jobs\DeleteContact;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;

class ContactController extends Controller
{
    public function show(Contact $contact, Request $request)
    {
        $this->authorize('view', $contact);

        $contact->load('addresses');
        $contact->load('emailAddresses');
        $contact->load('phoneNumbers');
        $contact->load('notes');
        $contact->notes->load('createdBy');
        $contact->notes->load('updatedBy');
        $contact->load('createdBy');
        $contact->load('updatedBy');
        $contact->load('owner');

        if($contact->isOrganisation()) $contact->load(['organisation.type', 'organisation.industry', 'organisation.people.person', 'organisation.people.organisation', 'organisation.people.occupation', 'organisation.quotations.opportunity.measure', 'organisation.quotations.opportunity.status', 'organisation.campaigns']);
        if($contact->isPerson()) $contact->load(['person.lastNamePrefix', 'person.title', 'person.organisation', 'person.type', 'person.occupations.person', 'person.occupations.organisation', 'person.occupations.occupation']);

        return new FullContact($contact);
    }

    public function destroy(Contact $contact)
    {
        $this->authorize('delete', $contact);

        DeleteContact::single($contact);
    }

    public function registrations(Contact $contact)
    {
        $registrations = $contact->registrations;

        $result = [];
        foreach ($registrations as $registration){
            $result[] = [
                'id' => $registration->id,
                'addressName' =>  $registration->address->present()->streetAndNumber(),
                'createdAt' => $registration->created_at,
            ];
        }

        return $result;
    }

    public function peek()
    {
        $contact = Contact::select('id', 'full_name')->orderBy('full_name')->get();

        return ContactPeek::collection($contact);
    }

    public function groups(Contact $contact)
    {
        $groups = $contact->groups()->select('name', 'id')->get();

        return $groups;
    }

    public function tasks(Contact $contact)
    {
        return SidebarTask::collection($contact->tasks);
    }

    public function associateOwner(Contact $contact, User $user)
    {
        $contact->owner()->associate($user);
        $contact->save();
    }

}
