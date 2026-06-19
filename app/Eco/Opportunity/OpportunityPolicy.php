<?php

namespace App\Eco\Opportunity;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class OpportunityPolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('view_opportunity', 'api');
    }

    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_opportunity', 'api');
    }
}
