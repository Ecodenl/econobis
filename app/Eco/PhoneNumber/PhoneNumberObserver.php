<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 30-10-2017
 * Time: 13:57
 */

namespace App\Eco\PhoneNumber;


class PhoneNumberObserver
{

    public function creating(PhoneNumber $phoneNumber)
    {
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