<?php

namespace App\Http\Controllers\Api\Contact;

use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactStatus;
use App\Eco\User\User;
use App\Helpers\Contact\ContactMergeException;
use App\Helpers\Contact\ContactMerger;
use App\Helpers\Delete\Models\DeleteContact;
use App\Helpers\Hoomdossier\HoomdossierHelper;
use App\Helpers\Import\ContactImportHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\Contact\ContactPeekInspectionPerson;
use App\Http\Resources\Contact\ContactWithAddressPeek;
use App\Http\Resources\Contact\ContactPeek;
use App\Http\Resources\Contact\FullContactWithGroups;
use App\Http\Resources\Task\SidebarTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class ContactController extends Controller
{
    public function show(Contact $contact, Request $request)
    {
        set_time_limit(120);

        $this->authorize('view', $contact);
        $this->checkContactTeamAutorized($contact);

        $contact->load(['addresses.addressEnergySuppliers.energySupplier', 'addresses.addressEnergySuppliers.energySupplyType', 'addresses.addressEnergySuppliers.energySupplyStatus', 'addresses.currentAddressEnergySupplierElectricity', 'addresses.currentAddressEnergySupplierElectricity.energySupplier', 'addresses.currentAddressEnergySupplierGas', 'addresses.currentAddressEnergySupplierGas.energySupplier', 'addresses.country', 'emailAddresses', 'phoneNumbers', 'createdBy', 'updatedBy', 'owner', 'portalUser', 'tasks', 'notes', 'financialOverviewContactsSend', 'documents', 'opportunities', 'participations', 'orders', 'invoices']);
        $contact?->addresses?->load(['addressDongles', 'addressDongles.dongleReadOutType', 'addressDongles.dongleType']);
        $contact->contactNotes->load(['createdBy', 'updatedBy']);
        $contact->occupations->load(['occupation', 'primaryContact', 'contact']);
        $contact->primaryOccupations->load(['occupation', 'primaryContact', 'contact']);
        $contact->load(['quotationRequests.opportunity']);

        if($contact->isOrganisation()) $contact->load(['organisation.type', 'organisation.industry', 'organisation.campaigns', 'contactPerson.contact']);
        if($contact->isPerson()) $contact->load(['person', 'person.title', 'person.organisation', 'person.type']);
        if($contact->isCoach()) $contact->load(['coachCampaigns']);

        $contact->relatedEmailsInbox = $this->getRelatedEmails($contact, $contact->id, 'inbox');
        $contact->relatedEmailsSent = $this->getRelatedEmails($contact, $contact->id, 'sent');

        $teamDocumentCreatedFromIds = Auth::user()->getDocumentCreatedFromIds();
        if($teamDocumentCreatedFromIds){
            $contact->relatedDocuments = $contact->documents()->whereIn('document_created_from_id', $teamDocumentCreatedFromIds)->get();
        } else{
            $contact->relatedDocuments = $contact->documents()->get();
        }

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
        $this->checkContactTeamAutorized($contact);

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
        $this->checkContactTeamAutorized($contact);

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
        $this->checkContactTeamAutorized($contact);

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

    public function peek($inspectionPersonType = null)
    {
        $teamContactIds = Auth::user()->getTeamContactIds();

        if ($teamContactIds){
            $query = Contact::select('id', 'full_name', 'number', 'type_id')->whereIn('contacts.id', $teamContactIds)->orderBy('full_name');
        }else{
            $query = Contact::select('id', 'full_name', 'number', 'type_id')->orderBy('full_name');
        }

        if($inspectionPersonType !== null AND $inspectionPersonType !== "null") {
            $query->where(function ($q) use ($inspectionPersonType) {
                $q->where('inspection_person_type_id', $inspectionPersonType);
                $q->orWhereNull('inspection_person_type_id');
            });
        }

        $contacts = $query->get();

        return ContactPeek::collection($contacts);
    }

    public function peekCoach(Request $request)
    {
        $coaches = Contact::where('inspection_person_type_id', 'coach')->select('id', 'full_name')->orderBy('full_name', 'asc')->get();

        return ContactPeekInspectionPerson::collection($coaches);
    }

    public function peekProjectManager(Request $request)
    {
        $projectmanagers = Contact::where('inspection_person_type_id', 'projectmanager')->select('id', 'full_name')->orderBy('full_name', 'asc')->get();

        return ContactPeekInspectionPerson::collection($projectmanagers);
    }

    public function peekExternalParty(Request $request)
    {
        $externalParties = Contact::where('inspection_person_type_id', 'externalparty')->select('id', 'full_name')->orderBy('full_name', 'asc')->get();

        return ContactPeekInspectionPerson::collection($externalParties);
    }

    public function search(Request $request, $inspectionPersonType = null)
    {
        $teamContactIds = Auth::user()->getTeamContactIds();
        if ($teamContactIds){
            $contacts = Contact::select('id', 'full_name', 'number')->with('addresses')->whereIn('contacts.id', $teamContactIds)->orderBy('full_name');
        }else{
            $contacts = Contact::select('id', 'full_name', 'number')->with('addresses')->orderBy('full_name');
        }

        if($inspectionPersonType !== null AND $inspectionPersonType !== "null") {
            $contacts->where(function ($q) use ($inspectionPersonType) {
                $q->where('inspection_person_type_id', $inspectionPersonType);
                $q->orWhereNull('inspection_person_type_id');
            });
        }

        foreach(explode(" ", $request->input('searchTerm')) as $searchTerm) {
            $contacts->where(function ($contacts) use ($searchTerm) {
                $contacts->where('contacts.full_name', 'like', '%' . $searchTerm . '%')
                    ->orWhere('contacts.number', 'like', '%' . $searchTerm . '%');
            });
        }
        $contacts = $contacts->get();

        return ContactWithAddressPeek::collection($contacts);
    }

    public function getContactWithAddresses(Contact $contact, Request $request)
    {
        $this->checkContactTeamAutorized($contact);

        $contact->load(['addressesWithoutOld']);
        $contact->select('id', 'full_name', 'number')->orderBy('full_name')->first();

        return new ContactWithAddressPeek($contact);
    }

    public function peekWithAddress()
    {
        $teamContactIds = Auth::user()->getTeamContactIds();
        if ($teamContactIds){
            $contacts = Contact::select('id', 'full_name', 'number')->with('addresses')->whereIn('contacts.id', $teamContactIds)->orderBy('full_name')->get();
        }else{
            $contacts = Contact::select('id', 'full_name', 'number')->with('addresses')->orderBy('full_name')->get();
        }

        return ContactWithAddressPeek::collection($contacts);
    }

    public function groups(Contact $contact)
    {
        $this->checkContactTeamAutorized($contact);

        $groups = $contact->groups()->select('name', 'id')->get();

        return $groups;
    }

    public function tasks(Contact $contact)
    {
        $this->checkContactTeamAutorized($contact);

        return SidebarTask::collection($contact->tasks);
    }

    public function associateOwner(Contact $contact, User $user)
    {
        $this->checkContactTeamAutorized($contact);

        $this->authorize('updateOwner', $contact);

        $contact->owner()->associate($user);
        $contact->save();
    }

    protected function getRelatedEmails(Contact $contact, $id, $folder)
    {
        $mailboxIds = Auth::user()->mailboxes()->pluck('mailbox_id');

        $emails = $contact->emails()->where('contact_id', $id)->where('folder', $folder)->whereIn('mailbox_id', $mailboxIds)->get();
        $manualEmails = $contact->manualEmails()->where('contact_id', $id)->where('folder', $folder)->whereIn('mailbox_id', $mailboxIds)->get();

        return $emails->merge($manualEmails)->sortByDesc('id')->values();
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
        $emailAddressesToSelected = [];

        if (is_array($contactIds)) {
            foreach ($contactIds as $contactId) {
                $contact = Contact::find($contactId);
                if ($contact && $contact->primaryEmailAddress) {
                    array_push($emailIds, $contact->primaryEmailAddress->id);
                    $emailAddressesToSelected[] = [
                        'id' => $contact->primaryEmailAddress->id,
                        'name' => $contact->full_name . ' (' . $contact->primaryEmailAddress->email . ')',
                        'email' => $contact->primaryEmailAddress->email
                    ];
                }
            }
        } else {
            $contact = Contact::find($contactIds);
            if ($contact && $contact->primaryEmailAddress) {
                array_push($emailIds, $contact->primaryEmailAddress->id);
                $emailAddressesToSelected[] = [
                    'id' => $contact->primaryEmailAddress->id,
                    'name' => $contact->full_name . ' (' . $contact->primaryEmailAddress->email . ')',
                    'email' => $contact->primaryEmailAddress->email
                ];
            }
        }

        return ['emailIds' => array_unique($emailIds), 'emailAddressesToSelected'=> $emailAddressesToSelected];
    }

    public function makeHoomdossier(Contact $contact) {
        $this->checkContactTeamAutorized($contact);

        $hoomdossierHelper = new HoomdossierHelper($contact);

        return $hoomdossierHelper->make();
    }

    /**
     * @param Contact $contact
     */
    protected function checkContactTeamAutorized(Contact $contact): void
    {
        $teamContactIds = Auth::user()->getTeamContactIds();
        if ($teamContactIds && !in_array($contact->id, $teamContactIds)) {
            abort(403, 'Niet geautoriseerd.');
        }
    }


    public function mergeContacts(Request $request)
    {
        $request->validate([
            'toId' => ['required', 'integer', 'exists:contacts,id'],
            'fromId' => ['required', 'integer', 'exists:contacts,id'],
        ]);

        $toContact = Contact::find($request->input('toId'));
        $fromContact = Contact::find($request->input('fromId'));

        /**
         * Update 20221108; we always want to merge into the contact with the lowest id.
         * Update 20240507; to and from are selected by user.
         */
//        if($toContact->id > $fromContact->id) {
//            $temp = $toContact;
//            $toContact = $fromContact;
//            $fromContact = $temp;
//        }

        try{
            (new ContactMerger($toContact, $fromContact))->merge();
        }catch (ValidationException $e){
            return response()->json([
                'status'=> 'error',
                'code' => 422,
                'errors' => $e->errors()], 422);
        }catch (ContactMergeException $e){
            return response()->json(['message' => 'Contacten konden niet worden samengevoegd: ' . $e->getMessage()], 422);
        }catch (\Throwable $e){
            Log::error($e); // Zorgen dat we de error evengoed kunnen debuggen vanuit het log.
            return response()->json(['message' => 'Contacten konden niet worden samengevoegd, er is een onbekende fout opgetreden'], 422);
        }

        return response()->json(['message' => 'Contacten zijn samengevoegd.'], 200);
    }

    public function getCoachAttributes(Contact $contact)
    {
        return [
            'id' => $contact->id,
            'fullName' => $contact->full_name,
            'coachMaxAppointmentsPerWeek' => $contact->coach_max_appointments_per_week,
            'coachMaxAppointmentsPerMonth' => $contact->coach_max_appointments_per_month,
            'coachMinMinutesBetweenAppointments' => $contact->coach_min_minutes_between_appointments,
        ];
    }

    public function updateCoachAttributes(Contact $contact, Request $request)
    {
        $contact->coach_max_appointments_per_week = $request->input('coachMaxAppointmentsPerWeek') ?: 0;
        $contact->coach_max_appointments_per_month = $request->input('coachMaxAppointmentsPerMonth') ?: 0;
        $contact->coach_min_minutes_between_appointments = $request->input('coachMinMinutesBetweenAppointments') ?: 0;
        $contact->save();
    }
}
