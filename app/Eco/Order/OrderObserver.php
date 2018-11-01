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

    public function saved(Order $order){
        foreach ($order->invoicesToSend as $invoiceToSend) {
            $invoiceToSend->collection_frequency_id = $order->collection_frequency_id;
            $invoiceToSend->subject = $order->subject;
            $invoiceToSend->invoice_text = $order->invoice_text;
            $invoiceToSend->save();
            foreach ($invoiceToSend->invoiceProducts as $invoiceProductToSend) {
                $price = 0;
                if ($invoiceProductToSend->product->currentPrice) {
                    $price = $invoiceProductToSend->product->currentPrice->price;

                    switch ($invoiceProductToSend->product->invoice_frequency_id) {
                        case 'monthly':
                            $price = $price * 12;
                            break;
                        case 'quarterly':
                            $price = $price * 4;
                            break;
                        case 'half-year':
                            $price = $price * 2;
                            break;
                        default:
                            $price = $price;
                            break;
                    }

                    switch ($order->collection_frequency_id) {
                        case 'monthly':
                            $price = $price / 12;
                            break;
                        case 'quarterly':
                            $price = $price / 4;
                            break;
                        case 'half-year':
                            $price = $price / 2;
                            break;
                        default:
                            $price = $price;
                            break;
                    }
                }

                $invoiceProductToSend->price = $price;
                $invoiceProductToSend->save();
            }
        }
    }
}
