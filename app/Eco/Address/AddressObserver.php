<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\Address;


use App\Exceptions\UnauthorizedException;
use Illuminate\Support\Facades\Auth;

class AddressObserver
{

    public function updating(Address $address)
    {
        if(!Auth::user()->can('update', $address)) throw new UnauthorizedException('Unauthorized address modification');
    }

    public function deleting(Address $address)
    {
        if(!Auth::user()->can('delete', $address)) throw new UnauthorizedException('Unauthorized address deletion');
    }

    public function creating(Address $address)
    {
        if(!Auth::user()->can('create', $address)) throw new UnauthorizedException('Unauthorized address creation');

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
    }
}
