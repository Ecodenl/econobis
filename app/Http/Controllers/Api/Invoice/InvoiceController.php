<?php

namespace App\Http\Controllers\Api\Invoice;

use App\Eco\Administration\Administration;
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
use App\Jobs\FinancialOverview\CreateAllFinancialOverviewContactsPost;
use App\Jobs\Invoice\SendAllInvoices;
use App\Jobs\Invoice\SendInvoiceNotifications;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Eloquent\Collection;
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
        $this->authorize('view', Invoice::class);

        $invoices = $requestQuery->get();

        $onlyEmailInvoices = $requestQuery->getRequest()->onlyEmailInvoices == 'true';
        $onlyPostInvoices = $requestQuery->getRequest()->onlyPostInvoices == 'true';
        $setInvoicesPaid = $requestQuery->getRequest()->setInvoicesPaid == 'true';

        $invoices->load(['order.contact']);

        $orderController = new OrderController;

        foreach ($invoices as $invoice) {
            $invoice->emailToAddress = $orderController->getContactInfoForOrder($invoice->order->contact)['email'];
        }

        $selectedInvoices = Invoice::whereIn('id', $requestQuery->totalIds())->get();
        $selectedInvoices->load(['order.contact', 'invoiceProducts.product']);

        if ($setInvoicesPaid)
        {
            $invoices = $invoices->reject(function ($invoice) {
                $invoiceInTwinfield = ( $invoice->administration->uses_twinfield && $invoice->twinfield_number && !empty($invoice->twinfield_number) ) ? true : false;
                if(!$invoiceInTwinfield) return false;
                if(!$invoice->administration->date_sync_twinfield_invoices) return false;
                return ( $invoice->date_sent >= $invoice->administration->date_sync_twinfield_invoices );
            });
            $invoices = $invoices->reject(function ($invoice) {
                return ($invoice->total_incl_vat_incl_reduction < 0 && $invoice->payment_type_id === 'collection');
            });
            $selectedInvoices = $selectedInvoices->reject(function ($invoice) {
                $invoiceInTwinfield = ( $invoice->administration->uses_twinfield && $invoice->twinfield_number && !empty($invoice->twinfield_number) ) ? true : false;
                if(!$invoiceInTwinfield) return false;
                if(!$invoice->administration->date_sync_twinfield_invoices) return false;
                return ( $invoice->date_sent >= $invoice->administration->date_sync_twinfield_invoices );
            });
            $selectedInvoices = $selectedInvoices->reject(function ($invoice) {
                return ($invoice->total_incl_vat_incl_reduction < 0 && $invoice->payment_type_id === 'collection');
            });
        }
        elseif ($onlyEmailInvoices)
        {
            $selectedInvoices = $selectedInvoices->map(function($invoice) use($orderController) {
                $invoice->emailToAddress = $orderController->getContactInfoForOrder($invoice->order->contact)['email'];
                return $invoice;
            });

            $invoices = $invoices->reject(function ($invoice) {
                return ( $invoice->emailToAddress === 'Geen e-mail bekend' || ( empty($invoice->order->contact->iban) && $invoice->payment_type_id === 'collection' ) );
            });
            $invoices = $invoices->reject(function ($invoice) {
                return ($invoice->total_incl_vat_incl_reduction < 0 && $invoice->payment_type_id === 'collection');
            });
            $invoices = $invoices->reject(function ($invoice) {
                return ($invoice->administration->uses_twinfield && !$invoice->isInvoiceFullyCompatibleWithTwinfield());
            });
            $selectedInvoices = $selectedInvoices->reject(function ($invoice) {
                return ( $invoice->emailToAddress === 'Geen e-mail bekend' || ( empty($invoice->order->contact->iban) && $invoice->payment_type_id === 'collection' ) );
            });
            $selectedInvoices = $selectedInvoices->reject(function ($invoice) {
                return ($invoice->total_incl_vat_incl_reduction < 0 && $invoice->payment_type_id === 'collection');
            });
            $selectedInvoices = $selectedInvoices->reject(function ($invoice) {
                return ($invoice->administration->uses_twinfield && !$invoice->isInvoiceFullyCompatibleWithTwinfield());
            });
        }
        elseif ($onlyPostInvoices)
        {
            $selectedInvoices = $selectedInvoices->map(function($invoice) use($orderController) {
                $invoice->emailToAddress = $orderController->getContactInfoForOrder($invoice->order->contact)['email'];
                return $invoice;
            });

            $invoices = $invoices->reject(function ($invoice) {
                return ( $invoice->emailToAddress !== 'Geen e-mail bekend' || ( empty($invoice->order->contact->iban) && $invoice->payment_type_id === 'collection' ) );
            });
            $invoices = $invoices->reject(function ($invoice) {
                return ($invoice->total_incl_vat_incl_reduction < 0 && $invoice->payment_type_id === 'collection');
            });
            $invoices = $invoices->reject(function ($invoice) {
                return ($invoice->administration->uses_twinfield && !$invoice->isInvoiceFullyCompatibleWithTwinfield());
            });
            $selectedInvoices = $selectedInvoices->reject(function ($invoice) {
                return ( $invoice->emailToAddress !== 'Geen e-mail bekend' || ( empty($invoice->order->contact->iban) && $invoice->payment_type_id === 'collection' ) );
            });
            $selectedInvoices = $selectedInvoices->reject(function ($invoice) {
                return ($invoice->total_incl_vat_incl_reduction < 0 && $invoice->payment_type_id === 'collection');
            });
            $selectedInvoices = $selectedInvoices->reject(function ($invoice) {
                return ($invoice->administration->uses_twinfield && !$invoice->isInvoiceFullyCompatibleWithTwinfield());
            });
        }

        $totalIds = $selectedInvoices->pluck("id");

        $totalPrice = 0;
