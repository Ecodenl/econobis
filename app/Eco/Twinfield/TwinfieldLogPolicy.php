<?php

namespace App\Eco\Twinfield;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TwinfieldLogPolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('view_twinfield_log', 'api');
    }

}
