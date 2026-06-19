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
            'matchCode' => $this->match_code,
            'matchDescription' => $this->match_description,
            'matchColor' => $this->match_color,
            'number' => $this->contact?->number,
            'initials' => $this->contact?->initials,
            'title' => $this->contact?->title?->name,
            'firstName' => $this->contact?->first_name,
            'lastNamePrefix' => $this->contact?->last_name_prefix,
            'lastName' => $this->contact?->last_name,
            'dateOfBirth' => $this->contact?->peron?->dateOfBirth ?? '',
            'street' => $this->contact?->primaryAddress?->street ?? '',
            'housenumber' => $this->contact?->primaryAddress?->number ?? '',
            'addition' => $this->contact?->primaryAddress?->addition ?? '',
            'postalCode' => $this->contact?->primaryAddress?->postal_code ?? '',
            'city' => $this->contact?->primaryAddress?->city ?? '',
            'emailContact' => $this->contact?->primaryEmailAddress?->email ?? '',
            'emailContactFinancial' => $this->contact?->primaryEmailAddress?->type_id === 'invoice' ? $this->contact?->primaryEmailAddress?->email : ($this->contact?->latestEmailAddressInvoice?->email ?? ''),
            'phoneNumber' => $this->contact?->primaryphoneNumber?->number ?? '',
            'iban' => $this->contact?->iban ?? '',
            'chamberOfCommerceNumber' => $this->contact?->organisation?->chamberOfCommerceNumber ?? '',
            'eanElectricity' => $this->contact?->primaryAddress?->ean_electricity,
            'eanGas' => $this->contact?->primaryAddress?->ean_gas,
            'esTypeElectricity' => $this->contact?->primaryAddress?->currentAddressEnergySupplierElectricity?->energySupplyType?->name ?? '',
            'esCodeRefElectricity' => $this->contact?->primaryAddress?->currentAddressEnergySupplierElectricity?->energySupplier->abbreviation ?? '',
            'esNumberElectricity' => $this->contact?->primaryAddress?->currentAddressEnergySupplierElectricity?->es_number ?? '',
            'esMemberSinceElectricity' => $this->contact?->primaryAddress?->currentAddressEnergySupplierElectricity?->member_since ?? '',
            'esEndDateElectricity' => $this->contact?->primaryAddress?->currentAddressEnergySupplierElectricity?->end_date ?? '',
            'esTypeGas' => $this->contact?->primaryAddress?->currentAddressEnergySupplierGas?->energySupplyType?->name ?? '',
            'esCodeRefGas' => $this->contact?->primaryAddress?->currentAddressEnergySupplierGas?->energySupplier->abbreviation ?? '',
            'esNumberGas' =>  $this->contact?->primaryAddress?->currentAddressEnergySupplierGas?->es_number ?? '',
            'esMemberSinceGas' => $this->contact?->primaryAddress?->currentAddressEnergySupplierGas?->member_since ?? '',
            'esEndDateGas' => $this->contact?->primaryAddress?->currentAddressEnergySupplierGas?->end_date ?? '',
        ];
    }
}

