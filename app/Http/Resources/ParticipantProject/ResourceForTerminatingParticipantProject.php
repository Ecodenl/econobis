<?php

namespace App\Http\Resources\ParticipantProject;

use App\Eco\Order\Order;
use App\Http\Resources\Address\FullAddress;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Order\FullOrder;
use App\Http\Resources\ParticipantMutation\FullParticipantMutation;
use App\Http\Resources\Project\GridProjectRevenue;
use App\Http\Resources\Project\GridRevenuesKwh;
use App\Http\Resources\Project\ProjectResourceForParticipation;
use App\Http\Resources\User\FullUser;
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
                'hasLastRevenueWithNotProcessedDistributions' => $this->hasLastRevenueWithNotProcessedDistributions,
                'lastRevenuePayPercentage' => $this->lastRevenuePayPercentage,
                'lastRevenuePayAmount' => $this->lastRevenuePayAmount,
                'lastRevenueKeyAmountFirstPercentage' => $this->lastRevenueKeyAmountFirstPercentage,
                'lastRevenuePayPercentageValidFromKeyAmount' => $this->lastRevenuePayPercentageValidFromKeyAmount,
            ];
    }
}
