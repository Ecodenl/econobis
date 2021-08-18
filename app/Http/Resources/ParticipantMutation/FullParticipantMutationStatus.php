<?php

namespace App\Http\Resources\ParticipantMutation;

use Illuminate\Http\Resources\Json\JsonResource;

class FullParticipantMutationStatus extends JsonResource
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
            'name' => $this->name,
            'codeRef' => $this->code_ref,
        ];
    }
}
