<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 05-10-2017
 * Time: 14:11
 */

namespace App\Eco\Account;

use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactType;

class AccountObserver
{

    public function saved(Account $account)
    {
        if($account->isDirty('contact_id')){
            $contact = $account->contact;
            $contact->type_id = ContactType::ACCOUNT;
            $contact->save();

            if($account->getOriginal('contact_id')){
                $oldContact = Contact::find($account->getOriginal('contact_id'));
                $oldContact->type_id = null;
                $oldContact->save();
            }
        }

        if($account->isDirty('name')){
            $contact = $account->contact;
            $contact->full_name = $account->name;
            $contact->save();
        }
    }
}