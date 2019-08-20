<?php

namespace App\Http\Resources\ParticipantProject;

use Illuminate\Http\Resources\Json\Resource;

class RelatedParticipantProjectToContact extends Resource
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
                'projectName' => $this->project->name,
                'participationsDefinitive' => $this->participations_definitive,
                'amountDefinitive' => $this->amount_definitive,
                'projectTypeCodeRef' => $this->project->projectType->code_ref,
                'createdAt' => $this->created_at,
            ];
    }
}
