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
     * Dit is de webhook die Mollie aanroept na het uitvoeren van een betaling
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
}