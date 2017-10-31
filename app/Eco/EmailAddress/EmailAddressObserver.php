<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 30-10-2017
 * Time: 13:54
 */

namespace App\Eco\EmailAddress;


class EmailAddressObserver
{

    public function creating(EmailAddress $emailAddress)
    {
        // Als dit het eerste emailadres voor deze contact is wordt deze altijd primary
        if(!$emailAddress->contact->emailAddresses()->exists()){
            $emailAddress->primary = true;
        }
    }

    public function saved(EmailAddress $emailAddress)
    {
        if($emailAddress->isDirty('primary') && $emailAddress->primary == true){
            // Als er een oud primary emailadres is dan deze niet meer primary maken
            $oldPrimaryEmailAddress = $emailAddress->contact->emailAddresses()
                ->where('primary', true)
                ->where('id', '<>', $emailAddress->id)
                ->first();

            if($oldPrimaryEmailAddress){
                $oldPrimaryEmailAddress->primary = false;
                $oldPrimaryEmailAddress->save();
            }
        }
    }

}