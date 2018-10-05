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
use App\Helpers\Sepa\SepaHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\Order\OrderController;
use App\Http\RequestQueries\Invoice\Grid\RequestQuery;
use App\Http\Resources\Invoice\FullInvoice;
use App\Http\Resources\Invoice\GridInvoice;
use App\Http\Resources\Invoice\InvoicePeek;
use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class InvoiceController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $invoices = $requestQuery->get();

        $invoices->load(['order.contact']);

        foreach ($invoices as $invoice){
            $orderController = new OrderController;
            $invoice->emailToAddress = $orderController->getContactInfoForOrder($invoice->order->contact)['email'];
        }

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
        set_time_limit(0);
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

        $orderController = new OrderController;
        $invoice->emailToAddress = $orderController->getContactInfoForOrder($invoice->order->contact)['email'];

        return FullInvoice::make($invoice);
    }

    public function store(RequestInput $input)
    {
        $this->authorize('manage', Invoice::class);

        $data = $input
            ->integer('orderId')->validate('required|exists:orders,id')
            ->alias('order_id')->next()
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

    public function setCheckedAll(Administration $administration)
    {
        $response = [];
        foreach ($administration->invoices()->where('status_id', 'concept')->get() as $invoice){
            array_push($response, $this->setChecked($invoice));
        }

        return $response;
    }

    public function send(Invoice $invoice)
    {
        $orderController = new OrderController;
        $emailTo = $orderController->getContactInfoForOrder($invoice->order->contact)['email'];

        if($emailTo === 'Geen e-mail bekend') {
            abort(404, 'Geen e-mail bekend');
        }
        else{
            return InvoiceHelper::send($invoice);
        }
    }

    public function sendPost(Invoice $invoice)
    {
        InvoiceHelper::createInvoiceDocument($invoice);
        $invoice->status_id = 'sent';
        $invoice->date_sent = Carbon::today();
        $invoice->save();

        $filePath = Storage::disk('administrations')->getDriver()
            ->getAdapter()->applyPathPrefix($invoice->document->filename);

        header('X-Filename:' . $invoice->document->name);
        header('Access-Control-Expose-Headers: X-Filename');
        return response()->download($filePath, $invoice->document->name);
    }

    public function sendAll(Request $request)
    {
        set_time_limit(0);
        $invoices = Invoice::whereIn('id', $request->input('ids'))->with('order.contact')->get();

        $response = [];

        foreach ($invoices as $invoice){
            array_push($response, $this->send($invoice));
        }

        return $response;
    }

    public function sendAllPost(Administration $administration)
    {
        set_time_limit(0);
        $invoices = Invoice::where('administration_id', $administration->id)->where('status_id', 'checked')->with('order.contact')->get();

        $orderController = new OrderController;

        $html
            = '<style>
.page-break {
    page-break-after: always;
}
</style>';

        foreach ($invoices as $k => $invoice){
            $emailTo = $orderController->getContactInfoForOrder($invoice->order->contact)['email'];
            $contactPerson = $orderController->getContactInfoForOrder($invoice->order->contact)['contactPerson'];

            if($invoice->order->contact->full_name === $contactPerson){
                $contactPerson = null;
            }

            $contactName = null;

            if($invoice->order->contact->type_id == 'person'){
                $prefix = $invoice->order->contact->person->last_name_prefix;
                $contactName = $prefix ? $invoice->order->contact->person->first_name . ' ' . $prefix . ' ' . $invoice->order->contact->person->last_name : $invoice->order->contact->person->first_name . ' ' . $invoice->order->contact->person->last_name;
            }
            elseif($invoice->order->contact->type_id == 'organisation'){
                $contactName = $invoice->order->contact->full_name;
            }

            if ($emailTo === 'Geen e-mail bekend') {
                $invoice->status_id = 'sent';
                $invoice->date_sent = Carbon::today();
                $invoice->save();
                InvoiceHelper::createInvoiceDocument($invoice);

                $img = '';
                if ($invoice->administration->logo_filename) {
                    $path = storage_path('app' . DIRECTORY_SEPARATOR
                        . 'administrations' . DIRECTORY_SEPARATOR
                        . $invoice->administration->logo_filename);
                    $logo = file_get_contents($path);

                    $src = 'data:' . mime_content_type($path)
                        . ';charset=binary;base64,' . base64_encode($logo);
                    $src = str_replace(" ", "", $src);
                    $img = '<img src="' . $src
                        . '" width="300px" height="auto"/>';
                }

                if ($k !== 0) {
                    $html .= '<div class="page-break"></div>';
                }
                $html .= view('invoices.generic')->with(['invoice' => $invoice, 'contactPerson' => $contactPerson, 'contactName' => $contactName])
                    ->with('logo', $img)->render();
            }
        }

        libxml_use_internal_errors(true);
        $pdfOutput = PDF::loadHTML($html)->output();
        libxml_use_internal_errors(false);
        return $pdfOutput;

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

    public function getInvoicesForSending(Request $request)
    {
        $this->authorize('manage', Invoice::class);

        $invoices = Invoice::whereIn('id', $request->input('ids'))->with('order.contact')->get();

        foreach ($invoices as $invoice){
            $orderController = new OrderController;
            $invoice->emailToAddress = $orderController->getContactInfoForOrder($invoice->order->contact)['email'];
        }

        return FullInvoice::collection($invoices);
    }

    public function generateSepaFile(Administration $administration){

        if(!$administration->sepa_creditor_id || !$administration->bic){
            abort(400, 'Sepa crediteur ID en BIC zijn verplichte velden.');
        }
        // Get invoices with status 'sent' and type 'incasso' from administration
        $invoices = Invoice::where('administration_id', $administration->id)->where('status_id', 'sent')->where('payment_type_id', 'collection')->get();

        $validatedInvoices = $invoices->reject(function ($invoice) {
            return empty($invoice->order->IBAN);
        });

        if($validatedInvoices->count() > 0) {
            $sepaHelper = new SepaHelper($administration, $validatedInvoices);

            $sepa = $sepaHelper->generateSepaFile();

            return $sepaHelper->downloadSepa($sepa);
        }
    }

}