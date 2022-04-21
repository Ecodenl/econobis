<?php

namespace App\Eco\RevenuesKwh;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class RevenuesKwhPolicy
{
    use HandlesAuthorization;

        public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_financial', 'api');
    }
}
