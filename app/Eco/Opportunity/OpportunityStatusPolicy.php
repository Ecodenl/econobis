<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 14-12-2017
 * Time: 16:32
 */

namespace App\Eco\Opportunity;


use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class OpportunityStatusPolicy
{
    use HandlesAuthorization;

    public function update(User $user)
    {
        return $user->hasPermissionTo('manage_financial', 'api');
    }
}