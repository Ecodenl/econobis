<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Invoice;

use App\Eco\Invoice\Invoice;
use App\Eco\Invoice\InvoicePayment;
use App\Eco\Invoice\InvoiceProduct;
use App\Eco\Order\Order;

class InvoiceHelper
{
    public static function saveInvoiceProducts(Invoice $invoice, Order $order){

        foreach ($order->activeOrderProducts as $orderProduct){
            $invoiceProduct = new InvoiceProduct();
            $invoiceProduct->product_id = $orderProduct->product_id;
            $invoiceProduct->invoice_id = $invoice->id;
            $invoiceProduct->amount = $orderProduct->amount;
            $invoiceProduct->amount_reduction = $orderProduct->amount_reduction;
            $invoiceProduct->percentage_reduction = $orderProduct->percentage_reduction;
            $invoiceProduct->price = $orderProduct->product->currentPrice->price;
            $invoiceProduct->vat_percentage = $orderProduct->product->currentPrice->vat_percentage;
            $invoiceProduct->product_code = $orderProduct->product->code;
            $invoiceProduct->product_name = $orderProduct->product->name;
            $invoiceProduct->description = $orderProduct->description;
            $invoiceProduct->save();
        }

    }

    public static function saveInvoiceStatus(Invoice $invoice){
        if($invoice->amount_open <= 0){
            $invoice->status_id = 'paid';
        }
        else{
            $invoice->status_id = 'exported';
        }

        $invoice->save();
    }

    public static function saveInvoiceDatePaid(Invoice $invoice, $datePaid){
        if($invoice->amount_open <= 0){
            return false;
        }

        $invoicePayment = new InvoicePayment();
        $invoicePayment->date_paid = $datePaid;
        $invoicePayment->amount = $invoice->amount_open;
        $invoicePayment->invoice_id = $invoice->id;
        $invoicePayment->save();

        $invoice->status_id = 'paid';
        $invoice->save();

        return $invoice;
    }
}