<?php

use App\Eco\Invoice\InvoiceProduct;
use App\Eco\Product\PriceHistory;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ConversionPriceInclVat extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
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

        $invoiceProducts = InvoiceProduct::get();
        foreach ($invoiceProducts as $invoiceProduct){
            $vatPercentage = 0;
            if($invoiceProduct->vat_percentage)
            {
                $vatPercentage = $invoiceProduct->vat_percentage;
            }
            $vatFactor = (100 + number_format($vatPercentage, 2) ) / 100;
            $price = $invoiceProduct->price;
            $priceInclVat = $price * $vatFactor;
            $invoiceProduct->price_incl_vat = number_format($priceInclVat, 2, '.', '');
            $invoiceProduct->save();
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
