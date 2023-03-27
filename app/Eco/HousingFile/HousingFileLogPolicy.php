<?php

namespace App\Eco\HousingFile;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class HousingFileLogPolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('view_housing_file_log', 'api');
    }

}
