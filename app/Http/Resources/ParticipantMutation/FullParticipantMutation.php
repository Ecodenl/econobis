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
                'statusId' => $this->status_id,
                'status' => GenericResource::make($this->whenLoaded('status')),
                'amount' => $this->amount,
                'quantity' => $this->quantity,
                'returns' => $this->returns,
                'payoutKwh' => $this->payout_kwh,
                'indicationOfRestitutionEnergyTax' => $this->indication_of_restitution_energy_tax,
                'paidOn' => $this->paid_on,
                'updatedAt' => $this->updated_at,
                'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
            ];
    }
}
