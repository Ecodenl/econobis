<?php

namespace App\Http\Resources\ParticipantProject;

use App\Eco\Order\Order;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Order\FullOrder;
use App\Http\Resources\ParticipantMutation\FullParticipantMutation;
use App\Http\Resources\Project\FullProject;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullParticipantProject extends Resource
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
                'name' => $this->contact->full_name . ' ' . $this->project->name,
                'contactId' => $this->contact_id,
                'contact' => FullContact::make($this->whenLoaded('contact')),
                'projectId' => $this->project_id,
                'project' => FullProject::make($this->whenLoaded('project')),
                'relatedOrders' => FullOrder::collection(Order::where('participation_id', $this->id)->get()),
                'didAcceptAgreement' => $this->did_accept_agreement,
                'dateDidAcceptAgreement' => $this->date_did_accept_agreement,
                'didUnderstandInfo' => $this->did_understand_info,
                'dateDidUnderstandInfo' => $this->date_did_understand_info,
                'giftedByContactId' => $this->gifted_by_contact_id,
                'giftedByContact' => FullContact::make($this->whenLoaded('giftedByContact')),
                'ibanPayout' => $this->iban_payout,
                'ibanPayoutAttn' => $this->iban_payout_attn,
                'typeId' => $this->type_id,
                'type' => GenericResource::make($this->whenLoaded('participantProjectPayoutType')),
                'powerKwhConsumption' => $this->power_kwh_consumption,
                'createdAt' => $this->created_at,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'updatedAt' => $this->updated_at,
                'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
                'participantMutations' => FullParticipantMutation::collection($this->whenLoaded('mutations')),
                'obligationNumbers' => GenericResource::collection($this->whenLoaded('obligationNumbers')),
                'documentCount' => $this->documents()->count(),
                'relatedDocuments' => FullDocument::collection($this->whenLoaded('documents')),
                'participationsDefinitive' => $this->participations_definitive,
                'participationsDefinitiveWorth' => $this->participations_definitive_worth,
                'participationsCapitalWorth' => $this->participations_capital_worth,
                'participationsGranted' => $this->participations_granted,
                'participationsOptioned' => $this->participations_optioned,
                'participationsInteressed' => $this->participations_interessed,
                'amountDefinitive' => $this->amount_definitive,
                'amountGranted' => $this->amount_granted,
                'amountOptioned' => $this->amount_optioned,
                'amountInteressed' => $this->amount_interessed,
                'uniqueMutationStatuses' => $this->uniqueMutationStatuses,
                'participationsReturnsTotal' => $this->participationsReturnsTotal,
                'participationsReturnsKwhTotal' => $this->participationsReturnsKwhTotal,
                'participationsIndicationOfRestitutionEnergyTaxTotal' => $this->participationsIndicationOfRestitutionEnergyTaxTotal,
                'dateTerminated' => $this->date_terminated,
                'dateRegister' => $this->date_register,
                'dateEntryFirstDeposit' => $this->dateEntryFirstDeposit,
                'participantInDefinitiveRevenue' => $this->participantInDefinitiveRevenue,
                'participantInConfirmedRevenue' => $this->participantInConfirmedRevenue,

            ];
    }
}
