<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Invoice;

use App\Eco\Invoice\Invoice;
use App\Helpers\Invoice\InvoiceHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Invoice\Grid\RequestQuery;
use App\Http\Resources\Invoice\FullInvoice;
use App\Http\Resources\Invoice\GridInvoice;
use App\Http\Resources\Invoice\InvoicePeek;

class InvoiceController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $invoices = $requestQuery->get();

        $invoices->load(['order.contact']);

        $totalPrice = 0;
        foreach($invoices as $invoice){
            $totalPrice += $invoice->total_price_incl_vat_and_reduction;
        }

        return GridInvoice::collection($invoices)
            ->additional([
                'meta' => [
                    'total' => $requestQuery->total(),
                    'totalPrice' => $totalPrice,
                ]
            ]);
    }

    public function show(Invoice $invoice)
    {
        $invoice->load([
            'order.contact',
            'createdBy',
        ]);

        return FullInvoice::make($invoice);
    }

    public function store(RequestInput $input)
    {
        $this->authorize('manage', Invoice::class);

        $data = $input
            ->integer('orderId')->validate('required|exists:orders,id')
            ->alias('order_id')->next()
            ->string('sendMethodId')->validate('required')
            ->alias('send_method_id')->next()
            ->date('dateRequested')->validate('nullable|date')
            ->alias('date_requested')->next()
            ->date('dateCollection')->validate('nullable|date')->whenMissing(null)->onEmpty(null)
            ->alias('date_collection')->next()
            ->get();

        $invoice = new Invoice($data);
        $invoice->save();

        InvoiceHelper::saveInvoiceProducts($invoice, $invoice->order);

        $order = $invoice->order;
        $order->status_id = 'active';
        $order->save();

        return $this->show($invoice->fresh());
    }

    public function peek()
    {
        return InvoicePeek::collection(Invoice::all());
    }
}