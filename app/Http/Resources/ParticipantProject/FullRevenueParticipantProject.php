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
                'statusId' => $this->status_id,
                'status' => GenericResource::make($this->whenLoaded('participantProjectStatus')),
                'projectId' => $this->project_id,
                'dateRegister' => $this->date_register,
                'participationsRequested' => $this->participations_requested,
                'participationsGranted' => $this->participations_granted,
                'participationsCurrent' => $this->participations_current,
                'participationsWorthTotal' => $this->participations_worth_total,
                'participationsSold' => $this->participations_sold,
                'participationsRestSale' => $this->participations_rest_sale,
                'dateContractSend' => $this->date_contract_send,
                'dateContractRetour' => $this->date_contract_retour,
                'datePayed' => $this->date_payed,
                'didAcceptAgreement' => $this->did_accept_agreement,
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
                'participationsOptioned' => $this->participations_optioned,
            ];
    }
}
