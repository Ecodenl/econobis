<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 05-10-2017
 * Time: 13:03
 */

namespace App\Eco\Person;

use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactType;
use Illuminate\Support\Str;

class PersonObserver
{

    public function creating(Person $person)
    {
        // Als dit het eerste persoon voor deze organisation is wordt deze altijd primary
        // 20180913; niet meer van toepassing? people() functie bestaat nl niet meer
//        if($person->organisation && !$person->organisation->people()->exists()){
//            $person->primary = true;
//        }
    }

    public function saved(Person $person)
    {
        if($person->isDirty('contact_id')){
            $contact = $person->contact;
            $contact->type_id = ContactType::PERSON;
            $contact->portal_registration_code = Str::random(32);
            $contact->save();

            if($person->getOriginal('contact_id')){
                $oldContact = Contact::find($person->getOriginal('contact_id'));
                $oldContact->type_id = null;
                $oldContact->save();
            }
        }

        if($person->isDirty(['first_name', 'last_name', 'last_name_prefix'])){
            $contact = $person->contact;
            $contact->full_name = $this->contactFullNameFormat($person);
            $contact->save();
        }

        if($person->isDirty('primary') && $person->primary == true){
            // Als er een oud primary person is dan deze niet meer primary maken
            if($person->organisation){
                $oldPrimaryPerson = $person->organisation->people()
                    ->where('primary', true)
                    ->where('id', '<>', $person->id)
                    ->first();

                if($oldPrimaryPerson){
                    $oldPrimaryPerson->primary = false;
                    $oldPrimaryPerson->save();
                }
            }
        }
    }

    private function contactFullNameFormat(Person $person)
    {
        return $person->present()->fullName();
    }
}