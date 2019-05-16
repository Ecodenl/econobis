<?php

use App\Eco\Invoice\Invoice;
use Illuminate\Database\Migrations\Migration;

class ConversionInvoiceNumberInvoicesToSend extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $invoices = Invoice::withTrashed()->where('status_id', 'like', 'to-send')->get();
        foreach ($invoices as $invoice){
            $invoice->invoice_number = 0;
            $invoice->number = substr($invoice->number, 0, 6) . "new";
            $invoice->save();
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
