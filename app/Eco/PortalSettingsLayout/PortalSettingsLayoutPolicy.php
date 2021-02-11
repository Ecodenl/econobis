<?php

namespace App\Eco\PortalSettingsLayout;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PortalSettingsLayoutPolicy
{
    use HandlesAuthorization;

    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_portal_settings', 'api');
    }

}
