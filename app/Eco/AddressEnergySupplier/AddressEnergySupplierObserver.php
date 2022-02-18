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
use Illuminate\Support\Facades\Auth;

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
        if($addressEnergySupplier->isDirty('member_since') || $addressEnergySupplier->isDirty('end_date'))
        {
            $addressEnergySupplierController = new AddressEnergySupplierController();
            $addressEnergySupplierController->determineIsCurrentSupplier($addressEnergySupplier);

            $participations = $addressEnergySupplier->address->participations;

            foreach($participations as $participation) {
                $distributionsKwh = $participation->revenueDistributionKwh->whereIn('status', ['concept', 'confirmed']);
                foreach($distributionsKwh as $distributionKwh) {
                    $distributionPartsKwh = $distributionKwh->distributionPartsKwh->whereIn('status', ['concept', 'confirmed']);
                    foreach($distributionPartsKwh as $distributionPartKwh) {
                        if($distributionPartKwh->date_begin >= $addressEnergySupplier->member_since && $distributionPartKwh->date_begin >= $addressEnergySupplier->end_date){
                            $distributionPartKwh->es_id = $addressEnergySupplier->energySupplier->id;
                            $distributionPartKwh->energy_supplier_number = $addressEnergySupplier->es_number;
                            $distributionPartKwh->energy_supplier_name = $addressEnergySupplier->energySupplier->name;
                        }else{
                            $distributionPartKwh->energy_supplier_name = "";
                            $distributionPartKwh->energy_supplier_number = "";
                            $distributionPartKwh->es_id = null;
                        }
                        $distributionPartKwh->save();
                    }

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