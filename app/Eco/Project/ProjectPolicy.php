<?php

namespace App\Eco\Project;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProjectPolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('view_project', 'api');
    }
    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_project', 'api');
    }
}
