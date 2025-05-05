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
            if($payment->details){
                $invoiceMolliePayment->iban = $payment->details->consumerAccount;
                $invoiceMolliePayment->iban_name = $payment->details->consumerName;;
            }
            $invoiceMolliePayment->save();

            /**
             * Als er geen gebruik wordt gemaakt van Twinfield markeren we de factuur als betaald.
             * Bij gebruik van Twinfield is Twinfield "de waarheid" en zal de betaald status later alsnog via Twinfield moeten worden geset.
             */
            if(!$invoice->administration->uses_twinfield){
                InvoiceHelper::saveInvoiceDatePaid($invoice, Carbon::now(), $invoiceMolliePayment->mollie_id);
                return;
            }

            /**
             * Als er wel gebruik wordt gemaakt van Twinfield en de status van de factuur is oninbaar
             * dan krijgen we een onlogische combi van Oninbaar i.c.m. substatus Mollie Betaald.
             * Daarom in dat geval de status weer terugzetten naar Verzonden.
             */
            if($invoice->status_id === 'irrecoverable'){
                $invoice->status_id = 'sent';
                $invoice->save();
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

        if($invoice->is_paid_by_mollie || $invoice->status_id === 'paid'){
            /**
             * Factuur is al betaald, redirect naar resultaatpagina.
             */
            return redirect()->route('mollie.redirect', [
                'invoiceCode' => $invoice->code
            ]);
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
             * Als factuur niet via Mollie is betaald, dan nog checken of de factuur buiten Mollie om op betaald is gezet.
             */
            if($invoice->status_id === 'paid'){
                $datePaid = Carbon::make($invoice->payments()->latest()->first()->date_paid); // (date_paid wordt vanuit model niet gecast naar carbon)
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
                'value' => number_format($invoice->total_incl_vat_incl_reduction, 2, '.', ''),
            ],
            "description" => $invoice->subject . ' ' . $invoice->administration->name . ' ' . $invoice->number . ' ' . $invoice->order->contact->full_name,
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
        $payment = $mollieApi->payments->create($molliePostData);

        return InvoiceMolliePayment::create([
            'invoice_id' => $invoice->id,
            'mollie_id' => $payment->id,
            'checkout_url' => $payment->getCheckoutUrl(),
            'date_activated' => Carbon::now(),
        ]);
    }
}