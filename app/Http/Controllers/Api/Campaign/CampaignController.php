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
use App\Http\Resources\Campaign\CampaignIntakesCollection;
use App\Http\Resources\Campaign\CampaignOpportunityCollection;
use App\Http\Resources\Campaign\CampaignPeek;
use App\Http\Resources\Campaign\FullCampaign;
use App\Http\Resources\Campaign\GridCampaign;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CampaignController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $this->authorize('view', Campaign::class);

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
        $this->authorize('view', Campaign::class);
        $campaign->load([
            'measureCategories',
            'opportunityActions',
            'status',
            'type',
            'inspectionPlannedEmailTemplate',
            'inspectionRecordedEmailTemplate',
            'inspectionReleasedEmailTemplate',
            'inspectionPlannedMailbox',
            'defaultWorkflowMailbox',
            'campaignWorkflows',
            'responses.contact.primaryAddress',
            'organisations',
            'organisations.contact.contactPerson.contact',
            'coaches',
            'coaches.primaryAddress',
            'projectManagers',
            'projectManagers.primaryAddress',
            'externalParties',
            'externalParties.primaryAddress',
            'createdBy',
            'ownedBy',
            'tasks',
            'notes',
            'documents',
        ]);

        return FullCampaign::make($campaign);
    }

    public function intakes(Campaign $campaign)
    {
        $intakes = $campaign->intakes()->paginate(10);
        $intakes->load([
            'contact',
            'address',
        ]);

        return CampaignIntakesCollection::make($intakes);
    }

    public function opportunities(Campaign $campaign)
    {
        $opportunities = $campaign->opportunities()->paginate(10);
        $opportunities->load([
            'measureCategory',
            'intake.contact',
            'status',
            'quotationRequests',
        ]);

        return CampaignOpportunityCollection::make($opportunities);
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
            ->integer('inspectionPlannedMailboxId')->validate('nullable|exists:mailboxes,id')->alias('inspection_planned_mailbox_id')->next()
            ->integer('inspectionPlannedEmailTemplateId')->validate('nullable|exists:email_templates,id')->alias('inspection_planned_email_template_id')->next()
            ->integer('inspectionRecordedEmailTemplateId')->validate('nullable|exists:email_templates,id')->alias('inspection_recorded_email_template_id')->next()
            ->integer('inspectionReleasedEmailTemplateId')->validate('nullable|exists:email_templates,id')->alias('inspection_released_email_template_id')->next()
            ->integer('defaultWorkflowMailboxId')->validate('nullable|exists:mailboxes,id')->alias('default_workflow_mailbox_id')->next()
            ->get();

        $campaign = new Campaign();
        $campaign->fill($data);
        $campaign->save();

        $measureCategoryIds = explode(',', $request->measureCategoryIds);

        if ($measureCategoryIds[0] == '') {
            $measureCategoryIds = [];
        }

        $campaign->measureCategories()->sync($measureCategoryIds);

        $opportunityActionIds = explode(',', $request->opportunityActionIds);

        if ($opportunityActionIds[0] == '') {
            $opportunityActionIds = [];
        }

        $campaign->opportunityActions()->sync($opportunityActionIds);

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
            ->integer('inspectionPlannedMailboxId')->validate('nullable|exists:mailboxes,id')->alias('inspection_planned_mailbox_id')->next()
            ->integer('inspectionPlannedEmailTemplateId')->validate('nullable|exists:email_templates,id')->alias('inspection_planned_email_template_id')->next()
            ->integer('inspectionRecordedEmailTemplateId')->validate('nullable|exists:email_templates,id')->alias('inspection_recorded_email_template_id')->next()
            ->integer('inspectionReleasedEmailTemplateId')->validate('nullable|exists:email_templates,id')->alias('inspection_released_email_template_id')->next()
            ->integer('defaultWorkflowMailboxId')->validate('nullable|exists:mailboxes,id')->alias('default_workflow_mailbox_id')->next()
            ->get();

        $measureCategoryIds = explode(',', $request->measureCategoryIds);

        if ($measureCategoryIds[0] == '') {
            $measureCategoryIds = [];
        }

        $campaign->measureCategories()->sync($measureCategoryIds);

        $opportunityActionIds = explode(',', $request->opportunityActionIds);

        if ($opportunityActionIds[0] == '') {
            $opportunityActionIds = [];
        }

        $data['inspection_planned_mailbox_id'] = $data['inspection_planned_mailbox_id'] != 0 ? $data['inspection_planned_mailbox_id'] : null;
        $data['inspection_planned_email_template_id'] = $data['inspection_planned_email_template_id'] != 0 ? $data['inspection_planned_email_template_id'] : null;
        $data['inspection_recorded_email_template_id'] = $data['inspection_recorded_email_template_id'] != 0 ? $data['inspection_recorded_email_template_id'] : null;
        $data['inspection_released_email_template_id'] = $data['inspection_released_email_template_id'] != 0 ? $data['inspection_released_email_template_id'] : null;
        $data['default_workflow_mailbox_id'] = $data['default_workflow_mailbox_id'] != 0 ? $data['default_workflow_mailbox_id'] : null;

        $campaign->opportunityActions()->sync($opportunityActionIds);

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
        } catch (\PDOException $e) {
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

    public function attachCoach(Campaign $campaign, Contact $coach)
    {
        $this->authorize('manage', Campaign::class);
        $campaign->coaches()->attach($coach);
    }

    public function detachCoach(Campaign $campaign, Contact $coach)
    {
        $this->authorize('manage', Campaign::class);
        $campaign->coaches()->detach($coach);
    }

    public function attachProjectManager(Campaign $campaign, Contact $projectManager)
    {
        $this->authorize('manage', Campaign::class);
        $campaign->projectManagers()->attach($projectManager);
    }

    public function detachProjectManager(Campaign $campaign, Contact $projectManager)
    {
        $this->authorize('manage', Campaign::class);
        $campaign->projectManagers()->detach($projectManager);
    }

    public function attachExternalParty(Campaign $campaign, Contact $externalParty)
    {
        $this->authorize('manage', Campaign::class);
        $campaign->externalParties()->attach($externalParty);
    }

    public function detachExternalParty(Campaign $campaign, Contact $externalParty)
    {
        $this->authorize('manage', Campaign::class);
        $campaign->externalParties()->detach($externalParty);
    }

    public function peek()
    {
        $teamContactIds = Auth::user()->getTeamContactIds();
        if ($teamContactIds){
            $campaigns = Campaign::whereHas('intakes', function($query) use($teamContactIds){
                $query->whereIn('contact_id', $teamContactIds);
            })->orderBy('id')->get();
        }else{
            $campaigns = Campaign::orderBy('id')->get();
        }

        return CampaignPeek::collection($campaigns);
    }

    public function peekNotFinished()
    {
        $campaigns = Campaign::whereNull('status_id')->orWhere('status_id', '!=', Campaign::STATUS_CLOSED)->orderBy('id')->get();

        return CampaignPeek::collection($campaigns);
    }

    public function associateOwner(Campaign $campaign, User $user)
    {
        $this->authorize('manage', Campaign::class);
        $campaign->ownedBy()->associate($user);
        $campaign->save();
    }
}