<?php

namespace App\Eco\Source;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SourcePolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('view_intake', 'api');
    }

    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_intake', 'api');
    }

}
