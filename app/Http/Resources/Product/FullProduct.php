<?php

namespace App\Http\Resources\Product;

use App\Http\Resources\Administration\FullAdministration;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class FullProduct extends JsonResource
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
                'priceHistory' => GenericResource::collection($this->whenLoaded('priceHistory')),
                'currentPrice' => GenericResource::make($this->currentPrice),
                'isOneTime' => $this->is_one_time,

                'durationId' => $this->duration_id,
                'duration' => FullEnumWithIdAndName::make($this->getDuration()),

                'invoiceFrequencyId' => $this->invoice_frequency_id,
                'invoiceFrequency' => FullEnumWithIdAndName::make($this->getInvoiceFrequency()),

                'paymentTypeId' => $this->payment_type_id,
                'paymentType' => FullEnumWithIdAndName::make($this->getPaymentType()),

                'administrationId' => $this->administration_id,
                'administration' => FullAdministration::make($this->whenLoaded('administration')),

                'hasVariablePrice' => $this->has_variable_price,

                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'active' => $this->active,
                'ledger' => GenericResource::make($this->whenLoaded('ledger')),
                'ledgerId' => $this->ledger_id,
                'costCenter' => GenericResource::make($this->whenLoaded('costCenter')),
                'costCenterId' => $this->cost_center_id,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ];
    }
}
