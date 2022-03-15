<?php

namespace App\Http\Resources\Project;

use App\Http\Resources\GenericResource;
use Illuminate\Http\Resources\Json\JsonResource;

class GridRevenuesKwh extends JsonResource
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
                'categoryId' => $this->category_id,
                'category' => GenericResource::make($this->whenLoaded('category')),
                'projectId' => $this->project_id,
                'dateBegin' => $this->date_begin,
                'dateEnd' => $this->date_end,
                'confirmed' => $this->confirmed,
                'status' => $this->status,
                'dateConfirmed' => $this->date_confirmed,
                'datePayout' => $this->date_payout,
                'deliveredTotalConcept' => $this->delivered_total_concept_string,
                'deliveredTotalConfirmed' => $this->delivered_total_confirmed_string,
                'deliveredTotalProcessed' => $this->delivered_total_processed_string,
                'payoutKwh' => $this->payout_kwh,
            ];
    }
}
