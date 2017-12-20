<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Campaign;

use App\Eco\Campaign\Campaign;
use App\Eco\Campaign\CampaignResponse;
use App\Eco\Contact\Contact;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Organisation\Organisation;
use App\Eco\User\User;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Campaign\Grid\RequestQuery;
use App\Http\Resources\Campaign\CampaignPeek;
use App\Http\Resources\Campaign\FullCampaign;
use App\Http\Resources\Campaign\GridCampaign;
use Carbon\Carbon;
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
        $campaign->load(['opportunities.contact',
            'opportunities.measure',
            'opportunities.status',
            'opportunities.quotations',
            'measures',
            'status',
            'type',
            'responses.contact.primaryAddress',
            'organisations.contactPerson',
            'createdBy',
            'ownedBy',
            'tasks',
        ]);

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

        if ($measureIds[0] == '') {
            $measureIds = [];
        }

        $campaign->measures()->sync($measureIds);

        return FullCampaign::make($campaign->fresh());
    }

    public function update(Request $request, RequestInput $requestInput, Campaign $campaign)
    {

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

        if ($measureIds[0] == '') {
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

        foreach ($campaign->opportunities as $opportunity) {
            $opportunity->campaign()->dissociate();
            $opportunity->save();
        }

        foreach ($campaign->registrations as $registration) {
            $registration->campaign()->dissociate();
            $registration->save();
        }

        foreach ($campaign->tasks as $task) {
            $task->campaign()->dissociate();
            $task->save();
        }

        $campaign->organisations()->detach();
        $campaign->responses()->delete();

        $campaign->delete();
    }

    public function associateOpportunity(Campaign $campaign, Opportunity $opportunity)
    {
        $opportunity->campaign()->associate($campaign);
        $opportunity->save();

        return FullCampaign::make($opportunity->fresh());
    }

    public function dissociateOpportunity(Opportunity $opportunity)
    {
        $opportunity->campaign()->dissociate();
        $opportunity->save();

        return FullCampaign::make($opportunity->fresh());
    }

    public function attachResponse(Campaign $campaign, Contact $contact)
    {
        $campaignResponse = new CampaignResponse([
            'campaign_id' => $campaign->id,
            'contact_id' => $contact->id,
            'date_responded' => new Carbon(),
        ]);
        $campaignResponse->save();
    }

    public function detachResponse(Campaign $campaign, Contact $contact)
    {
        $campaign->responses()->where('contact_id', $contact->id)->delete();
        $campaign->save();
    }

    public function attachOrganisation(Campaign $campaign, Organisation $organisation)
    {
        $campaign->organisations()->attach($organisation);
    }

    public function detachOrganisation(Campaign $campaign, Organisation $organisation)
    {
        $campaign->organisations()->detach($organisation);
    }

    public function peek()
    {
        return CampaignPeek::collection(Campaign::orderBy('id')->get());
    }

    public function associateOwner(Campaign $campaign, User $user)
    {
        $campaign->ownedBy()->associate($user);
        $campaign->save();
    }
}