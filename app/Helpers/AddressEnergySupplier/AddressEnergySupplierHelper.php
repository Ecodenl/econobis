<?php

namespace App\Helpers\AddressEnergySupplier;

use App\Eco\EnergySupplier\AddressEnergySupplier;

class AddressEnergySupplierHelper
{

    public function checkDoubleEsNumber($addressEnergySupplierId, $addressEnergySupplierEsId, $addressEnergySupplierEsNumber)
    {
        $otherAddressEnergySuppliers = AddressEnergySupplier::where('id', '!=', $addressEnergySupplierId)
            ->where('is_current_supplier', true)
            ->where('energy_supplier_id', $addressEnergySupplierEsId)
            ->where('es_number', $addressEnergySupplierEsNumber);
        return $otherAddressEnergySuppliers->exists();
    }

    public function addressEnergySuppliersWithDoubleEsNumber($addressEnergySupplierId, $addressEnergySupplierEsId, $addressEnergySupplierEsNumber)
    {
        $otherAddressEnergySuppliers = AddressEnergySupplier::where('id', '!=', $addressEnergySupplierId)
            ->where('is_current_supplier', true)
            ->where('energy_supplier_id', $addressEnergySupplierEsId)
            ->where('es_number', $addressEnergySupplierEsNumber);
        if($otherAddressEnergySuppliers->exists()){
            $addressEnergySuppliersWithDoubleEsNumber = [];
            foreach ($otherAddressEnergySuppliers->get() as $otherAddressEnergySupplier){
                $addressEnergySuppliersWithDoubleEsNumber[] = [
                    'contactName' => $otherAddressEnergySupplier->address->contact->full_name,
                    'contactNumber' => $otherAddressEnergySupplier->address->contact->number,
                    'addressStreetPostalCodeCity' => $otherAddressEnergySupplier->address->street_postal_code_city,];
            };
            return $addressEnergySuppliersWithDoubleEsNumber;
        }

        return false;
    }

}
