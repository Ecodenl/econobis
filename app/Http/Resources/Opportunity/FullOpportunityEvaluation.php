<?php

namespace App\Http\Resources\Opportunity;

use App\Eco\Opportunity\OpportunityEvaluationStatus;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class FullOpportunityEvaluation extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'isRealised' => $this->is_realised,
            'realisedStatus' => OpportunityEvaluationStatus::find($this->is_realised),
            'isStatisfied' => $this->is_statisfied,
            'statisfiedStatus' => OpportunityEvaluationStatus::find($this->is_statisfied),
            'wouldRecommendOrganisation' => $this->would_recommend_organisation,
            'recommendOrganisationStatus' => OpportunityEvaluationStatus::find($this->would_recommend_organisation),
            'note' => $this->note,
            'opportunityId' => $this->opportunity_id,
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
        ];
    }
}
