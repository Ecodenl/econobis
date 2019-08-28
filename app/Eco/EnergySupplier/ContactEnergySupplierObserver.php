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

class ContactEnergySupplierObserver
{

    public function creating(ContactEnergySupplier $contactEnergySupplier)
    {
        $userId = Auth::id();
        $contactEnergySupplier->created_by_id = $userId;
    }

    public function saved(ContactEnergySupplier $contactEnergySupplier)
    {
        if($contactEnergySupplier->isDirty('is_current_supplier') )
        {
            // Check if any project revenue distribution is present with status concept
            // If so, then change energy supplier
            $projectRevenueDistributions = $contactEnergySupplier->contact->projectRevenueDistributions->whereIn('status', ['concept', 'confirmed']);

            foreach($projectRevenueDistributions as $projectRevenueDistribution) {
                if( $contactEnergySupplier->is_current_supplier == true){
                    $projectRevenueDistribution->energy_supplier_name = $contactEnergySupplier->energySupplier->name;
                }else{
                    $projectRevenueDistribution->energy_supplier_name = "";
                }

                $projectRevenueDistribution->save();
            }

        }

    }
}