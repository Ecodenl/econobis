<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Invoice;

use App\Eco\Invoice\Invoice;
use App\Eco\Invoice\InvoicePayment;
use App\Eco\Invoice\InvoiceProduct;
use App\Eco\Product\PriceHistory;
use App\Eco\Product\Product;
use App\Helpers\CSV\InvoiceCSVHelper;
use App\Helpers\Invoice\InvoiceHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Helpers\Sepa\SepaHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\Order\OrderController;
use App\Http\RequestQueries\Invoice\Grid\RequestQuery;
use App\Http\Resources\Invoice\FullInvoice;
use App\Http\Resources\Invoice\FullInvoiceProduct;
use App\Http\Resources\Invoice\GridInvoice;
use App\Http\Resources\Invoice\InvoicePeek;
use App\Http\Resources\Invoice\SendInvoice;
use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        $invoice->status_id = 'to-send';
        $invoice->collection_frequency_id = $invoice->order->collection_frequency_id;
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

    public function sendNotifications(Request $request)
    {
        $invoices = Invoice::whereIn('id', $request->input('ids'))->get();

        foreach ($invoices as $invoice) {
            InvoiceHelper::sendNotification($invoice);
        }
    }

    public function setIrrecoverable(Invoice $invoice)
    {
        $invoice->status_id = 'irrecoverable';
        $invoice->save();
        return $invoice;
    }

    public function send(Invoice $invoice, Request $request)
    {
        $invoice->date_collection = $request->input('dateCollection');
        $invoice->save();

        $orderController = new OrderController;
        $emailTo = $orderController->getContactInfoForOrder($invoice->order->contact)['email'];

        if($emailTo === 'Geen e-mail bekend') {
            abort(404, 'Geen e-mail bekend');
        }
        else{
            return InvoiceHelper::send($invoice);
        }
    }

    public function sendPost(Invoice $invoice, Request $request)
    {
        $invoice->date_collection = $request->input('dateCollection');
        $invoice->save();
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
        $invoices = Invoice::whereIn('id', $request->input('ids'))->with(['order.contact', 'administration'])->get();

        $response = [];

        $administration = $invoices->first()->administration;
        $paymentTypeId = $invoices->first()->payment_type_id;

        if (!$administration->sepa_creditor_id || !$administration->bic || !$administration->IBAN) {
            abort(412, 'Sepa crediteur ID, BIC en IBAN zijn verplichte velden.');
        }

        if ($paymentTypeId === 'collection') {
            $validatedInvoices = $invoices->reject(function ($invoice) {
                return (empty($invoice->order->IBAN) && empty($invoice->order->contact->iban));
            });
        }
        else{
            $validatedInvoices = $invoices;
        }

        if($validatedInvoices->count() > 0) {
            foreach ($validatedInvoices as $invoice){
                array_push($response, $this->send($invoice, $request));
            }
            if($paymentTypeId === 'collection') {
                $sepaHelper = new SepaHelper($administration, $validatedInvoices);

                $sepa = $sepaHelper->generateSepaFile();

                return $sepaHelper->downloadSepa($sepa);
            }
        }

        return $response;
    }

    public function sendAllPost(Request $request)
    {
        set_time_limit(0);
        $invoices = Invoice::whereIn('id', $request->input('ids'))->with(['order.contact', 'administration'])->get();

        $orderController = new OrderController;

        $html
            = '<style>
.page-break {
    page-break-after: always;
}
</style>';

        foreach ($invoices as $k => $invoice){
            $invoice->date_collection = $request->input('dateCollection');
            $invoice->save();

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
                        . '" width="auto" height="156px"/>';
                }

                if ($k !== 0) {
                    $html .= '<div class="page-break"></div>';
                }
                $html .= view('invoices.generic')->with(['invoice' => $invoice, 'contactPerson' => $contactPerson, 'contactName' => $contactName])
                    ->with('logo', $img)->render();
            }
        }

        $name = 'Post-facturen-' . Carbon::now()->format("Y-m-d-H-i-s") . '.pdf';

        libxml_use_internal_errors(true);
        $pdfOutput = PDF::loadHTML($html);
        libxml_use_internal_errors(false);

        header('X-Filename:' . $name);
        header('Access-Control-Expose-Headers: X-Filename');

        return $pdfOutput->output();
    }

    public function download(Invoice $invoice){

        $this->authorize('manage', Invoice::class);

        if ($invoice->document) {
            $filePath = Storage::disk('administrations')->getDriver()
                ->getAdapter()->applyPathPrefix($invoice->document->filename);
            header('Access-Control-Expose-Headers: X-Filename');
            header('X-Filename:' . $invoice->document->name);
        } else {
            $invoice->number = 'T' . Carbon::now()->year . '-' . $invoice->invoice_number;
            header('X-Filename:' . 'T' . Carbon::now()->year . '-' . $invoice->invoice_number . '.pdf');
            header('Access-Control-Expose-Headers: X-Filename');
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

        return SendInvoice::collection($invoices);
    }

    public function createSepaForInvoiceIds(Request $request){

        $invoices = Invoice::whereIn('id', $request->input('ids'))->with(['order.contact', 'administration'])->get();

        $response = [];

        $administration = $invoices->first()->administration;

        if(!$administration->sepa_creditor_id || !$administration->bic || !$administration->IBAN){
            abort(412, 'Sepa crediteur ID, BIC en IBAN zijn verplichte velden.');
        }

        $validatedInvoices = $invoices->reject(function ($invoice) {
            return (empty($invoice->order->IBAN) && empty($invoice->order->contact->iban));
        });

        if($validatedInvoices->count() > 0) {
            $sepaHelper = new SepaHelper($administration, $validatedInvoices);

            $sepa = $sepaHelper->generateSepaFile();

            return $sepaHelper->downloadSepa($sepa);
        }

        return $response;
    }


    public function storeInvoiceProduct(RequestInput $input)
    {
        $this->authorize('manage', Invoice::class);

        $data = $input
            ->string('productId')->validate('required|exists:products,id')->alias('product_id')->next()
            ->string('invoiceId')->validate('required|exists:invoices,id')->alias('invoice_id')->next()
            ->string('description')->validate('required')->next()
            ->integer('amount')->validate('required')->next()
            ->numeric('amountReduction')->onEmpty(null)->whenMissing(null)->alias('amount_reduction')->next()
            ->numeric('percentageReduction')->onEmpty(null)->whenMissing(null)->alias('percentage_reduction')->next()
            ->date('dateLastInvoice')->validate('required')->alias('date_last_invoice')->next()
            ->get();

        $invoiceProduct = new InvoiceProduct($data);

        $product = Product::find($data['product_id']);
        $invoiceProduct->price = $product->currentPrice ? $product->currentPrice->price : 0;
        $invoiceProduct->vat_percentage = $product->currentPrice ? $product->currentPrice->vat_percentage : 0;
        $invoiceProduct->product_code = $product->code;
        $invoiceProduct->product_name = $product->name;

        $invoiceProduct->save();

        return FullInvoiceProduct::make($invoiceProduct);
    }

    public function storeProductAndInvoiceProduct(Request $request)
    {
        $this->authorize('manage', Invoice::class);

        $productData = $request->input('product');

        $product = new Product();
        $product->is_one_time = $productData['isOneTime'];
        $product->name = $productData['name'];
        $product->code = $productData['code'];
        $product->duration_id = $productData['durationId'];
        $product->invoice_frequency_id = $productData['invoiceFrequencyId'];
        $product->administration_id = $productData['administrationId'];

        $priceHistory = new PriceHistory();
        $priceHistory->date_start = Carbon::today();
        $priceHistory->price = $productData['price'];
        $priceHistory->vat_percentage = $productData['vatPercentage'] ? $productData['vatPercentage'] : null;

        $invoiceProductData = $request->input('invoiceProduct');

        $invoiceProduct = new InvoiceProduct();
        $invoiceProduct->invoice_id = $invoiceProductData['invoiceId'];
        $invoiceProduct->description = $invoiceProductData['description'];
        $invoiceProduct->amount = $invoiceProductData['amount'];
        $invoiceProduct->amount_reduction = $invoiceProductData['amountReduction'] ? $invoiceProductData['amountReduction'] : 0;
        $invoiceProduct->percentage_reduction = $invoiceProductData['percentageReduction'] ? $invoiceProductData['percentageReduction'] : 0;
        $invoiceProduct->date_last_invoice = $invoiceProductData['dateLastInvoice'];


        $invoice = Invoice::find($invoiceProductData['invoiceId']);

        $product->payment_type_id = $invoice->payment_type_id;

        DB::transaction(function () use ($product, $priceHistory, $invoiceProduct) {
            $product->save();

            $priceHistory->product_id = $product->id;
            $priceHistory->save();

            $invoiceProduct->product_id = $product->id;
            $invoiceProduct->price = $product->currentPrice ? $product->currentPrice->price : 0;
            $invoiceProduct->vat_percentage = $product->currentPrice ? $product->currentPrice->vat_percentage : 0;
            $invoiceProduct->product_code = $product->code;
            $invoiceProduct->product_name = $product->name;
            $invoiceProduct->save();
        });
    }

    public function updateInvoiceProduct(RequestInput $input, InvoiceProduct $invoiceProduct)
    {
        $this->authorize('manage', Invoice::class);

        $data = $input
            ->string('productId')->validate('required|exists:products,id')->alias('product_id')->next()
            ->string('invoiceId')->validate('required|exists:invoices,id')->alias('invoice_id')->next()
            ->string('description')->validate('required')->next()
            ->integer('amount')->validate('required')->next()
            ->numeric('amountReduction')->onEmpty(null)->whenMissing(null)->alias('amount_reduction')->next()
            ->numeric('percentageReduction')->onEmpty(null)->whenMissing(null)->alias('percentage_reduction')->next()
            ->date('dateLastInvoice')->validate('required')->alias('date_last_invoice')->next()
            ->get();

        $invoiceProduct->fill($data);

        $invoiceProduct->save();

        return FullInvoiceProduct::make($invoiceProduct);
    }

    public function destroyInvoiceProduct(InvoiceProduct $invoiceProduct)
    {
        $this->authorize('manage', Invoice::class);

        $invoiceProduct->delete();
    }

}