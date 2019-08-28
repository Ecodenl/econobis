<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\Address;

use App\Eco\Administration\Administration;
use App\Helpers\Twinfield\TwinfieldCustomerHelper;

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

        }

        if($address->isDirty('street')
            || $address->isDirty('number')
            || $address->isDirty('postal_code')
            || $address->isDirty('city'))
        {
            // Check if any project revenue distribution is present with status concept
            // If so, then change address
            $projectRevenueDistributions = $address->contact->projectRevenueDistributions->whereIn('status', ['concept', 'confirmed']);

            foreach($projectRevenueDistributions as $projectRevenueDistribution) {
                $projectRevenueDistribution->address = $address->present()
                    ->streetAndNumber();
                $projectRevenueDistribution->postal_code = $address->postal_code;
                $projectRevenueDistribution->city = $address->city;

                $projectRevenueDistribution->save();
            }

        }

    }
}
