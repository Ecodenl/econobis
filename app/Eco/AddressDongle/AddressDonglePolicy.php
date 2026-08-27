<?php

namespace App\Eco\AddressDongle;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class AddressDonglePolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('menu_dongles', 'api');
    }
    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_dongles', 'api');
    }
}
