<?php

use App\Eco\Product\PriceHistory;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPriceInclVatToPriceHistoryProduct extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('price_history_product', function (Blueprint $table) {
            $table->boolean('input_incl_vat')->nullable(false)->default(false)->after('date_start');
            $table->double('price_incl_vat')->nullable()->after('price');
        });

        $pricesHistory = PriceHistory::get();
        foreach ($pricesHistory as $priceHistory){
            $vatPercentage = 0;
            if($priceHistory->vat_percentage)
            {
                $vatPercentage = $priceHistory->vat_percentage;
            }
            $vatFactor = (100 + number_format($vatPercentage, 2) ) / 100;
            $price = $priceHistory->price;
            $priceInclVat = $price * $vatFactor;
            $priceHistory->price = number_format($price, 2, '.', '');
            $priceHistory->price_incl_vat = number_format($priceInclVat, 2, '.', '');
            $priceHistory->save();
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
            $table->dropColumn('input_incl_vat');
            $table->dropColumn('price_incl_vat');
        });
    }
}
