<?php

namespace App\Http\Resources\ParticipantProject;

use Illuminate\Http\Resources\Json\JsonResource;


class ParticipantProjectPeek extends JsonResource
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
                'name' => $this->contact->full_name . ' ' . $this->project->name,
            ];
    }
}
