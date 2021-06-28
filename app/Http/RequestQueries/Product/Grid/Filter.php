<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Product\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'code',
        'name',
        'active'
    ];

    protected $mapping = [
        'code' => 'products.code',
        'name' => 'products.name',
        'active' => 'products.active'
    ];

    protected $joins = [];

    protected $defaultTypes = [
        '*' => 'ct',
        'active' => 'eq',
    ];
}
