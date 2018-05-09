<?php

namespace App\Eco\Order;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class OrderPolicy
{
    use HandlesAuthorization;

    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_financial', 'api');
    }
}
