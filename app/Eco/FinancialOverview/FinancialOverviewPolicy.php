<?php

namespace App\Eco\FinancialOverview;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class FinancialOverviewPolicy
{
    use HandlesAuthorization;

    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_financial', 'api');
    }

}
