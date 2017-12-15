<?php

namespace App\Eco\Registration;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class RegistrationPolicy
{
    use HandlesAuthorization;

        public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_registration', 'api');
    }
}
