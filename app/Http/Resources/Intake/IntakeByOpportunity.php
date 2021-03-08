<?php

namespace App\Http\Resources\Intake;

use App\Http\Resources\Address\FullAddress;
use App\Http\Resources\Campaign\CampaignByIntake;
use App\Http\Resources\Contact\FullContact;
use Illuminate\Http\Resources\Json\Resource;

class IntakeByOpportunity extends Resource
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
                'contact' => FullContact::make($this->whenLoaded('contact')),
                'address' => FullAddress::make($this->whenLoaded('address')),
                'name' => 'Intake: ' . $this->id . ' voor ' . $this->contact->full_name,
                'fullAddress' => optional(optional($this->address)->present())->streetAndNumber(),
                'campaign' => CampaignByIntake::make($this->whenLoaded('campaign')),
                'note' => $this->note,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
                'taskCount' => $this->tasks()->count(),
                'noteCount' => $this->notes()->count(),
                'documentCount' => $this->documents()->count(),
                'emailSentCount' => $this->relatedEmailsSent ? $this->relatedEmailsSent->count() : 0,
                'relatedEmailsSent' => $this->relatedEmailsSent,
                'measureRequestedWithOpportunityIds' => $this->measureRequestedWithOpportunityIds,
            ];
    }
}