//        foreach ($selectedInvoices as $invoice) {
//            $totalPrice += $invoice->total_incl_vat_incl_reduction;
//        }

        return GridInvoice::collection($invoices)
            ->additional([
                'meta' => [
                    'total' => $requestQuery->total(),
                    'invoiceIdsTotal' => $totalIds,
                    'totalPrice' => $totalPrice,
                ]
            ]);
    }

    public function csv(RequestQuery $requestQuery)
    {
        $this->authorize('view', Invoice::class);

        set_time_limit(0);
        $invoices = $requestQuery->getQueryNoPagination()->get();

        $invoiceCSVHelper = new InvoiceCSVHelper($invoices);

        $csv = $invoiceCSVHelper->downloadCSV();

        return $csv;
    }

    public function showFromTwinfield(Request $request)
    {
        $this->authorize('view', Invoice::class);

        $invoice = null;
        if($request->input('twinfieldCode') && $request->input('twinfieldNumber')){
            $administration = Administration::where('twinfield_office_code', $request->input('twinfieldCode') )->first();
            if($administration){
                $invoice = Invoice::where('administration_id', $administration->id )
                    ->where('twinfield_number', $request->input('twinfieldNumber') )->first();
            }
        }
        if($invoice){
            return $this->show($invoice);
        }
        return null;
    }

    public function show(Invoice $invoice)
    {
        $this->authorize('view', Invoice::class);

        $invoice->load([
            'order.contact',
            'invoiceProducts',
            'payments',
            'molliePayments',
            'twinfieldMessagesInvoice',
            'twinfieldMessagesPayment',
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
            ->date('datePaid')->validate('nullable|date')->whenMissing(null)->onEmpty(null)->alias('date_paid')->next()
            ->string('paymentReference')->whenMissing(null)->onEmpty(null)->alias('payment_reference')->next()
            ->get();

        if ($datePaid['date_paid']) {
            InvoiceHelper::saveInvoiceDatePaid($invoice, $datePaid['date_paid'], $datePaid['payment_reference']);
        }

        return $this->show($invoice->fresh());
    }

    public function setMultiplePaid(Request $request)
    {
        $this->authorize('manage', Invoice::class);

        $invoices = Invoice::whereIn('id', $request->input('ids'))->get();

        foreach ($invoices as $invoice) {
            InvoiceHelper::saveInvoiceDatePaid($invoice, $request->input('datePaid'), $request->input('paymentReference'));
        }

    }

    public function newPayment(RequestInput $input, Invoice $invoice)
    {
        $this->authorize('manage', Invoice::class);

        $data = $input
            ->double('amount')->validate('required')->next()
            ->date('datePaid')->validate('required|date')->alias('date_paid')->next()
            ->string('paymentReference')->whenMissing(null)->onEmpty(null)->alias('payment_reference')->next()
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
            ->string('paymentReference')->whenMissing(null)->onEmpty(null)->alias('payment_reference')->next()
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
        if(Auth::user()->hasPermissionTo('view_invoice', 'api')){
            return InvoicePeek::collection(Invoice::all());
        } else {
            return InvoicePeek::collection(new Collection());
        }
    }

    public function sendNotification(Invoice $invoice)
    {
        $this->authorize('manage', Invoice::class);

        SendInvoiceNotifications::dispatch($invoice, Auth::id());
    }

    public function sendNotificationPost(Invoice $invoice)
    {
        $this->authorize('manage', Invoice::class);

        InvoiceHelper::sendNotification($invoice, Auth::id());

        $filePath = Storage::disk('administrations')
            ->path($invoice->document->filename);
        header('Access-Control-Expose-Headers: X-Filename');
        header('X-Filename:' . $invoice->document->name);

        return response()->download($filePath, $invoice->document->name);
    }

    public function sendNotifications(Request $request)
    {
        $this->authorize('manage', Invoice::class);

        $invoices = Invoice::whereIn('id', $request->input('ids'))->get();

        foreach ($invoices as $invoice) {
            SendInvoiceNotifications::dispatch($invoice, Auth::id());
        }
    }

    public function sendNotificationsPost(Request $request)
    {
        $this->authorize('manage', Invoice::class);

        $invoices = Invoice::whereIn('id', $request->input('ids'))->get();

        $merger = new Merger;
        foreach ($invoices as $invoice) {
            InvoiceHelper::sendNotification($invoice, Auth::id());

            if ($invoice->document) {
                $filePath = Storage::disk('administrations')
                    ->path($invoice->document->filename);

                $merger->addFile($filePath);
            }
        }

        $createdPdf = $merger->merge();

        $name = 'Post-notas-notificaties-' . Carbon::now()->format("Y-m-d-H-i-s") . '.pdf';

        header('Access-Control-Expose-Headers: X-Filename');
        header('X-Filename:' . $name);

        return $createdPdf;

    }

    public function setIrrecoverable(Invoice $invoice)
    {
        $this->authorize('manage', Invoice::class);

        $invoice->status_id = 'irrecoverable';
        $invoice->save();
        return $invoice;
    }

    public function sendAll(Request $request)
    {
        set_time_limit(0);
        $this->authorize('manage', Invoice::class);

        $invoices = Invoice::whereIn('id', $request->input('ids'))->with(['order.contact', 'administration'])->get();

        // verwijder alle notas waar twinfield gebruikt wordt en geen ledgercode bekend is
        $validatedInvoices = $invoices->reject(function ($invoice) {
            return ($invoice->administration->uses_twinfield && $invoice->invoiceProducts()->whereNull('twinfield_ledger_code')->exists());
        });

        $response = [];

        if ($validatedInvoices->count() > 0) {
            $administration = $validatedInvoices->first()->administration;
            $paymentTypeId = $validatedInvoices->first()->payment_type_id;

            if (!$administration->bic || !$administration->IBAN) {
                abort(412, 'BIC en IBAN zijn verplichte velden.');
            }

            if ($paymentTypeId === 'collection') {
                if (empty($administration->sepa_creditor_id)) {
                    abort(412, "Voor incasso nota's is SEPA crediteur id verplicht.");
                }
                // verwijder alle notas waar geen IBAN bij order en geen IBAN bij contact te vinden is uit collectie.
                $validatedInvoices = $validatedInvoices->reject(function ($invoice) {
                    return (empty($invoice->order->contact->iban));
                });
            }

            if ($validatedInvoices->count() > 0) {

                // Eerst hele zet in progress of is resending zetten
                foreach ($validatedInvoices as $invoice) {
                    $orderController = new OrderController;
                    $emailTo = $orderController->getContactInfoForOrder($invoice->order->contact)['email'];

                    if ($emailTo === 'Geen e-mail bekend') {
                        abort(404, 'Geen e-mail bekend');
                    } else {
                        if($invoice->status_id === 'to-send') {
                            InvoiceHelper::invoiceInProgress($invoice);
                        }elseif($invoice->status_id === 'error-sending'){
                            InvoiceHelper::invoiceIsResending($invoice);
                        }else{
                            abort(404, "Nota met ID " . $invoice->id . " heeft geen status Te verzenden of Opnieuw te verzenden. Huidige status: " . $invoice->status_id);
                        }
                    }
                }
                SendAllInvoices::dispatch($validatedInvoices, Auth::id(), $request->input('dateCollection'), $administration, $paymentTypeId);

            }
        }

        return $response;
    }

    public function sendAllPost(Request $request)
    {
        set_time_limit(0);
        $this->authorize('manage', Invoice::class);

        $invoices = Invoice::whereIn('id', $request->input('ids'))->with(['order.contact', 'administration'])->get();

        // verwijder alle notas waar twinfield gebruikt wordt en geen ledgercode bekend is
        $validatedInvoices = $invoices->reject(function ($invoice) {
            return ($invoice->administration->uses_twinfield && $invoice->invoiceProducts()->whereNull('twinfield_ledger_code')->exists());
        });

        $response = [];

        if ($validatedInvoices->count() > 0) {
            // Eerst hele zet in progress zetten
            foreach ($validatedInvoices as $k => $invoice) {
                if($invoice->status_id === 'to-send') {
                    InvoiceHelper::invoiceInProgress($invoice);
                }else{
                    abort(404, "Nota met ID " . $invoice->id . " heeft geen status Te verzenden");
                }
            }

            $chunkNumber = 0;
            $itemsPerChunk = 50;
            $numberOfChunks = ceil($validatedInvoices->count() / $itemsPerChunk);
            foreach ($validatedInvoices->chunk($itemsPerChunk) as $validatedInvoicesSet) {
                $chunkNumber = $chunkNumber + 1;
                CreateAllInvoicesPost::dispatch($chunkNumber, $numberOfChunks, $validatedInvoicesSet, Auth::id());
            }
        }

        return $response;

        //todo: oude functionaliteit staat hieronder
        /*
            $orderController = new OrderController;

            foreach ($validatedInvoices as $k => $invoice) {

                $invoice->date_sent = Carbon::today();
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
                    $contactName = $prefix ? $invoice->order->contact->person->first_name . ' ' . $prefix . ' '
                        . $invoice->order->contact->person->last_name
                        : $invoice->order->contact->person->first_name . ' '
                        . $invoice->order->contact->person->last_name;
                } elseif ($invoice->order->contact->type_id == 'organisation') {
                    $contactName = $invoice->order->contact->full_name;
                }

                if ($emailTo === 'Geen e-mail bekend') {
                    $createdOk = InvoiceHelper::createInvoiceDocument($invoice);
                    if ($createdOk) {
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
                            $img = '<img src="' . $src . '" style="width:auto; height:156px;" alt="logo"/>';
                        }

                        if ($k !== 0) {
                            $html .= '<div class="page-break"></div>';
                        }
                        $html .= view('invoices.generic')->with([
                            'invoice' => $invoice,
                            'contactPerson' => $contactPerson,
                            'contactName' => $contactName
                        ])
                            ->with('logo', $img)->render();
                    }
                }
            }
        }

        $name = 'Post-notas-' . Carbon::now()->format("Y-m-d-H-i-s") . '.pdf';

        libxml_use_internal_errors(true);
        $pdfOutput = PDF::loadHTML($html);
        libxml_use_internal_errors(false);

        header('X-Filename:' . $name);
        header('Access-Control-Expose-Headers: X-Filename');

        return $pdfOutput->output();
        */
    }

    public function download(Invoice $invoice)
    {
        $this->authorize('manage', Invoice::class);

        if ($invoice->document) {
            $filePath = Storage::disk('administrations')
                ->path($invoice->document->filename);
            header('Access-Control-Expose-Headers: X-Filename');
            header('X-Filename:' . $invoice->document->name);
        } else {
            $invoiceNumberPrefix =  $invoice->administration->prefix_invoice_number ? $invoice->administration->prefix_invoice_number : 'F';
            $invoiceNumber = $invoiceNumberPrefix . Carbon::now()->year . '-preview-' . $invoice->id;
            header('X-Filename:' . $invoiceNumber . '.pdf');
            header('Access-Control-Expose-Headers: X-Filename');
            return InvoiceHelper::createInvoiceDocument($invoice, true);
        }

        return response()->download($filePath, $invoice->document->name);
    }

    public function getEmailPreview(Invoice $invoice)
    {
        $this->authorize('manage', Invoice::class);

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
        $this->authorize('manage', Invoice::class);

        $invoices = Invoice::whereIn('id', $request->input('ids'))->with(['order.contact', 'administration'])->get();

        // verwijder alle notas waar twinfield gebruikt wordt en geen ledgercode bekend is
        $validatedInvoices = $invoices->reject(function ($invoice) {
            return ($invoice->administration->uses_twinfield && $invoice->invoiceProducts()->whereNull('twinfield_ledger_code')->exists());
        });

        $response = [];

        if ($validatedInvoices->count() > 0) {
            $administration = $validatedInvoices->first()->administration;
            $paymentTypeId = $validatedInvoices->first()->payment_type_id;


            if ($paymentTypeId === 'collection') {

                if (!$administration->bic || !$administration->IBAN) {
                    abort(412, 'BIC en IBAN zijn verplichte velden.');
                }

                if ($paymentTypeId === 'collection') {
                    if (empty($administration->sepa_creditor_id)) {
                        abort(412, "Voor incasso nota's is SEPA crediteur id verplicht.");
                    }
                    // verwijder alle notas waar geen IBAN bij order en geen IBAN bij contact te vinden is uit collectie.
                    $validatedInvoices = $validatedInvoices->reject(function ($invoice) {
                        return (empty($invoice->order->contact->iban));
                    });
                    //            } else {
                    //                $validatedInvoices = $validatedInvoices;
                }

                if ($validatedInvoices->count() > 0) {
                    $sepaHelper = new SepaHelper($administration, $validatedInvoices);

                    $sepa = $sepaHelper->generateSepaFile();

                    return $sepaHelper->downloadSepa($sepa);
                }

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
            ->double('amount')->validate('required')->next()
            ->numeric('amountReduction')->onEmpty(null)->whenMissing(null)->alias('amount_reduction')->next()
            ->numeric('percentageReduction')->onEmpty(null)->whenMissing(null)->alias('percentage_reduction')->next()
            ->date('dateLastInvoice')->validate('required')->alias('date_last_invoice')->next()
            ->get();

        $invoiceProduct = new InvoiceProduct($data);

        $product = Product::find($data['product_id']);
        $invoice = Invoice::find($data['invoice_id']);

        $price = 0;
        $priceNumberOfDecimals = 2;
        if ($product->currentPrice) {
            $priceNumberOfDecimals = $product->currentPrice->price_number_of_decimals;
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

        $invoiceProduct->price_number_of_decimals = $priceNumberOfDecimals;
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
        $priceHistory->input_incl_vat = $productData['inputInclVat'];
        $priceHistory->price_number_of_decimals = $productData['priceNumberOfDecimals'];
        $priceHistory->price = $productData['price'];
        $priceHistory->price_incl_vat = $productData['priceInclVat'];
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

            $priceNumberOfDecimals = 2;
            $price = 0;
            if ($product->currentPrice) {
                $priceNumberOfDecimals = $product->currentPrice->price_number_of_decimals;
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
            $invoiceProduct->price_number_of_decimals = $priceNumberOfDecimals;
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
            ->double('amount')->validate('required')->next()
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