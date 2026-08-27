<?php

namespace App\Eco\FreeFields;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class FreeFieldsFieldLogPolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('view_free_fields_field_log', 'api');
    }

}
