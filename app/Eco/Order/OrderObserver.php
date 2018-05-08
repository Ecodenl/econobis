<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\Order;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class OrderObserver
{

    public function creating(Order $order)
    {
        // number kolom willen we NOT NULL houden, deze wordt meteen na opslaan bepaald op basis van het ID
        // Daarom tijdelijke waarde erin zetten zodat query niet onderuit gaat.
        $order->number = 'temp';
        $userId = Auth::id();
        $order->created_by_id = $userId;
    }

    public function created(Order $order)
    {
        $order->number = 'O' . Carbon::now()->year . '-' . $order->id;
        $order->save();
    }
}
