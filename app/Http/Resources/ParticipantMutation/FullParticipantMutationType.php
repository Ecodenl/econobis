<?php

namespace App\Http\Resources\ParticipantMutation;

use Illuminate\Http\Resources\Json\Resource;

class FullParticipantMutationType extends Resource
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
            'projectTypeCodeRef' => $this->projectType->code_ref,
        ];
    }
}
