<?php

namespace App\Http\Controllers\Api\Invoice;

use App\Eco\Invoice\Invoice;
use App\Eco\Invoice\InvoicePayment;
use App\Eco\Invoice\InvoiceProduct;
use App\Eco\Product\PriceHistory;
use App\Eco\Product\Product;
use App\Helpers\CSV\InvoiceCSVHelper;
use App\Helpers\Delete\Models\DeleteInvoice;
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
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use iio\libmergepdf\Merger;


class InvoiceController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $invoices = $requestQuery->get();

        $invoices->load(['order.contact']);

        foreach ($invoices as $invoice) {
            $orderController = new OrderController;
            $invoice->emailToAddress = $orderController->getContactInfoForOrder($invoice->order->contact)['email'];
        }

        $totalPrice = 0;
        foreach ($invoices as $invoice) {
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

        if ($datePaid['date_paid']) {
            InvoiceHelper::saveInvoiceDatePaid($invoice, $datePaid['date_paid']);
        }

        return $this->show($invoice->fresh());
    }

    public function setMultiplePaid(Request $request)
    {
        $this->authorize('manage', Invoice::class);

        $invoices = Invoice::whereIn('id', $request->input('ids'))->get();

        foreach ($invoices as $invoice) {
            InvoiceHelper::saveInvoiceDatePaid($invoice, $request->input('datePaid'));
        }

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

    public function sendNotificationPost(Invoice $invoice)
    {
        InvoiceHelper::sendNotification($invoice);

        $filePath = Storage::disk('administrations')->getDriver()
            ->getAdapter()->applyPathPrefix($invoice->document->filename);
        header('Access-Control-Expose-Headers: X-Filename');
        header('X-Filename:' . $invoice->document->name);

        return response()->download($filePath, $invoice->document->name);
    }

    public function sendNotifications(Request $request)
    {
        $invoices = Invoice::whereIn('id', $request->input('ids'))->get();

        foreach ($invoices as $invoice) {
            InvoiceHelper::sendNotification($invoice);
        }
    }

    public function sendNotificationsPost(Request $request)
    {
        $invoices = Invoice::whereIn('id', $request->input('ids'))->get();

        $merger = new Merger;
        foreach ($invoices as $invoice) {
            InvoiceHelper::sendNotification($invoice);

            if ($invoice->document) {
                $filePath = Storage::disk('administrations')->getDriver()
                    ->getAdapter()->applyPathPrefix($invoice->document->filename);

                $merger->addFile($filePath);
            }
        }

        $createdPdf = $merger->merge();

        $name = 'Post-facturen-notificaties-' . Carbon::now()->format("Y-m-d-H-i-s") . '.pdf';

        header('Access-Control-Expose-Headers: X-Filename');
        header('X-Filename:' . $name);

        return $createdPdf;

    }

    public function setIrrecoverable(Invoice $invoice)
    {
        $invoice->status_id = 'irrecoverable';
        $invoice->save();
        return $invoice;
    }

    public function sendAll(Request $request)
    {
        set_time_limit(0);
        $invoices = Invoice::whereIn('id', $request->input('ids'))->with(['order.contact', 'administration'])->get();

        $response = [];

        $administration = $invoices->first()->administration;
        $paymentTypeId = $invoices->first()->payment_type_id;

        if (!$administration->bic || !$administration->IBAN) {
            abort(412, 'BIC en IBAN zijn verplichte velden.');
        }

        if ($paymentTypeId === 'collection') {
            if (empty($administration->sepa_creditor_id)) {
                abort(412, 'Voor incasso facturen is SEPA crediteur id verplicht.');
            }
            // verwijder alle facturen waar geen IBAN bij order en geen IBAN bij contact te vinden is uit collectie.
            $validatedInvoices = $invoices->reject(function ($invoice) {
                return (empty($invoice->order->IBAN) && empty($invoice->order->contact->iban));
            });
        } else {
            $validatedInvoices = $invoices;
        }

        if ($validatedInvoices->count() > 0) {

            // Eerst hele zet in progress zetten
            foreach ($validatedInvoices as $invoice) {
                $orderController = new OrderController;
                $emailTo = $orderController->getContactInfoForOrder($invoice->order->contact)['email'];

                if ($emailTo === 'Geen e-mail bekend') {
                    abort(404, 'Geen e-mail bekend');
                } else {
                    InvoiceHelper::invoiceInProgress($invoice);
                }
            }
            foreach ($validatedInvoices as $invoice) {
                $invoice->date_collection = $request->input('dateCollection');
                $invoice->save();
                InvoiceHelper::createInvoiceDocument($invoice);
            }

            foreach ($validatedInvoices as $invoice) {
                //alleen als factuur goed is aangemaakt, gaan we mailen
                if ($invoice->invoicesToSend()->exists() && $invoice->invoicesToSend()->first()->invoice_created) {

                    InvoiceHelper::invoiceIsSending($invoice);
                    try {
                        $invoiceResponse = InvoiceHelper::send($invoice);
                        InvoiceHelper::invoiceSend($invoice);
                        array_push($response, $invoiceResponse);
                    } catch (WebformException $e) {
                        Log::error($e->getMessage());
                        InvoiceHelper::invoiceErrorSending($invoice);
                    }
                }
            }

            if ($paymentTypeId === 'collection') {
                // haal niet goed aangemaakte facturen uit list voor SEPA file
                $validatedInvoices = $invoices->reject(function ($invoice) {
                    return ($invoice->invoicesToSend()->exists() && !$invoice->invoicesToSend()->first()->invoice_created);
                });

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

        // Eerst hele zet in progress zetten
        foreach ($invoices as $k => $invoice) {
            InvoiceHelper::invoiceInProgress($invoice, true);
        }

        $orderController = new OrderController;

        $html
            = '<style>
.page-break {
    page-break-after: always;
}
</style>';

        foreach ($invoices as $k => $invoice) {

            if(!$this->isInvoiceOkForSending($invoice))
            {
                return false;
            }

            $invoice->date_collection = $request->input('dateCollection');
            $invoice->save();

            $emailTo = $orderController->getContactInfoForOrder($invoice->order->contact)['email'];
            $contactPerson = $orderController->getContactInfoForOrder($invoice->order->contact)['contactPerson'];

            if ($invoice->order->contact->full_name === $contactPerson) {
                $contactPerson = null;
            }

            $contactName = null;

            if ($invoice->order->contact->type_id == 'person') {
                $prefix = $invoice->order->contact->person->last_name_prefix;
                $contactName = $prefix ? $invoice->order->contact->person->first_name . ' ' . $prefix . ' ' . $invoice->order->contact->person->last_name : $invoice->order->contact->person->first_name . ' ' . $invoice->order->contact->person->last_name;
            } elseif ($invoice->order->contact->type_id == 'organisation') {
                $contactName = $invoice->order->contact->full_name;
            }

            if ($emailTo === 'Geen e-mail bekend') {
                $createdOk = InvoiceHelper::createInvoiceDocument($invoice);
                if($createdOk)
                {
                    InvoiceHelper::invoiceIsSending($invoice);
                    InvoiceHelper::invoiceSend($invoice);

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
        }

        $name = 'Post-facturen-' . Carbon::now()->format("Y-m-d-H-i-s") . '.pdf';

        libxml_use_internal_errors(true);
        $pdfOutput = PDF::loadHTML($html);
        libxml_use_internal_errors(false);

        header('X-Filename:' . $name);
        header('Access-Control-Expose-Headers: X-Filename');

        return $pdfOutput->output();
    }

    public function sendPost(Invoice $invoice, Request $request)
    {
        InvoiceHelper::invoiceInProgress($invoice, true);
        $invoice->date_collection = $request->input('dateCollection');
        $invoice->save();
        $createdOk = InvoiceHelper::createInvoiceDocument($invoice);
        if($createdOk)
        {
            InvoiceHelper::invoiceIsSending($invoice);
            InvoiceHelper::invoiceSend($invoice);
        }

        $filePath = Storage::disk('administrations')->getDriver()
            ->getAdapter()->applyPathPrefix($invoice->document->filename);

        header('X-Filename:' . $invoice->document->name);
        header('Access-Control-Expose-Headers: X-Filename');
        return response()->download($filePath, $invoice->document->name);
    }

    public function download(Invoice $invoice)
    {
        $this->authorize('manage', Invoice::class);

        if ($invoice->document) {
            $filePath = Storage::disk('administrations')->getDriver()
                ->getAdapter()->applyPathPrefix($invoice->document->filename);
            header('Access-Control-Expose-Headers: X-Filename');
            header('X-Filename:' . $invoice->document->name);
        } else {
            $invoiceNumber = 'F' . Carbon::now()->year . '-preview-' . $invoice->id;
            header('X-Filename:' . $invoiceNumber . '.pdf');
            header('Access-Control-Expose-Headers: X-Filename');
            return InvoiceHelper::createInvoiceDocument($invoice, true);
        }

        return response()->download($filePath, $invoice->document->name);
    }

    public function getEmailPreview(Invoice $invoice)
    {
        InvoiceHelper::createInvoiceDocument($invoice, true);
        return InvoiceHelper::send($invoice, true);
    }

    public function getAmountUnpaid()
    {

        $this->authorize('manage', Invoice::class);

        $user = Auth::user();

        $total = 0;

        foreach ($user->administrations as $administration) {
            $total += $administration->invoices()->whereIn('status_id', ['sent', 'exported'])->count();
        }

        return $total;
    }


    public function isInvoiceOkForSending(Invoice $invoice)
    {
        if( $invoice->administration->uses_twinfield && $invoice->invoiceProducts()->whereNull('twinfield_ledger_code')->exists() )
        {
            return false;
        }
        return true;
    }

    public function getInvoicesForSending(Request $request)
    {
        $this->authorize('manage', Invoice::class);

        $invoices = Invoice::whereIn('id', $request->input('ids'))->with('order.contact')->get();

        foreach ($invoices as $invoice) {
            $orderController = new OrderController;
            $invoice->emailToAddress = $orderController->getContactInfoForOrder($invoice->order->contact)['email'];
        }

        return SendInvoice::collection($invoices);
    }

    public function createSepaForInvoiceIds(Request $request)
    {
        $invoices = Invoice::whereIn('id', $request->input('ids'))->with(['order.contact', 'administration'])->get();

        $response = [];

        $administration = $invoices->first()->administration;
        $paymentTypeId = $invoices->first()->payment_type_id;


        if ($paymentTypeId === 'collection') {

            if (!$administration->bic || !$administration->IBAN) {
                abort(412, 'BIC en IBAN zijn verplichte velden.');
            }

            if ($paymentTypeId === 'collection') {
                if (empty($administration->sepa_creditor_id)) {
                    abort(412, 'Voor incasso facturen is SEPA crediteur id verplicht.');
                }
                // verwijder alle facturen waar geen IBAN bij order en geen IBAN bij contact te vinden is uit collectie.
                $validatedInvoices = $invoices->reject(function ($invoice) {
                    return (empty($invoice->order->IBAN) && empty($invoice->order->contact->iban));
                });
            } else {
                $validatedInvoices = $invoices;
            }

            if ($validatedInvoices->count() > 0) {
                $sepaHelper = new SepaHelper($administration, $validatedInvoices);

                $sepa = $sepaHelper->generateSepaFile();

                return $sepaHelper->downloadSepa($sepa);
            }

        }

        return $response;
    }


    public function storeInvoiceProduct(RequestInput $input, Request $request)
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
        $invoice = Invoice::find($data['invoice_id']);

        $price = 0;
        if ($product->currentPrice) {
            if ($product->currentPrice->has_variable_price) {
                $price = $request->input('variablePrice') ? $request->input('variablePrice') : 0;
            } else {
                $price = $product->currentPrice->price;
            }

            switch ($product->invoice_frequency_id) {
                case 'monthly':
                    $price = $price * 12;
                    break;
                case 'quarterly':
                    $price = $price * 4;
                    break;
                case 'half-year':
                    $price = $price * 2;
                    break;
                default:
                    $price = $price;
                    break;
            }

            switch ($invoice->collection_frequency_id) {
                case 'monthly':
                    $price = $price / 12;
                    break;
                case 'quarterly':
                    $price = $price / 4;
                    break;
                case 'half-year':
                    $price = $price / 2;
                    break;
                default:
                    $price = $price;
                    break;
            }
        }

        $invoiceProduct->price = $price;
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
        $product->ledger_id = $productData['ledgerId'];
        $product->ledger_id ?: $product->ledger_id = null;

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


        DB::transaction(function () use ($product, $priceHistory, $invoiceProduct, $invoice) {
            $product->save();

            $priceHistory->product_id = $product->id;
            $priceHistory->save();

            $price = 0;
            if ($product->currentPrice) {
                $price = $product->currentPrice->price;

                switch ($product->invoice_frequency_id) {
                    case 'monthly':
                        $price = $price * 12;
                        break;
                    case 'quarterly':
                        $price = $price * 4;
                        break;
                    case 'half-year':
                        $price = $price * 2;
                        break;
                    default:
                        $price = $price;
                        break;
                }

                switch ($invoice->collection_frequency_id) {
                    case 'monthly':
                        $price = $price / 12;
                        break;
                    case 'quarterly':
                        $price = $price / 4;
                        break;
                    case 'half-year':
                        $price = $price / 2;
                        break;
                    default:
                        $price = $price;
                        break;
                }
            }

            $invoiceProduct->product_id = $product->id;
            $invoiceProduct->price = $price;
            $invoiceProduct->vat_percentage = $product->currentPrice ? $product->currentPrice->vat_percentage : 0;
            $invoiceProduct->product_code = $product->code;
            $invoiceProduct->product_name = $product->name;
            $invoiceProduct->save();
        });
    }

    public function updateInvoiceProduct(RequestInput $input, InvoiceProduct $invoiceProduct, Request $request)
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

        if ($invoiceProduct->product->currentPrice->has_variable_price) {
            $price = $request->input('variablePrice') ? $request->input('variablePrice') : 0;

            $invoiceProduct->price = $price;
        }

        $invoiceProduct->save();

        return FullInvoiceProduct::make($invoiceProduct);
    }

    public function destroy(Invoice $invoice)
    {
        $this->authorize('manage', Invoice::class);

        try {
            DB::beginTransaction();

            $deleteInvoice = new DeleteInvoice($invoice);
            $result = $deleteInvoice->delete();

            if (count($result) > 0) {
                DB::rollBack();
                abort(412, implode(";", array_unique($result)));
            }

            DB::commit();
        } catch (\PDOException $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            abort(501, 'Er is helaas een fout opgetreden.');
        }
    }

    public function destroyInvoiceProduct(InvoiceProduct $invoiceProduct)
    {
        $this->authorize('manage', Invoice::class);

        $invoiceProduct->delete();
    }

}