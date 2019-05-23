<?php

namespace App\Http\Resources\ParticipantProject;

use Illuminate\Http\Resources\Json\Resource;


class ParticipantProjectPeek extends Resource
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
