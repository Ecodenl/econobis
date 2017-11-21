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
use App\Eco\User\User;
use App\Exceptions\UnauthorizedException;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Passport;

class AccountObserver
{

    public function creating(Account $account)
    {
        if(!Auth::user()->can('create', $account)) throw new UnauthorizedException('Unauthorized account creation');
    }

    public function updating(Account $account)
    {
        if(!Auth::user()->can('update', $account)) throw new UnauthorizedException('Unauthorized account modification');
    }

    public function deleting(Account $account)
    {
        if(!Auth::user()->can('delete', $account)) throw new UnauthorizedException('Unauthorized account deletion');
    }

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