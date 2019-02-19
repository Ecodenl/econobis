<?php

namespace App\Eco\ParticipantProject;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ObligationNumberPolicy
{
    use HandlesAuthorization;

        public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_financial', 'api');
    }
}
