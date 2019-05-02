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
                'entry' => $this->entry,
                'typeId' => $this->type_id,
                'type' => GenericResource::make($this->whenLoaded('type')),
                'dateInterest' => $this->date_interest,
                'dateOption' => $this->date_option,
                'dateGranted' => $this->date_granted,
                'dateContractRetour' => $this->date_contract_retour,
                'datePayment' => $this->date_payment,
                'dateEntry' => $this->date_entry,
                'statusId' => $this->status_id,
                'status' => GenericResource::make($this->whenLoaded('status')),
                'amount' => $this->amount,
                'amountInterest' => $this->amount_interest,
                'amountOption' => $this->amount_option,
                'amountGranted' => $this->amount_granted,
                'amountFinal' => $this->amount_final,
                'quantity' => $this->quantity,
                'quantityInterest' => $this->quantity_interest,
                'quantityOption' => $this->quantity_option,
                'quantityGranted' => $this->quantity_granted,
                'quantityFinal' => $this->quantity_final,
                'returns' => $this->returns,
                'payoutKwh' => $this->payout_kwh,
                'indicationOfRestitutionEnergyTax' => $this->indication_of_restitution_energy_tax,
                'paidOn' => $this->paid_on,
                'updatedAt' => $this->updated_at,
                'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
                'statusLog' => GenericResource::make($this->whenLoaded('statusLog')),
            ];
    }
}
