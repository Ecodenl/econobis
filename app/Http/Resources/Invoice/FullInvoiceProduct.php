<?php

namespace App\Http\Resources\Invoice;

use App\Http\Resources\Product\FullProduct;
use Illuminate\Http\Resources\Json\Resource;
use Illuminate\Support\Carbon;

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
        $period = false;

        if($this->product->duration_id !== 'none' && $this->invoice->collection_frequency_id !== 'once') {
            if($this->date_last_invoice){
                $start = $this->date_last_invoice;
                $end = $this->invoice->addDurationToDate(Carbon::parse($this->date_last_invoice));
            }
            else{
                $start = $this->date_start;
                $end = $this->invoice->addDurationToDate(Carbon::parse($this->date_start));
            }
            $period = Carbon::parse($start)->formatLocalized('%e %B %Y') . ' t/m ' . Carbon::parse($end)->subDay()->formatLocalized('%e %B %Y');
        }

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
                'period' => $period,

                'dateLastInvoice' => $this->date_last_invoice
            ];
    }
}
