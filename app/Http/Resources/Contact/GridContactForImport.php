<?php

namespace App\Http\Resources\Contact;

use Illuminate\Http\Resources\Json\JsonResource;

class GridContactForImport extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'matchCode' => $this->matchCode,
            'matchDescription' => $this->matchDescription,
            'matchColor' => $this->matchColor,
            'number' => $this->number,
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'street' => $this->primaryAddress?->street ?? '',
            'housenumber' => $this->primaryAddress?->housenumber ?? '',
            'addition' => $this->primaryAddress?->addition ?? '',
            'postalCode' => $this->primaryAddress?->postal_code ?? '',
            'city' => $this->primaryAddress?->city ?? '',
            'emailContact' => $this->primaryEmailAddress?->email ?? '',
            'phoneNumber' => $this->primaryphoneNumber?->number ?? '',
            'eanElectricity' => $this->primaryAddress?->ean_electricity,
            'eanGas' => $this->primaryAddress?->ean_gas,
            'esTypeElectricity' => $this->primaryAddress?->currentAddressEnergySupplierElectricity?->energySupplyType?->name ?? '',
            'esCodeRefElectricity' => $this->primaryAddress?->currentAddressEnergySupplierElectricity?->energySupplier->abbreviation ?? '',
            'esNumberElectricity' => $this->primaryAddress?->currentAddressEnergySupplierElectricity?->es_number ?? '',
            'esMemberSinceElectricity' => $this->primaryAddress?->currentAddressEnergySupplierElectricity?->member_since ?? '',
            'esEndDateElectricity' => $this->primaryAddress?->currentAddressEnergySupplierElectricity?->end_date ?? '',
            'esTypeGas' => $this->primaryAddress?->currentAddressEnergySupplierGas?->energySupplyType?->name ?? '',
            'esCodeRefGas' => $this->primaryAddress?->currentAddressEnergySupplierGas?->energySupplier->abbreviation ?? '',
            'esNumberGas' =>  $this->primaryAddress?->currentAddressEnergySupplierGas?->es_number ?? '',
            'esMemberSinceGas' => $this->primaryAddress?->currentAddressEnergySupplierGas?->member_since ?? '',
            'esEndDateGas' => $this->primaryAddress?->currentAddressEnergySupplierGas?->end_date ?? '',
        ];
    }
}

