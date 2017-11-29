<?php
namespace App\Eco\ContactGroup;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactGroupPolicy
{
    use HandlesAuthorization;
    /**
     * Determine whether the user can add an user to a Group
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function addToGroup(User $user)
    {
        return ($user->hasPermissionTo('update_person', 'api') || ($user->hasPermissionTo('update_account', 'api')));
    }
    /**
     * Determine whether the user can delete an user from a Group
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function removeFromGroup(User $user)
    {
        return ($user->hasPermissionTo('update_person', 'api') || ($user->hasPermissionTo('update_account', 'api')));
    }

    /**
     * Determine whether the user can create a group
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function createGroup(User $user)
    {
        return $user->hasPermissionTo('manage_groups', 'api');
    }

    /**
     * Determine whether the user can edit a group
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function editGroup(User $user)
    {
        return $user->hasPermissionTo('manage_groups', 'api');
    }

    /**
     * Determine whether the user can delete a group
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function deleteGroup(User $user)
    {
        return $user->hasPermissionTo('manage_groups', 'api');
    }
}