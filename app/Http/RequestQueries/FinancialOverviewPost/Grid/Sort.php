<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\FinancialOverviewPost\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
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

}
