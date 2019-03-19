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

        // Twinfield customer hoeven we vanuit hier (contact) alleen bij te werken als er een koppeling is.
        // Nieuw aanmaken gebeurt vooralsnog alleen vanuit synchroniseren facturen
        if($address->contact->twinfieldNumbers()) {
            foreach (
                Administration::where('twinfield_is_valid', 1)->where('uses_twinfield', 1)->get() as $administration
            ) {
                $twinfieldCustomerHelper = new TwinfieldCustomerHelper($administration, null);
                $twinfieldCustomerHelper->updateCustomer($address->contact);
            }
        }
    }
}
