<?php

namespace App\Http\Resources\ParticipantProject;

use Illuminate\Http\Resources\Json\JsonResource;

class GridParticipantProjectRevenueKwh extends JsonResource
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
                'revenueId' => $this->id,
                'dateBegin' => $this->date_begin,
                'dateEnd' => $this->date_end,
                'categoryName' => $this->category->name,
                'status' => $this->revenue_kwh_distribution_status,
                'statusRevenue' => $this->status,
            ];
    }
}
