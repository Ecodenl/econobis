<?php

namespace App\Helpers\FinancialOverview;

use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\Project\Project;
use App\Http\Resources\Project\GridProject;

class FinancialOverviewHelper
{
    public static function getNewProjectsForFinancialOverviewGrid(FinancialOverview $financialOverview)
    {
        $projectsQuery = self::getNewProjectsForFinancialOverviewQuery($financialOverview);
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

    public static function getNewProjectsForFinancialOverview(FinancialOverview $financialOverview)
    {
        $projectsQuery = self::getNewProjectsForFinancialOverviewQuery($financialOverview);
        return $projectsQuery->get();
    }

    /**
     * @param FinancialOverview $financialOverview
     * @return mixed
     */
    protected static function getNewProjectsForFinancialOverviewQuery(FinancialOverview $financialOverview)
    {
        $projectsQuery = Project::where('administration_id', $financialOverview->administration_id)
            ->whereDoesntHave('financialOverviewProjects', function ($query1) use ($financialOverview) {
                $query1->whereHas('financialOverview', function ($query2) use ($financialOverview) {
                    $query2->where('administration_id', $financialOverview->administration_id)
                        ->where('year', $financialOverview->year);
                });
            });
        return $projectsQuery;
    }

}