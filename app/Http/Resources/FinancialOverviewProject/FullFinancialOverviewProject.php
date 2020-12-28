<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\FinancialOverviewProject;

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
            'definitive' => $this->definitive,
            'statusId' => $this->status_id,
        ];
    }
}