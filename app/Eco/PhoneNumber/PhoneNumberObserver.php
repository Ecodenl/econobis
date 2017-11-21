<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 30-10-2017
 * Time: 13:57
 */

namespace App\Eco\PhoneNumber;


use App\Exceptions\UnauthorizedException;
use Illuminate\Support\Facades\Auth;

class PhoneNumberObserver
{

    public function deleting(PhoneNumber $phoneNumber)
    {
        if(!Auth::user()->can('delete', $phoneNumber)) throw new UnauthorizedException('Unauthorized phoneNumber deletion');
    }

    public function updating(PhoneNumber $phoneNumber)
    {
        if(!Auth::user()->can('update', $phoneNumber)) throw new UnauthorizedException('Unauthorized phoneNumber modification');
    }

    public function creating(PhoneNumber $phoneNumber)
    {
        if(!Auth::user()->can('create', $phoneNumber)) throw new UnauthorizedException('Unauthorized phoneNumber creation');

        // Als dit het eerste telefoonnummer voor deze contact is wordt deze altijd primary
        if(!$phoneNumber->contact->phoneNumbers()->exists()){
            $phoneNumber->primary = true;
        }
    }

    public function saved(PhoneNumber $phoneNumber)
    {
        if($phoneNumber->isDirty('primary') && $phoneNumber->primary == true){
            // Als er een oud primary telefoonnummer is dan deze niet meer primary maken
            $oldPrimaryPhoneNumber = $phoneNumber->contact->phoneNumbers()
                ->where('primary', true)
                ->where('id', '<>', $phoneNumber->id)
                ->first();

            if($oldPrimaryPhoneNumber){
                $oldPrimaryPhoneNumber->primary = false;
                $oldPrimaryPhoneNumber->save();
            }
        }
    }

}