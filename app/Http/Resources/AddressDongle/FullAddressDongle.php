<?php

namespace App\Http\Resources\AddressDongle;

use App\Http\Resources\User\FullUser;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class FullAddressDongle extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
//            'addressId' => $this->address_id,
//            'fullAddress' => $this->address,
//            'fullContactName' => $this->address ? $this->address->contact()->value('full_name') : '',
            'typeReadOutId' => $this->type_read_out_id,
            'typeReadOutName' => $this?->dongleReadOutType ? $this->dongleReadOutType->name : '',
            'macNumber' => $this->mac_number,
            'typeDongleId' => $this->type_dongle_id,
            'typeDongleName' => $this?->dongleType ? $this->dongleType->name : '',
            'energyId' => $this->energy_id,
            'dateSigned' => $this->date_signed ? Carbon::parse($this->date_signed)->format('Y-m-d') : '',
            'dateStart' => $this->date_start ? Carbon::parse($this->date_start)->format('Y-m-d') : '',
            'dateEnd' => $this->date_end ? Carbon::parse($this->date_end)->format('Y-m-d') : '',
            'createdById' =>  $this->created_by_id,
            'createdBy' => FullUser::make($this->whenLoaded('updatedById')),
            'updatedById' =>  $this->created_by_id,
            'updatedBy' => FullUser::make($this->whenLoaded('updatedById')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
