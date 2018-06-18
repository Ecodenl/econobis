<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\PaymentInvoice;

use App\Eco\Administration\Administration;
use App\Eco\PaymentInvoice\PaymentInvoice;
use App\Helpers\Sepa\SepaPaymentHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\PaymentInvoice\Grid\RequestQuery;
use App\Http\Resources\PaymentInvoice\GridPaymentInvoice;

class PaymentInvoiceController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $invoices = $requestQuery->get();

        $invoices->load(['revenueDistribution.contact']);

        $totalPrice = 0;
        foreach($invoices as $invoice){
            $totalPrice += $invoice->revenueDistribution->payout;
        }

        return GridPaymentInvoice::collection($invoices)
            ->additional([
                'meta' => [
                    'total' => $requestQuery->total(),
                    'totalPrice' => $totalPrice,
                ]
            ]);
    }


    public function generateSepaFile(Administration $administration){

        // Get invoices with status 'sent' and type 'incasso' from administration
        $invoices = PaymentInvoice::where('administration_id', $administration->id)->where('status_id', 'concept')->get();

        $validatedInvoices = $invoices->reject(function ($invoice) {
            return (empty($invoice->revenueDistribution->address) || empty($invoice->revenueDistribution->postal_code) || empty($invoice->revenueDistribution->city) || empty($invoice->revenueDistribution->participation->iban_payout));
        });

        $sepaPaymentHelper = new SepaPaymentHelper($administration, $validatedInvoices);

        $sepa =  $sepaPaymentHelper->generateSepaFile();

        foreach ($validatedInvoices as $invoice){
            $invoice->status_id = 'sent';
            $invoice->save();
        }

        return $sepaPaymentHelper->downloadSepa($sepa);
    }

    public function setNotPaid(PaymentInvoice $paymentInvoice){
        $paymentInvoice->date_paid = null;
        $paymentInvoice->status_id = 'not-paid';
        $paymentInvoice->save();
    }
}