<?php

namespace App\Http\Resources\AddressEnergySupplier;

use App\Helpers\AddressEnergySupplier\AddressEnergySupplierHelper;
use App\Http\Resources\Address\FullAddress;
use App\Http\Resources\GenericResource;
use App\Http\Resources\User\FullUser;
use Carbon\Carbon;
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
        $addressEnergySupplierHelper = new AddressEnergySupplierHelper();
        $addressEnergySuppliersWithDoubleEsNumber = false;
        if(!empty($this->es_number)){
            $addressEnergySuppliersWithDoubleEsNumber = $addressEnergySupplierHelper->addressEnergySuppliersWithDoubleEsNumber($this->id, $this->energy_supplier_id, $this->es_number);
        }

        if($this->end_date_previous != '1900-01-01') {
            $disabledBefore = Carbon::parse($this->end_date_previous)->addDay()->format('Y-m-d');
        } else {
            $disabledBefore = $this->end_date_previous;
        }
        if($this->member_since_next != '9999-12-31') {
            $disabledAfter = Carbon::parse($this->member_since_next)->subDay()->format('Y-m-d');
        } else {
            $disabledAfter = $this->member_since_next;
        }

        return [
            'id' => $this->id,
            'addressId' => $this->address_id,
            'address' => FullAddress::make($this->whenLoaded('address')),
            'energySupplierId' => $this->energy_supplier_id,
            'energySupplier' => GenericResource::make($this->whenLoaded('energySupplier')),
            'type' => $this->type,
            'memberSince' => $this->member_since,
            'energySupplyStatusId' => $this->energy_supply_status_id,
            'energySupplyStatus' => GenericResource::make($this->whenLoaded('energySupplyStatus')),
            'energySupplyTypeId' => $this->energy_supply_type_id,
            'energySupplyType' => GenericResource::make($this->whenLoaded('energySupplyType')),
            'switchDate' => $this->switch_date,
            'endDate' => $this->end_date,
            'disabledBefore' => $disabledBefore,
            'disabledAfter' => $disabledAfter,
            'isCurrentSupplier' => $this->is_current_supplier,
            'createdById' =>  $this->created_by_id,
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'esNumber' => $this->es_number,
            'addressEnergySuppliersWithDoubleEsNumber' => $addressEnergySuppliersWithDoubleEsNumber,
        ];
    }
}
