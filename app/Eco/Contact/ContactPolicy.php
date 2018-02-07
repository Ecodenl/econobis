<?php

namespace App\Eco\Contact;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the contact.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\Contact\Contact  $contact
     * @return mixed
     */
    public function view(User $user, Contact $contact)
    {
        if($contact->isPerson()) return $user->can('view', $contact->person);
        else return $user->can('view', $contact->organisation);
    }

    /**
     * Determine whether the user can create addresses.
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function create(User $user, Contact $contact)
    {
        return true; // bij aanmaken van het contact record is nog niet bekend of het een person of organisation is
    }

    /**
     * Determine whether the user can update the address.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\Contact\Contact  $address
     * @return mixed
     */
    public function update(User $user, Contact $contact)
    {
        if($contact->isPerson()) return $user->can('update', $contact->person);
        else return $user->can('update', $contact->organisation);
    }

    /**
     * Determine whether the user can delete the address.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\Contact\Contact  $address
     * @return mixed
     */
    public function delete(User $user, Contact $contact)
    {
        if($contact->isPerson()) return $user->can('delete', $contact->person);
        else return $user->can('delete', $contact->organisation);
    }

    /**
     * Determine whether the user can delete the address.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\Contact\Contact  $contact
     * @return mixed
     */
    public function updateIban(User $user, Contact $contact)
    {
        return $user->hasPermissionTo('update_contact_iban', 'api');
    }

    /**
     * Determine whether the user can delete the address.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\Contact\Contact  $contact
     * @return mixed
     */
    public function updateOwner(User $user, Contact $contact)
    {
        return $user->hasPermissionTo('update_contact_owner', 'api');
    }

    /**
     * Determine whether the user can add a contact to a Group
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function addToGroup(User $user, Contact $contact)
    {
        return $user->can('update', $contact);
    }

    /**
     * Determine whether the user can remove a contact from a Group
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function removeFromGroup(User $user, Contact $contact)
    {
        return $user->can('update', $contact);
    }
}
