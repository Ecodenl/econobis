<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\InvoicePost\Grid;


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
            'id' => 'invoice_post.id',
            'name' => 'invoice_post.name',
            'createdAt' => 'invoice_post.created_at',
        ];

    protected $joins = [];

}
