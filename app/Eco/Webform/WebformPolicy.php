<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 12-09-2018
 * Time: 14:52
 */

namespace App\Eco\Webform;


use App\Eco\User\User;

class WebformPolicy
{

    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_webform', 'api');
    }

}