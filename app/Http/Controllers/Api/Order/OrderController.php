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
use App\Http\Resources\Order\FullOrder;
use App\Http\Resources\Order\FullOrderProduct;
use App\Http\Resources\Order\GridOrder;
use App\Http\Resources\Order\OrderPeek;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {

        $orders = $requestQuery->get();

        $orders->load(['contact']);

        return GridOrder::collection($orders)
            ->additional(['meta' => [
            'total' => $requestQuery->total(),
            ]
        ]);
    }

    public function csv(RequestQuery $requestQuery)
    {
        set_time_limit(0);
        $orders = $requestQuery->getQueryNoPagination()->get();

        $orderCSVHelper = new OrderCSVHelper($orders);

        $csv = $orderCSVHelper->downloadCSV();

        return $csv;
    }

    public function show(Order $order)
    {
        $order->load([
            'administration.products',
            'orderProducts.product',
            'contact',
            'tasks',
            'documents',
            'emails',
            'invoices',
            'invoicesPaidCollection',
            'invoicesPaidTransfer',
            'createdBy',
            'emailTemplate',
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
            ->integer('emailTemplateId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id')->next()
            ->integer('emailTemplateReminderId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_reminder_id')->next()
            ->integer('emailTemplateExhortationId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_exhortation_id')->next()
            ->string('collectionFrequencyId')->onEmpty(null)->whenMissing(null)->alias('collection_frequency_id')->next()
            ->string('collectionFrequencyId')->alias('collection_frequency_id')->next()
            ->string('paymentTypeId')->validate('required')->alias('payment_type_id')->next()
            ->string('IBAN')->onEmpty(null)->whenMissing(null)->next()
            ->string('ibanAttn')->onEmpty(null)->whenMissing(null)->alias('iban_attn')->next()
            ->string('poNumber')->onEmpty(null)->whenMissing(null)->alias('po_number')->next()
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
            ->integer('emailTemplateId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id')->next()
            ->integer('emailTemplateReminderId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_reminder_id')->next()
            ->integer('emailTemplateExhortationId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_exhortation_id')->next()
            ->string('collectionFrequencyId')->onEmpty(null)->whenMissing(null)->alias('collection_frequency_id')->next()
            ->string('paymentTypeId')->validate('required')->alias('payment_type_id')->next()
            ->string('IBAN')->onEmpty(null)->whenMissing(null)->next()
            ->string('ibanAttn')->onEmpty(null)->whenMissing(null)->alias('iban_attn')->next()
            ->string('poNumber')->onEmpty(null)->whenMissing(null)->alias('po_number')->next()
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
            ->integer('amount')->validate('required')->next()
            ->numeric('amountReduction')->onEmpty(null)->whenMissing(null)->alias('amount_reduction')->next()
            ->numeric('percentageReduction')->onEmpty(null)->whenMissing(null)->alias('percentage_reduction')->next()
            ->date('dateStart')->validate('required')->alias('date_start')->next()
            ->date('dateEnd')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_end')->next()
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
        $product->is_one_time = true;
        $product->name = $productData['name'];
        $product->code = $productData['code'];
        $product->duration_id = $productData['durationId'];
        $product->invoice_frequency_id = $productData['invoiceFrequencyId'];
        $product->administration_id = $productData['administrationId'];
        $product->invoice_text = $productData['description'];

        $priceHistory = new PriceHistory();
        $priceHistory->date_start = Carbon::today();
        $priceHistory->price = $productData['price'];
        $priceHistory->vat_percentage = $productData['vatPercentage'] ? $productData['vatPercentage'] : null;

        $orderProductData = $request->input('orderProduct');

        $orderProduct = new OrderProduct();
        $orderProduct->order_id = $orderProductData['orderId'];
        $orderProduct->amount = $orderProductData['amount'];
        $orderProduct->amount_reduction = $orderProductData['amountReduction'] ? $orderProductData['amountReduction'] : 0;
        $orderProduct->percentage_reduction = $orderProductData['percentageReduction'] ? $orderProductData['percentageReduction'] : 0;
        $orderProduct->date_start = $orderProductData['dateStart'];
        $orderProduct->date_end = $orderProductData['dateEnd'] ? $orderProductData['dateEnd'] : null;

        DB::transaction(function () use ($product, $priceHistory, $orderProduct) {
            $product->save();

            $priceHistory->product_id = $product->id;
            $priceHistory->save();

            $orderProduct->product_id = $product->id;
            $orderProduct->save();
        });
    }

    public function updateOrderProduct(RequestInput $input, OrderProduct $orderProduct)
    {
        $this->authorize('manage', Order::class);

        $data = $input
            ->string('productId')->validate('required|exists:products,id')->alias('product_id')->next()
            ->string('orderId')->validate('required|exists:orders,id')->alias('order_id')->next()
            ->integer('amount')->validate('required')->next()
            ->numeric('amountReduction')->onEmpty(null)->whenMissing(null)->alias('amount_reduction')->next()
            ->numeric('percentageReduction')->onEmpty(null)->whenMissing(null)->alias('percentage_reduction')->next()
            ->date('dateStart')->validate('required')->alias('date_start')->next()
            ->date('dateEnd')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_end')->next()
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


    public function peek()
    {
        return OrderPeek::collection(Order::all());
    }

    public function getContactInfoForOrder(Contact $contact)
    {
        //Get email/name based on priority:
        //1 - organisation - administration email
        //2 - contact person invoice + primary
        //2 - contact person invoice
        //2 - contact person administration + primary
        //3 - contact person administration
        //4 - contact person primary
        //5 - contact person other
        $contactInfo = [
            'email' => 'Geen e-mail bekend',
            'contactPerson' => $contact->full_name,
            'iban' => $contact->iban,
            'ibanAttn' => $contact->iban_attn
        ];

        if($contact->isOrganisation()){
            $email = $this->getOrganisationAdministrationEmailAddress($contact);

            if (!$email && $contact->contactPerson()->exists())
            {
                $contactInfo['email'] = $contact->contactPerson->contact->getOrderEmail() ? $contact->contactPerson->contact->getOrderEmail()->email : 'Geen e-mail bekend';
                $contactInfo['contactPerson'] = $contact->contactPerson->contact->full_name;
                $contactInfo['iban'] = $contact->contactPerson->contact->iban;
                $contactInfo['ibanAttn'] = $contact->contactPerson->contact->iban_attn;
            }
            else{
                $contactInfo['email'] = $email ? $email->email : 'Geen e-mail bekend';
            }
        }
        else{
            $contactInfo['email'] = $contact->getOrderEmail() ? $contact->getOrderEmail()->email : 'Geen e-mail bekend';
        }

        return $contactInfo;
    }

    protected function getOrganisationAdministrationEmailAddress(Contact $contact){
        $emailAddresses = $contact->emailAddresses->reverse();

        foreach($emailAddresses as $emailAddress) {
            if ($emailAddress->type_id === 'administration' && $emailAddress->primary) {
                return $emailAddress;
            }
        }

        foreach($emailAddresses as $emailAddress) {
            if ($emailAddress->type_id === 'administration') {
                return $emailAddress;
            }
        }

        return null;
    }

    public function downloadPreview(Order $order){
        $invoice = new Invoice();
        $invoice->order_id = $order->id;
        $invoice->administration_id = $order->administration_id;
        $invoice->invoice_number =  Invoice::where('administration_id', $invoice->administration_id)->count();
        $invoice->number = 'O' . Carbon::now()->year . '-' . $invoice->invoice_number;
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

    public function getOrdersForCreating(RequestInput $requestInput)
    {
        $this->authorize('manage', Order::class);

        $data = $requestInput
            ->string('administrationId')->validate('required|exists:administrations,id')->alias('administration_id')->next()
            ->get();

        $orders = Order::where('administration_id', $data['administration_id'])
            ->where('orders.status_id', 'active')
            ->where('orders.date_next_invoice', '<=', Carbon::today()->addDays(14))
            ->whereDoesntHave('invoices', function ($q) {
                $q->where('invoices.status_id', 'to-send');
            })->with(['contact'])->get();

        return FullOrder::collection($orders);
    }

    public function createAll(RequestInput $requestInput)
    {
        set_time_limit(30);
        $this->authorize('manage', Order::class);

        $data = $requestInput
            ->string('administrationId')->validate('required|exists:administrations,id')->alias('administration_id')->next()
            ->date('dateRequested')->validate('nullable|date')
            ->alias('date_requested')->next()
            ->get();


        $orders = Order::where('administration_id', $data['administration_id'])
            ->where('orders.status_id', 'active')
            ->where('orders.date_next_invoice', '<=', Carbon::today()->addDays(14))
            ->whereDoesntHave('invoices', function ($q) {
                $q->where('invoices.status_id', 'to-send');
            })->get();

        foreach ($orders as $order){
            if($order->total_price_incl_vat > 0 && $order->can_create_invoice) {
                $invoice = new Invoice();
                $invoice->status_id = 'to-send';
                $invoice->date_requested = $data['date_requested'];
                $invoice->order_id = $order->id;
                $invoice->collection_frequency_id = $order->collection_frequency_id;
                $invoice->save();

                InvoiceHelper::saveInvoiceProducts($invoice, $order);
            }
        }
    }

    public function getEmailPreview(Order $order){

        $invoice = new Invoice();
        $invoice->order_id = $order->id;
        $invoice->administration_id = $order->administration_id;
        $invoice->invoice_number =  Invoice::where('administration_id', $invoice->administration_id)->count();
        $invoice->number = 'O' . Carbon::now()->year . '-' . $invoice->invoice_number;
        $invoice->payment_type_id = $order->payment_type_id;
        $invoice->collection_frequency_id = $order->collection_frequency_id;

        $invoice = InvoiceHelper::saveInvoiceProducts($invoice, $order, true);

        return InvoiceHelper::send($invoice, true);

    }

}