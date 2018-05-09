<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\Invoice;


use App\Http\Resources\Order\FullOrder;
use Illuminate\Http\Resources\Json\Resource;

class GridInvoice extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'dateRequested' => $this->date_requested,
            'subject' => $this->subject,

            'order' => FullOrder::make($this->whenLoaded('order')),

            'daysExpired' => $this->days_expired,
            'totalPriceInclVatAndReduction' => $this->total_price_incl_vat_and_reduction,

            'paymentTypeId' => $this->payment_type_id,
            'paymentType' => $this->getPaymentType(),
            'statusId' => $this->status_id,
            'status' => $this->getStatus(),
        ];
    }
}