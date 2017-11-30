<?php

namespace App\Eco\User;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\User\User  $model
     * @return mixed
     */
    public function view(User $user, User $model)
    {
        return $user->hasPermissionTo('manage_user', 'api');
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->hasPermissionTo('manage_user', 'api');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\User\User  $model
     * @return mixed
     */
    public function update(User $user, User $model)
    {
        return $user->hasPermissionTo('manage_user', 'api');
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\User\User  $model
     * @return mixed
     */
    public function delete(User $user, User $model)
    {
        return $user->hasPermissionTo('manage_user', 'api');
    }
}
