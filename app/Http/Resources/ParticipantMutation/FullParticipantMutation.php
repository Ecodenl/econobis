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
                'participation' => FullParticipantProject::make($this->whenLoaded('participation')),
                'typeId' => $this->type_id,
                'type' => GenericResource::make($this->whenLoaded('type')),
                'dateMutation' => $this->date_mutation,
                'amount' => $this->amount,
                'iban' => $this->iban,
                'referral' => $this->referral,
                'entry' => $this->entry,
                'dateBooking' => $this->date_booking,
                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ];
    }
}
