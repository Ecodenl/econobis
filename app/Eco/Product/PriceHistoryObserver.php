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

        if($product->hasVariablePrice === 'static') {
            foreach ($product->invoiceProductsToSend as $invoiceProductToSend) {

                $price = 0;
                if ($product->currentPrice) {
                    $price = $product->currentPrice->price;

                    switch ($product->invoice_frequency_id) {
                        case 'monthly':
                            $price = $price * 12;
                            break;
                        case 'quarterly':
                            $price = $price * 4;
                            break;
                        case 'half-year':
                            $price = $price * 2;
                            break;
                        default:
                            $price = $price;
                            break;
                    }

                    switch ($invoiceProductToSend->invoice->collection_frequency_id) {
                        case 'monthly':
                            $price = $price / 12;
                            break;
                        case 'quarterly':
                            $price = $price / 4;
                            break;
                        case 'half-year':
                            $price = $price / 2;
                            break;
                        default:
                            $price = $price;
                            break;
                    }
                }


                $invoiceProductToSend->price = $price;
                $invoiceProductToSend->vat_percentage = $product->currentPrice ? $product->currentPrice->vat_percentage
                    : 0;
                $invoiceProductToSend->save();
            }
        }
    }
}
