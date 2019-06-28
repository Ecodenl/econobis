<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\Address;

class AddressObserver
{

    public function creating(Address $address)
    {
        // Als dit het eerste adres voor deze contact is wordt deze altijd primary
        if(!$address->contact->addresses()->exists()){
            $address->primary = true;
        }
    }

    public function saved(Address $address)
    {
        if($address->isDirty('primary') && $address->primary == true){
            // Als er een oud primary adres is dan deze niet meer primary maken
            $oldPrimaryAddress = $address->contact->addresses()
                ->where('primary', true)
                ->where('id', '<>', $address->id)
                ->first();

            if($oldPrimaryAddress){
                $oldPrimaryAddress->primary = false;
                $oldPrimaryAddress->save();
            }

            // Check if any project revenue distribution is present
            // If so, then check if address is empty, then fill out address
            $projectRevenueDistributions = $address->contact->projectRevenueDistributions;

            foreach($projectRevenueDistributions as $projectRevenueDistribution) {
                if($projectRevenueDistribution->address == '' && $projectRevenueDistribution->postal_code == '' && $projectRevenueDistribution->city == '') {
                    $projectRevenueDistribution->address = $address->present()
                        ->streetAndNumber();
                    $projectRevenueDistribution->postal_code = $address->postal_code;
                    $projectRevenueDistribution->city = $address->city;

                    $projectRevenueDistribution->save();
                }
            }
        }
    }
}
