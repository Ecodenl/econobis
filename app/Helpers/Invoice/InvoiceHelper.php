<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Invoice;

use App\Eco\Invoice\Invoice;
use App\Eco\Invoice\InvoiceDocument;
use App\Eco\Invoice\InvoicePayment;
use App\Eco\Invoice\InvoiceProduct;
use App\Eco\Order\Order;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

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
            $invoice->status_id = 'sent';
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

    public static function send(Invoice $invoice){
        if($invoice->send_method_id === 'mail') {
            //todo
        }

        $invoice->status_id = 'sent';
        $invoice->date_sent = Carbon::today();;
        $invoice->save();

        return $invoice;
    }

    public static function sendNotification(Invoice $invoice){
        //todo

        if($invoice->date_reminder_3){
            $invoice->date_exhortation = Carbon::today();
        }
        elseif($invoice->date_reminder_2){
            $invoice->date_reminder_3 = Carbon::today();
        }
        elseif($invoice->date_reminder_1){
            $invoice->date_reminder_2 = Carbon::today();
        }
        else{
            $invoice->date_reminder_1 = Carbon::today();
        }

        $invoice->save();

        return $invoice;
    }

    public static function createInvoiceDocument(Invoice $invoice){

        $path = storage_path('app' .  DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR . $invoice->administration->logo_filename);
        $logo = file_get_contents($path);

        $src = 'data:' . mime_content_type($path) . ';charset=binary;base64,'.base64_encode($logo);
        $src = str_replace(" ","",$src);
        $img = '<img src="'.$src.'" width="200px" height="200px"/>';

        InvoiceHelper::checkStorageDir($invoice->administration->id);

        $pdf = PDF::loadView('invoices.generic', [
            'invoice' => $invoice,
            'logo' => $img,
        ]);

        $name = $invoice->number . '.pdf';

        $filePath = (storage_path('app' .  DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR . 'administration_' . $invoice->administration->id
            . DIRECTORY_SEPARATOR . 'invoices'));

        $pdf->download();

        $filename = $pdf->save($filePath);

        $invoiceDocument = new InvoiceDocument();
        $invoiceDocument->invoice_id = $invoice->id;
        $invoiceDocument->filename = $filename;
        $invoiceDocument->name = $name;
        $invoiceDocument->save();

    }

    public static function checkStorageDir($administration_id){
        //Check if storage map exists
        $storageDir = Storage::disk('administrations')->getDriver()->getAdapter()->getPathPrefix() . DIRECTORY_SEPARATOR . 'administration_' . $administration_id . DIRECTORY_SEPARATOR . 'invoices';

        if (!is_dir($storageDir)) {
            mkdir($storageDir, 0777, true);
        }
    }


}