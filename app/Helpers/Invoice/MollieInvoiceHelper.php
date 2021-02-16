<?php


namespace App\Helpers\Invoice;


use App\Eco\Invoice\Invoice;
use Mollie\Laravel\Facades\Mollie;

class MollieInvoiceHelper
{
    const STATUS_OPEN = 'open';

    public static function addMolliePaymentToInvoice(Invoice $invoice)
    {
        $data = [
            "amount" => [
                'currency' => 'EUR',
                'value' => number_format(($invoice->total_incl_vat_incl_reduction / 100), 2, '.', ','),
            ],
            "description" => "Factuur " . $invoice->number,
            "redirectUrl" => url('test'),
        ];

        $payment = Mollie::api()->payments()->create($data);

        $invoice->mollie_id = $payment->id;
        $invoice->mollie_checkout_url = $payment->getCheckoutUrl();
        $invoice->mollie_status_id = MollieInvoiceHelper::STATUS_OPEN;
        $invoice->save();
    }
}