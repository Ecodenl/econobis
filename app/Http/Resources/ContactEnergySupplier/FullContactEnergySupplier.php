<?php

namespace App\Http\Resources\ContactEnergySupplier;

use App\Eco\Measure\Measure;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use App\Http\Resources\HousingFile\FullHousingFile;
use App\Http\Resources\Intake\FullIntake;
use App\Http\Resources\Measure\FullMeasure;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullContactEnergySupplier extends Resource
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
            'eanElectricity' => $this->ean_electricity,
            'eanGas' => $this->ean_gas,
            'contactEnergySupplyStatusId' => $this->contact_energy_supply_status_id,
            'contactEnergySupplyStatus' => GenericResource::make($this->whenLoaded('contactEnergySupplyStatus')),
            'contactEnergySupplyTypeId' => $this->contact_energy_supply_type_id,
            'contactEnergySupplyType' => GenericResource::make($this->whenLoaded('contactEnergySupplyType')),
            'switchDate' => $this->switch_date,
            'isCurrentSupplier' => $this->is_current_supplier,
            'createdById' =>  $this->created_by_id,
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
