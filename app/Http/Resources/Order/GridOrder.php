<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\Order;


use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use Illuminate\Http\Resources\Json\Resource;

class GridOrder extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'dateRequested' => $this->date_requested,
            'subject' => $this->subject,

            'contact' => FullContact::make($this->whenLoaded('contact')),

            'totalPriceInclVat' => $this->total_price_incl_vat,

            'paymentType' => FullEnumWithIdAndName::make($this->getPaymentType()),
            'status' => FullEnumWithIdAndName::make($this->getStatus()),
        ];
    }
}