<?php

namespace App\Http\Resources\Product;

use App\Http\Resources\Administration\FullAdministration;
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
                'priceHistory' => GenericResource::collection($this->whenLoaded('priceHistory')),
                'currentPrice' => GenericResource::make($this->current_price),
                'duration' => FullEnumWithIdAndName::make($this->getDuration()),
                'invoiceFrequency' => FullEnumWithIdAndName::make($this->getInvoiceFrequency()),
                'paymentType' => FullEnumWithIdAndName::make($this->getPaymentType()),
                'administration' => FullAdministration::make($this->whenLoaded('administration')),

                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'deletedAt' => $this->deleted_at,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ];
    }
}
