<?php

namespace App\Http\Resources\Address;

use App\Http\Resources\AddressEnergySupplier\FullAddressEnergySupplier;
use Illuminate\Http\Resources\Json\JsonResource;

class FullParticipantAddress extends JsonResource
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
            'street' => $this->street,
            'number' => $this->number,
            'addition' => $this->addition,
            'postalCode' => $this->postal_code,
            'city' => $this->city,
            'currentAddressEnergySupplierElectricity' => FullAddressEnergySupplier::make($this->whenLoaded('currentAddressEnergySupplierElectricity')),
        ];
    }
}
