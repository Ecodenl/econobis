<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Invoice;

use App\Eco\Administration\Administration;
use App\Eco\Invoice\Invoice;
use App\Eco\Invoice\InvoicePayment;
use App\Helpers\CSV\InvoiceCSVHelper;
use App\Helpers\Invoice\InvoiceHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Invoice\Grid\RequestQuery;
use App\Http\Resources\Invoice\FullInvoice;
use App\Http\Resources\Invoice\GridInvoice;
use App\Http\Resources\Invoice\InvoicePeek;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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

    public function csv(RequestQuery $requestQuery)
    {
        $invoices = $requestQuery->getQueryNoPagination()->get();

        $invoiceCSVHelper = new InvoiceCSVHelper($invoices);

        $csv = $invoiceCSVHelper->downloadCSV();

        return $csv;
    }

    public function show(Invoice $invoice)
    {
        $invoice->load([
            'order.contact',
            'invoiceProducts',
            'payments',
            'tasks',
            'emails',
            'document',
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
        $invoice->status_id = 'checked';
        $invoice->save();

        InvoiceHelper::saveInvoiceProducts($invoice, $invoice->order);

        $order = $invoice->order;
        $order->status_id = 'active';
        $order->save();

        return $this->show($invoice->fresh());
    }

    public function update(RequestInput $input, Invoice $invoice)
    {
        $this->authorize('manage', Invoice::class);

        $datePaid = $input
            ->date('datePaid')->validate('nullable|date')->whenMissing(null)->onEmpty(null)->alias('date_paid')->next()->get();

        if($datePaid['date_paid']){
            InvoiceHelper::saveInvoiceDatePaid($invoice, $datePaid['date_paid']);
        }

        return $this->show($invoice->fresh());
    }

    public function newPayment(RequestInput $input, Invoice $invoice)
    {
        $this->authorize('manage', Invoice::class);

        $data = $input
            ->double('amount')->validate('required')->next()
            ->date('datePaid')->validate('required|date')->alias('date_paid')->next()
            ->get();

        $data['invoice_id'] = $invoice->id;

        $invoicePayment = new InvoicePayment($data);
        $invoicePayment->save();

        return $this->show($invoice->fresh());
    }

    public function updatePayment(RequestInput $input, InvoicePayment $invoicePayment)
    {
        $this->authorize('manage', Invoice::class);

        $data = $input
            ->double('amount')->validate('required')->next()
            ->date('datePaid')->validate('required|date')->alias('date_paid')->next()
            ->get();

        $invoicePayment->fill($data);
        $invoicePayment->save();

        return $this->show($invoicePayment->invoice->fresh());
    }

    public function deletePayment(InvoicePayment $invoicePayment)
    {
        $this->authorize('manage', Invoice::class);

        $invoicePayment->forceDelete();

        return;
    }

    public function peek()
    {
        return InvoicePeek::collection(Invoice::all());
    }

    public function sendNotification(Invoice $invoice)
    {
        return InvoiceHelper::sendNotification($invoice);
    }

    public function setIrrecoverable(Invoice $invoice)
    {
        $invoice->status_id = 'irrecoverable';
        $invoice->save();
        return $invoice;
    }

    public function setChecked(Invoice $invoice)
    {
        $invoice->status_id = 'checked';
        $invoice->save();
        return $invoice;
    }

    public function send(Invoice $invoice)
    {
        return InvoiceHelper::send($invoice);
    }

    public function sendAll(Administration $administration)
    {
        $invoices = Invoice::where('administration_id', $administration->id)->where('status_id', 'checked')->with('order.contact')->get();

        $response = [];

        foreach ($invoices as $invoice){
            array_push($response, $this->send($invoice));
        }

        return $response;
    }

    public function download(Invoice $invoice){

        $this->authorize('manage', Invoice::class);

        if ($invoice->document) {
            $filePath = Storage::disk('administrations')->getDriver()
                ->getAdapter()->applyPathPrefix($invoice->document->filename);
        } else {
            $invoice->number = 'T' . Carbon::now()->year . '-' . $invoice->invoice_number;

            return InvoiceHelper::createInvoiceDocument($invoice, true);
        }

        return response()->download($filePath, $invoice->document->name);
    }

    public function getEmailPreview(Invoice $invoice){

        return InvoiceHelper::send($invoice, true);

    }


    public function getAmountUnpaid(){

        $this->authorize('manage', Invoice::class);

        $user = Auth::user();

        $total = 0;

        foreach($user->administrations as $administration){
            $total +=  $administration->invoices()->whereIn('status_id', ['sent','exported'])->count();
        }

        return $total;
    }

    public function getInvoicesForSending(Administration $administration)
    {
        $this->authorize('manage', Invoice::class);

        $invoices = Invoice::where('administration_id', $administration->id)->where('status_id', 'checked')->with('order.contact')->get();

        return FullInvoice::collection($invoices);
    }

}