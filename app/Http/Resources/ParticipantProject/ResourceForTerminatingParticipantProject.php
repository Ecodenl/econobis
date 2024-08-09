<?php

namespace App\Http\Resources\ParticipantProject;

use Illuminate\Http\Resources\Json\JsonResource;

class ResourceForTerminatingParticipantProject extends JsonResource
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
                'dateReference' => $this->dateReference,
                'dateEntryLastMutation' => $this->dateEntryLastMutation,
                'dateTerminatedAllowedFrom' => $this->dateTerminatedAllowedFrom,
                'dateTerminatedAllowedTo' => $this->dateTerminatedAllowedTo,
                'dateBeginRevenueTerminated' => $this->dateBeginRevenueTerminated,
                'dateEndRevenueTerminated' => $this->dateEndRevenueTerminated,
                'hasLastRevenueConceptDistribution' => $this->hasLastRevenueConceptDistribution,
                'lastRevenueDistributionTypeId' => $this->lastRevenueDistributionTypeId,
                'lastRevenueDateReference' => $this->lastRevenueDateReference,
                'lastRevenuePayPercentage' => $this->lastRevenuePayPercentage,
                'lastRevenuePayAmount' => $this->lastRevenuePayAmount,
                'lastRevenueKeyAmountFirstPercentage' => $this->lastRevenueKeyAmountFirstPercentage,
                'lastRevenuePayPercentageValidFromKeyAmount' => $this->lastRevenuePayPercentageValidFromKeyAmount,
                'dateEndLastConfirmedPartsKwh' => $this->dateEndLastConfirmedPartsKwh,
            ];
    }
}
