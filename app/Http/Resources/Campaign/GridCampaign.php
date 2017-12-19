<?php

namespace App\Http\Resources\Campaign;

use Illuminate\Http\Resources\Json\Resource;

class GridCampaign extends Resource
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
            'startDate' => $this->start_date,
            'endDate' => $this->end_date,
            'name' => $this->name,
            'type' => optional($this->whenLoaded('type'))->name,
            'status' => optional($this->whenLoaded('status'))->name,
            'amountResponses' => count($this->responses),
        ];
    }
}
