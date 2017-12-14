<?php

namespace App\Http\Resources\Opportunity;

use Illuminate\Http\Resources\Json\Resource;

class GridOpportunity extends Resource
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
            'number' => $this->number,
            'createdAt' => $this->created_at,
            'contactName' => $this->contact->full_name,
            'measureName' => $this->measure->name,
            'campaignName' => optional($this->whenLoaded('campaign'))->name,
            'statusName' => optional($this->whenLoaded('status'))->name,
            'amountQuotations' => count($this->quotations),
            'amountRelatedOpportunities' => count($this->relatedOpportunities()),
        ];
    }
}
