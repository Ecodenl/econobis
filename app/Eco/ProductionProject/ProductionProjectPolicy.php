<?php

namespace App\Eco\ProductionProject;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProductionProjectPolicy
{
    use HandlesAuthorization;

        public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_production_project', 'api');
    }
}
