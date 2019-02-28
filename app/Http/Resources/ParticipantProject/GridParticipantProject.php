<?php

namespace App\Http\Resources\ParticipantProject;

use App\Http\Resources\Contact\FullParticipantContact;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Project\ProjectPeek;
use Illuminate\Http\Resources\Json\Resource;

class GridParticipantProject extends Resource
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
                'contactId' => $this->contact_id,
                'contact' => FullParticipantContact::make($this->whenLoaded('contact')),
                'participationsDefinitive' => $this->participations_definitive,
                'status' => GenericResource::make($this->whenLoaded('participantProjectStatus')),
                'dateRegister' => $this->date_register,
                'projectId' => $this->project_id,
                'project' => ProjectPeek::make($this->whenLoaded('project')),
            ];
    }
}
