<?php

namespace App\Eco\Address;

use App\Eco\User\User;
use App\Eco\Address\Address;
use Illuminate\Auth\Access\HandlesAuthorization;

class AddressPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the address.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\Address\Address  $address
     * @return mixed
     */
    public function view(User $user, Address $address)
    {
        return true;
    }

    /**
     * Determine whether the user can create addresses.
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function create(User $user, $address)
    {
        if($address->contact->isPerson()) return $user->can('update', $address->contact->person);
        else return $user->can('update', $address->contact->account);
    }

    /**
     * Determine whether the user can update the address.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\Address\Address  $address
     * @return mixed
     */
    public function update(User $user, Address $address)
    {
        if($address->contact->isPerson()) return $user->can('update', $address->contact->person);
        else return $user->can('update', $address->contact->account);
    }

    /**
     * Determine whether the user can delete the address.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\Address\Address  $address
     * @return mixed
     */
    public function delete(User $user, Address $address)
    {
        if($address->contact->isPerson()) return $user->can('update', $address->contact->person);
        else return $user->can('update', $address->contact->account);
    }
}
