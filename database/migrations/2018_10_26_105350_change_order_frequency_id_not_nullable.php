<?php

use App\Eco\Invoice\Invoice;
use App\Eco\Order\Order;
use App\Eco\Product\Product;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeOrderFrequencyIdNotNullable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //This has be done before, but due to a bug it has to be redone
        $orders = Order::withTrashed()->where('collection_frequency_id', '')->orWhereNull('collection_frequency_id')->get();

        foreach($orders as $order){
            $order->collection_frequency_id = 'once';
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
