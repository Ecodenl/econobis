<?php

namespace App\Eco\FreeFields;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class FreeFieldsFieldPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\User\User  $model
     * @return mixed
     */
    public function view(User $user)
    {
        return $user->hasPermissionTo('manage_free_fields', 'api');
    }

    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_free_fields', 'api');
    }

}
