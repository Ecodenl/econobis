<?php

namespace App\Eco\ParticipantProject;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ParticipantProjectPolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('view_participation', 'api');
    }
    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_participation', 'api');
    }
}
