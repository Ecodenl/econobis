<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Order;

use App\Eco\Contact\Contact;
use App\Eco\Invoice\Invoice;
use App\Eco\Order\Order;
use App\Eco\Order\OrderProduct;
use App\Eco\Product\PriceHistory;
use App\Eco\Product\Product;
use App\Helpers\CSV\OrderCSVHelper;
use App\Helpers\Delete\Models\DeleteOrder;
use App\Helpers\Invoice\InvoiceHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Order\Grid\RequestQuery;
use App\Http\Resources\Order\CreateInvoice;
use App\Http\Resources\Order\FullOrder;
use App\Http\Resources\Order\FullOrderProduct;
use App\Http\Resources\Order\GridOrder;
use App\Http\Resources\Order\OrderPeek;
use App\Jobs\Order\CreateAllInvoices;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends ApiController
{

    public function grid(RequestQuery $requestQuery,Request $request)
    {
        $this->authorize('view', Order::class);

        $orders = $requestQuery->get();

        $onlyOrdersWithOrderProducts = $request['showOnlyOrdersWithOrderProducts'] == 'true';

        $orders->load(['contact', 'orderProducts']);

        $selectedOrders = Order::whereIn('id', $requestQuery->totalIds())->get();
        $selectedOrders->load(['contact', 'orderProducts']);

        if($onlyOrdersWithOrderProducts) {
            $orders = $orders->reject(function ($order) {
                return ($order->orderProducts->isEmpty() ? true : false);
            });
            $selectedOrders = $selectedOrders->reject(function ($order) {
                return ($order->orderProducts->isEmpty() ? true : false);
            });
        }

        $orderIdsTotal = $selectedOrders->pluck("id");

        return GridOrder::collection($orders)
            ->additional(['meta' => [
                'total' => $requestQuery->total(),
                'orderIdsTotal' => $orderIdsTotal,
            ]
        ]);
    }

    public function csv(RequestQuery $requestQuery)
    {
        $this->authorize('view', Order::class);

        set_time_limit(0);
        $orders = $requestQuery->getQueryNoPagination()->get();

        $orderCSVHelper = new OrderCSVHelper($orders);

        $csv = $orderCSVHelper->downloadCSV();

        return $csv;
    }

    public function csvWithProducts(RequestQuery $requestQuery)
    {
        $this->authorize('view', Order::class);

        set_time_limit(0);
        $orders = $requestQuery->getQueryNoPagination()->get();

        $orderCSVHelper = new OrderCSVHelper($orders);

        $csv = $orderCSVHelper->downloadCSVWithProducts();

        return $csv;
    }

    public function show(Order $order)
    {
        $this->authorize('view', Order::class);

        $order->load([
            'administration.products',
            'orderProducts.product',
            'orderProducts',
            'contact',
            'tasks',
            'documents',
            'emails',
            'invoices',
            'invoicesPaidCollection',
            'invoicesPaidTransfer',
            'createdBy',
            'emailTemplateCollection',
            'emailTemplateTransfer',
            'emailTemplateReminder',
            'emailTemplateExhortation',
        ]);

        return FullOrder::make($order);
    }

    public function store(RequestInput $input)
    {
        $this->authorize('manage', Order::class);

        $data = $input
            ->integer('contactId')->validate('required|exists:contacts,id')->alias('contact_id')->next()
            ->integer('administrationId')->validate('required|exists:administrations,id')->alias('administration_id')->next()
            ->string('statusId')->validate('required')->alias('status_id')->next()
            ->string('subject')->validate('required')->next()
            ->string('participationId')->onEmpty(null)->whenMissing(null)->alias('participation_id')->next()
            ->integer('emailTemplateIdCollection')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_collection')->next()
            ->integer('emailTemplateIdTransfer')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_transfer')->next()
            ->integer('emailTemplateReminderId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_reminder_id')->next()
            ->integer('emailTemplateExhortationId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_exhortation_id')->next()
            ->string('collectionFrequencyId')->onEmpty(null)->whenMissing(null)->alias('collection_frequency_id')->next()
            ->string('collectionFrequencyId')->alias('collection_frequency_id')->next()
            ->string('paymentTypeId')->validate('required')->alias('payment_type_id')->next()
            ->string('IBAN')->onEmpty(null)->whenMissing(null)->next()
            ->string('ibanAttn')->onEmpty(null)->whenMissing(null)->alias('iban_attn')->next()
            ->string('numberOfInvoiceReminders')->onEmpty(null)->whenMissing(null)->alias('number_of_invoice_reminders')->next()
            ->string('poNumber')->onEmpty(null)->whenMissing(null)->alias('po_number')->next()
            ->string('projectNumber')->onEmpty(null)->whenMissing(null)->alias('project_number')->next()
            ->string('invoiceText')->onEmpty(null)->whenMissing(null)->alias('invoice_text')->next()
            ->date('dateRequested')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_requested')->next()
            ->date('dateNextInvoice')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_next_invoice')->next()
            ->get();

        $order = new Order($data);

        $order->save();

        return $this->show($order);
    }


    public function update(RequestInput $input, Order $order)
    {
        $this->authorize('manage', Order::class);

        $data = $input
            ->integer('administrationId')->validate('required|exists:administrations,id')->alias('administration_id')->next()
            ->string('statusId')->validate('required')->alias('status_id')->next()
            ->string('subject')->validate('required')->next()
            ->string('participationId')->onEmpty(null)->whenMissing(null)->alias('participation_id')->next()
            ->integer('emailTemplateIdCollection')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_collection')->next()
            ->integer('emailTemplateIdTransfer')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_transfer')->next()
            ->integer('emailTemplateReminderId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_reminder_id')->next()
            ->integer('emailTemplateExhortationId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_exhortation_id')->next()
            ->string('collectionFrequencyId')->onEmpty(null)->whenMissing(null)->alias('collection_frequency_id')->next()
            ->string('paymentTypeId')->validate('required')->alias('payment_type_id')->next()
            ->string('IBAN')->onEmpty(null)->whenMissing(null)->next()
            ->string('ibanAttn')->onEmpty(null)->whenMissing(null)->alias('iban_attn')->next()
            ->string('numberOfInvoiceReminders')->onEmpty(null)->whenMissing(null)->alias('number_of_invoice_reminders')->next()
            ->string('poNumber')->onEmpty(null)->whenMissing(null)->alias('po_number')->next()
            ->string('projectNumber')->onEmpty(null)->whenMissing(null)->alias('project_number')->next()
            ->string('invoiceText')->onEmpty(null)->whenMissing(null)->alias('invoice_text')->next()
            ->date('dateRequested')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_requested')->next()
            ->date('dateNextInvoice')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_next_invoice')->next()
            ->get();

        $order = $order->fill($data);

        $order->save();

        //Validation sets string to date object. If we do ->fresh() we get the strings again(easier for front-end).
        return $this->show($order->fresh());
    }

    public function destroy(Order $order)
    {
        $this->authorize('manage', Order::class);

        try {
            DB::beginTransaction();

            $deleteOrder = new DeleteOrder($order);
            $result = $deleteOrder->delete();

            if(count($result) > 0){
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

    public function storeOrderProduct(RequestInput $input)
    {
        $this->authorize('manage', Order::class);

        $data = $input
            ->string('productId')->validate('required|exists:products,id')->alias('product_id')->next()
            ->string('orderId')->validate('required|exists:orders,id')->alias('order_id')->next()
            ->integer('costCenterId')->onEmpty(null)->whenMissing(null)->alias('cost_center_id')->next()
            ->double('amount')->validate('required')->next()
            ->numeric('amountReduction')->onEmpty(null)->whenMissing(null)->alias('amount_reduction')->next()
            ->numeric('percentageReduction')->onEmpty(null)->whenMissing(null)->alias('percentage_reduction')->next()
            ->date('dateStart')->validate('required')->alias('date_start')->next()
            ->date('dateEnd')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_end')->next()
            ->date('datePeriodStartFirstInvoice')->alias('date_period_start_first_invoice')->next()
            ->numeric('variablePrice')->alias('variable_price')->next()
            ->get();

        $orderProduct = new OrderProduct($data);

        $orderProduct->save();

        return FullOrderProduct::make($orderProduct);
    }

    public function storeProductAndOrderProduct(Request $request)
    {
        $this->authorize('manage', Order::class);

        $productData = $request->input('product');

        $product = new Product();
        $product->is_one_time = $productData['isOneTime'];
        $product->name = $productData['name'];
        $product->code = $productData['code'];
        $product->duration_id = $productData['durationId'];
        $product->invoice_frequency_id = $productData['invoiceFrequencyId'];
        $product->administration_id = $productData['administrationId'];
        $product->invoice_text = $productData['description'];
        $product->ledger_id = $productData['ledgerId'];
        $product->ledger_id ?: $product->ledger_id = null;
        $product->cost_center_id = $productData['costCenterId'];
        $product->cost_center_id ?: $product->cost_center_id = null;

        $priceHistory = new PriceHistory();
        $priceHistory->date_start = Carbon::today();
        $priceHistory->input_incl_vat = $productData['inputInclVat'];
        $priceHistory->price_number_of_decimals = $productData['priceNumberOfDecimals'];
        $priceHistory->price = $productData['price'];
        $priceHistory->price_incl_vat = $productData['priceInclVat'];
        $priceHistory->vat_percentage = $productData['vatPercentage'] ? $productData['vatPercentage'] : null;

        $orderProductData = $request->input('orderProduct');

        $orderProduct = new OrderProduct();
        $orderProduct->order_id = $orderProductData['orderId'];
        $orderProduct->cost_center_id = $productData['costCenterId'] ? $productData['costCenterId'] : null;
        $orderProduct->amount = $orderProductData['amount'];
        $orderProduct->amount_reduction = $orderProductData['amountReduction'] ? $orderProductData['amountReduction'] : 0;
        $orderProduct->percentage_reduction = $orderProductData['percentageReduction'] ? $orderProductData['percentageReduction'] : 0;
        $orderProduct->date_start = $orderProductData['dateStart'];
        $orderProduct->date_end = $orderProductData['dateEnd'] ? $orderProductData['dateEnd'] : null;
        $orderProduct->date_period_start_first_invoice = $orderProductData['datePeriodStartFirstInvoice'];

        $order = Order::find($orderProductData['orderId']);

        $product->payment_type_id = $order->payment_type_id;

        DB::transaction(function () use ($product, $priceHistory, $orderProduct) {
            $product->save();

            $priceHistory->product_id = $product->id;
            $priceHistory->save();

            $orderProduct->product_id = $product->id;
            $orderProduct->save();
        });
    }

    public function updateOneTimeProduct(Request $request)
    {
        $this->authorize('manage', Order::class);

        $productData = $request->input('product');

        $product = Product::withoutGlobalScopes()->find($productData['id']);
        $product->invoice_text = $productData['description'];
        $product->ledger_id = $productData['ledgerId'];
        $product->ledger_id ?: $product->ledger_id = null;
        $product->cost_center_id = $productData['costCenterId'];
        $product->cost_center_id ?: $product->cost_center_id = null;

        $orderProductData = $request->input('orderProduct');

        $orderProduct = OrderProduct::find($orderProductData['id']);
        $orderProduct->cost_center_id = $productData['costCenterId'] ? $productData['costCenterId'] : null;
        $orderProduct->amount = $orderProductData['amount'];
        $orderProduct->amount_reduction = $orderProductData['amountReduction'] ? $orderProductData['amountReduction'] : 0;
        $orderProduct->percentage_reduction = $orderProductData['percentageReduction'] ? $orderProductData['percentageReduction'] : 0;

        DB::transaction(function () use ($product, $orderProduct) {
            $product->save();
            $orderProduct->save();
        });
    }

    public function updateOrderProduct(RequestInput $input, OrderProduct $orderProduct)
    {
        $this->authorize('manage', Order::class);

        $data = $input
            ->string('productId')->validate('required|exists:products,id')->alias('product_id')->next()
            ->string('orderId')->validate('required|exists:orders,id')->alias('order_id')->next()
            ->double('amount')->validate('required')->next()
            ->integer('costCenterId')->onEmpty(null)->whenMissing(null)->alias('cost_center_id')->next()
            ->numeric('amountReduction')->onEmpty(null)->whenMissing(null)->alias('amount_reduction')->next()
            ->numeric('percentageReduction')->onEmpty(null)->whenMissing(null)->alias('percentage_reduction')->next()
            ->date('dateStart')->validate('required')->alias('date_start')->next()
            ->date('dateEnd')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_end')->next()
            ->date('datePeriodStartFirstInvoice')->alias('date_period_start_first_invoice')->next()
            ->numeric('variablePrice')->alias('variable_price')->next()
            ->get();

        $orderProduct->fill($data);

        $orderProduct->save();

        return FullOrderProduct::make($orderProduct);
    }

    public function destroyOrderProduct(OrderProduct $orderProduct)
    {
        $this->authorize('manage', Order::class);

        $orderProduct->delete();
    }


    public function peek(Request $request)
    {
        $query = Order::query();

        if(!Auth::user()->hasPermissionTo('view_order', 'api')){
            return [];
        }

        if($request->has('contactIds')){
            $query->whereIn('contact_id', json_decode($request->input('contactIds')));
        }

        return OrderPeek::collection($query->get());
    }

    public function getContactInfoForOrder(Contact $contact)
    {
        //Get email/name based on priority:
        //1 - organisation - invoice(sort by created at)
        //2 - organisation - primary
        //3 - contact person - invoice(sort by created at)
        //4 - contact person - primary
        $participations = $contact->participations->map(function($participation){
            return [
                'id' => $participation->id,
                'project_name' => $participation->project->name
                ];
        });

        $contactInfo = [
            'email' => 'Geen e-mail bekend',
            'contactPerson' => null,
            'iban' => $contact->iban,
            'ibanAttn' => $contact->iban_attn,
            'collectMandate' => $contact->is_collect_mandate,
            'collectMandateFirstRun' => $contact->collect_mandate_first_run_date,
            'participations' => $participations,
        ];

        if($contact->isOrganisation()){
            $email = $this->getOrganisationEmailAddressForOrder($contact);

            if (!$email && $contact->contactPerson()->exists())
            {
                $contactInfo['email'] = $contact->contactPerson->contact->getOrderEmail() ? $contact->contactPerson->contact->getOrderEmail()->email : 'Geen e-mail bekend';
            }
            else{
                $contactInfo['email'] = $email ? $email->email : 'Geen e-mail bekend';
            }

            if($contact->contactPerson()->exists()){
                $contactPerson = '';
                if ($contact->contactPerson->contact->type_id == 'person') {
                    $initials = $contact->contactPerson->contact->person->initials;
                    $prefix = $contact->contactPerson->contact->person->last_name_prefix;
                    $contactInitialsOrFirstName = $initials ? $initials : $contact->contactPerson->contact->person->first_name;
                    $contactPerson = $prefix ? ($contactInitialsOrFirstName . ' ' . $prefix . ' ' . $contact->contactPerson->contact->person->last_name) : $contactInitialsOrFirstName . ' ' . $contact->contactPerson->contact->person->last_name;
                } elseif ($contact->contactPerson->contact->type_id == 'organisation') {
                    $contactPerson = $contact->contactPerson->contact->full_name;
                }

                $contactInfo['contactPerson'] = $contactPerson;
                $contactInfo['iban'] = $contact->contactPerson->contact->iban;
                $contactInfo['ibanAttn'] = $contact->contactPerson->contact->iban_attn;
            }
        }
        else{
            $contactInfo['email'] = $contact->getOrderEmail() ? $contact->getOrderEmail()->email : 'Geen e-mail bekend';
        }

        return $contactInfo;
    }

    protected function getOrganisationEmailAddressForOrder(Contact $contact){
        $emailAddresses = $contact->emailAddresses->reverse();

        foreach($emailAddresses as $emailAddress) {
            if ($emailAddress->type_id === 'invoice') {
                return $emailAddress;
            }
        }

        if($contact->primaryEmailAddress){
            return $contact->primaryEmailAddress;
        }

        return null;
    }

    public function downloadPreview(Order $order){
        $invoiceNumberPrefix =  $order->administration->prefix_invoice_number ? $order->administration->prefix_invoice_number : 'F';

        $invoice = new Invoice();
        $invoice->order_id = $order->id;
        $invoice->administration_id = $order->administration_id;
        $invoice->number = $invoiceNumberPrefix . Carbon::now()->year . '-new';
        $invoice->payment_type_id = $order->payment_type_id;
        $invoice->collection_frequency_id = $order->collection_frequency_id;
        $invoice = InvoiceHelper::saveInvoiceProducts($invoice, $order, true);

        return InvoiceHelper::createInvoiceDocument($invoice, true);
    }

    public function getAmountCollection(){

        $this->authorize('manage', Order::class);

        $user = Auth::user();

        $total = 0;

        foreach($user->administrations as $administration){
            $total +=  $administration->orders()->where('status_id', 'active')->where('payment_type_id', 'collection')->count();
        }

        return $total;
    }

    public function getOrdersForCreating(Request $request)
    {
        $this->authorize('manage', Order::class);

        $orders = Order::whereIn('id', $request->input('ids'))->with('contact')->get();

        foreach ($orders as $order){
            $orderController = new OrderController;
            $order->emailToAddress = $orderController->getContactInfoForOrder($order->contact)['email'];
        }

        return CreateInvoice::collection($orders);
    }

    public function createAll(Request $request)
    {
        set_time_limit(0);
        $this->authorize('manage', Order::class);

        $orderIds = $request->input('orderIds');

        $orders = Order::whereIn('id', $orderIds)->get();

        // Eerst hele zet in progress
        foreach ($orders as $order) {
            //Order moet status active hebben
            if($order->can_create_invoice) {
                // We zetten order voorlopig in progress zolang we bezig met maken van nota voor deze order.
                $order->status_id = 'in-progress';
                $order->save();
            }
        }

        CreateAllInvoices::dispatch($orders, Auth::id());
    }

    public function getEmailPreview(Order $order){

        $invoiceNumberPrefix =  $order->administration->prefix_invoice_number ? $order->administration->prefix_invoice_number : 'F';

        $invoice = new Invoice();
        $invoice->order_id = $order->id;
        $invoice->administration_id = $order->administration_id;
        $invoice->number = $invoiceNumberPrefix . Carbon::now()->year . '-new';
        $invoice->payment_type_id = $order->payment_type_id;
        $invoice->collection_frequency_id = $order->collection_frequency_id;

        $invoice = InvoiceHelper::saveInvoiceProducts($invoice, $order, true);

        InvoiceHelper::createInvoiceDocument($invoice, true);
        return InvoiceHelper::send($invoice, true);
    }

}