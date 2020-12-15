<?php

namespace App\Http\Resources\Portal\ParticipantMutation;

use App\Eco\ParticipantMutation\ParticipantMutationType;
use Illuminate\Http\Resources\Json\Resource;

class CollectionParticipantMutation extends Resource
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
        $mutationResultType = ParticipantMutationType::where('code_ref', 'result')->first()->id;
        return
            [
                'date' => ($this->type_id == $mutationResultType) ? $this->date_payment : $this->date_entry,
                'typeDescription' => $this->type->description,
                'statusName' => $this->status ? $this->status->name : '',
                'amount' => $this->amount,
                'quantity' => $this->quantity,
                'returns' => $this->returns,
                'paidOn' => $this->paid_on,
            ];
    }
}
