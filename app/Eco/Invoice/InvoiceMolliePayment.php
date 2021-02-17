<?php

namespace App\Eco\Invoice;

use Illuminate\Database\Eloquent\Model;

class InvoiceMolliePayment extends Model
{
    const STATUS_OPEN = 'open';

    protected $guarded = ['id'];

    public static function addToInvoice(Invoice $invoice)
    {
        $data = [
            "amount" => [
                'currency' => 'EUR',
                'value' => number_format(($invoice->total_incl_vat_incl_reduction / 100), 2, '.', ','),
            ],
            "description" => "Factuur " . $invoice->number,
            "redirectUrl" => url('test'),
        ];

        $mollieApi = $invoice->administration->getMollieApiFacade();

        $payment = $mollieApi->payments()->create($data);

        $invoiceMolliePayment = new InvoiceMolliePayment([
            'invoice_id' => $invoice->id,
            'mollie_id' => $payment->id,
            'checkout_url' => $payment->getCheckoutUrl(),
            'status' => static::STATUS_OPEN,
        ]);

        $invoiceMolliePayment->save();
    }

}
