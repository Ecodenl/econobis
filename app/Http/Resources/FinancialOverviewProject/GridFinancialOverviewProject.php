<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\FinancialOverviewProject;

use Illuminate\Http\Resources\Json\JsonResource;

class GridFinancialOverviewProject extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'projectCode' => $this->project->code,
            'projectName' => $this->project->name,
            'projectTypeId' => $this->project->project_type_id,
            'projectType' => $this->project->projectType->name,
            'projectDateEntry' => $this->project->date_entry,
            'statusId' => $this->status_id,
            'status' => $this->status,
            'definitive' => $this->definitive,
            'hasInterimFinancialOverviewContacts' => $this->has_interim_financial_overview_contacts,
        ];
    }
}