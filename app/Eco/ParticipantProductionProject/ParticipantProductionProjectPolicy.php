<?php

namespace App\Eco\ParticipantProductionProject;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ParticipantProductionProjectPolicy
{
    use HandlesAuthorization;

        public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_participation', 'api');
    }
}
