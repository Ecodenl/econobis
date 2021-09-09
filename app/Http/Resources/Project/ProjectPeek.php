<?php

namespace App\Http\Resources\Project;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectPeek extends JsonResource
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
                'name' => $this->name,
                'participationWorth' => $this->participation_worth,
                'typeId' => $this->project_type_id,
                'typeCodeRef' => $this->projectType->code_ref,
                'dateEntry' => $this->date_entry,
                'lastYearFinancialOverviewDefinitive' => $this->last_year_financial_overview_definitive,
            ];
    }
}
