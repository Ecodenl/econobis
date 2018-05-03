<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Order;

use App\Eco\Order\Order;
use App\Helpers\Delete\DeleteHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Order\Grid\RequestQuery;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Order\OrderPeek;
use App\Http\Resources\Order\FullOrder;
use App\Http\Resources\Order\GridOrder;
use App\OrderProduct;

class OrderController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $orders = $requestQuery->get();

        $orders->load(['contact', 'orderProducts.product']);

        return GridOrder::collection($orders)
            ->additional(['meta' => [
            'total' => $requestQuery->total(),
            ]
        ]);
    }

    public function show(Order $order)
    {
        $order->load([
            'orderProducts.product',
            'contact',
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
            ->integer('contactId')->validate('required|exists:contacts.id')->alias('contact_id')->next()
            ->string('statusId')->validate('required')->alias('status_id')->next()
            ->string('subject')->validate('required')->next()
            ->integer('emailTemplateId')->validate('nullable|exists:email_templates,id')->alias('email_template_id')->next()
            ->integer('emailTemplateId')->validate('nullable|exists:email_templates,id')->alias('email_template_id')->next()
            ->integer('emailTemplateExhortationId')->validate('nullable|exists:email_templates,id')->alias('email_template_exhortation_id')->next()
            ->string('paymentTypeId')->validate('required')->alias('payment_type_id')->next()
            ->string('IBAN')->onEmpty(null)->whenMissing(null)->next()
            ->string('ibanAttn')->onEmpty(null)->whenMissing(null)->alias('iban_attn')->next()
            ->string('poNumber')->onEmpty(null)->whenMissing(null)->alias('po_number')->next()
            ->string('invoiceText')->onEmpty(null)->whenMissing(null)->alias('invoice_text')->next()
            ->string('dateRequested')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_requested')->next()
            ->string('dateStart')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_start')->next()
            ->string('dateEnd')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_end')->next()
            ->get();

        $order = new Order($data);

        $order->save();

        return $this->show($order);
    }


    public function update(RequestInput $input, Order $order)
    {
        $this->authorize('manage', Order::class);

        $data = $input
            ->integer('contactId')->validate('required|exists:contacts.id')->alias('contact_id')->next()
            ->string('statusId')->validate('required')->alias('status_id')->next()
            ->string('subject')->validate('required')->next()
            ->integer('emailTemplateId')->validate('nullable|exists:email_templates,id')->alias('email_template_id')->next()
            ->integer('emailTemplateId')->validate('nullable|exists:email_templates,id')->alias('email_template_id')->next()
            ->integer('emailTemplateExhortationId')->validate('nullable|exists:email_templates,id')->alias('email_template_exhortation_id')->next()
            ->string('paymentTypeId')->validate('required')->alias('payment_type_id')->next()
            ->string('IBAN')->onEmpty(null)->whenMissing(null)->next()
            ->string('ibanAttn')->onEmpty(null)->whenMissing(null)->alias('iban_attn')->next()
            ->string('poNumber')->onEmpty(null)->whenMissing(null)->alias('po_number')->next()
            ->string('invoiceText')->onEmpty(null)->whenMissing(null)->alias('invoice_text')->next()
            ->string('dateRequested')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_requested')->next()
            ->string('dateStart')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_start')->next()
            ->string('dateEnd')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_end')->next()
            ->get();

        $order = $order->fill($data);

        $order->save();

        return $this->show($order);
    }

    public function destroy(Order $order)
    {
        $this->authorize('manage', Order::class);

        DeleteHelper::delete($order);
    }

    public function storeOrderProduct(RequestInput $input)
    {
        $this->authorize('manage', Order::class);

        $data = $input
            ->string('productId')->validate('required|exists:products,id')->alias('product_id')->next()
            ->string('orderId')->validate('required|exists:orders,id')->alias('order_id')->next()
            ->integer('amount')->validate('required')->next()
            ->integer('amountReduction')->onEmpty(null)->whenMissing(null)->alias('amount_reduction')->next()
            ->integer('percentageReduction')->onEmpty(null)->whenMissing(null)->alias('percentage_reduction')->next()
            ->date('dateStart')->alias('date_start')->next()
            ->date('dateEnd')->alias('date_end')->next()
            ->get();

        $orderProduct = new OrderProduct($data);

        $orderProduct->save();

        return GenericResource::make($orderProduct);
    }

    public function updateOrderProduct(RequestInput $input)
    {
        $this->authorize('manage', Order::class);

        $data = $input
            ->string('productId')->validate('required|exists:products,id')->alias('product_id')->next()
            ->string('orderId')->validate('required|exists:orders,id')->alias('order_id')->next()
            ->integer('amount')->validate('required')->next()
            ->integer('amountReduction')->onEmpty(null)->whenMissing(null)->alias('amount_reduction')->next()
            ->integer('percentageReduction')->onEmpty(null)->whenMissing(null)->alias('percentage_reduction')->next()
            ->date('dateStart')->alias('date_start')->next()
            ->date('dateEnd')->alias('date_end')->next()
            ->get();

        $orderProduct = OrderProduct::where('product_id', $data['product_id'])->where('order_id', $data['order_id'])->get();

        $orderProduct->fill($data);

        $orderProduct->save();

        return GenericResource::make($orderProduct);
    }

    public function peek()
    {
        return OrderPeek::collection(Order::whereNull('deleted_at')->get());
    }
}