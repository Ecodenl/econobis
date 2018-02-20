<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\Opportunity;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class OpportunityObserver
{

    public function creating(Opportunity $opportunity)
    {
        // number kolom willen we NOT NULL houden, deze wordt meteen na opslaan bepaald op basis van het ID
        // Daarom tijdelijke waarde erin zetten zodat query niet onderuit gaat.
        $opportunity->number = 'temp';

        $userId = Auth::id();
        $opportunity->created_by_id = $userId;
        $opportunity->updated_by_id = $userId;
    }

    public function created(Opportunity $opportunity)
    {
        $opportunity->number = 'K' . Carbon::now()->year . '-' . $opportunity->id;
        $opportunity->save();
    }

    public function updating(Opportunity $opportunity)
    {
        $userId = Auth::id();
        $opportunity->updated_by_id = $userId;
    }
}