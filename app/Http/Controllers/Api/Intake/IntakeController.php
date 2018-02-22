<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Intake;


use App\Eco\Email\Email;
use App\Eco\Measure\Measure;
use App\Eco\Intake\Intake;
use App\Eco\Contact\Contact;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Intake\Grid\RequestQuery;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Intake\FullIntake;
use App\Http\Resources\Intake\GridIntake;
use App\Http\Resources\Intake\IntakePeek;
use App\Http\Resources\Task\SidebarTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IntakeController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $intakes = $requestQuery->get();

        $intakes->load(['contact', 'address', 'measuresRequested', 'status']);

        return GridIntake::collection($intakes)
            ->additional(['meta' => [
            'total' => $requestQuery->total(),
            ]
        ]);
    }

    /**
     * Geef de data die React nodig heeft om het scherm op te bouwen voor een nieuwe intake
     */
    public function getStore(Contact $contact)
    {
        $info[] = $contact->getPrettyAddresses();

        return $info;
    }

    public function show(Intake $intake)
    {
        $intake->load([
            'contact',
            'address.housingFile',
            'campaign',
            'status',
            'sources',
            'reasons',
            'measuresRequested',
            'opportunities.measure',
            'opportunities.quotationRequests',
            'opportunities.status',
            'tasks',
            'notes',
            'documents',
            'emails',
            'createdBy',
            'updatedBy',
        ]);

        $measureRequestedWithOpportunityIds = [];

        foreach ($intake->measuresRequested as $measureRequested){
            if (count($measureRequested->opportunities))
            {
                array_push($measureRequestedWithOpportunityIds, $measureRequested->id);
            }
        }
        $intake->measureRequestedWithOpportunityIds = $measureRequestedWithOpportunityIds;

        $intake->relatedEmailsSent = $this->getRelatedEmails($intake->id, 'sent');

        return FullIntake::make($intake);
    }

    public function store(Request $request)
    {
        $this->authorize('manage', Intake::class);

        $data = $request->validate([
            'contactId' => 'required|exists:contacts,id',
            'addressId' => 'exists:addresses,id',
            'campaignId' => 'exists:campaigns,id',
            'statusId' => 'exists:intake_status,id',
            'sourceIds' => '',
            'intakeReasonIds' => '',
            'note' => ''
        ]);

        //basic intake
        $intake = new Intake();

        $intake->contact_id = $data['contactId'];

        if ($data['addressId']) {
            $intake->address_id
                = $data['addressId'];
        }

        if ($data['campaignId']) {
            $intake->campaign_id = $data['campaignId'];
        }

        if ($data['statusId']) {
            $intake->intake_status_id
                = $data['statusId'];
        }

        if ($data['note']) {
            $intake->note
                = $data['note'];
        }

        $intake->save();

        //relations
        if ($data['sourceIds']) {
            foreach ($data['sourceIds'] as $source_id) {
                $intake->sources()->attach($source_id);
            }
        }
        if ($data['intakeReasonIds']) {
            foreach ($data['intakeReasonIds'] as $intake_reason) {
                $intake->reasons()->attach($intake_reason);
            }
        }

        return $this->show($intake);
    }


    public function update(Request $request, Intake $intake)
    {
        $this->authorize('manage', Intake::class);

        $data = $request->validate([
            'campaignId' => 'exists:campaigns,id',
            'statusId' => 'exists:intake_status,id',
            'sourceIds' => '',
            'intakeReasonIds' => '',
            'note' => ''
        ]);

        if ($data['campaignId']) {
            $intake->campaign_id = $data['campaignId'];
        }

        if ($data['statusId']) {
            $intake->intake_status_id
                = $data['statusId'];
        }

        if ($data['note']) {
            $intake->note
                = $data['note'];
        }

        $intake->save();

        //relations
        if ($data['sourceIds']) {
            $intake->sources()->sync($data['sourceIds']);
        }

        if ($data['intakeReasonIds']) {
            $intake->reasons()->sync($data['intakeReasonIds']);
        }

        return $this->show($intake);
    }


    public function attachMeasureRequested(Intake $intake, Measure $measure)
    {
        $this->authorize('manage', Intake::class);

        $intake->measuresRequested()->attach($measure->id);

        return GenericResource::make($measure);
    }

    public function detachMeasureRequested(Intake $intake, Measure $measure)
    {
        $this->authorize('manage', Intake::class);

        $intake->measuresRequested()->detach($measure->id);

        return GenericResource::make($measure);
    }

//    public function destroy(Intake $intake)
//    {
//        $this->authorize('manage', Intake::class);
//
//        //delete many to many relations
//        $intake->sources()->detach();
//        $intake->reasons()->detach();
//        $intake->measuresRequested()->detach();
//        $intake->opportunities()->detach();
//
//        //delete one to many relations
//        //tasks
//        foreach($intake->tasks as $task){
//            $task->notes()->dissociate();
//            $task->save();
//        }
//        //notes
//        foreach($intake->notes as $note){
//            $note->notes()->dissociate();
//            $note->save();
//        }
//        //documents
//        foreach($intake->emails as $email){
//            $email->intake()->dissociate();
//            $email->save();
//        }
//
//        //delete model itself
//        $intake->delete();
//
//        return true;
//    }

    public function tasks(Intake $intake)
    {
        return SidebarTask::collection($intake->tasks);
    }

    public function notes(Intake $intake)
    {
        return SidebarTask::collection($intake->notes);
    }

    public function documents(Intake $intake)
    {
        return SidebarDocument::collection($intake->documents);
    }

    public function peek()
    {
        return IntakePeek::collection(Intake::orderBy('id')->with('contact')->get());
    }

    public function getAmountOfActiveIntakes(){
        return Intake::count();
    }

    public function getRelatedEmails($id, $folder)
    {
        $user = Auth::user();

        $mailboxIds = $user->mailboxes()->pluck('mailbox_id');

        return Email::whereIn('mailbox_id', $mailboxIds)->where('intake_id', $id)->where('folder', $folder)->get();
    }
}