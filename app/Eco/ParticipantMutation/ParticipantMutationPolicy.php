<?php

namespace App\Eco\ParticipantMutation;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ParticipantMutationPolicy
{
    use HandlesAuthorization;

        public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_financial', 'api');
    }
}
