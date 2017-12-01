<?php

namespace App\Eco\EmailAddress;

use App\Eco\User\User;
use App\Eco\EmailAddress\EmailAddress;
use Illuminate\Auth\Access\HandlesAuthorization;

class EmailAddressPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the emailAddress.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\EmailAddress\EmailAddress  $emailAddress
     * @return mixed
     */
    public function view(User $user, EmailAddress $emailAddress)
    {
        return $user->can('view', $emailAddress->contact);
    }

    /**
     * Determine whether the user can create emailAddresses.
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function create(User $user, EmailAddress $emailAddress)
    {
        return $user->can('update', $emailAddress->contact);
    }

    /**
     * Determine whether the user can update the emailAddress.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\EmailAddress\EmailAddress  $emailAddress
     * @return mixed
     */
    public function update(User $user, EmailAddress $emailAddress)
    {
        return $user->can('update', $emailAddress->contact);
    }

    /**
     * Determine whether the user can delete the emailAddress.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\EmailAddress\EmailAddress  $emailAddress
     * @return mixed
     */
    public function delete(User $user, EmailAddress $emailAddress)
    {
        return $user->can('update', $emailAddress->contact);
    }
}
