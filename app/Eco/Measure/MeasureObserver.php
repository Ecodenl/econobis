<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\Measure;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class MeasureObserver
{

    public function creating(Measure $measure)
    {
        // number kolom willen we NOT NULL houden, deze wordt meteen na opslaan bepaald op basis van het ID
        // Daarom tijdelijke waarde erin zetten zodat query niet onderuit gaat.
        $measure->number = 'temp';

        $userId = Auth::id();
        $measure->created_by_id = $userId;
        $measure->updated_by_id = $userId;
    }

    public function created(Measure $measure)
    {
        $measure->number = 'M' . Carbon::now()->year . '-' .$measure->id;
        $measure->save();
    }

    public function updating(Measure $measure)
    {
        $userId = Auth::id();
        $measure->updated_by_id = $userId;
    }
}