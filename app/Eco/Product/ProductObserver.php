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
        foreach ($product->invoiceProductsToSend as $invoiceProductToSend){
            $invoiceProductToSend->product_code = $product->code;
            $invoiceProductToSend->product_name = $product->name;
            $invoiceProductToSend->description = $product->invoice_text;
            $invoiceProductToSend->save();
        }
    }
}
