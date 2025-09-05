<?php

namespace App\Eco\IntakeSource;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class IntakeSourcePolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('menu_intake_sources', 'api');
    }

    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_intake_sources', 'api');
    }

}
