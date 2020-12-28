<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\FinancialOverviewProject\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields
        = [
            'projectCode',
            'projectName',
            'projectTypeName',
            'statusId',
        ];

    protected $mapping
        = [
            'projectCode' => 'projects.code',
            'projectName' => 'projects.name',
            'projectTypeId' => 'projects.project_type_id',
            'statusId' => 'financial_overview_projects.status_id',
        ];

    protected $joins
        = [
            'project' => 'project',
        ];

    protected $defaultTypes
        = [
            '*' => 'ct',
            'statusId' => 'eq',
            'projectTypeId' => 'eq',
        ];

}
