<?php

namespace App\Eco\Campaign;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CampaignPolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('view_marketing', 'api');
    }

    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_marketing', 'api');
    }
}
