<?php

namespace App\Http\Resources\ParticipantMutation;

use App\Http\Resources\GenericResource;
use App\Http\Resources\ParticipantProject\FullParticipantProject;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullParticipantMutation extends Resource
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
                'participationId' => $this->participation_id,
                'dateCreation' => $this->date_creation,
                'entry' => $this->entry,
                'typeId' => $this->type_id,
                'type' => GenericResource::make($this->whenLoaded('type')),
                'datePayment' => $this->date_payment,
                'description' => $this->description,
                'account' => $this->account,
                'quantity' => $this->quantity,
                'returns' => $this->returns,
                'payoutKwh' => $this->payout_kwh,
                'indicationOfRestitutionEnergyTax' => $this->indication_of_restitution_energy_tax,
                'paid_on' => $this->paid_on,
                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ];
    }
}
