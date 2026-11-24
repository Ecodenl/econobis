<?php

namespace App\Http\Resources\DataCleanup;

use Illuminate\Http\Resources\Json\JsonResource;

class FullCleanupItem extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => (int) $this->id,
            'cooperationId' => (int) $this->cooperation_id,
            'name' => $this->name,
            'codeRef' => $this->code_ref,
            'yearsForDelete' => (int) $this->years_for_delete,
            'dateRef' => $this->date_ref,

            'currentBatchId' => $this->current_batch_id,

            'status' => $this->status,
            'determinedCount' => (int) $this->determined_count,
            'cleanedCount' => (int) $this->cleaned_count,
            'failedCount' => (int) $this->failed_count,
            'hasRetentionPeriod' => (bool) $this->has_retention_period,
            'retentionMode' => $this->retention_mode,

            'dateCleanedUp' => $this->date_cleaned_up?->format('d-m-Y H:i:s'),
            'dateDetermined' => $this->date_determined?->format('d-m-Y H:i:s'),
            'createdAt' => $this->created_at?->format('d-m-Y H:i:s'),
            'updatedAt' => $this->updated_at?->format('d-m-Y H:i:s'),
        ];
    }
}
