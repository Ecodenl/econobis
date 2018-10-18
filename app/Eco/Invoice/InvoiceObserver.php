<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\Invoice;

use App\Eco\Order\Order;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class InvoiceObserver
{

    public function creating(Invoice $invoice)
    {
        // number kolom willen we NOT NULL houden, deze wordt meteen na opslaan bepaald op basis van het ID
        // Daarom tijdelijke waarde erin zetten zodat query niet onderuit gaat.
        $userId = Auth::id();
        $invoice->number = 'temp';

        if(!$invoice->status_id ){
            $invoice->status_id = 'to-send';
        }

        $invoice->invoice_number = 0;
        $invoice->created_by_id = $userId;

        $order = Order::find($invoice->order_id);

        $invoice->administration_id = $order->administration_id;
        $invoice->payment_type_id = $order->payment_type_id;
    }

    public function created(Invoice $invoice)
    {
        $invoice->invoice_number = Invoice::where('administration_id', $invoice->administration_id)->count();
        $invoice->number = 'T' . Carbon::now()->year . '-' . $invoice->invoice_number;
        $invoice->save();
    }

    public function saving(Invoice $invoice){
        $oldInvoiceStatusId = $invoice->getOriginal('status_id');

        // Als de status van to-send naar verzonden wordt gezet, updaten we van alle orderregels de laatste factuur datum.
        // Deze wordt later gebruikt om eenmalige producten te checken of ze betaald zijn en om de periode weer te geven op de factuur.
        if($invoice->status_id === 'sent' && $oldInvoiceStatusId === 'to-send'){
            foreach ($invoice->order->orderProducts as $orderProduct){
                $order = $orderProduct->order;
                if($orderProduct->date_last_invoice){
                    $dateLastInvoice = $order->addDurationToDate(Carbon::parse($orderProduct->date_last_invoice));
                }
                else{
                    $dateLastInvoice = $order->addDurationToDate(Carbon::parse($orderProduct->date_start));
                }

                $orderProduct->date_last_invoice = $dateLastInvoice;
                $orderProduct->save();
            }

            // Ook krijgt een factuur dan pas een definitief factuurnummer
            $invoice->invoice_number = Invoice::where('administration_id', $invoice->administration_id)->whereIn('status_id', ['sent', 'exported', 'paid', 'irrecoverable'])->count();
            $invoice->number = 'F' . Carbon::now()->year . '-' . $invoice->invoice_number;
            $invoice->save();
        }
    }
}
