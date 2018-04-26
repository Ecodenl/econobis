<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\Administration;

use Illuminate\Support\Facades\Auth;

class AddressObserver
{

    public function creating(Administration $administration)
    {
        $userId = Auth::id();
        $administration->created_by_id = $userId;
    }
}
