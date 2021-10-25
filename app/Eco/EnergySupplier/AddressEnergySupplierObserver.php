<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\EnergySupplier;

use Carbon\Carbon;
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
        if($addressEnergySupplier->isDirty('is_current_supplier') )
        {
            // Check if any project revenue distribution is present with status concept
            // If so, then change energy supplier
// todo WM-es: dit moet anders $addressEnergySupplier->contact bestaat niet meer !!
//            $projectRevenueDistributions = $addressEnergySupplier->contact->projectRevenueDistributions->whereIn('status', ['concept', 'confirmed']);
//
//            foreach($projectRevenueDistributions as $projectRevenueDistribution) {
//                if( $addressEnergySupplier->is_current_supplier == true){
//                    $projectRevenueDistribution->energy_supplier_name = $addressEnergySupplier->energySupplier->name;
//                    $projectRevenueDistribution->es_id = $addressEnergySupplier->energySupplier->id;
//                }else{
//                    $projectRevenueDistribution->energy_supplier_name = "";
//                    $projectRevenueDistribution->es_id = null;
//                }
//
//                $projectRevenueDistribution->save();
//            }

        }

    }
}