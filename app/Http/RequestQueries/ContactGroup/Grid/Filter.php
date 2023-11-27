<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\ContactGroup\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'name',
        'status',
        'typeId',
        'createdById',
    ];

    protected $mapping = [
        'name' => 'contact_groups.name',
        'status' => 'contact_groups.closed',
        'typeId' => 'contact_groups.type_id',
        'createdById' => 'contact_groups.created_by_id',
    ];

    protected $joins = [];

    protected $defaultTypes = [
        '*' => 'ct',
        'createdById' => 'eq',
    ];

    protected function applyAmountOfMembersFilter($query, $type, $data)
    {

    }
}
