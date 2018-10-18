<?php

use App\Eco\Invoice\Invoice;
use App\Eco\Order\Order;
use App\Eco\Product\Product;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeInvoiceFieldsNotNullable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $orders = Order::withTrashed()->where('collection_frequency_id', '')->orWhereNull('collection_frequency_id')->get();

        foreach($orders as $order){
            $order->collection_frequency_id = 'once';
            $order->save();
        }

        $products = Product::withoutGlobalScopes()->withTrashed()->where('duration_id', '')->orWhereNull('duration_id')->get();

        foreach($products as $product){
            $product->duration_id = 'none';
            $product->save();
        }

        $products = Product::withoutGlobalScopes()->withTrashed()->where('invoice_frequency_id', '')->orWhereNull('invoice_frequency_id')->get();

        foreach($products as $product){
            $product->invoice_frequency_id = 'once';
            $product->save();
        }

        Schema::table('orders', function (Blueprint $table) {
            $table->string('collection_frequency_id')->nullable(false)->change();
        });

        Schema::table('products', function (Blueprint $table) {
            $table->string('invoice_frequency_id')->nullable(false)->change();
            $table->string('duration_id')->nullable(false)->change();
        });

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
