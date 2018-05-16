<?php

namespace App\Http\Resources\Invoice;

use App\Http\Resources\Product\FullProduct;
use Illuminate\Http\Resources\Json\Resource;

class FullInvoiceProduct extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     *
     * @return array
     */
    public function toArray($request)
    {
        return
            [
                'id' => $this->id,
                'amount' => $this->amount,
                'amountReduction' => $this->amount_reduction,
                'percentageReduction' => $this->percentage_reduction,

                'priceInclVatAndReduction' => $this->price_incl_vat_and_reduction,
                'productCode' => $this->product_code,
                'productName' => $this->product_name,
                'description' => $this->description,

                'invoiceId' => $this->invoice_id,
                'invoice' => FullInvoice::make($this->whenLoaded('invoice')),

                'productId' => $this->product_id,
                'product' => FullProduct::make($this->whenLoaded('product')),
            ];
    }
}
