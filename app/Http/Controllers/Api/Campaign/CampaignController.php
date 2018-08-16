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
use App\Eco\Organisation\Organisation;
use App\Eco\User\User;
use App\Helpers\Delete\Models\DeleteCampaign;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Campaign\Grid\RequestQuery;
use App\Http\Resources\Campaign\CampaignPeek;
use App\Http\Resources\Campaign\FullCampaign;
use App\Http\Resources\Campaign\GridCampaign;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CampaignController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $campaigns = $requestQuery->get();

        $campaigns->load(['type', 'status', 'responses']);

        return GridCampaign::collection($campaigns)
            ->additional(['meta' => [
            'total' => $requestQuery->total(),
            ]
        ]);
    }

    public function show(Campaign $campaign)
    {
        $campaign->load([
            'opportunities.measureCategory',
            'opportunities.intake.contact',
            'opportunities.status',
            'opportunities.quotationRequests',
            'measureCategories',
            'status',
            'type',
            'responses.contact.primaryAddress',
            'organisations',
            'createdBy',
            'ownedBy',
            'tasks',
            'notes',
            'documents',
            'intakes.contact',
            'intakes.address'
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
            ->integer('statusId')->validate('exists:campaign_status,id')->onEmpty(null)->alias('status_id')->next()
            ->integer('typeId')->validate('required|exists:campaign_types,id')->alias('type_id')->next()
            ->get();

        $campaign = new Campaign();
        $campaign->fill($data);
        $campaign->save();

        $measureCategoryIds = explode(',', $request->measureCategoryIds);

        if ($measureCategoryIds[0] == '') {
            $measureCategoryIds = [];
        }

        $campaign->measureCategories()->sync($measureCategoryIds);

        return FullCampaign::make($campaign->fresh());
    }

    public function update(Request $request, RequestInput $requestInput, Campaign $campaign)
    {

        $this->authorize('manage', Campaign::class);

        $data = $requestInput
            ->string('name')->validate('required')->next()
            ->string('number')->validate('required')->next()
            ->string('description')->onEmpty(null)->next()
            ->string('startDate')->validate('nullable|date')->onEmpty(null)->alias('start_date')->next()
            ->string('endDate')->validate('nullable|date')->onEmpty(null)->alias('end_date')->next()
            ->integer('statusId')->validate('exists:campaign_status,id')->onEmpty(null)->alias('status_id')->next()
            ->integer('typeId')->validate('required|exists:campaign_types,id')->alias('type_id')->next()
            ->get();

        $measureCategoryIds = explode(',', $request->measureCategoryIds);

        if ($measureCategoryIds[0] == '') {
            $measureCategoryIds = [];
        }

        $campaign->measureCategories()->sync($measureCategoryIds);

        $campaign->fill($data);
        $campaign->save();

        return FullCampaign::make($campaign->fresh());
    }

    public function destroy(Campaign $campaign)
    {
        $this->authorize('manage', Campaign::class);

        try {
            DB::beginTransaction();

            $deleteCampaign = new DeleteCampaign($campaign);
            $result = $deleteCampaign->delete();

            if(count($result) > 0){
                DB::rollBack();
                abort(412, implode(";", array_unique($result)));
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            abort(501, 'Er is helaas een fout opgetreden.');
        }
    }

    public function attachResponse(Campaign $campaign, Contact $contact)
    {
        $this->authorize('manage', Campaign::class);
        $campaignResponse = new CampaignResponse([
            'campaign_id' => $campaign->id,
            'contact_id' => $contact->id,
            'date_responded' => new Carbon(),
        ]);
        $campaignResponse->save();
    }

    public function detachResponse(Campaign $campaign, Contact $contact)
    {
        $this->authorize('manage', Campaign::class);
        $campaign->responses()->where('contact_id', $contact->id)->delete();
        $campaign->save();
    }

    public function attachOrganisation(Campaign $campaign, Organisation $organisation)
    {
        $this->authorize('manage', Campaign::class);
        $campaign->organisations()->attach($organisation);
    }

    public function detachOrganisation(Campaign $campaign, Organisation $organisation)
    {
        $this->authorize('manage', Campaign::class);
        $campaign->organisations()->detach($organisation);
    }

    public function peek()
    {
        return CampaignPeek::collection(Campaign::orderBy('id')->get());
    }

    public function associateOwner(Campaign $campaign, User $user)
    {
        $this->authorize('manage', Campaign::class);
        $campaign->ownedBy()->associate($user);
        $campaign->save();
    }
}