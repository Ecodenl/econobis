<?php

namespace App\Http\Resources\Campaign;

use App\Http\Resources\Intake\FullIntake;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CampaignIntakesCollection extends ResourceCollection
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
            'data' => FullIntake::collection($this->collection)
        ];
    }
}
