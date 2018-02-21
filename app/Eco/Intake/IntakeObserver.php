<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\Intake;

use Illuminate\Support\Facades\Auth;

class IntakeObserver
{

    public function creating(Intake $intake)
    {
        $userId = Auth::id();
        $intake->created_by_id = $userId;
        $intake->updated_by_id = $userId;
    }

    public function updating(Intake $intake)
    {
        $userId = Auth::id();
        $intake->updated_by_id = $userId;
    }

}