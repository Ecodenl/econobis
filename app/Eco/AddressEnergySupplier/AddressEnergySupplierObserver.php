<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\AddressEnergySupplier;

use App\Http\Controllers\Api\AddressEnergySupplier\AddressEnergySupplierController;
use Illuminate\Support\Facades\Auth;

class AddressEnergySupplierObserver
{

    public function creating(AddressEnergySupplier $addressEnergySupplier)
    {
        $userId = Auth::id();
        $addressEnergySupplier->created_by_id = $userId;
    }

    public function saved(AddressEnergySupplier $addressEnergySupplier)
    {
        if($addressEnergySupplier->isDirty('member_since') || $addressEnergySupplier->isDirty('end_date'))
        {
            $addressEnergySupplierController = new AddressEnergySupplierController();
            $addressEnergySupplierController->determineIsCurrentSupplier($addressEnergySupplier);
        }

        if($addressEnergySupplier->isDirty('es_number') || $addressEnergySupplier->isDirty('is_current_supplier') )
        {
            // Check if any linked project revenue distribution is present with status concept or confirmed
            // If so, then change energy supplier data
            $participations = $addressEnergySupplier->address->participations;

            foreach($participations as $participation) {
                $projectRevenueDistributions = $participation->projectRevenueDistributions->whereIn('status', ['concept', 'confirmed']);

                foreach($projectRevenueDistributions as $projectRevenueDistribution) {
                    if( $addressEnergySupplier->is_current_supplier == true){
                        $projectRevenueDistribution->energy_supplier_name = $addressEnergySupplier->energySupplier->name;
                        $projectRevenueDistribution->energy_supplier_number = $addressEnergySupplier->es_number;
                        $projectRevenueDistribution->es_id = $addressEnergySupplier->energySupplier->id;
                    }else{
                        $projectRevenueDistribution->energy_supplier_name = "";
                        $projectRevenueDistribution->energy_supplier_number = "";
                        $projectRevenueDistribution->es_id = null;
                    }

                    $projectRevenueDistribution->save();
                }
            }
        }
    }
}