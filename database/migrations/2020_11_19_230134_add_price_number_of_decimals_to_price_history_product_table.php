<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPriceNumberOfDecimalsToPriceHistoryProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('price_history_product', function (Blueprint $table) {
            $table->tinyInteger('price_number_of_decimals')->default(2)->after('input_incl_vat');
        });
        $prices = \App\Eco\Product\PriceHistory::all();
        foreach ($prices as $price){
            $decimals = strlen(substr(strrchr($price->price_incl_vat, "."), 1));
            if($decimals<2){
                $decimals = 2;
            }
            if($decimals>6){
                $decimals = 6;
            }
            $price->price_number_of_decimals = $decimals;
            $price->save();
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('price_history_product', function (Blueprint $table) {
            $table->dropColumn('price_number_of_decimals');
        });
    }
}
