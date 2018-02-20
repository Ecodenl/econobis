<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 12-12-2017
 * Time: 16:04
 */

namespace App\Http\Resources\Task;


use App\Http\Resources\Campaign\FullCampaign;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\ContactGroup\FullContactGroup;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\Intake\FullIntake;
use App\Http\Resources\Team\FullTeam;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullTask extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     *
     * @return array
     */
    public function toArray($request)
    {
        return
            [
                'id' => $this->id,
                'note' => $this->note,
                'noteSummary' => $this->present()->noteSummary(),
                'typeId' => $this->type_id,
                'type' => GenericResource::make($this->whenLoaded('type')),
                'contactId' => $this->contact_id,
                'contact' => FullContact::make($this->whenLoaded('contact')),
                'finished' => $this->finished,
                'intakeId' => $this->intake_id,
                'intakeName' => $this->intake ? $this->intake->address->present()->streetAndNumber() : '',
                'contactGroupId' => $this->contact_group_id,
                'contactGroup' => FullContactGroup::make($this->whenLoaded('contactGroup')),
                'campaignId' => $this->campaign_id,
                'campaign' => FullCampaign::make($this->whenLoaded('campaign')),
                'datePlannedStart' => $this->date_planned_start,
                'datePlannedFinish' => $this->date_planned_finish,
                'startTimePlanned' => $this->start_time_planned,
                'endTimePlanned' => $this->end_time_planned,
                'dateFinished' => $this->date_finished,
                'responsibleUserId' => $this->responsible_user_id,
                'responsibleUser' => FullUser::make($this->whenLoaded('responsibleUser')),
                'responsibleTeamId' => $this->responsible_team_id,
                'responsibleTeam' => FullTeam::make($this->whenLoaded('responsibleTeam')),
                'finishedById' => $this->finished_by_id,
                'finishedBy' => FullUser::make($this->whenLoaded('finishedBy')),
                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'updatedById' => $this->updated_by_id,
                'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
                'properties' => FullTaskPropertyValue::collection($this->whenLoaded('properties')),
                'opportunityId' => $this->opportunity_id,
                'opportunity' => FullOpportunity::make($this->whenLoaded('opportunity')),
                'opportunityName' => $this->opportunity ? $this->opportunity->measure->name . ' ' . $this->opportunity->status->name : '',
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ];
    }
}