<?php

namespace App\Http\Resources\Project;

use Illuminate\Http\Resources\Json\JsonResource;

class GridRevenuePartsKwh extends JsonResource
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
                'revenueId' => $this->revenue_id,
                'dateBegin' => $this->date_begin,
                'dateEnd' => $this->date_end,
                'confirmed' => $this->confirmed,
                'dateConfirmed' => $this->date_confirmed,
                'datePayout' => $this->date_payout,
                'status' => $this->status,
                'deliveredTotalConcept' => $this->delivered_total_concept_string,
                'deliveredTotalConfirmed' => $this->delivered_total_confirmed_string,
                'deliveredTotalProcessed' => $this->delivered_total_processed_string,
                'payoutKwh' => $this->payout_kwh,
                'isLastRevenuePartsKwh' => $this->is_last_revenue_parts_kwh,
            ];
    }
}
