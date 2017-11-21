<?php

namespace App\Eco\PhoneNumber;

use App\Eco\User\User;
use App\Eco\PhoneNumber\PhoneNumber;
use Illuminate\Auth\Access\HandlesAuthorization;

class PhoneNumberPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the phoneNumber.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\PhoneNumber\PhoneNumber  $phoneNumber
     * @return mixed
     */
    public function view(User $user, PhoneNumber $phoneNumber)
    {
        return $user->can('view', $phoneNumber->contact);
    }

    /**
     * Determine whether the user can create phoneNumbers.
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function create(User $user, PhoneNumber $phoneNumber)
    {
        return $user->can('update', $phoneNumber->contact);
    }

    /**
     * Determine whether the user can update the phoneNumber.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\PhoneNumber\PhoneNumber  $phoneNumber
     * @return mixed
     */
    public function update(User $user, PhoneNumber $phoneNumber)
    {
        return $user->can('update', $phoneNumber->contact);
    }

    /**
     * Determine whether the user can delete the phoneNumber.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\PhoneNumber\PhoneNumber  $phoneNumber
     * @return mixed
     */
    public function delete(User $user, PhoneNumber $phoneNumber)
    {
        return $user->can('update', $phoneNumber->contact);
    }
}
