<?php

namespace App\Http\Resources\Project;

use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class FullProjectRevenue extends JsonResource
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
                'participationId' => $this->participation_id,
                'participationName' => $this->participant ? $this->participant->contact->full_name : '',
                'distributionTypeId' => $this->distribution_type_id,
                'distributionType' => FullEnumWithIdAndName::make($this->getDistributionType()),
                'projectId' => $this->project_id,
                'confirmed' => $this->confirmed,
                'status' => $this->status,
                'dateBegin' => $this->date_begin,
                'dateEnd' => $this->date_end,
                'dateReference' => $this->date_reference,
                'dateConfirmed' => $this->date_confirmed,
                'payoutTypeId' => $this->payout_type_id,
                'participantProjectPayoutType' => GenericResource::make($this->whenLoaded('participantProjectPayoutType')),
                'kwhStart' => $this->kwh_start,
                'kwhEnd' => $this->kwh_end,
                'kwhStartHigh' => $this->kwh_start_high,
                'kwhEndCalendarYearHigh' => $this->kwh_end_calendar_year_high,
                'kwhEndHigh' => $this->kwh_end_high,
                'kwhStartLow' => $this->kwh_start_low,
                'kwhEndCalendarYearLow' => $this->kwh_end_calendar_year_low,
                'kwhEndLow' => $this->kwh_end_low,
                'kwhResult' => $this->kwh_result,
                'revenue' => $this->revenue,
                'amountRevenue' => $this->amount_revenue,
                'datePayed' => $this->date_payed,
                'payPercentage' => $this->pay_percentage,
                'payAmount' => $this->pay_amount,
                'keyAmountFirstPercentage' => $this->key_amount_first_percentage,
                'payPercentageValidFromKeyAmount' => $this->pay_percentage_valid_from_key_amount,
                'categoryId' => $this->category_id,
                'category' => GenericResource::make($this->whenLoaded('category')),
                'createdAt' => $this->created_at,
                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'project' => FullProject::make($this->whenLoaded('project')),
                'payoutKwh' => $this->payout_kwh,
            ];
    }
}
