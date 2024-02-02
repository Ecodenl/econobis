<?php

namespace App\Http\Resources\Project;

use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use Illuminate\Http\Resources\Json\JsonResource;

class FullProjectRevenueDistribution extends JsonResource
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
                'revenue' => FullProjectRevenue::make($this->whenLoaded('revenue')),
                'contact' => FullContact::make($this->whenLoaded('contact')),
                'contactId' => $this->contact_id,
                'contactType' => FullEnumWithIdAndName::make($this->contact->getType()),
                'contactName' => $this->contact->full_name,
                'contactPrimaryEmailAddress' => $this->contact->primaryEmailAddress,
                'address' => $this->address,
                'postalCode' => $this->postal_code,
                'city' => $this->city,
                'contactIban' => $this->contact->iban,
                'contactIbanAttn' => $this->contact->iban_attn,
                'payoutIban' => $this->participation ? $this->participation->iban_payout : '',
                'payoutIbanAttn' => $this->participation ? $this->participation->iban_payout_attn :'',
                'status' => $this->status,
                'participationsAmount' => $this->participations_amount,
                'participationsLoanAmount' => $this->participations_loan_amount,
                'payout' => $this->payout,
                'payoutType' => $this->payout_type,
                'payoutTypeCodeRef' => $this->participantProjectPayoutType ? $this->participantProjectPayoutType->code_ref : '',
                'datePayout' => $this->date_payout,
                'energySupplierName' => $this->energy_supplier_name,
                'energySupplierEanElectricity' => $this->energy_supplier_ean_electricity,
                'energySupplierNumber' => $this->energy_supplier_number,
                'deliveredTotal' => $this->delivered_total,
                'payoutKwh' => $this->payout_kwh,
                'kwhReturn' => $this->kwh_return,

            ];
    }
}
