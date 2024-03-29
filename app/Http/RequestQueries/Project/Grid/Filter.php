<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Project\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'code',
        'name',
        'projectTypeId'
    ];

    protected $mapping = [
        'code' => 'projects.code',
        'name' => 'projects.name',
        'projectTypeId' => 'projects.project_type_id'
    ];

    protected $joins = [];

    protected $defaultTypes = [
        '*' => 'ct',
        'projectTypeId' => 'eq',
    ];

}
