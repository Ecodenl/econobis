<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\Campaign;

use Illuminate\Support\Facades\Auth;

class CampaignObserver
{

    public function creating(Campaign $campaign)
    {
        // number kolom willen we NOT NULL houden, deze wordt meteen na opslaan bepaald op basis van het ID
        // Daarom tijdelijke waarde erin zetten zodat query niet onderuit gaat.
        $campaign->number = 'temp';

        $userId = Auth::id();
        $campaign->created_by_id = $userId;
        $campaign->owned_by_id = $userId;
    }

    public function created(Campaign $campaign)
    {
        $campaign->number = 'c2017-' . $campaign->id; // TODO; goede nummers genereren
        $campaign->save();
    }
}