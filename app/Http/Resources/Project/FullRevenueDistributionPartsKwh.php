<?php

namespace App\Http\Resources\Project;

use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use Illuminate\Http\Resources\Json\JsonResource;

class FullRevenueDistributionPartsKwh extends JsonResource
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
                'revenueId' => $this->revenue_id,
                'contactId' => $this->distributionKwh->contact_id,
                'contactType' => FullEnumWithIdAndName::make($this->distributionKwh->contact->getType()),
                'contactName' => $this->distributionKwh->contact->full_name,
                'contactPrimaryEmailAddress' => $this->distributionKwh->contact->primaryEmailAddress,
                'address' => $this->distributionKwh->address,
                'postalCode' => $this->distributionKwh->postal_code,
                'city' => $this->distributionKwh->city,
                'energySupplierName' => $this->energySupplier ? $this->energySupplier->name : '',
                'status' => $this->status,
                'participationsQuantity' => $this->participations_quantity,
                'deliveredKwh' => $this->delivered_kwh,
                'deliveredTotalString' => $this->delivered_total_string,
                'kwhReturn' => $this->kwh_return,

            ];
    }
}
