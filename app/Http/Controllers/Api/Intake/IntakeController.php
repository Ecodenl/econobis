<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Intake;


use App\Eco\Email\Email;
use App\Eco\Intake\Intake;
use App\Eco\Contact\Contact;
use App\Eco\Measure\MeasureCategory;
use App\Helpers\CSV\IntakeCSVHelper;
use App\Helpers\Delete\Models\DeleteIntake;
use App\Helpers\Excel\IntakeExcelHelper;
use App\Helpers\Workflow\IntakeWorkflowHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Intake\Grid\RequestQuery;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Intake\FullIntake;
use App\Http\Resources\Intake\GridIntake;
use App\Http\Resources\Intake\FullIntakeWithCustomCampaigns;
use App\Http\Resources\Intake\IntakePeek;
use App\Http\Resources\Task\SidebarTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class IntakeController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $intakes = $requestQuery->get();

        $intakes->load(['contact', 'address', 'campaign', 'measuresRequested', 'status']);

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
            'opportunities.measures',
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
             if (count($measureRequested->opportunities()->where('intake_id', $intake->id)->get()))
            {
                array_push($measureRequestedWithOpportunityIds, $measureRequested->id);
            }
        }
        $intake->measureRequestedWithOpportunityIds = $measureRequestedWithOpportunityIds;

        $intake->relatedEmailsSent = $this->getRelatedEmails($intake->id, 'sent');

        $teamDocumentCreatedFromIds = Auth::user()->getDocumentCreatedFromIds();
        if($teamDocumentCreatedFromIds){
            $intake->relatedDocuments = $intake->documents()->whereIn('document_created_from_id', $teamDocumentCreatedFromIds)->get();
        } else{
            $intake->relatedDocuments = $intake->documents()->get();
        }

        return FullIntake::make($intake);
    }

    public function showWithCustomCampaigns(Intake $intake)
    {
        $intake->load([
            'contact',
            'address.housingFile',
            'campaign',
            'status',
            'sources',
            'reasons',
            'measuresRequested',
            'opportunities.measures',
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
            if (count($measureRequested->opportunities()->where('intake_id', $intake->id)->get()))
            {
                array_push($measureRequestedWithOpportunityIds, $measureRequested->id);
            }
        }
        $intake->measureRequestedWithOpportunityIds = $measureRequestedWithOpportunityIds;

        $intake->relatedEmailsSent = $this->getRelatedEmails($intake->id, 'sent');

        $teamDocumentCreatedFromIds = Auth::user()->getDocumentCreatedFromIds();
        if($teamDocumentCreatedFromIds){
            $intake->relatedDocuments = $intake->documents()->whereIn('document_created_from_id', $teamDocumentCreatedFromIds)->get();
        } else{
            $intake->relatedDocuments = $intake->documents()->get();
        }

        return FullIntakeWithCustomCampaigns::make($intake);
    }

    public function excel(RequestQuery $requestQuery, Request $request)
    {
        set_time_limit(0);
        $intakes = $requestQuery->getQueryNoPagination()->get();

        $intakeExcelHelper = new IntakeExcelHelper($intakes);

        return $intakeExcelHelper->downloadExcel($request->get('withOpportunities'));
    }

    public function store(Request $request)
    {
        $this->authorize('manage', Intake::class);

        $data = $request->validate([
            'contactId' => 'required|exists:contacts,id',
            'addressId' => 'exists:addresses,id',
            'campaignId' => 'required|exists:campaigns,id',
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
            'campaignId' => 'required|exists:campaigns,id',
            'statusId' => 'exists:intake_status,id',
            'sourceIds' => '',
            'intakeReasonIds' => '',
            'note' => ''
        ]);

        if ($data['campaignId'] && !$data['campaignId'] == '') {
            $intake->campaign_id = $data['campaignId'];
        }
        else{
            $intake->campaign_id = null;
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


    public function attachMeasureRequested(Intake $intake, MeasureCategory $measureCategory)
    {
        $this->authorize('manage', Intake::class);

        $intake->measuresRequested()->attach($measureCategory->id);

        //Indien maak kans
        if($measureCategory->uses_wf_create_opportunity){
            $intakeWorkflowHelper = new IntakeWorkflowHelper($intake, $measureCategory);
            $intakeWorkflowHelper->processWorkflowCreateOpportunity();
        }

        return GenericResource::make($measureCategory);
    }

    public function detachMeasureRequested(Intake $intake, MeasureCategory $measureCategory)
    {
        $this->authorize('manage', Intake::class);

        $intake->measuresRequested()->detach($measureCategory->id);

        return GenericResource::make($measureCategory);
    }

    public function destroy(Intake $intake)
    {
        $this->authorize('manage', Intake::class);

        try {
            DB::beginTransaction();

            $deleteIntake = new DeleteIntake($intake);
            $result = $deleteIntake->delete();

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

    public function peek(Request $request)
    {
        $teamContactIds = Auth::user()->getTeamContactIds();

        $query = Intake::query();
        if ($teamContactIds){
            $query->whereIn('contact_id', $teamContactIds)->orderBy('id')->with('contact');
        }else{
            $query->orderBy('id')->with('contact');
        }

        if($request->has('contactIds')){
            $query->whereIn('contact_id', json_decode($request->input('contactIds')));
        }

        return IntakePeek::collection($query->get());
    }

    public function getAmountOfActiveIntakes(){
        return Intake::count();
    }
    protected function getRelatedEmails($id, $folder)
    {
        $mailboxIds = Auth::user()->mailboxes()->pluck('mailbox_id');
        return Email::where('intake_id', $id)->where('folder', $folder)->whereIn('mailbox_id', $mailboxIds)->get();
    }
}