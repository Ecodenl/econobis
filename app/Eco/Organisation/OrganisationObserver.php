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
        }
    }
}