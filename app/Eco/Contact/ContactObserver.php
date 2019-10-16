<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\Contact;

use App\Eco\Administration\Administration;
use App\Helpers\Twinfield\TwinfieldCustomerHelper;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ContactObserver
{

    public function creating(Contact $contact)
    {
        // number kolom willen we NOT NULL houden, deze wordt meteen na opslaan bepaald op basis van het ID
        // Daarom tijdelijke waarde erin zetten zodat query niet onderuit gaat.
        $contact->number = 'temp';

        $userId = Auth::id();
        $contact->created_by_id = $userId;
        $contact->updated_by_id = $userId;
        $contact->portal_registration_code = Str::random(32);
    }

    public function created(Contact $contact)
    {
        $year = Carbon::now()->year;

        $number = \Config::get('app.APP_CONTACT_NUMBER_FORMAT');

        $number = str_replace('{year}', $year, $number);
        $number = str_replace('{id}', $contact->id, $number);


        if(!$number) {
            $contact->number = 'C' . Carbon::now()->year . '-' . $contact->id;
        }
        else{
            $contact->number = $number;
        }
        $contact->save();
    }

    public function updating(Contact $contact)
    {
        $userId = Auth::id();
        $contact->updated_by_id = $userId;

        if($contact->isDirty('did_agree_avg') && $contact->did_agree_avg ) {
            $contact->date_did_agree_avg = Carbon::now();
        }
    }

    public function saved(Contact $contact){
    }

}