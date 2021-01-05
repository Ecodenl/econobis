<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\RequestQueries\FinancialOverviewProject\Grid;


use App\Helpers\RequestQuery\RequestJoiner;

class Joiner extends RequestJoiner
{
    protected function applyProjectJoin($query)
    {
        $query->join('projects', 'financial_overview_projects.project_id', '=', 'projects.id');
        $query->join('project_types', 'projects.project_type_id', '=', 'project_types.id');
    }
}