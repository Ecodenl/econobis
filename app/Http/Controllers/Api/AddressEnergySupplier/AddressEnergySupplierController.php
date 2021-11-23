<?php

namespace App\Http\Controllers\Api\AddressEnergySupplier;

use App\Eco\EnergySupplier\AddressEnergySupplier;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\AddressEnergySupplier\FullAddressEnergySupplier;

class AddressEnergySupplierController extends ApiController
{

    public function store(RequestInput $requestInput)
    {
        $data = $requestInput
            ->integer('addressId')->validate('required|exists:addresses,id')->alias('address_id')->next()
            ->integer('energySupplierId')->alias('energy_supplier_id')->next()
            ->string('energySupplyTypeId')->validate('required|exists:energy_supply_types,id')->alias('energy_supply_type_id')->next()
            ->date('memberSince')->whenMissing(null)->onEmpty(null)->alias('member_since')->next()
            ->string('energySupplyStatusId')->validate('nullable|exists:energy_supply_statuses,id')->whenMissing(null)->onEmpty(null)->alias('energy_supply_status_id')->next()
            ->date('switchDate')->whenMissing(null)->onEmpty(null)->alias('switch_date')->next()
            ->string('esNumber')->alias('es_number')->next()
            ->boolean('isCurrentSupplier')->alias('is_current_supplier')->next()
            ->get();

        //a address can only have 1 current supplier.
        if ($data['is_current_supplier'] == true) {
            $primaryAddressEnergySupplier = AddressEnergySupplier::where('is_current_supplier', true)
                ->where('address_id', $data['address_id'])->first();

            if ($primaryAddressEnergySupplier) {
                $primaryAddressEnergySupplier->is_current_supplier = false;
                $primaryAddressEnergySupplier->save();
            }
        }else{
            // when this is the first energysupllier, make it default always current
            if (!AddressEnergySupplier::where('address_id', $data['address_id'])->exists()) {
                $data['is_current_supplier'] = true;
            }
        }

        $addressEnergySupplier = new AddressEnergySupplier();

        $addressEnergySupplier->fill($data);

        $addressEnergySupplier->save();

        return FullAddressEnergySupplier::collection(AddressEnergySupplier::where('address_id', $addressEnergySupplier->address_id)->orderBy('member_since')->with('energySupplier', 'energySupplyStatus', 'createdBy', 'address', 'energySupplyTypes')->get());
    }

    public function update(RequestInput $requestInput, AddressEnergySupplier $addressEnergySupplier)
    {
        $data = $requestInput
            ->string('energySupplyTypeId')->validate('required|exists:energy_supply_types,id')->alias('energy_supply_type_id')->next()
            ->date('memberSince')->whenMissing(null)->onEmpty(null)->alias('member_since')->next()
            ->string('energySupplyStatusId')->validate('nullable|exists:energy_supply_statuses,id')->whenMissing(null)->onEmpty(null)->alias('energy_supply_status_id')->next()
            ->date('switchDate')->whenMissing(null)->onEmpty(null)->alias('switch_date')->next()
            ->string('esNumber')->alias('es_number')->next()
            ->boolean('isCurrentSupplier')->alias('is_current_supplier')->next()
            ->get();

        //a address can only have 1 current supplier.
        if ($data['is_current_supplier'] == true) {
            $primaryAddressEnergySupplier = AddressEnergySupplier::where
            ('is_current_supplier', true)
                ->where('address_id', $addressEnergySupplier->address_id)->first();

            if ($primaryAddressEnergySupplier) {
                $primaryAddressEnergySupplier->is_current_supplier = false;
                $primaryAddressEnergySupplier->save();
            }
        }

        $addressEnergySupplier->fill($data);

        $addressEnergySupplier->save();

        return FullAddressEnergySupplier::collection(AddressEnergySupplier::where('address_id', $addressEnergySupplier->address_id)->orderBy('member_since')->with('energySupplier', 'energySupplyStatus', 'createdBy', 'address', 'energySupplyTypes')->get());
    }

    public function destroy(AddressEnergySupplier $addressEnergySupplier)
    {
        $addressEnergySupplier->forceDelete();
    }
}
