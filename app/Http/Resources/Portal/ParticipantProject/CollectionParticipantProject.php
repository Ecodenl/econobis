<?php

namespace App\Http\Resources\Portal\ParticipantProject;

use App\Http\Resources\Portal\Contact\CollectionContact;
use App\Http\Resources\Portal\Project\CollectionProject;
use App\Http\Resources\Portal\ParticipantMutation\CollectionParticipantMutation;
use Illuminate\Http\Resources\Json\Resource;

class CollectionParticipantProject extends Resource
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
                'contact' => CollectionContact::make($this->whenLoaded('contact')),
                'project' => CollectionProject::make($this->whenLoaded('project')),
                'participantMutations' => CollectionParticipantMutation::collection($this->whenLoaded('mutations')),
            ];
    }
}
