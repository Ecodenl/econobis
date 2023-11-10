<?php

namespace App\Http\Resources\Order;

use App\Http\Resources\Product\FullProduct;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class FullOrderProduct extends JsonResource
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

        if($this->product->duration_id !== 'none' && $this->order->collection_frequency_id !== 'once') {
            if($this->date_last_invoice){
                $start = $this->date_last_invoice;
                $end = $this->order->addDurationToDate(Carbon::parse($this->date_last_invoice));
            }
            else if($this->date_period_start_first_invoice){
                $start = $this->date_period_start_first_invoice;
                $end = $this->order->addDurationToDate(Carbon::parse($this->date_period_start_first_invoice));
            }
            else{
                $start = $this->date_start;
                $end = $this->order->addDurationToDate(Carbon::parse($this->date_start));
            }
            $period = Carbon::parse($start)->isoFormat('D MMMM YYYY') . ' t/m ' . Carbon::parse($end)->subDay()->isoFormat('D MMMM YYYY');
        }

        return
            [
                'id' => $this->id,
                'costCenterId' => $this->cost_center_id,
                'amount' => $this->amount,
                'amountReduction' => $this->amount_reduction,
                'percentageReduction' => $this->percentage_reduction,
                'dateStart' => $this->date_start,
                'dateEnd' => $this->date_end,

                'amountInclReductionInclVat' => $this->getAmountInclReductionInclVat(),
                'amountInclReductionInclVatPerYear' => $this->getAmountInclReductionInclVatPerYear(),

                'orderId' => $this->order_id,
                'order' => FullOrder::make($this->whenLoaded('order')),

                'productId' => $this->product_id,
                'product' => FullProduct::make($this->whenLoaded('product')),
                'isOneTimeAndPaidProduct' => $this->is_one_time_and_paid_product,
                'period' => $period,
                'dateLastInvoice' => $this->date_last_invoice,
                'datePeriodStartFirstInvoice' => $this->date_period_start_first_invoice,
                'variablePrice' => $this->variable_price,
            ];
    }
}
