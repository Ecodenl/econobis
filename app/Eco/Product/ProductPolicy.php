<?php

namespace App\Eco\Product;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProductPolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('view_financial', 'api');
    }

    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_financial', 'api');
    }
}
