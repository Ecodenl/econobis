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

        $sepaPaymentHelper = new SepaPaymentHelper($administration, $invoices);

        $sepa =  $sepaPaymentHelper->generateSepaFile();

        foreach ($invoices as $invoice){
            $invoice->status_id = 'sent';
            $invoice->save();
        }

        return $sepaPaymentHelper->downloadSepa($sepa);
    }

}