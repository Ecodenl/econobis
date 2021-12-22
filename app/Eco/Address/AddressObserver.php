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

    public function saving(Address $address)
    {
        // Als type niet 'old', dan end date null
        if($address->type_id != 'old'){
            $address->end_date = null;
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

        if( $address->primary
            && ($address->isDirty('primary')
                || $address->isDirty('street')
                || $address->isDirty('number')
                || $address->isDirty('addition')
                || $address->isDirty('postal_code')
                || $address->isDirty('city')
                || $address->isDirty('country_id')
                || $address->isDirty('ean_electricity') )
        )
        {
            // Check if any linked project revenue distribution is present with status concept or confirmed
            // If so, then change address data
            $participations = $address->participations;

            foreach($participations as $participation) {
                $projectRevenueDistributions = $participation->projectRevenueDistributions->whereIn('status', ['concept', 'confirmed']);

                foreach($projectRevenueDistributions as $projectRevenueDistribution) {
                    $projectRevenueDistribution->street = $address->street;
                    $projectRevenueDistribution->street_number = $address->number;
                    $projectRevenueDistribution->street_number_addition = $address->addition;
                    $projectRevenueDistribution->address = $address->present()
                        ->streetAndNumber();
                    $projectRevenueDistribution->postal_code = $address->postal_code;
                    $projectRevenueDistribution->city = $address->city;
                    $projectRevenueDistribution->country = $address->country_id ? $address->country->name : '';
                    $projectRevenueDistribution->energy_supplier_ean_electricity = $address->ean_electricity;

                    $projectRevenueDistribution->save();
                }
            }

        }

    }
}
