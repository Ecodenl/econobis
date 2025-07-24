<?php

namespace App\Eco\Intake;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class IntakePolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('view_intake', 'api');
    }

    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_intake', 'api');
    }
}
