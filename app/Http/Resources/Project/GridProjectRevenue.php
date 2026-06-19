<?php

namespace App\Http\Resources\Project;

use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class GridProjectRevenue extends JsonResource
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
                'projectId' => $this->project_id,
                'confirmed' => $this->confirmed,
                'status' => $this->status,
                'dateBegin' => $this->date_begin,
                'dateEnd' => $this->date_end,
                'dateReference' => $this->date_reference,
                'dateConfirmed' => $this->date_confirmed,
                'payoutTypeId' => $this->payout_type_id,
                'kwhResult' => $this->kwh_result,
                'revenue' => $this->revenue,
                'datePayed' => $this->date_payed,
                'categoryId' => $this->category_id,
                'category' => GenericResource::make($this->whenLoaded('category')),
                'payoutKwh' => $this->payout_kwh,
                'amountRevenue' => $this->amount_revenue,
            ];
    }
}
