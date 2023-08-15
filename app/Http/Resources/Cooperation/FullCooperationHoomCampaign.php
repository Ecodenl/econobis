<?php

namespace App\Http\Resources\Cooperation;

use Illuminate\Http\Resources\Json\JsonResource;

class FullCooperationHoomCampaign extends JsonResource
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
            'cooperationId' => $this->cooperation_id ? $this->cooperation_id : '',
            'campaignId' => $this->campaign_id ? $this->campaign_id : '',
            'campaignName' => $this->campaign ? $this->campaign->name : '',
            'measureId' => $this->measure_id ? $this->measure_id : '',
            'measureName' => $this->measure ? $this->measure->name : '',
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
