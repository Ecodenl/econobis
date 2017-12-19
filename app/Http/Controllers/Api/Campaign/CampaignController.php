<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Campaign;

use App\Eco\Campaign\Campaign;
use App\Eco\Opportunity\Opportunity;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Campaign\Grid\RequestQuery;
use App\Http\Resources\Campaign\FullCampaign;
use App\Http\Resources\Campaign\GridCampaign;
use Illuminate\Http\Request;

class CampaignController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $campaigns = $requestQuery->get();

        $campaigns->load(['type', 'status', 'responses']);

        return GridCampaign::collection($campaigns);
    }

    public function show(Campaign $campaign)
    {
        $campaign->load(['opportunities.contact', 'opportunities.measure', 'opportunities.status', 'opportunities.quotations', 'measures', 'status', 'type', 'responses', 'organisations', 'createdBy', 'ownedBy']);

        return FullCampaign::make($campaign);
    }

    public function store(Request $request, RequestInput $requestInput)
    {
        $this->authorize('manage', Campaign::class);

        $data = $requestInput
            ->string('name')->validate('required')->next()
            ->string('description')->onEmpty(null)->next()
            ->string('startDate')->validate('date')->onEmpty(null)->alias('start_date')->next()
            ->string('endDate')->validate('date')->onEmpty(null)->alias('end_date')->next()
            ->string('goal')->onEmpty(null)->next()
            ->integer('statusId')->validate('exists:campaign_status,id')->onEmpty(null)->alias('status_id')->next()
            ->integer('typeId')->validate('required|exists:campaign_types,id')->alias('type_id')->next()
            ->get();

        $campaign = new Campaign();
        $campaign->fill($data);
        $campaign->save();

        $measureIds = explode(',', $request->measureIds);

        if($measureIds[0] == '') {
            $measureIds = [];
        }

        $campaign->measures()->sync($measureIds);

        return FullCampaign::make($campaign->fresh());
    }

    public function update(Request $request, RequestInput $requestInput, Campaign $campaign) {

        $this->authorize('manage', Campaign::class);

        $data = $requestInput
            ->string('name')->validate('required')->next()
            ->string('number')->validate('required')->next()
            ->string('description')->onEmpty(null)->next()
            ->string('goal')->onEmpty(null)->next()
            ->string('startDate')->validate('date')->onEmpty(null)->alias('start_date')->next()
            ->string('endDate')->validate('date')->onEmpty(null)->alias('end_date')->next()
            ->integer('statusId')->validate('exists:campaign_status,id')->onEmpty(null)->alias('status_id')->next()
            ->integer('typeId')->validate('required|exists:campaign_types,id')->alias('type_id')->next()
            ->get();

        $measureIds = explode(',', $request->measureIds);

        if($measureIds[0] == '') {
           $measureIds = [];
        }

        $campaign->measures()->sync($measureIds);

        $campaign->fill($data);
        $campaign->save();

        return FullCampaign::make($campaign->fresh());
    }

    public function destroy(Campaign $campaign)
    {
        $this->authorize('manage', Campaign::class);

        //First delete relations
        $campaign->measures()->detach();

        foreach($campaign->opportunities as $opportunity){
            $opportunity->campaign()->dissociate();
            $opportunity->save();
        }

        foreach($campaign->registrations as $registration){
            $registration->campaign()->dissociate();
            $registration->save();
        }

        $campaign->organisations()->detach();
        $campaign->responses()->detach();

        $campaign->delete();
    }

    public function associateOpportunity(Campaign $campaign, Opportunity $opportunity){
        $opportunity->campaign()->associate($campaign);
        $opportunity->save();

        return FullCampaign::make($opportunity->fresh());
    }

    public function dissociateOpportunity(Opportunity $opportunity){
        $opportunity->campaign()->dissociate();
        $opportunity->save();

        return FullCampaign::make($opportunity->fresh());
    }

}