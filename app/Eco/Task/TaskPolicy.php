<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 14-12-2017
 * Time: 16:32
 */

namespace App\Eco\Task;


use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TaskPolicy
{
    use HandlesAuthorization;

    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_task', 'api');
    }
}