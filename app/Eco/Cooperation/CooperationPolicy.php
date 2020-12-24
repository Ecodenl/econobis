<?php

namespace App\Eco\Cooperation;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CooperationPolicy
{
    use HandlesAuthorization;

    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_cooperation_settings', 'api');
    }
}