<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\QuotationRequest;


use App\Eco\Email\Email;
use App\Eco\Occupation\Occupation;
use App\Eco\Occupation\OccupationContact;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Opportunity\OpportunityAction;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use App\Helpers\CSV\QuotationRequestCSVHelper;
use App\Helpers\Delete\Models\DeleteQuotationRequest;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\QuotationRequest\Grid\RequestQuery;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\QuotationRequest\FullQuotationRequest;
use App\Http\Resources\QuotationRequest\GridQuotationRequest;
use App\Http\Resources\QuotationRequest\QuotationRequestPeek;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class QuotationRequestController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $quotationRequests = $requestQuery->get();

        $quotationRequests->load([
            'organisationOrCoach',
            'projectManager',
            'externalParty',
            'opportunity.intake.address',
            'opportunity.measureCategory',
            'opportunity.measures',
            'opportunity.intake.campaign',
            'opportunity.intake.contact',
            'status',
            'opportunityAction',
            ]);

        return GridQuotationRequest::collection($quotationRequests)
            ->additional(['meta' => [
            'total' => $requestQuery->total(),
            ]
        ]);
    }

    public function show(QuotationRequest $quotationRequest)
    {
        $quotationRequest->load([
            'organisationOrCoach.contactPerson.contact',
            'projectManager',
            'externalParty',
            'opportunity.intake.contact',
            'opportunity.intake.campaign',
            'opportunity.intake.campaign.organisations',
            'opportunity.intake.campaign.coaches',
            'opportunity.intake.campaign.projectManagers',
            'opportunity.intake.campaign.externalParties',
            'opportunity.measureCategory',
            'opportunity.measures',
            'documents',
            'status',
            'opportunityAction',
            'createdBy',
            'updatedBy'
        ]);

        $quotationRequest->relatedEmailsSent = $this->getRelatedEmails($quotationRequest->id, 'sent');
        $quotationRequest->relatedCoachEmailsSent = $quotationRequest->relatedEmailsSent->filter(function (Email $email) use ($quotationRequest) {
            return in_array(optional(optional($quotationRequest->organisationOrCoach)->primaryEmailAddress)->email, $email->to);
        })->values();
        $quotationRequest->relatedOccupantEmailsSent = $quotationRequest->relatedEmailsSent->filter(function (Email $email) use ($quotationRequest) {
            return in_array(optional($quotationRequest->opportunity->intake->contact->primaryEmailAddress)->email, $email->to);
        })->values();
        $quotationRequest->relatedCoachAndOccupantEmailsSent = $quotationRequest->relatedEmailsSent->filter(function (Email $email) use ($quotationRequest) {
            return in_array(optional(optional($quotationRequest->organisationOrCoach)->primaryEmailAddress)->email, $email->to) && in_array(optional($quotationRequest->opportunity->intake->contact->primaryEmailAddress)->email, $email->to);
        })->values();

        $quotationRequest->relatedQuotationRequestsStatuses = $this->getRelatedQuotationRequestsStatuses($quotationRequest->opportunityAction);

        $teamDocumentCreatedFromIds = Auth::user()->getDocumentCreatedFromIds();
        if($teamDocumentCreatedFromIds){
            $quotationRequest->relatedDocuments = $quotationRequest->documents()->whereIn('document_created_from_id', $teamDocumentCreatedFromIds)->get();
        } else{
            $quotationRequest->relatedDocuments = $quotationRequest->documents()->get();
        }

        return FullQuotationRequest::make($quotationRequest);
    }

    public function csv(RequestQuery $requestQuery)
    {
        set_time_limit(0);
        $quotationRequests = $requestQuery->getQueryNoPagination()->get();

        $quotationRequestCSVHelper = new QuotationRequestCSVHelper($quotationRequests);

        return $quotationRequestCSVHelper->downloadCSV();
    }

    /**
     * Geef de data die React nodig heeft om het scherm op te bouwen voor een nieuw offerteverzoek
     */
    public function getStore(Opportunity $opportunity, OpportunityAction $opportunityAction)
    {
        $opportunity->load([
            'intake.address',
            'measures',
            'measureCategory',
            'intake.contact',
            'intake.campaign.organisations',
            'intake.campaign.coaches',
            'intake.campaign.projectManagers',
            'intake.campaign.externalParties',
        ]);

        $opportunity->relatedQuotationRequestsStatuses = $this->getRelatedQuotationRequestsStatuses($opportunityAction);
        $defaultStatusId = QuotationRequestStatus::where('opportunity_action_id', $opportunityAction->id)->orderBy('order')->first()->id;
        $opportunity->defaultStatusId = $defaultStatusId;

        return FullOpportunity::make($opportunity);
    }

    public function store(Request $request)
    {
        $this->authorize('manage', QuotationRequest::class);

        $data = $request->validate([
            'organisationOrCoachId' => 'nullable|exists:contacts,id',
            'projectManagerId' => 'nullable|exists:contacts,id',
            'externalPartyId' => 'nullable|exists:contacts,id',
            'opportunityId' => 'required|exists:opportunities,id',
            'dateRecorded' => 'string',
            'timeRecorded' => 'string',
            'dateReleased' => 'string',
            'timeReleased' => 'string',
            'datePlanned' => 'string',
            'timePlanned' => 'string',
            'dateApprovedClient' => 'string',
            'dateApprovedProjectManager' => 'string',
            'dateApprovedExternal' => 'string',
            'statusId' => 'required|exists:quotation_request_status,id',
            'opportunityActionId' => [Rule::requiredIf(!$request->has('opportunityActionCodeRef')), 'exists:opportunity_actions,id'],
            'quotationText' => 'string',
            'durationMinutes' => 'integer',
            'usesPlanning' => 'boolean',
            'districtId' => 'nullable',
            'opportunityActionCodeRef' => 'string',
        ]);

        //basic QuotationRequest
        $quotationRequest = new QuotationRequest();

        //required
        $quotationRequest->opportunity_id = $data['opportunityId'];
        $quotationRequest->status_id = $data['statusId'];
        $quotationRequest->opportunity_action_id = $data['opportunityActionId'] ?? null;

        //optional
        if ($data['organisationOrCoachId']) {
            $quotationRequest->contact_id = $data['organisationOrCoachId'];
        }
        if ($data['projectManagerId']) {
            $quotationRequest->project_manager_id = $data['projectManagerId'];
        }
        if ($data['externalPartyId']) {
            $quotationRequest->external_party_id = $data['externalPartyId'];
        }

        if ($data['dateRecorded']) {
            if ($data['timeRecorded']) {
                $dateRecorded = Carbon::parse($request->get('dateRecorded'))->format('Y-m-d');
                $timeRecorded = Carbon::parse($request->get('timeRecorded'))->format('H:i');
                $dateRecordedMerged = Carbon::createFromFormat('Y-m-d H:i', $dateRecorded . ' ' . $timeRecorded);
            } else {
                $dateRecorded = Carbon::parse($request->get('dateRecorded'))->format('Y-m-d');
                $dateRecordedMerged = Carbon::createFromFormat('Y-m-d H:i', $dateRecorded . ' 08:00');
            }
            $quotationRequest->date_recorded = $dateRecordedMerged;
        }

        if ($data['dateReleased']) {
            if ($data['timeReleased']) {
                $dateReleased = Carbon::parse($request->get('dateReleased'))->format('Y-m-d');
                $timeReleased = Carbon::parse($request->get('timeReleased'))->format('H:i');
                $dateReleasedMerged = Carbon::createFromFormat('Y-m-d H:i', $dateReleased . ' ' . $timeReleased);
            } else {
                $dateReleased = Carbon::parse($request->get('dateReleased'))->format('Y-m-d');
                $dateReleasedMerged = Carbon::createFromFormat('Y-m-d H:i', $dateReleased . ' 08:00');
            }
            $quotationRequest->date_released = $dateReleasedMerged;
        }

        if ($data['datePlanned']) {
            if ($data['timePlanned']) {
                $datePlanned = Carbon::parse($request->get('datePlanned'))->format('Y-m-d');
                $timePlanned = Carbon::parse($request->get('timePlanned'))->format('H:i');
                $datePlannedMerged = Carbon::createFromFormat('Y-m-d H:i', $datePlanned . ' ' . $timePlanned);
            } else {
                $datePlanned = Carbon::parse($request->get('datePlanned'))->format('Y-m-d');
                $datePlannedMerged = Carbon::createFromFormat('Y-m-d H:i', $datePlanned . ' 08:00');
            }
            $quotationRequest->date_planned = $datePlannedMerged;
        }

        if ($data['dateApprovedClient']) {
            $quotationRequest->date_approved_client = $data['dateApprovedClient'];
        }

        if ($data['dateApprovedProjectManager']) {
            $quotationRequest->date_approved_project_manager = $data['dateApprovedProjectManager'];
        }

        if ($data['dateApprovedExternal']) {
            $quotationRequest->date_approved_external = $data['dateApprovedExternal'];
        }

        if (isset($data['quotationText'])) {
            $quotationRequest->quotation_text = $data['quotationText'];
        }

        $quotationRequest->duration_minutes = $request->input('durationMinutes');
        $quotationRequest->uses_planning = $request->input('usesPlanning', false);
        $quotationRequest->district_id = $request->input('districtId', null);

        if($request->has('opportunityActionCodeRef')){
            $quotationRequest->opportunity_action_id = OpportunityAction::firstWhere(['code_ref' => $request->input('opportunityActionCodeRef')])->id;
        }

        $quotationRequest->save();

        $this->creatEnergyCoachOccupation($quotationRequest);

        return $this->show($quotationRequest);
    }


    public function update(Request $request, QuotationRequest $quotationRequest)
    {
        $this->authorize('manage', QuotationRequest::class);

        $data = $request->validate([
            'organisationOrCoachId' => 'nullable|exists:contacts,id',
            'projectManagerId' => 'nullable|exists:contacts,id',
            'externalPartyId' => 'nullable|exists:contacts,id',
            'opportunityId' => 'required|exists:opportunities,id',
            'dateRecorded' => 'string',
            'timeRecorded' => 'string',
            'dateReleased' => 'string',
            'timeReleased' => 'string',
            'datePlanned' => 'string',
            'timePlanned' => 'string',
            'dateApprovedClient' => 'string',
            'dateApprovedProjectManager' => 'string',
            'dateApprovedExternal' => 'string',
            'statusId' => 'required|exists:quotation_request_status,id',
            'opportunityActionId' => 'required|exists:opportunity_actions,id',
            'quotationText' => 'string',
        ]);

        //required
        $quotationRequest->opportunity_id = $data['opportunityId'];
        $quotationRequest->status_id = $data['statusId'];
        $quotationRequest->opportunity_action_id = $data['opportunityActionId'];

        //optional
        if ($data['organisationOrCoachId']) {
            $quotationRequest->contact_id = $data['organisationOrCoachId'];
        }
        if ($data['projectManagerId']) {
            $quotationRequest->project_manager_id = $data['projectManagerId'];
        }
        if ($data['externalPartyId']) {
            $quotationRequest->external_party_id = $data['externalPartyId'];
        }

        if ($data['dateRecorded']) {
            if ($data['timeRecorded']) {
                $dateRecorded = Carbon::parse($request->get('dateRecorded'))->format('Y-m-d');
                $timeRecorded = Carbon::parse($request->get('timeRecorded'))->format('H:i');
                $dateRecordedMerged = Carbon::createFromFormat('Y-m-d H:i', $dateRecorded . ' ' . $timeRecorded);
            } else {
                $dateRecorded = Carbon::parse($request->get('dateRecorded'))->format('Y-m-d');
                $dateRecordedMerged = Carbon::createFromFormat('Y-m-d H:i', $dateRecorded . ' 08:00');
            }
            $quotationRequest->date_recorded = $dateRecordedMerged;
        } else {
            $quotationRequest->date_recorded = null;
        }

        if ($data['dateReleased']) {
            if ($data['timeReleased']) {
                $dateReleased = Carbon::parse($request->get('dateReleased'))->format('Y-m-d');
                $timeReleased = Carbon::parse($request->get('timeReleased'))->format('H:i');
                $dateReleasedMerged = Carbon::createFromFormat('Y-m-d H:i', $dateReleased . ' ' . $timeReleased);
            } else {
                $dateReleased = Carbon::parse($request->get('dateReleased'))->format('Y-m-d');
                $dateReleasedMerged = Carbon::createFromFormat('Y-m-d H:i', $dateReleased . ' 08:00');
            }
            $quotationRequest->date_released = $dateReleasedMerged;
        }

        if ($data['datePlanned']) {
            if ($data['timePlanned']) {
                $datePlanned = Carbon::parse($request->get('datePlanned'))->format('Y-m-d');
                $timePlanned = Carbon::parse($request->get('timePlanned'))->format('H:i');
                $datePlannedMerged = Carbon::createFromFormat('Y-m-d H:i', $datePlanned . ' ' . $timePlanned);
            } else {
                $datePlanned = Carbon::parse($request->get('datePlanned'))->format('Y-m-d');
                $datePlannedMerged = Carbon::createFromFormat('Y-m-d H:i', $datePlanned . ' 08:00');
            }
            $quotationRequest->date_planned = $datePlannedMerged;
        }

        if ($data['dateApprovedClient']) {
            $quotationRequest->date_approved_client = $data['dateApprovedClient'];
        }

        if ($data['dateApprovedProjectManager']) {
            $quotationRequest->date_approved_project_manager = $data['dateApprovedProjectManager'];
        }

        if ($data['dateApprovedExternal']) {
            $quotationRequest->date_approved_external = $data['dateApprovedExternal'];
        }

        if (isset($data['quotationText'])) {
            $quotationRequest->quotation_text = $data['quotationText'];
        }
        $quotationRequest->save();

        $this->creatEnergyCoachOccupation($quotationRequest);

        return $this->show($quotationRequest);
    }

    public function destroy(QuotationRequest $quotationRequest)
    {
        $this->authorize('manage', QuotationRequest::class);

        try {
            DB::beginTransaction();

            $deleteQuotationRequest = new DeleteQuotationRequest($quotationRequest);
            $result = $deleteQuotationRequest->delete();

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

    public function peek()
    {
        $teamContactIds = Auth::user()->getTeamContactIds();
        if ($teamContactIds){
            $quotationRequests = QuotationRequest::whereHas('opportunity', function($query) use($teamContactIds){
                $query->whereHas('intake', function($query) use($teamContactIds){
                    $query->whereIn('contact_id', $teamContactIds);
                });
            })->orderBy('id')->get();
        }else{
            $quotationRequests = QuotationRequest::orderBy('id')->get();
        }

        return QuotationRequestPeek::collection($quotationRequests);
    }

    protected function getRelatedEmails($id, $folder)
    {
        $mailboxIds = Auth::user()->mailboxes()->pluck('mailbox_id');
        return Email::where('quotation_request_id', $id)->where('folder', $folder)->whereIn('mailbox_id', $mailboxIds)->get();
    }

    protected function getRelatedQuotationRequestsStatuses(OpportunityAction $opportunityAction)
    {
        return FullEnumWithIdAndName::collection(QuotationRequestStatus::where('opportunity_action_id', $opportunityAction->id)->orderBy('order')->get());
    }


    public function getAmountOfOpenQuotationRequests(){
        return QuotationRequest::where('status_id', 1)->count();
    }

    protected function creatEnergyCoachOccupation(QuotationRequest $quotationRequest)
    {
        $organisationOrCoach = $quotationRequest->organisationOrCoach;
        $resident = $quotationRequest->opportunity->intake->contact;
        $energyCoachOccupation = Occupation::where('primary_occupation', 'LIKE', 'Energiecoach%')->first();
        if($energyCoachOccupation && $resident && $organisationOrCoach->isCoach()){
            // is coach, create occupation if not exits yet.
            if (!OccupationContact::where('primary_contact_id', $organisationOrCoach->id)->where('contact_id', $resident->id)->where('occupation_id', $energyCoachOccupation->id)->exists()) {
                // rol coach/resident doesn't exists yet.
                OccupationContact::create([
                    'occupation_id' => $energyCoachOccupation->id,
                    'primary_contact_id' => $organisationOrCoach->id,
                    'contact_id' => $resident->id,
                    'primary' => true,
                ]);
            }
        }
    }

}