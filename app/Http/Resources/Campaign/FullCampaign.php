<?php

namespace App\Http\Resources\Campaign;

use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\Organisation\FullOrganisation;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullCampaign extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'number' => $this->number,
            'description' => $this->description,
            'startDate' => $this->start_date,
            'endDate' => $this->end_date,
            'goal' => $this->goal,
            'createdAt' => $this->created_at,
            'status' => GenericResource::make($this->whenLoaded('status')),
            'type' => GenericResource::make($this->whenLoaded('type')),
            'measures' => GenericResource::collection($this->whenLoaded('measures')),
            'opportunities' => FullOpportunity::collection($this->whenLoaded('opportunities')),
            'responses' => FullCampaignResponse::collection($this->whenLoaded('responses')),
            'organisations' => FullOrganisation::collection($this->whenLoaded('organisations')),
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'ownedBy' => FullUser::make($this->whenLoaded('ownedBy')),
            'taskCount' => $this->tasks()->count(),
            'relatedTasks' => $this->tasks()->get(),
        ];
    }
}
