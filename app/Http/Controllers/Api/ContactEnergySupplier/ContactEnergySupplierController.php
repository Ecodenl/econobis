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
            ->string('type')->whenMissing(null)->onEmpty(null)->next()
            ->date('memberSince')->whenMissing(null)->onEmpty(null)->alias('member_since')->next()
            ->string('eanElectricity')->whenMissing(null)->onEmpty(null)->alias('ean_electricity')->next()
            ->string('eanGas')->whenMissing(null)->onEmpty(null)->alias('ean_gas')->next()
            ->string('contactEnergySupplyStatusId')->validate('exists:contact_energy_supply_status,id')->whenMissing(null)->onEmpty(null)->alias('contact_energy_supply_status_id')->next()
            ->date('switchDate')->whenMissing(null)->onEmpty(null)->alias('switch_date')->next()
            ->get();

        $contactEnergySupplier = new ContactEnergySupplier();

        $contactEnergySupplier->fill($data);

        $contactEnergySupplier->save();

        $contactEnergySupplier->load('energySupplier', 'contactEnergySupplyStatus', 'createdBy', 'contact');

        return new FullContactEnergySupplier($contactEnergySupplier->fresh('energySupplier', 'contactEnergySupplyStatus', 'createdBy', 'contact'));
    }

    public function update(RequestInput $requestInput, ContactEnergySupplier $contactEnergySupplier)
    {
        $data = $requestInput
            ->string('type')->whenMissing(null)->onEmpty(null)->next()
            ->date('memberSince')->whenMissing(null)->onEmpty(null)->alias('member_since')->next()
            ->string('eanElectricity')->whenMissing(null)->onEmpty(null)->alias('ean_electricity')->next()
            ->string('eanGas')->whenMissing(null)->onEmpty(null)->alias('ean_gas')->next()
            ->string('contactEnergySupplyStatusId')->validate('exists:contact_energy_supply_status,id')->whenMissing(null)->onEmpty(null)->alias('contact_energy_supply_status_id')->next()
            ->date('switchDate')->whenMissing(null)->onEmpty(null)->alias('switch_date')->next()
            ->get();

        $contactEnergySupplier->fill($data);

        $contactEnergySupplier->save();

        return new FullContactEnergySupplier($contactEnergySupplier->fresh('energySupplier', 'contactEnergySupplyStatus', 'createdBy', 'contact'));
    }

    public function destroy(ContactEnergySupplier $contactEnergySupplier)
    {
        $contactEnergySupplier->forceDelete();
    }
}
