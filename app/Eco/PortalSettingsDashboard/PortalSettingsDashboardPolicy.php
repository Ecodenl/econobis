<?php

namespace App\Eco\PortalSettingsDashboard;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PortalSettingsDashboardPolicy
{
    use HandlesAuthorization;

//todo WM: Hiervoor moet eventueel nog een aparte permission view_portal_settings komen
    public function view(User $user)
    {
        return $user->hasPermissionTo('manage_portal_settings', 'api');
    }
    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_portal_settings', 'api');
    }

}
