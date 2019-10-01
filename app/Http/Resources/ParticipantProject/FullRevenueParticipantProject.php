<?php

namespace App\Http\Resources\ParticipantProject;

use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use Illuminate\Http\Resources\Json\Resource;

class FullRevenueParticipantProject extends Resource
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
        $es = false;
        
        if($this->contact->primaryContactEnergySupplier)
        {
         $es = $this->contact->primaryContactEnergySupplier->energySupplier;
        }

        return
            [
                'id' => $this->id,
                'name' => $this->contact->full_name . ' ' . $this->project->name,
                'contactId' => $this->contact_id,
                'contactType' => FullEnumWithIdAndName::make($this->contact->getType()),
                'contactName' => $this->contact->full_name,
                'contactPrimaryAddress' => $this->contact->primaryAddress,
                'contactPrimaryContactEnergySupplier' => $es,
                'projectId' => $this->project_id,
                'datePayed' => $this->date_payed,
                'didAcceptAgreement' => $this->did_accept_agreement,
                'didUnderstandInfo' => $this->did_understand_info,
                'giftedByContactId' => $this->gifted_by_contact_id,
                'giftedByContact' => FullContact::make($this->whenLoaded('giftedByContact')),
                'ibanPayout' => $this->iban_payout,
                'legalRepContactId' => $this->legal_rep_contact_id,
                'legalRepContact' => FullContact::make($this->whenLoaded('legalRepContact')),
                'ibanPayoutAttn' => $this->iban_payout_attn,
                'dateEnd' => $this->date_end,
                'typeId' => $this->type_id,
                'type' => GenericResource::make($this->whenLoaded('participantProjectPayoutType')),
                'participationsDefinitive' => $this->participations_definitive,
                'participationsDefinitiveWorth' => $this->participations_definitive_worth,
                'participationsGranted' => $this->participations_granted,
                'participationsOptioned' => $this->participations_optioned,
                'participationsInteressed' => $this->participations_interessed,
                'amountDefinitive' => $this->amount_definitive,
                'amountOptioned' => $this->amount_optioned,
                'amountGranted' => $this->amount_granted,
                'amountInteressed' => $this->amount_interessed,
            ];
    }
}
