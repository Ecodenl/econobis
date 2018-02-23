<?php

namespace App\Http\Controllers\Api\ContactEnergySupplier;

use App\Eco\EnergySupplier\ContactEnergySupplier;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\ContactEnergySupplier\FullContactEnergySupplier;

class ContactEnergySupplierController extends ApiController
{

    public function store(RequestInput $requestInput)
    {
        $data = $requestInput
            ->integer('contactId')->validate('required|exists:contacts,id')->alias('contact_id')->next()
            ->integer('energySupplierId')->alias('energy_supplier_id')->next()
            ->string('contactEnergySupplyTypeId')->validate('required|exists:contact_energy_supply_type,id')->alias('contact_energy_supply_type_id')->next()
            ->date('memberSince')->whenMissing(null)->onEmpty(null)->alias('member_since')->next()
            ->string('eanElectricity')->whenMissing(null)->onEmpty(null)->alias('ean_electricity')->next()
            ->string('eanGas')->whenMissing(null)->onEmpty(null)->alias('ean_gas')->next()
            ->string('contactEnergySupplyStatusId')->validate('nullable|exists:contact_energy_supply_status,id')->whenMissing(null)->onEmpty(null)->alias('contact_energy_supply_status_id')->next()
            ->date('switchDate')->whenMissing(null)->onEmpty(null)->alias('switch_date')->next()
            ->boolean('isCurrentSupplier')->alias('is_current_supplier')->next()
            ->get();

        //a contact can only have 1 current supplier.
        if ($data['is_current_supplier'] == true) {
            $primaryContactEnergySupplier = ContactEnergySupplier::where('is_current_supplier', true)
                ->where('contact_id', $data['contact_id'])->first();

            if ($primaryContactEnergySupplier) {
                $primaryContactEnergySupplier->is_current_supplier = false;
                $primaryContactEnergySupplier->save();
            }
        }

        $contactEnergySupplier = new ContactEnergySupplier();

        $contactEnergySupplier->fill($data);

        $contactEnergySupplier->save();

        return FullContactEnergySupplier::collection(ContactEnergySupplier::where('contact_id', $contactEnergySupplier->contact_id)->orderBy('member_since')->with('energySupplier', 'contactEnergySupplyStatus', 'createdBy', 'contact', 'contactEnergySupplyType')->get());
    }

    public function update(RequestInput $requestInput, ContactEnergySupplier $contactEnergySupplier)
    {
        $data = $requestInput
            ->string('contactEnergySupplyTypeId')->validate('required|exists:contact_energy_supply_type,id')->alias('contact_energy_supply_type_id')->next()
            ->date('memberSince')->whenMissing(null)->onEmpty(null)->alias('member_since')->next()
            ->string('eanElectricity')->whenMissing(null)->onEmpty(null)->alias('ean_electricity')->next()
            ->string('eanGas')->whenMissing(null)->onEmpty(null)->alias('ean_gas')->next()
            ->string('contactEnergySupplyStatusId')->validate('nullable|exists:contact_energy_supply_status,id')->whenMissing(null)->onEmpty(null)->alias('contact_energy_supply_status_id')->next()
            ->date('switchDate')->whenMissing(null)->onEmpty(null)->alias('switch_date')->next()
            ->boolean('isCurrentSupplier')->alias('is_current_supplier')->next()
            ->get();

        //a contact can only have 1 current supplier.
        if ($data['is_current_supplier'] == true) {
            $primaryContactEnergySupplier = ContactEnergySupplier::where('is_current_supplier', true)
                ->where('contact_id', $contactEnergySupplier->contact_id)->first();

            if ($primaryContactEnergySupplier) {
                $primaryContactEnergySupplier->is_current_supplier = false;
                $primaryContactEnergySupplier->save();
            }
        }

        $contactEnergySupplier->fill($data);

        $contactEnergySupplier->save();

        return FullContactEnergySupplier::collection(ContactEnergySupplier::where('contact_id', $contactEnergySupplier->contact_id)->orderBy('member_since')->with('energySupplier', 'contactEnergySupplyStatus', 'createdBy', 'contact', 'contactEnergySupplyType')->get());
    }

    public function destroy(ContactEnergySupplier $contactEnergySupplier)
    {
        $contactEnergySupplier->forceDelete();
    }
}
