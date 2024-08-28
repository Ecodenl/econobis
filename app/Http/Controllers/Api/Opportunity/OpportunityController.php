<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Opportunity;

use App\Eco\Email\Email;
use App\Eco\Intake\Intake;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Opportunity\OpportunityStatus;
use App\Helpers\CSV\OpportunityCSVHelper;
use App\Helpers\Delete\Models\DeleteOpportunity;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Opportunity\Grid\RequestQuery;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\Opportunity\GridOpportunity;
use App\Http\Resources\Opportunity\OpportunityPeek;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OpportunityController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $opportunities = $requestQuery->get();

        $opportunities->load(['intake.contact', 'measureCategory', 'measures', 'intake.campaign', 'status', 'quotationRequests', 'intake.address']);

        return GridOpportunity::collection($opportunities)
            ->additional(['meta' => [
                'total' => $requestQuery->total(),
                'opportunityIdsTotal' => $requestQuery->totalIds(),
            ]
            ]);
    }

    public function show(Opportunity $opportunity)
    {
        $opportunity->load([
            'measureCategory',
            'quotationRequests.organisationOrCoach',
            'quotationRequests.projectManager',
            'quotationRequests.externalParty',
            'quotationRequests.createdBy',
            'quotationRequests.status',
            'quotationRequests.opportunityAction',
            'status',
            'evaluationRealised',
            'evaluationStatisfied',
            'evaluationRecommendOrganisation',
            'createdBy',
            'updatedBy',
            'intake.contact',
            'intake.campaign',
            'intake.address',
            'intake.campaign.opportunityActions',
            'tasks',
            'notes',
            'documents',
            'measures'
        ]);

        $opportunity->relatedEmailsSent = $this->getRelatedEmails($opportunity->id, 'sent');

        $teamDocumentCreatedFromIds = Auth::user()->getDocumentCreatedFromIds();
        if($teamDocumentCreatedFromIds){
            $opportunity->relatedDocuments = $opportunity->documents()->whereIn('document_created_from_id', $teamDocumentCreatedFromIds)->get();
        } else{
            $opportunity->relatedDocuments = $opportunity->documents()->get();
        }

        return FullOpportunity::make($opportunity);
    }

    public function csv(RequestQuery $requestQuery)
    {
        set_time_limit(0);
        $opportunities = $requestQuery->getQueryNoPagination()->get();

        $opportunityCSVHelper = new OpportunityCSVHelper($opportunities);

        return $opportunityCSVHelper->downloadCSV();
    }

    public function store(Request $request, RequestInput $requestInput)
    {
        $this->authorize('manage', Opportunity::class);

        $data = $requestInput
            ->integer('measureCategoryId')->validate('required|exists:measure_categories,id')->alias('measure_category_id')->next()
            ->integer('statusId')->validate('required|exists:opportunity_status,id')->alias('status_id')->next()
            ->integer('intakeId')->validate('required|exists:intakes,id')->onEmpty(null)->alias('intake_id')->next()
            ->string('quotationText')->alias('quotation_text')->next()
            ->string('amount')->alias('amount')->onEmpty(null)->next()
            ->string('desiredDate')->validate('date')->onEmpty(null)->alias('desired_date')->next()
            ->string('evaluationAgreedDate')->validate('date')->onEmpty(null)->alias('evaluation_agreed_date')->next()
            ->get();

        $opportunity = new Opportunity();
        $opportunity->fill($data);
        $opportunity->save();

        $intake = Intake::findOrFail($request->only(['intakeId']))->first();
        $intake->setStatusToInBehandeling();
        $intake->updateStatusToAfgeslotenMetKans();

        $measureIds = explode(',', $request->measureIds);

        if ($measureIds[0] == '') {
            $measureIds = [];
        }

        $opportunity->measures()->sync($measureIds);

        return FullOpportunity::make($opportunity->fresh());
    }

    public function update(Request $request, RequestInput $requestInput, Opportunity $opportunity) {

        $this->authorize('manage', Opportunity::class);

        $data = $requestInput
            ->integer('statusId')->validate('required|exists:opportunity_status,id')->alias('status_id')->next()
            ->string('quotationText')->alias('quotation_text')->next()
            ->string('desiredDate')->validate('date')->onEmpty(null)->alias('desired_date')->next()
            ->string('amount')->alias('amount')->onEmpty(null)->next()
            ->string('evaluationAgreedDate')->validate('date')->onEmpty(null)->alias('evaluation_agreed_date')->next()
            ->get();

        $opportunity->fill($data);
        $opportunity->save();

        $measureIds = explode(',', $request->measureIds);

        if ($measureIds[0] == '') {
            $measureIds = [];
        }

        $opportunity->measures()->sync($measureIds);

        return FullOpportunity::make($opportunity->fresh());
    }

    public function destroy(Opportunity $opportunity)
    {
        $this->authorize('manage', Opportunity::class);
        $intake = $opportunity->intake;

        try {
            DB::beginTransaction();

            $deleteOpportunity = new DeleteOpportunity($opportunity);
            $result = $deleteOpportunity->delete();

            if(count($result) > 0){
                DB::rollBack();
                abort(412, implode(";", array_unique($result)));
            }

            DB::commit();
            $intake->updateStatusToAfgeslotenMetKans();
        } catch (\PDOException $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            abort(501, 'Er is helaas een fout opgetreden.');
        }
    }

    public function bulkDelete(Request $request)
    {
        $this->authorize('manage', Opportunity::class);

        $allResult = [];

        if($request->input('ids')){
            $opportunitiesToDelete = Opportunity::whereIn('id', $request->input('ids'))->get();
            foreach ($opportunitiesToDelete as $opportunity) {

                try {
                    DB::beginTransaction();

                    $deleteOpportunity = new DeleteOpportunity($opportunity);
                    $result = $deleteOpportunity->delete();
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
        $this->authorize('manage', Opportunity::class);

        $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:opportunities,id'],
        ]);

        $opportunities = Opportunity::whereIn('id', $request->input('ids'))->get();

        // todo WM: is dit nodig?
//        foreach ($opportunities as $opportunity) {
//            $this->authorize('manage', $opportunity);
//        }

        $data = $request->validate([
            'statusId' => ['nullable', 'exists:opportunity_status,id'],
            'amount' => ['nullable', 'integer'],
            'desiredDate' => ['nullable', 'date'],
            'evaluationAgreedDate' => ['nullable', 'date'],
        ]);

        foreach ($opportunities as $opportunity) {
            $opportunity->update(Arr::keysToSnakeCase($data));
        }

    }

    public function getAmountOfActiveOpportunities(){
        return Opportunity::where('status_id', 1)->count();
    }

    public function peek(Request $request)
    {
        $teamContactIds = Auth::user()->getTeamContactIds();

        $query = Opportunity::query()->orderBy('id');
        if ($teamContactIds){
            $query->whereHas('intake', function($query) use($teamContactIds){
                $query->whereIn('contact_id', $teamContactIds);
            });
        }

        if($request->has('contactIds')){
            $query->whereHas('intake', function ($query) use ($request) {
                $query->whereIn('contact_id', json_decode($request->input('contactIds')));
            });
        }

        return OpportunityPeek::collection($query->get());
    }

    // Data for dashboard chart
    public function chartData()
    {
        $opportunityStatuses = OpportunityStatus::get();

        $chartData = [];

        foreach($opportunityStatuses as $opportunityStatus) {
            $chartData[] = [
                "name" => $opportunityStatus->name,
                "count" => Opportunity::where('status_id', $opportunityStatus->id)->count(),
                ];
        };

        return $chartData;
    }

    public function updateEvaluation(Request $request, RequestInput $requestInput, Opportunity $opportunity) {
        $this->authorize('manage', Opportunity::class);

        $data = $requestInput
            ->integer('evaluationIsRealised')->whenMissing(1)->alias('evaluation_is_realised')->next()
            ->integer('evaluationIsStatisfied')->whenMissing(1)->alias('evaluation_is_statisfied')->next()
            ->integer('evaluationWouldRecommendOrganisation')->whenMissing(1)->alias('evaluation_would_recommend_organisation')->next()
            ->string('evaluationNote')->alias('evaluation_note')->next()
            ->get();

        $opportunity->fill($data);
        $opportunity->save();

        return $this->show($opportunity);
    }

    protected function getRelatedEmails($id, $folder)
    {
        $mailboxIds = Auth::user()->mailboxes()->pluck('mailbox_id');
        return Email::where('opportunity_id', $id)->where('folder', $folder)->whereIn('mailbox_id', $mailboxIds)->get();
    }
}