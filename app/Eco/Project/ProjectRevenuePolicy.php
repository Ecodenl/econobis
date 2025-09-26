<?php

namespace App\Eco\Project;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProjectRevenuePolicy
{
    use HandlesAuthorization;

        public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_project', 'api');
    }
}
