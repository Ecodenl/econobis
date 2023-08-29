<?php

namespace App\Eco\FreeFields;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class FreeFieldsPolicy
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
        return $user->hasPermissionTo('view_audit_trail', 'api');
    }

}
