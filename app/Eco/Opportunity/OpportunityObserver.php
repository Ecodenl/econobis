<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\Opportunity;

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
    }

    public function created(Opportunity $opportunity)
    {
        $opportunity->number = 'k2017-' . $opportunity->id; // TODO; goede nummers genereren
        $opportunity->save();
    }
}