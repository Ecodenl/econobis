<?php

namespace App\Http\Resources\Project;

use App\Eco\RevenuesKwh\RevenuePartsKwh;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class FullRevenuesKwh extends JsonResource
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
                'categoryId' => $this->category_id,
                'category' => GenericResource::make($this->whenLoaded('category')),
                'distributionTypeId' => $this->distribution_type_id,
                'distributionType' => FullEnumWithIdAndName::make($this->getDistributionType()),
                'projectId' => $this->project_id,
                'project' => FullProject::make($this->whenLoaded('project')),
                'dateBegin' => $this->date_begin,
                'dateEnd' => $this->date_end,
                'confirmed' => $this->confirmed,
                'status' => $this->status,
                'dateConfirmed' => $this->date_confirmed,
                'datePayout' => $this->last_parts_kwh ? $this->last_parts_kwh->date_payout : '',
                'deliveredTotalConcept' => $this->delivered_total_concept_string,
                'deliveredTotalConfirmed' => $this->delivered_total_confirmed_string,
                'deliveredTotalProcessed' => $this->delivered_total_processed_string,
                'partsKwh' => GridRevenuePartsKwh::collection(RevenuePartsKwh::where('revenue_id', $this->id)->orderBy('date_begin')->get()),
                'distributionKwh' => FullRevenueDistributionKwh::collection($this->whenLoaded('distributionKwh')),
                'payoutKwh' => $this->payout_kwh,
                'createdAt' => $this->created_at,
                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'hasNewPartsKwh' => $this->getHasNewPartsKwh(),
                'hasConfirmedPartsKwh' => $this->getHasConfirmedPartsKwh(),
            ];
    }
}
