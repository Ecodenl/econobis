<?php

namespace App\Http\Resources\ParticipantProductionProject;

use App\Http\Resources\Contact\FullParticipantContact;
use App\Http\Resources\GenericResource;
use App\Http\Resources\ProductionProject\FullProductionProject;
use App\Http\Resources\ProductionProject\GridProductionProject;
use Illuminate\Http\Resources\Json\Resource;

class GridParticipantProductionProject extends Resource
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
                'contact' => GridProductionProject::make($this->whenLoaded('contact')),
                'participationsCurrent' => $this->participations_current,
                'status' => GenericResource::make($this->whenLoaded('participantProductionProjectStatus')),
                'dateRegister' => $this->date_register,
                'productionProjectId' => $this->production_project_id,
                'productionProject' => FullProductionProject::make($this->whenLoaded('productionProject')),
            ];
    }
}
