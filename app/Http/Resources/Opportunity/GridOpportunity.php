<?php

namespace App\Http\Resources\Opportunity;

use App\Http\Resources\Measure\FullMeasure;
use Illuminate\Http\Resources\Json\JsonResource;

class GridOpportunity extends JsonResource
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
            'desiredDate' => $this->desired_date,
            'contactName' => optional(optional($this->intake)->contact)->full_name,
            'measureCategoryName' => $this->measureCategory->name,
            'measures' => FullMeasure::collection($this->whenLoaded('measures')),
            'campaignName' => optional(optional($this->intake)->campaign)->name,
            'statusName' => optional($this->whenLoaded('status'))->name,
            'amountQuotations' => count($this->quotationRequests),
            'contactId' => optional(optional($this->intake)->contact)->id,
            'areaName' => optional(optional($this->intake)->address)->shared_area_name,
        ];
    }
}
