<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\Cooperation;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class CooperationObserver
{

    public function creating(Cooperation $cooperation)
    {
        $userId = Auth::id();
        $cooperation->created_by_id = $userId;
        $cooperation->updated_by_id = $userId;
    }

    public function updating(Cooperation $cooperation)
    {
        $cooperation->updated_by_id = Auth::id();
    }
}