<?php

namespace App\Http\Controllers\Api\Invoice;

use App\Eco\Invoice\Invoice;
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
    public function pay($invoiceCode)
    {
        $invoice = Invoice::firstWhere('code', $invoiceCode);

        if(!$invoice){
            return view('mollie.404');
        }

        $payedInvoiceMolliePayment = $invoice->molliePayments()->whereNotNull('date_paid')->first();
        if($payedInvoiceMolliePayment){
            /**
             * Er is al een betaalde Mollie transactie.
             * Dan redirecten we daar naartoe, zodat de gebruiker wordt omgeleid naar de "u heeft betaald" pagina.
             */
            return redirect($payedInvoiceMolliePayment->checkout_url);
        }

        /**
         * Er is nog niet betaald, maak een mollie transactie aan, en redirect daar naartoe.
         */
        $invoiceMolliePayment = $this->createInvoiceMolliePayment($invoice);

        return redirect($invoiceMolliePayment->checkout_url);
    }

    /**
     * Dit is de pagina waar de gebruiker uit komt na het doen van de betaling
     */
    public function redirect($invoiceCode)
    {
        $invoice = Invoice::firstWhere('code', $invoiceCode);

        if(!$invoice){
            return view('mollie.404');
        }

        $datePaid = optional($invoice->molliePayments()->whereNotNull('date_paid')->first())->date_paid;

        if(!$datePaid){
            /**
             * Als de factuur nog niet betaald is zou het zo kunnen zijn dat de webhook nog niet volledig is verwerkt.(?)
             * In dat geval checken we nog een keer bij Mollie zelf voor de actuele status.
             *
             * Dit slaan we verder niet op omdat de webhook "de waarheid" bepaalt.
             *
             * Todo; checken of dit echt nodig is, of dat webhook altijd eerder afgerond is. Dan kan dit hele blok eruit.
             */
            try {
                $invoiceMolliePayment = $invoice->lastMolliePayment;
                $mollieApi = $invoice->administration->getMollieApiFacade();
                $payment = $mollieApi->payments->get($invoiceMolliePayment->mollie_id);
                if ($payment->isPaid()) {
                    $datePaid = Carbon::now();
                }
            } catch (\Exception $e) {
                // Mollie errors negeren
            }
        }

        return view('mollie.result', [
            'invoice' => $invoice,
            'datePaid' => $datePaid,
        ]);
    }

    /**
     * Maak een transactie aan via de Mollie api en sla deze op op het InvoiceMolliePayment model.
     */
    private function createInvoiceMolliePayment(Invoice $invoice)
    {
        $molliePostData = [
            "amount" => [
                'currency' => 'EUR',
                'value' => number_format($invoice->total_incl_vat_incl_reduction, 2, '.', ','),
            ],
            "description" => $invoice->administration->name . ' ' . $invoice->order->contact->full_name . ' ' . $invoice->number . ' ' . $invoice->subject,
            "redirectUrl" => route('mollie.redirect', [
                'invoiceCode' => $invoice->code
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

        return InvoiceMolliePayment::create([
            'invoice_id' => $invoice->id,
            'mollie_id' => $payment->id,
            'checkout_url' => $payment->getCheckoutUrl(),
            'date_activated' => Carbon::now(),
        ]);
    }
}