<?php

namespace App\Eco\Invoice;

use Illuminate\Database\Eloquent\Model;

class InvoiceMolliePayment extends Model
{
    protected $guarded = ['id'];

    public static function addToInvoice(Invoice $invoice)
    {
        $data = [
            "amount" => [
                'currency' => 'EUR',
                'value' => number_format($invoice->total_incl_vat_incl_reduction, 2, '.', ','),
            ],
            "description" => $invoice->administration->name . ' ' . $invoice->order->contact->full_name . ' ' . $invoice->number . ' ' . $invoice->subject,
            "redirectUrl" => url('test'),
        ];

        /**
         * Webhook url moet een openbare url zijn welke voor Mollie te benaderen is.
         * Aangezien dat lokaal niet kan deze dan maar uitschakelen.
         */
        if(config('app.env') !== 'local'){
            $data['webhookUrl'] = route('mollie.webhook');
        }

        $mollieApi = $invoice->administration->getMollieApiFacade();

        $payment = $mollieApi->payments()->create($data);

        $invoiceMolliePayment = new InvoiceMolliePayment([
            'invoice_id' => $invoice->id,
            'mollie_id' => $payment->id,
            'checkout_url' => $payment->getCheckoutUrl(),
            'date_paid' => null,
        ]);

        $invoiceMolliePayment->save();
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
