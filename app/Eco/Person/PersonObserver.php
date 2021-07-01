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
use App\Helpers\Laposta\LapostaMemberHelper;
use Illuminate\Support\Str;

class PersonObserver
{

    public function creating(Person $person)
    {
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

        if($person->isDirty(['title_id'])){
            foreach($person->contact->groups as $contactGroup){
                if($contactGroup->laposta_list_id) {
                    $contactGroupsPivot= $contactGroup->pivot;
                    if($contactGroupsPivot->laposta_member_id){
                        $lapostaMemberHelper = new LapostaMemberHelper($contactGroup, $person->contact, false);
                        $lapostaMemberHelper->updateMember();
                    }
                }
            }
        }

        if($person->isDirty(['initials', 'first_name', 'last_name', 'last_name_prefix'])){
            $contact = $person->contact;
            $contact->full_name = $this->contactFullNameFormat($person);
            $contact->save();

            foreach($contact->groups as $contactGroup){
                if($contactGroup->laposta_list_id) {
                    $contactGroupsPivot= $contactGroup->pivot;
                    if($contactGroupsPivot->laposta_member_id){
                        $lapostaMemberHelper = new LapostaMemberHelper($contactGroup, $contact, false);
                        $lapostaMemberHelper->updateMember();
                    }
                }
            }
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