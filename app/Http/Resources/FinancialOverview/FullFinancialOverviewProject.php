<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\FinancialOverview;

use App\Http\Resources\GenericResource;
use App\Http\Resources\Project\FullProject;
use Illuminate\Http\Resources\Json\Resource;

class FullFinancialOverviewProject extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'financialOverviewId' => $this->financial_overview_id,
            'projectId' => $this->project_id,
//            'project' => FullProject::make($this->whenLoaded('project')),
            'definitive' => $this->definitive,
        ];
    }
}