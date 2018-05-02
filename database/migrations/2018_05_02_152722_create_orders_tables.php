<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->string('number');

            $table->unsignedInteger('contact_id');
            $table->foreign('contact_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');

            $table->string('status_id');
            $table->string('subject');

            $table->unsignedInteger('email_template_id')->nullable();
            $table->foreign('email_template_id')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');

            $table->unsignedInteger('email_template_reminder_id')->nullable();
            $table->foreign('email_template_reminder_id')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');

            $table->unsignedInteger('email_template_exhortation_id')->nullable();
            $table->foreign('email_template_exhortation_id')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');

            $table->string('payment_type_id');

            $table->text('iban')->nullable();
            $table->string('iban_attn')->nullable();
            $table->string('po_number')->nullable();
            $table->string('invoice_text')->nullable();
            $table->date('date_requested')->nullable();
            $table->date('date_start')->nullable();
            $table->date('date_end')->nullable();

            $table->unsignedInteger('created_by_id');
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');

            $table->softdeletes();
            $table->timestamps();
        });


        Schema::create('order_product', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('product_id');
            $table->foreign('product_id')
                ->references('id')->on('products')
                ->onDelete('restrict');

            $table->unsignedInteger('order_id');
            $table->foreign('order_id')
                ->references('id')->on('orders')
                ->onDelete('restrict');

            $table->integer('amount_reduction')->nullable();
            $table->integer('percentage_reduction')->nullable();

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
        Schema::dropIfExists('order_product');
        Schema::dropIfExists('orders');
    }
}
