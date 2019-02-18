<?php

namespace App\Eco\ParticipantTransaction;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ParticipantTransactionPolicy
{
    use HandlesAuthorization;

        public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_financial', 'api');
    }
}
