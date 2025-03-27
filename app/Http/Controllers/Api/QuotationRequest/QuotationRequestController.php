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
use App\Helpers\Excel\QuotationRequestExcelHelper;
use App\Helpers\Delete\Models\DeleteQuotationRequest;
use App\Helpers\Opportunity\OpportunityHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\QuotationRequest\Grid\RequestQuery;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\QuotationRequest\FullQuotationRequest;
use App\Http\Resources\QuotationRequest\FullQuotationRequestStatus;
use App\Http\Resources\QuotationRequest\GridQuotationRequest;
use App\Http\Resources\QuotationRequest\QuotationRequestPeek;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use App\Helpers\Hoomdossier\HoomdossierHelper;

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
                'quotationRequestIdsTotal' => $requestQuery->totalIds(),            ]
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

        $quotationRequest->relatedOccupantEmailsSent = $quotationRequest->relatedEmailsSent->filter(function (Email $email) use ($quotationRequest) {
            return in_array(optional(optional($quotationRequest->opportunity->intake->contact)->primaryEmailAddress)->email, $email->to);
        })->values();
        $quotationRequest->relatedCoachEmailsSent = $quotationRequest->relatedEmailsSent->filter(function (Email $email) use ($quotationRequest) {
            return in_array(optional(optional($quotationRequest->organisationOrCoach)->primaryEmailAddress)->email, $email->to);
        })->values();
        $quotationRequest->relatedExternalpartyEmailsSent = $quotationRequest->relatedEmailsSent->filter(function (Email $email) use ($quotationRequest) {
            return in_array(optional(optional($quotationRequest->Externalparty)->primaryEmailAddress)->email, $email->to);
        })->values();
        $quotationRequest->relatedCoachAndOccupantEmailsSent = $quotationRequest->relatedEmailsSent->filter(function (Email $email) use ($quotationRequest) {
            return in_array(optional(optional($quotationRequest->organisationOrCoach)->primaryEmailAddress)->email, $email->cc) && in_array(optional($quotationRequest->opportunity->intake->contact->primaryEmailAddress)->email, $email->to);
        })->values();
        $quotationRequest->relatedExternalpartyAndOccupantEmailsSent = $quotationRequest->relatedEmailsSent->filter(function (Email $email) use ($quotationRequest) {
            return in_array(optional(optional($quotationRequest->externalParty)->primaryEmailAddress)->email, $email->cc) && in_array(optional($quotationRequest->opportunity->intake->contact->primaryEmailAddress)->email, $email->to);
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

    public function showUpdateOpportunityStatus(Request $request, QuotationRequest $quotationRequest)
    {
        $data = $request->validate([
            'statusId' => 'required|exists:quotation_request_status,id',
        ]);
        $quotationRequest->status_id = $data['statusId'];
        $opportunityHelper = new OpportunityHelper($quotationRequest);

        return $opportunityHelper->showUpdateOpportunityStatus();
    }


    public function csv(RequestQuery $requestQuery)
    {
        set_time_limit(0);
        $quotationRequests = $requestQuery->getQueryNoPagination()->get();

        $quotationRequestCSVHelper = new QuotationRequestCSVHelper($quotationRequests);

        return $quotationRequestCSVHelper->downloadCSV();
    }

    public function spuklaiExcel(RequestQuery $requestQuery, $type)
    {
        set_time_limit(0);
        $quotationRequests = $requestQuery->getQueryNoPagination()->get();

        $quotationRequestExcelHelper = new QuotationRequestExcelHelper($quotationRequests);

        return $quotationRequestExcelHelper->downloadSpukLaiExcel();
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
        $defaultStatusId = QuotationRequestStatus::where('opportunity_action_id', $opportunityAction->id)->where('code_ref', 'default')->orderBy('order')->first()->id;
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
            'statusId' => 'required|exists:quotation_request_status,id',
            'opportunityActionId' => [Rule::requiredIf(!$request->has('opportunityActionCodeRef')), 'exists:opportunity_actions,id'],
            'quotationText' => 'string',
            'dateRecorded' => 'string',
            'timeRecorded' => 'string',
            'dateReleased' => 'string',
            'timeReleased' => 'string',
            'datePlannedAttempt1' => 'string',
            'datePlanned' => 'string',
            'timePlanned' => 'string',
            'dateApprovedClient' => 'string',
            'dateApprovedProjectManager' => 'string',
            'dateApprovedExternal' => 'string',
            'dateUnderReview' => 'string',
            'dateExecuted' => 'string',
            'quotationAmount' => 'string',
            'costAdjustment' => 'string',
            'awardAmount' => 'string',
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

        if (isset($data['datePlannedAttempt1'])) {
            $quotationRequest->date_planned_attempt1 = !empty($data['datePlannedAttempt1']) ? $data['datePlannedAttempt1'] : null;
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

        if (isset($data['dateUnderReview']) && $data['dateUnderReview']) {
            $quotationRequest->date_under_review = $data['dateUnderReview'];
        }

        if (isset($data['dateExecuted']) && $data['dateExecuted']) {
            $quotationRequest->date_executed = $data['dateExecuted'];
        }

        if (isset($data['quotationText'])) {
            $quotationRequest->quotation_text = $data['quotationText'];
        }

        if (isset($data['quotationAmount'])) {
            $quotationRequest->quotation_amount = trim($data['quotationAmount']) ?: 0;
        }
        if (isset($data['costAdjustment'])) {
            $quotationRequest->cost_adjustment = trim($data['costAdjustment']) ?: 0;
        }
        if (isset($data['awardAmount'])) {
            $quotationRequest->award_amount = trim($data['awardAmount']) ?: 0;
        }

        $quotationRequest->duration_minutes = $request->input('durationMinutes');
        $quotationRequest->uses_planning = $request->input('usesPlanning', false);
        $quotationRequest->district_id = $request->input('districtId', null);

        if($request->has('opportunityActionCodeRef')){
            $quotationRequest->opportunity_action_id = OpportunityAction::firstWhere(['code_ref' => $request->input('opportunityActionCodeRef')])->id;
        }

        $quotationRequest->save();

        $this->creatEnergyCoachOccupation($quotationRequest);

        //if contact has a hoom_account_id, coach is set and coach has a hoom_account_id connect the coach to the hoom dossier
        if($quotationRequest->organisationOrCoach && $quotationRequest->organisationOrCoach->isCoach()){
            $HoomdossierHelper = new HoomdossierHelper($quotationRequest->opportunity->intake->contact);
            $HoomdossierHelper->connectCoachToHoomdossier($quotationRequest);
        }

        $quotationRequest->sendPlannedInDistrictMails();

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
            'statusId' => 'required|exists:quotation_request_status,id',
            'quotationText' => 'string',
            'dateRecorded' => 'string',
            'timeRecorded' => 'string',
            'dateReleased' => 'string',
            'timeReleased' => 'string',
            'datePlannedAttempt1' => 'string',
            'datePlannedAttempt2' => 'string',
            'datePlannedAttempt3' => 'string',
            'datePlanned' => 'string',
            'timePlanned' => 'string',
            'dateApprovedClient' => 'string',
            'dateApprovedProjectManager' => 'string',
            'dateApprovedExternal' => 'string',
            'dateUnderReview' => 'string',
            'dateExecuted' => 'string',
            'dateUnderReviewDetermination' => 'string',
            'dateApprovedDetermination' => 'string',
            'opportunityActionId' => 'required|exists:opportunity_actions,id',
            'coachOrOrganisationNote' => 'string',
            'quotationAmount' => 'string',
            'costAdjustment' => 'string',
            'awardAmount' => 'string',
//            'amountDetermination' => 'string',
        ]);

        //required
        $quotationRequest->opportunity_id = $data['opportunityId'];
        $quotationRequest->status_id = $data['statusId'];
        $quotationRequest->opportunity_action_id = $data['opportunityActionId'];

        //optional
        if ($data['organisationOrCoachId']) {
            $quotationRequest->contact_id = $data['organisationOrCoachId'];
        } else {
            $quotationRequest->contact_id = null;
        }
        if ($data['projectManagerId']) {
            $quotationRequest->project_manager_id = $data['projectManagerId'];
        } else {
            $quotationRequest->project_manager_id = null;
        }
        if ($data['externalPartyId']) {
            $quotationRequest->external_party_id = $data['externalPartyId'];
        } else {
            $quotationRequest->external_party_id = null;
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
        } else {
            $quotationRequest->date_released = null;
        }

        if (isset($data['datePlannedAttempt1'])) {
            $quotationRequest->date_planned_attempt1 = !empty($data['datePlannedAttempt1']) ? $data['datePlannedAttempt1'] : null;
        }
        if (isset($data['datePlannedAttempt2'])) {
            $quotationRequest->date_planned_attempt2 = !empty($data['datePlannedAttempt2']) ? $data['datePlannedAttempt2'] : null;
        }
        if (isset($data['datePlannedAttempt3'])) {
            $quotationRequest->date_planned_attempt3 = !empty($data['datePlannedAttempt3']) ? $data['datePlannedAttempt3'] : null;
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
        } else {
            $quotationRequest->date_planned = null;
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

        if ($data['dateUnderReview']) {
            $quotationRequest->date_under_review = $data['dateUnderReview'];
        }

        if (isset($data['dateExecuted'])) {
            $quotationRequest->date_executed = !empty($data['dateExecuted']) ? $data['dateExecuted'] : null;
        }

        if ($data['dateUnderReviewDetermination']) {
            $quotationRequest->date_under_review_determination = $data['dateUnderReviewDetermination'];
        }
        if ($data['dateApprovedDetermination']) {
            $quotationRequest->date_approved_determination = $data['dateApprovedDetermination'];
        }

        if (isset($data['quotationText'])) {
            $quotationRequest->quotation_text = $data['quotationText'];
        }
        if (isset($data['coachOrOrganisationNote'])) {
            $quotationRequest->coach_or_organisation_note = $data['coachOrOrganisationNote'];
        }

        if (isset($data['quotationAmount'])) {
            $quotationRequest->quotation_amount = $data['quotationAmount'];
        }

        if (isset($data['costAdjustment'])) {
            $quotationRequest->cost_adjustment = $data['costAdjustment'];
        }
        if (isset($data['awardAmount'])) {
            $quotationRequest->award_amount = $data['awardAmount'];
        }
//        if (isset($data['amountDetermination'])) {
//            $quotationRequest->amount_determination = $data['amountDetermination'];
//        }
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

    public function bulkDelete(Request $request)
    {
        $this->authorize('manage', QuotationRequest::class);

        $allResult = [];

        if($request->input('ids')){
            $quotationRequestsToDelete = QuotationRequest::whereIn('id', $request->input('ids'))->get();
            foreach ($quotationRequestsToDelete as $quotationRequest) {

                try {
                    DB::beginTransaction();

                    $deleteQuotationRequest = new DeleteQuotationRequest($quotationRequest);
                    $result = $deleteQuotationRequest->delete();
                    if(count($result) > 0){
                        $allResult[] = $result;
                        DB::rollBack();
                    }

                    DB::commit();
                } catch (\PDOException $e) {
                    DB::rollBack();
                    Log::error($e->getMessage());
                    abort(501, 'Er is helaas een fout opgetreden.');
                }

            }
        }

        return $allResult;
    }

    public function bulkUpdate(Request $request)
    {
        $this->authorize('manage', QuotationRequest::class);

        $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:quotation_requests,id'],
        ]);

        $quotationRequests = QuotationRequest::whereIn('id', $request->input('ids'))->get();

        // todo WM: is dit nodig?
//        foreach ($quotationRequests as $quotationRequest) {
//            $this->authorize('manage', $quotationRequest);
//        }

        $data = $request->validate([
            'statusId' => ['nullable', 'exists:quotation_request_status,id'],
        ]);

        foreach ($quotationRequests as $quotationRequest) {
            $quotationRequest->update(Arr::keysToSnakeCase($data));
        }

    }

    public function peek(Request $request)
    {
        $teamContactIds = Auth::user()->getTeamContactIds();

        $query = QuotationRequest::query()->orderBy('id');
        if ($teamContactIds) {
            $query->whereHas('opportunity.intake', function ($query) use ($teamContactIds) {
                $query->whereIn('contact_id', $teamContactIds);
            });
        }

        if($request->has('contactIds')){
            $query->whereHas('opportunity.intake', function ($query) use ($request) {
                $query->whereIn('contact_id', json_decode($request->input('contactIds')));
            });
        }

        return QuotationRequestPeek::collection($query->get());
    }

    protected function getRelatedEmails($id, $folder)
    {
        $mailboxIds = Auth::user()->mailboxes()->pluck('mailbox_id');
        return Email::where('quotation_request_id', $id)->where('folder', $folder)->whereIn('mailbox_id', $mailboxIds)->get();
    }

    protected function getRelatedQuotationRequestsStatuses(OpportunityAction $opportunityAction)
    {
        return FullQuotationRequestStatus::collection(QuotationRequestStatus::where('opportunity_action_id', $opportunityAction->id)->orderBy('order')->get());
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