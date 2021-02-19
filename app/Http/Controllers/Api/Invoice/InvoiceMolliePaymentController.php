<?php

namespace App\Http\Controllers\Api\Invoice;

use App\Eco\Invoice\InvoiceMolliePayment;
use App\Helpers\Invoice\InvoiceHelper;
use App\Http\Controllers\Api\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;


class InvoiceMolliePaymentController extends ApiController
{
    /**
     * Dit is de webhook die Mollie aanroept na het uitvoeren van een betaling.
     */
    public function webhook(Request $request)
    {
        $invoiceMolliePayment = InvoiceMolliePayment::firstWhere('mollie_id', $request->input('id'));

        if(!$invoiceMolliePayment){
            return;
        }

        $invoice = $invoiceMolliePayment->invoice;

        $mollieApi = $invoice->administration->getMollieApiFacade();

        $payment = $mollieApi->payments->get($invoiceMolliePayment->mollie_id);

        if ($payment->isPaid())
        {
            $invoiceMolliePayment->date_paid = Carbon::now();
            $invoiceMolliePayment->save();

            /**
             * Als er geen gebruik wordt gemaakt van Twinfield markeren we de factuur als betaald.
             * Bij gebruik van Twinfield is Twinfield "de waarheid" en zal de betaald status later alsnog via Twinfield moeten worden geset.
             */
            if(!$invoice->administration->uses_twinfield){
                InvoiceHelper::saveInvoiceDatePaid($invoice, Carbon::now(), $invoiceMolliePayment->mollie_id);
            }
        }
    }

    /**
     * Deze link wordt vanuit de link in de factuur emails geopend.
     * Hier maken we de Mollie transactie aan en redirecten we de gebruiker naar de betaalpagina.
     */
    public function pay($invoiceMolliePaymentCode)
    {
        $invoiceMolliePayment = InvoiceMolliePayment::firstWhere('code', $invoiceMolliePaymentCode);

        if(!$invoiceMolliePayment){
            abort(404, 'Ongeldige betaallink.');
        }

        /**
         * Als de betaallink voor een tweede keer wordt geopend willen we geen nieuwe mollie transactie maken.
         */
        if(!$invoiceMolliePayment->mollie_id){
            $this->createAndSaveMollieTransaction($invoiceMolliePayment);
        }

        return redirect($invoiceMolliePayment->checkout_url);
    }

    /**
     * Dit is de pagina waar de gebruiker uit komt na het doen van de betaling
     */
    public function redirect($invoiceMolliePaymentCode)
    {
        $invoiceMolliePayment = InvoiceMolliePayment::firstWhere('code', $invoiceMolliePaymentCode);

        $invoice = $invoiceMolliePayment->invoice;

        $mollieApi = $invoice->administration->getMollieApiFacade();

        $payment = $mollieApi->payments->get($invoiceMolliePayment->mollie_id);

        if (!$payment->isPaid())
        {
            return 'Uw betaling kon niet worden verwerkt.';
        }

        return 'Bedankt voor uw betaling.';
    }

    /**
     * Maak een transactie aan via de Mollie api en sla deze op op het InvoiceMolliePayment model.
     */
    private function createAndSaveMollieTransaction(InvoiceMolliePayment $invoiceMolliePayment)
    {
        $invoice = $invoiceMolliePayment->invoice;

        $molliePostData = [
            "amount" => [
                'currency' => 'EUR',
                'value' => number_format($invoice->total_incl_vat_incl_reduction, 2, '.', ','),
            ],
            "description" => $invoice->administration->name . ' ' . $invoice->order->contact->full_name . ' ' . $invoice->number . ' ' . $invoice->subject,
            "redirectUrl" => route('mollie.redirect', [
                'invoiceMolliePaymentCode' => $invoiceMolliePayment->code
            ]),
        ];

        /**
         * Webhook url moet een openbare url zijn welke voor Mollie te benaderen is.
         * Aangezien dat lokaal niet kan deze dan maar uitschakelen.
         */
        if(config('app.env') !== 'local'){
            $molliePostData['webhookUrl'] = route('mollie.webhook');
        }

        $mollieApi = $invoice->administration->getMollieApiFacade();
        $payment = $mollieApi->payments()->create($molliePostData);

        $invoiceMolliePayment->update([
            'mollie_id' => $payment->id,
            'checkout_url' => $payment->getCheckoutUrl(),
            'date_activated' => Carbon::now(),
        ]);
    }
}