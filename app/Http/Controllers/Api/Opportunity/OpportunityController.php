<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Opportunity;

use App\Eco\Email\Email;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Opportunity\OpportunityEvaluation;
use App\Eco\Opportunity\OpportunityStatus;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Opportunity\Grid\RequestQuery;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\Opportunity\GridOpportunity;
use App\Http\Resources\Opportunity\OpportunityPeek;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class OpportunityController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $opportunities = $requestQuery->get();

        $opportunities->load(['intake.contact', 'measureCategory', 'intake.campaign', 'status', 'quotationRequests']);

        return GridOpportunity::collection($opportunities)
            ->additional(['meta' => [
                'total' => $requestQuery->total(),
            ]
            ]);
    }

    public function show(Opportunity $opportunity)
    {
        $opportunity->load([
            'measureCategory',
            'quotationRequests.organisation',
            'quotationRequests.createdBy',
            'quotationRequests.status',
            'status',
            'createdBy',
            'updatedBy',
            'intake.contact',
            'tasks',
            'notes',
            'documents',
            'opportunityEvaluation',
            'measures'
        ]);

        $opportunity->relatedEmailsSent = $this->getRelatedEmails($opportunity->id, 'sent');

        return FullOpportunity::make($opportunity);
    }

    public function store(Request $request, RequestInput $requestInput)
    {
        $this->authorize('manage', Opportunity::class);

        $data = $requestInput
            ->integer('measureCategoryId')->validate('required|exists:measure_categories,id')->alias('measure_category_id')->next()
            ->integer('statusId')->validate('required|exists:opportunity_status,id')->alias('status_id')->next()
            ->integer('intakeId')->validate('required|exists:intakes,id')->onEmpty(null)->alias('intake_id')->next()
            ->string('quotationText')->alias('quotation_text')->next()
            ->string('desiredDate')->validate('date')->onEmpty(null)->alias('desired_date')->next()
            ->string('evaluationAgreedDate')->validate('date')->onEmpty(null)->alias('evaluation_agreed_date')->next()
            ->get();

        $opportunity = new Opportunity();
        $opportunity->fill($data);
        $opportunity->save();

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

        foreach($opportunity->tasks as $task){
            $task->delete();
        }
        $opportunity->delete();
    }

    public function getAmountOfActiveOpportunities(){
        return Opportunity::where('status_id', 1)->count();
    }

    public function peek()
    {
        return OpportunityPeek::collection(Opportunity::orderBy('id')->get());
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

    public function storeEvaluation(RequestInput $requestInput){
        $this->authorize('manage', Opportunity::class);

        $data = $requestInput
            ->integer('opportunityId')->validate('required|exists:opportunities,id')->alias('opportunity_id')->next()
            ->boolean('isRealised')->alias('is_realised')->next()
            ->boolean('isStatisfied')->alias('is_statisfied')->next()
            ->boolean('wouldRecommendOrganisation')->alias('would_recommend_organisation')->next()
            ->string('note')->next()
            ->get();

        $opportunityEvaluation = new OpportunityEvaluation();
        $opportunityEvaluation->fill($data);
        $opportunityEvaluation->save();

        return $this->show($opportunityEvaluation->opportunity);
    }

    public function updateEvaluation(RequestInput $requestInput, OpportunityEvaluation $opportunityEvaluation){
        $this->authorize('manage', Opportunity::class);

        $data = $requestInput
            ->integer('opportunityId')->validate('required|exists:opportunities,id')->alias('opportunity_id')->next()
            ->boolean('isRealised')->alias('is_realised')->next()
            ->boolean('isStatisfied')->alias('is_statisfied')->next()
            ->boolean('wouldRecommendOrganisation')->alias('would_recommend_organisation')->next()
            ->string('note')->next()
            ->get();

        $opportunityEvaluation->fill($data);
        $opportunityEvaluation->save();

        return $this->show($opportunityEvaluation->opportunity);
    }

    public function getRelatedEmails($id, $folder)
    {
        $user = Auth::user();

        $mailboxIds = $user->mailboxes()->pluck('mailbox_id');

        return Email::whereIn('mailbox_id', $mailboxIds)->where('opportunity_id', $id)->where('folder', $folder)->get();
    }
}