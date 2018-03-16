<?php

namespace App\Http\Resources\ParticipantProductionProject;

use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\GenericResource;
use App\Http\Resources\ParticipantTransaction\FullParticipantTransaction;
use App\Http\Resources\ProductionProject\FullProductionProject;
use Illuminate\Http\Resources\Json\Resource;

class FullParticipantProductionProject extends Resource
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
                'name' => $this->contact->full_name . ' ' . $this->productionProject->name,
                'contactId' => $this->contact_id,
                'contact' => FullContact::make($this->whenLoaded('contact')),
                'statusId' => $this->status_id,
                'status' => GenericResource::make($this->whenLoaded('participantProductionProjectStatus')),
                'productionProjectId' => $this->production_project_id,
                'productionProject' => FullProductionProject::make($this->whenLoaded('productionProject')),
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
                'ibanPayed' => $this->iban_payed,
                'didAcceptAgreement' => $this->did_accept_agreement,
                'ibanAttn' => $this->iban_attn,
                'giftedByContactId' => $this->gifted_by_contact_id,
                'giftedByContact' => FullContact::make($this->whenLoaded('giftedByContact')),
                'ibanPayout' => $this->iban_payout,
                'legalRepContactId' => $this->legal_rep_contact_id,
                'legalRepContact' => FullContact::make($this->whenLoaded('legalRepContact')),
                'ibanPayoutAttn' => $this->iban_payout_attn,
                'dateEnd' => $this->date_end,
                'typeId' => $this->type_id,
                'type' => GenericResource::make($this->whenLoaded('participantProductionProjectPayoutType')),
                'powerKwhConsumption' => $this->power_kwh_consumption,
                'createdAt' => $this->created_at,
                'participantTransactions' => FullParticipantTransaction::collection($this->whenLoaded('transactions')),
                'obligationNumbers' => GenericResource::collection($this->whenLoaded('obligationNumbers')),
                'documentCount' => $this->documents()->count(),
                'relatedDocuments' => FullDocument::collection($this->whenLoaded('documents')),
                'deletedAt' => $this->deleted_at,
            ];
    }
}
