<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\PaymentInvoice;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class PaymentInvoiceObserver
{

    public function creating(PaymentInvoice $paymentInvoice)
    {
        // number kolom willen we NOT NULL houden, deze wordt meteen na opslaan bepaald op basis van het ID
        // Daarom tijdelijke waarde erin zetten zodat query niet onderuit gaat.
        $userId = Auth::id();
        $paymentInvoice->created_by_id = $userId;
    }

    public function created(PaymentInvoice $paymentInvoice)
    {
    }
}
