<?php

namespace App\Eco\Portal;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PortalUserPolicy
{
    use HandlesAuthorization;

    public function view(User $user, PortalUser $portalUser)
    {
        return $user->can('view', $portalUser->contact);
    }

    public function update(User $user, PortalUser $portalUser)
    {
        return $user->can('update', $portalUser->contact);
    }

}
