<?php

namespace App\Eco\PortalSettingsDashboard;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PortalSettingsDashboardPolicy
{
    use HandlesAuthorization;

    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_portal_settings', 'api');
    }

}
