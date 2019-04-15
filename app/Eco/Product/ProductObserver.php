<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\Product;

use Illuminate\Support\Facades\Auth;

class ProductObserver
{

    public function creating(Product $product)
    {
        $userId = Auth::id();
        $product->created_by_id = $userId;
    }

    public function saving(Product $product)
    {
        if($product->hasVariablePrice === 'static') {
            foreach ($product->invoiceProductsToSend as $invoiceProductToSend) {
                $invoiceProductToSend->product_code = $product->code;
                $invoiceProductToSend->product_name = $product->name;
                $invoiceProductToSend->description = $product->invoice_text;
                if($product->ledger)
                {
                    $invoiceProductToSend->twinfield_ledger_code = $product->ledger->twinfield_ledger_code;
                }

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

                $invoiceProductToSend->save();
            }
        }
    }
}
