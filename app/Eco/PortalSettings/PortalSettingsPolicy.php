<?php

namespace App\Eco\PortalSettings;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PortalSettingsPolicy
{
    use HandlesAuthorization;

//todo WM: Hiervoor moet nog een aparte permission view_portal_settings komen
// en in PortalSettingsLayoutPolicy moeten we dan wellicht ook nog rekening houden met verschil
// User en PortalUser ?!
//    public function view(User $user)
//    {
//        return $user->hasPermissionTo('manage_portal_settings', 'api');
//    }
    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_portal_settings', 'api');
    }

}
