<?php

namespace App\Eco\Source;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SourcePolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('menu_sources', 'api');
    }

    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_sources', 'api');
    }

}
