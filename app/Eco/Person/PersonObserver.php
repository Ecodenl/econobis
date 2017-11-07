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

class PersonObserver
{


    public function creating(Person $person)
    {
        // Als dit het eerste persoon voor deze account is wordt deze altijd primary
        if($person->account && !$person->account->people()->exists()){
            $person->primary = true;
        }
    }

    public function saved(Person $person)
    {
        if($person->isDirty('contact_id')){
            $contact = $person->contact;
            $contact->type_id = ContactType::PERSON;
            $contact->save();

            if($person->getOriginal('contact_id')){
                $oldContact = Contact::find($person->getOriginal('contact_id'));
                $oldContact->type_id = null;
                $oldContact->save();
            }
        }

        if($person->isDirty(['first_name', 'last_name', 'last_name_prefix_id'])){
            $contact = $person->contact;
            $contact->full_name = $this->contactFullNameFormat($person);
            $contact->save();
        }

        if($person->isDirty('primary') && $person->primary == true){
            // Als er een oud primary person is dan deze niet meer primary maken
            if($person->account){
                $oldPrimaryPerson = $person->account->people()
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
        if(empty($person->last_name)) return $person->first_name;
        if(empty($person->first_name)) return $person->last_name;
        return $person->last_name . ', ' . $person->first_name . ($person->lastNamePrefix ? ' ' . $person->lastNamePrefix->name : '');
    }
}