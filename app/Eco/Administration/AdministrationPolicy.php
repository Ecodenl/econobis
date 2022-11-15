<?php

namespace App\Eco\Administration;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class AdministrationPolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('view_financial', 'api');
    }
    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_financial', 'api');
    }
}
