<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemovePaymentInvoiceConcepts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       $paymentInvoicesConcept = \App\Eco\PaymentInvoice\PaymentInvoice::where('status_id', 'concept')->get();

        foreach ($paymentInvoicesConcept as $item) {
            $item->status_id = 'sent';
            $item->save();
       }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
