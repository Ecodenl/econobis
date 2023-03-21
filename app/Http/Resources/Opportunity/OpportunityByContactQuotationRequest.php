<?php

namespace App\Http\Resources\Opportunity;

use Illuminate\Http\Resources\Json\JsonResource;

class OpportunityByContactQuotationRequest extends JsonResource
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
            'name' => $this->measureCategory->name . ' - ' . $this->status->name,
            'measureCategoryName' => $this->measureCategory->name,
            'number' => $this->number,
            'statusName' => $this->status->name,
            'intakeContactFullName' => optional(optional($this->intake)->contact)->full_name,
        ];
    }
}
