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
        $invoice->invoice_number = 0;
        $invoice->created_by_id = $userId;
        $invoice->administration_id = Order::find($invoice->order_id)->pluck('administration_id');


    }

    public function created(Invoice $invoice)
    {
        $invoice->invoice_number =  Invoice::where('administration_id', $invoice->administration_id)->count();
        $invoice->number = 'F' . Carbon::now()->year . '-' . $invoice->invoice_number;
        $invoice->save();
    }
}
