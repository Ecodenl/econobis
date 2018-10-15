<?php

use App\Eco\Invoice\Invoice;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class OrderChanges extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->date('date_next_invoice')->nullable();
            $table->dropColumn('date_start');
            $table->dropColumn('date_end');
        });

        Schema::table('order_product', function (Blueprint $table) {
            $table->date('date_last_invoice')->nullable();
        });

        Schema::table('invoice_product', function (Blueprint $table) {
            $table->date('date_last_invoice')->nullable();
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->string('collection_frequency_id')->nullable();
        });

        $invoicesConcept = Invoice::withTrashed()->where('status_id', 'concept')->get();

        foreach($invoicesConcept as $invoiceConcept){
            $invoiceConcept->status_id = 'checked';
            $invoiceConcept->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('date_next_invoice');
            $table->date('date_start')->nullable();
            $table->date('date_end')->nullable();
        });

        Schema::table('order_product', function (Blueprint $table) {
            $table->dropColumn('date_last_invoice');
        });

        Schema::table('invoice_product', function (Blueprint $table) {
            $table->dropColumn('date_last_invoice');
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn('collection_frequency_id');
        });
    }
}
