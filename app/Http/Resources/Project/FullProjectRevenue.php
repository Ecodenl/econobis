<?php

namespace App\Http\Resources\Project;

use App\Http\Resources\GenericResource;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullProjectRevenue extends Resource
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
                'typeId' => $this->type_id,
                'type' => GenericResource::make($this->whenLoaded('type')),
                'projectId' => $this->project_id,
                'confirmed' => $this->confirmed,
                'dateBegin' => $this->date_begin,
                'dateEnd' => $this->date_end,
                'dateReference' => $this->date_reference,
                'dateConfirmed' => $this->date_confirmed,
                'kwhStart' => $this->kwh_start,
                'kwhEnd' => $this->kwh_end,
                'kwhStartHigh' => $this->kwh_start_high,
                'kwhEndHigh' => $this->kwh_end_high,
                'kwhStartLow' => $this->kwh_start_low,
                'kwhEndLow' => $this->kwh_end_low,
                'kwhResult' => $this->kwh_result,
                'revenue' => $this->revenue,
                'datePayed' => $this->date_payed,
                'payPercentage' => $this->pay_percentage,
                'keyAmountFirstPercentage' => $this->key_amount_first_percentage,
                'payPercentageValidFromKeyAmount' => $this->pay_percentage_valid_from_key_amount,
                'categoryId' => $this->category_id,
                'category' => GenericResource::make($this->whenLoaded('category')),
                'createdAt' => $this->created_at,
                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'project' => FullProject::make($this->whenLoaded('project')),
                'distribution' => FullProjectRevenueDistribution::collection($this->whenLoaded('distribution')),
                'payoutKwh' => $this->payout_kwh,
            ];
    }
}
