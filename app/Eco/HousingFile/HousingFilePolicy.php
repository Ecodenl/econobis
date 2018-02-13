<?php

namespace App\Eco\HousingFile;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class HousingFilePolicy
{
    use HandlesAuthorization;

        public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_housing_file', 'api');
    }
}
