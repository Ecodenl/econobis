<?php

namespace App\Http\Resources\Cooperation;

use Illuminate\Http\Resources\Json\JsonResource;

class FullCooperationCleanupItem extends JsonResource
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
            'id' => (int) $this->id,
            'cooperationId' => (int) $this->cooperation_id,
            'codeRef' => $this->code_ref,

            'name' => $this->name,
            'dateRef' => $this->date_ref,

            'yearsForDelete' => (int) $this->years_for_delete,
            'hasRetentionPeriod' => (bool) $this->has_retention_period,

            'status' => $this->status,
            'determinedCount' => (int) $this->determined_count,
            'cleanedCount' => (int) $this->cleaned_count,
            'failedCount' => (int) $this->failed_count,

            'dateDetermined' => $this->date_determined?->format('d-m-Y H:i:s'),
            'dateCleanedUp' => $this->date_cleaned_up?->format('d-m-Y H:i:s'),
        ];
    }
}
