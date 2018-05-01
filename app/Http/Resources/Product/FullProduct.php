<?php

namespace App\Http\Resources\Product;

use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullProduct extends Resource
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
                'code' => $this->code,
                'name' => $this->name,
                'invoiceText' => $this->invoice_text,
                'priceInclVat' => $this->price_incl_vat,
                'price' => GenericResource::make($this->whenLoaded('price')),
                'duration' => FullEnumWithIdAndName::make($this->getDuration()),
                'invoiceFrequency' => FullEnumWithIdAndName::make($this->getInvoiceFrequency()),
                'paymentType' => FullEnumWithIdAndName::make($this->getPaymentType()),
            ];
    }
}
