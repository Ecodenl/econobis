<?php

use App\Eco\Invoice\Invoice;
use App\Eco\Product\Product;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RecalculateFieldsOrderAndProduct extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $products = Product::withoutGlobalScopes()->withTrashed()->get();
        foreach ($products as $product){
            $product->save();
        }

        $orders = \App\Eco\Order\Order::withTrashed()->get();

        foreach ($orders as $order){
            $order->save();
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
