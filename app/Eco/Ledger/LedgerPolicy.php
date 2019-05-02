<?php

namespace App\Eco\Ledger;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class LedgerPolicy
{
    use HandlesAuthorization;

    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_financial', 'api');
    }

}
