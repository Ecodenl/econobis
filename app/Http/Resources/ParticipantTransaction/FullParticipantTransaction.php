<?php

namespace App\Http\Resources\ParticipantTransaction;

use App\Http\Resources\GenericResource;
use App\Http\Resources\ParticipantProductionProject\FullParticipantProductionProject;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullParticipantTransaction extends Resource
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
                'participation' => FullParticipantProductionProject::make($this->whenLoaded('participation')),
                'typeId' => $this->type_id,
                'type' => GenericResource::make($this->whenLoaded('type')),
                'dateTransaction' => $this->date_transaction,
                'amount' => $this->amount,
                'iban' => $this->iban,
                'referral' => $this->referral,
                'entry' => $this->entry,
                'dateBooking' => $this->date_booking,
                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
                'deletedAt' => $this->deleted_at,
            ];
    }
}
