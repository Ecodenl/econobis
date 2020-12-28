<?php

namespace App\Http\Controllers\Api\Contact;

use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactStatus;
use App\Eco\Cooperation\Cooperation;
use App\Eco\User\User;
use App\Helpers\Delete\Models\DeleteContact;
use App\Helpers\Import\ContactImportHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\Contact\ContactPeek;
use App\Http\Resources\Contact\FullContactWithGroups;
use App\Http\Resources\Task\SidebarTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\RequestException;

class ContactController extends Controller
{
    public function show(Contact $contact, Request $request)
    {
        $this->authorize('view', $contact);

        $contact->load(['addresses.country', 'emailAddresses', 'phoneNumbers', 'createdBy', 'updatedBy', 'owner', 'portalUser', 'tasks', 'notes', 'documents', 'opportunities', 'participations', 'orders', 'invoices.order']);
        $contact->contactNotes->load(['createdBy', 'updatedBy']);
        $contact->occupations->load(['occupation', 'primaryContact', 'contact']);
        $contact->primaryOccupations->load(['occupation', 'primaryContact', 'contact']);
        $contact->contactEnergySuppliers->load(['energySupplier', 'contactEnergySupplyStatus', 'contactEnergySupplyType', 'createdBy', 'contact']);

        if($contact->isOrganisation()) $contact->load(['organisation.type', 'organisation.industry', 'organisation.quotationRequests.opportunity.measureCategory', 'organisation.quotationRequests.opportunity.status', 'organisation.campaigns', 'contactPerson.contact']);
        if($contact->isPerson()) $contact->load(['person', 'person.title', 'person.organisation', 'person.type']);

        $contact->relatedEmailsInbox = $this->getRelatedEmails($contact, $contact->id, 'inbox');
        $contact->relatedEmailsSent = $this->getRelatedEmails($contact, $contact->id, 'sent');

        return new FullContactWithGroups($contact);
    }

    public function validateImport(Request $request){
        $this->authorize('import', Contact::class);
        set_time_limit(180);
        $contactImportHelper = new ContactImportHelper();
        return $contactImportHelper->validateImport($request->file('attachment'));
    }

    public function import(Request $request){
        $this->authorize('import', Contact::class);
        set_time_limit(180);
        $contactImportHelper = new ContactImportHelper();
        return $contactImportHelper->import($request->file('attachment'));
    }

    public function destroy(Contact $contact)
    {
        $this->authorize('delete', $contact);

        try {
            DB::beginTransaction();

            $deleteContact = new DeleteContact($contact);
            $result = $deleteContact->delete();

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

    public function destroyContacts(Request $request)
    {
        $ids = $request->input('ids');

        foreach($ids as $id){
            $this->destroy(Contact::find($id));
        }
    }

    public function intakes(Contact $contact)
    {
        $intakes = $contact->intakes;

        $result = [];
        foreach ($intakes as $intake){
            $result[] = [
                'id' => $intake->id,
                'addressName' =>  $intake->address ? $intake->address->present()->streetAndNumber() : 'Onbekend',
                'campaignName' => $intake->campaign ? $intake->campaign->name : 'Onbekend',
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
        $contact = Contact::select('id', 'full_name', 'number')->orderBy('full_name')->get();

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
        return $contact->emails()->where('contact_id', $id)->where('folder', $folder)->get();
    }

    // Data for dashboard chart
    public function chartData()
    {
        $contactStatuses = ContactStatus::collection();

        $chartData = [];

        foreach($contactStatuses as $contactStatus) {
            $chartData[] = [
                "name" => $contactStatus->name,
                "count" => Contact::where('status_id', $contactStatus->id)->count(),
            ];
        };

        return $chartData;
    }

    public function getPrimaryEmailAddressesId(Request $request)
    {

        $contactIds = $request->input('contactIds');
        $emailIds = [];

        if (is_array($contactIds)) {
            foreach ($contactIds as $contactId) {
                $contact = Contact::find($contactId);
                if ($contact->primaryEmailAddress) {
                    array_push($emailIds, $contact->primaryEmailAddress->id);
                }
            }
        } else {
            $contact = Contact::find($contactIds);
            if ($contact->primaryEmailAddress) {
                array_push($emailIds, $contact->primaryEmailAddress->id);
            }
        }

        return array_unique($emailIds);
    }

    public function makeHoomdossier(Contact $contact) {
        // Check if all necessary fields are filled
        $this->validateRequiredFields($contact);

        // Send to hoomdossier url
        $hoomAccountId = $this->sendHoomdossier($contact);

        if($hoomAccountId)
        // When success save hoomdossier id
        $contact->hoom_account_id = $hoomAccountId;
        $contact->save();

        // When successfull add contact to hoomgroup


        // When successfull send message to contact

        // Return hoomdossier id
        return $hoomAccountId;
    }

    private function validateRequiredFields($contact) {
        $errors = [];

        if(!$contact->primaryEmailAddress) {
            $errors[] = 'Primair mailadres ontbreekt';
        }

        if($contact->type_id == 'person') {
            if(!$contact->person->first_name) {
                $errors[] = 'Voornaam ontbreekt';
            }

            if(!$contact->person->last_name) {
                $errors[] = 'Achternaam ontbreekt';
            }
        }

        if(!$contact->primaryAddress) {
            $errors[] = 'Primair adres ontbreekt';
        }

        if(count($errors)) throw ValidationException::withMessages($errors);

        return true;
    }

    private function sendHoomdossier($contact) {
        // Get cooperation for hoom link and key
        $cooperation = Cooperation::first();

        // If hoom link contains .test then return fake id
        if(strpos ($cooperation->hoom_link, '.test')) return rand(1,3000);

        if($contact->person->last_name_prefix != '') {
            $lastName = $contact->person->last_name_prefix . ' ' . $contact->person->last_name;
        } else {
            $lastName = $contact->person->last_name;
        }

        $payload = [
            'key' => $cooperation->hoom_key,
            'contact_id' => $contact->id,
            'email' => $contact->primaryEmailAddress->email,
            'first_name' => $contact->person->first_name,
            'last_name' => $lastName,
            'postal_code' => $contact->primaryAddress->postal_code,
            'number' => $contact->primaryAddress->number,
            'house_number_extension' => $contact->primaryAddress->addition,
            'street' => $contact->primaryAddress->street,
            'city' => $contact->primaryAddress->city,
            'phone_number' => $contact->primaryphoneNumber ? $contact->primaryphoneNumber->number : '',
        ];

        $client = new Client;

        try {
            $response = $client->post($cooperation->hoom_link, $payload);
            return $response->getBody();
        } catch (RequestException $e) {
            if ($e->hasResponse()) {
                abort($e->getCode(), Psr7\str($e->getResponse()));
            } else {
                abort($e->getCode(), 'Er is iets misgegaan met het verzenden naar Hoomdossier');
            }
        }
    }
}
