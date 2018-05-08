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
                'description' => $this->description,
                'amount' => $this->amount,
                'amountReduction' => $this->amount_reduction,
                'percentageReduction' => $this->percentage_reduction,
                'dateStart' => $this->date_start,
                'dateEnd' => $this->date_end,

                'totalPriceInclVatAndReduction' => $this->total_price_incl_vat_and_reduction,
                'totalPriceInclVatAndReductionPerYear' => $this->total_price_incl_vat_and_reduction_per_year,

                'orderId' => $this->order_id,
                'order' => FullOrder::make($this->whenLoaded('order')),

                'productId' => $this->product_id,
                'product' => FullProduct::make($this->whenLoaded('product')),
            ];
    }
}
