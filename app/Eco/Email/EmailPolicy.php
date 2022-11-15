<?php

namespace App\Eco\Email;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class EmailPolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('view_email', 'api');
    }
}
