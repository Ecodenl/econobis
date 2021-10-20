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
            ->integer('contactId')->validate('required|exists:contacts,id')->alias('contact_id')->next()
            ->integer('energySupplierId')->alias('energy_supplier_id')->next()
            ->string('energySupplyTypeId')->validate('required|exists:energy_supply_types,id')->alias('energy_supply_type_id')->next()
            ->date('memberSince')->whenMissing(null)->onEmpty(null)->alias('member_since')->next()
            ->string('eanElectricity')->whenMissing(null)->onEmpty(null)->alias('ean_electricity')->next()
            ->string('eanGas')->whenMissing(null)->onEmpty(null)->alias('ean_gas')->next()
            ->string('energySupplyStatusId')->validate('nullable|exists:energy_supply_statuses,id')->whenMissing(null)->onEmpty(null)->alias('energy_supply_status_id')->next()
            ->date('switchDate')->whenMissing(null)->onEmpty(null)->alias('switch_date')->next()
            ->string('esNumber')->alias('es_number')->next()
            ->boolean('isCurrentSupplier')->alias('is_current_supplier')->next()
            ->get();

        //a contact can only have 1 current supplier.
        if ($data['is_current_supplier'] == true) {
            $primaryAddressEnergySupplier = AddressEnergySupplier::where('is_current_supplier', true)
                ->where('contact_id', $data['contact_id'])->first();

            if ($primaryAddressEnergySupplier) {
                $primaryAddressEnergySupplier->is_current_supplier = false;
                $primaryAddressEnergySupplier->save();
            }
        }else{
            // when this is the first energysupllier, make it default always current
            if (!AddressEnergySupplier::where('contact_id', $data['contact_id'])->exists()) {
                $data['is_current_supplier'] = true;
            }
        }

        $addressEnergySupplier = new AddressEnergySupplier();

        $addressEnergySupplier->fill($data);

        $addressEnergySupplier->save();

        return FullAddressEnergySupplier::collection(AddressEnergySupplier::where('contact_id', $addressEnergySupplier->contact_id)->orderBy('member_since')->with('energySupplier', 'energySupplyStatuses', 'createdBy', 'contact', 'energySupplyTypes')->get());
    }

    public function update(RequestInput $requestInput, AddressEnergySupplier $addressEnergySupplier)
    {
        $data = $requestInput
            ->string('energySupplyTypeId')->validate('required|exists:energy_supply_types,id')->alias('energy_supply_type_id')->next()
            ->date('memberSince')->whenMissing(null)->onEmpty(null)->alias('member_since')->next()
            ->string('eanElectricity')->whenMissing(null)->onEmpty(null)->alias('ean_electricity')->next()
            ->string('eanGas')->whenMissing(null)->onEmpty(null)->alias('ean_gas')->next()
            ->string('energySupplyStatusId')->validate('nullable|exists:energy_supply_statuses,id')->whenMissing(null)->onEmpty(null)->alias('energy_supply_status_id')->next()
            ->date('switchDate')->whenMissing(null)->onEmpty(null)->alias('switch_date')->next()
            ->string('esNumber')->alias('es_number')->next()
            ->boolean('isCurrentSupplier')->alias('is_current_supplier')->next()
            ->get();

        //a contact can only have 1 current supplier.
        if ($data['is_current_supplier'] == true) {
            $primaryAddressEnergySupplier = AddressEnergySupplier::where('is_current_supplier', true)
                ->where('contact_id', $addressEnergySupplier->contact_id)->first();

            if ($primaryAddressEnergySupplier) {
                $primaryAddressEnergySupplier->is_current_supplier = false;
                $primaryAddressEnergySupplier->save();
            }
        }

        $addressEnergySupplier->fill($data);

        $addressEnergySupplier->save();

        return FullAddressEnergySupplier::collection(AddressEnergySupplier::where('contact_id', $addressEnergySupplier->contact_id)->orderBy('member_since')->with('energySupplier', 'energySupplyStatuses', 'createdBy', 'contact', 'energySupplyTypes')->get());
    }

    public function destroy(AddressEnergySupplier $addressEnergySupplier)
    {
        $addressEnergySupplier->forceDelete();
    }
}
