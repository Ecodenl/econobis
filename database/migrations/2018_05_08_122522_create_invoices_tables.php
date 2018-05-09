<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvoicesTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('invoice_number');
            $table->string('number');

            $table->unsignedInteger('order_id');
            $table->foreign('order_id')
                ->references('id')->on('orders')
                ->onDelete('restrict');

            $table->unsignedInteger('administration_id');
            $table->foreign('administration_id')
                ->references('id')->on('administrations')
                ->onDelete('restrict');

            $table->string('payment_type_id');
            $table->string('status_id');
            $table->string('mollie_status_id')->default('not_used');
            $table->string('send_method_id');

            $table->date('date_sent')->nullable();
            $table->date('date_collection')->nullable();
            $table->date('date_reminder_1')->nullable();
            $table->date('date_reminder_2')->nullable();
            $table->date('date_reminder_3')->nullable();
            $table->date('date_exhortation')->nullable();
            $table->date('date_requested')->nullable();

            $table->unsignedInteger('created_by_id');
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');

            $table->softdeletes();
            $table->timestamps();
        });


        Schema::create('invoice_product', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('product_id');
            $table->foreign('product_id')
                ->references('id')->on('products')
                ->onDelete('restrict');

            $table->unsignedInteger('invoice_id');
            $table->foreign('invoice_id')
                ->references('id')->on('invoices')
                ->onDelete('restrict');

            $table->string('product_code')->nullable();
            $table->string('product_name')->nullable();
            $table->string('description')->nullable();

            $table->integer('amount');
            $table->float('amount_reduction')->nullable();
            $table->float('percentage_reduction')->nullable();
            $table->float('price');
            $table->integer('vat_percentage')->nullable();

            $table->timestamps();
        });

        Schema::create('invoice_document', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('invoice_id');
            $table->foreign('invoice_id')
                ->references('id')->on('invoices')
                ->onDelete('restrict');

            $table->string('filename');
            $table->string('name');

            $table->timestamps();
        });

        Schema::create('invoice_payment', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('invoice_id');
            $table->foreign('invoice_id')
                ->references('id')->on('invoices')
                ->onDelete('restrict');

            $table->float('amount');
            $table->string('type_id');

            $table->date('date_paid');

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
        Schema::dropIfExists('invoice_payment');
        Schema::dropIfExists('invoice_document');
        Schema::dropIfExists('invoice_product');
        Schema::dropIfExists('invoices');
    }
}
