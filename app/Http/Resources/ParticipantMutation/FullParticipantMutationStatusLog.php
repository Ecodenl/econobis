<?php

namespace App\Http\Resources\ParticipantMutation;

use Illuminate\Http\Resources\Json\JsonResource;

class FullParticipantMutationStatusLog extends JsonResource
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
                'dateStatus' => $this->date_status,
                'fromStatus' => $this->fromStatus,
                'toStatus' => $this->toStatus,
            ];
    }
}
