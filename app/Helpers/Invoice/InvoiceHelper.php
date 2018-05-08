<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Invoice;

use App\Eco\Invoice\Invoice;
use App\Eco\Invoice\InvoiceProduct;
use App\Eco\Order\Order;

class InvoiceHelper
{
    public static function getCollectionDate(Invoice $invoice){
        return '2019-05-05';
    }

    public static function saveInvoiceProducts(Invoice $invoice, Order $order){

        foreach ($order->orderProducts as $orderProduct){
            $invoiceProduct = new InvoiceProduct();
            $invoiceProduct->product_id = $orderProduct->product_id;
            $invoiceProduct->invoice_id = $invoice->id;
            $invoiceProduct->amount = $orderProduct->amount;
            $invoiceProduct->amount_reduction = $orderProduct->amount_reduction;
            $invoiceProduct->percentage_reduction = $orderProduct->percentage_reduction;
            $invoiceProduct->price = $orderProduct->product->currentPrice->price;
            $invoiceProduct->vat_percentage = $orderProduct->product->currentPrice->vat_percentage;
            $invoiceProduct->save();
        }

    }

}