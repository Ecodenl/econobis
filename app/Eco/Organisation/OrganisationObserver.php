<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 05-10-2017
 * Time: 14:11
 */

namespace App\Eco\Organisation;

use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactType;
use App\Helpers\Laposta\LapostaMemberHelper;

class OrganisationObserver
{

    public function saved(Organisation $organisation)
    {
        if($organisation->isDirty('contact_id')){
            $contact = $organisation->contact;
            $contact->type_id = ContactType::ORGANISATION;
            $contact->save();

            if($organisation->getOriginal('contact_id')){
                $oldContact = Contact::find($organisation->getOriginal('contact_id'));
                $oldContact->type_id = null;
                $oldContact->save();
            }
        }

        if($organisation->isDirty('name')){
            $contact = $organisation->contact;
            $contact->full_name = $organisation->name;
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
    }
}