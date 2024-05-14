<?php

namespace App\Http\Resources\ParticipantProject;

use App\Eco\Order\Order;
use App\Http\Resources\Address\FullAddress;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Order\FullOrder;
use App\Http\Resources\ParticipantMutation\FullParticipantMutation;
use App\Http\Resources\Project\ProjectResourceForParticipation;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class FullParticipantProjectShow extends JsonResource
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
                'address' => FullAddress::make($this->whenLoaded('address')),
                'projectId' => $this->project_id,
                'project' => ProjectResourceForParticipation::make($this->whenLoaded('project')),
                'relatedRevenues' => $this->participantProjectRevenues ? GridParticipantProjectRevenue::collection($this->participantProjectRevenues) : null,
                'relatedRevenuesKwh' => $this->participantProjectRevenuesKwh ? GridParticipantProjectRevenueKwh::collection($this->participantProjectRevenuesKwh) : null,
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
                'createdWith' => $this->created_with,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'updatedAt' => $this->updated_at,
                'updatedWith' => $this->updated_with,
                'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
                'participantMutations' => FullParticipantMutation::collection($this->whenLoaded('mutations')->sortByDesc('date_sort')),
                'obligationNumbers' => GenericResource::collection($this->whenLoaded('obligationNumbers')),
                //todo WM: nog wijzigen (zie bijv. FullIntake
                'documentCountNotOnPortal' => $this->documentsNotOnPortal()->count(),
                'documentCountOnPortal' => $this->documentsOnPortal()->count(),
                'relatedDocumentsNotOnPortal' => FullDocument::collection($this->whenLoaded('documentsNotOnPortal')),
                'relatedDocumentsOnPortal' => FullDocument::collection($this->whenLoaded('documentsOnPortal')),
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
                'terminatedAllowed' => $this->terminatedAllowed,
                'undoTerminatedAllowed' => $this->undoTerminatedAllowed,
                'participantBelongsToMembershipGroup' => $this->participantBelongsToMembershipGroup,
                'participantChoiceMembership' => $this->choice_membership,
            ];
    }
}
