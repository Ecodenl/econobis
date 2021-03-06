<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoiceMolliePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_mollie_payments', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('code');

            $table->unsignedInteger('invoice_id');
            $table->foreign('invoice_id')->references('id')->on('invoices');

            $table->string('mollie_id')->nullable();
            $table->string('checkout_url')->nullable();
            $table->dateTime('date_activated')->nullable();
            $table->dateTime('date_paid')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoice_mollie_payments');
    }
}
