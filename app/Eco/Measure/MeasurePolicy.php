<?php

namespace App\Eco\Measure;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MeasurePolicy
{
    use HandlesAuthorization;

    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_measure', 'api');
    }
}
