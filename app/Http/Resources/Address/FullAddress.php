<?php

namespace App\Http\Resources\Address;

use App\Http\Resources\AddressEnergySupplier\FullAddressEnergySupplier;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use App\Http\Resources\HousingFile\FullHousingFile;
use App\Http\Resources\Intake\FullIntake;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class FullAddress extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        if($this->member_since_gas_disabled_before != '1900-01-01') {
            $memberSinceGasDisabledBefore = Carbon::parse($this->member_since_gas_disabled_before)->addDay()->format('Y-m-d');
        } else {
            $memberSinceGasDisabledBefore = $this->member_since_gas_disabled_before;
        }
        if($this->member_since_electricity_disabled_before != '1900-01-01') {
            $memberSinceElectricityDisabledBefore = Carbon::parse($this->member_since_electricity_disabled_before)->addDay()->format('Y-m-d');
        } else {
            $memberSinceElectricityDisabledBefore = $this->member_since_electricity_disabled_before;
        }
        if($this->member_since_gas_and_electricity_disabled_before != '1900-01-01') {
            $memberSinceGasAndElectricityDisabledBefore = Carbon::parse($this->member_since_gas_and_electricity_disabled_before)->addDay()->format('Y-m-d');
        } else {
            $memberSinceGasAndElectricityDisabledBefore = $this->member_since_gas_and_electricity_disabled_before;
        }

        return [
            'id' => $this->id,
            'contactId' => $this->contact_id,
            'typeId' => $this->type_id,
            'endDate' => $this->end_date,
            'type' => FullEnumWithIdAndName::make($this->getType()),
            'countryId' => $this->country_id,
            'country' => GenericResource::make($this->whenLoaded('country')),
            'street' => $this->street,
            'number' => $this->number,
            'addition' => $this->addition,
            'city' => $this->city,
            'postalCode' => $this->postal_code,
            'areaName' => $this->shared_area_name,
            'districtName' => optional(optional($this->getSharedPostalCodesHouseNumber())->sharedArea)->district_name,
            'primary' => $this->primary,
            'streetPostalCodeCity' => $this->street_postal_code_city,
            'typeAndPrimary' => $this->type_and_primary,
            'eanElectricity' => $this->ean_electricity,
            'eanGas' => $this->ean_gas,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'housingFile' => FullHousingFile::make($this->whenLoaded('housingFile')),
            'buildingType' => GenericResource::make($this->whenLoaded('building_type')),
            'intake' => FullIntake::make($this->whenLoaded('intake')),
            'contact' => FullContact::make($this->whenLoaded('contact')),
            'addressEnergySuppliers' => FullAddressEnergySupplier::collection($this->whenLoaded('addressEnergySuppliers')),
//            'usedInActiveParticipation' =>$this->used_in_active_participation,
            'usedInActiveParticipationInSceOrPcrProject' =>$this->used_in_active_participation_in_sce_or_pcr_project,
            'usedInActiveParticipationNotInSceOrPcrProject' =>$this->used_in_active_participation_not_in_sce_or_pcr_project,
            'currentAddressEnergySupplierElectricity' => FullAddressEnergySupplier::make($this->whenLoaded('currentAddressEnergySupplierElectricity')),
            'currentAddressEnergySupplierGas' => FullAddressEnergySupplier::make($this->whenLoaded('currentAddressEnergySupplierGas')),
            'memberSinceGasDisabledBefore' => $memberSinceGasDisabledBefore,
            'memberSinceElectricityDisabledBefore' => $memberSinceElectricityDisabledBefore,
            'memberSinceGasAndElectricityDisabledBefore' => $memberSinceGasAndElectricityDisabledBefore,
        ];
    }
}
