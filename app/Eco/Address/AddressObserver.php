<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\Address;

use App\Helpers\Address\AddressHelper;
use Illuminate\Support\Facades\Auth;

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

        // Als postcode of huisnummer gewijzigd, bepaal buurt (area code en name) weer opnieuw.
        if($address->isDirty('postal_code') || $address->isDirty('number')){
            $sharedPostalCodesHouseNumber = $address->getSharedPostalCodesHouseNumber();
            if($sharedPostalCodesHouseNumber && $sharedPostalCodesHouseNumber->sharedArea){
                $address->shared_area_code = $sharedPostalCodesHouseNumber->sharedArea->area_code;
                $address->shared_area_name = $sharedPostalCodesHouseNumber->sharedArea->area_name;
            } else {
                $address->shared_area_code = null;
                $address->shared_area_name = '';

            }
        }

    }

    public function saved(Address $address)
    {
        if($address->isDirty('type_id') && $address->type_id == 'old') {
            if ($address->used_in_active_participation_in_sce_or_pcr_project && $address->primary) {
                $addressHelper = new AddressHelper( $address->contact, $address);
                $addressHelper->addTaskAddressChangeParticipation(Auth::id());
            }
            if ($address->used_in_active_participation_not_in_sce_or_pcr_project && !$address->primary) {
                //move all the participations to the primary address of the user
                $primaryAddress = $address->contact->addresses()->where('primary', true)->first();

                if($primaryAddress) {
                    foreach ($address->participations()->get() as $participation) {
                        if ($participation->project->projectType->code_ref != 'postalcode_link_capital' && !$participation->project->is_sce_project ) {
                            $participation->address_id = $primaryAddress->id;
                            $participation->save();
                        }
                    }
                } else {
                    $addressHelper = new AddressHelper($address->contact, $address);
                    $addressHelper->addTaskAddressChangeParticipation(Auth::id());
                }
            }
        }

        if($address->isDirty('primary') && $address->primary == true){
            // Als er een oud primary adres is dan deze niet meer primary maken
            $oldPrimaryAddress = $address->contact->addresses()
                ->where('primary', true)
                ->where('id', '<>', $address->id)
                ->first();

            if($oldPrimaryAddress){
                $oldPrimaryAddress->primary = false;
                $oldPrimaryAddress->save();

                // indien particpation in een niet PCR project en niet SCE project, dan old primary address altijd omzetten naar nieuwe primary address
                $participations = $oldPrimaryAddress->participations;
                foreach($participations as $participation) {
                    if ($participation->project->projectType->code_ref != 'postalcode_link_capital' && !$participation->project->is_sce_project ) {
                        $participation->address_id = $address->id;
                        $participation->save();
                    }
                }
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

                $revenueDistributionsKwh = $participation->revenueDistributionKwh->whereIn('status', ['concept', 'confirmed']);
                foreach($revenueDistributionsKwh as $revenueKwhDistribution) {
                    $revenueKwhDistribution->street = $address->street;
                    $revenueKwhDistribution->street_number = $address->number;
                    $revenueKwhDistribution->street_number_addition = $address->addition;
                    $revenueKwhDistribution->address = $address->present()
                        ->streetAndNumber();
                    $revenueKwhDistribution->postal_code = $address->postal_code;
                    $revenueKwhDistribution->city = $address->city;
                    $revenueKwhDistribution->country = $address->country_id ? $address->country->name : '';
                    $revenueKwhDistribution->energy_supplier_ean_electricity = $address->ean_electricity;

                    $revenueKwhDistribution->save();
                }
            }

        }

    }
}
