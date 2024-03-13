<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\InvoicePost\Grid;


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
            'id' => 'invoice_post.id',
            'name' => 'invoice_post.name',
            'createdAt' => 'invoice_post.created_at',
        ];

    protected $joins = [];

    protected $defaultTypes
        = [
            '*' => 'ct',
            'id' => 'eq',
        ];

}
