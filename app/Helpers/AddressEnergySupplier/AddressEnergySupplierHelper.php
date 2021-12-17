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
}
