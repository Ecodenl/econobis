<?php

namespace App\Eco\Ledger;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class LedgerPolicy
{
    use HandlesAuthorization;

    public function create(User $user)
    {
        return $user->hasPermissionTo('manage_financial', 'api');
    }

    public function update(User $user)
    {
        return $user->hasPermissionTo('manage_financial', 'api');
    }

}
