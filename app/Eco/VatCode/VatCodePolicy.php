<?php

namespace App\Eco\VatCode;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class VatCodePolicy
{
    use HandlesAuthorization;

    public function create(User $user)
    {
        return $user->hasPermissionTo('manage_financial', 'api');
    }

    public function update(User $user)
    {
        return $user->hasPermissionTo('manage_financial', 'api');
    }

}
