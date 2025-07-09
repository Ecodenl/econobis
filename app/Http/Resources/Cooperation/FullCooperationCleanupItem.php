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
            'id' => $this->id,
            'cooperationId' => $this->cooperation_id ? $this->cooperation_id : '',
            'name' => $this->name,
            'dateRef' => $this->date_ref,
            'yearsForDelete' => $this->years_for_delete,
            'dateCleanedUp' => $this->date_cleaned_up,
            'dateDetermined' => $this->date_determined,
            'codeRef' => $this->code_ref,
            'numberOfItemsToDelete' => $this->number_of_items_to_delete,
        ];
    }
}
