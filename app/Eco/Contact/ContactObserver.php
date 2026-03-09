<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\Contact;

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
        if($contact->created_with == null){
            $contact->created_with = 'econobis';
        }
        $contact->updated_with = $contact->created_with;
        $contact->public_id = Str::random(22);
    }

    public function created(Contact $contact)
    {
        $year = Carbon::now()->year;

        $number = \Config::get('app.APP_CONTACT_NUMBER_FORMAT');

        $numberOfHashTags = substr_count($number, '#');
        if($numberOfHashTags > 0){
            $contactIdWithLeadingZeros = str_pad($contact->id, $numberOfHashTags, '0', STR_PAD_LEFT);
            $hashTagsString = "{" . str_repeat('#', $numberOfHashTags) . "}";
            $number = str_replace($hashTagsString, $contactIdWithLeadingZeros, $number);
        }

        $number = str_replace('{year}', $year, $number);
        $number = str_replace('{id}', $contact->id, $number);

        if(!$number) {
            $contact->number = 'C' . Carbon::now()->year . '-' . $contact->id;
        }
        else{
            $contact->number = $number;
        }

        if($contact->is_collect_mandate && $contact->collect_mandate_code == ''){
            $contact->collect_mandate_code = $contact->number;
        }

        $contact->save();
    }

    public function updating(Contact $contact)
    {
        $userId = Auth::id();
        $contact->updated_by_id = $userId;
        $updatedWith = '';
        if(Auth::user()){
            $updatedWith = Auth::user()->occupation;
        }
        switch ($updatedWith){
            case '@portal-update@':
                $contact->updated_with = 'portal';
                break;
            case '@webform-update@':
                $contact->updated_with = 'webform';
                break;
            default:
                $contact->updated_with = 'econobis';
                break;
        }

// Dit werkt niet goed. Omdat type original integer is en current type boolean geeft hij IsDirty altijd true.
//        if($contact->isDirty('did_agree_avg') && $contact->did_agree_avg ) {
//            $contact->date_did_agree_avg = Carbon::now();
//        }
        $didAgreeAvgOriginal = $contact->getOriginal('did_agree_avg');
        if($contact->did_agree_avg != $didAgreeAvgOriginal && $contact->did_agree_avg ) {
            $contact->date_did_agree_avg = Carbon::now();
        }

        if($contact->isDirty('hoom_account_id')) {
            $contact->hoom_account_created_at = Carbon::now();
        }
    }

    public function saved(Contact $contact){
    }

}