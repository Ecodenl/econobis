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

        if($product && $product->hasVariablePrice === 'static') {
            foreach ($product->invoiceProductsToSend as $invoiceProductToSend) {

                $price = 0;
                $priceInclVat = 0;
                if ($product->currentPrice) {
                    $price = $product->currentPrice->price;
                    $priceInclVat = $product->currentPrice->price_incl_vat;

                    switch ($product->invoice_frequency_id) {
                        case 'monthly':
                            $price = $price * 12;
                            $priceInclVat = $priceInclVat * 12;
                            break;
                        case 'quarterly':
                            $price = $price * 4;
                            $priceInclVat = $priceInclVat * 4;
                            break;
                        case 'half-year':
                            $price = $price * 2;
                            $priceInclVat = $priceInclVat * 2;
                            break;
                        default:
                            $price = $price;
                            $priceInclVat = $priceInclVat;
                            break;
                    }

                    switch ($invoiceProductToSend->invoice->collection_frequency_id) {
                        case 'monthly':
                            $price = $price / 12;
                            $priceInclVat = $priceInclVat / 12;
                            break;
                        case 'quarterly':
                            $price = $price / 4;
                            $priceInclVat = $priceInclVat / 4;
                            break;
                        case 'half-year':
                            $price = $price / 2;
                            $priceInclVat = $priceInclVat / 2;
                            break;
                        default:
                            $price = $price;
                            $priceInclVat = $priceInclVat;
                            break;
                    }
                }


                $invoiceProductToSend->price = $price;
                $invoiceProductToSend->price_incl_vat = $priceInclVat;
                $invoiceProductToSend->vat_percentage = $product->currentPrice ? $product->currentPrice->vat_percentage
                    : 0;
                $invoiceProductToSend->save();
            }
        }
    }
}
