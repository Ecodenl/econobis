<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 30-10-2017
 * Time: 13:54
 */

namespace App\Eco\EmailAddress;


use App\Exceptions\UnauthorizedException;
use Illuminate\Support\Facades\Auth;

class EmailAddressObserver
{

    public function updating(EmailAddress $emailAddress)
    {
        if(!Auth::user()->can('update', $emailAddress)) throw new UnauthorizedException('Unauthorized emailAddress modification');
    }

    public function deleting(EmailAddress $emailAddress)
    {
        if(!Auth::user()->can('delete', $emailAddress)) throw new UnauthorizedException('Unauthorized emailAddress deletion');
    }

    public function creating(EmailAddress $emailAddress)
    {
        if(!Auth::user()->can('create', $emailAddress)) throw new UnauthorizedException('Unauthorized emailAddress creation');

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