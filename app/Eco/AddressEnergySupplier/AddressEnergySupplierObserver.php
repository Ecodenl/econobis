<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\AddressEnergySupplier;

use App\Helpers\Project\RevenuesKwhHelper;
use App\Http\Controllers\Api\AddressEnergySupplier\AddressEnergySupplierController;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AddressEnergySupplierObserver
{

    public function creating(AddressEnergySupplier $addressEnergySupplier)
    {
        $userId = Auth::id();
        $addressEnergySupplier->created_by_id = $userId;

        $participations = $addressEnergySupplier->address->participations;

        foreach ($participations as $participation) {
            $projectType = $participation->project->projectType;
            if ($projectType->code_ref === 'postalcode_link_capital') {
                $revenuesKwhHelper = new RevenuesKwhHelper();
                $revenuesKwhHelper->splitRevenuePartsKwh($participation, $addressEnergySupplier->member_since, $addressEnergySupplier);
            }
        }
    }

    public function saved(AddressEnergySupplier $addressEnergySupplier)
    {
        $aesMemberSince = $addressEnergySupplier->member_since ? Carbon::parse($addressEnergySupplier->member_since)->format('Y-m-d') : '1900-01-01';
        $aesMemberSinceOriginal = $addressEnergySupplier->getOriginal('member_since') ? Carbon::parse($addressEnergySupplier->getOriginal('member_since'))->format('Y-m-d') : '1900-01-01';
        $aesEndDate = $addressEnergySupplier->end_date ? Carbon::parse($addressEnergySupplier->end_date)->format('Y-m-d') : '9999-12-31';
        $aesEndDateOriginal = $addressEnergySupplier->getOriginal('end_date') ? Carbon::parse($addressEnergySupplier->getOriginal('end_date'))->format('Y-m-d') : '9999-12-31';
        if($aesMemberSince!=$aesMemberSinceOriginal || $aesEndDate!=$aesEndDateOriginal)
        {
            $addressEnergySupplierController = new AddressEnergySupplierController();
            $addressEnergySupplierController->determineIsCurrentSupplier($addressEnergySupplier);

            $participations = $addressEnergySupplier->address->participations;
            foreach($participations as $participation) {
                $distributionsKwh = $participation->revenueDistributionKwh->whereIn('status', ['concept', 'confirmed']);
                foreach($distributionsKwh as $distributionKwh) {
                    $distributionPartsKwh = $distributionKwh->distributionPartsKwh->whereIn('status', ['concept', 'confirmed']);
                    foreach($distributionPartsKwh as $distributionPartKwh) {
                        if ($distributionPartKwh->partsKwh->date_begin >= $aesMemberSince && $distributionPartKwh->partsKwh->date_begin <= $aesEndDate) {
                            $distributionPartKwh->es_id = $addressEnergySupplier->energySupplier->id;
                            $distributionPartKwh->energy_supplier_number = $addressEnergySupplier->es_number;
                            $distributionPartKwh->energy_supplier_name = $addressEnergySupplier->energySupplier->name;
                            $distributionPartKwh->save();
                        } elseif ($distributionPartKwh->partsKwh->date_begin >= $aesMemberSinceOriginal && $distributionPartKwh->partsKwh->date_begin <= $aesEndDateOriginal) {
                            $distributionPartKwh->energy_supplier_name = "";
                            $distributionPartKwh->energy_supplier_number = "";
                            $distributionPartKwh->es_id = null;
                            $distributionPartKwh->save();
                        }
                    }
                }
            }
        }

        if($aesMemberSince!=$aesMemberSinceOriginal) {
            $participations = $addressEnergySupplier->address->participations;
            foreach ($participations as $participation) {
                $projectType = $participation->project->projectType;
                if ($projectType->code_ref === 'postalcode_link_capital') {
                    $revenuesKwhHelper = new RevenuesKwhHelper();
                    $revenuesKwhHelper->splitRevenuePartsKwh($participation, $addressEnergySupplier->member_since, $addressEnergySupplier);
                }
            }
        }

        if($addressEnergySupplier->isDirty('es_number'))
        {
            // Check if any linked revenue distribution part is present with status concept or confirmed
            // If so, then change energy supplier data
            if($addressEnergySupplier->energySupplier->distributionPartsKwh){
                $distributionPartsKwh = $addressEnergySupplier->energySupplier->distributionPartsKwh
                    ->whereIn('status', ['concept', 'confirmed']);
                foreach($distributionPartsKwh as $distributionPartKwh) {
                    $distributionPartKwh->energy_supplier_number = $addressEnergySupplier->es_number;
                    $distributionPartKwh->save();
                }
            }
        }
    }
}