<?php

namespace App\Http\Resources\Project;

use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use Illuminate\Http\Resources\Json\JsonResource;

class FullRevenueDistributionKwh extends JsonResource
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
                'revenuesKwh' => FullRevenuesKwh::make($this->whenLoaded('revenuesKwh')),
                'contact' => FullContact::make($this->whenLoaded('contact')),
                'contactId' => $this->contact_id,
                'contactType' => FullEnumWithIdAndName::make($this->contact->getType()),
                'contactName' => $this->contact->full_name,
                'contactPrimaryEmailAddress' => $this->contact->primaryEmailAddress,
                'address' => $this->address,
                'postalCode' => $this->postal_code,
                'city' => $this->city,
                'energySupplierNames' => $this->energy_supplier_names,
                'status' => $this->status,
                'participationsQuantity' => $this->participations_quantity,
                'deliveredTotalConcept' => $this->delivered_total_concept_string,
                'deliveredTotalConfirmed' => $this->delivered_total_confirmed_string,
                'deliveredTotalProcessed' => $this->delivered_total_processed_string,
                'deliveredTotalString' => $this->delivered_total_string,
                'kwhReturn' => $this->kwh_return,

            ];
    }
}
