<?php

namespace App\Eco\AddressEnergySupplier;

use App\Helpers\Project\RevenuesKwhHelper;
use App\Http\Controllers\Api\AddressEnergySupplier\AddressEnergySupplierController;
use Carbon\Carbon;

class AddressEnergySupplierObserver
{
    public function saved(AddressEnergySupplier $addressEnergySupplier)
    {
        $aesMemberSince = $addressEnergySupplier->member_since
            ? Carbon::parse($addressEnergySupplier->member_since)->format('Y-m-d')
            : '1900-01-01';

        $aesMemberSinceOriginal = $addressEnergySupplier->getOriginal('member_since')
            ? Carbon::parse($addressEnergySupplier->getOriginal('member_since'))->format('Y-m-d')
            : '1900-01-01';

        $aesEndDate = $addressEnergySupplier->end_date
            ? Carbon::parse($addressEnergySupplier->end_date)->format('Y-m-d')
            : '9999-12-31';

        $aesEndDateOriginal = $addressEnergySupplier->getOriginal('end_date')
            ? Carbon::parse($addressEnergySupplier->getOriginal('end_date'))->format('Y-m-d')
            : '9999-12-31';

        $periodChanged = $aesMemberSince !== $aesMemberSinceOriginal
            || $aesEndDate !== $aesEndDateOriginal;

        if ($periodChanged) {
            $addressEnergySupplierController = new AddressEnergySupplierController();
            $addressEnergySupplierController->determineIsCurrentSupplier($addressEnergySupplier);
        }

        if ($periodChanged || $addressEnergySupplier->isDirty('es_number')) {
            $this->refreshRevenueDistributionPartsKwh($addressEnergySupplier);
        }
    }

    public function deleted(AddressEnergySupplier $addressEnergySupplier)
    {
        $this->refreshRevenueDistributionPartsKwh($addressEnergySupplier);
    }

    private function refreshRevenueDistributionPartsKwh(AddressEnergySupplier $addressEnergySupplier): void
    {
        // Voor alleen Gas hoeven we geen distributionPartsKwh te controleren.
        if ((int) $addressEnergySupplier->energy_supply_type_id === 1) {
            return;
        }

        $address = $addressEnergySupplier->address;

        if (!$address) {
            return;
        }

        $revenuesKwhHelper = new RevenuesKwhHelper();

        foreach ($address->participations as $participation) {
            if ($participation->project->projectType->code_ref !== 'postalcode_link_capital') {
                continue;
            }

            $revenuesKwhHelper->refreshDistributionPartsKwhEnergySupplierDataForParticipation($participation);
        }
    }
}