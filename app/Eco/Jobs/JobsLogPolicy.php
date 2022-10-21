<?php

namespace App\Eco\Jobs;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class JobsLogPolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('view_jobs_log', 'api');
    }

}
