<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\Invoice;

use App\Eco\Order\Order;
use App\Helpers\Invoice\InvoiceHelper;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class InvoicePaymentObserver
{

    public function creating(InvoicePayment $invoicePayment)
    {
        $invoicePayment->type_id = '';
    }

    public function saved(InvoicePayment $invoicePayment)
    {
        InvoiceHelper::saveInvoiceStatus($invoicePayment->invoice);
    }

    public function deleted(InvoicePayment $invoicePayment)
    {
        InvoiceHelper::saveInvoiceStatus($invoicePayment->invoice);
    }
}
