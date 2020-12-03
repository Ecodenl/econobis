<?php

namespace App\Helpers\FinancialOverview;

use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\Project\Project;
use App\Http\Resources\Project\GridProject;

class FinancialOverviewHelper
{
    public static function getNewProjectsForFinancialOverview(FinancialOverview $financialOverview)
    {
        $projectsQuery = Project::where('administration_id', $financialOverview->administration_id)
            ->whereDoesntHave('financialOverviewProjects', function ($query1) use ($financialOverview) {
                $query1->whereHas('financialOverview', function($query2) use ($financialOverview){
                    $query2->where('administration_id', $financialOverview->administration_id)
                        ->where('year', $financialOverview->year);
                });
            });
        $projects = $projectsQuery->get();

        $projects->load([
            'projectType',
        ]);

        return GridProject::collection($projects)
            ->additional(['meta' => [
                'total' => $projectsQuery->count(),
            ]
            ]);
    }

}