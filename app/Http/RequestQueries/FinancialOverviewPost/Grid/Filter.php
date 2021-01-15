<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\FinancialOverviewPost\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields
        = [
            'id',
            'name',
            'createdAt',
        ];

    protected $mapping
        = [
            'id' => 'financial_overview_post.id',
            'name' => 'financial_overview_post.name',
            'createdAt' => 'financial_overview_post.created_at',
        ];

    protected $joins = [];

    protected $defaultTypes
        = [
            '*' => 'ct',
            'id' => 'eq',
        ];

}
