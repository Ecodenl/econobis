<?php

namespace App\Http\Controllers\Api\Contact;

use App\Eco\Contact\Contact;
use App\Eco\Email\Email;
use App\Eco\User\User;
use App\Helpers\Delete\DeleteHelper;
use App\Http\Resources\Contact\ContactPeek;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Task\SidebarTask;
use App\Eco\Contact\Jobs\DeleteContact;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class ContactController extends Controller
{
    public function show(Contact $contact, Request $request)
    {
        $this->authorize('view', $contact);

        $contact->load('addresses.country');
        $contact->load('emailAddresses');
        $contact->load('phoneNumbers');
        $contact->load('contactNotes');
        $contact->contactNotes->load('createdBy');
        $contact->contactNotes->load('updatedBy');
        $contact->load('createdBy');
        $contact->load('updatedBy');
        $contact->load('owner');
        $contact->load('tasks');
        $contact->load('notes');
        $contact->load('documents');
        $contact->load('opportunities');
        $contact->load('contactEnergySuppliers');
        $contact->load('participations');
        $contact->load('occupations');
        $contact->load('primaryOccupations');
        $contact->occupations->load('occupation');
        $contact->occupations->load('primaryContact');
        $contact->occupations->load('contact');
        $contact->primaryOccupations->load('occupation');
        $contact->primaryOccupations->load('primaryContact');
        $contact->primaryOccupations->load('contact');
        $contact->contactEnergySuppliers->load('energySupplier');
        $contact->contactEnergySuppliers->load('contactEnergySupplyStatus');
        $contact->contactEnergySuppliers->load('contactEnergySupplyType');
        $contact->contactEnergySuppliers->load('createdBy');
        $contact->contactEnergySuppliers->load('contact');

        if($contact->isOrganisation()) $contact->load(['organisation.type', 'organisation.industry', 'organisation.quotationRequests.opportunity.measureCategory', 'organisation.quotationRequests.opportunity.status', 'organisation.campaigns', 'contactPerson.contact']);
        if($contact->isPerson()) $contact->load(['person.lastNamePrefix', 'person.title', 'person.organisation', 'person.type']);

        $contact->relatedEmailsInbox = $this->getRelatedEmails($contact, $contact->id, 'inbox');
        $contact->relatedEmailsSent = $this->getRelatedEmails($contact, $contact->id, 'sent');

        return new FullContact($contact);
    }

    public function destroy(Contact $contact)
    {
        $this->authorize('delete', $contact);

        DeleteHelper::delete($contact);
    }

    public function intakes(Contact $contact)
    {
        $intakes = $contact->intakes;

        $result = [];
        foreach ($intakes as $intake){
            $result[] = [
                'id' => $intake->id,
                'addressName' =>  $intake->address->present()->streetAndNumber(),
                'createdAt' => $intake->created_at,
            ];
        }

        return $result;
    }

    public function housingFiles(Contact $contact)
    {
        $housingFiles = $contact->housingFiles;

        $result = [];
        foreach ($housingFiles as $housingFile){
            $result[] = [
                'id' => $housingFile->id,
                'addressName' =>  $housingFile->address->present()->streetAndNumber(),
                'createdAt' => $housingFile->created_at,
            ];
        }

        return $result;
    }

    public function peek()
    {
        $contact = Contact::select('id', 'full_name', 'number')->orderBy('full_name')->whereNull('deleted_at')->get();

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
        $this->authorize('updateOwner', $contact);

        $contact->owner()->associate($user);
        $contact->save();
    }

    public function getRelatedEmails(Contact $contact, $id, $folder)
    {
        $user = Auth::user();

        $mailboxIds = $user->mailboxes()->pluck('mailbox_id');

        return $contact->emails()->whereIn('mailbox_id', $mailboxIds)->where('contact_id', $id)->where('folder', $folder)->get();
    }
}
