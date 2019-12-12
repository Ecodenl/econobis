<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 14-12-2017
 * Time: 16:32
 */

namespace App\Eco\QuotationRequest;


use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class QuotationRequestStatusPolicy
{
    use HandlesAuthorization;

    public function update(User $user)
    {
        return $user->hasPermissionTo('manage_financial', 'api');
    }
}