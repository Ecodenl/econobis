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

    public function saved(Order $order)
    {
        foreach ($order->invoicesToSend as $invoiceToSend) {
            $invoiceToSend->collection_frequency_id = $order->collection_frequency_id;
            $invoiceToSend->subject = $order->subject;
            $invoiceToSend->invoice_text = $order->invoice_text;
            $invoiceToSend->save();

            foreach ($invoiceToSend->invoiceProducts as $invoiceProductToSend) {
                $priceNumberOfDecimals = 2;
                $price = 0;
                $priceInclVat = 0; // <- voorkom undefined

                $currentPrice = $invoiceProductToSend->product->currentPrice;

                if ($currentPrice !== null) {

                    if ($currentPrice->has_variable_price) {
                        // Product heeft variabele prijs, deze zou al in de notaregel opgeslagen moeten zijn.
                        // Bij wijziging incasso-frequentie doen we nu niets en slaan deze regel over.
                        continue;
                    }

                    $priceNumberOfDecimals = $currentPrice->price_number_of_decimals ?? 2;

                    // null / '' → 0.00
                    $price = empty($currentPrice->price) ? 0 : $currentPrice->price;
                    $priceInclVat = empty($currentPrice->price_incl_vat) ? 0 : $currentPrice->price_incl_vat;

                    // Frequentie op product
                    switch ($invoiceProductToSend->product->invoice_frequency_id) {
                        case 'monthly':
                            $price = $price * 12;
                            $priceInclVat = $priceInclVat * 12;
                            break;
                        case 'quarterly':
                            $price = $price * 4;
                            $priceInclVat = $priceInclVat * 4;
                            break;
                        case 'half-year':
                            $price = $price * 2;
                            $priceInclVat = $priceInclVat * 2;
                            break;
                        default:
                            // laat zoals het is
                            break;
                    }

                    // Frequentie op order (incasso)
                    switch ($order->collection_frequency_id) {
                        case 'monthly':
                            $price = $price / 12;
                            $priceInclVat = $priceInclVat / 12;
                            break;
                        case 'quarterly':
                            $price = $price / 4;
                            $priceInclVat = $priceInclVat / 4;
                            break;
                        case 'half-year':
                            $price = $price / 2;
                            $priceInclVat = $priceInclVat / 2;
                            break;
                        default:
                            // laat zoals het is
                            break;
                    }
                }

                $invoiceProductToSend->price_number_of_decimals = $priceNumberOfDecimals;
                $invoiceProductToSend->price = $price;
                $invoiceProductToSend->price_incl_vat = $priceInclVat;
                $invoiceProductToSend->save();
            }
        }
    }
}
