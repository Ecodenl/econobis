<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\Product;

class PriceHistoryObserver
{
    public function saved(PriceHistory $priceHistory)
    {
        $product = $priceHistory->product;

        foreach ($product->invoiceProductsToSend as $invoiceProductToSend){
            $invoiceProductToSend->price = $product->currentPrice ? $product->currentPrice->price : 0;
            $invoiceProductToSend->vat_percentage = $product->currentPrice ? $product->currentPrice->vat_percentage : 0;
            $invoiceProductToSend->save();
        }
    }
}
