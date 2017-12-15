<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Opportunity;

use App\Eco\Opportunity\Opportunity;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Opportunity\Grid\RequestQuery;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\Opportunity\GridOpportunity;
use App\Http\Resources\Opportunity\OpportunityPeek;

class OpportunityController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $opportunities = $requestQuery->get();

        $opportunities->load(['contact', 'measure', 'campaign', 'status', 'quotations']);

        return GridOpportunity::collection($opportunities);
    }

    public function show(Opportunity $opportunity)
    {
        $opportunity->load(['contact', 'measure', 'quotations.organisation', 'quotations.createdBy', 'campaign', 'status', 'createdBy', 'ownedBy', 'reaction', 'registration']);

        return FullOpportunity::make($opportunity);
    }

    public function store(RequestInput $requestInput)
    {
        $this->authorize('manage', Opportunity::class);

        $data = $requestInput
            ->integer('measureId')->validate('required|exists:measures,id')->alias('measure_id')->next()
            ->integer('contactId')->validate('required|exists:contacts,id')->alias('contact_id')->next()
            ->integer('reactionId')->validate('exists:opportunity_reactions,id')->onEmpty(null)->alias('reaction_id')->next()
            ->integer('statusId')->validate('required|exists:opportunity_status,id')->alias('status_id')->next()
            ->integer('registrationId')->validate('exists:registrations,id')->onEmpty(null)->alias('registration_id')->next()
            ->integer('campaignId')->validate('exists:campaigns,id')->onEmpty(null)->alias('campaign_id')->next()
            ->string('quotationText')->alias('quotation_text')->next()
            ->date('desiredDate')->validate('date')->onEmpty(null)->alias('desired_date')->next()
            ->integer('ownedById')->validate('exists:users,id')->onEmpty(null)->alias('owned_by_id')->next()
            ->get();

        $opportunity = new Opportunity();
        $opportunity->fill($data);
        $opportunity->save();

        return FullOpportunity::make($opportunity->fresh());
    }

    public function update(RequestInput $requestInput, Opportunity $opportunity) {

        $this->authorize('manage', Opportunity::class);

        $data = $requestInput
            ->integer('measureId')->validate('required|exists:measures,id')->alias('measure_id')->next()
            ->integer('contactId')->validate('required|exists:contacts,id')->alias('contact_id')->next()
            ->integer('reactionId')->validate('exists:opportunity_reactions,id')->onEmpty(null)->alias('reaction_id')->next()
            ->integer('statusId')->validate('required|exists:opportunity_status,id')->alias('status_id')->next()
            ->integer('registrationId')->validate('exists:registrations,id')->onEmpty(null)->alias('registration_id')->next()
            ->integer('campaignId')->validate('exists:campaigns,id')->onEmpty(null)->alias('campaign_id')->next()
            ->string('quotationText')->alias('quotation_text')->next()
            ->string('desiredDate')->validate('date')->onEmpty(null)->alias('desired_date')->next()
            ->integer('ownedById')->validate('exists:users,id')->onEmpty(null)->alias('owned_by_id')->next()
            ->get();

        $opportunity->fill($data);
        $opportunity->save();

        return FullOpportunity::make($opportunity->fresh());
    }

    public function destroy(Opportunity $opportunity)
    {
        $this->authorize('manage', Opportunity::class);

        //First delete foreign key constrained OpportunityQuotations
        foreach($opportunity->quotations as $quotation){
            $quotation->delete();
        }

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
}