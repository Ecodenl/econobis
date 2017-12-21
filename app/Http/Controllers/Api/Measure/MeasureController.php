<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Measure;

use App\Eco\Measure\Measure;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Measure\Grid\RequestQuery;
use App\Http\Resources\Measure\FullMeasure;
use App\Http\Resources\Measure\GridMeasure;

class MeasureController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $measures = $requestQuery->get();

        return GridMeasure::collection($measures);
    }

    public function show(Measure $measure)
    {
        $measure->load(['campaigns',
        ]);

        return FullMeasure::make($measure);
    }

    public function store(RequestInput $requestInput)
    {
        $this->authorize('manage', Measure::class);

        $data = $requestInput
            ->string('name')->validate('required')->next()
            ->string('description')->onEmpty(null)->next()
            ->get();

        $measure = new Measure();
        $measure->fill($data);
        $measure->save();

        return FullMeasure::make($measure->fresh());
    }

    public function update(RequestInput $requestInput, Measure $measure)
    {

        $this->authorize('manage', Measure::class);

        $data = $requestInput
            ->string('name')->validate('required')->next()
            ->string('number')->validate('required')->next()
            ->string('description')->onEmpty(null)->next()
            ->get();

        $measure->fill($data);
        $measure->save();

        return FullMeasure::make($measure->fresh());
    }

    public function destroy(Measure $measure)
    {
        $this->authorize('manage', Measure::class);

        //First delete relations
        $measure->addresses()->detach();

        foreach ($measure->opportunities as $opportunity) {
            $opportunity->measure()->dissociate();
            $opportunity->save();
        }

        $measure->faqs()->delete();
        $measure->measuresTaken()->delete();
        $measure->measuresRequested()->delete();

        $measure->delete();
    }

//    public function associateOpportunity(Campaign $campaign, Opportunity $opportunity)
//    {
//        $this->authorize('manage', Campaign::class);
//        $opportunity->campaign()->associate($campaign);
//        $opportunity->save();
//
//        return FullCampaign::make($opportunity->fresh());
//    }
//
//    public function dissociateOpportunity(Opportunity $opportunity)
//    {
//        $this->authorize('manage', Campaign::class);
//        $opportunity->campaign()->dissociate();
//        $opportunity->save();
//
//        return FullCampaign::make($opportunity->fresh());
//    }
//
//    public function attachResponse(Campaign $campaign, Contact $contact)
//    {
//        $this->authorize('manage', Campaign::class);
//        $campaignResponse = new CampaignResponse([
//            'campaign_id' => $campaign->id,
//            'contact_id' => $contact->id,
//            'date_responded' => new Carbon(),
//        ]);
//        $campaignResponse->save();
//    }
//
//    public function detachResponse(Campaign $campaign, Contact $contact)
//    {
//        $this->authorize('manage', Campaign::class);
//        $campaign->responses()->where('contact_id', $contact->id)->delete();
//        $campaign->save();
//    }
//
//    public function attachOrganisation(Campaign $campaign, Organisation $organisation)
//    {
//        $this->authorize('manage', Campaign::class);
//        $campaign->organisations()->attach($organisation);
//    }
//
//    public function detachOrganisation(Campaign $campaign, Organisation $organisation)
//    {
//        $this->authorize('manage', Campaign::class);
//        $campaign->organisations()->detach($organisation);
//    }
//
//    public function associateOwner(Campaign $campaign, User $user)
//    {
//        $this->authorize('manage', Campaign::class);
//        $campaign->ownedBy()->associate($user);
//        $campaign->save();
//    }
}