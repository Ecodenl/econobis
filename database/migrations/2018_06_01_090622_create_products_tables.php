<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code');
            $table->string('name');
            $table->text('invoice_text')->nullable();

            $table->string('duration_id')->nullable();
            $table->string('invoice_frequency_id')->nullable();
            $table->string('payment_type_id')->nullable();

            $table->unsignedInteger('administration_id');
            $table->foreign('administration_id')
                ->references('id')->on('administrations')
                ->onDelete('restrict');

            $table->unsignedInteger('created_by_id');
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');

            $table->softdeletes();
            $table->timestamps();
        });


        Schema::create('price_history_product', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('product_id');
            $table->foreign('product_id')
                ->references('id')->on('products')
                ->onDelete('restrict');

            $table->date('date_start');
            $table->integer('price');
            $table->integer('vat_percentage');

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
        Schema::dropIfExists('price_history_product');
        Schema::dropIfExists('products');
    }
}
