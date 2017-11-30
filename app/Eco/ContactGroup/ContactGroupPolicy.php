<?php
namespace App\Eco\ContactGroup;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactGroupPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can create a group
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->hasPermissionTo('manage_groups', 'api');
    }

    /**
     * Determine whether the user can edit a group
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function edit(User $user, ContactGroup $contactGroup)
    {
        return $user->hasPermissionTo('manage_groups', 'api');
    }

    /**
     * Determine whether the user can delete a group
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function delete(User $user, ContactGroup $contactGroup)
    {
        return $user->hasPermissionTo('manage_groups', 'api');
    }
}