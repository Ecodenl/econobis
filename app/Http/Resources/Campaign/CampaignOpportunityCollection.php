<?php

namespace App\Http\Resources\Campaign;

use App\Http\Resources\Intake\FullIntake;
use App\Http\Resources\Opportunity\FullOpportunity;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CampaignOpportunityCollection extends ResourceCollection
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
            'count' => $this->count(),
            'total' => $this->total(),
            'prev' => $this->previousPageUrl(),
            'next' => $this->nextPageUrl(),
            'data' => FullOpportunity::collection($this->collection)
        ];
    }
}
