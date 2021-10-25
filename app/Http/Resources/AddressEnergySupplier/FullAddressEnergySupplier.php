<?php

namespace App\Http\Resources\AddressEnergySupplier;

use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\GenericResource;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class FullAddressEnergySupplier extends JsonResource
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
            'contactId' => $this->contact_id,
            'contact' => FullContact::make($this->whenLoaded('contact')),
            'energySupplierId' => $this->energy_supplier_id,
            'energySupplier' => GenericResource::make($this->whenLoaded('energySupplier')),
            'type' => $this->type,
            'memberSince' => $this->member_since,
            'energySupplyStatusId' => $this->energy_supply_status_id,
            'energySupplyStatus' => GenericResource::make($this->whenLoaded('energySupplyStatus')),
            'energySupplyTypeId' => $this->energy_supply_type_id,
            'energySupplyType' => GenericResource::make($this->whenLoaded('energySupplyType')),
            'switchDate' => $this->switch_date,
            'isCurrentSupplier' => $this->is_current_supplier,
            'createdById' =>  $this->created_by_id,
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'esNumber' => $this->es_number,
        ];
    }
}
