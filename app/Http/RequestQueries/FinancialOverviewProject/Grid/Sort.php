<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\FinancialOverviewProject\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{

    protected $fields = [
        'projectCode',
        'projectName',
        'projectTypeName',
        'statusId',
    ];

    protected $mapping = [
        'projectCode' => 'projects.code',
        'projectName' => 'projects.name',
        'projectTypeId' => 'projects.project_type_id',
        'statusId' => 'financial_overview_projects.status_id',
    ];

    protected $joins = [
        'project' => 'project',
    ];

}
